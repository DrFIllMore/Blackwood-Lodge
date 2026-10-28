/* ---------- score: a suspense thriller score, synthesised live, that tightens as the night goes on ----------
   C minor with a tritone shadow. A grandfather clock that never stops, a music-box theme, low felt piano,
   dissonant string clusters, a wordless choir, a heartbeat and a pulsing low ostinato when someone is close.
   Convolution reverb for a big, cold house. Sixteenth-note sequencer with lookahead. */
const BGM={mode:'off',ctx:null,step:0,next:0,bus:{},focusOn:false,
  BPM:{title:66,calm:72,porch:60,dark:64,stalk:84,confront:118,end:58,win:62},
  CH:[[48,51,55],[48,51,55],[44,48,51],[44,48,51],[41,44,48],[41,44,48],[43,47,50,53],[43,47,50,56]],
  ROOT:[36,36,32,32,29,29,31,31],
  /* the house theme, on a music box: [bar, step, midi, length in sixteenths] */
  THEME:[[0,0,79,4],[0,4,80,2],[0,6,79,2],[0,8,78,4],[0,12,79,4],[1,0,87,4],[1,4,86,4],[1,8,84,8],
         [2,0,80,4],[2,4,79,2],[2,6,77,2],[2,8,75,4],[2,12,77,4],[3,0,74,4],[3,4,75,4],[3,8,71,8],
         [4,0,84,4],[4,4,83,2],[4,6,84,2],[4,8,86,4],[4,12,87,4],[5,0,89,4],[5,4,87,2],[5,6,86,2],[5,8,84,4],[5,12,79,4],
         [6,0,80,4],[6,4,79,4],[6,8,78,4],[6,12,79,4],[7,0,72,16]],
  MIX:{off:{},
    title:{drone:.5,clock:.6,box:.75,pno:.85,str:.45,choir:.35,boom:.7,fx:.7},
    calm:{drone:.38,clock:.55,box:.6,pno:.8,str:.3,choir:.12,fx:.6},
    porch:{drone:.4,box:.35,pno:.5,wind:.16,str:.15,fx:.5},
    dark:{drone:.7,heart:.5,str:.4,choir:.45,pno:.6,scrape:.4,boom:.55,wind:.04,fx:.7},
    stalk:{drone:.55,heart:.75,pulse:.7,clock:.5,str:.55,scrape:.45,riser:.5,boom:.8,fx:.8},
    confront:{drone:.4,heart:.8,pulse:.75,str:.5,scrape:.45,riser:.5,boom:.75,fx:.8},
    end:{drone:.35,pno:.75,str:.4,choir:.38,fx:.5},
    win:{drone:.2,pno:.8,str:.5,choir:.4,box:.4,boom:.5,fx:.6}},
  hz:m=>440*Math.pow(2,(m-69)/12),
  init(){if(this.ctx||!SND.ctx)return;const c=this.ctx=SND.ctx;
    this.master=c.createGain();this.master.gain.value=.62;this.mf=c.createBiquadFilter();this.mf.type='lowpass';this.mf.frequency.value=18000;this.mf.Q.value=.7;
    const comp=c.createDynamicsCompressor();comp.threshold.value=-18;comp.ratio.value=3.5;comp.attack.value=.01;comp.release.value=.3;
    this.master.connect(this.mf);this.mf.connect(comp);comp.connect(c.destination);
    this.rv=c.createConvolver();this.rv.buffer=this.ir(3.6,2.4);const wet=c.createGain();wet.gain.value=.55;this.rv.connect(wet);wet.connect(this.master);
    const send={box:.75,pno:.5,str:.55,choir:.7,heart:.15,clock:.3,boom:.45,scrape:.6,riser:.5,pulse:.12,fx:.45};
    for(const k of ['drone','clock','box','pno','str','choir','heart','pulse','scrape','riser','boom','wind','fx']){const g=c.createGain();g.gain.value=0;g.connect(this.master);if(send[k]){const s=c.createGain();s.gain.value=send[k];g.connect(s);s.connect(this.rv)}this.bus[k]=g}
    this.makeDrone();this.makeWind();this.next=c.currentTime+.08;this.timer=setInterval(()=>this.sched(),25)},
  /* a cold stone-and-wood room: stereo decaying noise that darkens as it fades */
  ir(sec,decay){const c=this.ctx,n=Math.floor(c.sampleRate*sec),b=c.createBuffer(2,n,c.sampleRate);for(let ch=0;ch<2;ch++){const d=b.getChannelData(ch);let lp=0;for(let i=0;i<n;i++){const t=i/n,k=.9-.82*t;lp=lp*k+(Math.random()*2-1)*(1-k);d[i]=lp*Math.pow(1-t,decay)*(i<c.sampleRate*.012?i/(c.sampleRate*.012):1)}}return b},
  set(mode){if(!this.ctx||mode===this.mode)return;const prev=this.mode;this.mode=mode;const M=this.MIX[mode]||{},t=this.ctx.currentTime,fast=mode==='confront'||prev==='confront'||mode==='stalk';
    for(const k in this.bus){this.bus[k].gain.cancelScheduledValues(t);this.bus[k].gain.setTargetAtTime(M[k]||0,t,fast?.25:1.2)}
    if(['confront','stalk'].includes(mode)&&!['confront','stalk'].includes(prev)){this.boom(t+.02,1,'fx');this.scrape(t+.05,.5,'fx')}},
  focus(on){if(!this.ctx||on===this.focusOn)return;this.focusOn=on;const t=this.ctx.currentTime;this.mf.frequency.cancelScheduledValues(t);this.mf.frequency.setTargetAtTime(on?600:18000,t,on?.2:.06);
    if(on){this.riser(t,2.2,.25,'fx')}},
  sting(ok){if(!this.ctx)return;const t=this.ctx.currentTime+.01;this.focus(false);
    if(ok){[60,67,72,75,79].forEach((m,i)=>this.bell(this.hz(m+12),t+i*.025,2.2,.06,'fx'));this.pno(this.hz(48),t,2.4,.3,'fx');this.pno(this.hz(55),t,2.4,.2,'fx')}
    else{this.pno(this.hz(36),t,2.6,.45,'fx');this.pno(this.hz(37),t,2.6,.35,'fx');this.pno(this.hz(42),t,2.6,.25,'fx');this.boom(t,.7,'fx')}},
  /* ---------- voices ---------- */
  v(bus,f,t,dur,type,vol,o={}){const c=this.ctx,os=c.createOscillator(),g=c.createGain();os.type=type;os.frequency.setValueAtTime(o.from||f,t);if(o.from)os.frequency.exponentialRampToValueAtTime(f,t+(o.fromT||.06));if(o.det)os.detune.value=o.det;if(o.glide)os.frequency.exponentialRampToValueAtTime(o.glide,t+dur*.9);
    if(o.vib){const l=c.createOscillator();l.frequency.value=o.vib;const lg=c.createGain();lg.gain.value=f*(o.vd||.006);l.connect(lg);lg.connect(os.frequency);l.start(t);l.stop(t+dur+.05)}
    const a=o.a||.005;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+a);if(o.sus!=null)g.gain.linearRampToValueAtTime(vol*o.sus,t+Math.max(a+.01,dur*.6));g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    let out=os;if(o.lp||o.bp){const f2=c.createBiquadFilter();f2.type=o.bp?'bandpass':'lowpass';f2.Q.value=o.q||1;f2.frequency.setValueAtTime(o.lp||o.bp,t);if(o.env)f2.frequency.linearRampToValueAtTime(o.env,t+(o.envT||.25));os.connect(f2);out=f2}
    if(o.trem){const l=c.createOscillator();l.frequency.value=o.trem;const lg=c.createGain();lg.gain.value=.5;const tg=c.createGain();tg.gain.value=.5;l.connect(lg);lg.connect(tg.gain);out.connect(tg);out=tg;l.start(t);l.stop(t+dur+.05)}
    out.connect(g);g.connect(this.bus[bus]||this.bus.fx);os.start(t);os.stop(t+dur+.05)},
  nbuf(){if(this._nb)return this._nb;const c=this.ctx,b=c.createBuffer(1,c.sampleRate*2,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return this._nb=b},
  noise(t,dur,f,type,vol,bus,q=.8,sweep,att){const c=this.ctx,s=c.createBufferSource();s.buffer=this.nbuf();s.loop=dur>1.9;const fl=c.createBiquadFilter();fl.type=type;fl.frequency.setValueAtTime(f,t);if(sweep)fl.frequency.exponentialRampToValueAtTime(sweep,t+dur);fl.Q.value=q;const g=c.createGain();
    if(att){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+att);g.gain.exponentialRampToValueAtTime(.0001,t+dur)}else{g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur)}
    s.connect(fl);fl.connect(g);g.connect(this.bus[bus]||bus);s.start(t,Math.random()*.5);s.stop(t+dur+.02)},
  /* clock: a dry wooden tick and a lower tock */
  tick(t,tock,vol){this.noise(t,.018,tock?2300:3300,'bandpass',vol,'clock',9);this.v('clock',tock?1150:1620,t,.05,'sine',vol*.18,{a:.001});this.v('clock',tock?380:520,t,.03,'triangle',vol*.12,{a:.001})},
  /* music box: inharmonic FM-style bell made of partials */
  bell(f,t,dur,vol,bus='box'){for(const [m,a,d] of [[1,1,1],[2.76,.32,.45],[5.4,.14,.22],[8.93,.06,.12]])this.v(bus,f*m,t,dur*d,'sine',vol*a,{a:.002});this.v(bus,f*1.003,t,dur*.8,'sine',vol*.4,{a:.002})},
  /* felt piano: inharmonic partials, a soft hammer, high partials dying first */
  pno(f,t,dur,vol,bus='pno'){const B=.0004;for(let n=1;n<=7;n++){const fn=f*n*Math.sqrt(1+B*n*n);if(fn>9000)break;this.v(bus,fn,t,dur/(1+(n-1)*.55),'sine',vol*Math.pow(n,-1.35)*(n===1?1:.8),{a:.004})}
    this.noise(t,.05,Math.min(4000,f*6),'lowpass',vol*.15,bus,.7)},
  /* string cluster: detuned saws, slow swell, optional tremolo, a hiss of bow noise */
  cluster(ms,t,dur,vol,o={}){for(const m of ms)for(const det of [-8,8])this.v('str',this.hz(m),t,dur,'sawtooth',vol/ms.length,{det,a:o.a||1.4,sus:.9,lp:o.lp||1400,q:.8,trem:o.trem});if(o.bow)this.noise(t,dur,o.bow,'bandpass',vol*.03,'str',6,null,o.a||1.2)},
  /* wordless choir: saw through vowel formants */
  choir(m,t,dur,vol){const c=this.ctx,f=this.hz(m);for(const det of [-10,0,11]){const os=c.createOscillator();os.type='sawtooth';os.frequency.value=f;os.detune.value=det;const g=c.createGain();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol/3,t+1.6);g.gain.setValueAtTime(vol/3,t+dur-1.4);g.gain.linearRampToValueAtTime(.0001,t+dur);
      for(const [ff,q,a] of [[320,9,1],[780,10,.55],[2400,12,.18]]){const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=ff;bp.Q.value=q;const ga=c.createGain();ga.gain.value=a;os.connect(bp);bp.connect(ga);ga.connect(g)}
      const l=c.createOscillator();l.frequency.value=4.6+Math.random();const lg=c.createGain();lg.gain.value=f*.005;l.connect(lg);lg.connect(os.frequency);l.start(t);l.stop(t+dur+.05);g.connect(this.bus.choir);os.start(t);os.stop(t+dur+.05)}},
  heart(t,vol){for(const [dt,k] of [[0,1],[.26,.7]]){this.v('heart',62,t+dt,.22,'sine',vol*k,{glide:38,a:.003});this.noise(t+dt,.08,140,'lowpass',vol*k*.6,'heart',.7)}},
  pulse(m,t,dur,vol){this.v('pulse',this.hz(m),t,dur,'sawtooth',vol,{lp:180,env:900,envT:.03,q:5,a:.003});this.v('pulse',this.hz(m-12),t,dur,'square',vol*.5,{lp:220,a:.003})},
  boom(t,vol,bus='boom'){this.v(bus,72,t,2.2,'sine',vol*.9,{glide:26,a:.004});this.noise(t,1.2,180,'lowpass',vol*.7,bus,.8);this.noise(t,.4,900,'lowpass',vol*.25,bus)},
  scrape(t,vol,bus='scrape'){this.v(bus,this.hz(86),t,1.6,'sawtooth',vol*.18,{bp:2600,q:14,vib:23,vd:.02,a:.05});this.v(bus,this.hz(87),t,1.6,'sawtooth',vol*.14,{bp:3100,q:14,vib:19,vd:.025,a:.05})},
  riser(t,dur,vol,bus='riser'){this.noise(t,dur,300,'bandpass',vol,bus,2,7000,dur*.9);this.v(bus,110,t,dur,'sine',vol*.25,{glide:880,a:dur*.8})},
  makeDrone(){const c=this.ctx;for(const [f,type,det,vol] of [[32.7,'sawtooth',-9,.14],[32.7,'sawtooth',8,.14],[65.4,'sine',0,.22],[46.25,'sawtooth',3,.05],[98,'triangle',0,.035]]){const o=c.createOscillator();o.type=type;o.frequency.value=f;o.detune.value=det;const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=190;lp.Q.value=2;const g=c.createGain();g.gain.value=vol;o.connect(lp);lp.connect(g);g.connect(this.bus.drone);o.start();
      const l=c.createOscillator();l.frequency.value=.05+Math.random()*.07;const lg=c.createGain();lg.gain.value=110;l.connect(lg);lg.connect(lp.frequency);l.start()}},
  makeWind(){const c=this.ctx,s=c.createBufferSource();const b=c.createBuffer(1,c.sampleRate*4,c.sampleRate),d=b.getChannelData(0);let l=0;for(let i=0;i<d.length;i++){l=(l+.02*(Math.random()*2-1))/1.02;d[i]=l*3}s.buffer=b;s.loop=true;
    const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=480;bp.Q.value=1.1;s.connect(bp);bp.connect(this.bus.wind);const lf=c.createOscillator();lf.frequency.value=.09;const lg=c.createGain();lg.gain.value=330;lf.connect(lg);lg.connect(bp.frequency);lf.start();s.start()},
  sched(){if(!this.ctx||this.mode==='off')return;const c=this.ctx,spb=60/(this.BPM[this.mode]||70)/4;
    while(this.next<c.currentTime+.15){try{this.play(this.step,this.next,spb)}catch(e){}this.step++;this.next+=spb}},
  /* ---------- the arrangement ---------- */
  play(step,t,s){const m=this.mode,st=step%16,bar=Math.floor(step/16),ci=bar%8,ch=this.CH[ci],root=this.ROOT[ci];
    const theme=(lo,hi,vol,shift=0)=>{for(const [b,s0,n,len] of this.THEME)if(b===ci&&s0===st&&ci>=lo&&ci<=hi)this.bell(this.hz(n+shift),t,Math.max(1.6,s*len*1.6),vol)};
    if(m==='title'){if(st%4===0)this.tick(t,(st/4)%2,.5);
      if(st===0){this.pno(this.hz(root-12),t,s*30,.32);this.pno(this.hz(root),t,s*24,.18);if(ci%2===0)this.cluster(ch.map(x=>x+12),t,s*32,.06,{a:2.5,lp:1100,bow:3800})}
      if(bar%16<8)theme(0,7,.075);else if(st===8&&ci%2===1)this.pno(this.hz(ch[2]+12),t,s*12,.12);
      if(st===0&&ci===4)this.choir(ch[0]+12,t,s*64,.14);
      if(st===0&&bar%8===0)this.boom(t,.55)}
    else if(m==='calm'){if(st%4===0)this.tick(t,(st/4)%2,.38);
      if(st===0&&ci%2===0){this.pno(this.hz(root-12),t,s*28,.26);this.cluster(ch,t,s*32,.04,{a:3,lp:900})}
      if(st===8&&ci%2===0)this.pno(this.hz(ch[1]+24),t,s*10,.08);
      if(st===4&&ci%2===1)this.pno(this.hz(ch[2]+24),t,s*10,.07);
      if(bar%16<8)theme(4,7,.06);
      if(st===0&&ci===6)this.pno(this.hz(56),t,s*14,.09)}
    else if(m==='porch'){if(st===0&&bar%2===0)this.pno(this.hz(36),t,s*28,.22);if(bar%8===4)theme(0,1,.04,-12)}
    else if(m==='dark'){if(st===0||st===8)this.heart(t,st?.5:.7);
      if(st===0&&bar%2===0){this.cluster([48,49,54],t,s*32,.07,{a:3,lp:800,trem:7,bow:2600});this.pno(this.hz(24),t,s*32,.35);this.pno(this.hz(30),t,s*28,.18)}
      if(st===0&&bar%4===1)this.choir(bar%8===1?60:61,t,s*48,.12);
      if(st===10&&bar%4===3)this.scrape(t,.6);
      if(st===0&&bar%8===6)this.boom(t,.45);
      if(st===6&&bar%3===2)this.pno(this.hz(bar%2?78:79),t,s*8,.05)}
    else if(m==='stalk'){if(st===0||st===8)this.heart(t,.8);if(st%4===0)this.tick(t,(st/4)%2,.42);
      if(st%2===0)this.pulse(bar%4===3&&st>=8?25:24,t,s*1.4,.22);
      if(st===0&&bar%2===0)this.cluster([60,61,66],t,s*32,.09,{a:1.5,lp:1600,trem:11,bow:4200});
      if(st===0&&bar%4===2)this.riser(t,s*32,.28);if(st===0&&bar%4===0)this.boom(t,.7);
      if(st===12&&bar%2===1)this.scrape(t,.55)}
    else if(m==='confront'){if(st%4===0)this.heart(t,.9);
      this.pulse(st===14||st===15?25:24,t,s*.9,.24);
      if(st===0){this.boom(t,.9);this.cluster([48,49,54,55],t,s*16,.1,{a:.08,lp:2400,trem:14})}
      if(st===8&&bar%2===0)this.scrape(t,.6);if(st===0&&bar%2===1)this.riser(t,s*16,.35)}
    else if(m==='end'){if(st===0){this.pno(this.hz(root-12),t,s*30,.3);ch.forEach((n,i)=>this.pno(this.hz(n+12),t+i*.06,s*24,.11))}
      if(st===0&&ci%4===0)this.choir(ch[0]+12,t,s*60,.13);if(st===8&&ci%2===1)this.pno(this.hz(ch[2]+24),t,s*12,.07)}
    else if(m==='win'){const W=[[48,52,55],[44,48,51],[46,50,53],[48,52,55,60]];const w=W[bar%4];
      if(st===0){this.pno(this.hz(w[0]-12),t,s*30,.32);w.forEach((n,i)=>this.pno(this.hz(n+12),t+i*.05,s*26,.12));this.cluster(w.map(x=>x+12),t,s*32,.05,{a:2,lp:1500})}
      if(st===0&&bar%4===0){this.choir(60,t,s*60,.12);this.boom(t,.35)}
      if(bar%8>=4)for(const [b,s0,n,len] of [[0,0,79,4],[0,4,84,4],[0,8,83,4],[0,12,79,4],[1,0,88,8],[1,8,86,8],[2,0,84,4],[2,4,83,4],[2,8,79,8],[3,0,84,16]])if(b===bar%4&&s0===st)this.bell(this.hz(n),t,2.4,.06)}}};
function bgmMode(){if(!G||$('#play').hidden)return 'title';if(G.over)return G.over==='win'?'win':'end';if(typeof P3!=='undefined'&&P3.confront)return 'confront';if(G.stalk)return 'stalk';if(G.room==='porch')return 'porch';if(G.flags.power_out)return 'dark';return 'calm'}
document.addEventListener('pointerdown',()=>{SND.init();if(SND.ctx&&SND.ctx.state==='suspended')SND.ctx.resume();BGM.init();BGM.set(bgmMode())},true);
