/* walk the house again and again; watch GPU resources, JS heap, DOM size and cached art */
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-precise-memory-info','--js-flags=--expose-gc']});
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').join(__dirname,'..','_local.html'),{timeout:180000});await p.waitForTimeout(3000);
await p.evaluate(()=>{startGame(5,'detective',SEASON.eps[0])});await p.waitForTimeout(7000);await p.evaluate(()=>{const b=document.querySelector('#brief3 .go3');b&&b.click()});await p.waitForTimeout(1500);
const route=['lounge','library','study','library','lounge','lobby','dining','kitchen','dining','lobby','stairs','r1','stairs','r2','stairs','lobby'];
const snap=async(tag)=>{const s=await p.evaluate(()=>{if(window.gc)gc();const i=GL.r.info;return {geo:i.memory.geometries,tex:i.memory.textures,prog:i.programs?i.programs.length:0,heapMB:+(performance.memory.usedJSHeapSize/1e6).toFixed(1),dom:document.getElementsByTagName('*').length,rooms:Object.keys(GL.rooms).length,stTex:Object.keys(ST3.tex).length,pic:Object.keys(PIC3).length,st:(GL.cur&&GL.cur.st3||[]).length}});console.log(tag.padEnd(10),JSON.stringify(s))};
await snap('start');
for(let lap=0;lap<3;lap++){for(const room of route){await p.evaluate(rm=>{if(G.room===rm)return;G.room=ROOMS[rm].adj[0];for(const s of G.M.sus)if(Math.random()<.5)G.pos[s.id]=rm;goRoom(rm)},room);await p.waitForTimeout(3500)}await snap('lap '+(lap+1))}
console.log('errors',JSON.stringify(errs));await b.close()})();
