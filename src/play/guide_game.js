/* ---------- the game tells you what you're doing ----------
   1. the end can't get stuck  2. the four questions always on screen  3. next steps always on screen
   4. clues say which question they answer  5. tools say what they're for, locks say what they need
   6. walking into a room tells you what is left to do there */

/* 1 ── the end of the night always reaches a screen you can act on */
const accuse3g=accuse;accuse=function(Gx,...a){if(Gx)Gx._named=true;return accuse3g(Gx,...a)};
const openTalk3g=openTalk;openTalk=function(...a){if(G&&G.over)return;return openTalk3g(...a)};
const objTap3g=objTap;objTap=function(t){if(G&&G.over)return;return objTap3g(t)};
setInterval(()=>{try{if(!G||!G.over||$('#play').hidden){if(G)G._overAt=0;return}
  if($('#play .end')||$('#scr3 .acc3')||$('#roll3')||P3.busy||P3.confront){G._overAt=0;return}
  /* a peek at the board or notebook from the dawn screen is fine; only step in when nothing is open */
  if($('#scr3')&&G._accBack)return;
  const now=Date.now();if(!G._overAt){G._overAt=now;return}if(now-G._overAt<2500)return;G._overAt=0;
  try{closeTalk(true)}catch(_){}try{closeScr()}catch(_){}document.querySelectorAll('#clue3,#reveal3,#say3').forEach(e=>e.remove());
  if((G.over==='dawn'||G.over==='police')&&!G._named){LOG3.ev('rescue',{to:'accuse'});accuseSheet(true)}else{LOG3.ev('rescue',{to:'ending'});G.accused=true;ending()}}catch(e){console.warn(e)}},800);
/* the result screen sits above everything else */
const ending3g=ending;ending=function(...a){const r=ending3g(...a);if($('#play .end')){document.querySelectorAll('#clue3,#reveal3,#say3,#arr3').forEach(e=>e.remove());try{closeTalk(true)}catch(_){}}return r};

/* 2 ── which question each clue answers */
function evQ3(id){if(id==='clock')return 'when';if(id==='diary')return 'why';if(id==='weapon'||id==='wound'||id.startsWith('home_'))return 'with';
  if(['item','fibres','coat','witness','glimpse','smear','slip'].includes(id)||id.startsWith('contra_'))return 'who';return null}
const QN3={with:'WITH WHAT',who:'WHO',when:'WHEN',why:'WHY'};

/* 3 ── what to do next */
const LOCKTAG3={locked:'lock',heavy:'heavy',low:'dark',dig:'dark'};
const NEEDWORD3={lock:'something to pick a lock with',heavy:'something to lever it with',dark:'a light'};
function spotName3(key){const [r,s]=key.split(':');return (SPOTS[r]||{})[s]||s}
function roomName3(r){return (ROOMS[r]||{}).n||r}
function where3(r){return r===G.room?'here':'the '+roomName3(r).toLowerCase()}
function leads3(){if(!G||!G.M)return [];const M=G.M,out=[],has=id=>G.ev.some(e=>e.id===id);
  if(!G.flags.body)out.push({p:9,t:`Examine the body in the study.`,r:'study'});
  for(const k of Object.keys(G.lead||{})){if(G.found&&G.found[k])continue;const r=k.split(':')[0];out.push({p:8,t:`Something is in the ${spotName3(k)} in ${where3(r)}. Go back for it.`,r})}
  for(const h of G.hunch||[]){if(G.searched[h.key])continue;out.push({p:7,t:`${roomName3(h.room)}: ${h.t}`,r:h.room})}
  for(const k of Object.keys(G.seenLock||{})){if(G.searched[k])continue;const tag=LOCKTAG3[G.seenLock[k]];if(tag&&!toolFor(tag))out.push({p:5,t:`The ${spotName3(k)} in ${where3(k.split(':')[0])} needs ${NEEDWORD3[tag]}.`,r:k.split(':')[0]})}
  const unasked=M.sus.filter(s=>!G.flags['dead_'+s.id]&&!((G.stmts||{})[s.id]||{}).alibi);
  if(unasked.length){const s=unasked.find(x=>G.pos[x.id]===G.room)||unasked[0];out.push({p:6,t:`Ask ${short(s.n)} where they were at twenty to ten${G.pos[s.id]?` (${where3(G.pos[s.id])})`:''}.`,r:G.pos[s.id]})}
  const qs=questions();const open=qs.filter(q=>q.st<2);
  const hint={with:has('wound')?`The wound points to ${weaponHint(M.weapon)}. Find what's missing from its place.`:`Read the wound on the body to learn what killed them.`,
    who:`Compare stories: whoever's story doesn't match someone else's is lying.`,when:`Look around the study for whatever stopped at the moment of the attack.`,why:`Search the bedrooms upstairs for letters or papers.`};
  for(const q of open)out.push({p:q.id==='who'?3:4,t:hint[q.id],r:null});
  if(!open.length&&proofCount()>=2)out.unshift({p:10,t:`You can answer all four. Open the board and make your accusation.`,r:null,acc:1});
  return out.sort((a,b)=>b.p-a.p)}
function trackHTML3(){const qs=questions();return `<div class="trk3" role="button" aria-label="Case questions">${qs.map(q=>`<span class="q3c ${q.st===2?'done':q.st?'half':''}">${QN3[q.id]}${q.st===2?' ✓':''}</span>`).join('')}<span class="q3c pf">PROOF ${proofCount()}</span></div>`}
function guide3(){const pl=$('#play');if(!pl||pl.hidden||!G||G.over||!G.M){$('#guide3')?.remove();return}
  const L=leads3();const top=L.slice(0,1);
  const h=`${trackHTML3()}${top.length?`<div class="nx3" role="button"><b>NEXT</b>${top.map(l=>`<span>${l.t}</span>`).join('')}</div>`:''}`;
  let g=$('#guide3');if(!g){pl.insertAdjacentHTML('beforeend','<div class="guide3" id="guide3"></div>');g=$('#guide3');
    g.addEventListener('click',e=>{if(e.target.closest('.trk3'))return board();if(e.target.closest('.nx3')){journal();setTimeout(()=>document.querySelector('[data-t="leads3"]')?.click(),30)}})}
  if(g._h!==h){g.innerHTML=h;g._h=h}
  g.classList.toggle('busy',!!$('.mid3.choosing'));g.hidden=!!(P3.talk||V.intro||$('#brief3')||($('#scr3host')&&$('#scr3host').childElementCount)||$('#tcard'))}
const refresh3g=refresh;refresh=function(...a){const r=refresh3g(...a);try{guide3()}catch(e){console.warn(e)}return r};
setInterval(()=>{try{guide3()}catch(_){}},1000);
/* the notebook's lead list shows the same next steps, plus the old ones */
const journal3g=journal;journal=function(...a){const r=journal3g(...a);try{const box=$('#leads3');if(box){const L=leads3();box.innerHTML=L.length?L.map(l=>`<div class="lg3 notice"><time>${l.acc?'NOW':'NEXT'}</time><span>${l.t}</span></div>`).join(''):'<p class="none3">Nothing pressing. Look around.</p>';const tb=$('[data-t="leads3"]');if(tb)tb.textContent='LEADS '+L.length}}catch(e){}return r};

/* 4 ── clue stamps and evidence say what they answer */
const clueNext3g=clueNext3;clueNext3=function(){const nx=CQ3[0];clueNext3g();try{const el=$('#clue3');if(!el||el._q||!nx)return;el._q=1;const qq=evQ3(nx.id);
  if(qq){const sm=el.querySelector('small');if(sm)sm.insertAdjacentHTML('beforebegin',`<em class="qa3">HELPS ANSWER: ${QN3[qq]}</em>`)}}catch(_){}};

/* 5 ── tools say what they're for; locks say what they need */
function usesFor3(id){const T=TOOLS[id];if(!T)return [];const kinds=[];for(const t of T.tags){if(t==='lock'||t==='pry')kinds.push('locked');if(t==='heavy')kinds.push('heavy');if(t==='dark')kinds.push('low','dig');if(t==='read')kinds.push('container','surface','floor')}
  const out=[];for(const [key,x] of Object.entries(SPOTX)){if(!kinds.includes(x.k))continue;if(G.searched[key]||(G.found&&G.found[key]))continue;const r=key.split(':')[0];if(!(G.visited||{})[r]&&!(G.seenLock||{})[key])continue;out.push(`the ${spotName3(key)} (${roomName3(r).toLowerCase()})`)}
  return out.slice(0,3)}
function toolLine3(id){const T=TOOLS[id];if(!T)return '';const u=usesFor3(id);const what=[...new Set(T.tags.map(t=>TAGWORD[t]).filter(Boolean))].join(', ');
  return u.length?`Try it on ${u.join(', ')}.`:`Good for ${what}. Keep it for when you need it.`}
const reveal3g=reveal3;reveal3=function(list,done){const it=list[0];reveal3g(list,done);try{const el=$('#reveal3');if(!el||!it)return;
  const tid=Object.keys(TOOLS).find(k=>TOOLS[k].n===it.name);const p=el.querySelector('p');if(!p)return;
  if(tid)p.insertAdjacentHTML('afterend',`<p class="use3">${toolLine3(tid)}</p>`);
  else{const e=[...G.ev].reverse().find(x=>it.d===x.t);const q=e&&evQ3(e.id);if(q)p.insertAdjacentHTML('afterend',`<p class="use3">Helps answer: ${QN3[q]}. Show it to whoever it fits.</p>`)}}catch(_){}};
const satchel3g=satchel;satchel=function(selKey,...a){const r=satchel3g(selKey,...a);try{const tag=$('#scr3 .tag3');const k=$('#scr3 [data-k].on');if(tag&&k&&k.dataset.k.startsWith('t:')){const id=k.dataset.k.slice(2);if(!tag.querySelector('.use3'))(tag.querySelector('.scrawl')||tag.lastElementChild).insertAdjacentHTML('afterend',`<p class="use3">${toolLine3(id)}</p>`)}}catch(_){}return r};
const spotTap3g=spotTap;spotTap=function(id){const key=G.room+':'+id,x=SPOTX[key]||{k:'container'};const r=spotTap3g(id);
  try{if(!G.searched[key]&&!(G.found&&G.found[key])){const tag=LOCKTAG3[x.k];if(tag){G.seenLock=G.seenLock||{};G.seenLock[key]=x.k;
      const t=$('#ntx3');if(t&&!toolFor(tag)){const where=Object.entries(TOOLSPOT).filter(([,v])=>TOOLS[v].tags.includes(tag==='lock'?'lock':tag)&&!(G.items||[]).some(i=>i.id===v)).map(([k])=>roomName3(k.split(':')[0]).toLowerCase());
        t.insertAdjacentHTML('beforeend',`<p class="tip3"><b>TIP</b> With ${NEEDWORD3[tag]} this would be quiet and certain.${where.length?` There's one somewhere in the ${[...new Set(where)].slice(0,2).join(' or the ')}.`:''}</p>`)}
      else if(t&&toolFor(tag))t.insertAdjacentHTML('beforeend',`<p class="tip3"><b>TIP</b> Your ${TOOLS[toolFor(tag).id||toolFor(tag)]?.n||'tool'} will do it.</p>`)}}}catch(_){}return r};

/* 6 ── on walking in: what is left to do here */
const arrivalHTML3g=arrivalHTML;arrivalHTML=function(lines){let h=arrivalHTML3g(lines);try{const R=G.room,left=Object.keys(SPOTS[R]||{}).filter(s=>!G.searched[R+':'+s]&&!(G.found&&G.found[R+':'+s])).map(s=>SPOTS[R][s]);
  const ppl=npcsIn(G,R).filter(s=>!((G.stmts||{})[s.id]||{}).alibi).map(s=>short(s.n));
  const bits=[];if(left.length)bits.push(`to search: ${left.join(', ')}`);if(ppl.length)bits.push(`not yet questioned: ${ppl.join(', ')}`);if(R==='study'&&!G.flags.body)bits.unshift('the body');
  h+=bits.length?`<p class="left3">Still here ${bits.join(' · ')}.</p>`:`<p class="left3 done">You've done all you can in here for now.</p>`}catch(_){}return h};
