// Negative controls for the monitor itself, never a real scheduled execution.
const mode=process.env.ATLAS_MONITOR_NEGATIVE_FIXTURE;
if(!['http_500','manifest_tamper'].includes(mode))throw Error('Fixture mode required');
globalThis.fetch=async url=>{const p=new URL(url).pathname;if(mode==='http_500')return new Response('fixture failure',{status:500});if(p==='/')return new Response('MYReady Atlas sampel terhad',{status:200});return new Response('tampered synthetic manifest fixture',{status:200});};
