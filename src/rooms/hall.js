// ROOM {"title": "Blackwood Hall Proof", "aria": "The front hall, rendered in 3D", "loading": "Lighting the hall…", "where": "Front hall · from the gallery", "text": "The front hall. Coats on the rack, boots in the tray, snow melting on the mat. The grandfather clock says five past ten.", "buttons": [["wide", "The hall"], ["coats", "Coat rack"], ["coat", "Green coat"], ["boots", "Boot tray"], ["book", "Guest book"], ["clock", "The clock"], ["door", "Front door"], ["stairs", "Stairs"], ["dark", "Power out"]]}
ROOM(11,_H=>{const {renderer,scene,camera,ANIM}=_H;
const T=THREE,TAU=Math.PI*2;let seed=11;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
/* ---------- procedural textures ---------- */
function ctex(w,h,draw,rep){const cv=document.createElement('canvas');cv.width=w;cv.height=h;const x=cv.getContext('2d');draw(x,w,h);const t=new T.CanvasTexture(cv);t.encoding=T.sRGBEncoding;t.anisotropy=8;if(rep){t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(rep[0],rep[1])}return t}
function noise(x,w,h,a,n=4000){for(let i=0;i<n;i++){x.fillStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:255},${rnd()<.5?0:255},${a*rnd()})`;x.fillRect(rnd()*w,rnd()*h,1+rnd()*2,1+rnd()*2)}}
const lin=c=>new T.Color(c).convertSRGBToLinear();
const TX={
 // black and cream marble, laid on the diagonal, with veining
 marble:ctex(1024,1024,(x,w,h)=>{const n=4,s=w/n;for(let i=0;i<n;i++)for(let j=0;j<n;j++){const dark=(i+j)%2;x.fillStyle=dark?'#17151a':'#d9d1c1';x.fillRect(i*s,j*s,s,s);
     for(let v=0;v<5;v++){x.strokeStyle=dark?`rgba(200,190,170,${.05+rnd()*.1})`:`rgba(90,80,70,${.08+rnd()*.16})`;x.lineWidth=.6+rnd()*1.8;x.beginPath();let px=i*s+rnd()*s,py=j*s;x.moveTo(px,py);for(let k=0;k<10;k++){px+=(rnd()-.5)*40;py+=s/10;x.lineTo(Math.max(i*s,Math.min(i*s+s,px)),py)}x.stroke()}
     const g=x.createRadialGradient(i*s+s*rnd(),j*s+s*rnd(),0,i*s+s/2,j*s+s/2,s);g.addColorStop(0,dark?'rgba(60,56,64,.25)':'rgba(255,250,240,.2)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(i*s,j*s,s,s)}
   x.strokeStyle='rgba(0,0,0,.55)';x.lineWidth=2;for(let i=0;i<=n;i++){x.beginPath();x.moveTo(i*s,0);x.lineTo(i*s,h);x.stroke();x.beginPath();x.moveTo(0,i*s);x.lineTo(w,i*s);x.stroke()}noise(x,w,h,.03,6000)},[2.6,3.4]),
 // deep green wallpaper with a gold Deco fan
 paper:ctex(512,512,(x,w,h)=>{x.fillStyle='#16302c';x.fillRect(0,0,w,h);const fan=(cx,cy)=>{x.save();x.translate(cx,cy);x.strokeStyle='rgba(206,166,92,.2)';x.lineWidth=2;for(let r=30;r<=120;r+=30){x.beginPath();x.arc(0,0,r,Math.PI,TAU);x.stroke()}
     for(let k=0;k<=8;k++){const a=Math.PI+k/8*Math.PI;x.beginPath();x.moveTo(Math.cos(a)*30,Math.sin(a)*30);x.lineTo(Math.cos(a)*120,Math.sin(a)*120);x.stroke()}x.fillStyle='rgba(206,166,92,.18)';x.beginPath();x.arc(0,0,22,Math.PI,TAU);x.fill();x.restore()};
   for(const [cx,cy] of [[0,128],[256,128],[512,128],[128,384],[384,384]])fan(cx,cy);noise(x,w,h,.05,5000)},[5,4]),
 wood:ctex(512,512,(x,w,h)=>{x.fillStyle='#5a361e';x.fillRect(0,0,w,h);for(let i=0;i<130;i++){const y=rnd()*h;x.strokeStyle=`rgba(${rnd()<.5?24:130},${rnd()<.5?12:76},${rnd()<.5?6:34},${.08+rnd()*.18})`;x.lineWidth=.6+rnd()*2.4;x.beginPath();x.moveTo(0,y);for(let k=1;k<=8;k++)x.lineTo(k*w/8,y+Math.sin(k*1.3+y)*3*rnd());x.stroke()}
   for(let i=0;i<5;i++){const cx=rnd()*w,cy=rnd()*h;x.strokeStyle='rgba(20,10,4,.22)';for(let r=3;r<18;r+=3){x.beginPath();x.ellipse(cx,cy,r*2.5,r,0,0,TAU);x.stroke()}}noise(x,w,h,.04)}),
 plaster:ctex(256,256,(x,w,h)=>{x.fillStyle='#3a332c';x.fillRect(0,0,w,h);noise(x,w,h,.08,5000)},[4,4]),
 // wool: twill weave and fibre fuzz, neutral so each coat's colour tints it
 wool:ctex(256,256,(x,w,h)=>{x.fillStyle='#9a9a9a';x.fillRect(0,0,w,h);for(let i=-h;i<w;i+=3){x.strokeStyle=`rgba(0,0,0,${.06+rnd()*.06})`;x.lineWidth=1;x.beginPath();x.moveTo(i,0);x.lineTo(i+h,h);x.stroke()}
   for(let i=0;i<2200;i++){x.strokeStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:255},${rnd()<.5?0:255},${.05+rnd()*.07})`;const px=rnd()*w,py=rnd()*h,a=rnd()*TAU;x.beginPath();x.moveTo(px,py);x.lineTo(px+Math.cos(a)*4,py+Math.sin(a)*4);x.stroke()}},[3,3]),
 runner:ctex(256,512,(x,w,h)=>{x.fillStyle='#5a1218';x.fillRect(0,0,w,h);x.fillStyle='#1c2236';x.fillRect(0,0,28,h);x.fillRect(w-28,0,28,h);x.fillStyle='#c79a4a';x.fillRect(30,0,5,h);x.fillRect(w-35,0,5,h);
   for(let y=0;y<h;y+=64){x.save();x.translate(w/2,y+32);x.rotate(Math.PI/4);x.strokeStyle='rgba(199,154,74,.55)';x.lineWidth=3;x.strokeRect(-18,-18,36,36);x.restore()}noise(x,w,h,.07,3000)},[1,4]),
 coir:ctex(512,256,(x,w,h)=>{x.fillStyle='#7a5a32';x.fillRect(0,0,w,h);for(let i=0;i<9000;i++){x.fillStyle=`rgba(${rnd()<.5?40:170},${rnd()<.5?24:120},${rnd()<.5?10:60},${.25+rnd()*.3})`;x.fillRect(rnd()*w,rnd()*h,1,2+rnd()*3)}
   x.fillStyle='rgba(30,18,8,.6)';x.font='bold 54px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillText('BLACKWOOD',w/2,h/2);x.strokeStyle='rgba(30,18,8,.5)';x.lineWidth=6;x.strokeRect(14,14,w-28,h-28)},[-1,1]),
 // leaded glass, frosted, lit blue from the snow outside
 leaded:ctex(256,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#5a76b8');g.addColorStop(1,'#9ab0e0');x.fillStyle=g;x.fillRect(0,0,w,h);
   for(let i=0;i<1400;i++){x.fillStyle=`rgba(255,255,255,${rnd()*.12})`;x.fillRect(rnd()*w,rnd()*h,2,2)}x.fillStyle='rgba(240,246,255,.55)';x.beginPath();x.moveTo(0,h);for(let i=0;i<=12;i++)x.lineTo(i/12*w,h-30-rnd()*30);x.lineTo(w,h);x.fill();
   x.strokeStyle='#1a1a1e';x.lineWidth=5;for(let i=0;i<=4;i++){x.beginPath();x.moveTo(i*w/4,0);x.lineTo(i*w/4,h);x.stroke()}for(let i=0;i<=6;i++){x.beginPath();x.moveTo(0,i*h/6);x.lineTo(w,i*h/6);x.stroke()}
   x.beginPath();x.moveTo(w/2,h*.2);x.lineTo(w*.75,h/2);x.lineTo(w/2,h*.8);x.lineTo(w*.25,h/2);x.closePath();x.stroke()}),
 // a stag on a misty ridge at dusk; oil-paint dabs
 stag:ctex(512,384,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#3a4a5a');g.addColorStop(.55,'#c89a6a');g.addColorStop(1,'#2a2418');x.fillStyle=g;x.fillRect(0,0,w,h);
   for(const [y0,c] of [[.5,'#4a5568'],[.6,'#3a4048'],[.72,'#2a2a26']]){x.fillStyle=c;x.beginPath();x.moveTo(0,h);let yy=h*y0;x.lineTo(0,yy);for(let i=0;i<=16;i++){yy=h*y0+(rnd()-.5)*h*.08;x.lineTo(i/16*w,yy)}x.lineTo(w,h);x.fill()}
   x.fillStyle='rgba(230,200,160,.25)';for(let i=0;i<5;i++){x.beginPath();x.ellipse(rnd()*w,h*.62,140,14,0,0,TAU);x.fill()}
   x.fillStyle='#16110c';x.save();x.translate(w*.58,h*.7);x.beginPath();x.ellipse(0,0,46,20,0,0,TAU);x.fill();x.beginPath();x.moveTo(30,-6);x.lineTo(52,-50);x.lineTo(64,-52);x.lineTo(48,-4);x.fill();x.beginPath();x.ellipse(60,-56,12,8,-.3,0,TAU);x.fill();
   for(const s of [-1,1]){x.lineWidth=3;x.strokeStyle='#16110c';x.beginPath();x.moveTo(58+s*3,-62);x.lineTo(50+s*14,-92);x.lineTo(40+s*22,-108);x.moveTo(52+s*10,-80);x.lineTo(64+s*14,-96);x.moveTo(46+s*18,-98);x.lineTo(30+s*22,-104);x.stroke()}
   for(const lx of [-34,-22,24,34]){x.fillRect(lx,8,5,40)}x.restore();for(let i=0;i<4000;i++){x.fillStyle=`rgba(${rnd()*255|0},${rnd()*200|0},${rnd()*150|0},.05)`;x.fillRect(rnd()*w,rnd()*h,3+rnd()*5,2+rnd()*3)}}),
 dial:ctex(256,256,(x,w,h)=>{x.fillStyle='#ede3c9';x.fillRect(0,0,w,h);x.translate(w/2,h/2);x.strokeStyle='#1a1410';x.lineWidth=2;x.beginPath();x.arc(0,0,118,0,TAU);x.stroke();x.beginPath();x.arc(0,0,78,0,TAU);x.stroke();
   x.fillStyle='#1a1410';x.font='bold 24px Georgia';x.textAlign='center';x.textBaseline='middle';for(let i=1;i<=12;i++){const a=i/12*TAU;x.save();x.translate(Math.sin(a)*98,-Math.cos(a)*98);x.rotate(a);x.fillText(['I','II','III','IIII','V','VI','VII','VIII','IX','X','XI','XII'][i-1],0,0);x.restore()}
   for(let i=0;i<60;i++){const a=i/60*TAU;x.fillRect(Math.sin(a)*114-1,-Math.cos(a)*114-1,2,2)}x.fillStyle='rgba(120,90,40,.5)';x.beginPath();x.arc(0,-40,22,Math.PI,TAU);x.fill()}),
 // tonight's page of the guest book
 book:ctex(512,320,(x,w,h)=>{x.fillStyle='#ece2c8';x.fillRect(0,0,w,h);const g=x.createLinearGradient(w/2-30,0,w/2+30,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.5,'rgba(60,40,20,.35)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(w/2-30,0,60,h);
   x.strokeStyle='rgba(120,40,40,.4)';x.lineWidth=1;for(let i=0;i<10;i++){const y=50+i*26;x.beginPath();x.moveTo(20,y);x.lineTo(w/2-24,y);x.moveTo(w/2+24,y);x.lineTo(w-20,y);x.stroke()}
   x.fillStyle='#2a2440';x.font='italic 15px Georgia';x.fillText('Blackwood Lodge, 24th December',28,34);const names=[['Harriet Vane','4.10'],['Dr. A. Okafor','4.45'],['Col. R. Ash','5.20'],['Felix Osei','5.25'],['P. Hollander','6.40'],['M. Sol','7.05']];
   names.forEach(([n,t],i)=>{x.font=`italic ${17+(i%3)}px Georgia`;x.save();x.translate(30,70+i*26);x.rotate((rnd()-.5)*.04);x.fillText(n,0,0);x.restore();x.font='14px Georgia';x.fillText(t+' pm',w/2-88,70+i*26)});
   x.fillStyle='rgba(42,36,64,.8)';x.font='italic 15px Georgia';x.fillText('Remarks',w/2+30,34);x.font='italic 16px Georgia';x.fillText('Snowing hard. Road closed',w/2+30,70);x.fillText('below the bridge.',w/2+30,96)}),
 rubber:ctex(128,128,(x,w,h)=>{x.fillStyle='#202022';x.fillRect(0,0,w,h);x.strokeStyle='rgba(255,255,255,.05)';for(let i=0;i<w;i+=8){x.beginPath();x.moveTo(i,0);x.lineTo(i,h);x.stroke()}noise(x,w,h,.04,800)},[4,1]),
 prints:ctex(512,512,(x,w,h)=>{x.clearRect(0,0,w,h);const sole=(cx,cy,a,al)=>{x.save();x.translate(cx,cy);x.rotate(a);x.fillStyle=`rgba(255,255,255,${al})`;x.beginPath();x.ellipse(0,-14,13,22,0,0,TAU);x.fill();x.beginPath();x.ellipse(0,22,10,11,0,0,TAU);x.fill();x.restore()};
   // from the mat: one track to the rack, one toward the stairs; each print fainter as it dries
   for(let i=0;i<5;i++)sole(300+i*34+(i%2?12:-12),470-i*58,-.5,.7-i*.12);for(let i=0;i<6;i++)sole(200-i*30+(i%2?12:-12),470-i*64,.45,.62-i*.1)}),
};
const M=(c,o={})=>new T.MeshStandardMaterial({color:c,roughness:.7,metalness:0,...o});
const woodV=TX.wood.clone();woodV.center.set(.5,.5);woodV.rotation=Math.PI/2;woodV.needsUpdate=true;
const MAT={marble:M('#ffffff',{map:TX.marble,roughness:.26}),paper:M('#ffffff',{map:TX.paper,roughness:.9}),wood:M('#ffffff',{map:TX.wood,roughness:.45}),woodV:M('#ffffff',{map:woodV,roughness:.45}),dark:M('#8a7262',{map:TX.wood,roughness:.4}),darkV:M('#8a7262',{map:woodV,roughness:.4}),
  ceil:M('#ffffff',{map:TX.plaster,roughness:1}),brass:M('#c9a24a',{metalness:.85,roughness:.3}),iron:M('#1a1a1c',{metalness:.6,roughness:.45}),runner:M('#ffffff',{map:TX.runner,roughness:.95}),gilt:M('#b8913c',{metalness:.7,roughness:.36}),
  frost:M('#ffffff',{map:TX.leaded,emissive:'#ffffff',emissiveMap:TX.leaded,emissiveIntensity:.55,roughness:.3}),glow:M('#f0d8b0',{emissive:'#ffb860',emissiveIntensity:1.2,roughness:.5}),wet:new T.MeshPhysicalMaterial({color:'#0a0c10',roughness:.04,transparent:true,opacity:.42,clearcoat:1,depthWrite:false}),
  snow:M('#e8eef8',{roughness:.9}),paperP:M('#ece2c8',{roughness:.9})};
const add=(geo,mat,x,y,z,o={})=>{const m=new T.Mesh(geo,mat);m.position.set(x,y,z);if(o.ry)m.rotation.y=o.ry;if(o.rx)m.rotation.x=o.rx;if(o.rz)m.rotation.z=o.rz;m.castShadow=o.cast!==false;m.receiveShadow=true;(o.to||scene).add(m);return m};
const RB=(w,h,d,r=.02,s=3)=>new T.RoundedBoxGeometry(w,h,d,s,Math.max(.0005,Math.min(r,w/2-.001,h/2-.001,d/2-.001)));
const BOX=(w,h,d)=>new T.BoxGeometry(w,h,d);
const lathe=(pts,seg=32)=>new T.LatheGeometry(pts.map(p=>new T.Vector2(p[0],p[1])),seg);
/* ---------- the hall: 5 m wide, 7.2 m deep, 5.2 m to the beams; the gallery runs across the near end ---------- */
const W=5,D=7.2,H=5.2,hw=W/2,GY=2.8,GZ=1.3;
const plane=(w,h,mat,x,y,z,ry=0,rx=0)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),mat);m.position.set(x,y,z);m.rotation.set(rx,ry,0);m.receiveShadow=true;scene.add(m);return m};
plane(W,D,MAT.marble,0,0,D/2,0,-Math.PI/2);plane(W,D,MAT.ceil,0,H,D/2,0,Math.PI/2);
plane(D,H,MAT.paper,-hw,H/2,D/2,Math.PI/2);plane(D,H,MAT.paper,hw,H/2,D/2,-Math.PI/2);plane(W,H,MAT.paper,0,H/2,D,Math.PI);plane(W,H,MAT.paper,0,H/2,0,0);
// ceiling beams and a picture rail
for(let z=.6;z<D;z+=1.2)add(RB(W,.26,.2,.015),MAT.dark,0,H-.13,z,{cast:false});add(RB(.24,.3,D,.015),MAT.dark,0,H-.15,D/2,{cast:false});
// oak panelling to 1.3 m on the three visible walls, with raised fields
const PH=1.3;const wallRun=(len,cx,cz,axis,skip)=>{const sx=axis==='x';const at=(u,y,w,h,d,mat,off)=>add(sx?RB(w,h,d,.008):RB(d,h,w,.008),mat,sx?cx+u:cx+off,y,sx?cz+off:cz+u,{cast:false});
  const n=Math.max(1,Math.round(len/.62)),pw=len/n;for(let i=0;i<n;i++){const u=-len/2+pw*(i+.5);if(skip&&skip(sx?cx+u:cz+u))continue;at(u,PH/2+.08,pw-.012,PH-.2,.02,MAT.darkV,0);at(u,PH/2+.08,pw-.14,PH-.34,.03,MAT.dark,0)}
  at(0,PH-.01,len,.06,.06,MAT.dark,0);at(0,.08,len,.16,.045,MAT.dark,0)};
const DXc=-.75,DWo=1.5,DHo=2.45,SLw=.32;// front door centre, opening, height, sidelight width
const inDoor=v=>v>DXc-DWo/2-SLw-.12&&v<DXc+DWo/2+SLw+.12;
wallRun(W,0,D-.012,'x',inDoor);wallRun(D-GZ-.3,hw-.012,(D+GZ+.3)/2,'z');wallRun(1.9,-hw+.012,D-.95,'z');
/* ---------- the gallery: floor, fascia, turned balusters ---------- */
add(BOX(W,.24,GZ),MAT.dark,0,GY-.12,GZ/2);add(RB(W,.08,.06,.01),MAT.dark,0,GY-.06,GZ+.01);add(RB(W,.05,.08,.01),MAT.dark,0,GY-.22,GZ+.015);
const balG=lathe([[0,0],[.032,0],[.032,.05],[.022,.07],[.018,.14],[.03,.26],[.034,.34],[.02,.46],[.016,.6],[.024,.66],[.03,.7],[.03,.74],[0,.74]],16);
for(let x=-1.42+.12;x<hw-.1;x+=.15)add(balG,MAT.wood,x,GY,GZ-.05);add(RB(W-1.1,.07,.11,.02),MAT.dark,.55,GY+.775,GZ-.05);add(RB(W-1.1,.04,.08,.01),MAT.dark,.55,GY+.02,GZ-.05);
for(const x of [-1.42,1.0,hw-.06])add(RB(.12,1.0,.12,.01),MAT.dark,x,GY+.5,GZ-.05);
/* ---------- the staircase: down the left wall from the gallery, closed string, runner and brass rods ---------- */
const SX0=-hw,SX1=-1.45,SN=16,SR=GY/SN,SRun=.24,SZb=GZ+SN*SRun,SXc=(SX0+SX1)/2,SWd=SX1-SX0;
const rodM=MAT.brass;for(let k=1;k<=SN;k++){const z0=SZb-k*SRun,y=k*SR;add(BOX(SWd,y,SRun),MAT.darkV,SXc,y/2,z0+SRun/2,{cast:k===SN});
  add(RB(SWd+.02,.035,SRun+.035,.008),MAT.wood,SXc+.01,y-.017,z0+SRun/2-.017);
  const rn=add(new T.PlaneGeometry(.72,SRun+.01),MAT.runner,SXc+.04,y+.0015,z0+SRun/2-.02,{rx:-Math.PI/2,cast:false});
  add(new T.PlaneGeometry(.72,SR-.03),MAT.runner,SXc+.04,y-SR/2-.018,z0+SRun-.0005+.0,{cast:false});
  add(new T.CylinderGeometry(.007,.007,.8,10),rodM,SXc+.04,y-SR+.012,z0+SRun-.012,{rz:Math.PI/2,cast:false})}
// the panelled side of the stair, following the rake
{const sh=new T.Shape();sh.moveTo(0,0);sh.lineTo(SZb-GZ,0);sh.lineTo(SZb-GZ,.02);sh.lineTo(0,GY);sh.lineTo(0,0);const g=new T.ExtrudeGeometry(sh,{depth:.02,bevelEnabled:false});g.rotateY(-Math.PI/2);add(g,MAT.darkV,SX1+.02,0,GZ,{cast:false});
 const L=Math.hypot(SZb-GZ,GY),ang=Math.atan2(GY,SZb-GZ);const str=add(RB(.06,.22,L,.01),MAT.dark,SX1+.03,GY/2+.04,(GZ+SZb)/2,{rx:ang});
 const rail=add(RB(.08,.07,L+.1,.02),MAT.dark,SX1+.0,GY/2+.98,(GZ+SZb)/2,{rx:ang});
 for(let k=1;k<=SN;k++){const z0=SZb-k*SRun;for(const f of [.3,.75]){const zz=z0+SRun*f;const yb=k*SR;const yr=GY*(SZb-zz)/(SZb-GZ)+.98-.04;add(new T.CylinderGeometry(.018,.022,yr-yb,10),MAT.wood,SX1+.0,(yb+yr)/2,zz,{})}}
 // newel post with a lamp: the warm light at the foot of the stairs
 const NZ=SZb-.06;add(RB(.18,1.15,.18,.02),MAT.dark,SX1+.0,.575,NZ);add(RB(.22,.08,.22,.02),MAT.dark,SX1,1.19,NZ);add(RB(.16,.06,.16,.02),MAT.dark,SX1,1.26,NZ);
 add(lathe([[0,0],[.05,0],[.05,.02],[.02,.04],[.014,.2],[.03,.22],[0,.22]]),MAT.brass,SX1,1.29,NZ);add(new T.SphereGeometry(.085,32,20),MAT.glow,SX1,1.6,NZ,{cast:false});
 for(const [a,b] of [[-1,0],[1,0],[0,-1],[0,1]])add(RB(.11,.5,.012,.004),MAT.dark,SX1+a*.1,.6,NZ+b*.1,{ry:b?0:Math.PI/2,cast:false})}
/* ---------- the front door: a pair of oak leaves, iron straps, leaded sidelights and fanlight ---------- */
const DZw=D-.01;add(BOX(DWo+2*SLw+.06,DHo+.02,.01),M('#050404'),DXc,DHo/2,D-.003,{cast:false});
for(const e of [-1,1]){const lf=new T.Group();lf.position.set(DXc+e*DWo/4,0,D-.05);scene.add(lf);
  for(let i=0;i<5;i++)add(RB(DWo/2/5-.004,DHo-.02,.06,.006),MAT.darkV,(-DWo/4+DWo/20+i*DWo/10),DHo/2,0,{to:lf});
  for(const y of [.35,1.25,2.1]){add(RB(DWo/2-.06,.05,.012,.004),MAT.iron,e*.02,y,-.034,{to:lf});for(let k=0;k<5;k++)add(new T.SphereGeometry(.011,10,8),MAT.iron,-DWo/4+.08+k*(DWo/2-.16)/4,y,-.04,{to:lf})}
  add(RB(.03,.3,.012,.004),MAT.iron,-e*(DWo/4-.08),1.1,-.035,{to:lf});const ring=add(new T.TorusGeometry(.06,.009,10,28),MAT.iron,-e*(DWo/4-.08),1.0,-.05,{to:lf})}
// sidelights and the fanlight
for(const e of [-1,1]){const x=DXc+e*(DWo/2+SLw/2+.02);add(new T.PlaneGeometry(SLw,DHo-.5),MAT.frost,x,(DHo-.5)/2+.4,D-.02,{ry:Math.PI,cast:false});add(RB(SLw+.04,.4,.06,.01),MAT.darkV,x,.2,D-.04);
  for(const y of [.4,DHo])add(RB(SLw+.06,.05,.08,.01),MAT.dark,x,y,D-.04)}
{const sh=new T.Shape();sh.absarc(0,0,DWo/2+SLw,0,Math.PI,false);sh.lineTo(-DWo/2-SLw,0);const fg=new T.ShapeGeometry(sh,32);const pos=fg.attributes.position,uv=fg.attributes.uv;for(let i=0;i<pos.count;i++)uv.setXY(i,(pos.getX(i)+1.1)/2.2,pos.getY(i)/1.1);
 const fan=add(fg,MAT.frost,DXc,DHo+.05,D-.02,{ry:Math.PI,cast:false});fan.scale.set(1,.62,1);
 for(let k=0;k<=8;k++){const a=k/8*Math.PI,r=DWo/2+SLw;const bar=add(BOX(.022,r,.03),MAT.dark,DXc-Math.cos(a)*r/2,DHo+.05+Math.sin(a)*r*.62/2,D-.03,{});bar.rotation.z=-(Math.PI/2-Math.atan2(Math.sin(a)*.62,Math.cos(a)));bar.scale.y=Math.hypot(Math.cos(a),Math.sin(a)*.62)}
 const arcG=new T.TorusGeometry(DWo/2+SLw,.03,10,48,Math.PI);const arc=add(arcG,MAT.dark,DXc,DHo+.05,D-.035,{});arc.scale.set(1,.62,1);const arc2=add(new T.TorusGeometry(.25,.025,8,32,Math.PI),MAT.dark,DXc,DHo+.05,D-.035,{});arc2.scale.set(1,.62,1)}
// casing round the whole doorway
for(const [w,d] of [[.16,.07],[.1,.09]]){const ow=DWo+2*SLw+.06;for(const e of [-1,1])add(RB(w,DHo+.75,d,.008),MAT.darkV,DXc+e*(ow/2+w/2),(DHo+.75)/2,D-d/2);add(RB(ow+2*w,w,d,.008),MAT.dark,DXc,DHo+.75+w/2,D-d/2)}
/* ---------- coir mat, snow melting off it, wet prints on the marble ---------- */
add(RB(1.3,.022,.7,.006),M('#a8927a',{map:TX.coir,roughness:1}),DXc,.011,D-.48);
{const slush=M('#b8c2d2',{roughness:.35});for(let i=0;i<9;i++){const s=.012+rnd()*.022;const m=add(new T.IcosahedronGeometry(s,2),slush,DXc-.45+rnd()*.9,.022,D-.72+rnd()*.45,{cast:false});m.scale.set(1+rnd()*.8,.28,1+rnd()*.5);m.rotation.y=rnd()*3;const p=m.geometry.attributes.position;for(let k=0;k<p.count;k++)p.setXYZ(k,p.getX(k)*(1+(rnd()-.5)*.3),p.getY(k),p.getZ(k)*(1+(rnd()-.5)*.3));m.geometry.computeVertexNormals()}}
{const pud=ctex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);for(let i=0;i<7;i++){const g=x.createRadialGradient(w/2+(rnd()-.5)*120,h/2+(rnd()-.5)*90,0,w/2,h/2,60+rnd()*50);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h)}});
 const wetM=new T.MeshPhysicalMaterial({color:'#0c0e12',roughness:.03,clearcoat:1,transparent:true,alphaMap:pud,depthWrite:false,opacity:.75});
 const p=new T.Mesh(new T.PlaneGeometry(1.7,.9),wetM);p.rotation.x=-Math.PI/2;p.position.set(DXc,.0015,D-.95);scene.add(p);
 const prM=new T.MeshPhysicalMaterial({color:'#0a0c10',roughness:.05,clearcoat:1,transparent:true,alphaMap:TX.prints,depthWrite:false,opacity:.8});(_H.hook||(()=>{}))('prints',prM);const pr=new T.Mesh(new T.PlaneGeometry(2.6,2.6),prM);pr.rotation.x=-Math.PI/2;pr.position.set(DXc+.2,.0018,D-2.3);scene.add(pr)}
/* ---------- the coat rack: the house's identity parade ---------- */
const RX0=.62,RX1=2.42,RY=1.92,RZ=D-.03;
add(RB(RX1-RX0+.12,.16,.04,.012),MAT.dark,(RX0+RX1)/2,RY,RZ-.02);add(RB(RX1-RX0+.18,.04,.26,.01),MAT.dark,(RX0+RX1)/2,RY+.2,RZ-.13);for(const x of [RX0,RX1])add(RB(.04,.2,.24,.008),MAT.dark,x-.03*(x===RX0?-1:1),RY+.08,RZ-.12);
for(let k=0;k<4;k++)add(new T.CylinderGeometry(.006,.006,RX1-RX0+.1,8),MAT.brass,(RX0+RX1)/2,RY+.225,RZ-.04-k*.06,{rz:Math.PI/2,cast:false});
for(let k=0;k<6;k++){const hx=RX0+.14+k*.3;add(lathe([[0,0],[.018,0],[.018,.01],[0,.01]],20),MAT.brass,hx,RY+.04,RZ-.04,{rx:-Math.PI/2});add(new T.CylinderGeometry(.007,.007,.07,10),MAT.brass,hx,RY+.04,RZ-.08,{rx:Math.PI/2})}
const woolM=c=>M(c,{map:TX.wool,roughness:.95,vertexColors:true});
function coatBody(L,wet){const g=new T.CylinderGeometry(1,1,1,44,56,true);const p=g.attributes.position;const col=[];
  const keys=[[0,.24],[.25,.228],[.5,.212],[.66,.218],[.8,.236],[.88,.245],[.93,.2],[.97,.12],[1,.07]];
  const rAt=v=>{for(let i=1;i<keys.length;i++){if(v<=keys[i][0]){const [v0,r0]=keys[i-1],[v1,r1]=keys[i];const t=(v-v0)/(v1-v0),s=t*t*(3-2*t);return r0+(r1-r0)*s}}return .07};
  for(let i=0;i<p.count;i++){const v=p.getY(i)+.5;const a=Math.atan2(p.getZ(i),p.getX(i));let r=rAt(v);
    const fc=1-Math.exp(-Math.pow(a-Math.PI/2,2)/.12);r+=(.006+.022*Math.pow(1-v,1.4))*Math.sin(a*8+1.7*Math.sin(v*4))*(v<.8?1:.3)*fc;
    let x=Math.cos(a)*r,z=Math.sin(a)*r;const ds=.52+.12*(1-v);z*=z<0?.32:ds;z+=r*.34+.02;
    // the hook pulls the collar up and back
    if(v>.9){z-=(v-.9)*.25}
    p.setXYZ(i,x,-L*(1-v),z);const k=wet&&v<.07?.55+.45*(v/.07):1;col.push(k,k,k)}
  g.setAttribute('color',new T.Float32BufferAttribute(col,3));g.computeVertexNormals();return {g,rAt,zFront:v=>{const r=rAt(v);const ds=.52+.12*(1-v);return r*ds+r*.34+.02-(v>.9?(v-.9)*.25:0)}}}
const hornT=ctex(128,128,(x,w,h)=>{x.fillStyle='#8a8a8a';x.fillRect(0,0,w,h);for(let i=0;i<26;i++){x.strokeStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:255},${rnd()<.5?0:255},${.08+rnd()*.14})`;x.lineWidth=1+rnd()*4;x.beginPath();x.arc(w/2+rnd()*20-10,h/2+rnd()*20-10,10+rnd()*60,rnd()*TAU,rnd()*TAU+2);x.stroke()}});
function button(col,r){const g=new T.Group();const mat=new T.MeshPhysicalMaterial({color:col,map:hornT,roughness:.4,clearcoat:.6,clearcoatRoughness:.25});const sh=new T.Shape();sh.absarc(0,0,r,0,TAU,false);for(const [hx,hy] of [[-1,-1],[1,-1],[1,1],[-1,1]]){const hp=new T.Path();hp.absarc(hx*r*.25,hy*r*.25,r*.1,0,TAU,true);sh.holes.push(hp)}
  add(new T.ExtrudeGeometry(sh,{depth:r*.13,bevelEnabled:true,bevelThickness:r*.07,bevelSize:r*.07,bevelSegments:3,curveSegments:28}),mat,0,0,0,{to:g,cast:false});add(new T.TorusGeometry(r*.8,r*.09,8,32),mat,0,0,r*.2,{to:g,cast:false});
  const th=M('#111',{roughness:.9});add(BOX(r*.7,r*.08,r*.06),th,0,0,r*.24,{to:g,cast:false,rz:Math.PI/4});add(BOX(r*.7,r*.08,r*.06),th,0,0,r*.24,{to:g,cast:false,rz:-Math.PI/4});return g}
const COATS=[];
function coat(x,col,o={}){const L=o.L||1.08,grp=new T.Group();(_H.hook||(()=>{}))('coat',grp,{x,col,o});grp.position.set(x,RY+.04,RZ-.05-(o.dz||0));grp.rotation.y=Math.PI+(o.ry||0);grp.rotation.z=o.rz||0;grp.scale.x=.86;scene.add(grp);
  const bodyM=woolM(col),{g,zFront}=coatBody(L,o.wet);add(g,bodyM,0,0,0,{to:grp}).material.side=T.DoubleSide;const mat=M(col,{map:TX.wool,roughness:.95});
  const darker=new T.Color(col).multiplyScalar(.75);const matD=M(darker,{map:TX.wool,roughness:.95});
  // collar: turned up where the hook has it
  const col1=add(new T.TorusGeometry(.085,.032,10,28,Math.PI*1.25),mat,0,-.085,.09,{to:grp});col1.rotation.set(-Math.PI/2+.25,0,-Math.PI*.125-Math.PI/2+Math.PI);col1.scale.set(1,.9,1);
  // lapels: two folded flaps forming the V
  for(const s of [-1,1]){const sh=new T.Shape();sh.moveTo(0,0);sh.lineTo(s*.11,-.03);sh.lineTo(s*.075,-.12);sh.lineTo(s*.012,-.33);sh.lineTo(0,-.33);sh.lineTo(0,0);const lg=new T.ExtrudeGeometry(sh,{depth:.012,bevelEnabled:true,bevelThickness:.004,bevelSize:.004,bevelSegments:2});
    const lp=add(lg,mat,s*.012,-L*(1-.95),zFront(.9)-.012,{to:grp});lp.rotation.x=-.1}
  // front edge and buttons, down the centre
  add(BOX(.008,L*.62,.006),matD,0,-L*(1-.6)-L*.3+.02,zFront(.45)+.001,{to:grp,cast:false}).scale.z=1;
  const bvs=[.66,.52,.38,.24];bvs.forEach((v,i)=>{if(o.missing===i){// torn: thread ends and a small rip where it was
      const th=M('#0c1a10',{roughness:.95});for(const [dx,dy,a] of [[-.004,.003,.5],[.004,-.002,-.7],[0,.004,1.6]])add(new T.CylinderGeometry(.0011,.0011,.024,5),th,.016+dx,-L*(1-v)+dy,zFront(v)+.006,{to:grp,rz:a,rx:Math.PI/2*.7,cast:false});
      add(new T.CircleGeometry(.012,12),M(new T.Color(col).multiplyScalar(.4),{roughness:1}),.016,-L*(1-v),zFront(v)+.004,{to:grp,cast:false});return}
    const b=button(o.btn||col,.0145);b.position.set(.016,-L*(1-v),zFront(v)+.006);grp.add(b)});
  // pockets
  for(const s of [-1,1])add(RB(.13,.045,.016,.006),mat,s*.125,-L*(1-.3),zFront(.3)*.86,{to:grp,ry:-s*.32});
  // sleeves: hang from the shoulders, slightly forward, with turned cuffs
  for(const s of [-1,1]){const sx=s*.235;add(new T.SphereGeometry(.056,20,14),mat,sx*.92,-L*(1-.86)-.02,zFront(.86)*.5,{to:grp}).scale.set(1,.8,1);
    const sl=add(new T.CylinderGeometry(.068,.06,.58,22,6,true),mat,sx+s*.012,-L*(1-.86)-.29,zFront(.6)*.55,{to:grp,rx:-.1,rz:s*.03});sl.material.side=T.DoubleSide;
    const cuffM=o.wet?new T.MeshStandardMaterial({color:new T.Color(col).multiplyScalar(.5),map:TX.wool,roughness:.45}):matD;
    add(new T.CylinderGeometry(.064,.064,.075,22,1,true),cuffM,sx+s*.018,-L*(1-.86)-.56,zFront(.6)*.55+.03,{to:grp,rx:-.1,rz:s*.03}).material.side=T.DoubleSide;
    add(new T.CircleGeometry(.058,18),M('#0a0a0a'),sx+s*.019,-L*(1-.86)-.598,zFront(.6)*.55+.034,{to:grp,rx:Math.PI/2-.1,cast:false})}
  // hook
  
  COATS.push(grp);return grp}
// left to right: camel, green, navy, burgundy, green, charcoal. The second green is short a button and wet at the cuffs and hem.
const GREEN='#24452e';
coat(RX0+.14,'#7a5a36',{ry:.06,dz:.09});coat(RX0+.44,GREEN,{ry:-.05,dz:0,btn:GREEN});coat(RX0+.74,'#161e34',{ry:.04,dz:.09,L:1.12});
coat(RX0+1.04,'#46141e',{ry:-.06,dz:0,L:1.0});coat(RX0+1.34,GREEN,{ry:.05,dz:.09,btn:GREEN,missing:1,wet:true});coat(RX0+1.64,'#232327',{ry:-.04,dz:0,L:1.14});
// drips under the wet coat
{for(let i=0;i<5;i++){const m=add(new T.SphereGeometry(.006,10,8),MAT.wet,RX0+1.34+(rnd()-.5)*.25,.05,RZ-.25+(rnd()-.5)*.1,{cast:false});m.scale.y=.25}}
// hats on the shelf
{const felt=c=>M(c,{map:TX.wool,roughness:.9});const fed=new T.Group();fed.position.set(RX0+.4,RY+.225,RZ-.15);scene.add(fed);add(lathe([[0,0],[.17,0],[.175,.008],[.16,.018],[.1,.02],[.095,.12],[.07,.135],[0,.12]],40),felt('#3a3028'),0,0,0,{to:fed});add(new T.CylinderGeometry(.097,.1,.025,40,1,true),M('#14100c'),0,.035,0,{to:fed});
 const cl=new T.Group();cl.position.set(RX0+1.3,RY+.225,RZ-.15);scene.add(cl);add(lathe([[0,0],[.13,0],[.12,.02],[.105,.1],[.08,.14],[0,.15]],40),felt('#5a1c28'),0,0,0,{to:cl});add(new T.TorusGeometry(.115,.008,8,30),M('#1a1a1a'),0,.035,0,{to:cl,rx:Math.PI/2})}
/* ---------- boot tray: who went out is written in meltwater ---------- */
const BTX=(RX0+RX1)/2,BTZ=D-.3;add(RB(RX1-RX0+.06,.03,.42,.01),M('#ffffff',{map:TX.rubber,roughness:.55}),BTX,.015,BTZ);for(const [w,d,x,z] of [[RX1-RX0+.06,.02,BTX,BTZ-.2],[RX1-RX0+.06,.02,BTX,BTZ+.2],[.02,.42,RX0-.02,BTZ],[.02,.42,RX1+.04,BTZ]])add(RB(w,.05,d,.006),M('#18181a',{roughness:.5}),x,.035,z);
const soleShape=(fl,fw)=>{const s=new T.Shape(),h=fw/2;s.moveTo(0,-.02);s.bezierCurveTo(h*.95,-.02,h*.95,.06,h*.8,.1);s.bezierCurveTo(h*.7,fl*.45,h*1.05,fl*.62,h,fl*.8);s.bezierCurveTo(h*.95,fl+.0,-h*.95,fl+.0,-h,fl*.8);s.bezierCurveTo(-h*1.05,fl*.62,-h*.7,fl*.45,-h*.8,.1);s.bezierCurveTo(-h*.95,.06,-h*.95,-.02,0,-.02);return s};
function boot(kind,col,wet){const g=new T.Group();const leather=kind!=='well'&&kind!=='galosh';const mat=M(col,{roughness:wet?.16:(leather?.42:.3),metalness:0});const sole=M('#100d0b',{roughness:.65});
  const P={hike:{sh:.17,fl:.29,fw:.1,heel:.025,r:.058},well:{sh:.36,fl:.3,fw:.105,heel:.02,r:.07},ride:{sh:.42,fl:.28,fw:.09,heel:.035,r:.06},ankle:{sh:.12,fl:.24,fw:.075,heel:.065,r:.045},felt:{sh:.26,fl:.28,fw:.1,heel:.02,r:.066},galosh:{sh:.1,fl:.3,fw:.105,heel:.02,r:.06}}[kind];
  // sole, following a foot outline; a block heel
  const sg=new T.ExtrudeGeometry(soleShape(P.fl,P.fw),{depth:.016,bevelEnabled:true,bevelThickness:.003,bevelSize:.003,bevelSegments:2,curveSegments:16});sg.rotateX(Math.PI/2);add(sg,sole,0,P.heel+.016,-.05,{to:g});
  if(P.heel>.03){const hg=new T.CylinderGeometry(.022,.018,P.heel,16);add(hg,sole,0,P.heel/2,-.025,{to:g})}else add(RB(P.fw*.8,P.heel,.07,.006),sole,0,P.heel/2,-.02,{to:g});
  // the vamp: a long rounded toe swelling up into the ankle
  const v=add(new T.SphereGeometry(1,32,20,0,TAU,0,Math.PI/2),mat,0,P.heel+.016,P.fl*.48-.05,{to:g});v.scale.set(P.fw*.48,Math.min(.075,P.fl*.24),P.fl*.44);
  // the shaft: turned, flaring at the top
  const prof=[[0,0],[P.r*1.0,0],[P.r*.92,P.sh*.25],[P.r*.98,P.sh*.7],[P.r*1.12,P.sh],[P.r*1.04,P.sh],[P.r*.9,P.sh*.95],[0,P.sh*.95]];
  const sh=add(lathe(prof,28),mat,0,P.heel+.02,-.0,{to:g});sh.scale.z=.82;
  add(new T.CircleGeometry(P.r*.92,24),M('#0a0806'),0,P.heel+.02+P.sh*.95+.001,0,{to:g,rx:-Math.PI/2,cast:false}).scale.y=.82;
  if(kind==='hike'){for(let k=0;k<5;k++)add(BOX(.05,.004,.005),M('#c8bfa4'),0,P.heel+.07+k*.028,.052-k*.004,{to:g,rx:-.5,cast:false});add(new T.TorusGeometry(P.r*1.08,.012,8,24),M('#5a3a22',{roughness:.8}),0,P.heel+.02+P.sh,0,{to:g,rx:Math.PI/2})}
  if(kind==='felt')add(new T.TorusGeometry(P.r*1.1,.016,8,24),M('#d8d0c0',{roughness:1}),0,P.heel+.02+P.sh,0,{to:g,rx:Math.PI/2});
  if(kind==='ride')add(RB(.03,.02,.012,.004),MAT.brass,P.r*.9,P.heel+.06,-.0,{to:g});
  if(kind==='galosh')for(let k=0;k<3;k++)add(RB(.03,.012,.008,.003),MAT.iron,P.r*.85,P.heel+.03+k*.03,.02,{to:g,ry:.4});
  if(wet){for(let i=0;i<7;i++){const s=.01+rnd()*.016;const m=add(new T.IcosahedronGeometry(s,1),MAT.snow,(rnd()-.5)*P.fw,P.heel+.025+rnd()*.03,P.fl*.55-.05+rnd()*.1,{to:g,cast:false});m.scale.y=.55}}
  return g}
const pairs=[['ride','#3e2414',false],['hike','#3a2416',true],['well','#141a18',false],['ankle','#22090c',false],['felt','#4a4846',true],['galosh','#0e0e0e',false]];
pairs.forEach(([k,c,wet],i)=>{const x=RX0+.15+i*.3;for(const e of [-1,1]){const b=boot(k,c,wet);b.position.set(x+e*.062,.03,BTZ+.08);b.rotation.y=Math.PI+(rnd()-.5)*.25;if(k==='ride'&&e>0){b.rotation.z=1.4;b.position.set(x+.1,.075,BTZ+.04)}scene.add(b)}
  if(wet){const p=new T.Mesh(new T.CircleGeometry(.16,24),MAT.wet);p.rotation.x=-Math.PI/2;p.scale.set(1,.8,1);p.position.set(x,.031,BTZ-.08);scene.add(p);p.material=MAT.wet.clone();(_H.hook||(()=>{}))('puddle',p)}});
/* ---------- umbrella stand, walking stick ---------- */
{const ux=-2.15,uz=D-.32;add(lathe([[0,0],[.13,0],[.135,.04],[.12,.08],[.12,.5],[.135,.53],[.13,.56],[.11,.56],[.11,.06],[0,.06]],36),M('#1e3a4a',{roughness:.25}),ux,0,uz);for(const y of [.1,.48])add(new T.TorusGeometry(.124,.008,8,36),MAT.brass,ux,y,uz,{rx:Math.PI/2});
 const um=(dx,dz,rx,rz,c)=>{const g=new T.Group();g.position.set(ux+dx,.06,uz+dz);g.rotation.set(rx,0,rz);scene.add(g);add(lathe([[0,0],[.008,0],[.03,.12],[.042,.5],[.03,.72],[.007,.8],[0,.8]],18),M(c,{roughness:.6}),0,0,0,{to:g});const hk=new T.TorusGeometry(.04,.01,8,20,Math.PI);add(hk,M('#3a2414',{roughness:.4}),.04,.88,0,{to:g});add(new T.CylinderGeometry(.008,.008,.1,8),M('#3a2414'),0,.83,0,{to:g})};
 um(-.03,0,.06,.1,'#141414');um(.03,.02,-.08,-.12,'#2a3a2a');{const g=new T.Group();g.position.set(ux,.06,uz-.03);g.rotation.set(.05,0,-.04);scene.add(g);add(new T.CylinderGeometry(.011,.009,.92,10),M('#3a2414',{roughness:.35}),0,.46,0,{to:g});add(new T.SphereGeometry(.025,14,10),MAT.brass,0,.93,0,{to:g})}}
/* ---------- grandfather clock: keeps time ---------- */
const CK=new T.Group();CK.position.set(-hw+.17,0,5.95);CK.rotation.y=Math.PI/2;scene.add(CK);
add(RB(.52,.32,.3,.015),MAT.dark,0,.16,0,{to:CK});add(RB(.42,1.2,.25,.015),MAT.dark,0,.92,0,{to:CK});add(RB(.5,.06,.29,.01),MAT.dark,0,1.55,0,{to:CK});add(RB(.5,.58,.3,.015),MAT.dark,0,1.86,0,{to:CK});
for(const [w,y] of [[.54,2.18],[.44,2.24],[.3,2.3],[.14,2.36]])add(RB(w,.06,.3,.01),MAT.dark,0,y,0,{to:CK});add(new T.SphereGeometry(.03,14,10),MAT.brass,0,2.42,0,{to:CK});
add(new T.CircleGeometry(.19,48),M('#ffffff',{map:TX.dial,roughness:.35}),0,1.86,.152,{to:CK,cast:false});add(new T.TorusGeometry(.19,.012,10,48),MAT.brass,0,1.86,.152,{to:CK});
const hand=(len,w,ang)=>{const h=add(BOX(w,len,.003),M('#14100c',{roughness:.4}),0,0,0,{to:CK,cast:false});h.geometry.translate(0,len/2-.012,0);h.position.set(0,1.86,.158);h.rotation.z=-ang;return h};hand(.1,.009,(10+5/60)/12*TAU);hand(.15,.006,5/60*TAU);
// trunk door with glass, pendulum swinging behind it
add(RB(.26,.82,.02,.006),MAT.darkV,0,.98,.13,{to:CK});add(new T.PlaneGeometry(.18,.66),M('#08080a'),0,.98,.141,{to:CK,cast:false});
const pend=new T.Group();pend.position.set(0,1.32,.146);CK.add(pend);add(new T.CylinderGeometry(.004,.004,.52,6),MAT.brass,0,-.26,0,{to:pend,cast:false});add(new T.CylinderGeometry(.055,.055,.012,32),MAT.brass,0,-.53,0,{to:pend,rx:Math.PI/2,cast:false});
add(new T.PlaneGeometry(.18,.66),new T.MeshPhysicalMaterial({color:'#dfe9f2',roughness:.05,transparent:true,opacity:.12,clearcoat:1}),0,.98,.152,{to:CK,cast:false});
ANIM.push((dt,t)=>{pend.rotation.z=Math.sin(t*Math.PI)*.1});
/* ---------- guest book on its stand ---------- */
{const gb=new T.Group();gb.position.set(.1,0,5.75);gb.rotation.y=Math.PI+.25;scene.add(gb);add(lathe([[0,0],[.16,0],[.16,.02],[.12,.035],[.03,.05],[.025,.9],[.04,.95],[0,.95]],32),MAT.brass,0,0,0,{to:gb});
 const top=new T.Group();top.position.set(0,1.0,0);top.rotation.x=-.42;gb.add(top);add(RB(.5,.03,.36,.01),MAT.dark,0,0,0,{to:top});add(RB(.5,.02,.03,.006),MAT.dark,0,.025,.17,{to:top});
 for(const s of [-1,1]){const pg=add(RB(.215,.018,.3,.004),MAT.paperP,s*.112,.025,-.0,{to:top,rz:s*.04})}add(RB(.46,.012,.32,.004),M('#3a1a12',{roughness:.5}),0,.014,0,{to:top});
 const pp=new T.Mesh(new T.PlaneGeometry(.44,.29),M('#c8bea8',{map:TX.book,roughness:.85}));pp.rotation.x=-Math.PI/2;pp.position.set(0,.036,0);top.add(pp);
 const pen=new T.Group();pen.position.set(.12,.045,.03);pen.rotation.y=.6;top.add(pen);add(new T.CylinderGeometry(.0055,.0055,.13,12),M('#0e0e10',{roughness:.2}),0,0,0,{to:pen,rz:Math.PI/2});add(new T.CylinderGeometry(.006,.006,.02,12),MAT.gilt,.06,0,0,{to:pen,rz:Math.PI/2})}
/* ---------- the stag over the rack, lit by a picture light ---------- */
{const cx=(RX0+RX1)/2,cy=3.25;add(RB(1.42,1.08,.06,.02),MAT.gilt,cx,cy,D-.04);add(RB(1.3,.96,.07,.01),M('#5a4420',{metalness:.6,roughness:.4}),cx,cy,D-.045);
 const pm=new T.Mesh(new T.PlaneGeometry(1.2,.88),M('#ffffff',{map:TX.stag,roughness:.6}));pm.position.set(cx,cy,D-.085);pm.rotation.y=Math.PI;scene.add(pm);
 add(RB(.5,.035,.05,.012),MAT.brass,cx,cy+.62,D-.2);add(new T.CylinderGeometry(.008,.008,.18,8),MAT.brass,cx,cy+.62,D-.1,{rx:Math.PI/2})}
/* ---------- chandelier: tiered Deco, frosted glass ---------- */
const CH=new T.Group();CH.position.set(.25,H-.62,2.9);scene.add(CH);add(new T.CylinderGeometry(.008,.008,.5,6),MAT.brass,0,.5,0,{to:CH,cast:false});
for(const [r,y,h] of [[.42,0,.14],[.3,.16,.12],[.18,.3,.1]]){add(new T.CylinderGeometry(r,r,h,48,1,true),MAT.glow,0,y,0,{to:CH,cast:false}).material.side=T.DoubleSide;for(const yy of [y-h/2,y+h/2])add(new T.TorusGeometry(r,.012,8,48),MAT.brass,0,yy,0,{to:CH,rx:Math.PI/2,cast:false})}
add(lathe([[0,0],[.08,0],[.05,-.1],[.012,-.2],[0,-.22]]),MAT.brass,0,-.07,0,{to:CH,cast:false});
// wall sconces flanking the door
const sconce=(x,y,z)=>{const g=new T.Group();g.position.set(x,y,z);g.rotation.y=Math.PI;scene.add(g);add(RB(.1,.2,.03,.01),MAT.brass,0,0,0,{to:g});add(new T.CylinderGeometry(.06,.09,.16,24,1,true),MAT.glow,0,.06,.1,{to:g,cast:false}).material.side=T.DoubleSide};
sconce(DXc-1.35,2.3,D-.02);
/* ---------- lights ---------- */
const hemi=new T.HemisphereLight('#4a5a86','#3a2010',.5);scene.add(hemi);
const chand=new T.PointLight('#ffd09a',1.7,14,1.5);chand.position.set(.25,H-.8,3.6);scene.add(chand);
const picL=new T.SpotLight('#ffd9a0',1.4,5,.95,.7,1.5);picL.position.set((RX0+RX1)/2,3.6,D-.55);picL.target.position.set((RX0+RX1)/2,1.2,D-.1);scene.add(picL,picL.target);picL.castShadow=true;picL.shadow.mapSize.set(2048,2048);picL.shadow.bias=-.0005;picL.shadow.radius=4;
const newelL=new T.PointLight('#ffc070',1.1,4,2);newelL.position.set(SX1+.0,1.62,SZb-.06+.0);scene.add(newelL);
const scL=new T.PointLight('#ffbf78',1.2,4,2);scL.position.set(DXc-1.35,2.4,D-.25);scene.add(scL);
const moon=new T.SpotLight('#8aa6ff',2.4,14,.5,.8,1.2);moon.position.set(DXc+.2,4.6,D+2.6);moon.target.position.set(DXc-.3,0,D-2.6);scene.add(moon,moon.target);moon.castShadow=true;moon.shadow.mapSize.set(1024,1024);moon.shadow.bias=-.0008;moon.shadow.radius=3;
const KX=RX0+1.34;
const V={wide:{p:[.35,4.45,1.05],t:[-.15,.55,6.3],fov:70,where:'Front hall · from the gallery',text:'The front hall. Coats on the rack, boots in the tray, snow melting on the mat. The grandfather clock says five past ten.'},
 coats:{p:[1.45,1.55,4.75],t:[1.52,1.25,7.2],fov:52,where:'Front hall · close look',text:'Six coats on the rack. Charcoal, green, burgundy, navy, green again, camel. Two hats on the shelf above.'},
 coat:{p:[KX-.02,1.42,5.7],t:[KX,1.28,7.1],fov:46,where:'Front hall · close look',text:'The second green coat. Heavy wool, horn buttons, the collar turned up. The cuffs are dark and cold to the touch.'},
 boots:{p:[1.5,.95,5.55],t:[1.52,.06,7.0],fov:52,where:'Front hall · close look',text:'Boots in the tray. Riding boots, wellingtons, a lady\'s heeled pair, galoshes. Some are dry. Some are standing in their own meltwater.'},
 book:{p:[-.05,1.62,5.18],t:[.1,.98,5.78],fov:46,where:'Front hall · close look',text:'The guest book, open at tonight. Six names, six arrival times, one pen. Under remarks: snowing hard, road closed below the bridge.'},
 clock:{p:[-1.3,1.85,5.95],t:[-2.4,1.82,5.95],fov:42,where:'Front hall · close look',text:'The grandfather clock. Five past ten, and the pendulum still swinging.'},
 door:{p:[-.7,1.55,4.7],t:[-.75,.55,7.2],fov:60,where:'Front hall · close look',text:'The front door, barred against the weather. Snow packed on the mat and melting. Wet prints lead off across the marble.'},
 stairs:{p:[.6,1.55,6.3],t:[-1.9,1.6,2.6],fov:60,where:'Front hall · close look',text:'The stairs up to the gallery. A lamp on the newel post. The runner is worn pale down the middle of every tread.'},
 dark:{p:[.35,4.45,1.05],t:[-.15,.55,6.3],fov:70,where:'Front hall · power out',text:'The lights die. Moonlight through the fanlight, laid across the floor in a fan.',dark:true}};
return {views:V,exposure:1.4,darkExposure:0.4,bloom:[0.32, 0.3, 1.15],noEnv:true,update(t,dt,on,darkK){chand.intensity=1.7*on;picL.intensity=1.4*on;newelL.intensity=1.1*on;scL.intensity=1.2*on;MAT.glow.emissiveIntensity=1.2*on;hemi.intensity=.5-.25*darkK;moon.intensity=2.4+3.2*darkK;
  }};});
