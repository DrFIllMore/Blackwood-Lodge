/* ---------- problem log: what really happened on the player's phone ---------- */
const LOG3=(()=>{const KEY='bw_log3',sid=Date.now().toString(36)+Math.random().toString(36).slice(2,6);let buf=[],dirty=false,sent=0,saveT=0;
  try{buf=JSON.parse(localStorage.getItem(KEY)||'[]')||[]}catch(_){buf=[]}
  const meta={sid,ver:window.BUILD3||'',ua:navigator.userAgent,screen:innerWidth+'x'+innerHeight,dpr:devicePixelRatio,where:location.hostname||'file',start:new Date().toISOString()};
  const save=()=>{if(saveT)return;saveT=setTimeout(()=>{saveT=0;try{localStorage.setItem(KEY,JSON.stringify(buf))}catch(_){buf.splice(0,buf.length>>1)}},800)};
  function ev(type,data){const e=Object.assign({s:sid,at:Date.now(),type,room:(typeof G!=='undefined'&&G&&G.room)||null,gt:(typeof G!=='undefined'&&G&&G.time)||null},data||{});buf.push(e);if(buf.length>500)buf.splice(0,buf.length-500);dirty=true;save()}
  const clip=x=>String(x&&x.stack||x&&x.message||x).slice(0,600);
  addEventListener('error',e=>ev('error',{msg:clip(e.error||e.message),src:(e.filename||'').split('/').pop()+':'+e.lineno}));
  addEventListener('unhandledrejection',e=>ev('error',{msg:'promise: '+clip(e.reason)}));
  const ce=console.error.bind(console);console.error=(...a)=>{ev('console',{msg:a.map(clip).join(' ').slice(0,600)});ce(...a)};
  const cw=console.warn.bind(console);console.warn=(...a)=>{ev('warn',{msg:a.map(clip).join(' ').slice(0,400)});cw(...a)};
  /* stalls: any frame that takes more than a quarter second while the game is on screen */
  let last=0,fr=0,acc=0,worst=0;const watch=t=>{if(last&&!document.hidden){const d=t-last;if(typeof G!=='undefined'&&G&&!$('#play').hidden){fr++;acc+=d;worst=Math.max(worst,d);if(d>250)ev('stall',{ms:Math.round(d),busy:GL&&GL.entering?'entering':''})}}last=t;requestAnimationFrame(watch)};requestAnimationFrame(watch);
  document.addEventListener('visibilitychange',()=>{last=0;ev(document.hidden?'hidden':'shown')});
  setInterval(()=>{if(fr>20)ev('fps',{avg:Math.round(acc/fr*10)/10,worst:Math.round(worst),scale:GL&&GL.scale,rooms:GL&&GL.rooms?Object.keys(GL.rooms).length:0,heap:performance.memory?Math.round(performance.memory.usedJSHeapSize/1048576):null});fr=0;acc=0;worst=0},30000);
  /* when the game runs as the Claude page, the log is also kept where Claude can read it */
  (async()=>{try{if(!(window.claude&&claude.use))return;const db=await claude.use('db');if(!db)return;ev('log',{msg:'synced to Claude'});
    const push=async()=>{if(!dirty)return;dirty=false;const mine=buf.filter(e=>e.s===sid).slice(-300);try{await db.doc('logs/'+sid).set({meta,updated:Date.now(),n:mine.length,events:mine});sent++}catch(e){dirty=true}};
    setInterval(push,20000);addEventListener('pagehide',push);document.addEventListener('visibilitychange',()=>{if(document.hidden)push()})}catch(_){}})();
  const text=()=>[`Blackwood Lodge problem log · ${meta.ver} · ${meta.screen} @${meta.dpr}x · ${meta.ua}`].concat(buf.map(e=>{const d=new Date(e.at);const {s,at,type,room,gt,...rest}=e;return `${d.toLocaleDateString()} ${d.toLocaleTimeString()} [${type}]${room?' '+room:''} ${JSON.stringify(rest)}`})).join('\n');
  return {ev,buf:()=>buf,text,meta,clear(){buf=[];try{localStorage.removeItem(KEY)}catch(_){}}}})();
window.LOG3=LOG3;LOG3.ev('open',{ver:LOG3.meta.ver});
const startGame3l=startGame;startGame=function(seed,arch,ep,...a){LOG3.ev('start',{seed,arch,ep:ep&&ep.n||ep&&ep.title||''});return startGame3l(seed,arch,ep,...a)};
const dice3l=dice3;dice3=function(rolls,done){LOG3.ev('roll',{r:(rolls||[]).map(r=>`${r.stat} ${r.d}+${r.mod}=${r.tot} vs ${r.dc} ${r.ok?'ok':'fail'}`).join('; ')});return dice3l(rolls,done)};
const ending3l=ending;ending=function(...a){if(G&&!G._logEnd){G._logEnd=1;LOG3.ev('end',{over:G.over})}return ending3l(...a)};
setTimeout(()=>{try{GL.cv&&GL.cv.addEventListener('webglcontextlost',()=>LOG3.ev('error',{msg:'3D context lost'}))}catch(_){}},4000);

/* the log screen: long-press the clock, or open it from the title menu, then copy it into a chat */
function logScreen3(){const n=LOG3.buf().length,errs=LOG3.buf().filter(e=>/error|console/.test(e.type)).length,stalls=LOG3.buf().filter(e=>e.type==='stall').length;
  const rows=LOG3.buf().slice(-80).reverse().map(e=>{const {s,at,type,room,gt,...rest}=e;return `<div class="lg3 ${/error|console/.test(type)?'bad':type==='stall'?'warn':''}"><time>${new Date(at).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'})}</time><span><b>${type.toUpperCase()}</b> ${room||''} ${Object.keys(rest).length?JSON.stringify(rest).replace(/[{}"]/g,'').replace(/,/g,', ').slice(0,220):''}</span></div>`}).join('');
  $('#log3w')?.remove();document.body.insertAdjacentHTML('beforeend',`<div class="log3w" id="log3w" role="dialog" aria-label="Problem log"><div class="in"><div class="hd3"><span class="ttl">PROBLEM LOG</span><button class="close3" aria-label="Close">✕</button></div>
    <p class="sum">${n} entries · <b>${errs}</b> errors · <b>${stalls}</b> stalls</p><div class="rows">${rows||'<p class="none3">Nothing logged yet.</p>'}</div>
    <div class="acts"><button class="btn3" data-a="copy">COPY LOG</button><button class="btn3 wood3" data-a="clear">CLEAR</button></div><small>Copy it and paste it into the chat with Claude.</small></div></div>`);
  const w=$('#log3w');w.querySelector('.close3').onclick=()=>w.remove();w.onclick=e=>{if(e.target===w)w.remove()};
  w.querySelector('[data-a=copy]').onclick=async e=>{const t=LOG3.text();let ok=false;try{await navigator.clipboard.writeText(t);ok=true}catch(_){}if(!ok){const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{ok=document.execCommand('copy')}catch(_){}ta.remove()}e.target.textContent=ok?'COPIED':'COPY FAILED'};
  w.querySelector('[data-a=clear]').onclick=()=>{LOG3.clear();w.remove()}}
window.logScreen3=logScreen3;
(()=>{let t=0;document.addEventListener('pointerdown',e=>{if(e.target.closest&&e.target.closest('#watch3,.logbtn3')){clearTimeout(t);t=setTimeout(logScreen3,700)}},true);['pointerup','pointercancel','pointerleave'].forEach(k=>document.addEventListener(k,()=>clearTimeout(t),true));
  document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.logbtn3'))logScreen3()},true);
  const add=()=>{let b=document.querySelector('.logbtn3');if(!b){document.body.insertAdjacentHTML('beforeend','<button class="logbtn3" type="button" aria-label="Problem log" hidden>PROBLEM LOG</button>');b=document.querySelector('.logbtn3')}const pl=document.querySelector('#play');b.hidden=!!(pl&&!pl.hidden)};setInterval(add,700);add()})();

/* the satchel: choosing a thing changes the label in place, the sheet stays where it is */
const satchel3f=satchel;satchel=function(selKey){const open=$('#scr3.sat3w'),inner=open&&open.querySelector('.sat3'),y=inner?inner.scrollTop:0;
  if(open&&selKey){const c0=SND.click,b0=SND.bag;SND.click=()=>{};SND.bag=()=>{};try{satchel3f(selKey)}finally{SND.click=c0;SND.bag=b0}try{SND.choose()}catch(_){}
    const s=$('#scr3');if(s){s.classList.add('still3');const sc=$('#scrimh3');sc&&sc.classList.add('still3');const i2=s.querySelector('.sat3');if(i2)i2.scrollTop=y}return}
  return satchel3f(selKey)};

/* the board remembers the clues you haven't looked at yet */
const board3f=board;board=function(...a){if(G)G._newC=0;newBadge3();return board3f(...a)};
const refresh3f=refresh;refresh=function(...a){const r=refresh3f(...a);try{newBadge3()}catch(_){}return r};

/* nobody appears from nowhere: footsteps, the door, and the narrator says who came in (or who slipped out) */
const ENTER3={'Harriet Vane':'Harriet Vane comes in, cigarette holder first, and looks the room over as if it owes her money.',
 'Dr. Okafor':'Dr. Okafor steps in with his bag, quiet as a ward round.',
 'Tomas Reyes':'Tomas Reyes drifts in and finds a wall to lean on.',
 'Iris Lund':'Iris Lund slips in clutching her folder, and stops when she sees you.',
 'Colonel Ash':'The tap of a cane. Colonel Ash comes in and plants himself by the door.',
 'Nell Parry':'Nell Parry backs through the door with a tea tray, cups rattling.',
 'Lionel Crane':'A lantern swings into the room ahead of him. Lionel Crane.',
 'Mrs. Dunmore':'Keys jangle. Mrs. Dunmore lets herself in, the way she does every room.',
 'Felix Osei':'Felix Osei wanders in, paint on his cuffs, humming under his breath.',
 'Agnes Teale':'Agnes Teale comes in checking her watch, as if the night were running late.',
 'Piet Hollander':'Piet Hollander edges in, something porcelain cradled in both hands.',
 'Marguerite Sol':'Marguerite Sol sweeps in, champagne glass first, and the room goes quiet.'};
const LEAVE3=['{n} slips out without a word.','{n} leaves. The door clicks shut behind them.','You look up and {n} is gone.'];
function steps3(n,leaving){try{SND.init();if(!SND.ctx)return;if(leaving){SND.door();for(let i=0;i<3;i++)setTimeout(()=>{try{SND.step()}catch(_){}},350+i*330)}else{for(let i=0;i<3;i++)setTimeout(()=>{try{SND.step()}catch(_){}},i*330);setTimeout(()=>{try{SND.door()}catch(_){}},1050)}}catch(_){}}
const doAct3w=doAct;doAct=function(fn,o){if(!G)return doAct3w(fn,o);const g=G;let r0,h0;
  return doAct3w(()=>{r0=G.room;h0=new Set(npcsIn(G,G.room).map(s=>s.id));fn();if(G!==g||G.room!==r0||G.over)return;
    const now=npcsIn(G,G.room),came=now.filter(s=>!h0.has(s.id)),went=[...h0].filter(id=>!now.some(s=>s.id===id)&&!G.flags['dead_'+id]).map(id=>G.M.sus.find(s=>s.id===id)).filter(Boolean);
    came.forEach(s=>say(G,ENTER3[s.n]||`Footsteps. ${s.n} comes in.`,'arrive'));
    went.forEach(s=>{if(P3.talk===s.id)return;say(G,LEAVE3[Math.floor(hash3(s.id+G.time)*LEAVE3.length)].replace('{n}',short(s.n)),'dim')});
    if(came.length)setTimeout(()=>steps3(came.length,false),250);else if(went.length)setTimeout(()=>steps3(went.length,true),250);
    if(came.length||went.length)LOG3.ev('guests',{came:came.map(s=>s.id).join(','),went:went.map(s=>s.id).join(',')})},o)};

/* dawn: before you name them, you can still look at the board, the notebook and the satchel; closing any of them brings you back */
const accuseSheet3f=accuseSheet;accuseSheet=function(forced,...a){if(G)G._accBack=false;const r=accuseSheet3f(forced,...a);const acc=$('#scr3 .acc3');if(!acc||!G)return r;
  const sel=G._accSel||(G._accSel={});
  acc.querySelectorAll('[data-s]').forEach(b=>b.addEventListener('click',()=>{sel.s=b.dataset.s}));acc.querySelectorAll('[data-w]').forEach(b=>b.addEventListener('click',()=>{sel.w=b.dataset.w}));
  if(sel.s)acc.querySelector(`[data-s="${sel.s}"]`)?.click();if(sel.w)acc.querySelector(`[data-w="${sel.w}"]`)?.click();
  const sub=acc.querySelector('.sub');sub&&sub.insertAdjacentHTML('afterend',`<div class="peek3"><button type="button" data-p="board">${DOCK.brd}<span>BOARD</span></button><button type="button" data-p="journal">${DOCK.nb}<span>NOTEBOOK</span></button><button type="button" data-p="satchel">${DOCK.sat}<span>SATCHEL</span></button></div>`);
  acc.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{const f=b.dataset.p,fr=!!forced;G._accBack=fr?'forced':'open';if(f==='board')board();else if(f==='journal')journal();else satchel();G._accBack=fr?'forced':'open'});
  return r};
document.addEventListener('click',e=>{if(!G||!G._accBack||G.over)return;const t=e.target.closest&&e.target.closest('#scr3 .close3,#scrimh3');if(!t||$('#scr3 .acc3'))return;const f=G._accBack==='forced';setTimeout(()=>{if(G&&!G.over&&!$('#scr3 .acc3'))accuseSheet(f)},30)});
