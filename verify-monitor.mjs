import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const results=[];
for(const mode of ['http_500','manifest_tamper']){
 const r=spawnSync(process.execPath,['--import','./failure-fixture.mjs','./monitor.mjs'],{cwd:import.meta.dirname,env:{PATH:process.env.PATH,ATLAS_MONITOR_NEGATIVE_FIXTURE:mode},encoding:'utf8'});
 assert.equal(r.status,1);const out=JSON.parse(r.stdout);assert.equal(out.success,false);assert.equal(out.scheduled_execution_confirmed,false);assert.equal(out.event,'local_manual');assert.match(out.error,mode==='http_500'?/HTTP 500/:/Manifest changed/);results.push({mode,failed_closed:true,error:out.error,event:out.event});
}
fs.writeFileSync(new URL('./monitor_negative_controls.json',import.meta.url),JSON.stringify({kind:'synthetic negative controls, not scheduled evidence',results},null,2)+'\n');console.log(JSON.stringify(results));
