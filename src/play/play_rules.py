# Engine changes for the play layer, applied after dice_rules: two dice (advantage), a forced press result, and a slip counting as proof.
def apply(src):
    def rep(a,b):
        nonlocal src
        assert src.count(a)==1,(src.count(a),a[:90]);src=src.replace(a,b)
    # advantage: G._adv=1 rolls two and keeps the higher, -1 keeps the lower
    rep("const d=G.r.int(20)+1,mod=G.st[stat]+(G.light||stat==='nerve'?0:-2)+bonus,tot=d+mod,ok=d===20||(d!==1&&tot>=dc);",
        "const adv=G._adv||0;G._adv=0;const d1=G.r.int(20)+1,d2=adv?G.r.int(20)+1:0,d=adv>0?Math.max(d1,d2):adv<0?Math.min(d1,d2):d1,other=adv?(d===d1?d2:d1):0,mod=G.st[stat]+(G.light||stat==='nerve'?0:-2)+bonus,tot=d+mod,ok=d===20||(d!==1&&tot>=dc);")
    rep("G.lastRoll={d,mod,tot,dc,ok,stat,label:bonus?",
        "G.lastRoll={d,other,adv,bonus,mod,tot,dc,ok,stat,label:bonus?")
    # a press can be decided by the play layer (another stat, or evidence on the table)
    rep("if(G._careful){tick(G,15)}else{G._rk='press:'+sid;if(!roll(G,'charm',dc,'Press '+s.n.split(' ').slice(-1)[0])){",
        "if(G._force===true){}else if(G._careful){tick(G,15)}else{if(G._force!==false)G._rk='press:'+sid;if(G._force===false||!roll(G,'charm',dc,'Press '+s.n.split(' ').slice(-1)[0])){")
    # a killer who slips under questioning has handed you proof
    rep("const proof=G.ev.filter(e=>['weapon','item','witness','glimpse','wound'].includes(e.id)||e.id==='contra_'+M.killer).length;\n  G.over=",
        "const proof=G.ev.filter(e=>['weapon','item','witness','glimpse','wound','slip'].includes(e.id)||e.id==='contra_'+M.killer).length;\n  G.over=")
    rep("function proofCount(){const M=G.M;return G.ev.filter(e=>['weapon','item','witness','glimpse','wound'].includes(e.id)||e.id==='contra_'+M.killer).length}",
        "function proofCount(){const M=G.M;return G.ev.filter(e=>['weapon','item','witness','glimpse','wound','slip'].includes(e.id)||e.id==='contra_'+M.killer).length}")
    return src
