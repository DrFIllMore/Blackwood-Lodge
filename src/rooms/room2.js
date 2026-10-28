// ROOM {"title":"Blackwood Room 2 Proof","aria":"Room 2, Dr. Okafor and Colonel Ash's bedroom, seen from above, rendered in 3D","loading":"Lighting Room 2…","where":"Room 2 · from above","text":"Room 2, Dr. Okafor and Colonel Ash. Two beds made tight, a desk under the window, a chest of drawers. The door stands ajar.","buttons":[["wide","The room"],["desk","The desk"],["bag","Medical bag"],["chest","Chest of drawers"],["case","The wooden case"],["night","Between the beds"],["window","Window"],["dark","Power out"]]}
ROOM(47,H=>{const {T,TAU,rnd,ctex,noise,scene,M,add,RB,BOX,lathe,grp,plane,tube,lin,ANIM}=H;
/* ---------- textures ---------- */
const TX={
 // oak parquet laid herringbone
 parquet:ctex(1024,1024,(x,w,h)=>{x.fillStyle='#3a2414';x.fillRect(0,0,w,h);const L=128,Wd=32;for(let r=-2;r<12;r++)for(let c=-2;c<20;c++){const cx=c*Wd*2,cy=r*L+c*Wd;for(const k of [0,1]){x.save();x.translate(cx+(k?Wd:0),cy+(k?Wd:0));x.rotate(k?-Math.PI/4:Math.PI/4);const t=rnd();x.fillStyle=`rgb(${104+t*34|0},${70+t*22|0},${40+t*12|0})`;x.fillRect(0,0,L*.72,Wd*.72);
       for(let g=0;g<5;g++){x.strokeStyle=`rgba(40,22,8,${.08+rnd()*.12})`;x.lineWidth=.8;x.beginPath();const yy=rnd()*Wd*.72;x.moveTo(0,yy);x.lineTo(L*.72,yy+rnd()*3-1.5);x.stroke()}x.strokeStyle='rgba(20,10,4,.7)';x.lineWidth=1.6;x.strokeRect(0,0,L*.72,Wd*.72);x.restore()}}noise(x,w,h,.05,9000)},[2.6,2.6]),
 // Regency stripe, navy and tobacco, a thin gold pinline
 stripe:ctex(512,256,(x,w,h)=>{const cols=['#1c2a40','#5a4028'];const s=w/8;for(let i=0;i<8;i++){x.fillStyle=cols[i%2];x.fillRect(i*s,0,s,h)}x.fillStyle='rgba(200,160,90,.5)';for(let i=0;i<8;i++){x.fillRect(i*s+2,0,2,h)}noise(x,w,h,.05,5000)},[3,1]),
 oak:ctex(512,512,(x,w,h)=>{x.fillStyle='#6a4a2c';x.fillRect(0,0,w,h);for(let i=0;i<120;i++){const y=rnd()*h;x.strokeStyle=`rgba(${rnd()<.7?40:150},${rnd()<.7?24:110},${rnd()<.7?10:60},${.06+rnd()*.14})`;x.lineWidth=.6+rnd()*2;x.beginPath();x.moveTo(0,y);for(let k=1;k<=8;k++)x.lineTo(k*w/8,y+Math.sin(k*1.1+y)*3*rnd());x.stroke()}
   for(let i=0;i<30;i++){x.fillStyle='rgba(30,16,6,.25)';x.fillRect(rnd()*w,rnd()*h,8+rnd()*20,1.5)}noise(x,w,h,.04)}),
 // tartan blanket: navy, bottle green, a red overcheck
 tartan:ctex(256,256,(x,w,h)=>{x.fillStyle='#16203a';x.fillRect(0,0,w,h);const band=(p,wd,c,a)=>{x.fillStyle=c;x.globalAlpha=a;x.fillRect(p,0,wd,h);x.fillRect(0,p,w,wd);x.globalAlpha=1};
   for(const o of [0,128]){band(o+10,46,'#1e4a32',.85);band(o+74,40,'#1e4a32',.6);band(o+60,4,'#8a1a1a',.9);band(o+118,3,'#c8b060',.5)}for(let i=0;i<w;i+=2){x.fillStyle='rgba(0,0,0,.08)';x.fillRect(i,0,1,h)}noise(x,w,h,.05,3000)},[3,3]),
 linen:ctex(128,128,(x,w,h)=>{x.fillStyle='#ece6da';x.fillRect(0,0,w,h);for(let i=0;i<w;i+=2){x.fillStyle=`rgba(0,0,0,${.02+rnd()*.03})`;x.fillRect(i,0,1,h);x.fillRect(0,i,w,1)}},[4,4]),
 leather:ctex(256,256,(x,w,h)=>{x.fillStyle='#5a3418';x.fillRect(0,0,w,h);for(let i=0;i<60;i++){x.strokeStyle=`rgba(0,0,0,${.05+rnd()*.08})`;x.beginPath();const px=rnd()*w,py=rnd()*h;x.moveTo(px,py);x.quadraticCurveTo(px+rnd()*40-20,py+rnd()*40-20,px+rnd()*60-30,py+rnd()*60-30);x.stroke()}noise(x,w,h,.06,4000)},[2,2]),
 rug:ctex(1024,768,(x,w,h)=>{x.fillStyle='#2a1a3a';x.fillRect(0,0,w,h);x.fillStyle='#6a2a18';x.fillRect(70,70,w-140,h-140);x.strokeStyle='#c8a060';x.lineWidth=5;x.strokeRect(60,60,w-120,h-120);x.strokeRect(20,20,w-40,h-40);
   for(let i=0;i<w;i+=36){for(const yy of [40,h-40]){x.fillStyle='#8a6a3a';x.beginPath();x.arc(i+18,yy,8,0,TAU);x.fill()}}for(let i=0;i<h;i+=36){for(const xx of [40,w-40]){x.fillStyle='#8a6a3a';x.beginPath();x.arc(xx,i+18,8,0,TAU);x.fill()}}
   x.save();x.translate(w/2,h/2);for(let r=0;r<5;r++){x.fillStyle=['#2a1a3a','#c8a060','#3a5a5a','#e0c890','#6a2a18'][r];x.beginPath();const R=200-r*36;for(let k=0;k<4;k++){const a=k/4*TAU;x.lineTo(Math.cos(a)*R*1.4,Math.sin(a)*R)}x.closePath();x.fill()}x.restore();
   for(let i=0;i<220;i++){const px=90+rnd()*(w-180),py=90+rnd()*(h-180);x.fillStyle=['rgba(200,160,96,.35)','rgba(42,26,58,.4)','rgba(58,90,90,.35)'][i%3];x.beginPath();x.moveTo(px,py-6);x.lineTo(px+6,py);x.lineTo(px,py+6);x.lineTo(px-6,py);x.fill()}noise(x,w,h,.08,24000)}),
 plaster:ctex(256,256,(x,w,h)=>{x.fillStyle='#d8ccb4';x.fillRect(0,0,w,h);noise(x,w,h,.04,3000)},[3,3]),
 blotter:ctex(256,192,(x,w,h)=>{x.fillStyle='#2a4a34';x.fillRect(0,0,w,h);x.strokeStyle='rgba(20,30,60,.35)';for(let i=0;i<14;i++){x.beginPath();const y=rnd()*h;x.moveTo(rnd()*w,y);x.lineTo(rnd()*w,y+rnd()*6);x.stroke()}noise(x,w,h,.06,2000)}),
 letter:ctex(256,340,(x,w,h)=>{x.fillStyle='#eee6d4';x.fillRect(0,0,w,h);x.strokeStyle='rgba(30,30,70,.55)';x.lineWidth=1.3;for(let i=0;i<13;i++){const y=50+i*20;x.beginPath();x.moveTo(24,y);for(let k=0;k<20;k++)x.lineTo(24+k*10+rnd()*3,y+Math.sin(k*1.7+i)*2);x.stroke()}x.fillStyle='rgba(30,30,70,.7)';x.font='italic 16px Georgia';x.fillText('My dear Okafor,',22,32)}),
 plate:ctex(256,64,(x,w,h)=>{x.fillStyle='#b8923c';x.fillRect(0,0,w,h);x.fillStyle='rgba(60,40,10,.85)';x.font='italic bold 30px Georgia';x.textAlign='center';x.fillText('Col. R. Ash',w/2,42)}),
 photo:ctex(256,192,(x,w,h)=>{x.fillStyle='#e8dcc0';x.fillRect(0,0,w,h);const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#b8a888');g.addColorStop(1,'#6a5a44');x.fillStyle=g;x.fillRect(12,12,w-24,h-24);
   x.fillStyle='rgba(40,32,22,.88)';for(let r=0;r<2;r++)for(let i=0;i<7;i++){const px=36+i*30+r*14,py=r?150:112;x.beginPath();x.arc(px,py-38,7,0,TAU);x.fill();x.fillRect(px-6,py-46,12,4);x.fillRect(px-9,py-30,18,36)}noise(x,w,h,.06,1500)}),
 night:ctex(256,384,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0a1430');g.addColorStop(.6,'#1e3060');g.addColorStop(1,'#46588a');x.fillStyle=g;x.fillRect(0,0,w,h);
   x.fillStyle='#050812';for(let i=0;i<8;i++){const tx=i/7*w+(rnd()-.5)*20,th=h*(.3+rnd()*.25),tw=w*.13;for(let k=0;k<5;k++){const yy=h*.92-k*th*.17;x.beginPath();x.moveTo(tx-tw*(1-k*.17),yy);x.lineTo(tx,yy-th*.36);x.lineTo(tx+tw*(1-k*.17),yy);x.fill()}}
   const s=x.createLinearGradient(0,h*.85,0,h);s.addColorStop(0,'#8a9cc8');s.addColorStop(1,'#c8d4ee');x.fillStyle=s;x.fillRect(0,h*.88,w,h*.12);for(let i=0;i<60;i++){x.fillStyle='rgba(235,240,255,.8)';x.beginPath();x.arc(rnd()*w,rnd()*h*.85,.8+rnd()*1.4,0,TAU);x.fill()}}),
 book:ctex(256,192,(x,w,h)=>{x.fillStyle='#e8e0cc';x.fillRect(0,0,w,h);x.fillStyle='rgba(60,50,40,.5)';for(let s=0;s<2;s++)for(let i=0;i<14;i++)x.fillRect(16+s*w/2,16+i*11,w/2-34-rnd()*14,3);const g=x.createLinearGradient(w/2-12,0,w/2+12,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.5,'rgba(40,30,20,.35)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(w/2-12,0,24,h)}),
};
const MAT={floor:M('#ffffff',{map:TX.parquet,roughness:.3}),stripe:M('#ffffff',{map:TX.stripe,roughness:.85}),oak:M('#ffffff',{map:TX.oak,roughness:.35}),oakD:M('#8a7462',{map:TX.oak,roughness:.35}),
  tartan:M('#ffffff',{map:TX.tartan,roughness:.9}),linen:M('#ffffff',{map:TX.linen,roughness:.85}),leather:M('#ffffff',{map:TX.leather,roughness:.42}),brass:M('#c9a24a',{metalness:.85,roughness:.3}),steel:M('#c8ccd0',{metalness:.9,roughness:.25}),
  paint:M('#e2d8c2',{roughness:.6}),cap:M('#141010',{roughness:.9}),glass:new T.MeshPhysicalMaterial({color:'#1e262a',roughness:.02,transparent:true,opacity:.32,clearcoat:1,depthWrite:false}),
  shade:M('#e8d2a4',{emissive:'#ffbf70',emissiveIntensity:1.0,roughness:.8,side:T.DoubleSide}),green:M('#1e4a32',{emissive:'#0e2a18',emissiveIntensity:.0,roughness:.3,side:T.DoubleSide})};
/* ---------- the room, cut away at the top so we look straight in; 4.0 x 5.6 x 2.9 ---------- */
const W=4.0,D=5.6,HH=2.9,hw=W/2;const WZ=2.55,WY0=.95,WY1=2.3,WW=1.2;// window in the +x wall
const DRX=-1.15,DRW=.86,DRH=2.1;// door in the near wall
plane(W,D,MAT.floor,0,0,D/2,0,-Math.PI/2);
const wallHole=(len,cx,cz,ry,mat,holes)=>{const sh=new T.Shape();sh.moveTo(-len/2,0);sh.lineTo(len/2,0);sh.lineTo(len/2,HH);sh.lineTo(-len/2,HH);sh.lineTo(-len/2,0);
  for(const [u0,u1,v0,v1] of holes||[]){const p=new T.Path();p.moveTo(u0,v0);p.lineTo(u0,v1);p.lineTo(u1,v1);p.lineTo(u1,v0);p.lineTo(u0,v0);sh.holes.push(p)}
  const g=new T.ShapeGeometry(sh);const pp=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<pp.count;i++)uv.setXY(i,(pp.getX(i)+len/2)/1.4,pp.getY(i)/HH);const m=new T.Mesh(g,mat);m.position.set(cx,0,cz);m.rotation.y=ry;m.receiveShadow=true;scene.add(m);return m};
TX.stripe.repeat.set(1,1);
wallHole(W,0,D,Math.PI,MAT.stripe);// back
wallHole(D,hw,D/2,-Math.PI/2,MAT.stripe,[[ -(D/2-WZ)-WW/2, -(D/2-WZ)+WW/2, WY0, WY1]]);// +x wall faces -x; local x = z - D/2 ... mirrored by the turn
wallHole(D,-hw,D/2,Math.PI/2,MAT.stripe);// -x wall
wallHole(W,0,0,0,MAT.stripe,[[DRX-DRW/2,DRX+DRW/2,-.01,DRH]]);// near wall, door
// wall thickness, capped dark where the cut is
for(const [w,d,x,z] of [[W+.3,.15,0,D+.075],[W+.3,.15,0,-.075],[.15,D,hw+.075,D/2],[.15,D,-hw-.075,D/2]])add(BOX(w,.04,d),MAT.cap,x,HH+.02,z,{cast:false});
// skirting, dado rail, picture rail; stop at door and window
const tr=(len,x,z,ry,y,h,d,mat)=>add(BOX(len,h,d),mat,x,y,z,{ry,cast:false});
for(const [len,x,z,ry] of [[W,0,D-.012,0],[D,-hw+.012,D/2,Math.PI/2]]){tr(len,x,z,ry,.08,.16,.025,MAT.oakD);tr(len,x,z,ry,.92,.04,.03,MAT.oakD);tr(len,x,z,ry,2.4,.035,.03,MAT.oakD)}
for(const [l,z] of [[WZ-WW/2-.05,(WZ-WW/2-.05)/2],[D-(WZ+WW/2+.05),(D+WZ+WW/2+.05)/2]]){tr(l,hw-.012,z,Math.PI/2,.08,.16,.025,MAT.oakD);tr(l,hw-.012,z,Math.PI/2,.92,.04,.03,MAT.oakD)}tr(D,hw-.012,D/2,Math.PI/2,2.4,.035,.03,MAT.oakD);
for(const [l,x] of [[DRX-DRW/2-.07+hw,(-hw+DRX-DRW/2-.07)/2],[hw-(DRX+DRW/2+.07),(hw+DRX+DRW/2+.07)/2]]){tr(l,x,.012,0,.08,.16,.025,MAT.oakD);tr(l,x,.012,0,.92,.04,.03,MAT.oakD)}tr(W,0,.012,0,2.4,.035,.03,MAT.oakD);
// door: casing, the leaf open into the room
for(const e of [-1,1])add(RB(.08,DRH+.06,.05,.008),MAT.oak,DRX+e*(DRW/2+.04),(DRH+.06)/2,.025);add(RB(DRW+.16,.08,.05,.008),MAT.oak,DRX,DRH+.04,.025);
{const lf=grp(DRX+DRW/2,0,.04,0);lf.rotation.y=1.0;add(RB(DRW-.02,DRH-.02,.045,.006),MAT.oak,-(DRW-.02)/2,DRH/2,.0225,{to:lf});for(const y of [.55,1.5])add(RB(DRW-.2,.7,.012,.004),MAT.oakD,-(DRW-.02)/2,y,.05,{to:lf});add(new T.SphereGeometry(.03,14,10),MAT.brass,-(DRW-.1),1.0,.07,{to:lf});
 // a dressing gown on the back of the door
 const dg=lathe([[0,0],[.24,0],[.2,.4],[.16,.75],[.18,.95],[.1,1.08],[0,1.1]],28);const m=add(dg,M('#5a1a22',{map:TX.tartan,roughness:.85}),-(DRW-.02)/2,.62,.11,{to:lf});m.scale.set(1,1,.35);add(new T.CylinderGeometry(.012,.012,.05,8),MAT.brass,-(DRW-.02)/2,1.75,.07,{to:lf,rx:Math.PI/2})}
// the window in the +x wall: reveal, sash, snow outside
for(const [w,h,y,z] of [[.3,WY1-WY0,(WY0+WY1)/2,WZ-WW/2-.03],[.3,WY1-WY0,(WY0+WY1)/2,WZ+WW/2+.03]])add(BOX(w,h,.06),MAT.paint,hw+.15,y,z,{cast:false});for(const y of [WY0-.03,WY1+.03])add(BOX(.3,.06,WW+.12),MAT.paint,hw+.15,y,WZ,{cast:false});
add(RB(.22,.05,WW+.22,.008),MAT.paint,hw-.06,WY0-.02,WZ);const sash=M('#ece6d8',{roughness:.5});for(const [h,w,y,z] of [[WY1-WY0,.05,(WY0+WY1)/2,WZ-WW/2+.025],[WY1-WY0,.05,(WY0+WY1)/2,WZ+WW/2-.025],[.05,WW,WY1-.025,WZ],[.05,WW,WY0+.025,WZ],[.06,WW,(WY0+WY1)/2,WZ],[WY1-WY0,.03,(WY0+WY1)/2,WZ-WW/6],[WY1-WY0,.03,(WY0+WY1)/2,WZ+WW/6]])add(RB(.05,h,w,.006),sash,hw+.1,y,z);
add(RB(.12,.05,WW-.06,.02),M('#e8eef8',{roughness:.9}),hw+.24,WY0+.02,WZ,{cast:false});add(new T.PlaneGeometry(4.5,4),new T.MeshBasicMaterial({map:TX.night,color:lin('#b8c0d0')}),hw+1.4,1.6,WZ,{ry:-Math.PI/2,cast:false});
{const n=260,pp=new Float32Array(n*3);for(let i=0;i<n;i++){pp[i*3]=hw+.35+rnd()*.9;pp[i*3+1]=rnd()*3.2;pp[i*3+2]=WZ+(rnd()-.5)*2.6}const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pp,3));
 const sn=new T.Points(g,new T.PointsMaterial({color:'#e6ecff',size:.011,transparent:true,opacity:.85,depthWrite:false}));scene.add(sn);ANIM.push((dt,t)=>{const a=g.attributes.position.array;for(let i=0;i<n;i++){a[i*3+1]-=dt*(.3+(i%7)*.05);a[i*3+2]+=dt*.1*Math.sin(t+i);if(a[i*3+1]<0)a[i*3+1]=3.2}g.attributes.position.needsUpdate=true})}
// curtains: plain heavy tobacco wool, drawn back
const cur=M('#4a3220',{map:TX.tartan,roughness:.9});cur.color.set('#8a6a50');
for(const e of [-1,1]){const g=new T.PlaneGeometry(.4,2.5,24,40);const p=g.attributes.position;for(let i=0;i<p.count;i++){const u=p.getX(i)/.4+.5;p.setZ(i,Math.sin(u*TAU*3.5)*.03)}g.computeVertexNormals();const c=new T.MeshStandardMaterial({color:'#5a3e28',roughness:.9,side:T.DoubleSide});add(g,c,hw-.08,WY1+.25-1.25,WZ+e*(WW/2+.18),{ry:-Math.PI/2})}
add(new T.CylinderGeometry(.016,.016,WW+.9,10),MAT.brass,hw-.1,WY1+.22,WZ,{rx:Math.PI/2});
/* ---------- two beds, heads to the back wall: plain oak, tartan blankets tucked tight ---------- */
function bed(x,z){const g=grp(x,0,z,Math.PI);// local +z is the foot (toward the room)
  const L=1.95;add(RB(.98,1.05,.06,.015),MAT.oak,0,.525,0,{to:g});for(const y of [.95,.75])add(RB(.92,.05,.07,.01),MAT.oakD,0,y,.0,{to:g});for(const e of [-1,1])add(RB(.07,1.12,.07,.01),MAT.oak,e*.47,.56,0,{to:g});
  add(RB(.98,.6,.06,.015),MAT.oak,0,.3,L,{to:g});for(const e of [-1,1])add(RB(.07,.66,.07,.01),MAT.oak,e*.47,.33,L,{to:g});
  add(RB(.95,.16,L,.02),MAT.oak,0,.26,L/2,{to:g});add(RB(.9,.18,L-.08,.06),MAT.linen,0,.43,L/2,{to:g});
  add(RB(.97,.05,1.45,.02),MAT.tartan,0,.535,L/2+.22,{to:g});for(const e of [-1,1])add(RB(.03,.3,1.45,.01),MAT.tartan,e*.48,.4,L/2+.22,{to:g});
  add(RB(.95,.04,.24,.02),MAT.linen,0,.53,.46,{to:g});add(RB(.6,.12,.34,.055,4),MAT.linen,0,.56,.22,{to:g,rx:-.2});return g}
const BL=1.95;bed(-1.0,D-.03);bed(1.0,D-.03);
// slippers by the right bed, a book left on the left one
for(const e of [0,1]){const s=add(RB(.09,.05,.26,.035),M('#3a1a14',{map:TX.leather,roughness:.6}),-.38+e*.1,.025,D-BL-.1,{ry:.15+e*.1})}
/* ---------- between the beds: nightstand, lamp, book, spectacles, water ---------- */
{const g=grp(0,0,D-.25,0);add(RB(.48,.6,.4,.015),MAT.oak,0,.32,0,{to:g});add(RB(.42,.14,.012,.004),MAT.oakD,0,.52,-.205,{to:g});add(new T.SphereGeometry(.013,10,8),MAT.brass,0,.52,-.215,{to:g});
 const lp=grp(.1,.62,.06,0,g);add(lathe([[0,0],[.08,0],[.08,.015],[.02,.03],[.012,.32],[0,.32]]),MAT.brass,0,0,0,{to:lp});add(lathe([[.09,0],[.15,0],[.15,.01],[.08,.18],[.075,.18]],32),MAT.shade,0,.26,0,{to:lp,cast:false});
 const bk=grp(-.1,.62,-.06,.4,g);add(RB(.26,.025,.19,.004),MAT.paint,0,.0125,0,{to:bk});add(new T.PlaneGeometry(.25,.18),M('#ffffff',{map:TX.book,roughness:.9}),0,.0265,0,{to:bk,rx:-Math.PI/2,cast:false});
 const sp=grp(-.08,.66,.1,-.3,g);for(const e of [-1,1])add(new T.TorusGeometry(.022,.0025,6,24),MAT.steel,e*.03,0,0,{to:sp,rx:Math.PI/2});add(new T.CylinderGeometry(.002,.002,.016,6),MAT.steel,0,0,0,{to:sp,rz:Math.PI/2});
 const gl=grp(.05,.62,-.12,0,g);add(lathe([[0,0],[.03,0],[.033,.004],[.034,.1],[.031,.1],[.029,.006],[0,.006]],24),MAT.glass,0,0,0,{to:gl,cast:false}).renderOrder=3}
/* ---------- Okafor's desk under the window, his bag open on it ---------- */
const DKX=hw-.33,DKZ=WZ;
{const g=grp(DKX,0,DKZ,Math.PI/2);// faces -x
 add(RB(1.15,.04,.6,.012),MAT.oak,0,.76,0,{to:g});for(const e of [-1,1]){add(RB(.36,.72,.56,.012),MAT.oak,e*.38,.37,0,{to:g});for(let k=0;k<3;k++){add(RB(.32,.2,.012,.004),MAT.oakD,e*.38,.14+k*.22,-.286,{to:g});add(new T.SphereGeometry(.012,8,6),MAT.brass,e*.38,.14+k*.22,-.297,{to:g})}}
 add(RB(.5,.003,.36,.002),M('#ffffff',{map:TX.blotter,roughness:.95}),0,.7815,-.04,{to:g,cast:false});for(const e of [-1,1])add(RB(.04,.012,.37,.004),M('#3a2414',{map:TX.leather,roughness:.4}),e*.27,.786,-.04,{to:g});
 const lt=add(new T.PlaneGeometry(.17,.22),M('#ffffff',{map:TX.letter,roughness:.9}),-.05,.785,-.06,{to:g,rx:-Math.PI/2,cast:false});lt.rotation.z=.15;
 add(new T.CylinderGeometry(.006,.006,.13,10),M('#0e0e10',{roughness:.2}),.12,.788,-.12,{to:g,rz:Math.PI/2,ry:.7});
 // green-shaded desk lamp
 const dl=grp(-.42,.78,.15,0,g);add(RB(.16,.02,.1,.008),MAT.brass,0,.01,0,{to:dl});add(new T.CylinderGeometry(.008,.008,.3,8),MAT.brass,0,.16,0,{to:dl});const sh=add(new T.CylinderGeometry(.05,.05,.26,24,1,false,0,Math.PI),MAT.green,0,.33,-.04,{to:dl,rz:Math.PI/2});sh.rotation.set(0,0,Math.PI/2);
 add(new T.CylinderGeometry(.012,.012,.2,10),M('#fff2d0',{emissive:'#ffd090',emissiveIntensity:1.5}),0,.31,-.035,{to:dl,rz:Math.PI/2,cast:false});
 // the Gladstone bag, its jaws open: stethoscope, instrument roll, brown bottles
 const bg=grp(.22,.78,.04,.25,g);const sideS=new T.Shape();sideS.moveTo(-.11,0);sideS.lineTo(.11,0);sideS.quadraticCurveTo(.13,.12,.09,.2);sideS.lineTo(-.09,.2);sideS.quadraticCurveTo(-.13,.12,-.11,0);
 const bodyG=new T.ExtrudeGeometry(sideS,{depth:.4,bevelEnabled:true,bevelThickness:.02,bevelSize:.02,bevelSegments:4,curveSegments:16});bodyG.translate(0,0,-.2);bodyG.rotateY(Math.PI/2);add(bodyG,MAT.leather,0,.02,0,{to:bg});
 add(BOX(.36,.01,.13),M('#1a100a',{roughness:1}),0,.235,0,{to:bg,cast:false});for(const e of [-1,1]){const jw=add(RB(.42,.03,.02,.006),MAT.brass,0,.24,e*.08,{to:bg});jw.rotation.x=e*.35;}
 for(const e of [-1,1])add(new T.TorusGeometry(.06,.01,8,20,Math.PI),MAT.leather,e*.07,.25,0,{to:bg,ry:Math.PI/2*0});
 for(let i=0;i<3;i++){add(lathe([[0,0],[.018,0],[.02,.004],[.02,.06],[.01,.075],[.01,.085],[0,.085]],16),new T.MeshPhysicalMaterial({color:'#5a2a08',roughness:.05,transparent:true,opacity:.8}),-.1+i*.045,.17,-.02,{to:bg,cast:false});add(new T.CylinderGeometry(.011,.011,.012,12),M('#1a1a1a'),-.1+i*.045,.262,-.02,{to:bg})}
 // stethoscope spilling out over the rim onto the desk
 tube([[.05,.24,.0],[.1,.27,.05],[.16,.22,.12],[.2,.03,.14],[.26,.0,.08],[.3,.0,.0]],.0045,M('#1a1a1a',{roughness:.35}),{to:bg,seg:40});tube([[.05,.24,.0],[.02,.28,-.04],[.04,.25,-.07]],.0035,MAT.steel,{to:bg});add(new T.CylinderGeometry(.022,.022,.012,24),MAT.steel,.3,.006,.0,{to:bg});add(new T.CircleGeometry(.018,20),M('#2a2a2a'),.3,.0125,0,{to:bg,rx:-Math.PI/2,cast:false});
 // instrument roll open beside it
 const ir=grp(-.18,.0,-.2,-.2,bg);add(RB(.26,.006,.16,.003),M('#3a1a10',{map:TX.leather,roughness:.6}),0,.003,0,{to:ir});for(let i=0;i<6;i++)add(new T.CylinderGeometry(.003,.003,.13,8),MAT.steel,-.1+i*.04,.01,0,{to:ir,rx:Math.PI/2,cast:false});
 // chair
 const ch=grp(0,0,-.55,0,g);for(const [lx,lz] of [[-.2,-.19],[.2,-.19],[-.2,.19],[.2,.19]])add(new T.CylinderGeometry(.018,.014,.44,8),MAT.oak,lx,.22,lz,{to:ch});add(RB(.46,.06,.44,.02),MAT.leather,0,.47,0,{to:ch});
 for(const e of [-1,1])add(RB(.04,.5,.04,.01),MAT.oak,e*.2,.72,-.2,{to:ch});add(RB(.46,.18,.03,.012),MAT.oak,0,.88,-.2,{to:ch})}
/* ---------- Ash's chest of drawers on the -x wall: brushes, flask, regimental photo, the wooden case ---------- */
const CHX=-hw+.28,CHZ=2.5;
{const g=grp(CHX,0,CHZ,-Math.PI/2);// faces +x
 add(RB(1.0,.9,.5,.012),MAT.oak,0,.5,0,{to:g});add(RB(1.04,.04,.54,.01),MAT.oak,0,.97,0,{to:g});add(RB(1.0,.06,.5,.01),MAT.oakD,0,.03,0,{to:g});
 for(let k=0;k<4;k++){const y=.15+k*.2;for(const e of (k===3?[-1,1]:[0])){const wd=k===3?.46:.94;add(RB(wd,.17,.012,.004),MAT.oakD,e*.24,y,-.256,{to:g});for(const f of (k===3?[0]:[-.25,.25]))add(RB(.08,.015,.02,.004),MAT.brass,e*.24+f,y,-.266,{to:g})}}
 // the case: walnut, brass corners and plate, closed
 const cs=grp(-.12,.99,-.02,.08,g);const caseM=M('#5a3a22',{map:TX.oak,roughness:.25});caseM.color.set('#9a7050');add(RB(.38,.075,.26,.008),caseM,0,.0375,0,{to:cs});add(BOX(.382,.003,.262),M('#2a1a10'),0,.055,0,{to:cs,cast:false});
 for(const [cx,cz] of [[-1,-1],[1,-1],[-1,1],[1,1]])add(RB(.03,.08,.03,.004),MAT.brass,cx*.178,.0375,cz*.118,{to:cs});add(RB(.03,.03,.006,.003),MAT.brass,0,.05,-.131,{to:cs});add(BOX(.004,.012,.002),M('#111'),0,.05,-.1345,{to:cs,cast:false});
 add(new T.PlaneGeometry(.12,.03),M('#ffffff',{map:TX.plate,metalness:.6,roughness:.35}),0,.0755,-.04,{to:cs,rx:-Math.PI/2,cast:false}).rotation.z=Math.PI;
 // military brushes, a hip flask, the photograph
 for(const e of [0,1]){const b=grp(.18+e*.09,.99,.08,.3,g);add(RB(.07,.035,.13,.03),M('#3a2414',{map:TX.oak,roughness:.25}),0,.0175,0,{to:b});add(RB(.06,.012,.12,.025),M('#d8ccb0',{roughness:.9}),0,.0,0,{to:b,cast:false})}
 const fl=grp(.36,.99,-.08,-.4,g);add(RB(.09,.13,.025,.012),MAT.steel,0,.065,0,{to:fl});add(new T.CylinderGeometry(.008,.008,.02,12),MAT.steel,0,.14,0,{to:fl});
 const ph=grp(-.38,.99,.12,.2,g);add(RB(.26,.2,.015,.004),MAT.brass,0,.1,0,{to:ph,rx:-.15});add(new T.PlaneGeometry(.22,.16),M('#ffffff',{map:TX.photo,roughness:.5}),0,.1,-.009,{to:ph,rx:-.15,cast:false}).rotation.y=Math.PI;add(RB(.04,.15,.01,.003),MAT.brass,0,.075,.06,{to:ph,rx:.4})}
/* ---------- a leather club chair by the door, a standard lamp ---------- */
{const g=grp(1.3,0,.95,-2.4);const lm=MAT.leather;add(RB(.78,.3,.74,.06),lm,0,.22,0,{to:g});add(RB(.56,.12,.56,.06,4),lm,0,.42,.06,{to:g});add(RB(.76,.62,.18,.08),lm,0,.6,-.29,{to:g,rx:-.08});
 for(const e of [-1,1])add(RB(.16,.5,.72,.08),lm,e*.33,.42,.0,{to:g});for(const [lx,lz] of [[-.32,-.3],[.32,-.3],[-.32,.3],[.32,.3]])add(new T.CylinderGeometry(.025,.02,.07,10),M('#1a100a'),lx,.035,lz,{to:g});
 add(RB(.36,.012,.26,.004),M('#e8e0cc'),.06,.49,.1,{to:g,ry:.3,cast:false})}
{const g=grp(1.75,0,.38);add(lathe([[0,0],[.14,0],[.14,.02],[.05,.04],[.016,.06],[.014,1.4],[0,1.4]]),MAT.brass,0,0,0,{to:g});add(lathe([[.1,0],[.2,0],[.2,.01],[.11,.26],[.1,.26]],36),MAT.shade,0,1.3,0,{to:g,cast:false})}
/* ---------- rug ---------- */
add(new T.PlaneGeometry(2.4,1.7),M('#ffffff',{map:TX.rug,roughness:.95}),.1,.004,2.3,{rx:-Math.PI/2,cast:false}).rotation.z=Math.PI/2;
/* ---------- lights: lamps, a soft overhead fill where the ceiling would be, moonlight ---------- */
const hemi=new T.HemisphereLight('#5a6080','#3a2418',.55);scene.add(hemi);
const top=new T.PointLight('#ffdcb0',1.2,10,1.4);top.position.set(0,2.75,2.6);top.castShadow=true;top.shadow.mapSize.set(1024,1024);top.shadow.bias=-.002;top.shadow.radius=6;scene.add(top);
const nightL=new T.PointLight('#ffc070',.8,3.5,2);nightL.position.set(.1,1.2,D-.2);scene.add(nightL);
const deskL=new T.PointLight('#ffd090',.7,2.5,2);deskL.position.set(DKX-.1,1.05,DKZ+.42);scene.add(deskL);
const stdL=new T.PointLight('#ffc070',.9,4,2);stdL.position.set(1.75,1.5,.38);scene.add(stdL);
const moonL=new T.SpotLight('#8aa6ff',1.0,12,.55,.8,1.2);moonL.position.set(hw+3,2.8,WZ);moonL.target.position.set(-1.5,0,WZ);moonL.castShadow=true;moonL.shadow.mapSize.set(1024,1024);moonL.shadow.bias=-.0008;scene.add(moonL,moonL.target);
return {exposure:1.38,
 views:{
  wide:{p:[0,6.3,1.15],t:[0,0,2.95],fov:60,where:'Room 2 · from above',text:'Room 2, Dr. Okafor and Colonel Ash. Two beds made tight, a desk under the window, a chest of drawers. The door stands ajar.'},
  desk:{p:[.75,1.75,2.0],t:[1.75,.78,2.6],fov:56,where:'Room 2 · close look',text:'The desk under the window. A blotter, a letter half read, a fountain pen, a green-shaded lamp, the doctor\'s bag.'},
  bag:{p:[1.15,1.32,2.1],t:[1.71,.88,2.33],fov:48,where:'Room 2 · close look',text:'Okafor\'s bag, open. Brown bottles, a roll of instruments, a stethoscope trailing over the rim.'},
  chest:{p:[-.75,1.6,2.0],t:[-1.75,.95,2.5],fov:56,where:'Room 2 · close look',text:'The chest of drawers. A pair of military brushes, a hip flask, a photograph of men in uniform, a long wooden case.'},
  case:{p:[-1.2,1.38,2.12],t:[-1.7,1.0,2.38],fov:46,where:'Room 2 · close look',text:'A walnut case with brass corners. The plate on the lid reads Col. R. Ash. It is shut.'},
  night:{p:[0,1.5,4.3],t:[0,.62,5.3],fov:52,where:'Room 2 · close look',text:'Between the beds: a lamp, a novel left open face down, reading glasses, a glass of water.'},
  window:{p:[.6,1.6,2.55],t:[2.6,1.6,2.55],fov:58,where:'Room 2 · close look',text:'The window. Snow on the glazing bars, and the dark of the pines.'},
  dark:{p:[0,6.3,1.15],t:[0,0,2.95],fov:60,where:'Room 2 · power out',text:'The lights fail. Moonlight lies across the floor from the window.',dark:true}},
 update(t,dt,on,dk){top.intensity=1.2*on;nightL.intensity=.8*on;deskL.intensity=.7*on;stdL.intensity=.9*on;MAT.shade.emissiveIntensity=1.0*on;hemi.intensity=.55-.3*dk;moonL.intensity=1.0+2.6*dk}};
});
