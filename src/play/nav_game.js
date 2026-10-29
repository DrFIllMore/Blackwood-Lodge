/* ---------- moving through the house, knowing where you are, and finding things ---------- */
/* every connection out of a room, on the side it really lies: a doorway in the picture (screen point in the room's starting view),
   the left or right edge, or behind you */
const NAV3={
 lobby:{porch:{at:[.5,.31],s:'THE FRONT DOOR'},stairs:{side:'R',s:'UP THE STAIRS'},lounge:{side:'L',s:'THROUGH THE ARCH'},dining:{side:'B',s:'ACROSS THE HALL'}},
 porch:{lobby:{at:[.42,.33],s:'BACK INSIDE'}},
 lounge:{library:{side:'R',s:'THROUGH THE DOOR'},lobby:{side:'B',s:'THE FRONT HALL'}},
 library:{study:{at:[.2,.34],s:'DOWN THE CORRIDOR'},lounge:{side:'B',s:'BEHIND YOU'}},
 study:{library:{side:'L',s:'THE CORRIDOR'},cellar:{side:'R',s:'DOWN THE STEPS'},stairs:{side:'B',s:'THE BACK STAIRS'}},
 dining:{kitchen:{at:[.5,.23],s:'THE SERVING DOOR'},lobby:{side:'B',s:'BEHIND YOU'}},
 kitchen:{cellar:{side:'L',s:'DOWN THE STEPS'},boiler:{side:'R',s:'THE BACK PASSAGE'},dining:{side:'B',s:'BEHIND YOU'}},
 cellar:{kitchen:{side:'L',s:'UP TO THE KITCHEN'},study:{side:'R',s:'UP TO THE STUDY'}},
 boiler:{kitchen:{side:'B',s:'UP THE STEPS'}},
 stairs:{r2:{at:[.5,.31],s:'END OF THE HALL'},r1:{at:[.8,.29],s:'THE DOOR ON THE RIGHT'},r3:{side:'L',s:'UNDER THE EAVES'},study:{side:'L',s:'THE BACK STAIRS'},attic:{side:'R',s:'UP THE LADDER'},lobby:{side:'B',s:'DOWN THE STAIRS'}},
 r1:{stairs:{side:'B',s:'BACK TO THE LANDING'}},r2:{stairs:{side:'B',s:'BACK TO THE LANDING'}},r3:{stairs:{side:'B',s:'BACK TO THE LANDING'}},
 attic:{stairs:{side:'B',s:'DOWN THE LADDER'}}};
const FLOOR3={lobby:'GROUND FLOOR',lounge:'GROUND FLOOR',library:'GROUND FLOOR',study:'GROUND FLOOR',dining:'GROUND FLOOR',kitchen:'GROUND FLOOR',porch:'OUTSIDE',cellar:'BELOW STAIRS',boiler:'BELOW STAIRS',stairs:'FIRST FLOOR',r1:'FIRST FLOOR',r2:'FIRST FLOOR',r3:'FIRST FLOOR',attic:'TOP OF THE HOUSE'};
const N3={room:null,pts:{},last:null};
function navSpec3(room){const t=NAV3[room]||{},out=[];for(const id of ROOMS[room].adj){out.push(Object.assign({id},t[id]||{side:'B',s:''}))}return out}
/* turn a screen point in the starting view into a point in the room, once per room */
function navPts3(r){if(r.navPts)return r.navPts;const T=THREE,w=r.views.wide,cam=GL.cam.clone();cam.position.set(...w.p);cam.lookAt(new T.Vector3(...w.t));cam.fov=w.fov;cam.aspect=GL.cam.aspect;cam.updateProjectionMatrix();cam.updateMatrixWorld();
  const objs=[];r.scene.traverse(o=>{if(o.isMesh&&o.visible&&!o.userData.tap&&!o.userData.st3)objs.push(o)});const ray=new T.Raycaster(),pts={};
  for(const sp of navSpec3(r.id))if(sp.at){ray.setFromCamera(new T.Vector2(sp.at[0]*2-1,-sp.at[1]*2+1),cam);const h=ray.intersectObjects(objs,false)[0];
    pts[sp.id]=h?h.point.clone().add(ray.ray.direction.clone().multiplyScalar(-.15)):ray.ray.at(4,new T.Vector3())}
  return r.navPts=pts}
function navHTML3(sp,kind){const nm=ROOMS[sp.id].n.toUpperCase();
  if(kind==='B')return `<button class="nb3" data-go="${sp.id}" aria-label="Go to ${ROOMS[sp.id].n}"><svg viewBox="0 0 16 12" aria-hidden="true"><path d="M2 3 L8 9 L14 3"/></svg><b>${nm}</b><i>${sp.s||'BEHIND YOU'}</i></button>`;
  if(kind==='at')return `<button class="na3" data-go="${sp.id}" aria-label="Go to ${ROOMS[sp.id].n}"><span><b>${nm}</b><i>${sp.s}</i></span><svg viewBox="0 0 26 18" aria-hidden="true"><path d="M3 14 L13 4 L23 14"/></svg></button>`;
  const L=kind==='L';return `<button class="ne3 ${L?'l':'r'}" data-go="${sp.id}" aria-label="Go to ${ROOMS[sp.id].n}"><em><svg viewBox="0 0 18 26" aria-hidden="true"><path d="${L?'M14 3 L4 13 L14 23':'M4 3 L14 13 L4 23'}"/></svg></em><span><b>${nm}</b><i>${sp.s}</i></span></button>`}
function navBuild3(){let h=$('#nav3');if(!h){$('#view').insertAdjacentHTML('afterend','<div id="nav3" class="nav3"></div>');h=$('#nav3');
    h.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(!b)return;e.stopPropagation();if(P3.busy||P3.talk||V.intro||!G||G.over)return;const to=b.dataset.go;h.classList.add('go');goRoom(to)})}
  const sp=navSpec3(G.room);N3.room=G.room;N3.key=null;
  h.innerHTML=sp.map(s=>s.at?navHTML3(s,'at')+navHTML3(s,'L').replace('class="ne3 l"','class="ne3 l alt"')+navHTML3(s,'R').replace('class="ne3 r"','class="ne3 r alt"'):navHTML3(s,s.side)).join('');
  h.classList.remove('go')}
function navShow3(){if(!G||G.over)return false;if(V.intro||P3.busy||P3.talk||P3.bodyOn)return false;if($('.mid3.choosing'))return false;if($('#scr3host')&&$('#scr3host').childElementCount)return false;if($('#reveal3')||$('#arr3')||$('#tcard')||$('#brief3'))return false;
  if(GL.close&&!GL.altI)return false;return GL.cur&&GL.cur.id===G.room&&GL.shownRoom===G.room}
function navTick3(){requestAnimationFrame(navTick3);const h=$('#nav3');if(!G||$('#play').hidden){if(h)h.style.display='none';return}
  if(G.room!==N3.room||!h)navBuild3();const H=$('#nav3'),on=navShow3();H.style.display=on?'':'none';if(!on)return;
  const r=GL.cur,vb=$('#view').getBoundingClientRect(),pb=$('#play').getBoundingClientRect(),pts=navPts3(r),T=THREE;
  /* stack the edge signs, keep them clear of the turn button and the narration */
  const top0=vb.top-pb.top+vb.height*.40,bot=($('.bot3')?$('.bot3').getBoundingClientRect().top:vb.bottom)-pb.top;
  let nL=0,nR=0;const sides=[];
  H.querySelectorAll('[data-go]').forEach(b=>{const id=b.dataset.go,p=pts[id];
    if(b.classList.contains('na3')){if(!p){b.style.display='none';return}const q=p.clone().project(GL.cam);const x=(q.x+1)/2*vb.width,y=(1-q.y)/2*vb.height;
      const ok=q.z<1&&x>40&&x<vb.width-40&&y>vb.height*.16&&y<bot-(vb.top-pb.top)-60;b.style.display=ok?'flex':'none';b.dataset.ok=ok?1:0;if(ok){b.style.left=(vb.left-pb.left+x)+'px';b.style.top=(vb.top-pb.top+y)+'px'}
      else sides.push([id,q.z<1?(q.x<0?'L':'R'):(q.x<0?'R':'L')]);return}
    if(b.classList.contains('alt'))return;
    if(b.classList.contains('ne3')){const L=b.classList.contains('l');b.style.top=(top0+(L?nL++:nR++)*76)+'px'}
    if(b.classList.contains('nb3'))b.style.top=(bot-50)+'px'});
  /* a doorway turned out of view becomes an edge sign on the side it now lies */
  H.querySelectorAll('.ne3.alt').forEach(b=>{const s=sides.find(x=>x[0]===b.dataset.go);const want=s&&((s[1]==='L')===b.classList.contains('l'));b.style.display=want?'flex':'none';if(want){const L=b.classList.contains('l');b.style.top=(top0+(L?nL++:nR++)*76)+'px'}})}
requestAnimationFrame(navTick3);
/* the room's name: a big card when you walk in, then a bold plate under the clock */
function arrive3(){if(!G||V.intro||G.room===N3.last)return;N3.last=G.room;$('#arr3')?.remove();
  $('#play').insertAdjacentHTML('beforeend',`<div class="arr3" id="arr3" aria-hidden="true"><div class="band"></div><div class="tx"><small>${FLOOR3[G.room]||''}</small><b>${ROOMS[G.room].n.toUpperCase()}</b><i>${fmtT(G.time)}</i></div></div>`);
  setTimeout(()=>{const a=$('#arr3');if(a){a.classList.add('out');setTimeout(()=>a.remove(),400)}},1500)}
setInterval(()=>{try{if(G&&!G.over&&!$('#play').hidden&&GL.shownRoom===G.room&&!P3.busy)arrive3()}catch(_){}},200);
const startGame3n=startGame;startGame=function(...a){N3.last=null;N3.room=null;return startGame3n(...a)};
const playRefresh3=playRefresh;playRefresh=function(){playRefresh3();if(!G||!$('#watch3'))return;const s=$('#watch3 .tsub3');
  if(s)s.outerHTML=`<span class="rp3"><b>${ROOMS[G.room].n.toUpperCase()}</b><i>${FLOOR3[G.room]||''}</i></span><span class="tsub3">DAWN ${fmtT(G.R.dawn).replace(':00','')}${G.flags.power_out?`<b>${G.light&&G.batt>0?' · TORCH '+Math.round(G.batt)+'%':' · IN THE DARK'}</b>`:''}</span>`};
refresh=playRefresh;
/* found it: anything new you pick up comes to the middle of the screen, large and named, then drops into the satchel */
const TAGS3={lock:'OPENS LOCKS',pry:'PRIES THINGS OPEN',dark:'LIGHT IN THE DARK',read:'READS SMALL DETAILS',body:'READS WOUNDS',talk:'LOOSENS TONGUES',calm:'STEADIES YOUR NERVE',repair:'MENDS THINGS',heavy:'HEAVY'};
const WART3={poker:'poker',knife:'kitchenknife',cord:'cord',wrench:'wrench',statue:'bookend'};
function revealList3(ev0,it0){const out=[];
  for(const it of (G.items||[]).slice(it0)){const t=TOOLS[it.id];if(!t)continue;out.push({art:ITEMS.ART[it.id]?it.id:'opener',name:t.n,d:t.d,tag:'TOOL · '+[...new Set((t.tags||[]).map(x=>TAGS3[x]).filter(Boolean))].join(' · ')})}
  for(const e of G.ev.slice(ev0)){if(!PHYS.includes(e.id))continue;const art=e.id==='weapon'?WART3[G.M.weapon.id]:e.id==='item'?'button':e.id==='fibres'?'fibres':'letter';
    out.push({art,col:e.id==='item'?(G.M.sus.find(s=>s.id===G.M.killer)||{}).coat:null,name:e.id==='weapon'?G.M.weapon.n:evName(e),d:e.t,tag:'EVIDENCE'})}
  return out}
function reveal3(list,done){if(!list.length)return done();const it=list.shift();try{SND.ev()}catch(_){}
  $('#reveal3')?.remove();$('#play').insertAdjacentHTML('beforeend',`<div class="rv3" id="reveal3" role="dialog" aria-label="Found: ${it.name}"><div class="rays"></div><span class="tag">FOUND</span>
<div class="disc">${ITEMS.svg(it.art,230,it.col)}</div><b class="nm">${it.name.toUpperCase()}</b><p>${it.d}</p><em>${it.tag}</em><small>TAP TO PUT IT IN YOUR SATCHEL</small></div>`);
  const el=$('#reveal3');let gone=false;const go=()=>{if(gone)return;gone=true;const sat=$('#dsat3'),d=el.querySelector('.disc');
    if(sat&&d){const a=d.getBoundingClientRect(),b=sat.getBoundingClientRect();d.style.transition='transform .5s cubic-bezier(.5,0,.8,.6),opacity .5s';d.style.transform=`translate(${b.left+b.width/2-a.left-a.width/2}px,${b.top+b.height/2-a.top-a.height/2}px) scale(.18)`;d.style.opacity='.4'}
    el.classList.add('out');setTimeout(()=>{el.remove();if(sat){sat.classList.remove('pulse3');void sat.offsetWidth;sat.classList.add('pulse3')}try{SND.bag()}catch(_){}reveal3(list,done)},520)};
  el.addEventListener('click',go);setTimeout(go,window.__noAuto?1e9:6000)}
const flyNew3n=flyNew;flyNew=function(ev0,it0){if(!G)return;const list=revealList3(ev0,it0);if(!list.length)return flyNew3n(ev0,it0);
  /* tools and physical evidence get the reveal; anything else (statements, observations) still flies to the board as before */
  const g=G,itN=(G.items||[]).length,keep=G.ev.slice(ev0).filter(e=>!PHYS.includes(e.id));
  reveal3(list,()=>{if(G!==g)return;refresh();if(keep.length){const evAll=G.ev;const idx=G.ev.indexOf(keep[0]);flyNew3n(idx<0?G.ev.length:idx,itN)}})};
