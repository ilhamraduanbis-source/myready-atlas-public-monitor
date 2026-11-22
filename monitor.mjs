// Public-only health monitor, independent of MYReady's private implementation.
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
const pin=JSON.parse(await fs.readFile(new URL('./monitor-pin.json',import.meta.url),'utf8'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const stamp=()=>new Date().toISOString();
const report={kind:'MYREADY_ATLAS_PUBLIC_MONITOR',started_at:stamp(),event:process.env.GITHUB_EVENT_NAME??'local_manual',run_id:process.env.GITHUB_RUN_ID??null,origin:pin.origin,checks:[],success:false,scheduled_execution_confirmed:false};
const temp=await fs.mkdtemp(path.join(os.tmpdir(),'atlas-public-monitor-'));
async function get(relative,max=1048576){
 if(!relative.startsWith('/')||relative.includes('..')||relative.includes('?'))throw Error('Invalid path');
 const started=performance.now();const response=await fetch(pin.origin+relative,{redirect:'manual',signal:AbortSignal.timeout(20000),headers:{'User-Agent':'MYREADY-Atlas-Public-Health/1.0'}});
 if(response.status!==200)throw Error(relative+' HTTP '+response.status);
 if(Number(response.headers.get('content-length')??0)>max)throw Error('Body too large');
 const parts=[];let size=0;for await(const chunk of response.body){size+=chunk.length;if(size>max)throw Error('Body exceeds limit');parts.push(chunk);}
 const bytes=Buffer.concat(parts);report.checks.push({path:relative,http_status:200,bytes:size,sha256:sha(bytes),elapsed_ms:performance.now()-started});return bytes;
}
try{
 const html=(await get('/')).toString('utf8');if(!html.includes('MYReady Atlas')||!html.includes('sampel terhad'))throw Error('Wrong homepage or absent scope warning');
 const manifestBytes=await get('/manifest.json');if(sha(manifestBytes)!==pin.manifest_sha256)throw Error('Manifest changed: review and repin deliberately');
 const manifest=JSON.parse(manifestBytes);if(manifest.sample_json_sha256!==pin.sample_sha256)throw Error('Sample pin mismatch');
 const allow=new Set(['sample.json','demo-core.js','demo-tests.js','app.js','styles.css','usage.md','postcodes-sample-20.csv','currency-codes-sample-10.csv']);
 const content={};for(const name of allow){const item=manifest.files.find(x=>x.path===name);if(!item)throw Error('Missing manifest entry '+name);const bytes=await get('/'+name);if(sha(bytes)!==item.sha256||bytes.length!==item.size_bytes)throw Error('Asset integrity mismatch '+name);content[name]=bytes;}
 const data=JSON.parse(content['sample.json']);if(data.records.length!==30)throw Error('Unexpected scope');
 for(const [id,count] of Object.entries(pin.expected_counts)){if(data.records.filter(r=>r.source_id===id).length!==count)throw Error('Unexpected module count');const source=data.sources.find(s=>s.source_id===id);if(source?.license_id!=='CC-BY-4.0'||!source.attribution||!source.catalogue_url.startsWith('https://data.gov.my/'))throw Error('Rights metadata absent');}
 for(const r of data.records){if(!/^[a-f0-9]{64}$/.test(r.provenance.source_capture_sha256)||!r.provenance.source_record_locator.record_index_1_based)throw Error('Missing provenance');}
 await fs.writeFile(path.join(temp,'package.json'),'{"type":"module"}');
 for(const name of ['demo-core.js','demo-tests.js'])await fs.writeFile(path.join(temp,name),content[name]);
 const {evaluate}=await import(pathToFileURL(path.join(temp,'demo-tests.js')));
 const a=await evaluate(data),b=await evaluate(data);
 if(a.total!==50||a.passed!==50||b.passed!==50||a.semantic_sha256!==b.semantic_sha256||a.semantic_sha256!==pin.semantic_sha256)throw Error('50-case regression or semantic mismatch');
 report.evaluation={passed_each_run:[a.passed,b.passed],semantic_sha256:a.semantic_sha256,processing_ms:[a.processing_ms,b.processing_ms]};
 report.success=true;report.scheduled_execution_confirmed=report.event==='schedule';
}catch(error){report.error=String(error?.message??error);process.exitCode=1;}finally{
 report.finished_at=stamp();report.boundary='Availability/assets and separate public Node tests only; not browser rendering, source truth, private releases or market demand.';
 await fs.rm(temp,{recursive:true,force:true});
 const out=JSON.stringify(report,null,2);console.log(out);
 if(process.env.GITHUB_STEP_SUMMARY)await fs.appendFile(process.env.GITHUB_STEP_SUMMARY,'## Atlas public health\n\n```json\n'+out+'\n```\n');
}
