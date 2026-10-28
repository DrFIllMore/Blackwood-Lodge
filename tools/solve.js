const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').join(__dirname,'..','_local.html'),{timeout:180000});await p.waitForTimeout(3000);
for(const [ep,arch,seed] of [[0,'detective',1101],[3,'doctor',1404],[6,'journalist',1707],[-1,'soldier',4242]]){
const r=await p.evaluate(([ep,arch,seed])=>{startGame(seed,arch,ep>=0?SEASON.eps[ep]:FREEPLAY);V.intro=false;const M=G.M,out=[];
  const go=room=>{G.room=room};
  go('study');examineAs(G,{sure:1,mins:30});for(const o of OBS.study)observe(G,o);
  go('lobby');for(const o of OBS.lobby)observe(G,o);
  for(const room of Object.keys(SPOTS)){go(room);for(const o of OBS[room]||[])observe(G,o);for(const sp of Object.keys(SPOTS[room]))searchAs(G,sp,{sure:1,mins:10})}
  for(const s of M.sus){if(G.flags['dead_'+s.id])continue;G.pos[s.id]=G.room;talk(G,s.id)}
  const k=M.sus.find(s=>s.id===M.killer);
  // put the best evidence to the killer until they slip
  for(let i=0;i<6&&!G.broke[k.id];i++){const e=G.ev.find(e=>implicates(e,k)&&!G.shown[k.id+':'+e.id]);G._force=null;G.st.charm=30;press(k,'charm',e?{ev:e.id}:{})}
  const qs=questions().map(q=>q.id+':'+q.st);const proof=proofCount();const t=G.time;
  accuse(G,M.killer,M.weapon.id);return {ep,arch,over:G.over,qs,proof,time:fmtT(t),ev:G.ev.map(e=>e.id),items:G.items.map(i=>i.id),broke:Object.keys(G.broke)}},[ep,arch,seed]);
console.log(JSON.stringify(r))}
console.log('errors',JSON.stringify(errs));await b.close()})();
