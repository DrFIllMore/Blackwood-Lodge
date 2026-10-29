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
