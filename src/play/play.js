/* ---------- PLAY LAYER ----------
   One voice (the narrator frame), choices written as things you'd do, real dice, and objects instead of menus:
   pocket watch, portrait, satchel, case board, notebook. Drives the engine above: search, examine, talk, warn, repair, move, accuse. */
const P3={busy:false,talk:null};
const STATN={wits:'Wits',body:'Body',nerve:'Nerve',charm:'Charm'};
const SIGP={wits:'<path d="M8 20s5-7 12-7 12 7 12 7-5 7-12 7-12-7-12-7z" fill="none" stroke="#ffc83d" stroke-width="1.6"/><circle cx="20" cy="20" r="3.2" fill="#ffc83d"/>',
 body:'<path d="M13 22v-6a2 2 0 0 1 4 0v-2a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v1a2 2 0 0 1 3 1.5V24c0 4-3 7-7 7h-1c-4 0-7-3-7-7z" fill="none" stroke="#ffc83d" stroke-width="1.6" stroke-linejoin="round"/>',
 nerve:'<path d="M20 9c5 6 7 9 7 13a7 7 0 0 1-14 0c0-4 2-7 7-13z" fill="none" stroke="#ffc83d" stroke-width="1.6"/><path d="M20 19c2 2.5 2.6 3.8 2.6 5a2.6 2.6 0 0 1-5.2 0c0-1.2.6-2.5 2.6-5z" fill="#ffc83d"/>',
 charm:'<path d="M10 12h20v12H18l-5 4v-4h-3z" fill="none" stroke="#ffc83d" stroke-width="1.6" stroke-linejoin="round"/><path d="M15 18h10" stroke="#ffc83d" stroke-width="1.6"/>',
 sure:'<path d="M14 9h12M14 31h12M15 9c0 6 10 7 10 11s-10 5-10 11M25 9c0 6-10 7-10 11s10 5 10 11" fill="none" stroke="#ffc83d" stroke-width="1.6"/>',
 bag:'<path d="M15 15c0-6 10-6 10 0" fill="none" stroke="#ffc83d" stroke-width="1.6"/><rect x="10" y="15" width="20" height="15" rx="3" fill="none" stroke="#ffc83d" stroke-width="1.6"/><path d="M10 20h20" stroke="#ffc83d" stroke-width="1.4"/>',
 lock:'<rect x="13" y="19" width="14" height="11" rx="2" fill="none" stroke="#ffc83d" stroke-width="1.6"/><path d="M16 19v-3a4 4 0 0 1 8 0v3" fill="none" stroke="#ffc83d" stroke-width="1.6"/>'};
const sig=(k,inner)=>{const L={wits:'WIT',body:'BOD',nerve:'NER',charm:'CHA'}[k];return `<svg class="sig" viewBox="0 0 40 40" aria-hidden="true"><rect x="1" y="1" width="38" height="38" fill="#0c0c0f"/>${L?`<text x="20" y="27.5" text-anchor="middle" font-family="Bebas Neue, Impact, sans-serif" font-size="19" fill="#ffc83d" letter-spacing="1">${L}</text>`:(inner||SIGP[k]||'')}</svg>`};
const TOOLI={torch:'<path d="M18 8h20l-4 12H22z" fill="#d9b25e"/><rect x="23" y="20" width="10" height="30" rx="3" fill="#b98d3e"/><rect x="25" y="28" width="6" height="4" fill="#3a2a12"/><ellipse cx="28" cy="9" rx="10" ry="2.5" fill="#fff4cf"/>',
 lockpicks:'<rect x="8" y="34" width="16" height="9" rx="3" fill="#6a4426" transform="rotate(-40 16 38)"/><path d="M20 32L44 8l3 1-2 3" fill="none" stroke="#d6d6d6" stroke-width="2.4" stroke-linecap="round"/><path d="M24 36L46 16l2 4-3 1 2 2" fill="none" stroke="#a8a8a8" stroke-width="2.2" stroke-linecap="round"/>',
 opener:'<path d="M10 46L38 18l4 2-26 30z" fill="#e2e2e2" stroke="#8a8a8a"/><path d="M36 14l8 8 5-5-8-8z" fill="#c39a4a" stroke="#6b4c1e"/><circle cx="47" cy="11" r="3" fill="#8a1a1f"/>',
 matches:'<rect x="6" y="18" width="44" height="24" rx="2" fill="#2a4a6a"/><rect x="6" y="25" width="44" height="10" fill="#e8d3a8"/><path d="M16 18V8M22 18V9" stroke="#e8d3a8" stroke-width="2.4"/><circle cx="16" cy="8" r="2.4" fill="#c0262e"/><circle cx="22" cy="9" r="2.4" fill="#c0262e"/>',
 screwdriver:'<rect x="6" y="36" width="20" height="10" rx="4" fill="#c0262e" transform="rotate(-45 16 41)"/><path d="M22 34L46 10" stroke="#d6d6d6" stroke-width="3" stroke-linecap="round"/>',
 crowbar:'<path d="M12 48L42 12c2-3 6-2 6 2" fill="none" stroke="#5a5a64" stroke-width="5" stroke-linecap="round"/><path d="M12 48l-5-3" stroke="#5a5a64" stroke-width="5" stroke-linecap="round"/>',
 hairpins:'<path d="M14 46L36 10l4 1M20 48L42 12l4 1" fill="none" stroke="#2a2a2a" stroke-width="2.4" stroke-linecap="round"/>',
 brandy:'<path d="M22 8h12v8l6 8v24H16V24l6-8z" fill="#8a4a1a" stroke="#4a2a10" stroke-width="1.5"/><rect x="20" y="28" width="16" height="12" fill="#ffffff"/>',
 magnifier:'<circle cx="24" cy="22" r="13" fill="#bcd4e644" stroke="#c39a4a" stroke-width="4"/><path d="M33 31l14 14" stroke="#6a4426" stroke-width="6" stroke-linecap="round"/>',
 scalpel:'<path d="M8 46L28 26" stroke="#9a9aa2" stroke-width="5" stroke-linecap="round"/><path d="M28 26l16-14c2 3 0 8-5 11l-7 6z" fill="#ececf2" stroke="#8a8a8a"/>',
 flask:'<rect x="14" y="12" width="28" height="36" rx="6" fill="#c0c0c8" stroke="#6a6a72" stroke-width="2"/><rect x="23" y="6" width="10" height="7" rx="2" fill="#8a8a92"/><path d="M18 22h20" stroke="#ffffff88" stroke-width="2"/>',
 knife:'<path d="M8 46l12-12" stroke="#4a3020" stroke-width="7" stroke-linecap="round"/><path d="M20 34L46 10c2 4-2 12-20 30z" fill="#d8d8de" stroke="#8a8a8a"/>'};
const toolSvg=id=>`<svg viewBox="0 0 56 56" aria-hidden="true">${TOOLI[id]||''}</svg>`;
const toolSig=id=>sig('',`<g transform="translate(6 6) scale(.5)">${TOOLI[id]||''}</g>`);
const PHYS=['weapon','item','fibres','diary'];
function evIcon(e){const M=G.M,k=M.sus.find(s=>s.id===M.killer),col=COATC[k.coat]||'#2f5e3a';const id=e.id;
  const paper='<path d="M12 6h24l8 8v36H12z" fill="#ffffff" stroke="#6b4c1e"/><path d="M36 6v8h8" fill="#e8e8ee" stroke="#6b4c1e"/><path d="M17 22h22M17 29h22M17 36h14" stroke="#3a2414" stroke-width="1.6"/>';
  let p=paper;
  if(id==='weapon'||id.startsWith('home_'))p={poker:'<path d="M14 48L42 10" stroke="#2a2a2a" stroke-width="4" stroke-linecap="round"/><path d="M42 10l4 7M41 9l7-2" stroke="#2a2a2a" stroke-width="3" stroke-linecap="round"/><circle cx="13" cy="49" r="4.5" fill="#c39a4a"/>',
    knife:TOOLI.knife,cord:'<path d="M8 14c10 0 10 10 20 10s10 10 18 10" fill="none" stroke="#c9a24a" stroke-width="4"/><path d="M46 34l1 12M44 34l-3 11M48 34l6 10" stroke="#c9a24a" stroke-width="2"/>',
    wrench:'<path d="M14 46L34 26" stroke="#5a5a64" stroke-width="7" stroke-linecap="round"/><path d="M34 12a11 11 0 1 0 9 15l-7-2-2-7 5-6z" fill="#5a5a64"/>',statue:'<path d="M16 48h24v-6H16z" fill="#7a5a22"/><path d="M21 42c-2-10 2-25 8-29 6 4 8 19 6 29z" fill="#b08a3a"/>'}[M.weapon.id];
  else if(id==='item')p=`<circle cx="28" cy="28" r="17" fill="${col}" stroke="#0009" stroke-width="2"/><circle cx="28" cy="28" r="12" fill="none" stroke="#0005"/><circle cx="24" cy="24" r="2" fill="#0a0a0a"/><circle cx="32" cy="24" r="2" fill="#0a0a0a"/><circle cx="24" cy="32" r="2" fill="#0a0a0a"/><circle cx="32" cy="32" r="2" fill="#0a0a0a"/>`;
  else if(id==='fibres')p=`<path d="M10 40c8-14 14-4 20-16s10-8 16-14M14 46c10-10 16-2 24-12M18 36c6-6 10-2 14-8" fill="none" stroke="${col}" stroke-width="2.6" stroke-linecap="round"/>`;
  else if(id==='diary')p='<path d="M8 14h40v30H8z" fill="#ffffff" stroke="#6b4c1e"/><path d="M8 14l20 16 20-16" fill="none" stroke="#6b4c1e"/><circle cx="28" cy="35" r="5" fill="#8a1418"/>';
  else if(id==='clock')p='<circle cx="28" cy="28" r="18" fill="#ffffff" stroke="#c39a4a" stroke-width="4"/><path d="M28 28V16M28 28l-9-5" stroke="#1a120a" stroke-width="2.4" stroke-linecap="round"/><path d="M14 20l26 16" stroke="#6b4c1e" stroke-width="1"/>';
  else if(id==='smear')p='<path d="M18 8c0 14-2 26 0 40M25 8c0 14 0 26 1 40M32 9c-1 12 0 24 2 38M39 12c-1 10 0 20 2 30" stroke="#6a0c10" stroke-width="3.4" stroke-linecap="round" fill="none"/>';
  else if(id==='coat')p=`<path d="M20 8h16l10 10-4 6-4-3v29H18V21l-4 3-4-6z" fill="${col}" stroke="#0007"/><circle cx="28" cy="26" r="1.8" fill="#c9b48a"/><circle cx="28" cy="40" r="1.8" fill="#c9b48a"/>`;
  return `<svg viewBox="0 0 56 56" aria-hidden="true">${p}</svg>`}
function evName(e){const M=G.M,id=e.id;if(id==='weapon')return M.weapon.n[0].toUpperCase()+M.weapon.n.slice(1);if(id.startsWith('home_'))return 'Missing '+M.weapon.n.split(' ').pop();
  if(id.startsWith('contra_'))return short(M.sus.find(s=>s.id===id.slice(7)).n)+'\'s lie';if(id.startsWith('clear_'))return short(M.sus.find(s=>s.id===id.slice(6)).n)+' cleared';
  return {item:'Torn button',fibres:'Wool fibres',diary:'The letter',wound:'The wound',clock:'Stopped clock',smear:'Hand smear',coat:'Coat on the rack',witness:'Witness account',glimpse:'Your attacker',liar2:'A lie admitted',slip:'The slip',trail:'Moved in the night',track:'Attic track',room_lounge:'Lounge glasses'}[id]||'A note'}
/* people: a figure in their coat colour, tall or short. Faces come with the character pass. */
function sil(s,crop){const c=COATC[s.coat]||'#333',sc=s.height==='tall'?1:.88;const vb=crop?'60 30 220 250':'0 0 340 640';
  return `<svg viewBox="${vb}" preserveAspectRatio="xMidYMax ${crop?'slice':'meet'}" aria-hidden="true"><defs><linearGradient id="rim${s.id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffd8a0" stop-opacity=".22"/><stop offset=".5" stop-color="#ffd8a0" stop-opacity="0"/></linearGradient></defs><g transform="translate(170 640) scale(${sc}) translate(-170 -640)"><ellipse cx="170" cy="118" rx="50" ry="62" fill="#2b2620"/><path d="M122 96c4-44 92-44 96 0-10-16-30-22-48-22s-38 6-48 22z" fill="#171310"/><path d="M150 172h40l8 32c60 10 98 44 106 108l22 328H14L34 312c8-64 46-98 106-108z" fill="${c}"/><path d="M150 204h40l-20 66z" fill="#d8ccb4" opacity=".5"/><path d="M34 312c8-64 46-98 106-108l30 436H14z" fill="#000" opacity=".2"/><rect x="0" y="0" width="340" height="640" fill="url(#rim${s.id})"/></g></svg>`}
const meSil='<svg viewBox="0 0 46 52" aria-hidden="true"><circle cx="23" cy="22" r="8" fill="#3a2e24"/><path d="M8 52c2-12 8-17 15-17s13 5 15 17z" fill="#3a2e24"/><path d="M12 17h22l-3-7H15z" fill="#241a12"/><path d="M9 18h28" stroke="#241a12" stroke-width="2.4"/></svg>';
const CANDLE='<svg viewBox="0 0 12 18" aria-hidden="true"><path d="M6 1c3 4 4 6 4 9a4 4 0 0 1-8 0c0-3 1-5 4-9z" fill="#ffb347"/><path d="M6 7c1.5 2 2 3 2 4a2 2 0 0 1-4 0c0-1 .5-2 2-4z" fill="#fff1b8"/></svg>',SMOKE='<svg viewBox="0 0 12 18" aria-hidden="true"><path d="M6 17c-1-3 2-4 0-8M6 9c-2-2 1-4 0-7" fill="none" stroke="#9a9a9a" stroke-width="1" opacity=".7"/></svg>';
function watchSVG(m){return `<span class="tt3">${fmtT(m)}</span>`}
const DOCK={sat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',brd:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="16"/><path d="M7 9l5 3 4-4"/></svg>',nb:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>'};
const EYE='<svg viewBox="0 0 24 24" fill="none" stroke="#ffc83d" stroke-width="1.6" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const CHEV='<svg viewBox="0 0 24 24" fill="none" stroke="#ffc83d" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',BACK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
/* ---------- odds, tools ---------- */
function odds(stat,dc,adv,key){const mod=G.st[stat]+(G.light||stat==='nerve'?0:-2)+3*((G.miss||{})[key]||0);let n=0;for(let d=1;d<=20;d++)if(d===20||(d!==1&&d+mod>=dc))n++;let p=n/20;if(adv>0)p=1-(1-p)*(1-p);if(adv<0)p=p*p;return p}
const oddsWord=p=>p>=.85?'very likely':p>=.65?'likely':p>=.45?'even odds':p>=.25?'risky':'a long shot';
const hasTool=id=>(G.items||[]).some(x=>x.id===id);
function toolFor(tag){for(const it of G.items||[]){const T=TOOLS[it.id];if(!T||!T.tags.includes(tag))continue;if(T.uses&&it.uses<=0)continue;if(tag==='dark'){if(!G.flags.power_out)continue;if(it.id==='torch'&&(!G.light||G.batt<=0))continue}return it}return null}
function useItem(id){const it=(G.items||[]).find(x=>x.id===id);if(it&&TOOLS[id]&&TOOLS[id].uses)it.uses=Math.max(0,it.uses-1)}
const ATOOL={opener:'a letter opener',matches:'a box of matches',screwdriver:'a screwdriver',crowbar:'a crowbar',hairpins:'a saucer of hairpins',brandy:'a medicine bottle of brandy',magnifier:'a magnifying glass'};
const TOOLV={lock:n=>`Pick it with the ${n}.`,pry:n=>`Prise it open with the ${n}. No noise.`,read:n=>`Go over it with the ${n}.`,dark:n=>n==='torch'?'Shine the torch in and look properly.':'Strike a match and look properly.',heavy:n=>`Lever it aside with the ${n}.`,body:n=>`Work over the wound with your ${n}.`,repair:n=>`Work on it with the ${n}.`};
function optOf(w,it,rk,run){const sp={...w};let t=w.t,ic=sig(w.sure?'sure':w.stat);
  if(it){const T=TOOLS[it.id];sp.tool=it.id;ic=toolSig(it.id);t=TOOLV[w.tag](T.n.toLowerCase());if(w.sure){if(w.loud)sp.loud=0;else sp.mins=Math.max(5,Math.round(w.mins/2))}else sp.adv=1}
  let s;if(sp.sure)s=`Certain · ${sp.mins} min${sp.loud?' · <span class="warn">the house will hear</span>':''}`;else s=`${STATN[w.stat]} · ${oddsWord(odds(w.stat,w.dc,sp.adv||0,rk))} · ${sp.mins} min${sp.adv?' · two dice, keep the best':''}`;
  if(it&&TOOLS[it.id].uses)s+=' · uses one';return {t,s,ic,f:()=>run(sp)}}
function wayOpts(ways,rk,run){const out=[];for(const w of ways){out.push(optOf(w,null,rk,run));const it=w.tag&&toolFor(w.tag);if(it)out.push(optOf(w,it,rk,run))}return out}
/* ---------- the engine, driven by choices ---------- */
function loudNoise(G){G.susp++;say(G,'The noise goes right through the house. Anyone awake knows where you are now.','bad')}
function searchAs(G,spot,w){const M=G.M,room=G.room,key=room+':'+spot,name=SPOTS[room][spot]||spot;G.lead=G.lead||{};G.taken=G.taken||{};tick(G,w.mins||10);if(w.tool)useItem(w.tool);
  const tl=TOOLSPOT[key],toolHere=!!tl&&!G.taken[tl]&&!hasTool(tl);const what=spotHolds(G,room,spot)||(toolHere?'tool':null);
  let ok=!!w.sure||!!G.lead[key];if(!ok){G._rk='search:'+key;G._adv=w.adv||0;ok=roll(G,w.stat,w.dc,'Search the '+name)}
  if(w.loud)loudNoise(G);
  if(!ok){const fum=G.lastRoll&&G.lastRoll.fumble,k=M.sus.find(s=>s.id===M.killer);
    if(what){G.lead[key]=1;say(G,{weapon:`Something heavy is wedged deep in the ${name}. Your fingers touch it and lose it. It's in there; another go will have it.`,item:`Caught in the ${name}: a few ${k.coat} wool fibres. Something torn from a coat is close by.`,diary:`A corner of folded paper, stuck fast in the ${name}. It needs a steadier hand.`,trail:`The dust in the ${name} has been disturbed. Something lay here.`,tool:`Something small rattles at the back of the ${name}. Your fingers miss it.`}[what],'ev');
      if(what==='item')addEv(G,'fibres',`${k.coat[0].toUpperCase()+k.coat.slice(1)} wool fibres caught in the study ${name}: torn from a coat.`)}
    else{G.searched[key]=1;say(G,`You go through the ${name} in a hurry. Nothing there.`,'dim')}
    if(fum){G.susp++;say(G,'Something falls and shatters. Whoever is awake knows where you are.','bad')}return}
  G.searched[key]=1;G.found=G.found||{};delete G.lead[key];
  if(toolHere){G.taken[tl]=1;G.items.push({id:tl,uses:TOOLS[tl].uses||0});G.found[key]=1;say(G,`In the ${name}: ${ATOOL[tl]}. It goes in your satchel.`,'ev')}
  if(what==='weapon'){G.found[key]=1;addEv(G,'weapon',`The ${M.weapon.n}, wiped badly, hidden in the ${name} in the ${ROOMS[room].n.toLowerCase()}.`);G.susp++;return}
  if(what==='item'){G.found[key]=1;addEv(G,'item',`In the ${name}: ${M.itemDesc}, torn off in a struggle.`);return}
  if(what==='diary'){G.found[key]=1;const [x,y]=M.diary.map(id=>M.sus.find(s=>s.id===id));addEv(G,'diary',`A letter from the victim, folded into the ${name}: "${x.n} and ${y.n} both have reason to want me quiet. One of them ${M.motive}."`);return}
  if(what==='trail'){G.flags.trail=true;G.found[key]=1;say(G,`A clean patch in the dust in the ${name}, where something lay until tonight. It was moved.`,'ev');return}
  if(!toolHere)say(G,w.sure?`You take the ${name} apart and put it back. Nothing here.`:`Nothing in the ${name}.`,'dim')}
function examineAs(G,w){const M=G.M;if(G.flags.body){tick(G,2);return say(G,'You have seen what there is to see.','dim')}tick(G,w.mins);if(w.tool)useItem(w.tool);const she=/Margaret|Celia|Rose/.test(M.victim.n)?'she':'he';
  let ok=!!w.sure;if(!ok){G._rk='examine';G._adv=w.adv||0;ok=roll(G,w.stat,w.dc,'Examine the body')}
  if(ok){G.flags.body=true;say(G,`${M.victim.n} lies where ${she} fell. Looking closely: ${M.weapon.wound}. ${weaponHint(M.weapon)}`);addEv(G,'wound',`The wound fits ${weaponHint(M.weapon).toLowerCase()}`)}
  else{G.flags.bodyLook=true;const where={poker:'the back of the head',wrench:'the head',statue:'the crown of the head',knife:'the body, below the ribs',cord:'the throat'}[M.weapon.id];say(G,`The wound is to ${where}. You can't yet say what made it; another look would tell you more.`)}}
function repairAs(G,w){if(G.radio){tick(G,2);return say(G,'The radio is already working.','dim')}tick(G,w.mins);let ok=!!w.sure;if(!ok){G._rk='radio';G._adv=w.adv||0;ok=roll(G,w.stat,w.dc,'Repair the wireless')}
  if(ok){G.radio=true;G.police=Math.min(G.R.dawn,G.time+G.R.policeDelay);say(G,`Static, then a voice. The police can be here by ${fmtT(G.police)}. Until then you are on your own, and so is everyone else.`,'ev')}else say(G,'Wires and frost. Not yet, but you have found the broken valve; the next try will go better.','dim')}
function instinct(G){const R=G.room;G.notice=G.notice||{};for(const id of Object.keys(SPOTS[R]||{})){const key=R+':'+id;if(G.notice[key]||G.searched[key])continue;const what=spotHolds(G,R,id);if(!what)continue;G.notice[key]=1;
    const d=G.r.int(20)+1;if(d+G.st.wits+(G.light?0:-2)>=14){const x=SPOTX[key]||{k:'container'},n=SPOTS[R][id];const t=what==='diary'?`A corner of folded paper shows in the ${n}, where no paper should be.`:what==='trail'?`The dust on the ${n} has been disturbed.`:TELL[x.k](n);say(G,t,'notice');(G.hunch=G.hunch||[]).push({room:R,t,key})}}}
function nightCheck(t0){for(let h=Math.floor(t0/60)+1;h<=Math.floor(G.time/60);h++){if(h<23||G.over)continue;const e=NIGHT[G.r.int(NIGHT.length)](G);say(G,e.t,'night');if(e.nerve&&G.flags.power_out)G.nerve=Math.max(0,G.nerve+e.nerve);if(e.batt)G.batt=Math.max(0,G.batt+e.batt)}}
/* ---------- narrator and choices ---------- */
function nar(html,who){const t=$('#ntx3');if(!t)return;const pl=$('#nplate3');pl.textContent=who||'Narrator';pl.classList.toggle('who',!!who);t.innerHTML=html;t.scrollTop=0}
function lineHTML(l){if(!l)return '';const t=l.t.replace(/^<b>Evidence:<\/b>\s*/,'');if(l.cls==='notice')return `<p class="notice">${EYE}<span>${t}</span></p>`;return `<p class="${l.cls||''}">${t}</p>`}
function choices(list,leave,host){const c=host||$('#ch3');if(!c)return;const mid=c.closest('.mid3');if(mid)mid.classList.toggle('choosing',!!(list.length||leave));
  c.innerHTML=list.map((o,i)=>`<button class="opt3 parch3 ${o.done?'done':''}" data-i="${i}">${o.ic||''}<span class="tx"><b>${o.t}</b>${o.s?`<small>${o.s}</small>`:''}</span></button>`).join('')+(leave?`<button class="leave3" data-i="-1">${leave}</button>`:'');
  c.querySelectorAll('[data-i]').forEach(b=>b.onclick=e=>{e.stopPropagation();if(P3.busy)return;const i=+b.dataset.i;if(i<0){if(host){closeTalk()}else{clearCh();wide3()}return}const o=list[i];if(!o||o.done)return;if(!host)clearCh();o.f()})}
function clearCh(){const c=$('#ch3');if(c){c.innerHTML='';const m=c.closest('.mid3');if(m)m.classList.remove('choosing')}}
/* every action: run it, roll what needs rolling, then tell the player what happened */
function doAct(fn,o={}){if(!G||G.over||P3.busy)return;if(!o.keep)clearCh();G.rolls=[];G.lastRoll=null;const g=G,before=G.log.length,ev0=G.ev.length,it0=(G.items||[]).length,t0=G.time;
  fn();if(!G.over)nightCheck(t0);
  const fin=()=>{if(G!==g)return;P3.busy=false;const lines=G.log.slice(before);if(G.rolls.length&&lines.length)lines[0].roll=G.rolls.map(r=>({tot:r.tot,ok:r.ok}));
    if(P3.talk&&!o.arrive)talkOut(lines);else nar(o.arrive?arrivalHTML(lines):(lines.map(lineHTML).join('')||'<p class="dim">Nothing comes of it.</p>'));
    flyNew(ev0,it0);refresh();if(o.after)o.after();
    if(G.pendingConfront)setTimeout(()=>{if(G===g)confrontAnim()},900);else if(G.over)setTimeout(()=>{if(G===g){closeTalk(true);closeScr();ending()}},1500)};
  if(G.rolls.length){P3.busy=true;dice3(G.rolls,fin)}else fin()}
function arrivalHTML(lines){const R=G.room;G.seenRoom=G.seenRoom||{};const first=!G.seenRoom[R];G.seenRoom[R]=1;let h=`<p>${first?OPEN[R](G):`The ${ROOMS[R].n.toLowerCase()}.`}</p>`;
  if(G.flags.power_out)h+=`<p class="dim">${G.light&&G.batt>0?'Your torch finds only what it touches.':'It is completely dark.'}</p>`;
  const here=npcsIn(G,R);if(here.length)h+=`<p>${here.map(s=>s.n).join(here.length>2?', ':' and ').replace(/, ([^,]*)$/,' and $1')} ${here.length>1?'are':'is'} here.</p>`;
  const mv=ROOMS[R].n+'. ';return h+lines.filter(l=>l&&!l.t.startsWith(mv)).map(lineHTML).join('')}
function goRoom(to){if(P3.busy||P3.talk)return;SND.click();GL.altI=0;doAct(()=>{move(G,to);if(G.room===to)instinct(G)},{arrive:true})}
/* ---------- tapping things in the room ---------- */
function tap3(e){if(!G||G.over||V.intro||P3.busy||P3.talk||($('#scr3host')&&$('#scr3host').childElementCount)||$('#sheet'))return;const r=GL.cur;if(!r)return;const b=GL.cv.getBoundingClientRect();
  const v=new THREE.Vector2((e.clientX-b.left)/b.width*2-1,-(e.clientY-b.top)/b.height*2+1);GL.ray.setFromCamera(v,GL.cam);r.hits.forEach(h=>{h.visible=true;h.updateMatrixWorld()});
  const all=GL.ray.intersectObjects(r.hits,false);let hit=all[0];if(all.length>1){let best=1e9;for(const h of all){const d=GL.ray.ray.distanceSqToPoint(h.object.position)/h.object.scale.x;if(d<best){best=d;hit=h}}}r.hits.forEach(h=>h.visible=false);
  const rip=document.createElement('i');rip.className='rip3';rip.style.left=(e.clientX-b.left)+'px';rip.style.top=(e.clientY-b.top)+'px';$('#view').appendChild(rip);setTimeout(()=>rip.remove(),600);
  if(!hit)return;const u=hit.object.userData;look3(u.view);SND.click();objTap(u.tap)}
function objTap(tap){if(tap==='body')return bodyTap();if(tap==='radio')return radioTap();if(tap.startsWith('spot:'))return spotTap(tap.slice(5));
  if(tap.startsWith('obs:')){const o=(OBS[G.room]||[]).find(x=>x.id===tap.slice(4));if(o)doAct(()=>observe(G,o),{after:()=>choices([],'Step back')})}}
function spotTap(id){const R=G.room,key=R+':'+id,x=SPOTX[key]||{k:'container',d:''};const done=G.searched[key],found=G.found&&G.found[key];
  if(found){nar(`<p>${x.d}</p><p class="dim">You have already found what was here.</p>`);return choices([],'Step back')}
  if(done){nar(`<p>${x.d}</p><p class="dim">You've been through it. Nothing.</p>`);return choices([],'Step back')}
  if(G.lead&&G.lead[key]){nar(`<p>${x.d}</p><p class="ev">There is something here. You just have to get at it.</p>`);return choices([{t:'Go straight to it.',s:'Certain · 5 min',ic:sig('sure'),f:()=>doAct(()=>searchAs(G,id,{sure:1,mins:5}))}],'Leave it')}
  nar(`<p>${x.d}</p>`);choices(wayOpts(WAYS[x.k],'search:'+key,sp=>doAct(()=>searchAs(G,id,sp),{after:()=>choices([],'Step back')})),'Leave it')}
function bodyTap(){const M=G.M,she=/Margaret|Celia|Rose/.test(M.victim.n),him=she?'her':'him';
  if(G.flags.body){nar(`<p>${M.victim.n}. ${M.weapon.wound[0].toUpperCase()+M.weapon.wound.slice(1)}.</p><p class="dim">You have seen what there is to see.</p>`);return choices([],'Step back')}
  nar(`<p>${M.victim.n}, face down on the rug, one arm out toward the door.${G.flags.bodyLook?' You know where the wound is. Not yet what made it.':''}</p>`);
  const ways=G.arch==='doctor'?[{t:'Read the wound. You know what you are looking at.',sure:1,mins:15}]:[{t:'Examine the wound closely.',stat:'wits',dc:13,mins:15,tag:'read'},{t:`Turn ${him} over and look.`,stat:'nerve',dc:12,mins:10},{t:'Take your time over the body.',sure:1,mins:30,tag:'body'}];
  choices(wayOpts(ways,'examine',sp=>doAct(()=>examineAs(G,sp),{after:()=>choices([],'Step back')})),'Leave it')}
function radioTap(){if(G.radio){nar('<p>The wireless hums. The police are on their way.</p>');return choices([],'Step back')}nar('<p>A wireless set with its lid off, valves cold. If it worked, the police would come, on their own clock.</p>');
  choices(wayOpts([{t:'Coax it into life with what you have.',stat:'wits',dc:14,mins:30,tag:'repair'},{t:'Strip it down and rebuild it.',sure:1,mins:60}],'radio',sp=>doAct(()=>repairAs(G,sp),{after:()=>choices([],'Step back')})),'Leave it')}
function watchTap(){if(P3.busy||P3.talk||G.over||V.intro)return;SND.click();wide3();nar(`<p>${fmtT(G.time)}. Dawn comes at ${fmtT(G.R.dawn)}${G.police?`, the police at ${fmtT(G.police)}`:''}.</p>`);
  const o=[{t:'Wait, and listen to the house.',s:'20 min · see who comes through',ic:sig('sure'),f:()=>doAct(()=>wait(G))},{t:'Sit with your back to the wall and breathe.',s:'Steadies your nerve · 20 min',ic:sig('nerve'),f:()=>doAct(()=>rest(G))}];
  if(G.flags.power_out&&G.batt>0)o.push({t:G.light?'Switch the torch off to save the battery.':'Switch the torch back on.',s:`Battery ${Math.round(G.batt)}%${G.light?' · in the dark your nerve drains':''}`,ic:toolSig('torch'),f:()=>doAct(()=>{G.light=!G.light;say(G,G.light?'Torchlight again. The room comes back in pieces.':'You switch the torch off. The dark closes in.','dim')})});
  const cal=(G.items||[]).find(it=>['flask','brandy'].includes(it.id)&&it.uses>0);if(cal&&G.nerve<10)o.push({t:`Take a nip of ${cal.id==='flask'?'the flask':'the brandy'}.`,s:'Steadies your nerve · 2 min · uses one',ic:toolSig(cal.id),f:()=>doAct(()=>{useItem(cal.id);tick(G,2);G.nerve=Math.min(10,G.nerve+3);say(G,'It burns on the way down, and your hands are steadier for it.')})});
  choices(o,'Never mind')}
/* ---------- questioning ---------- */
function implicates(e,s){const M=G.M,k=M.sus.find(x=>x.id===M.killer);if(['item','fibres','coat'].includes(e.id))return s.coat===k.coat;if(e.id==='smear')return s.height===k.height;if(['witness','glimpse'].includes(e.id))return s.coat===k.coat&&s.height===k.height;
  if(e.id.startsWith('contra_'))return e.id==='contra_'+s.id;if(e.id==='diary')return M.diary.includes(s.id);return false}
function reaction(e,s,imp){const n=short(s.n);if(!imp)return `${n} looks at it, then at you. "And what has that to do with me?"`;
  if(['item','fibres','coat'].includes(e.id))return `${n}'s hand goes to their own coat before they can stop it.`;if(e.id==='smear')return `${n} glances down at their own hands.`;if(e.id==='diary')return `${n} reads their own name, and the colour leaves their face.`;
  if(e.id.startsWith('contra_'))return `${n} opens their mouth, and closes it again.`;return `${n} goes very still.`}
function press(s,mode,o){const sid=s.id,M=G.M,isK=sid===M.killer;const dc=mode==='nerve'?14:(G.arch==='journalist'?10:13);if(o.tool)useItem(o.tool);G.comp=G.comp||{};G.shown=G.shown||{};G.broke=G.broke||{};G.shut=G.shut||{};
  const e=o.ev?G.ev.find(x=>x.id===o.ev):null,imp=!!e&&implicates(e,s);if(e){G.shown[sid+':'+e.id]=1;say(G,reaction(e,s,imp))}
  G._rk='press:'+sid+':'+mode;G._adv=o.adv||(e?1:0);const ok=roll(G,mode,dc,mode==='nerve'?`Call ${short(s.n)} a liar`:e?`Put it to ${short(s.n)}`:`Press ${short(s.n)}`);
  G._force=ok;try{talk(G,sid)}finally{G._force=null}
  if(ok){const d=isK?(imp?2:mode==='nerve'?1:0):(imp?2:mode==='nerve'?2:1);G.comp[sid]=Math.max(0,(G.comp[sid]??4)-d);if(isK&&!d)say(G,`${short(s.n)} doesn't so much as blink.`,'dim');if(G.comp[sid]===0&&!G.broke[sid])breakdown(s)}
  else if(mode==='nerve'){G.shut[sid]=G.time+60;G.nerve=Math.max(0,G.nerve-1);say(G,`${short(s.n)} stands. "I don't have to listen to this." They won't talk to you for an hour.`,'bad')}}
function breakdown(s){const M=G.M;G.broke[s.id]=1;if(s.id===M.killer){say(G,`<b>${s.n}:</b> "I never went near him with any ${M.weapon.n}!" It's out before they can stop it. Nobody had said what the weapon was.`,'bad');addEv(G,'slip',`${s.n} named the ${M.weapon.n} under questioning, before anyone had told them what it was.`)}
  else{const tr=M.sched[s.id];say(G,`<b>${s.n}:</b> "All right. All right." It all comes out: the ${ROOMS[tr[0]].n.toLowerCase()} at nine, the ${ROOMS[tr[1]].n.toLowerCase()} after, the ${ROOMS[tr[2]].n.toLowerCase()} at twenty to ten. You believe every word.`);addEv(G,'clear_'+s.id,`${s.n} broke down and told you everything. You believe them.`)}}
function compSVG(n){let h='';for(let i=0;i<4;i++)h+=`<i class="${i<n?'on':''}"></i>`;return `<span class="cbx3" role="img" aria-label="Composure ${n} of 4">${h}</span>`}
function openTalk(sid,evId){const s=G.M.sus.find(x=>x.id===sid);if(!s||P3.busy)return;clearCh();P3.talk=sid;$('#view').classList.add('blur3');$('#play').classList.add('talking');SND.click();renderTalk(null);
  if(evId&&(G.stmts[sid]||{}).alibi)setTimeout(()=>tAct(()=>press(s,'charm',{ev:evId})),350)}
function closeTalk(quiet){if(!P3.talk&&!$('#talk3'))return;P3.talk=null;$('#talk3')?.remove();$('#view').classList.remove('blur3');$('#play').classList.remove('talking');if(!quiet&&G)refresh()}
function tAct(fn){doAct(fn,{keep:true})}
function talkOut(lines){renderTalk(lines)}
function renderTalk(lines){const s=G.M.sus.find(x=>x.id===P3.talk);if(!s)return closeTalk();const st=G.stmts[s.id]||{};G.comp=G.comp||{};const comp=G.comp[s.id]??4;
  if(G.pos[s.id]!==G.room||G.flags['dead_'+s.id]){if(lines){nar(lines.map(lineHTML).join(''))}return closeTalk()}
  let t=$('#talk3');if(!t){$('#play').insertAdjacentHTML('beforeend','<div class="talk3" id="talk3"></div>');t=$('#talk3')}
  let plate=`${s.n} <span style="font:600 11px var(--in);letter-spacing:.06em">${s.role.toUpperCase()}</span>`,body='';
  if(lines&&lines.length){body=lines.map(l=>{const m=l.t.match(/^<b>([^<]+):<\/b>\s*/);if(m)return `<p>${l.t.slice(m[0].length)}</p>`;return `<p class="${l.cls==='bad'?'bad':'dim'}" style="font-style:italic">${l.t.replace(/^<b>Evidence:<\/b>\s*/,'')}</p>`}).join('')}
  else body=st.alibi?`<p>"${ROOMS[st.room].n}${st.with&&st.with.length?', with '+st.with.map(id=>G.M.sus.find(x=>x.id===id).n).join(' and '):', alone'}. I've told you."</p><p class="dim" style="font-style:italic">${short(s.n)} waits for your next question.</p>`:`<p class="dim" style="font-style:italic">${short(s.n)} looks up as you come over. ${s.height==='tall'?'Tall':'Not tall'}, in a ${s.coat} coat.</p>`;
  const stamp=G.broke&&G.broke[s.id]?(s.id===G.M.killer?'<span class="stamp3">Slipped</span>':'<span class="stamp3" style="background:#2a6a3a">Cleared</span>'):G.ev.some(e=>e.id==='contra_'+s.id)?'<span class="stamp3">Contradicted</span>':'';
  t.innerHTML=`<div class="fig3">${sil(s)}</div><div class="top3"><div></div><div class="comp3"><span>COMPOSURE</span>${compSVG(comp)}${stamp}</div></div><div class="mid3"><div class="choices3" id="tch3"></div></div>
    <div class="bot3" style="padding:0 12px 16px"><div class="narr3 wood3"><div class="plate3 parch3 who">${plate}</div><div class="tx3">${body}</div></div></div>`;
  talkChoices(s)}
function talkChoices(s){const st=G.stmts[s.id]||{},host=$('#tch3');G.shut=G.shut||{};const dcP=G.arch==='journalist'?10:13;const o=[];
  if(G.shut[s.id]>G.time){o.length=0}
  else if(!st.alibi)o.push({t:'"Where were you at twenty to ten?"',s:'10 min',ic:sig('charm'),f:()=>tAct(()=>talk(G,s.id))});
  else{o.push({t:'"Go over it with me once more."',s:`Charm · ${oddsWord(odds('charm',dcP,0,'press:'+s.id+':charm'))} · 10 min`,ic:sig('charm'),f:()=>tAct(()=>press(s,'charm',{}))});
    const fl=(G.items||[]).find(it=>it.id==='flask'&&it.uses>0);if(fl)o.push({t:'Offer them a drink from your flask.',s:`Charm · ${oddsWord(odds('charm',dcP,1,'press:'+s.id+':charm'))} · two dice, keep the best · uses one`,ic:toolSig('flask'),f:()=>tAct(()=>press(s,'charm',{adv:1,tool:'flask'}))});
    const usable=G.ev.filter(e=>!e.id.startsWith('clear_'));if(usable.length)o.push({t:'Show them something.',s:`From your satchel or your notes · two dice, keep the best`,ic:sig('bag'),f:()=>evTray(s)});
    o.push({t:'"You\'re lying."',s:`Nerve · ${oddsWord(odds('nerve',14,0,'press:'+s.id+':nerve'))} · 10 min · <span class="warn">fail, and they stop talking to you</span>`,ic:sig('nerve'),f:()=>tAct(()=>press(s,'nerve',{}))});
    if(st.saw&&!G.warned[s.id]){o.push({t:'"Lock your door tonight."',s:`Charm · ${oddsWord(odds('charm',11,0,'warn:'+s.id))} · 5 min`,ic:sig('lock'),f:()=>tAct(()=>warn(G,s.id,false))});o.push({t:'Walk them to their room and see it locked.',s:'Certain · 15 min',ic:sig('sure'),f:()=>tAct(()=>warn(G,s.id,true))})}}
  if(G.shut[s.id]>G.time){const tx=$('#talk3 .tx3');if(tx&&!tx.textContent.includes('won\'t'))tx.insertAdjacentHTML('beforeend',`<p class="bad" style="font-style:italic">${short(s.n)} won't talk to you until ${fmtT(G.shut[s.id])}.</p>`)}
  choices(o,'Leave them be.',host)}
function evTray(s){const host=$('#tch3');G.shown=G.shown||{};const list=G.ev.filter(e=>!e.id.startsWith('clear_'));
  host.innerHTML=`<div class="tray3">${list.map((e,i)=>`<button class="parch3 ${G.shown[s.id+':'+e.id]?'used':''}" data-e="${i}">${evIcon(e)}<span>${evName(e)}</span></button>`).join('')}</div><button class="leave3" id="evback3">Put it away</button>`;
  host.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{const e=list[+b.dataset.e];if(G.shown[s.id+':'+e.id]){toast('You have already shown them that.');return}tAct(()=>press(s,'charm',{ev:e.id}))});$('#evback3').onclick=()=>talkChoices(s)}
/* ---------- dice: a bone d20 that tumbles and lands, with a second one for advantage ---------- */
const D3={};
function dice3Init(){if(D3.r)return true;const T=THREE;try{D3.cv=document.createElement('canvas');D3.cv.id='dice3';D3.r=new T.WebGLRenderer({canvas:D3.cv,antialias:true,alpha:true})}catch(e){return false}
  D3.r.setClearColor(0,0);D3.r.outputEncoding=T.sRGBEncoding;D3.r.setPixelRatio(Math.min(2,devicePixelRatio||1));D3.s=new T.Scene();D3.cam=new T.PerspectiveCamera(30,1,.1,50);D3.cam.position.set(0,0,9);
  D3.s.add(new T.AmbientLight('#8a7a6a',.75));const k=new T.DirectionalLight('#ffe2b8',1.5);k.position.set(-2,3,4);D3.s.add(k);const f=new T.DirectionalLight('#6a8acc',.45);f.position.set(3,-1,2);D3.s.add(f);
  const g=new T.IcosahedronGeometry(1,0),n=g.attributes.position.count/3,uv=new Float32Array(n*6),at=document.createElement('canvas');at.width=1280;at.height=1024;const x=at.getContext('2d');
  const order=[14,2,8,20,11,5,17,3,9,12,6,18,1,15,7,10,19,4,13,16];
  for(let i=0;i<n;i++){const cx=(i%5)*256,cy=Math.floor(i/5)*256;const gr=x.createLinearGradient(cx,cy,cx,cy+256);gr.addColorStop(0,'#f3e9cf');gr.addColorStop(1,'#d3c193');x.fillStyle=gr;x.fillRect(cx,cy,256,256);x.fillStyle='#7a1418';x.font='bold 84px Georgia, serif';x.textAlign='center';x.textBaseline='middle';x.fillText(String(order[i]),cx+128,cy+160);if(order[i]===6||order[i]===9)x.fillRect(cx+108,cy+205,40,6);
    const Pt=[[.5,.06],[.06,.9],[.94,.9]];for(let k2=0;k2<3;k2++){uv[(i*3+k2)*2]=(cx+Pt[k2][0]*256)/1280;uv[(i*3+k2)*2+1]=1-(cy+Pt[k2][1]*256)/1024}}
  g.setAttribute('uv',new T.BufferAttribute(uv,2));const tex=new T.CanvasTexture(at);tex.encoding=T.sRGBEncoding;tex.anisotropy=8;
  D3.order=order;D3.faces=[];const p=g.attributes.position;for(let i=0;i<n;i++){const a=new T.Vector3().fromBufferAttribute(p,i*3),b=new T.Vector3().fromBufferAttribute(p,i*3+1),c=new T.Vector3().fromBufferAttribute(p,i*3+2);D3.faces.push({nrm:a.clone().add(b).add(c).normalize(),a})}
  g.clearGroups();for(let i=0;i<n;i++)g.addGroup(i*3,3,0);const g2=g.clone();D3.base=new T.MeshStandardMaterial({map:tex,roughness:.32,flatShading:true});D3.hi=new T.MeshStandardMaterial({map:tex,roughness:.25,flatShading:true,color:'#ffd24a',emissive:'#ff9a00',emissiveIntensity:.35});D3.m1=new T.Mesh(g,[D3.base,D3.hi]);D3.m2=new T.Mesh(g2,[new T.MeshStandardMaterial({map:tex,roughness:.6,flatShading:true,color:'#8a827a'}),new T.MeshStandardMaterial({map:tex,roughness:.6,flatShading:true,color:'#8a827a'})]);D3.s.add(D3.m1,D3.m2);return true}
function faceQ(num,tilt){const T=THREE,i=D3.order.indexOf(num),{nrm,a}=D3.faces[i];const q=new T.Quaternion().setFromUnitVectors(nrm,new T.Vector3(0,0,1));const up=a.clone().sub(nrm.clone().multiplyScalar(a.dot(nrm))).applyQuaternion(q);
  q.premultiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),Math.atan2(up.x,up.y)));q.premultiply(new T.Quaternion().setFromEuler(new T.Euler(-.1,.12*tilt,0)));return q}
function dice3(rolls,done){if(!dice3Init()){done();return}$('#play').appendChild(D3.cv);let i=0;const next=()=>{if(i>=rolls.length){D3.cv.remove();$('#roll3')?.remove();done();return}one3(rolls[i++],next)};next()}
function one3(r,next){const T=THREE,b=$('#play').getBoundingClientRect();D3.r.setSize(b.width,b.height,false);D3.cam.aspect=b.width/b.height;D3.cam.updateProjectionMatrix();
  const halfH=9*Math.tan(15*Math.PI/180),yW=(1-2*.36)*halfH;const word=r.ok?(r.crit?'Critical':'Success'):(r.fumble?'Fumble':'Failed');const mod=r.mod,sgn=mod>=0?'+':'−';
  $('#roll3')?.remove();$('#play').insertAdjacentHTML('beforeend',`<div class="roll3" id="roll3" role="dialog" aria-label="${r.label}. Tap to roll."><div class="lab3">${r.label}${r.adv?' · two dice, keep the '+(r.adv>0?'best':'worst'):''}</div>
    <div class="ready3"><div class="stake3"><em>${STATN[r.stat].toUpperCase()} ${sgn}${Math.abs(mod)}</em><i>·</i>NEED ${r.dc}</div><button class="tap3" type="button">TAP TO ROLL</button></div>
    <div class="dnum3" id="dnum3"><small>ROLLED</small>${r.d}</div><div class="plate"><span>${r.d}</span><i>${sgn}</i><em>${STATN[r.stat].toUpperCase()} ${Math.abs(mod)}</em><i>=</i><b>${r.tot}</b></div><div class="seal ${r.ok?'ok':'no'}"><div>${word.toUpperCase()}<small>needed ${r.dc}</small></div></div></div>`);
  try{BGM.focus(true)}catch(_){}const ov=$('#roll3');const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;const dur=reduce?.05:1.2;const sc=Math.min(.7,.62*Math.min(1,b.width/390*1.1));
  const two=!!r.adv&&r.other;D3.m2.visible=two;D3.m1.geometry.groups.forEach(gr=>gr.materialIndex=0);D3.base.color.set('#ffffff');D3.m1.scale.setScalar(two?sc*.85:sc);D3.m2.scale.setScalar(sc*.6);
  const q1=faceQ(r.d,1),q2=two?faceQ(r.other,-1):null;const sa=new T.Vector3(.35,1,.2).normalize(),sb=new T.Vector3(1,.3,-.4).normalize();
  const ax1=new T.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),ax2=new T.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize();
  let phase='ready',t0=0,landed=false,skip=false,hold=null,qs1=new T.Quaternion(),qs2=new T.Quaternion();const tr=performance.now();
  const finish=()=>{if(ov._done)return;ov._done=true;cancelAnimationFrame(D3.raf);next()};
  const throwIt=()=>{if(phase!=='ready')return;phase='roll';t0=performance.now();qs1.copy(D3.m1.quaternion);qs2.copy(D3.m2.quaternion);ov.classList.add('rolling');try{SND.dice()}catch(_){}};
  ov.onclick=()=>{if(phase==='ready')throwIt();else if(landed){clearTimeout(hold);finish()}else skip=true};
  const frame=()=>{const now=performance.now();
    if(phase==='ready'){const s=(now-tr)/1000;const bob=Math.sin(s*2.2)*.12;
      D3.m1.position.set(two?.42:0,yW+.35+bob,0);D3.m1.quaternion.setFromAxisAngle(sa,s*1.6).multiply(new T.Quaternion().setFromAxisAngle(sb,s*.9));
      if(two){D3.m2.position.set(-.6,yW+.1-bob*.8,-.3);D3.m2.quaternion.setFromAxisAngle(sb,s*1.9).multiply(new T.Quaternion().setFromAxisAngle(sa,s*.7))}}
    else{let t=(now-t0)/1000/dur;if(skip)t=1;t=Math.min(1,t);const e=1-Math.pow(1-t,3);
      const y=t<.55?yW+.35*(1-t/.55)+Math.sin(Math.PI*t/.55)*1.7:yW+Math.abs(Math.sin((t-.55)/.45*Math.PI*2))*.25*(1-t);
      D3.m1.position.set((two?.42:0)+Math.sin(t*Math.PI)*.3,y,0);if(landed){const k=Math.min(1,(now-D3.pop)/220);D3.m1.scale.setScalar((two?sc*.85:sc)*(1+.14*Math.sin(k*Math.PI/2)))}D3.m1.quaternion.copy(qs1).slerp(q1,e).multiply(new T.Quaternion().setFromAxisAngle(ax1,6*Math.PI*(1-e)));
      if(two){D3.m2.position.set(-.6-Math.sin(t*Math.PI)*.2,yW-.25+(y-yW)*.8,-.3);D3.m2.quaternion.copy(qs2).slerp(q2,e).multiply(new T.Quaternion().setFromAxisAngle(ax2,6*Math.PI*(1-e)))}
      if(t>=1&&!landed){landed=true;const fi=D3.order.indexOf(r.d);D3.m1.geometry.groups[fi].materialIndex=1;D3.base.color.set('#a39d90');D3.pop=now;const pv=D3.m1.position.clone().project(D3.cam),bx=(pv.x+1)/2*b.width,by=(1-pv.y)/2*b.height,dn=$('#dnum3');if(dn){dn.style.left=Math.min(b.width-96,bx+b.width*.15)+'px';dn.style.top=Math.max(70,by-b.width*.3)+'px'}ov.classList.add('land');ov.setAttribute('aria-label',`${r.label}: rolled ${r.d}, total ${r.tot} against ${r.dc}, ${word}`);try{BGM.sting(r.ok)}catch(_){}hold=setTimeout(finish,reduce?1100:1500)}}
    D3.r.render(D3.s,D3.cam);if(!ov._done)D3.raf=requestAnimationFrame(frame)};
  frame();setTimeout(()=>{const b2=ov.querySelector('.tap3');if(b2)b2.focus()},50)}

/* ---------- things flying into the satchel or onto the board ---------- */
function flyNew(ev0,it0){const items=(G.items||[]).slice(it0).map(it=>({t:TOOLS[it.id].n,to:'#dsat3'})),evs=G.ev.slice(ev0).map(e=>({t:evName(e),to:PHYS.includes(e.id)?'#dsat3':'#dbrd3'}));
  [...items,...evs].forEach((f,i)=>setTimeout(()=>{const tgt=$(f.to),pl=$('#play');if(!tgt||!pl)return;const pb=pl.getBoundingClientRect(),tb=tgt.getBoundingClientRect();const el=document.createElement('div');el.className='fly3 parch3';el.textContent=f.t;el.style.left=(pb.width/2-60)+'px';el.style.top=(pb.height*.38)+'px';pl.appendChild(el);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{const er=el.getBoundingClientRect();el.style.transform=`translate(${tb.left+tb.width/2-er.left-er.width/2}px,${tb.top+tb.height/2-er.top-er.height/2}px) scale(.3)`;el.style.opacity='0'}));
    setTimeout(()=>{el.remove();tgt.classList.remove('pulse3');void tgt.offsetWidth;tgt.classList.add('pulse3')},1000);try{SND.ev()}catch(_){}},500+i*350))}
/* ---------- the screen ---------- */
function meHTML(){const lit=Math.ceil(G.nerve/2);let n='';for(let i=0;i<5;i++)n+=`<i class="${i<lit?'on':''}"></i>`;let h='';for(let i=0;i<G.hpMax;i++)h+=`<i class="${i<G.hp?'on':''}"></i>`;
  return `<span class="bars3"><span class="br"><b>NERVE</b><span class="nv" aria-label="Nerve ${Math.round(G.nerve)} of 10">${n}</span></span><span class="br"><b class="r">HEALTH</b><span class="hpb" aria-label="Health ${G.hp} of ${G.hpMax}">${h}</span></span></span><span class="pf3">${meSil}</span>`}
function playRefresh(){if(!G||!$('#ui3'))return;const M=G.M;
  $('#watch3').innerHTML=watchSVG(G.time)+`<span class="tsub3">${ROOMS[G.room].n.toUpperCase()} · DAWN ${fmtT(G.R.dawn).replace(':00','')}${G.flags.power_out?`<b>${G.light&&G.batt>0?' · TORCH '+Math.round(G.batt)+'%':' · IN THE DARK'}</b>`:''}</span>`;
  $('#me3').innerHTML=meHTML();
  const here=npcsIn(G,G.room);/* guests stand in the room now; the old card strip stays empty */$('#folk3').innerHTML=[].map(s=>`<button data-p="${s.id}" aria-label="Talk to ${s.n}"><span class="oval"><i>${sil(s,1)}</i></span>${!(G.stmts[s.id]||{}).alibi?'<b class="q">?</b>':''}<span>${short(s.n)}</span></button>`).join('');
  $('#folk3').querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{if(P3.busy||V.intro)return;wide3();openTalk(b.dataset.p)});
  $('#doors3').innerHTML=`<button class="wood3" id="exits3">Exits${CHEV}</button>`;$('#exits3').onclick=exitsTap;turnBtn();
  const nSat=(G.items||[]).length+G.ev.filter(e=>PHYS.includes(e.id)).length,nQ=questions().filter(q=>q.st===2).length;
  $('#nsat3').textContent=nSat;$('#nbrd3').textContent=nQ+'/4';$('#nbrd3').hidden=!nQ;
  if(GL.r){if(GL.shownRoom!==G.room&&GL.entering!==G.room)enter3(G.room);V.uiBottom=290;size3()}}
refresh=playRefresh;
function startGame(seed,arch,ep){ep=ep||FREEPLAY;G=newGame(seed,arch,ep);P.runs++;if(ep.n){P.eps[ep.n]=P.eps[ep.n]||{};P.eps[ep.n].tries=(P.eps[ep.n].tries||0)+1}save();$('#home').hidden=true;
  G.items=(KIT[arch]||['torch']).map(id=>({id,uses:TOOLS[id].uses||0}));G.comp={};G.shown={};G.shut={};G.broke={};G.notice={};G.seenRoom={};G.taken={};G.hunch=[];P3.busy=false;P3.talk=null;
  const p=$('#play');p.classList.add('intro','p3');p.hidden=false;
  p.innerHTML=`<div class="view" id="view"><canvas id="sc"></canvas></div>
   <div class="ui3" id="ui3"><div class="top3"><button class="watch3" id="watch3" aria-label="Pocket watch"></button><button class="me3" id="me3" aria-label="Your character"></button></div>
    <div class="mid3"><div class="choices3" id="ch3"></div><div class="doors3" id="doors3"></div></div>
    <div class="bot3"><div class="folk3" id="folk3"></div><div class="narr3 wood3" id="narr3"><div class="plate3 parch3" id="nplate3">Narrator</div><div class="tx3" id="ntx3"></div></div>
     <div class="dock3"><button id="dsat3" aria-label="Satchel">${DOCK.sat}<span>SATCHEL</span><b class="n3" id="nsat3"></b></button><button id="dbrd3" aria-label="Case board">${DOCK.brd}<span>BOARD</span><b class="n3" id="nbrd3" hidden></b></button><button id="dnb3" aria-label="Notebook">${DOCK.nb}<span>NOTEBOOK</span></button></div></div></div>
   <div id="scr3host"></div>`;
  $('#watch3').onclick=watchTap;$('#me3').onclick=meCard;$('#dsat3').onclick=()=>satchel();$('#dbrd3').onclick=board;$('#dnb3').onclick=journal;
  say(G,'The front hall. The others are in the lounge, not looking at each other.');
  V.figures={};V.anim=null;V.fade=1;setupCanvas();refresh();if(!V.running){V.running=true;loop()}titleCard(ep);const g=G;setTimeout(()=>{if(G===g&&!G._brief){G._brief=1;showRules()}},3200)}
function showRules(){const e=G.ep,A=ARCH[G.arch];const it=[];if(e.n===1)it.push(['?','Tap anything in the room. Quick ways roll a d20 plus a stat; sure ways cost time or noise.']);
  it.push([e.n?'NEW':'ALL',(t=>t[0].toUpperCase()+t.slice(1))(e.brief.replace(/^(New this episode|Season finale|Tonight)[:,]?\s*/i,''))]);it.push(['★',`You are the ${A.n}. ${A.perk}`]);
  $('#play').insertAdjacentHTML('beforeend',`<div class="brief3" id="brief3"><span class="tagh">TONIGHT · DAWN AT ${fmtT(G.R.dawn)}</span>${it.map(([k,t])=>`<div class="bi"><b>${k}</b><span>${t}</span></div>`).join('')}<button class="go3" type="button">STEP INTO THE HOUSE ▸<small>THE CLOCK STARTS</small></button></div>`);
  nar(`<p>${e.cold}</p>`);clearCh();const g=G;let done=false;const go=()=>{if(done||G!==g)return;done=true;$('#brief3')?.remove();V.intro=false;$('#play').classList.remove('intro');SND.open();G.seenRoom={};nar(arrivalHTML([null]))};
  const b=$('#brief3');b.onclick=e2=>{e2.stopPropagation();go()};}
function titleCard(ep){V.intro=true;$('#play').classList.add('intro');const n=ep.n;$('#play').insertAdjacentHTML('beforeend',`<div class="op3" id="tcard"><div class="bg"></div><div class="band"></div><div class="tx"><span class="eptag">${n?'EPISODE '+String(n).padStart(2,'0'):'FREE PLAY'}</span><h2>${ep.t}</h2><em>${ep.victim}${ep.vdesc?', '+ep.vdesc:''}</em></div><div class="skip">TAP TO SKIP</div></div>`);
  const el=$('#tcard'),g=G;let gone=false;const go=()=>{if(gone)return;gone=true;el.classList.add('out');setTimeout(()=>el.remove(),450);if(G===g&&!G._brief){G._brief=1;setTimeout(()=>{if(G===g)showRules()},300)}};el.onclick=go;setTimeout(go,3000)}
/* ---------- full-screen objects ---------- */
function closeScr(){const h=$('#scr3host');if(h)h.innerHTML=''}
function scr(cls,html){closeScr();clearCh();const half=/\bhalf\b/.test(cls);$('#scr3host').innerHTML=(half?'<div class="scrimh3" id="scrimh3"></div>':'')+`<div class="scr3 ${cls}" id="scr3">${html}</div>`;SND.click();const done=()=>{closeScr();refresh()};const c=$('#scr3 .close3');if(c)c.onclick=done;if(half)$('#scrimh3').onclick=done;return $('#scr3')}
function meCard(){if(P3.busy||P3.talk)return;const A=ARCH[G.arch];const s=scr('',`<div class="scrim3"></div><div class="me3card parch3"><h3>${A.n.toUpperCase()}</h3><div class="role">${A.desc}</div>
   <div class="stats">${['wits','body','nerve','charm'].map(k=>`<div>${sig(k)}${STATN[k].toUpperCase()}<b>${G.st[k]}</b></div>`).join('')}</div>
   <p>Health ${G.hp} of ${G.hpMax}. Nerve ${Math.round(G.nerve)} of 10${G.nerve<4?': your hands are shaking':''}.</p><p style="color:#55555f">${A.perk}</p>
   <p style="font-weight:700;color:#e3243b">Every roll is a d20 plus the stat it uses. In the dark, without a light, it's two worse.</p>
   <button class="btn3" id="mecl">Back</button></div>`);$('#mecl').onclick=()=>closeScr();s.querySelector('.scrim3').onclick=()=>closeScr()}
function satchel(selKey){if(P3.busy)return;const evs=G.ev.filter(e=>PHYS.includes(e.id));const tools=G.items||[];if(!selKey)selKey=evs.length?'e:'+evs[evs.length-1].id:tools.length?'t:'+tools[0].id:null;
  const cell=(k,svg,lab,extra)=>`<button data-k="${k}" class="${k===selKey?'on':''}" aria-label="${lab}">${svg}${extra||''}</button>`;
  const tg=tools.map(it=>cell('t:'+it.id,toolSvg(it.id),TOOLS[it.id].n,TOOLS[it.id].uses?`<small>${it.uses} left</small>`:it.id==='torch'&&G.flags.power_out?`<small>${Math.round(G.batt)}%</small>`:''));while(tg.length%5)tg.push('<div class="empty"></div>');
  const eg=evs.map(e=>cell('e:'+e.id,evIcon(e),evName(e)));while(eg.length<5||eg.length%5)eg.push('<div class="empty"></div>');
  let tag='';if(selKey&&selKey.startsWith('t:')){const id=selKey.slice(2),T=TOOLS[id],it=tools.find(x=>x.id===id);const uses=[...new Set(T.tags)].map(t=>TAGWORD[t]).join(', ');
    tag=`<h3>${T.n.toUpperCase()}</h3><div class="from">${KIT[G.arch].includes(id)?'You brought it with you':'Found in the house'}${T.uses?` · ${it.uses} left`:''}</div><p>${T.d}</p><p class="scrawl">Good for ${uses}.</p>`;
    const acts=[];if(id==='torch'&&G.flags.power_out&&G.batt>0)acts.push(`<button class="btn3 wood3" data-a="torch">${G.light?'Switch it off':'Switch it on'}</button>`);if(['flask','brandy'].includes(id)&&it.uses>0&&G.nerve<10)acts.push('<button class="btn3 wood3" data-a="nip">Take a nip</button>');if(acts.length)tag+=`<div class="acts">${acts.join('')}</div>`}
  else if(selKey){const e=G.ev.find(x=>x.id===selKey.slice(2));const here=npcsIn(G,G.room).filter(s=>(G.stmts[s.id]||{}).alibi);
    tag=`<h3>${evName(e).toUpperCase()}</h3><div class="from">Physical evidence, in your satchel</div><p>${e.t}</p><p class="scrawl">${e.id==='weapon'?'Whoever hid it knew the house.':e.id==='diary'?'Two names. Put it to them.':'Show it to whoever it fits.'}</p>`;
    tag+=`<div class="acts">${here.length?here.map(s=>`<button class="btn3 wood3" data-show="${s.id}">Show ${short(s.n)}</button>`).join(''):'<span>Nobody here has answered your questions yet. Show it to someone once they have.</span>'}</div>`}
  else tag='<p style="font-style:italic">Empty, apart from fluff and a bus ticket.</p>';
  const s=scr('half sat3w',`<div class="hd3"><span class="ttl">SATCHEL</span><button class="close3" aria-label="Close">✕</button></div><div class="sat3"><h4>TOOLS</h4><div class="grid3">${tg.join('')}</div><h4>EVIDENCE</h4><div class="grid3">${eg.join('')}</div><div class="tag3">${tag}</div></div>`);
  s.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>satchel(b.dataset.k));
  s.querySelectorAll('[data-show]').forEach(b=>b.onclick=()=>{closeScr();openTalk(b.dataset.show,selKey.slice(2))});
  s.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const a=b.dataset.a;closeScr();if(a==='torch')doAct(()=>{G.light=!G.light;say(G,G.light?'Torchlight again.':'You switch the torch off. The dark closes in.','dim')});else{const id=selKey.slice(2);doAct(()=>{useItem(id);tick(G,2);G.nerve=Math.min(10,G.nerve+3);say(G,'It burns on the way down, and your hands are steadier for it.')})}})}
function journal(){if(P3.busy)return;const strip=t=>t.replace(/^<b>Evidence:<\/b>\s*/,'').replace(/<(?!\/?b>)[^>]+>/g,'');
  const rows=G.log.slice().reverse().map(l=>{const rl=(l.roll||[]).map(r=>`<span class="rl ${r.ok?'ok':'no'}">${r.tot} ${r.ok?'✓':'✗'}</span>`).join('');return `<div class="lg3 ${l.cls||''}"><time>${fmtT(l.time).replace(/ [AP]M$/,'')}</time><span>${strip(l.t)}${rl}</span></div>`}).join('');
  const leadL=Object.keys(G.lead||{}).map(k=>{const [r,sp]=k.split(':');return `Something in the ${SPOTS[r][sp]}, ${ROOMS[r].n.toLowerCase()}. Go back for it.`}).concat((G.hunch||[]).filter(h=>!G.searched[h.key]).map(h=>`${ROOMS[h.room].n}: ${h.t}`));
  const leads=leadL.map(t=>`<div class="lg3 notice"><time>LEAD</time><span>${t}</span></div>`).join('');
  const s=scr('half nb3w',`<div class="hd3"><span class="ttl">NOTEBOOK</span><span class="tabs3"><button class="on" data-t="log3">LOG</button><button data-t="leads3">LEADS ${leadL.length}</button></span><button class="close3" aria-label="Close">✕</button></div><div class="body3"><div id="log3">${rows}</div><div id="leads3" hidden>${leads||'<p class="none3">No open leads yet. Failed searches that touched something, and things you noticed, land here.</p>'}</div></div>`);
  s.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{s.querySelectorAll('[data-t]').forEach(x=>x.classList.toggle('on',x===b));$('#log3').hidden=b.dataset.t!=='log3';$('#leads3').hidden=b.dataset.t!=='leads3'})}
function questions(){const M=G.M,has=id=>G.ev.some(e=>e.id===id),k=M.sus.find(s=>s.id===M.killer);const home=G.ev.some(e=>e.id.startsWith('home_'));
  const coat=['item','fibres','coat','witness','glimpse'].some(has),ht=['smear','witness','glimpse'].some(has);const [x,y]=M.diary.map(id=>M.sus.find(s=>s.id===id));
  return [{id:'with',q:'WITH WHAT?',st:has('weapon')||home?2:has('wound')?1:0,a:has('weapon')||home?`The ${M.weapon.n}${has('weapon')?'':', gone from its place'}.`:has('wound')?weaponHint(M.weapon):''},
   {id:'who',q:'WHO WENT INTO THE STUDY?',st:coat&&ht?2:coat||ht?1:0,a:`${ht?(k.height==='tall'?'Someone tall':'Someone short'):'Someone'}${coat?`, in a ${k.coat} coat`:''}.`},
   {id:'when',q:'WHEN?',st:has('clock')?2:0,a:'Twenty to ten. The study clock stopped when it fell.'},
   {id:'why',q:'WHY?',st:has('diary')?2:0,a:`${short(x.n)} or ${short(y.n)}: one of them ${M.motive}.`}]}
function board(){if(P3.busy)return;const M=G.M,qs=questions(),solved=qs.filter(q=>q.st===2).length,proof=proofCount();
  const qh=qs.map(q=>`<div class="qcard ${q.st===2?'':'open'}"><i class="pin"></i><h5>${q.q}</h5><div class="a ${q.st===2?'':q.st?'part':'none'}">${q.st?q.a:'?'}</div>${q.st===2?'<span class="stamp">ANSWERED</span>':''}</div>`).join('');
  const sh=M.sus.map(s=>{const st=G.stmts[s.id],dead=G.flags['dead_'+s.id];let stamp='';if(dead)stamp='<span class="st gray">DEAD</span>';else if(G.broke&&G.broke[s.id])stamp=s.id===M.killer?'<span class="st red">SLIPPED</span>':'<span class="st green">CLEARED</span>';else if(G.ev.some(e=>e.id==='contra_'+s.id))stamp='<span class="st red">CONTRADICTED</span>';else if(G.locked[s.id])stamp='<span class="st gray">LOCKED IN</span>';
    return `<div class="scard"><div class="ph">${sil(s,1)}</div>${stamp}<b>${s.n.toUpperCase()}</b><small>${s.height}, ${s.coat} coat</small><small>${st&&st.alibi?`9:40: ${ROOMS[st.room].n.toLowerCase()}${st.with.length?', with '+st.with.map(id=>short(M.sus.find(x=>x.id===id).n)).join(' & '):', alone'}`:'not asked yet'}</small></div>`}).join('');
  const open=solved>=3;
  const s=scr('cbs3 ht3',`<button class="close3">‹ BACK</button><div class="ttl3">CASE BOARD</div><div class="dawn3">DAWN AT ${fmtT(G.R.dawn)}</div>
    <div class="cb3"><div class="qs">${qh}</div><h4>THE GUESTS</h4><div class="sus3">${sh}</div></div>
    <button class="env3 parch3" id="env3" ${open?'':'disabled'}><svg viewBox="0 0 46 46" aria-hidden="true"><circle cx="23" cy="23" r="20" fill="#8a1418"/><circle cx="23" cy="23" r="14" fill="none" stroke="#c84040" stroke-width="1.5"/><text x="23" y="28" text-anchor="middle" font-family="Cinzel, serif" font-size="14" font-weight="700" fill="#ffc8b8">B</text></svg><span class="tx"><b>ACCUSE</b><small>${open?`Proof that will stand up: ${proof} of 2`:`${solved} of 4 answered · need 3`}</small></span></button>`);
  $('#env3').onclick=()=>{if(open)accuseSheet(false)}}
function accuseSheet(forced){closeTalk(true);const M=G.M;let sid=null,wid=null;
  const s=scr('ht3',`${forced?'':`<button class="close3">‹ NOT YET</button>`}<div class="acc3"><h2>${forced?'DAWN. NAME THEM.':'THE ACCUSATION'}</h2><p class="sub">${forced?'The police are at the door. Say a name, or the killer walks.':'If you are wrong, the night is not over for you.'}</p>
    <h4>WHO</h4><div class="who">${M.sus.filter(x=>!G.flags['dead_'+x.id]).map(x=>`<button data-s="${x.id}"><div class="ph">${sil(x,1)}</div><b>${x.n.toUpperCase()}</b></button>`).join('')}</div>
    <h4>WITH WHAT</h4><div class="wpn">${WEAPONS.map(w=>`<button data-w="${w.id}">${wpnSvg(w.id)}<span>${w.n}</span></button>`).join('')}</div>
    <button class="seal3" id="seal3" disabled><svg viewBox="0 0 46 46" aria-hidden="true"><circle cx="23" cy="23" r="20" fill="#8a1418"/><circle cx="23" cy="23" r="14" fill="none" stroke="#c84040" stroke-width="1.5"/><text x="23" y="28" text-anchor="middle" font-family="Cinzel, serif" font-size="14" font-weight="700" fill="#ffc8b8">B</text></svg>MAKE THE ACCUSATION</button></div>`);
  if(forced)G.accused=true;const upd=()=>{$('#seal3').disabled=!(sid&&wid)};
  s.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{sid=b.dataset.s;s.querySelectorAll('[data-s]').forEach(x=>x.classList.toggle('on',x===b));upd()});
  s.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{wid=b.dataset.w;s.querySelectorAll('[data-w]').forEach(x=>x.classList.toggle('on',x===b));upd()});
  $('#seal3').onclick=()=>{if(!(sid&&wid))return;G.accused=true;accuse(G,sid,wid);closeScr();ending()}}
function wpnSvg(id){const save=G.M.weapon;G.M.weapon=WEAPONS.find(w=>w.id===id);const s=evIcon({id:'weapon'});G.M.weapon=save;return s}
/* the killer finds you alone in the dark */
function confrontAnim(){const g=G;P3.busy=true;P3.confront=true;closeTalk(true);closeScr();clearCh();try{SND.creak()}catch(_){}nar('<p class="bad">The door closes behind you. You did not close it.</p>');
  setTimeout(()=>{if(G!==g)return;G.rolls=[];const before=G.log.length,ev0=G.ev.length;confront(G);
    dice3(G.rolls,()=>{if(G!==g)return;P3.busy=false;setTimeout(()=>{P3.confront=false},4000);try{SND.bad()}catch(_){}const v=$('#view');v.classList.remove('shake3');void v.offsetWidth;v.classList.add('shake3');
      nar(G.log.slice(before+1).map(lineHTML).join(''));flyNew(ev0,(G.items||[]).length);refresh();if(G.over)setTimeout(()=>{if(G===g)ending()},1500)})},1300)}

/* doors: one sign, the ways out as choices */
const DOORSIG='<path d="M13 31V11h14v20" fill="none" stroke="#ffc83d" stroke-width="1.6"/><circle cx="23.5" cy="21" r="1.3" fill="#ffc83d"/><path d="M10 31h20" stroke="#ffc83d" stroke-width="1.6"/>';
function exitsTap(){if(P3.busy||P3.talk||V.intro||G.over)return;SND.click();wide3();const here=ROOMS[G.room].adj;
  nar(`<p>${here.length===1?'One way out':'The ways out'} of the ${ROOMS[G.room].n.toLowerCase()}.</p>`);
  choices(here.map(id=>({t:`Through to the ${ROOMS[id].n.toLowerCase()}.`,s:`5 min${G.seenRoom&&G.seenRoom[id]?'':' · not been in yet'}`,ic:sig('',DOORSIG),f:()=>goRoom(id)})),'Stay here')}
/* a second fixed shot for rooms where one shot can't hold everything */
function hiddenHits(r,v){const T=THREE,c=GL.cam.clone();c.position.set(...v.p);c.lookAt(new T.Vector3(...v.t));c.fov=v.fov;c.updateProjectionMatrix();c.updateMatrixWorld();
  const vb=$('#view').getBoundingClientRect(),tb=$('.top3').getBoundingClientRect(),nb=$('.bot3').getBoundingClientRect();const out=[];
  for(const h of r.hits){const q=h.position.clone().project(c);const x=(q.x+1)/2*vb.width,y=(1-q.y)/2*vb.height;const ok=q.z<1&&x>16&&x<vb.width-16&&y>tb.bottom+52&&y<nb.top-60;if(!ok)out.push(h)}return out}
function altFor(r,off){const T=THREE,w=r.views.wide,cen=new T.Vector3();off.forEach(h=>cen.add(h.position));cen.multiplyScalar(1/off.length);let best=null,bestN=1e9;
  for(const back of [0,.4,.8])for(const df of [0,8,16,24]){const dir=new T.Vector3(...w.p).sub(cen).normalize();const p=new T.Vector3(...w.p).add(dir.multiplyScalar(back));const v={p:[p.x,p.y,p.z],t:[cen.x,cen.y,cen.z],fov:Math.min(80,w.fov+df)};
    const n=hiddenHits(r,v).filter(h=>off.includes(h)).length;if(n<bestN){bestN=n;best=v}if(!n)return {v,miss:0}}return {v:best,miss:bestN}}
function checkAlt(){const r=GL.cur;if(!r||r.altDone||!$('.bot3'))return;r.altDone=true;const off=hiddenHits(r,r.views.wide);r.alts=[];
  if(off.length){const one=altFor(r,off);if(!one.miss)r.alts=[one.v];else{const T=THREE,c=GL.cam.clone(),w=r.views.wide;c.position.set(...w.p);c.lookAt(new T.Vector3(...w.t));c.fov=w.fov;c.updateProjectionMatrix();c.updateMatrixWorld();
      const L=off.filter(h=>h.position.clone().project(c).x<0),R=off.filter(h=>h.position.clone().project(c).x>=0);for(const g of [L,R])if(g.length)r.alts.push(altFor(r,g).v)}}
  r.alt=r.alts[0]||null;turnBtn()}
function turnBtn(){let b=$('#turn3');const r=GL.cur;const show=r&&r.id===G.room&&r.alts&&r.alts.length;if(!b){$('#ui3 .mid3')?.insertAdjacentHTML('beforeend','<button class="turn3 wood3" id="turn3" hidden></button>');b=$('#turn3');if(!b)return;b.onclick=turnTap}
  b.hidden=!show;b.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="#ffc83d" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M20 12a8 8 0 1 1-3-6.2"/><path d="M20 4v5h-5"/></svg>Turn`}
function turnTap(){const r=GL.cur;if(P3.busy||P3.talk||!r)return;if(!r.altDone)checkAlt();if(!r.alts||!r.alts.length)return;if(GL.altRoom!==r.id){GL.altRoom=r.id;GL.altI=0}SND.click();clearCh();
  /* always move somewhere new: from a close-up or the starting view go to the next turn view, never to where the camera already is */
  let i=((GL.altI||0)+1)%(r.alts.length+1);if(i===0&&!GL.close)i=1%(r.alts.length+1);GL.altI=i;look3(i?r.alts[i-1]:r.views.wide)}
const _wide3=wide3;wide3=function(){const r=GL.cur;if(GL.altI&&r&&r.alts&&r.alts[GL.altI-1])look3(r.alts[GL.altI-1]);else _wide3()};
setInterval(()=>{if(G&&GL.cur&&!GL.cur.altDone&&GL.cur.id===G.room&&GL.shownRoom===G.room)checkAlt();if(GL.cur&&GL.cur.id!==G?.room)GL.altI=0},500);
/* ---------- front of house: title, casebook, case file ---------- */
const LOCK3='<svg class="lk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="5" y="11" width="14" height="10"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
const VIC3='<svg viewBox="60 30 220 250" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><ellipse cx="170" cy="118" rx="50" ry="62" fill="#3a3a46"/><path d="M120 98c4-46 96-46 100 0-6-20-28-30-50-30s-44 10-50 30z" fill="#55555f"/><path d="M150 172h40l8 32c60 10 98 44 106 108l22 328H14L34 312c8-64 46-98 106-108z" fill="#4a3a5a"/><path d="M150 204h40l-20 50z" fill="#e8e8ee" opacity=".7"/></svg>';
function wake3(){try{SND.init();BGM.init();BGM.set('title')}catch(_){}}
function nextEp(){return SEASON.eps.find(e=>epStatus(e)==='open')||SEASON.eps.find(e=>epStatus(e)!=='solved')||SEASON.eps[7]}
function renderTitle(){$('#play').hidden=true;$('#home').hidden=true;const t=$('#title');t.hidden=false;t.classList.add('nx');T.on=false;t.onclick=null;
  const nx=nextEp(),started=Object.keys(P.eps).length>0;
  t.innerHTML=`<div class="ti3"><div class="bg"></div><div class="fade"></div><div class="slash"></div><div class="ht"></div>
    <div class="tx"><span class="eptag">SEASON ONE</span><h1>BLACK<br>WOOD</h1><div class="lodge">LODGE</div><p>Eight nights. Eight deaths. One house that keeps its secrets.</p></div>
    <div class="acts"><button class="cta3" id="tgo"><span><b>${started?'CONTINUE':'BEGIN'}</b><small>EPISODE ${nx.n} · ${nx.t.toUpperCase()}</small></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z" fill="#e3243b"/></svg></button><button class="sec3" id="tbook">THE CASEBOOK</button></div>
    <div class="foot">NIGHTS PLAYED ${P.runs} · CASES CLOSED ${P.wins}</div></div>`;
  $('#tgo').onclick=()=>{wake3();try{SND.swell()}catch(_){}t.hidden=true;renderHome();episodeCard(nx.n)};
  $('#tbook').onclick=()=>{wake3();t.hidden=true;renderHome()}}
function renderHome(){try{BGM.set('title')}catch(_){}$('#play').hidden=true;$('#title').hidden=true;const h=$('#home');h.hidden=false;h.classList.add('nx');
  const solved=SEASON.eps.filter(e=>epStatus(e)==='solved').length,finale=epStatus(SEASON.eps[7])==='solved';
  const seg=SEASON.eps.map(e=>`<i class="${epStatus(e)}"></i>`).join('');
  const rows=SEASON.eps.map(e=>{const st=epStatus(e),r=P.eps[e.n]||{},num=String(e.n).padStart(2,'0');
    if(st==='locked')return `<div class="row3 locked"><span class="num">${num}</span><span class="nm"><b>${e.t.toUpperCase()}${e.n===8?' · FINALE':''}</b></span>${LOCK3}</div>`;
    if(st==='solved')return `<button class="row3 solved" data-ep="${e.n}"><span class="num">${num}</span><span class="nm"><b>${e.t.toUpperCase()}</b><small>${e.victim}${r.killer?' · '+r.killer+' did it':''}</small></span><span class="st"><span class="stamp">CLOSED</span><span class="stars">${'★'.repeat(r.stars||0)}${'☆'.repeat(3-(r.stars||0))}</span></span></button>`;
    return `<button class="row3 open" data-ep="${e.n}"><span class="num">${num}</span><span class="nm"><b>${e.t.toUpperCase()}</b><small>${e.victim} · ${e.logline}</small></span><span class="play">${r.tries?'RETRY':'PLAY'} ▸</span></button>`}).join('');
  h.innerHTML=`<div class="cbk3"><div class="ht"></div><button class="hb3" id="hback">‹ TITLE</button><h1>THE CASEBOOK</h1><div class="prog3"><span class="seg">${seg}</span><span>${solved} OF 8 CLOSED</span></div>
    <div class="rows">${rows}<button class="row3 free ${finale?'open':'locked'}" ${finale?'data-ep="0"':'disabled'}><span class="num">∞</span><span class="nm"><b>UNSOLVED CASES</b><small>${finale?'A new case every night, every rule in play.':'Opens when the season is closed.'}</small></span>${finale?'<span class="play">PLAY ▸</span>':LOCK3}</button></div></div>`;
  $('#hback').onclick=renderTitle;h.querySelectorAll('[data-ep]').forEach(b=>b.onclick=()=>episodeCard(+b.dataset.ep))}
function episodeCard(n){try{SND.open()}catch(_){}const e=n?SEASON.eps[n-1]:FREEPLAY,prev=n>1?SEASON.eps[n-2]:null,pr=prev&&P.eps[prev.n];const h=$('#home');h.hidden=false;$('#file3')?.remove();
  const pips=v=>[0,1,2,3].map(i=>`<i class="${i<v?'on':''}"></i>`).join('');
  h.insertAdjacentHTML('beforeend',`<div class="file3" id="file3"><div class="ht"></div><div class="scroll"><button class="close" id="fcl">CLOSE ✕</button>
    <div class="ftop"><div class="slash"></div><div class="photo"><div class="ph vic">${vicPhoto(e)}</div><span>THE VICTIM</span></div>
    <div class="hd"><span class="eptag">${n?'CASE '+String(n).padStart(2,'0'):'FREE PLAY'}</span><h2>${e.t.toUpperCase()}</h2><b>${e.victim}</b><small>${e.vdesc?e.vdesc[0].toUpperCase()+e.vdesc.slice(1)+'.':'A different victim every night.'}</small></div></div>
    ${pr&&pr.solved?`<div class="prev3"><b>PREVIOUSLY</b><span>You proved ${pr.killer} killed ${prev.victim} with the ${pr.weapon}. ${prev.arc}</span></div>`:''}
    <p class="cold">${e.cold}</p><div class="new3"><b>${n?'NEW':'ALL'}</b><span>${(t=>t[0].toUpperCase()+t.slice(1))(e.brief.replace(/^(New this episode|Season finale|Tonight)[:,]?\s*/i,''))}</span></div>
    <h4>WHO ARE YOU TONIGHT?</h4><div class="roles">${Object.entries(ARCH).map(([k,a])=>`<button data-a="${k}" class="${k===archPick?'on':''}"><span class="rp3">${rolePic(k)}</span><b>${a.n.toUpperCase()}</b><small>${a.desc}</small><span class="pips">${['wits','body','nerve','charm'].map(s=>`<span>${s.toUpperCase()}</span><span class="p">${pips(a.s[s])}</span>`).join('')}</span><em>Carries ${KIT[k].filter(x=>x!=='torch').map(x=>TOOLS[x].n.toLowerCase()).join(', ')} · health ${a.hp+(e.rules.hpMod||0)}</em></button>`).join('')}</div></div>
    <div class="ctaw"><button class="cta3 red" id="fgo"><b>${P.eps[n]&&P.eps[n].solved?'PLAY AGAIN · NEW CASE':'TAKE THE CASE ▸'}</b></button></div></div>`);
  const f=$('#file3');f.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{archPick=b.dataset.a;f.querySelectorAll('[data-a]').forEach(x=>x.classList.toggle('on',x===b))});
  $('#fcl').onclick=()=>f.remove();$('#fgo').onclick=()=>{f.remove();startGame((Math.random()*1e9)|0,archPick,e)}}
function episodeCardFromPlay(next){renderHome();episodeCard(next.n)}
