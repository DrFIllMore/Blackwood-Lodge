// ROOM {"title":"Blackwood Upstairs Proof","aria":"The upstairs hall, rendered in 3D","loading":"Lighting the landing…","where":"Upstairs hall · power on","text":"The upstairs hall. Four bedroom doors, the runner down the middle, the banister over the stairwell. The attic hatch at the far end.","buttons":[["wide","The hall"],["runner","The runner"],["hatch","Attic hatch"],["door2","Room 2"],["banister","Banister"],["portrait","Portrait"],["window","Window"],["dark","Power out"]]}
ROOM(47,H=>{const {T,TAU,rnd,ctex,noise,scene,ANIM,M,add,RB,BOX,lathe,grp,plane,tube,lin}=H;
/* ---------- textures ---------- */
const TX={
 floor:ctex(1024,1024,(x,w,h)=>{const n=8,pw=w/n;for(let i=0;i<n;i++){let y=-rnd()*400;while(y<h){const L=280+rnd()*400,t=rnd();x.fillStyle=`rgb(${78+t*26|0},${50+t*16|0},${30+t*10|0})`;x.fillRect(i*pw,y,pw,L);
     for(let g=0;g<14;g++){x.strokeStyle=`rgba(28,14,6,${.08+rnd()*.14})`;x.lineWidth=.8+rnd()*1.6;const gx=i*pw+rnd()*pw;x.beginPath();x.moveTo(gx,y);x.bezierCurveTo(gx+rnd()*6-3,y+L*.3,gx+rnd()*8-4,y+L*.7,gx+rnd()*4-2,y+L);x.stroke()}
     x.fillStyle='rgba(10,5,2,.7)';x.fillRect(i*pw,y,pw,2.5);y+=L}x.fillStyle='rgba(10,5,2,.75)';x.fillRect(i*pw,0,3,h)}noise(x,w,h,.05,9000)},[1,1]),
 // dusty blue damask above the panelling
 paper:ctex(512,512,(x,w,h)=>{x.fillStyle='#3a4a5c';x.fillRect(0,0,w,h);const mot=(cx,cy)=>{x.save();x.translate(cx,cy);x.fillStyle='rgba(200,190,160,.13)';x.strokeStyle='rgba(200,190,160,.22)';x.lineWidth=2;
     x.beginPath();x.moveTo(0,-90);x.bezierCurveTo(46,-60,50,-10,0,30);x.bezierCurveTo(-50,-10,-46,-60,0,-90);x.fill();x.stroke();x.beginPath();x.moveTo(0,30);x.bezierCurveTo(60,40,60,100,0,110);x.bezierCurveTo(-60,100,-60,40,0,30);x.stroke();
     for(const s of [-1,1]){x.beginPath();x.moveTo(0,-20);x.bezierCurveTo(s*50,-50,s*90,-10,s*70,40);x.stroke();x.beginPath();x.arc(s*70,40,6,0,TAU);x.fill()}x.restore()};
   for(const [cx,cy] of [[128,128],[384,384],[384,-128],[128,640],[-128,384],[640,128]])mot(cx,cy);x.fillStyle='rgba(210,180,110,.25)';for(const xx of [0,w/2])x.fillRect(xx,0,3,h);noise(x,w,h,.05,6000)},[1,1]),
 oak:ctex(512,512,(x,w,h)=>{x.fillStyle='#4e2e18';x.fillRect(0,0,w,h);for(let i=0;i<130;i++){const xx=rnd()*w;x.strokeStyle=`rgba(${rnd()<.5?20:110},${rnd()<.5?10:66},${rnd()<.5?4:30},${.1+rnd()*.18})`;x.lineWidth=.6+rnd()*2.4;x.beginPath();x.moveTo(xx,0);for(let k=1;k<=8;k++)x.lineTo(xx+Math.sin(k*1.3+xx)*3*rnd(),k*h/8);x.stroke()}noise(x,w,h,.05)}),
 plaster:ctex(256,256,(x,w,h)=>{x.fillStyle='#d8cfbf';x.fillRect(0,0,w,h);noise(x,w,h,.05,4000)},[3,3]),
 runner:ctex(256,1024,(x,w,h)=>{x.fillStyle='#4a1416';x.fillRect(0,0,w,h);x.fillStyle='#1e2a3a';x.fillRect(0,0,26,h);x.fillRect(w-26,0,26,h);x.fillStyle='#b8904a';x.fillRect(28,0,4,h);x.fillRect(w-32,0,4,h);
   for(let y=0;y<h;y+=96){x.save();x.translate(w/2,y+48);x.fillStyle='#6a2a20';x.beginPath();for(let k=0;k<12;k++){const a=k/12*TAU,r=k%2?18:40;x.lineTo(Math.cos(a)*r*1.4,Math.sin(a)*r)}x.fill();x.fillStyle='#b8904a';x.beginPath();x.arc(0,0,9,0,TAU);x.fill();x.restore();
     x.strokeStyle='rgba(184,144,74,.45)';x.lineWidth=2;x.beginPath();x.moveTo(40,y+96);x.lineTo(w/2,y+70);x.lineTo(w-40,y+96);x.stroke()}
   for(let i=0;i<6000;i++){x.fillStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:200},${rnd()<.5?0:160},${rnd()*.06})`;x.fillRect(rnd()*w,rnd()*h,1,2)}},[1,1]),
 // Edmund, in oils: dark ground, half figure, grey hair, moustache, stiff collar
 portrait:ctex(320,400,(x,w,h)=>{const bg=x.createRadialGradient(w*.42,h*.3,20,w/2,h/2,w*.95);bg.addColorStop(0,'#4a5238');bg.addColorStop(.6,'#262a1c');bg.addColorStop(1,'#0e100a');x.fillStyle=bg;x.fillRect(0,0,w,h);
   x.filter='blur(2px)';
   // coat and shoulders, a little light catching the left lapel
   x.fillStyle='#16130f';x.beginPath();x.moveTo(20,h);x.bezierCurveTo(30,280,86,236,160,232);x.bezierCurveTo(236,236,290,280,300,h);x.fill();x.fillStyle='rgba(90,80,70,.35)';x.beginPath();x.moveTo(110,250);x.quadraticCurveTo(130,300,150,h);x.lineTo(120,h);x.quadraticCurveTo(100,300,92,262);x.fill();
   x.fillStyle='#d8d0c0';x.beginPath();x.moveTo(134,236);x.lineTo(160,282);x.lineTo(186,236);x.lineTo(174,228);x.lineTo(160,244);x.lineTo(146,228);x.fill();x.fillStyle='#4a1c20';x.beginPath();x.moveTo(153,252);x.lineTo(167,252);x.lineTo(163,304);x.lineTo(157,304);x.fill();
   // neck and head, modelled light from the upper left
   x.fillStyle='#8a5e46';x.fillRect(144,196,32,40);const f=x.createRadialGradient(146,136,6,160,150,74);f.addColorStop(0,'#e6b896');f.addColorStop(.45,'#c08a6a');f.addColorStop(.85,'#7a5038');f.addColorStop(1,'#3a2418');x.fillStyle=f;x.beginPath();x.ellipse(160,150,44,58,0,0,TAU);x.fill();
   x.fillStyle='rgba(60,30,20,.35)';for(const ex of [143,177]){x.beginPath();x.ellipse(ex,145,11,7,0,0,TAU);x.fill()}x.fillStyle='rgba(30,16,10,.8)';for(const ex of [143,177]){x.beginPath();x.ellipse(ex,146,4,2.5,0,0,TAU);x.fill()}
   x.fillStyle='rgba(70,40,28,.45)';x.beginPath();x.moveTo(160,148);x.quadraticCurveTo(152,168,156,172);x.quadraticCurveTo(162,175,168,171);x.fill();x.fillStyle='rgba(255,220,190,.25)';x.beginPath();x.ellipse(150,128,14,10,-.3,0,TAU);x.fill();
   // grey hair swept back, grey moustache
   x.fillStyle='#8a8882';x.beginPath();x.ellipse(160,104,47,24,0,Math.PI,TAU);x.fill();x.beginPath();x.ellipse(118,122,9,26,.2,0,TAU);x.fill();x.beginPath();x.ellipse(202,122,9,26,-.2,0,TAU);x.fill();
   x.fillStyle='#6e6c66';x.beginPath();x.moveTo(140,182);x.quadraticCurveTo(160,172,180,182);x.quadraticCurveTo(160,190,140,182);x.fill();x.fillStyle='rgba(90,40,34,.6)';x.fillRect(150,190,20,3);
   x.filter='none';
   // brushwork and craquelure
   for(let i=0;i<5000;i++){x.fillStyle=`rgba(${rnd()*255|0},${rnd()*210|0},${rnd()*160|0},.035)`;x.fillRect(rnd()*w,rnd()*h,2+rnd()*5,1+rnd()*3)}x.strokeStyle='rgba(0,0,0,.12)';x.lineWidth=.6;for(let i=0;i<120;i++){x.beginPath();let px=rnd()*w,py=rnd()*h;x.moveTo(px,py);for(let k=0;k<4;k++){px+=rnd()*16-8;py+=rnd()*16-8;x.lineTo(px,py)}x.stroke()}
   const v=x.createRadialGradient(w/2,h/2,w*.3,w/2,h/2,w*.8);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(20,14,4,.45)');x.fillStyle=v;x.fillRect(0,0,w,h)}),
 night:ctex(256,320,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#08122a');g.addColorStop(.65,'#1c2c58');g.addColorStop(1,'#3a4c80');x.fillStyle=g;x.fillRect(0,0,w,h);
   x.fillStyle='#040810';for(let i=0;i<7;i++){const tx=i/6*w+(rnd()-.5)*20,th=h*(.3+rnd()*.2),tw=w*.14;for(let k=0;k<5;k++){const yy=h*.95-k*th*.17;x.beginPath();x.moveTo(tx-tw*(1-k*.17),yy);x.lineTo(tx,yy-th*.36);x.lineTo(tx+tw*(1-k*.17),yy);x.fill()}}
   x.fillStyle='rgba(235,240,255,.85)';for(let i=0;i<50;i++){x.beginPath();x.arc(rnd()*w,rnd()*h*.85,.8+rnd()*1.4,0,TAU);x.fill()}const f=x.createLinearGradient(0,h,0,h*.8);f.addColorStop(0,'rgba(230,238,255,.9)');f.addColorStop(1,'rgba(230,238,255,0)');x.fillStyle=f;x.fillRect(0,h*.8,w,h*.2)}),
 plate:n=>ctex(64,40,(x,w,h)=>{x.fillStyle='#b89040';x.fillRect(0,0,w,h);x.strokeStyle='#6a4a1a';x.lineWidth=3;x.strokeRect(3,3,w-6,h-6);x.fillStyle='#2a1a08';x.font='bold 24px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillText(n,w/2,h/2+1)}),
 // a wet boot sole: heel and ball, soaked edges
 wetSole:ctex(128,256,(x,w,h)=>{x.clearRect(0,0,w,h);const g=(cx,cy,rx,ry)=>{const r=x.createRadialGradient(cx,cy,2,cx,cy,Math.max(rx,ry));r.addColorStop(0,'rgba(255,255,255,.95)');r.addColorStop(.7,'rgba(255,255,255,.7)');r.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=r;x.save();x.translate(cx,cy);x.scale(rx/Math.max(rx,ry),ry/Math.max(rx,ry));x.translate(-cx,-cy);x.beginPath();x.arc(cx,cy,Math.max(rx,ry),0,TAU);x.fill();x.restore()};
   g(64,80,44,72);g(64,196,34,40)}),
};
const MAT={floor:M('#ffffff',{map:TX.floor,roughness:.38}),paper:M('#ffffff',{map:TX.paper,roughness:.9}),oak:M('#c8a888',{map:TX.oak,roughness:.42}),oakH:M('#c8a888',{map:(()=>{const t=TX.oak.clone();t.center.set(.5,.5);t.rotation=Math.PI/2;t.needsUpdate=true;return t})(),roughness:.42}),
  ceil:M('#ffffff',{map:TX.plaster,roughness:1}),brass:M('#c9a24a',{metalness:.85,roughness:.3}),runner:M('#ffffff',{map:TX.runner,roughness:.95}),gilt:M('#b8913c',{metalness:.7,roughness:.36}),
  cream:M('#d8cdb8',{roughness:.55}),glowBowl:M('#f2e2c4',{emissive:'#ffc078',emissiveIntensity:1.0,roughness:.5,side:T.DoubleSide})};
/* ---------- plan: corridor x -1.1..1.1, z 0..8; a landing widening to x 1.9 over the stairwell (x .5..1.9, z .3..3.4) ---------- */
const XL=-1.1,XR=1.1,XW=1.9,L=8,H2=2.7,SX0=.5,SZ0=.3,SZ1=3.4,JZ=3.6;
const floorRect=(x0,x1,z0,z1)=>{const g=new T.PlaneGeometry(x1-x0,z1-z0);g.rotateX(-Math.PI/2);const p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+(x0+x1)/2)/2.4,(p.getZ(i)+(z0+z1)/2)/2.4);
  const m=new T.Mesh(g,MAT.floor);m.position.set((x0+x1)/2,0,(z0+z1)/2);m.receiveShadow=true;scene.add(m);return m};
TX.floor.wrapS=TX.floor.wrapT=T.RepeatWrapping;
floorRect(XL,SX0,0,L);floorRect(SX0,XR,SZ1,L);floorRect(XR,XW,SZ1,JZ);floorRect(SX0,XW,0,SZ0);
// ceiling over everything
{const g=new T.PlaneGeometry(XW-XL,L);g.rotateX(Math.PI/2);const m=new T.Mesh(g,MAT.ceil);m.position.set((XL+XW)/2,H2,L/2);scene.add(m)}
// walls: wallpaper above a panelled dado; segments know their doors so the trim stops at each casing
TX.paper.wrapS=TX.paper.wrapT=T.RepeatWrapping;
const wall=(ax,a0,a1,fixed,facing,doors=[],y0=0)=>{// ax:'z' wall runs along z at x=fixed; 'x' runs along x at z=fixed. facing: +1/-1 normal direction along the other axis
  const len=a1-a0,c=(a0+a1)/2;const g=new T.PlaneGeometry(len,H2-y0);const uv=g.attributes.uv,p=g.attributes.position;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+c)/1.6,(p.getY(i)+(H2+y0)/2)/1.6);
  const m=new T.Mesh(g,MAT.paper);m.receiveShadow=true;if(ax==='z'){m.position.set(fixed,(H2+y0)/2,c);m.rotation.y=facing>0?Math.PI/2:-Math.PI/2}else{m.position.set(c,(H2+y0)/2,fixed);m.rotation.y=facing>0?0:Math.PI}scene.add(m);
  const piece=(u0,u1,y,h,d,mat,off=0)=>{const l=u1-u0;if(l<.02)return;const cu=(u0+u1)/2;if(ax==='z')add(BOX(d,h,l),mat,fixed+facing*(d/2+off),y,cu,{cast:false});else add(BOX(l,h,d),mat,cu,y,fixed+facing*(d/2+off),{cast:false})};
  let segs=[[a0,a1]];for(const dc of doors){const ns=[];for(const [s,e] of segs){if(dc+.62<=s||dc-.62>=e){ns.push([s,e]);continue}if(dc-.62>s)ns.push([s,dc-.62]);if(dc+.62<e)ns.push([dc+.62,e])}segs=ns}
  for(const [s,e] of segs){piece(s,e,.5,1.0,.018,MAT.oak);piece(s,e,1.02,.05,.05,MAT.oak);piece(s,e,.07,.14,.04,MAT.oak);piece(s,e,2.15,.035,.03,MAT.oak);
    const n=Math.max(1,Math.round((e-s)/.55)),pw=(e-s)/n;for(let i=0;i<n;i++){const u=s+pw*(i+.5);if(ax==='z')add(RB(.02,.68,pw-.12,.008),MAT.oak,fixed+facing*.025,.55,u,{cast:false});else add(RB(pw-.12,.68,.02,.008),MAT.oak,u,.55,fixed+facing*.025,{cast:false})}}
  return m};
const DOORS={L:[1.7,5.0,7.15],R:[5.8]};
wall('z',0,L,XL,1,DOORS.L);wall('z',JZ,L,XR,-1,DOORS.R);wall('z',0,JZ,XW,-1,[],-3.0);wall('x',XR,XW,JZ,-1,[]);
wall('x',XL,XW,0,1,[],-3.0);const endWall=wall('x',XL,XR,L,-1,[]);
// cornice all round
for(const [len,x,z,ry] of [[L,XL+.04,L/2,Math.PI/2],[L-JZ,XR-.04,(L+JZ)/2,Math.PI/2],[JZ,XW-.04,JZ/2,Math.PI/2],[XW-XL,(XL+XW)/2,.04,0],[XR-XL,0,L-.04,0],[XW-XR,(XR+XW)/2,JZ-.04,0]])add(RB(len,.12,.08,.02),M('#e8e0d0',{roughness:.7}),x,H2-.06,z,{ry,cast:false});
/* ---------- the stairwell: treads going down toward the front hall, a closed side, the banister ---------- */
for(let k=1;k<=12;k++){const z1=SZ1-(k-1)*.25,y=-k*.18;add(RB(XW-SX0-.04,.04,.27,.008),MAT.oak,(SX0+XW)/2,y,z1-.125,{});add(BOX(XW-SX0-.04,.18,.02),MAT.cream,(SX0+XW)/2,y+.09,z1-.24,{cast:false});
  add(new T.PlaneGeometry(.8,.25),MAT.runner,(SX0+XW)/2,y+.021,z1-.125,{rx:-Math.PI/2,cast:false})}
add(BOX(.04,3,SZ1-SZ0),M('#d8cdb8',{roughness:.8}),SX0+.02,-1.5,(SZ0+SZ1)/2,{cast:false});add(new T.PlaneGeometry(XW-SX0,3),M('#2a2420',{roughness:1}),(SX0+XW)/2,-1.5,SZ0,{cast:false});
add(new T.PlaneGeometry(XW-SX0,SZ1-SZ0),M('#1a1410',{roughness:1}),(SX0+XW)/2,-2.9,(SZ0+SZ1)/2,{rx:-Math.PI/2,cast:false});
// nosings along the opening edges
add(RB(.06,.06,SZ1-SZ0,.015),MAT.oak,SX0+.01,-.03,(SZ0+SZ1)/2);add(RB(XW-SX0,.06,.06,.015),MAT.oak,(SX0+XW)/2,-.03,SZ0-.01);add(RB(XW-SX0,.06,.06,.015),MAT.oak,(SX0+XW)/2,-.03,SZ1+.02);
// banister: turned balusters, moulded rail, newels with ball finials
{const bal=lathe([[0,0],[.024,0],[.024,.05],[.016,.07],[.013,.16],[.024,.3],[.026,.42],[.014,.6],[.012,.74],[.02,.78],[.022,.82],[0,.82]],14);
 for(let z=SZ0+.12;z<SZ1-.08;z+=.13)add(bal,MAT.oak,SX0+.02,0,z);for(let x=SX0+.12;x<XW-.1;x+=.13)add(bal,MAT.oak,x,0,SZ0+.02);
 add(RB(.08,.07,SZ1-SZ0+.1,.02),MAT.oakH,SX0+.02,.86,(SZ0+SZ1)/2);add(RB(XW-SX0,.07,.08,.02),MAT.oakH,(SX0+XW)/2,.86,SZ0+.02);
 for(const [x,z] of [[SX0+.02,SZ0+.02],[SX0+.02,SZ1+.02]]){add(RB(.12,.98,.12,.012),MAT.oak,x,.49,z);add(RB(.15,.05,.15,.012),MAT.oak,x,1.0,z);add(new T.SphereGeometry(.055,20,14),MAT.oak,x,1.08,z)}}
/* ---------- doors: oak, four panels, brass knob and number plate; light under Room 2 ---------- */
const door=(side,z,label)=>{const x=side<0?XL:XR,f=-side;const g=grp(x+f*.03,0,z,f>0?Math.PI/2:-Math.PI/2);// local +z faces the corridor
  add(BOX(.86,2.04,.02),M('#050403'),0,1.02,-.03,{to:g,cast:false});
  const lf=grp(0,.012,0,0,g);for(const e of [-1,1])add(RB(.11,2.02,.045,.006),MAT.oak,e*(.4-.055),1.01,0,{to:lf});for(const [h,y] of [[.22,.12],[.18,.98],[.12,1.95]])add(RB(.58,h,.045,.006),MAT.oakH,0,y,0,{to:lf});add(RB(.09,1.78,.045,.006),MAT.oak,0,1.0,0,{to:lf});
  for(const [y0,y1] of [[.23,.89],[1.07,1.89]])for(const e of [-1,1]){const pw=.2,ph=y1-y0;add(BOX(pw,ph,.02),MAT.oak,e*.145,(y0+y1)/2,-.004,{to:lf,cast:false});const sh=new T.Shape();sh.moveTo(-pw/2+.04,-ph/2+.04);sh.lineTo(pw/2-.04,-ph/2+.04);sh.lineTo(pw/2-.04,ph/2-.04);sh.lineTo(-pw/2+.04,ph/2-.04);
    add(new T.ExtrudeGeometry(sh,{depth:.004,bevelEnabled:true,bevelThickness:.01,bevelSize:.025,bevelSegments:1}),MAT.oak,e*.145,(y0+y1)/2,.0,{to:lf})}
  add(new T.SphereGeometry(.03,20,14),MAT.brass,.31,1.0,.06,{to:lf});add(new T.CylinderGeometry(.034,.034,.012,24),MAT.brass,.31,1.0,.028,{to:lf,rx:Math.PI/2});add(RB(.03,.1,.006,.003),MAT.brass,.31,.92,.026,{to:lf});
  add(new T.PlaneGeometry(.08,.05),M('#ffffff',{map:TX.plate(label),metalness:.6,roughness:.35}),0,1.58,.025,{to:lf,cast:false});
  for(const e of [-1,1])add(RB(.1,2.12,.05,.008),MAT.oak,e*.48,1.06,.0,{to:g});add(RB(1.06,.12,.05,.008),MAT.oak,0,2.12,0,{to:g});for(const e of [-1,1])add(RB(.12,.2,.06,.008),MAT.oak,e*.48,.1,.0,{to:g});
  return g};
door(-1,1.7,'1');door(-1,5.0,'2');door(-1,7.15,'E');door(1,5.8,'3');
// light under Room 2: a hot line at the gap, a fan of warm light on the boards and the runner
const lineM=new T.MeshBasicMaterial({color:lin('#ffc070')});add(BOX(.01,.008,.78),lineM,XL+.012,.004,5.0,{cast:false});
const spillT=ctex(256,128,(x,w,h)=>{x.clearRect(0,0,w,h);const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(255,180,100,.45)');g.addColorStop(1,'rgba(255,160,80,0)');x.fillStyle=g;x.beginPath();x.moveTo(w*.14,0);x.lineTo(w*.86,0);x.lineTo(w,h);x.lineTo(0,h);x.fill()});
const spill=new T.Mesh(new T.PlaneGeometry(.85,.4),new T.MeshBasicMaterial({map:spillT,transparent:true,blending:T.AdditiveBlending,depthWrite:false}));spill.rotation.set(-Math.PI/2,0,Math.PI/2);spill.position.set(XL+.21,.0035,5.0);spill.material.opacity=.6;scene.add(spill);
/* ---------- the runner, and what's on it ---------- */
const RX=-.25,RW=.92,RZ0=.25,RZ1=7.7;
{const g=new T.PlaneGeometry(RW,RZ1-RZ0);const uv=g.attributes.uv;for(let i=0;i<uv.count;i++)uv.setY(i,uv.getY(i)*(RZ1-RZ0)/2.4);TX.runner.wrapT=T.RepeatWrapping;add(g,MAT.runner,RX,.003,(RZ0+RZ1)/2,{rx:-Math.PI/2,cast:false});
 for(const e of [-1,1]){const fr=new T.Mesh(new T.PlaneGeometry(RW,.05),M('#c8b890',{roughness:1}));fr.rotation.x=-Math.PI/2;fr.position.set(RX,.0032,e>0?RZ1+.025:RZ0-.025);scene.add(fr)}}
// wet marks: off the top stair, across the boards, along the runner to the foot of the hatch; wetter where they start
{const wetB=new T.MeshPhysicalMaterial({color:'#0a0806',roughness:.12,clearcoat:.8,transparent:true,alphaMap:TX.wetSole,depthWrite:false});
 const wetR=new T.MeshStandardMaterial({color:'#000000',roughness:.6,transparent:true,alphaMap:TX.wetSole,depthWrite:false});
 const pts=[[1.32,3.47,.0],[.88,3.8,.55],[.5,4.2,.7],[.12,4.66,.5],[-.12,5.18,.25],[-.02,5.66,.1],[-.18,5.98,.06]];let side=1;
 pts.forEach(([x,z,ang],i)=>{const onRunner=x>RX-RW/2&&x<RX+RW/2;const m=new T.Mesh(new T.PlaneGeometry(.12,.28),(onRunner?wetR:wetB).clone());m.material.opacity=onRunner?.78-i*.04:.88-i*.04;
   m.rotation.set(-Math.PI/2,0,Math.PI+ang*.3);m.position.set(x+side*.06,onRunner?.0045:.0015,z);scene.add(m);(H.hook||(()=>{}))('wet',m,{base:m.material.opacity});side=-side});
 for(let i=0;i<5;i++){const d=new T.Mesh(new T.CircleGeometry(.012+rnd()*.015,12),wetR.clone());d.material.alphaMap=null;d.material.opacity=.45;d.rotation.x=-Math.PI/2;d.position.set(-.05+(rnd()-.5)*.2,.0048,6.1+(rnd()-.5)*.15);scene.add(d);(H.hook||(()=>{}))('wet',d,{base:.45})}}
/* ---------- attic hatch in the ceiling, cord hanging ---------- */
{const HZ=6.1;add(RB(.8,.05,1.04,.01),MAT.oak,0,H2-.02,HZ,{cast:false});const hs=new T.Group();scene.add(hs);(H.hook||(()=>{}))('hatchShut',hs,{HZ,H2});add(RB(.64,.03,.88,.01),M('#b8a890',{roughness:.7}),0,H2-.05,HZ,{cast:false,to:hs});for(const e of [-1,1])add(BOX(.006,.004,.8),M('#3a3028'),e*.25,H2-.067,HZ,{cast:false,to:hs});
 add(RB(.12,.02,.04,.004),MAT.brass,0,H2-.075,HZ-.4,{to:hs});tube([[0,H2-.08,HZ-.4],[.004,2.25,HZ-.4],[-.006,1.9,HZ-.39]],.004,M('#d8ccb0',{roughness:.9}),{rs:5,to:hs});
 add(lathe([[0,0],[.016,.0],[.02,.03],[.012,.08],[0,.085]],14),M('#5a3a22',{map:TX.oak,roughness:.4}),-.006,1.82,HZ-.39,{to:hs})}
/* ---------- portrait of Edmund over a side table with dried hydrangeas ---------- */
{const PZ=3.35;const g=grp(XL+.02,1.75,PZ,Math.PI/2);add(RB(.66,.8,.06,.02),MAT.gilt,0,0,.03,{to:g});add(RB(.58,.72,.07,.01),M('#4a3a18',{metalness:.6,roughness:.4}),0,0,.035,{to:g});
 add(new T.PlaneGeometry(.5,.62),M('#ffffff',{map:TX.portrait,roughness:.55}),0,0,.075,{to:g,cast:false});add(RB(.32,.03,.05,.01),MAT.brass,0,.47,.12,{to:g});add(new T.CylinderGeometry(.006,.006,.1,8),MAT.brass,0,.45,.07,{to:g,rx:Math.PI/2});
 const t=grp(XL+.2,0,PZ,Math.PI/2);const sh=new T.Shape();sh.absarc(0,0,.4,0,Math.PI,false);sh.lineTo(-.4,0);const top=new T.ExtrudeGeometry(sh,{depth:.03,bevelEnabled:true,bevelThickness:.006,bevelSize:.006,bevelSegments:2,curveSegments:32});top.rotateX(Math.PI/2);
 add(top,M('#5a3a26',{map:TX.oak,roughness:.3}),0,.8,-.18,{to:t});for(const [lx,lz] of [[-.32,.02],[.32,.02],[0,.22]])add(new T.CylinderGeometry(.016,.012,.78,10),M('#4a2e1c',{roughness:.35}),lx,.39,lz-.18+.18*0,{to:t});
 add(lathe([[0,0],[.06,0],[.075,.06],[.06,.16],[.03,.22],[.036,.25],[0,.25]],32),M('#7a8a7c',{roughness:.2}),0,.806,.02,{to:t});
 const florT=ctex(128,64,(x,w,h)=>{x.fillStyle='#8a7a84';x.fillRect(0,0,w,h);for(let i=0;i<220;i++){const cx=rnd()*w,cy=rnd()*h,r=2.5+rnd()*2.5;x.fillStyle=['#c8a8b8','#a8b0c8','#d8c0b4','#9a8a9a'][i%4];for(let k=0;k<4;k++){const a=k/4*TAU+rnd();x.beginPath();x.ellipse(cx+Math.cos(a)*r*.6,cy+Math.sin(a)*r*.6,r*.55,r*.35,a,0,TAU);x.fill()}x.fillStyle='rgba(60,40,40,.6)';x.fillRect(cx-.5,cy-.5,1.5,1.5)}});
 for(let i=0;i<9;i++){const a=rnd()*TAU,r=.04+rnd()*.07;const c=['#ffffff','#e8e4f0','#f4e8e4'][i%3];const head=new T.Mesh(new T.SphereGeometry(.05+rnd()*.018,20,14),M(c,{map:florT,bumpMap:florT,bumpScale:.006,roughness:.95}));head.position.set(Math.cos(a)*r,1.17+rnd()*.1,Math.sin(a)*r);t.add(head);
   tube([[0,1.06,0],[Math.cos(a)*r*.6,1.12,Math.sin(a)*r*.6],[head.position.x,head.position.y-.03,head.position.z]],.004,M('#5a4a30'),{to:t,rs:4})}}
/* ---------- the landing window, snow outside, a radiator under it ---------- */
{const WY0=1.08,WY1=2.3,WW=1.1;{const len=XR-XL,sh=new T.Shape();sh.moveTo(-len/2,-H2/2);sh.lineTo(len/2,-H2/2);sh.lineTo(len/2,H2/2);sh.lineTo(-len/2,H2/2);sh.lineTo(-len/2,-H2/2);const ho=new T.Path();ho.moveTo(-WW/2,WY0-H2/2);ho.lineTo(-WW/2,WY1-H2/2);ho.lineTo(WW/2,WY1-H2/2);ho.lineTo(WW/2,WY0-H2/2);ho.lineTo(-WW/2,WY0-H2/2);sh.holes.push(ho);
  const g=new T.ShapeGeometry(sh);const p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,p.getX(i)/1.6,(p.getY(i)+H2/2)/1.6);endWall.geometry.dispose();endWall.geometry=g}
 for(const [w,h,x,y] of [[.03,WY1-WY0,-WW/2-.015,(WY0+WY1)/2],[.03,WY1-WY0,WW/2+.015,(WY0+WY1)/2],[WW,.03,0,WY1+.015]])add(BOX(w,h,.28),M('#e8e0d0',{roughness:.6}),x,y,L+.14,{cast:false});
 add(new T.PlaneGeometry(4,4),new T.MeshBasicMaterial({map:TX.night}),0,1.6,L+1.4,{ry:Math.PI,cast:false}).material.color.setScalar(.85);
 for(const [w,h,x,y] of [[.07,WY1-WY0+.1,-WW/2-.035,(WY0+WY1)/2],[.07,WY1-WY0+.1,WW/2+.035,(WY0+WY1)/2],[WW+.14,.08,0,WY1+.04],[.04,WY1-WY0,0,(WY0+WY1)/2],[WW,.04,0,(WY0+WY1)/2+.18]])add(RB(w,h,.06,.008),M('#e8e0d0',{roughness:.5}),x,y,L-.03);
 add(RB(WW+.3,.05,.2,.01),M('#e8e0d0',{roughness:.5}),0,WY0-.02,L-.1);add(RB(WW+.1,.06,.3,.03),M('#c8d0de',{roughness:.8}),0,WY0+.0,L+.2,{cast:false});
 const cur=(x0)=>{const g=new T.PlaneGeometry(.45,2.3,30,40);const p=g.attributes.position;for(let i=0;i<p.count;i++){const u=p.getX(i)/.45+.5,v=p.getY(i)/2.3+.5;p.setZ(i,Math.sin(u*TAU*3.6)*.035*(.6+.4*v));p.setX(i,p.getX(i)*(.7+.3*v))}g.computeVertexNormals();add(g,M('#5a2a2a',{roughness:.85,side:T.DoubleSide}),x0,1.38,L-.14,{ry:Math.PI})};
 cur(-WW/2-.2);cur(WW/2+.2);add(new T.CylinderGeometry(.014,.014,WW+.9,10),MAT.brass,0,2.5,L-.12,{rz:Math.PI/2});
 for(let i=0;i<12;i++)add(RB(.05,.55,.12,.02),M('#c8c0b0',{metalness:.3,roughness:.5}),-.33+i*.06,.42,L-.09);add(RB(.75,.04,.13,.01),M('#c8c0b0',{metalness:.3,roughness:.5}),0,.13,L-.09);
 const n=300,pp=new Float32Array(n*3);for(let i=0;i<n;i++){pp[i*3]=(rnd()-.5)*2.2;pp[i*3+1]=rnd()*3;pp[i*3+2]=L+.35+rnd()*.9}const sg=new T.BufferGeometry();sg.setAttribute('position',new T.BufferAttribute(pp,3));
 const sn=new T.Points(sg,new T.PointsMaterial({color:'#e6ecff',size:.006,transparent:true,opacity:.85,depthWrite:false}));scene.add(sn);
 ANIM.push((dt,t)=>{const a=sg.attributes.position.array;for(let i=0;i<n;i++){a[i*3+1]-=dt*(.35+(i%5)*.05);a[i*3]+=dt*.15*Math.sin(t+i);if(a[i*3+1]<0)a[i*3+1]=3}sg.attributes.position.needsUpdate=true})}
/* ---------- pendant lights ---------- */
const pend=[];for(const [px,z] of [[1.2,1.85],[0,7.3]]){const g=grp(px,H2,z);add(new T.CylinderGeometry(.006,.006,.2,6),MAT.brass,0,-.1,0,{to:g,cast:false});add(lathe([[0,0],[.06,0],[.06,.015],[0,.02]]),MAT.brass,0,-.02,0,{to:g});
  add(new T.SphereGeometry(.15,32,16,0,TAU,Math.PI/2,Math.PI/2),MAT.glowBowl,0,-.22,0,{to:g,cast:false});add(new T.TorusGeometry(.15,.008,8,40),MAT.brass,0,-.22,0,{to:g,rx:Math.PI/2,cast:false});
  const l=new T.PointLight('#ffcf98',1.15,7,1.6);l.position.set(px,H2-.42,z);scene.add(l);pend.push(l)}
const hemi=new T.HemisphereLight('#6a6a86','#3a2414',.45);scene.add(hemi);
const keyL=new T.SpotLight('#ffd6a8',1.2,9,.9,.8,1.4);keyL.position.set(.2,H2-.15,.6);keyL.target.position.set(-.2,0,5.4);scene.add(keyL,keyL.target);keyL.castShadow=true;keyL.shadow.mapSize.set(2048,2048);keyL.shadow.bias=-.0006;keyL.shadow.radius=4;
const picL=new T.SpotLight('#ffd9a0',.9,2.5,.7,.6,1.6);picL.position.set(XL+.28,2.25,3.35);picL.target.position.set(XL,1.6,3.35);scene.add(picL,picL.target);
const door2L=new T.PointLight('#ffb060',.35,1.6,2);door2L.position.set(XL+.12,.06,5.0);scene.add(door2L);
const moonL=new T.SpotLight('#8aa6ff',1.2,9,.6,.8,1.3);moonL.position.set(.2,2.0,L+1.2);moonL.target.position.set(-.1,0,L-3);scene.add(moonL,moonL.target);moonL.castShadow=true;moonL.shadow.mapSize.set(1024,1024);moonL.shadow.bias=-.0008;
return {exposure:1.42,
 views:{wide:{p:[.3,2.45,.15],t:[-.05,.5,5.6],fov:70,where:'Upstairs hall · power on',text:'The upstairs hall. Four bedroom doors, the runner down the middle, the banister over the stairwell. The attic hatch at the far end.'},
  runner:{p:[-.8,1.35,3.55],t:[-.05,0,5.3],fov:56,where:'Upstairs hall · close look',text:'The runner. Dark patches on the pile and on the boards beside it, spaced like steps. Still damp to the touch.'},
  hatch:{p:[.1,1.15,4.55],t:[0,2.6,6.15],fov:62,where:'Upstairs hall · close look',text:'The attic hatch, shut. Its pull cord hangs to head height. A few drops on the runner underneath.'},
  door2:{p:[.65,.85,4.1],t:[-1.05,.15,5.0],fov:56,where:'Upstairs hall · close look',text:'The door of Room 2. A line of light under it.'},
  banister:{p:[.2,1.6,2.05],t:[1.35,-1.4,1.35],fov:62,where:'Upstairs hall · close look',text:'The banister over the stairwell. From here the stairs go down to the front hall, and you can see who comes up them.'},
  portrait:{p:[.55,1.55,3.35],t:[-1.1,1.55,3.35],fov:52,where:'Upstairs hall · close look',text:'Edmund Blackwood, in oils. Painted some years ago; the moustache was greyer by the end. Dried hydrangeas on the table beneath.'},
  window:{p:[.05,1.55,6.4],t:[0,1.5,8],fov:56,where:'Upstairs hall · close look',text:'The landing window. Snow piling on the sill outside, the pines black against it.'},
  dark:{p:[.3,2.45,.15],t:[-.05,.5,5.6],fov:70,where:'Upstairs hall · power out',text:'The lights go. Moonlight from the end window, and the light under Room 2 still there, flickering now.',dark:true}},
 update(t,dt,on,dk){pend.forEach(l=>l.intensity=1.15*on);keyL.intensity=1.2*on;picL.intensity=.9*on;MAT.glowBowl.emissiveIntensity=1.0*on;hemi.intensity=.45-.25*dk;moonL.intensity=1.2+1.6*dk;
  const fl=1-dk*(.45-.12*Math.sin(t*8.3)-.08*Math.sin(t*13.7));door2L.intensity=.35*fl;spill.material.opacity=.55*fl;lineM.color.copy(lin('#ffc070')).multiplyScalar(fl)}};
});
