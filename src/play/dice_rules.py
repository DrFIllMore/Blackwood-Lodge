# Fail-forward, careful-or-quick, and a bonus after a miss. Applied to the original engine text.
def apply(src):
    def rep(a,b):
        nonlocal src
        assert src.count(a)==1,(src.count(a),a[:80]);src=src.replace(a,b)
    i=src.index('function roll(G,stat,dc,label){');j=src.index('\n',i)
    src=src[:i]+"""function roll(G,stat,dc,label){const key=G._rk||label;G._rk=null;G.miss=G.miss||{};const bonus=3*(G.miss[key]||0);const d=G.r.int(20)+1,mod=G.st[stat]+(G.light||stat==='nerve'?0:-2)+bonus,tot=d+mod,ok=d===20||(d!==1&&tot>=dc);
  G.lastRoll={d,mod,tot,dc,ok,stat,label:bonus?`${label} · +${bonus} from last try`:label,crit:d===20,fumble:d===1};(G.rolls=G.rolls||[]).push(G.lastRoll);if(ok)delete G.miss[key];else G.miss[key]=(G.miss[key]||0)+1;return ok}"""+src[j:]
    i=src.index('function search(G,spot){');j=src.index('function examine(G)')
    src=src[:i]+r"""function spotHolds(G,room,spot){const M=G.M;return (room===M.weaponRoom&&spot===M.weaponSpot&&!G.ev.some(e=>e.id==='weapon'))?'weapon':(room==='study'&&spot===M.itemSpot&&!G.ev.some(e=>e.id==='item'))?'item':(room===M.diaryRoom&&spot===M.diarySpot&&!G.ev.some(e=>e.id==='diary'))?'diary':(M.weaponTrail===room&&M.trailSpot===spot&&!G.flags.trail)?'trail':null}
function search(G,spot,careful){const M=G.M,room=G.room;spot=spot||Object.keys(SPOTS[room])[0];const key=room+':'+spot,name=SPOTS[room][spot]||spot;G.lead=G.lead||{};tick(G,careful?25:10);
  const what=spotHolds(G,room,spot);let ok=careful||!!G.lead[key];if(!ok){G._rk='search:'+key;ok=roll(G,"wits",11,"Search the "+name)}
  if(!ok){const fum=G.lastRoll&&G.lastRoll.fumble;const k=M.sus.find(s=>s.id===M.killer);
    if(what){G.lead[key]=1;say(G,{weapon:`Something heavy is wedged deep in the ${name}. Your fingers touch it and lose it. It's in there; another go will have it.`,item:`Caught in the ${name}: a few ${k.coat} wool fibres. Something torn from a coat is close by.`,diary:`A corner of folded paper, stuck fast in the ${name}. It needs a steadier hand.`,trail:`The dust in the ${name} has been disturbed. Something lay here.`}[what],'ev');
      if(what==='item')addEv(G,'fibres',`${k.coat[0].toUpperCase()+k.coat.slice(1)} wool fibres caught in the study ${name}: torn from a coat.`)}
    else{G.searched[key]=1;say(G,`You go through the ${name} in a hurry. Nothing there.`,'dim')}
    if(fum){G.susp++;say(G,'Something falls and shatters. Whoever is awake knows where you are.','bad')}return}
  G.searched[key]=1;G.found=G.found||{};delete G.lead[key];
  if(what==='weapon'){G.found[key]=1;addEv(G,'weapon',`The ${M.weapon.n}, wiped badly, hidden in the ${name} in the ${ROOMS[room].n.toLowerCase()}.`);G.susp++;return}
  if(what==='item'){G.found[key]=1;addEv(G,'item',`In the ${name}: ${M.itemDesc}, torn off in a struggle.`);return}
  if(what==='diary'){G.found[key]=1;const [x,y]=M.diary.map(id=>M.sus.find(s=>s.id===id));addEv(G,'diary',`A letter from the victim, folded into the ${name}: "${x.n} and ${y.n} both have reason to want me quiet. One of them ${M.motive}."`);return}
  if(what==='trail'){G.flags.trail=true;G.found[key]=1;say(G,`A clean patch in the dust in the ${name}, where something lay until tonight. It was moved.`,'ev');return}
  say(G,careful?`You take the ${name} apart and put it back. Nothing here.`:`Nothing in the ${name}.`,'dim')}
"""+src[j:]
    i=src.index('function examine(G){');j=src.index('function weaponHint(w)')
    src=src[:i]+r"""function examine(G,careful){if(G.room!=='study')return;const M=G.M;if(G.flags.body){tick(G,2);return say(G,'You have seen what there is to see.','dim')}tick(G,careful?30:15);const she=/Margaret|Celia|Rose/.test(M.victim.n)?'she':'he';
  let ok=G.arch==='doctor'||careful;if(!ok){G._rk='examine';ok=roll(G,'wits',13,'Examine the wound')}
  if(ok){G.flags.body=true;say(G,`${M.victim.n} lies where ${she} fell. Looking closely: ${M.weapon.wound}. ${weaponHint(M.weapon)}`);addEv(G,'wound',`The wound fits ${weaponHint(M.weapon).toLowerCase()}`)}
  else{G.flags.bodyLook=true;const where={poker:'the back of the head',wrench:'the head',statue:'the crown of the head',knife:'the body, below the ribs',cord:'the throat'}[M.weapon.id];say(G,`${M.victim.n} lies where ${she} fell. The wound is to ${where}. You can't yet say what made it; another look would tell you more.`)}}
"""+src[j:]
    rep("""const dc=G.arch==='journalist'?10:13;if(!roll(G,'charm',dc,'Press')){say(G,`<b>${s.n}:</b> "I've told you what I know." ${s.id===M.killer?'The eyes do not match the voice.':''}`,'dim');if(isK)G.susp++;return}""",
        """const dc=G.arch==='journalist'?10:13;if(G._careful){tick(G,15)}else{G._rk='press:'+sid;if(!roll(G,'charm',dc,'Press '+s.n.split(' ').slice(-1)[0])){
      if(isK){say(G,`<b>${s.n}:</b> "I've told you what I know." Calm, and the same words as before, almost to the letter.`,'dim');G.susp++}
      else if(isL&&!st.truth)say(G,`<b>${s.n}:</b> "I've said where I was." They look away when they say who they were with.`,'dim');
      else if(sid===M.witness&&!st.saw)say(G,`<b>${s.n}:</b> "Nothing. I saw nothing." Their eyes go to the study door, and back.`,'dim');
      else say(G,`<b>${s.n}:</b> "Truly, that's all I know." It sounds like it is.`,'dim');return}}""")
    i=src.index('function warn(G,sid){');j=src.index('\n',i)
    src=src[:i]+"""function warn(G,sid,careful){const s=G.M.sus.find(x=>x.id===sid);tick(G,careful?15:5);let ok=careful;if(!ok){G._rk='warn:'+sid;ok=roll(G,'charm',11,'Warn')}if(ok){G.warned[sid]=true;G.locked[sid]=true;G.pos[sid]=homeRoom(G,s);say(G,careful?`You sit with ${s.n} until they believe you. They lock themselves in their room.`:`${s.n} goes pale, nods, and locks themselves in their room. Good.`)}else say(G,`${s.n} laughs it off. "In this house? Don't be dramatic." But they glance at the stairs.`,'dim')}"""+src[j:]
    i=src.index('function repair(G){');j=src.index('\n',i)
    src=src[:i]+"""function repair(G,careful){if(G.room!=='boiler')return;if(G.radio){tick(G,2);return say(G,'The radio is already working.','dim')}tick(G,careful?60:30);let ok=careful;if(!ok){G._rk='radio';ok=roll(G,'wits',14,'Repair radio')}if(ok){G.radio=true;G.police=Math.min(G.R.dawn,G.time+G.R.policeDelay);say(G,`Static, then a voice. The police can be here by ${fmtT(G.police)}. Until then you are on your own, and so is everyone else.`,'ev')}else say(G,'Wires and frost. Not yet, but you have found the broken valve; next time will be quicker.','dim')}"""+src[j:]
    return src
