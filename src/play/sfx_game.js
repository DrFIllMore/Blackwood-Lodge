/* ---------- every action makes a sound ---------- */
function S3(n,...a){try{SND.init();if(!SND.ctx)return;if(typeof n==='function')n();else SND[n](...a)}catch(_){}}
/* sounds that answer a roll wait for the die to land */
const SQ3=[];function q3(n,d=0,...a){SQ3.push([n,d,a])}
function flush3(base=0){const l=SQ3.splice(0);for(const [n,d,a] of l)setTimeout(()=>S3(n,...a),base+d)}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('button');if(!b)return;
  if(b.matches('.opt3,.go3,.cta3,.tray3 button,.who button,.wpn button,.roles button'))S3('choose');
  else if(b.matches('.leave3,.close3,.hb3,.close,.btn3'))S3('click')},true);
const doAct30=doAct;
doAct=function(fn,o={}){if(!G)return doAct30(fn,o);const g=G,r0=G.room,t0=G.time,p0=!!G.flags.power_out,l0=G.light,ev0=G.ev.length;
  return doAct30(()=>{fn();if(G!==g)return;
    if(G.room!==r0){S3('door');setTimeout(()=>S3('step'),650)}
    if(!p0&&G.flags.power_out)q3('powerCut',300);
    if(l0!==G.light&&G.flags.power_out)S3('torch');
    const h0=Math.floor(t0/60),h1=Math.floor(G.time/60);if(h1>h0&&G.time>=21*60)q3('chime',1400,h1%24);
    if(G.ev.slice(ev0).some(e=>e.id.startsWith('contra_')))q3('lie',500);
    if(!(G.rolls||[]).length)flush3(120)},o)};
const dice30=dice3;dice3=function(rolls,done){S3('shake');return dice30(rolls,(...a)=>{flush3(250);return done(...a)})};
const sting30=BGM.sting.bind(BGM);BGM.sting=function(ok){S3('land');return sting30(ok)};
const nightCheck30=nightCheck;nightCheck=function(t0){const n0=G.log.length;nightCheck30(t0);if(G.log.slice(n0).some(l=>l.cls==='night'))q3(Math.random()<.4?'thunder':'night',200)};
const searchAs30=searchAs;searchAs=function(Gx,spot,w){S3(/desk|drawer|dresser|sideboard|chest|trunk|wardrobe|counter|bench|crate/.test(String(spot))?'drawer':'search');return searchAs30(Gx,spot,w)};
const examineAs30=examineAs;examineAs=function(Gx,w){S3('search');return examineAs30(Gx,w)};
const bodyTap30=bodyTap;bodyTap=function(){if(!G.flags.body&&!G._bodySeen){G._bodySeen=1;S3('night')}return bodyTap30()};
const useItem30=useItem;useItem=function(id){if(id==='lockpicks'||id==='hairpins'||id==='screwdriver')q3('lock');else if(id==='crowbar')q3('pry');else if(id==='matches')S3('torch');return useItem30(id)};
const openTalk30=openTalk;openTalk=function(...a){S3('talk');return openTalk30(...a)};
const press30=press;press=function(s,mode,o){const c0=(G.comp||{})[s.id]??4;S3('heart');press30(s,mode,o);const c1=(G.comp||{})[s.id]??4;if(c1<c0&&c1>0)q3('crack',150)};
const breakdown30=breakdown;breakdown=function(s){q3(s.id===G.M.killer?'slip':'breakdown',200);return breakdown30(s)};
const flyNew30=flyNew;flyNew=function(ev0,it0){if(G&&(G.ev.length>ev0||(G.items||[]).length>it0))setTimeout(()=>S3('fly'),420);return flyNew30(ev0,it0)};
const satchel30=satchel;satchel=function(...a){S3('bag');return satchel30(...a)};
const journal30=journal;journal=function(...a){S3('page');return journal30(...a)};
const board30=board;board=function(...a){S3('pin');return board30(...a)};
const accuseSheet30=accuseSheet;accuseSheet=function(...a){S3('pin');return accuseSheet30(...a)};
const accuse30=accuse;accuse=function(...a){S3('accuse');return accuse30(...a)};
const ending30=ending;ending=function(...a){if(G&&['wrong','weak','dead'].includes(G.over)&&!G._endSnd){G._endSnd=1;setTimeout(()=>S3('lose'),300)}const bd=SND.bad;if(G&&G.over!=='dead')SND.bad=()=>{};try{return ending30(...a)}finally{SND.bad=bd}};
/* the score follows the night even between taps */
setInterval(()=>{try{if(BGM.ctx)BGM.set(bgmMode())}catch(_){}},1200);
