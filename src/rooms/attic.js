// ROOM {"title":"Blackwood Attic Proof","aria":"The attic, rendered in 3D","loading":"Climbing the ladder…","where":"Attic · power on","text":"The attic, under the ridge. Trunks along the eaves, a cradle, a dress form. Moonlight through the round window at the far end.","buttons":[["wide","The attic"],["hatch","The hatch"],["trunks","The trunks"],["trunk","Middle trunk"],["photo","Photograph"],["cradle","Cradle"],["form","Dress form"],["window","Round window"],["dark","Power out"]]}
ROOM(47,H=>{const {T,TAU,rnd,ctex,noise,scene,ANIM,M,add,RB,BOX,lathe,grp,plane,tube,tiledBox,lin}=H;
/* ---------- textures ---------- */
const boardsT=(base,n,dark)=>ctex(512,512,(x,w,h)=>{const pw=w/n;for(let i=0;i<n;i++){const t=rnd();x.fillStyle=`rgb(${base[0]+t*26|0},${base[1]+t*16|0},${base[2]+t*10|0})`;x.fillRect(i*pw,0,pw,h);
   for(let g=0;g<16;g++){x.strokeStyle=`rgba(40,20,8,${.08+rnd()*.15})`;x.lineWidth=.7+rnd()*1.6;const gx=i*pw+rnd()*pw;x.beginPath();x.moveTo(gx,0);x.bezierCurveTo(gx+rnd()*10-5,h*.3,gx+rnd()*10-5,h*.7,gx+rnd()*6-3,h);x.stroke()}
   for(let k=0;k<2;k++){const cx=i*pw+10+rnd()*(pw-20),cy=rnd()*h;x.fillStyle='rgba(40,18,6,.55)';x.beginPath();x.ellipse(cx,cy,3+rnd()*3,6+rnd()*5,0,0,TAU);x.fill()}
   x.fillStyle=`rgba(6,3,1,${dark})`;x.fillRect(i*pw,0,3,h)}noise(x,w,h,.05,6000)});
const TX={
 floor:boardsT([96,70,46],4,.85),roof:boardsT([84,58,36],7,.9),rafter:boardsT([110,80,52],2,.2),
 dust:ctex(1024,1024,(x,w,h)=>{x.clearRect(0,0,w,h);x.fillStyle='rgba(150,140,124,.2)';x.fillRect(0,0,w,h);for(let i=0;i<5000;i++){x.fillStyle=`rgba(160,150,132,${rnd()*.06})`;x.beginPath();x.arc(rnd()*w,rnd()*h,2+rnd()*9,0,TAU);x.fill()}
   x.globalCompositeOperation='destination-out';const sole=(cx,cy,a,s)=>{x.save();x.translate(cx,cy);x.rotate(a);x.fillStyle=`rgba(0,0,0,${s})`;x.beginPath();x.ellipse(0,-12,9,16,0,0,TAU);x.fill();x.beginPath();x.ellipse(0,16,7,8,0,0,TAU);x.fill();x.restore()};
   // old traffic: a worn, blurred path down the middle to the cradle and the window
   x.filter='blur(6px)';for(let i=0;i<16;i++)sole(520+(i%2?14:-14)+Math.sin(i*.6)*30,980-i*60,.1*Math.sin(i),.45);x.filter='none';
   // tonight: hatch to the middle trunk and back, sharp
   for(let i=0;i<7;i++)sole(300+i*30+(i%2?12:-12),900-i*62,-.45,.85);for(let i=0;i<6;i++)sole(520-i*32+(i%2?12:-12),470+i*64,Math.PI-.45,.6);x.globalCompositeOperation='source-over'}),
 canvasG:ctex(256,256,(x,w,h)=>{x.fillStyle='#3a4a3a';x.fillRect(0,0,w,h);for(let i=0;i<h;i+=2){x.fillStyle=`rgba(0,0,0,${rnd()*.06})`;x.fillRect(0,i,w,1)}noise(x,w,h,.025,3000)},[1,1]),
 canvasR:ctex(256,256,(x,w,h)=>{x.fillStyle='#5a2a1e';x.fillRect(0,0,w,h);for(let i=0;i<h;i+=2){x.fillStyle=`rgba(0,0,0,${rnd()*.06})`;x.fillRect(0,i,w,1)}noise(x,w,h,.025,3000)},[1,1]),
 canvasB:ctex(256,256,(x,w,h)=>{x.fillStyle='#2a3448';x.fillRect(0,0,w,h);for(let i=0;i<h;i+=2){x.fillStyle=`rgba(0,0,0,${rnd()*.06})`;x.fillRect(0,i,w,1)}noise(x,w,h,.025,3000)}),
 initials:ctex(256,128,(x,w,h)=>{x.clearRect(0,0,w,h);x.fillStyle='rgba(230,220,190,.8)';x.font='bold 54px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillText('E. B.',w/2,h/2)}),
 linen:ctex(256,256,(x,w,h)=>{x.fillStyle='#cfc6b2';x.fillRect(0,0,w,h);for(let i=0;i<w;i+=2){x.fillStyle=`rgba(0,0,0,${rnd()*.05})`;x.fillRect(i,0,1,h);x.fillRect(0,i,w,1)}noise(x,w,h,.05,3000)},[3,3]),
 // a group on the lodge steps, 1911; one face scratched out of the emulsion
 photo:ctex(384,288,(x,w,h)=>{x.fillStyle='#e8dcc0';x.fillRect(0,0,w,h);const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#c0a882');g.addColorStop(.55,'#8a7254');g.addColorStop(1,'#4a3a28');x.fillStyle=g;x.fillRect(16,16,w-32,h-52);
   x.fillStyle='rgba(60,44,30,.5)';x.fillRect(16,150,w-32,8);x.fillRect(16,175,w-32,8);x.fillRect(16,200,w-32,8);
   const ppl=[[70,1],[118,0],[166,1],[214,0],[262,1],[310,0]];ppl.forEach(([px,s],i)=>{const tall=i===3?14:0;x.fillStyle='rgba(40,28,18,.9)';x.beginPath();x.arc(px,104-tall-s*6,13,0,TAU);x.fill();x.fillRect(px-17,118-tall-s*6,34,80+tall);x.fillStyle='rgba(225,210,185,.85)';x.beginPath();x.arc(px,106-tall-s*6,9,0,TAU);x.fill()});
   // the small figure in front: a child
   x.fillStyle='rgba(40,28,18,.9)';x.beginPath();x.arc(190,150,9,0,TAU);x.fill();x.fillRect(178,160,24,44);x.fillStyle='rgba(225,210,185,.85)';x.beginPath();x.arc(190,151,6,0,TAU);x.fill();
   // scratches over the fourth face, gouged through to the paper
   x.strokeStyle='rgba(245,240,228,.95)';x.lineWidth=2;for(let i=0;i<14;i++){x.beginPath();const ox=214+(rnd()-.5)*16,oy=88+(rnd()-.5)*16;x.moveTo(ox-12,oy-10+rnd()*4);x.lineTo(ox+12,oy+10-rnd()*4);x.stroke()}
   for(let i=0;i<2500;i++){x.fillStyle=`rgba(60,40,20,${rnd()*.15})`;x.fillRect(16+rnd()*(w-32),16+rnd()*(h-52),1,1)}x.fillStyle='#4a3a28';x.font='italic 15px Georgia';x.textAlign='center';x.fillText('Blackwood, Christmas 1911',w/2,h-16)}),
 web:ctex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);x.strokeStyle='rgba(235,235,235,.55)';x.lineWidth=1;for(let k=0;k<11;k++){const a=k/10*Math.PI/2;x.beginPath();x.moveTo(0,0);x.lineTo(Math.cos(a)*w*1.4,Math.sin(a)*h*1.4);x.stroke()}
   for(let r=18;r<w*1.3;r+=14+rnd()*8){x.beginPath();for(let k=0;k<=10;k++){const a=k/10*Math.PI/2;const rr=r*(.92+rnd()*.12);const px=Math.cos(a)*rr,py=Math.sin(a)*rr;k?x.quadraticCurveTo(Math.cos(a-.08)*rr*.94,Math.sin(a-.08)*rr*.94,px,py):x.moveTo(px,py)}x.stroke()}
   const g=x.createRadialGradient(0,0,10,0,0,w*1.3);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,1)');x.globalCompositeOperation='destination-out';x.fillStyle=g;x.fillRect(0,0,w,h)}),
 night:ctex(256,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0c1838');g.addColorStop(.7,'#2a3e70');g.addColorStop(1,'#56689a');x.fillStyle=g;x.fillRect(0,0,w,h);x.fillStyle='#f4f6ff';x.beginPath();x.arc(w*.68,h*.3,14,0,TAU);x.fill();
   const mg=x.createRadialGradient(w*.68,h*.3,12,w*.68,h*.3,70);mg.addColorStop(0,'rgba(200,215,255,.4)');mg.addColorStop(1,'rgba(200,215,255,0)');x.fillStyle=mg;x.fillRect(0,0,w,h);
   x.fillStyle='#060a16';for(let i=0;i<7;i++){const tx=i/6*w,th=h*(.25+rnd()*.15),tw=w*.12;for(let k=0;k<4;k++){const yy=h-k*th*.2;x.beginPath();x.moveTo(tx-tw*(1-k*.2),yy);x.lineTo(tx,yy-th*.45);x.lineTo(tx+tw*(1-k*.2),yy);x.fill()}}
   for(let i=0;i<50;i++){x.fillStyle='rgba(235,240,255,.85)';x.beginPath();x.arc(rnd()*w,rnd()*h*.8,.8+rnd()*1.3,0,TAU);x.fill()}}),
};
TX.floor.repeat.set(2.4,4);TX.roof.repeat.set(4,1.2);
/* ---------- the roof: kneewalls at the eaves, rafters to the ridge ---------- */
const L=8.2,KX=2.25,KH=.55,RH=2.75;// length along the ridge, kneewall line, kneewall height, ridge height
const floorM=M('#ffffff',{map:TX.floor,roughness:.8}),roofM=M('#ffffff',{map:TX.roof,roughness:.9}),rafM=M('#ffffff',{map:TX.rafter,roughness:.75});
// floor with the hatch cut through it
const HX=.95,HZ=1.75,HW=.66,HD=.88;
{const sh=new T.Shape();sh.moveTo(-KX,0);sh.lineTo(KX,0);sh.lineTo(KX,-L);sh.lineTo(-KX,-L);sh.lineTo(-KX,0);const ho=new T.Path();ho.moveTo(HX-HW/2,-HZ+HD/2);ho.lineTo(HX-HW/2,-HZ-HD/2);ho.lineTo(HX+HW/2,-HZ-HD/2);ho.lineTo(HX+HW/2,-HZ+HD/2);ho.lineTo(HX-HW/2,-HZ+HD/2);sh.holes.push(ho);
 const g=new T.ShapeGeometry(sh);const p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+KX)/(2*KX),-p.getY(i)/L);g.rotateX(-Math.PI/2);const m=new T.Mesh(g,floorM);m.receiveShadow=true;scene.add(m)}
const slopeLen=Math.hypot(KX,RH-KH),slopeA=Math.atan2(RH-KH,KX);
TX.roof.repeat.set(slopeLen/1.0,L/2.2);
for(const e of [-1,1]){// sarking boards on the outside of the rafters; boards run with the ridge
  const g=new T.PlaneGeometry(slopeLen+.12,L);g.rotateX(-Math.PI/2);const p=add(g,roofM,e*KX/2,(KH+RH)/2,L/2,{cast:false});p.rotation.z=-e*slopeA;p.material.side=T.DoubleSide;
  tiledBox(.04,KH,L,M('#ffffff',{map:TX.floor,roughness:.85}),e*(KX+.02),KH/2,L/2,1.0,{cast:false});
  add(RB(.06,.06,L,.01),rafM,e*(KX-.02),KH+.03,L/2);// wall plate
  const pu=add(BOX(.1,.13,L),rafM,e*KX*.5-e*.17,(KH+RH)/2-.17,L/2);pu.rotation.z=-e*slopeA}
add(RB(.07,.2,L,.01),rafM,0,RH-.11,L/2);// ridge beam
const RZ=[];for(let z=.3;z<L-.1;z+=.6)RZ.push(z);
RZ.forEach((z,i)=>{for(const e of [-1,1]){const r=add(RB(slopeLen+.04,.15,.06,.01),rafM,e*KX/2-e*.055,(KH+RH)/2-.055,z);r.rotation.z=-e*slopeA}
  if(i%3===1){const y=1.95,xx=KX*(RH-y)/(RH-KH)+.04;add(RB(2*xx,.12,.05,.01),rafM,0,y,z+.055)}});
// gable ends: boarded, the far one with a round window
const gable=(z,ry,win)=>{const sh=new T.Shape();sh.moveTo(-KX-.05,0);sh.lineTo(KX+.05,0);sh.lineTo(KX+.05,KH);sh.lineTo(0,RH+.05);sh.lineTo(-KX-.05,KH);sh.lineTo(-KX-.05,0);
  if(win){const h=new T.Path();h.absarc(0,1.55,.34,0,TAU,true);sh.holes.push(h)}const g=new T.ShapeGeometry(sh,40);const p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+KX)/1.6,p.getY(i)/1.6);
  const tx=TX.roof.clone();tx.needsUpdate=true;tx.repeat.set(1,1);const m=new T.Mesh(g,M('#ffffff',{map:tx,roughness:.9}));m.position.z=z;m.rotation.y=ry;m.receiveShadow=true;scene.add(m)};
gable(L,Math.PI,true);gable(0,0,false);
// the round window: frame, cross bars, frosted glass with snow banked at the bottom, night beyond
{const wy=1.55,wz=L;add(new T.TorusGeometry(.35,.035,10,48),rafM,0,wy,wz-.03);add(new T.TorusGeometry(.35,.02,8,48),rafM,0,wy,wz+.03);
 add(RB(.03,.68,.04,.006),rafM,0,wy,wz);add(RB(.68,.03,.04,.006),rafM,0,wy,wz);
 add(new T.CircleGeometry(.34,40),new T.MeshBasicMaterial({map:TX.night}),0,wy,wz+.25,{ry:Math.PI,cast:false}).material.color.setScalar(.9);
 const sn=M('#c8d2e4',{roughness:.9});for(let i=0;i<12;i++){const a=Math.PI*1.22+i/11*Math.PI*.56;const m=add(new T.IcosahedronGeometry(.018+rnd()*.014,1),sn,Math.cos(a)*.31,wy+Math.sin(a)*.31+.012,wz+.05,{cast:false});m.scale.set(1.6,.55,.5);m.rotation.z=a+Math.PI/2}
 add(new T.CircleGeometry(.34,40),new T.MeshPhysicalMaterial({color:'#1c2428',roughness:.05,transparent:true,opacity:.18,depthWrite:false}),0,wy,wz+.01,{ry:Math.PI,cast:false})}
/* ---------- the hatch: ladder up from the landing, warm light from below ---------- */
{// shaft below the floor
 const shM=M('#3a2a1c',{map:TX.floor,roughness:.9});for(const [w,d,x,z] of [[HW,.02,HX,HZ-HD/2-.01],[HW,.02,HX,HZ+HD/2+.01],[.02,HD,HX-HW/2-.01,HZ],[.02,HD,HX+HW/2+.01,HZ]])add(BOX(w,.6,d),shM,x,-.3,z,{cast:false});
 add(new T.PlaneGeometry(HW,HD),M('#a8784a',{emissive:'#ffb060',emissiveIntensity:.35,roughness:.9}),HX,-.6,HZ,{rx:-Math.PI/2,cast:false});
 // trim round the opening
 for(const [w,d,x,z] of [[HW+.1,.05,HX,HZ-HD/2-.025],[HW+.1,.05,HX,HZ+HD/2+.025],[.05,HD,HX-HW/2-.025,HZ],[.05,HD,HX+HW/2+.025,HZ]])add(RB(w,.025,d,.006),rafM,x,.0125,z);
 // the ladder: rails up through the opening, rungs
 const lad=grp(HX,0,HZ+HD/2-.12,0);lad.rotation.x=-.28;for(const e of [-1,1])add(RB(.045,1.5,.06,.008),rafM,e*.2,.15,0,{to:lad});for(let i=0;i<5;i++)add(new T.CylinderGeometry(.016,.016,.4,10),rafM,0,-.45+i*.27,0,{to:lad,rz:Math.PI/2});
 // the hatch cover, laid back open on the boards, with its ring pull
 const hc=grp(HX-HW/2-.05,0,HZ,0);add(RB(HW-.02,.035,HD-.02,.006),M('#ffffff',{map:TX.floor,roughness:.8}),-(HW-.02)/2,.018,0,{to:hc});add(new T.TorusGeometry(.03,.005,6,18),M('#2a2622',{metalness:.5,roughness:.5}),-(HW/2),.037,0,{to:hc,rx:Math.PI/2});
 for(const z of [-.25,.25])add(RB(.12,.006,.04,.002),M('#2a2622',{metalness:.5,roughness:.5}),-.03,.037,z,{to:hc})}
/* ---------- dust on the boards, and what walked through it ---------- */
{const m=new T.Mesh(new T.PlaneGeometry(2*KX,L-.4),new T.MeshStandardMaterial({map:TX.dust,transparent:true,roughness:1,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(0,.002,L/2+.1);scene.add(m)}
/* ---------- steamer trunks ---------- */
const brassM=M('#b8913c',{metalness:.85,roughness:.38}),leatherM=M('#4a2a18',{roughness:.6}),slatM=M('#6a4a2c',{map:TX.rafter,roughness:.6});
function trunk(x,z,ry,w,h,d,canvasT,o={}){const g=grp(x,0,z,ry);const cm=M('#ffffff',{map:canvasT,roughness:.75});const bh=o.dome?h*.72:h*.78,lh=h-bh;
  add(RB(w,bh,d,.012),cm,0,bh/2,0,{to:g});for(const y of [.02,bh-.03])add(RB(w+.012,.035,d+.012,.006),slatM,0,y,0,{to:g});for(const xx of [-w/2+.1,w/2-.1])add(RB(.05,bh,d+.014,.006),slatM,xx,bh/2,0,{to:g});
  for(const sx of [-1,1])for(const sz of [-1,1])add(RB(.06,.06,.06,.01),brassM,sx*(w/2-.02),.03,sz*(d/2-.02),{to:g});
  for(const sx of [-1,1])add(RB(.03,.1,.14,.008),leatherM,sx*(w/2+.008),bh*.65,0,{to:g});
  // lid, hinged along the back edge
  const lid=grp(0,bh,-d/2,0,g);if(o.open)lid.rotation.x=-o.open;
  if(o.dome){const dg=new T.CylinderGeometry(d/2,d/2,w,32,1,false,0,Math.PI);dg.rotateZ(Math.PI/2);dg.scale(1,lh/(d/2),1);add(dg,cm,0,0,d/2,{to:lid});for(const xx of [-w/2+.1,w/2-.1]){const t=new T.CylinderGeometry(d/2+.007,d/2+.007,.05,32,1,true,0,Math.PI);t.rotateZ(Math.PI/2);t.scale(1,lh/(d/2),1);add(t,slatM,xx,0,d/2,{to:lid}).material.side=T.DoubleSide}}
  else{add(RB(w,lh,d,.012),cm,0,lh/2,d/2,{to:lid});for(const y of [.02,lh-.02])add(RB(w+.012,.03,d+.012,.006),slatM,0,y,d/2,{to:lid});for(const xx of [-w/2+.1,w/2-.1])add(RB(.05,lh,d+.014,.006),slatM,xx,lh/2,d/2,{to:lid});
    for(const sx of [-1,1])for(const sz of [-1,1])add(RB(.06,.06,.06,.01),brassM,sx*(w/2-.02),lh-.03,d/2+sz*(d/2-.02),{to:lid})}
  // latches on the front
  for(const sx of [-.28,0,.28]){if(Math.abs(sx)>w/2-.15)continue;add(RB(.05,.07,.012,.004),brassM,sx*w/1.0*.9,bh-.02,d/2+.006,{to:g})}
  if(o.straps)for(const xx of [-w/4,w/4]){add(BOX(.05,bh+.002,d+.022),leatherM,xx,bh/2,0,{to:g});add(RB(.05,lh,.012,.004),leatherM,xx,lh/2,d+.011,{to:lid})}
  return {g,lid,bh}}
// along the left eave
const tA=trunk(1.55,3.35,-Math.PI/2+.06,.86,.58,.5,TX.canvasR,{dome:true});
const tB=trunk(1.6,4.6,-Math.PI/2-.04,.8,.46,.48,TX.canvasG,{straps:true});
// a hat box on trunk B
{const hb=grp(1.62,.46+.003,4.62,.3);add(new T.CylinderGeometry(.18,.18,.2,40),M('#b8a080',{roughness:.8}),0,.1,0,{to:hb});add(new T.CylinderGeometry(.186,.186,.05,40),M('#8a6a4a',{roughness:.7}),0,.19,0,{to:hb});for(let i=0;i<2;i++)add(new T.TorusGeometry(.181,.003,4,40),M('#5a1a20'),0,.06+i*.04,0,{to:hb,rx:Math.PI/2})}
// the middle trunk: a flat steamer, the lid down but not shut. Something stops it.
const TC=new T.Vector3(.3,0,5.45);
{const tc=trunk(TC.x,TC.z,Math.PI-.12,.92,.5,.52,TX.canvasB,{open:.13,straps:false});(H.hook||(()=>{}))('lining',add(BOX(.86,.002,.46),M('#060504',{roughness:1}),0,tc.bh+.002,0,{to:tc.g,cast:false}));
 {const lt=tc.lid.children;const dec=new T.Mesh(new T.PlaneGeometry(.36,.18),M('#ffffff',{map:TX.initials,transparent:true,roughness:.7}));dec.rotation.x=-Math.PI/2;dec.position.set(0,.5-tc.bh+.002,.26);tc.lid.add(dec)}
 // the poker, lying corner to corner inside; its brass knob and a hand's width of rod show in the gap at the front corner
 const pk=grp(0,tc.bh-.03,0,0,tc.g);pk.rotation.y=-.6435;add(new T.CylinderGeometry(.0065,.0065,.7,10),brassM,0,0,0,{to:pk,rz:Math.PI/2});add(new T.SphereGeometry(.014,14,10),brassM,.36,0,0,{to:pk});
 pk.position.set(.072,tc.bh+.012,.054);(H.hook||(()=>{}))('poker',pk);(H.hook||(()=>{}))('trunk',tc);
 // a folded rug thrown on top of the lid
 }
// the photograph, leaning against the red trunk
{const ph=grp(1.22,0,3.35,0);ph.rotation.y=-Math.PI/2+.12;const fr=grp(0,0,0,0,ph);fr.rotation.x=-.28;add(RB(.34,.27,.02,.006),M('#2a1a10',{roughness:.35}),0,.135,0,{to:fr});add(new T.PlaneGeometry(.3,.225),M('#ffffff',{map:TX.photo,roughness:.6}),0,.135,.0105,{to:fr,cast:false})}
/* ---------- the cradle, the old rocking kind ---------- */
{const g=grp(-1.35,0,3.0,Math.PI/2+.15);const cw=M('#7a5434',{map:TX.rafter,roughness:.5});const Lc=.92,Wc=.46;
 for(const e of [-1,1]){const sh=new T.Shape();const R=.62,a0=-Math.PI/2-.36,a1=-Math.PI/2+.36;sh.moveTo(Math.cos(a0)*R,R+Math.sin(a0)*R);sh.absarc(0,R,R,a0,a1,false);sh.lineTo(Math.cos(a1)*R,.14);sh.lineTo(Math.cos(a0)*R,.14);sh.closePath();const rg=new T.ExtrudeGeometry(sh,{depth:.035,bevelEnabled:true,bevelThickness:.005,bevelSize:.005,bevelSegments:2,curveSegments:24});add(rg,cw,0,.005,e*(Lc/2-.08)-.0175,{to:g})}
 add(RB(Wc,.025,Lc,.006),cw,0,.14,0,{to:g});
 // head and foot boards
 for(const [e,ht] of [[-1,.62],[1,.44]]){const sh=new T.Shape();sh.moveTo(-Wc/2,0);sh.lineTo(Wc/2,0);sh.lineTo(Wc/2,ht-.08);sh.quadraticCurveTo(0,ht+.06,-Wc/2,ht-.08);sh.lineTo(-Wc/2,0);const bg=new T.ExtrudeGeometry(sh,{depth:.025,bevelEnabled:true,bevelThickness:.006,bevelSize:.006,bevelSegments:2});add(bg,cw,0,.12,e*Lc/2-.0125,{to:g})}
 // spindled sides
 for(const s of [-1,1]){add(RB(.035,.03,Lc,.008),cw,s*Wc/2,.5,0,{to:g});add(RB(.03,.025,Lc,.008),cw,s*Wc/2,.16,0,{to:g});for(let i=1;i<10;i++)add(lathe([[0,0],[.008,0],[.012,.08],[.008,.17],[.012,.3],[.008,.34],[0,.34]],10),cw,s*Wc/2,.165,-Lc/2+i*Lc/10,{to:g})}
 // a folded blanket and a rag doll
 add(RB(Wc-.06,.07,Lc*.55,.03,4),M('#c8b8a0',{map:TX.linen,roughness:.95}),0,.19,.12,{to:g});add(RB(Wc-.08,.035,Lc*.4,.015,4),M('#6a7a8a',{map:TX.linen,roughness:.95}),0,.24,.18,{to:g,ry:.08})}
/* ---------- the dress form ---------- */
{const g=grp(-.85,0,5.2,.5);const fm=M('#ffffff',{map:TX.linen,roughness:.9});
 const prof=[[0,0],[.13,0],[.15,.05],[.155,.15],[.13,.26],[.112,.33],[.13,.4],[.158,.47],[.16,.53],[.145,.58],[.11,.62],[.055,.65],[.042,.66],[.042,.71],[.055,.72],[0,.73]];const tg=lathe(prof,40);tg.scale(1,1,.72);add(tg,fm,0,.92,0,{to:g});
 add(new T.CylinderGeometry(.01,.01,.6,10),M('#2a1a10',{roughness:.4}),0,.62,0,{to:g});add(new T.SphereGeometry(.025,12,10),M('#2a1a10',{roughness:.4}),0,1.69,0,{to:g});
 for(let i=0;i<3;i++){const a=i/3*TAU;const leg=add(new T.CylinderGeometry(.012,.01,.42,8),M('#2a1a10',{roughness:.4}),Math.cos(a)*.12,.17,Math.sin(a)*.12,{to:g});leg.rotation.set(-Math.sin(a)*.6,0,Math.cos(a)*.6)}
 // a tape measure hung round its neck
 const tm=M('#e0c860',{roughness:.6});tube([[-.05,1.63,.02],[-.07,1.5,.06],[-.09,1.3,.1],[-.1,1.15,.11]],.006,tm,{to:g,seg:16,rs:4});tube([[.05,1.63,.02],[.07,1.5,.07],[.09,1.36,.1]],.006,tm,{to:g,seg:16,rs:4})}
/* ---------- a chair under a dust sheet ---------- */
{const g=grp(-1.55,0,6.45,.4);const n=64,S=1.4;// a heightfield draped over a chair, blurred so the cloth falls softly, then creased
 const hf=[];const rr=(x,z,hx,hz,r)=>{const dx=Math.max(0,Math.abs(x)-hx+r),dz=Math.max(0,Math.abs(z)-hz+r);return Math.hypot(dx,dz)<r};const at=(x,z)=>{if(rr(x,z+.28,.3,.06,.06))return .98-Math.pow(Math.abs(x)/.3,4)*.12;if(rr(x-.3*Math.sign(x),z+.01,.06,.29,.05)&&Math.abs(x)>.24)return .64;if(rr(x,z,.3,.3,.08))return .47;return 0};
 for(let j=0;j<=n;j++){hf.push([]);for(let i=0;i<=n;i++)hf[j].push(at((i/n-.5)*S,(j/n-.5)*S))}
 for(let pass=0;pass<14;pass++){const nh=hf.map(r=>r.slice());for(let j=1;j<n;j++)for(let i=1;i<n;i++){const avg=(hf[j][i-1]+hf[j][i+1]+hf[j-1][i]+hf[j+1][i])/4;nh[j][i]=Math.max(at((i/n-.5)*S,(j/n-.5)*S)*.98,avg*.96)}for(let j=0;j<=n;j++){nh[j][0]=nh[j][n]=0;nh[0][j]=nh[n][j]=0}hf.splice(0,hf.length,...nh)}
 const geo=new T.PlaneGeometry(S,S,n,n);geo.rotateX(-Math.PI/2);const p=geo.attributes.position;for(let k=0;k<p.count;k++){const i=Math.round((p.getX(k)/S+.5)*n),j=Math.round((p.getZ(k)/S+.5)*n);const hh=hf[j][i];const a=Math.atan2(p.getZ(k),p.getX(k)),rad=Math.hypot(p.getX(k),p.getZ(k));const edge=.5+.08*Math.sin(a*5)+.05*Math.sin(a*9+1);let y=hh+Math.sin(a*13+hh*4)*.018*(1-hh)*(hh>.01?1:.3);if(rad>edge)y=-.02;p.setY(k,Math.max(hh<.01&&rad<=edge?.004:-1,y))}
 geo.computeVertexNormals();add(geo,M('#bdb4a2',{map:TX.linen,roughness:.95,side:T.DoubleSide}),0,0,0,{to:g})}
/* ---------- stacked picture frames against the right eave, a rolled carpet ---------- */
{for(let i=0;i<4;i++){const f=grp(-2.15+i*.03,0,4.05+i*.04,Math.PI/2);f.rotation.x=0;const fr=grp(0,0,0,0,f);fr.rotation.x=-.18;add(RB(.7-i*.08,.52-i*.05,.03,.008),M(['#6a4a28','#2a1a10','#8a6a3a','#3a2a1a'][i],{roughness:.4,metalness:i===2?.6:0}),0,(.52-i*.05)/2,0,{to:fr})}
 const rc=add(new T.CylinderGeometry(.11,.11,1.6,24),M('#5a1a18',{map:TX.linen,roughness:.95}),-1.9,.11,1.9,{rx:Math.PI/2});rc.rotation.set(Math.PI/2,0,.1)}
/* ---------- cobwebs in the rafter angles ---------- */
{const wm=new T.MeshBasicMaterial({map:TX.web,transparent:true,opacity:.5,depthWrite:false,side:T.DoubleSide,color:lin('#cfcfcf')});
 for(const [x,y,z,ry,rz,s] of [[0,RH-.22,1.5,0,Math.PI*.75,.5],[0,RH-.22,6.3,0,Math.PI*.25,.45],[KX-.03,KH+.06,2.4,-Math.PI/2,0,.45],[-KX+.03,KH+.06,5.7,Math.PI/2,0,.5],[0,RH-.3,L-.02,Math.PI,Math.PI*.72,.55]]){const m=add(new T.PlaneGeometry(s,s),wm,x,y,z,{ry,cast:false});m.rotation.z=rz;m.geometry.translate(s/2,s/2,0)}}
/* ---------- the bulb on the ridge ---------- */
const bulbM=M('#fff2d0',{emissive:'#ffd090',emissiveIntensity:2.4,roughness:.4});
{add(new T.CylinderGeometry(.004,.004,.45,6),M('#1a1a1a'),0,RH-.43,3.9,{cast:false});add(new T.CylinderGeometry(.018,.018,.05,14),M('#2a2420',{metalness:.5,roughness:.5}),0,RH-.68,3.9,{cast:false});add(lathe([[0,0],[.016,0],[.03,.03],[.03,.06],[.012,.09],[0,.095]].map(p=>[p[0],-p[1]]),20),bulbM,0,RH-.7,3.9,{cast:false})}
/* ---------- moonbeam: a faint shaft from the round window, motes drifting in it ---------- */
const beamT=ctex(64,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(255,255,255,.0)');g.addColorStop(.15,'rgba(255,255,255,.9)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h);const s=x.createLinearGradient(0,0,w,0);s.addColorStop(0,'rgba(0,0,0,1)');s.addColorStop(.5,'rgba(0,0,0,0)');s.addColorStop(1,'rgba(0,0,0,1)');x.globalCompositeOperation='destination-out';x.fillStyle=s;x.fillRect(0,0,w,h)});
const beamM=new T.MeshBasicMaterial({map:beamT,color:lin('#4a5a88'),transparent:true,opacity:.24,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide});
{const g=new T.CylinderGeometry(.32,.75,3.6,24,1,true);g.translate(0,-1.8,0);const b=add(g,beamM,0,1.55,L,{cast:false});b.rotation.x=1.1;b.rotation.order='XYZ'}
{const n=60,pp=new Float32Array(n*3);for(let i=0;i<n;i++){const t=rnd();pp[i*3]=(rnd()-.5)*.6*(1+t);pp[i*3+1]=1.55-t*1.2+(rnd()-.5)*.4;pp[i*3+2]=L-.2-t*3}const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pp,3));
 const mm=new T.PointsMaterial({color:'#c8d4ff',size:.008,transparent:true,opacity:.6,depthWrite:false,blending:T.AdditiveBlending});scene.add(new T.Points(g,mm));ANIM.push((dt,t)=>{const a=g.attributes.position.array;for(let i=0;i<n;i++){a[i*3+1]+=Math.sin(t*.3+i)*dt*.01;a[i*3]+=Math.cos(t*.2+i)*dt*.008}g.attributes.position.needsUpdate=true})}
/* ---------- light ---------- */
const hemi=new T.HemisphereLight('#3a4466','#2a1a10',.32);scene.add(hemi);
const bulb=new T.PointLight('#ffcf90',1.6,9,1.5);bulb.position.set(0,RH-.82,3.9);bulb.castShadow=true;bulb.shadow.mapSize.set(1024,1024);bulb.shadow.bias=-.003;scene.add(bulb);
const below=new T.PointLight('#ffb060',.9,3.2,1.8);below.position.set(HX,-.25,HZ);scene.add(below);
const moon=new T.SpotLight('#8aa6ff',2.2,12,.32,.7,1.1);moon.position.set(.3,2.4,L+1.8);moon.target.position.set(-.2,0,L-3.4);scene.add(moon,moon.target);moon.castShadow=true;moon.shadow.mapSize.set(1024,1024);moon.shadow.bias=-.001;
return {views:{
 wide:{p:[.2,1.4,.45],t:[0,.95,7.6],fov:66,where:'Attic · power on',text:'The attic, under the ridge. Trunks along the eaves, a cradle, a dress form. Moonlight through the round window at the far end.'},
 hatch:{p:[-.15,1.55,2.9],t:[.9,0,1.75],fov:56,where:'Attic · close look',text:'The hatch, standing open. The top of the ladder, and the light from the landing below.'},
 trunks:{p:[.15,1.15,2.3],t:[1.55,.35,4.1],fov:58,where:'Attic · close look',text:'Two trunks under the eave, a red one and a green one with a hat box on it. Labels from Southampton and Le Havre, long faded.'},
 trunk:{p:[.4,.85,4.3],t:[.08,.4,5.35],fov:50,where:'Attic · close look',text:'A blue steamer trunk in the middle of the boards, brass corners, initials on the lid: E. B.'},
 photo:{p:[.62,.62,3.25],t:[1.15,.15,3.35],fov:42,where:'Attic · close look',text:'A photograph in a frame, propped against the red trunk. The lodge steps, Christmas 1911. Six grown-ups and a child.'},
 cradle:{p:[-.1,1.15,2.1],t:[-1.35,.35,3.0],fov:54,where:'Attic · close look',text:'A rocking cradle with turned spindles. A folded blanket still in it.'},
 form:{p:[.4,1.22,3.65],t:[-.95,.95,5.5],fov:52,where:'Attic · close look',text:'A dress form on its tripod, a tape measure round its neck. Behind it, a chair under a dust sheet.'},
 window:{p:[.95,1.25,6.45],t:[0,1.55,8.2],fov:50,where:'Attic · close look',text:'The round window in the gable. Snow banked on the sill outside, the moon over the pines.'},
 dark:{p:[.2,1.4,.45],t:[0,.95,7.6],fov:66,where:'Attic · power out',text:'The bulb goes out. Only the moon now, through the round window.',dark:true}},
 update(t,dt,on,dk){bulb.intensity=1.6*on;bulbM.emissiveIntensity=2.4*on;below.intensity=.9*on;hemi.intensity=.32-.16*dk;moon.intensity=2.2+1.6*dk;beamM.opacity=.24+.2*dk},
 exposure:1.45,darkExposure:.5}});
