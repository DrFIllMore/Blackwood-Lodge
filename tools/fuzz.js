/* random play: hundreds of actions across episodes; report every error with where it happened */
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push('PAGE '+e.message+' @'+(e.stack||'').split('\n').slice(1,3).join(' | ')));p.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.push(m.type()+' '+m.text().slice(0,220))});
await p.goto('file://'+require('path').join(__dirname,'..','_local.html'),{timeout:180000});await p.waitForTimeout(3000);
const runs=JSON.parse(process.argv[2]||'[[0,"detective",11],[1,"doctor",22],[4,"soldier",33]]'),N=+process.argv[3]||120;
for(const [ep,arch,seed] of runs){
 await p.evaluate(([ep,arch,seed])=>{window.__fz=seed;startGame(seed,arch,ep>=0?SEASON.eps[ep]:FREEPLAY)},[ep,arch,seed]);await p.waitForTimeout(6000);
 await p.evaluate(()=>{const b=document.querySelector('#brief3 .go3')||document.querySelector('#tcard');b&&b.click()});await p.waitForTimeout(2500);await p.evaluate(()=>{const b=document.querySelector('#brief3 .go3');b&&b.click()});await p.waitForTimeout(1500);
 const log=[];
 for(let i=0;i<N;i++){
  const r=await p.evaluate(()=>{const R=()=>{window.__fz=(window.__fz*16807)%2147483647;return window.__fz/2147483647};const pick=a=>a[Math.floor(R()*a.length)];
   try{if(!G||G.over)return 'over';
    const tap=document.querySelector('.tap3');if(tap){tap.click();return 'roll'}
    if(P3.busy)return 'busy';
    const ch=[...document.querySelectorAll('#ch3 button, #tch3 button, .tray3 button')].filter(b=>!b.disabled&&b.offsetParent);
    const k=R();
    if(document.querySelector('#scr3host')&&document.querySelector('#scr3host').childElementCount){if(k<.5){const bs=[...document.querySelectorAll('#scr3host button')].filter(b=>b.offsetParent);if(bs.length){pick(bs).click();return 'screen-btn'}}closeScr();return 'close-screen'}
    if(ch.length&&k<.55){const b=pick(ch);const t=b.textContent.slice(0,30);b.click();return 'choice:'+t}
    if(k<.7){const adj=ROOMS[G.room].adj;if(!P3.talk){goRoom(pick(adj));return 'move'}}
    if(k<.82&&GL.cur&&GL.cur.hits.length&&!P3.talk){const h=pick(GL.cur.hits);look3(h.userData.view);objTap(h.userData.tap);return 'tap:'+h.userData.tap}
    if(k<.88&&!P3.talk){const here=npcsIn(G,G.room);if(here.length){openTalk(pick(here).id);return 'talk'}}
    if(k<.92){satchel();return 'satchel'}if(k<.95){journal();return 'journal'}if(k<.97){board();return 'board'}
    if(k<.985&&GL.cur&&GL.cur.alts&&GL.cur.alts.length){turnTap();return 'turn'}
    closeTalk&&closeTalk();return 'leave'}catch(e){return 'THROW '+e.message+' '+(e.stack||'').split('\n')[1]}});
  log.push(r);if(r==='over')break;await p.waitForTimeout(r==='roll'?3200:r==='move'?1800:700)}
 const st=await p.evaluate(()=>({over:G.over,time:fmtT(G.time),room:G.room,ev:G.ev.length}));
 console.log('run',ep,arch,'actions',log.length,'throws',log.filter(x=>x.startsWith('THROW')).length,JSON.stringify(st));log.filter(x=>x.startsWith('THROW')).slice(0,5).forEach(x=>console.log('  ',x))}
console.log('errors',errs.length);[...new Set(errs)].slice(0,25).forEach(e=>console.log('  ',e));await b.close()})();
