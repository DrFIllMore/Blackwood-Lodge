/* ---------- questioning: the answer takes the stage ----------
   After you ask something, the choices clear and the reply comes up in a large speech box over the portrait,
   typed out, with a stamp for any roll. Tap to read on; then the next questions come back. */
function sayOpen3(s,lines,roll){const t=$('#talk3');if(!t)return;$('#say3')?.remove();const ch=$('#tch3');if(ch)ch.innerHTML='';$('#talk3 .mid3')?.classList.remove('choosing');
  const speech=[],aside=[];for(const l of lines){const m=l.t.match(/^<b>([^<]+):<\/b>\s*/);if(m&&m[1]===s.n)speech.push(l.t.slice(m[0].length));else aside.push({t:l.t.replace(/^<b>Evidence:<\/b>\s*/,''),bad:l.cls==='bad'})}
  if(!speech.length&&!aside.length)return false;
  const stamp=roll?`<span class="rs3 ${roll.ok?'ok':'no'}">${(STATN[roll.stat]||'').toUpperCase()} ${roll.tot} vs ${roll.dc} · ${roll.ok?(roll.crit?'CRITICAL':'SUCCEEDED'):'FAILED'}</span>`:'';
  t.classList.add('saying');
  t.insertAdjacentHTML('beforeend',`<div class="say3" id="say3" role="dialog" aria-live="polite">${stamp}<span class="nm">${s.n.toUpperCase()}</span><div class="sb">
${speech.map(x=>`<p class="sp">${x}</p>`).join('')}${aside.map(a=>`<p class="as ${a.bad?'bad':''}">${a.t}</p>`).join('')}<em class="more">TAP TO CONTINUE ▸</em></div></div>`);
  const box=$('#say3'),ps=[...box.querySelectorAll('p')],full=ps.map(p=>p.innerHTML);
  /* type it out: plain text letter by letter, markup kept whole */
  let i=0,k=0,timer=null;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const toks=full.map(h=>h.match(/<[^>]+>|&[a-z#0-9]+;|[\s\S]/gi)||[]);ps.forEach(p=>p.innerHTML='');
  const finish=()=>{clearInterval(timer);timer=null;ps.forEach((p,j)=>p.innerHTML=full[j]);box.classList.add('done')};
  if(reduce)finish();else timer=setInterval(()=>{if(i>=ps.length)return finish();k++;ps[i].innerHTML=toks[i].slice(0,k).join('');if(k>=toks[i].length){i++;k=0}},16);
  box.addEventListener('click',e=>{e.stopPropagation();if(timer)return finish();sayClose3(s)});
  return true}
function sayClose3(s){$('#say3')?.remove();$('#talk3')?.classList.remove('saying');if(!G||!P3.talk)return;const cur=G.M.sus.find(x=>x.id===P3.talk);if(cur)talkChoices(cur)}
const renderTalk3s=renderTalk;
renderTalk=function(lines){renderTalk3s(lines);if(!lines||!lines.length||!P3.talk)return;const s=G.M.sus.find(x=>x.id===P3.talk);if(!s)return;
  const r=G.lastRoll&&lines[0]&&lines[0].roll?G.lastRoll:null;sayOpen3(s,lines,r)};
const closeTalk3s=closeTalk;closeTalk=function(q){$('#say3')?.remove();$('#talk3')?.classList.remove('saying');return closeTalk3s(q)};
