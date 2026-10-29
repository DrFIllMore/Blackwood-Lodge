/* ---------- sound effects: every action has a sound, made live in the house's own room ---------- */
Object.assign(SND,{
  out(wet){const c=this.ctx;if(!this._rv){this._rv=c.createConvolver();const n=Math.floor(c.sampleRate*1.4),b=c.createBuffer(2,n,c.sampleRate);for(let k=0;k<2;k++){const d=b.getChannelData(k);let lp=0;for(let i=0;i<n;i++){const t=i/n,q=.85-.7*t;lp=lp*q+(Math.random()*2-1)*(1-q);d[i]=lp*Math.pow(1-t,3)}}this._rv.buffer=b;const w=this.ctx.createGain();w.gain.value=.6;this._rv.connect(w);w.connect(this.g)}
    const g=c.createGain();g.gain.value=this._k||1;g.connect(this.g);if(wet){const s=c.createGain();s.gain.value=wet;g.connect(s);s.connect(this._rv)}return g},
  _nb(){if(this.__nb)return this.__nb;const c=this.ctx,b=c.createBuffer(1,c.sampleRate*2,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return this.__nb=b},
  /* building blocks */
  os(f,t0,dur,vol,o={}){if(!this.ctx)return;const c=this.ctx,t=c.currentTime+t0,s=c.createOscillator(),g=c.createGain();s.type=o.type||'sine';s.frequency.setValueAtTime(f,t);if(o.to)s.frequency.exponentialRampToValueAtTime(o.to,t+(o.toT||dur));if(o.det)s.detune.value=o.det;
    const a=o.a||.003;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+dur);let n=s;
    if(o.f){const fl=c.createBiquadFilter();fl.type=o.ft||'lowpass';fl.frequency.value=o.f;fl.Q.value=o.q||1;s.connect(fl);n=fl}
    if(o.vib){const l=c.createOscillator();l.frequency.value=o.vib;const lg=c.createGain();lg.gain.value=f*(o.vd||.01);l.connect(lg);lg.connect(s.frequency);l.start(t);l.stop(t+dur+.05)}
    n.connect(g);g.connect(this.out(o.wet||0));s.start(t);s.stop(t+dur+.05)},
  nz(t0,dur,f,vol,o={}){if(!this.ctx)return;const c=this.ctx,t=c.currentTime+t0,s=c.createBufferSource();s.buffer=this._nb();s.loop=dur>1.9;const fl=c.createBiquadFilter();fl.type=o.type||'bandpass';fl.frequency.setValueAtTime(f,t);if(o.to)fl.frequency.exponentialRampToValueAtTime(o.to,t+dur);fl.Q.value=o.q||.8;
    const g=c.createGain();if(o.a){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+o.a);g.gain.exponentialRampToValueAtTime(.0001,t+dur)}else{g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur)}
    s.connect(fl);fl.connect(g);g.connect(this.out(o.wet||0));s.start(t,Math.random());s.stop(t+dur+.02)},
  /* a stick-slip creak: a train of tiny impulses through wood resonances, its rate wandering */
  /* a stick-slip creak: a train of tiny impulses with a wandering rate, rendered once into one buffer and played through one wood resonance */
  creakAt(t0,dur,vol,base=110){if(!this.ctx)return;const c=this.ctx,sr=c.sampleRate,n=Math.max(1,Math.floor(sr*dur)),b=c.createBuffer(1,n,sr),d=b.getChannelData(0),bl=Math.floor(sr*.012);
    let t=0,i=0;while(t<dur&&i<400){const r=base*(1+.35*Math.sin(t*5.3+i*.1)+.2*Math.sin(t*13)),a=.6+.4*Math.sin(t*2.1),s0=Math.floor(t*sr);for(let k=0;k<bl&&s0+k<n;k++)d[s0+k]+=(Math.random()*2-1)*a*Math.pow(1-k/bl,2);t+=1/Math.max(30,r);i++}
    const src=c.createBufferSource();src.buffer=b;const f=c.createBiquadFilter();f.type='bandpass';f.Q.value=7;const T=c.currentTime+t0;const curve=new Float32Array(32);for(let k=0;k<32;k++)curve[k]=780+200*Math.sin(k/31*dur*3);f.frequency.setValueCurveAtTime(curve,T,Math.max(.05,dur));
    const g=c.createGain();g.gain.value=vol*2.4;src.connect(f);f.connect(g);g.connect(this.out(.25));src.start(T);src.stop(T+dur+.05)},
  /* ---------- the effects ---------- */
  click(){this.nz(0,.025,2600,.05,{q:4});this.os(1700,0,.03,.02)},
  choose(){this.nz(0,.05,900,.22,{q:2,wet:.1});this.os(140,0,.09,.18,{to:90});this.nz(.01,.08,3200,.04,{q:1.5})},
  step(){for(let i=0;i<4;i++){const t=i*.42+Math.random()*.04,v=.7-i*.08;this.os(95-i*3,t,.12,v*.5,{to:55});this.nz(t,.07,420,v*.55,{type:'lowpass',wet:.25});this.nz(t+.01,.04,1900,v*.12,{q:3});if(i===1)this.creakAt(t+.05,.18,.05,140)}},
  door(){this.creakAt(0,.9,.12,95);this.nz(.95,.06,700,.45,{type:'lowpass',wet:.35});this.os(80,.95,.25,.4,{to:45,wet:.3});this.nz(.96,.02,3500,.12,{q:6})},
  open(){this.nz(0,.18,1400,.18,{q:.9,to:600,wet:.15});this.os(320,0,.05,.05)},
  creak(){this.creakAt(0,1.1,.11,85)},
  search(){for(let i=0;i<6;i++){const t=i*.11+Math.random()*.05;this.nz(t,.09+Math.random()*.06,1800+Math.random()*2000,.12+Math.random()*.08,{q:1.2,wet:.15})}this.nz(.35,.35,500,.18,{q:1.5,to:300,wet:.2});this.os(70,.7,.12,.25,{to:50,wet:.2})},
  drawer(){this.nz(0,.4,380,.22,{q:2.5,to:260,a:.06,wet:.2});this.os(90,.42,.14,.35,{to:55,wet:.25});this.nz(.42,.03,2600,.15,{q:5})},
  page(){this.nz(0,.22,2400,.16,{q:.9,to:5200,a:.03,wet:.1});this.nz(.16,.12,1500,.08,{q:1})},
  bag(){this.nz(0,.25,900,.18,{q:1,a:.02,wet:.1});[0,.07].forEach(d=>{this.os(2950,.18+d,.12,.05,{wet:.2});this.os(4120,.18+d,.08,.03,{wet:.2})});this.nz(.18,.02,5200,.12,{q:6})},
  pin(){this.nz(0,.15,1800,.14,{q:1,wet:.1});this.os(1250,.12,.05,.08);this.nz(.12,.012,4000,.2,{q:4})},
  /* a clue: a dark bell over a low piano note, the sound of something mattering */
  ev(){this.os(196,0,1.8,.16,{wet:.6});[[392,.2],[587.3,.12],[783.99,.08],[1083,.05]].forEach(([f,v],i)=>{this.os(f,.04+i*.03,2.2,v,{wet:.7});this.os(f*2.76,.04+i*.03,.6,v*.3,{wet:.7})});this.nz(0,.4,3000,.06,{q:.7,to:6000,wet:.4})},
  fly(){this.nz(0,.45,500,.25,{q:2,to:4500,a:.2,wet:.2});this.os(1400,.44,.05,.08)},
  dice(){let t=0;for(let i=0;i<9;i++){const g=.035+i*i*.006;t+=g;const v=.5-i*.04;this.nz(t,.03,2600+Math.random()*1800,v,{q:6,wet:.2});this.os(900+Math.random()*700,t,.025,v*.12)}},
  shake(){for(let i=0;i<7;i++)this.nz(i*.07+Math.random()*.02,.03,3200+Math.random()*1500,.25,{q:5})},
  rattle(two){const n=two?4:3;for(let i=0;i<n;i++){const t=i*.018+Math.random()*.012;this.nz(t,.022,2800+Math.random()*2200,.22-i*.03,{q:7,wet:.08});this.os(700+Math.random()*500,t,.02,.03)}this.nz(0,.06,900,.05,{type:'lowpass'})},
  clue(c){/* a found clue: a soft low thud, then a bright two-note glint that hangs in the room */this.os(98,0,.5,.32,{to:70,wet:.3});this.nz(0,.04,1600,.12,{type:'lowpass'});const nt=c?[[466.2,.0],[440,.16]]:[[523.25,.0],[783.99,.13]];nt.forEach(([f,d])=>{this.os(f,.06+d,1.6,.16,{wet:.7,type:'triangle'});this.os(f*2,.06+d,.9,.05,{wet:.8})});this.nz(.06,.5,6000,.03,{type:'highpass',wet:.6})},
  land(){this.os(120,0,.18,.45,{to:70,wet:.2});this.nz(0,.05,1200,.3,{type:'lowpass'});this.nz(.02,.02,3800,.2,{q:6})},
  ok(){this.os(523.25,0,1.2,.08,{wet:.6});this.os(783.99,.05,1.2,.06,{wet:.6})},
  no(){this.os(110,0,1.1,.2,{type:'sawtooth',f:500,wet:.4});this.os(116.5,0,1.1,.16,{type:'sawtooth',f:500,wet:.4})},
  /* questioning */
  talk(){this.creakAt(0,.35,.09,120);this.os(65,.1,1.4,.3,{to:52,wet:.5});this.nz(.1,1.2,300,.08,{q:1,a:.3,wet:.5})},
  heart(){[0,.27].forEach((d,i)=>{this.os(60,d,.2,i?.4:.55,{to:38});this.nz(d,.07,150,i?.3:.45,{type:'lowpass'})})},
  crack(){this.os(1350,0,1.2,.05,{type:'sawtooth',f:2600,ft:'bandpass',q:12,vib:21,vd:.02,wet:.5});this.os(1430,0,1.2,.04,{type:'sawtooth',f:3100,ft:'bandpass',q:12,vib:17,vd:.02,wet:.5});this.heart()},
  lie(){[[130.8,.22],[138.6,.2],[185,.16],[196,.12],[277.2,.08]].forEach(([f,v],i)=>{this.os(f,i*.012,1.8,v,{type:'triangle',f:1800,wet:.5});this.os(f*2,i*.012,.8,v*.25,{wet:.5})})},
  breakdown(){this.os(55,0,2.6,.5,{to:30,wet:.5});this.nz(0,1.6,200,.45,{type:'lowpass',wet:.5});[261.6,311.1,392,466.2].forEach((f,i)=>this.os(f,.05+i*.05,3,.06,{type:'sawtooth',f:1200,wet:.7}))},
  slip(){this.nz(0,1.4,300,.25,{q:2,to:7000,a:1.3,wet:.4});this.os(55,1.4,2.8,.6,{to:28,wet:.6});this.nz(1.4,1.6,180,.55,{type:'lowpass',wet:.6});[[130.8,.24],[138.6,.22],[185,.2],[277.2,.12],[293.7,.1]].forEach(([f,v])=>this.os(f,1.4,2.6,v,{type:'sawtooth',f:1500,wet:.6}))},
  /* the house */
  chime(h){const n=((h-1)%12+12)%12+1;for(let i=0;i<n;i++){const t=.2+i*1.25;[[130.8,.32,4],[261.6,.12,2.6],[361.0,.08,1.8],[523.3,.05,1.2],[698,.03,.8]].forEach(([f,v,d])=>this.os(f,t,d,v,{wet:.7}))}},
  powerCut(){this.os(100,0,1.2,.12,{type:'sawtooth',f:900,vib:9,vd:.03});this.os(50,0,1.6,.15,{type:'square',to:22,toT:1.5,f:400});this.nz(.05,.08,2400,.4,{q:2});this.nz(1.15,.08,600,.5,{type:'lowpass',wet:.5});this.os(70,1.15,.4,.4,{to:40,wet:.4})},
  torch(){this.nz(0,.012,3600,.3,{q:5});this.nz(.06,.01,2400,.2,{q:5})},
  lock(){for(let i=0;i<5;i++){const t=i*.16+Math.random()*.05;this.os(3400+Math.random()*900,t,.03,.08);this.nz(t,.012,6000,.12,{q:6})}this.nz(.9,.03,1800,.35,{q:3,wet:.2});this.os(1100,.9,.08,.12,{wet:.2})},
  pry(){this.creakAt(0,.6,.14,60);this.nz(.6,.18,900,.6,{q:.8,wet:.3});this.os(160,.6,.25,.35,{to:70,wet:.3});for(let i=0;i<4;i++)this.nz(.62+i*.04,.03,2500+i*500,.2,{q:4})},
  thunder(){this.nz(0,3.2,140,.6,{type:'lowpass',a:.25,wet:.5});this.nz(.15,1.2,420,.3,{type:'lowpass',a:.08,wet:.5});this.nz(.6,2.2,90,.5,{type:'lowpass',a:.4,wet:.6})},
  night(){this.creakAt(0,1.4,.09,75);this.os(46,0,3,.3,{wet:.6});this.os(1480,.8,2.2,.025,{type:'sawtooth',f:2900,ft:'bandpass',q:14,vib:7,vd:.01,wet:.8})},
  attack(){this.nz(0,.3,600,.4,{q:1.5,to:3200,a:.25});this.os(80,.3,.4,.8,{to:40,wet:.3});this.nz(.3,.25,700,.8,{type:'lowpass',wet:.3});this.nz(.31,.05,3000,.4,{q:2});for(let i=0;i<5;i++)this.nz(.6+i*.13,.08,900+Math.random()*900,.3,{q:1.2,wet:.2});this.os(40,.3,2,.5,{wet:.6})},
  bad(){this.attack()},
  accuse(){this.os(98,0,.35,.7,{to:60,wet:.5});this.nz(0,.06,900,.5,{type:'lowpass'});this.os(98,.55,.35,.6,{to:60,wet:.5});this.nz(.55,.06,900,.45,{type:'lowpass'});[[65.4,.35],[98,.2],[155.6,.12]].forEach(([f,v])=>this.os(f,1.1,3.4,v,{type:'triangle',f:900,wet:.7}))},
  win(){[[261.6,0],[329.6,.08],[392,.16],[523.3,.24],[659.3,.32]].forEach(([f,d])=>{this.os(f,d,3,.09,{type:'triangle',wet:.7});this.os(f*2.76,d,.9,.02,{wet:.7})});this.os(65.4,0,3.5,.3,{wet:.5})},
  lose(){[[130.8,0],[123.5,.4],[110,.8],[103.8,1.2]].forEach(([f,d])=>this.os(f,d,2.2,.15,{type:'triangle',f:800,wet:.6}));this.os(41,1.2,3,.45,{wet:.6})},
  swell(){this.nz(0,1.8,400,.35,{q:1,to:5000,a:1.7,wet:.5});this.os(48,1.75,3,.6,{to:30,wet:.6});this.nz(1.75,1.5,160,.5,{type:'lowpass',wet:.6})}
});

/* levels: every effect sits at a deliberate loudness */
(()=>{const K={"rattle": 4.0, "clue": 1.6, "click": 7.0, "choose": 2.0, "step": 1.54, "door": 1.37, "search": 2.5, "drawer": 1.43, "ev": 1.33, "fly": 3.5, "bag": 4.0, "page": 3.75, "pin": 3.75, "shake": 4.67, "dice": 5.0, "land": 1.22, "talk": 1.69, "heart": 1.17, "crack": 1.08, "lie": 1.27, "breakdown": 1.33, "slip": 0.93, "chime": 1.0, "powerCut": 1.78, "torch": 6.0, "lock": 2.57, "pry": 1.3, "thunder": 6.8, "night": 1.57, "attack": 0.81, "accuse": 0.97, "win": 1.78, "lose": 1.11, "swell": 1.14, "open": 3.0, "creak": 9.5, "ok": 1.2, "no": 0.9};for(const n in K){const f=SND[n];if(typeof f!=='function')continue;SND[n]=function(...a){const p=this._k;this._k=(p||1)*K[n];try{return f.apply(this,a)}finally{this._k=p}}}})();
