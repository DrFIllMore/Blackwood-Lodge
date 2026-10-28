// ROOM {"title":"Blackwood Room 1 Proof","aria":"Room 1, Harriet and Iris's bedroom, rendered in 3D","loading":"Lighting Room 1…","where":"Room 1 · from the doorway","text":"Room 1, Harriet and Iris. Twin beds turned down, a dressing table, a typewriter under the window. The wardrobe stands open.","buttons":[["wide","The room"],["dressing","Dressing table"],["jewels","Jewellery box"],["typewriter","Typewriter"],["wardrobe","Wardrobe"],["coat","Green coat"],["night","Nightstand"],["window","Window"],["dark","Power out"]]}
ROOM(31,H=>{const {T,TAU,rnd,ctex,noise,scene,M,add,RB,BOX,lathe,grp,plane,tube,lin,ANIM}=H;
/* ---------- textures ---------- */
const TX={
 floor:ctex(1024,1024,(x,w,h)=>{const n=8,pw=w/n;for(let i=0;i<n;i++){let y=-rnd()*400;while(y<h){const L=280+rnd()*380,t=rnd();x.fillStyle=`rgb(${120+t*26|0},${84+t*18|0},${52+t*10|0})`;x.fillRect(i*pw,y,pw,L);
     for(let g=0;g<14;g++){x.strokeStyle=`rgba(40,22,8,${.07+rnd()*.12})`;x.lineWidth=.8+rnd()*1.5;const gx=i*pw+rnd()*pw;x.beginPath();x.moveTo(gx,y);x.bezierCurveTo(gx+rnd()*6-3,y+L*.3,gx+rnd()*8-4,y+L*.7,gx+rnd()*4-2,y+L);x.stroke()}
     x.fillStyle='rgba(20,10,4,.6)';x.fillRect(i*pw,y,pw,2.5);y+=L}x.fillStyle='rgba(20,10,4,.65)';x.fillRect(i*pw,0,2.5,h)}noise(x,w,h,.05,9000)},[2.2,2.4]),
 // dusty rose paper with a cream trellis and gold sprigs
 paper:ctex(512,512,(x,w,h)=>{x.fillStyle='#8a5a5c';x.fillRect(0,0,w,h);x.strokeStyle='rgba(240,222,200,.22)';x.lineWidth=2;const s=64;for(let i=-8;i<16;i++){x.beginPath();x.moveTo(i*s,0);x.lineTo(i*s+h,h);x.stroke();x.beginPath();x.moveTo(i*s,0);x.lineTo(i*s-h,h);x.stroke()}
   for(let i=0;i<8;i++)for(let j=0;j<8;j++){const cx=i*s+s/2,cy=j*s;x.save();x.translate(cx,cy);x.fillStyle='rgba(222,186,120,.5)';for(let k=0;k<5;k++){const a=k/5*TAU;x.beginPath();x.ellipse(Math.cos(a)*6,Math.sin(a)*6,5,3,a,0,TAU);x.fill()}x.fillStyle='rgba(120,140,100,.55)';x.beginPath();x.ellipse(10,12,7,2.5,.8,0,TAU);x.fill();x.beginPath();x.ellipse(-10,12,7,2.5,-.8,0,TAU);x.fill();x.restore()}noise(x,w,h,.05,5000)},[4,2]),
 paint:ctex(256,256,(x,w,h)=>{x.fillStyle='#d8ccb4';x.fillRect(0,0,w,h);noise(x,w,h,.04,2500)},[4,2]),
 plaster:ctex(256,256,(x,w,h)=>{x.fillStyle='#e2d8c6';x.fillRect(0,0,w,h);noise(x,w,h,.04,3000)},[3,3]),
 walnut:ctex(512,512,(x,w,h)=>{x.fillStyle='#4e2e1a';x.fillRect(0,0,w,h);for(let i=0;i<14;i++){const y=rnd()*h,hh=10+rnd()*40;x.fillStyle=`rgba(${rnd()<.5?20:120},${rnd()<.5?10:72},${rnd()<.5?4:36},.07)`;x.fillRect(0,y,w,hh)}for(let i=0;i<110;i++){const y=rnd()*h;x.strokeStyle=`rgba(${rnd()<.7?22:96},${rnd()<.7?11:58},${rnd()<.7?4:28},${.06+rnd()*.14})`;x.lineWidth=.6+rnd()*2.4;x.beginPath();x.moveTo(0,y);for(let k=1;k<=8;k++)x.lineTo(k*w/8,y+Math.sin(k*1.3+y)*4*rnd());x.stroke()}
   for(let i=0;i<4;i++){const cx=rnd()*w,cy=rnd()*h;x.strokeStyle='rgba(30,14,4,.2)';for(let r=4;r<30;r+=4){x.beginPath();x.ellipse(cx,cy,r*2.6,r,0,0,TAU);x.stroke()}}noise(x,w,h,.04)}),
 // quilted satin bedspread, eau-de-nil, diamond stitching
 quilt:ctex(256,256,(x,w,h)=>{x.fillStyle='#a8b8a0';x.fillRect(0,0,w,h);const s=32;for(let i=0;i<9;i++)for(let j=0;j<9;j++){const cx=i*s,cy=j*s;const g=x.createRadialGradient(cx+s/2-4,cy+s/2-4,2,cx+s/2,cy+s/2,s*.75);g.addColorStop(0,'rgba(255,255,245,.35)');g.addColorStop(1,'rgba(40,50,40,.25)');x.fillStyle=g;x.save();x.translate(cx+s/2,cy+s/2);x.rotate(Math.PI/4);x.fillRect(-s*.36,-s*.36,s*.72,s*.72);x.restore()}
   x.strokeStyle='rgba(60,70,56,.5)';x.lineWidth=1.2;for(let i=-10;i<20;i++){x.beginPath();x.moveTo(i*s,0);x.lineTo(i*s+h,h);x.stroke();x.beginPath();x.moveTo(i*s,0);x.lineTo(i*s-h,h);x.stroke()}},[3,3]),
 velvet:ctex(256,256,(x,w,h)=>{x.fillStyle='#9a9a9a';x.fillRect(0,0,w,h);for(let i=0;i<3000;i++){x.fillStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:255},${rnd()<.5?0:255},${.04+rnd()*.05})`;x.fillRect(rnd()*w,rnd()*h,1,3)}},[3,3]),
 linen:ctex(128,128,(x,w,h)=>{x.fillStyle='#ece6da';x.fillRect(0,0,w,h);for(let i=0;i<w;i+=2){x.fillStyle=`rgba(0,0,0,${.02+rnd()*.03})`;x.fillRect(i,0,1,h);x.fillRect(0,i,w,1)}},[4,4]),
 // pale Aubusson-style rug: cream field, rose and sage garlands
 rug:ctex(1024,640,(x,w,h)=>{x.fillStyle='#d6c6a8';x.fillRect(0,0,w,h);x.strokeStyle='#8a5a5c';x.lineWidth=14;x.beginPath();x.ellipse(w/2,h/2,w/2-30,h/2-30,0,0,TAU);x.stroke();x.lineWidth=4;x.strokeStyle='#7a8a6a';x.beginPath();x.ellipse(w/2,h/2,w/2-60,h/2-58,0,0,TAU);x.stroke();
   for(let i=0;i<36;i++){const a=i/36*TAU;const cx=w/2+Math.cos(a)*(w/2-95),cy=h/2+Math.sin(a)*(h/2-90);x.fillStyle=i%2?'#a8686a':'#7a8a6a';x.beginPath();x.ellipse(cx,cy,14,9,a,0,TAU);x.fill()}
   x.save();x.translate(w/2,h/2);for(let k=0;k<8;k++){x.rotate(TAU/8);x.fillStyle='#a8686a';x.beginPath();x.ellipse(70,0,40,16,0,0,TAU);x.fill();x.fillStyle='#7a8a6a';x.beginPath();x.ellipse(120,0,22,8,0,0,TAU);x.fill()}x.fillStyle='#8a5a5c';x.beginPath();x.arc(0,0,34,0,TAU);x.fill();x.restore();noise(x,w,h,.07,22000)}),
 night:ctex(256,384,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0a1430');g.addColorStop(.6,'#1e3060');g.addColorStop(1,'#46588a');x.fillStyle=g;x.fillRect(0,0,w,h);
   x.fillStyle='#050812';for(let i=0;i<8;i++){const tx=i/7*w+(rnd()-.5)*20,th=h*(.3+rnd()*.25),tw=w*.13;for(let k=0;k<5;k++){const yy=h*.92-k*th*.17;x.beginPath();x.moveTo(tx-tw*(1-k*.17),yy);x.lineTo(tx,yy-th*.36);x.lineTo(tx+tw*(1-k*.17),yy);x.fill()}}
   const s=x.createLinearGradient(0,h*.85,0,h);s.addColorStop(0,'#8a9cc8');s.addColorStop(1,'#c8d4ee');x.fillStyle=s;x.fillRect(0,h*.88,w,h*.12);for(let i=0;i<60;i++){x.fillStyle='rgba(235,240,255,.8)';x.beginPath();x.arc(rnd()*w,rnd()*h*.85,.8+rnd()*1.4,0,TAU);x.fill()}}),
 wool:ctex(256,256,(x,w,h)=>{x.fillStyle='#9a9a9a';x.fillRect(0,0,w,h);for(let i=-h;i<w;i+=3){x.strokeStyle=`rgba(0,0,0,${.06+rnd()*.06})`;x.lineWidth=1;x.beginPath();x.moveTo(i,0);x.lineTo(i+h,h);x.stroke()}
   for(let i=0;i<2200;i++){x.strokeStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:255},${rnd()<.5?0:255},${.05+rnd()*.07})`;const px=rnd()*w,py=rnd()*h,a=rnd()*TAU;x.beginPath();x.moveTo(px,py);x.lineTo(px+Math.cos(a)*4,py+Math.sin(a)*4);x.stroke()}},[3,3]),
 dial:ctex(128,128,(x,w,h)=>{x.fillStyle='#f0e8d4';x.fillRect(0,0,w,h);x.translate(64,64);x.fillStyle='#1a1410';x.font='bold 15px Georgia';x.textAlign='center';x.textBaseline='middle';for(let i=1;i<=12;i++){const a=i/12*TAU;x.fillText(String(i),Math.sin(a)*48,-Math.cos(a)*48)}
   x.strokeStyle='#1a1410';x.lineCap='round';const hr=(10+5/60)/12*TAU,mn=5/60*TAU;x.lineWidth=4;x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(hr)*26,-Math.cos(hr)*26);x.stroke();x.lineWidth=2.5;x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(mn)*40,-Math.cos(mn)*40);x.stroke()}),
 carbons:ctex(256,340,(x,w,h)=>{x.fillStyle='#e8e2d2';x.fillRect(0,0,w,h);x.fillStyle='rgba(40,40,90,.75)';x.font='12px "Courier New",monospace';const L=['Lund — Copy','','Dear Mr. Pryce,','','With reference to your letter','of the 14th, Mr. Blackwood','asks me to confirm the','appointment for Thursday at','eleven. He will bring the','papers himself.','','Yours faithfully,','I. Lund, Secretary'];L.forEach((s,i)=>x.fillText(s,22,34+i*20))}),
 label:ctex(128,96,(x,w,h)=>{x.fillStyle='#e8d6a8';x.fillRect(0,0,w,h);x.strokeStyle='#7a2a1a';x.lineWidth=4;x.strokeRect(5,5,w-10,h-10);x.fillStyle='#7a2a1a';x.font='bold 18px Georgia';x.textAlign='center';x.fillText('HOTEL',w/2,38);x.font='italic 15px Georgia';x.fillText('Splendide',w/2,60);x.font='10px Georgia';x.fillText('LAUSANNE',w/2,80)}),
};
const MAT={floor:M('#ffffff',{map:TX.floor,roughness:.38}),paper:M('#ffffff',{map:TX.paper,roughness:.9}),paint:M('#ffffff',{map:TX.paint,roughness:.7}),ceil:M('#ffffff',{map:TX.plaster,roughness:1}),
  walnut:M('#ffffff',{map:TX.walnut,roughness:.3}),walnutD:M('#9a8070',{map:TX.walnut,roughness:.32}),brass:M('#c9a24a',{metalness:.85,roughness:.3}),silver:M('#d8dadc',{metalness:.9,roughness:.22}),
  quilt:M('#ffffff',{map:TX.quilt,bumpMap:TX.quilt,bumpScale:.01,roughness:.45}),linen:M('#ffffff',{map:TX.linen,roughness:.85}),rose:M('#8a4a52',{map:TX.velvet,roughness:.8}),curtain:M('#6a2a34',{map:TX.velvet,roughness:.82}),
  mirror:M('#c8ccd0',{metalness:1,roughness:.04}),glass:new T.MeshPhysicalMaterial({color:'#1e262a',roughness:.02,transparent:true,opacity:.32,clearcoat:1,depthWrite:false}),
  shade:M('#f2e0c0',{emissive:'#ffc070',emissiveIntensity:.55,roughness:.8,side:T.DoubleSide}),bowl:M('#f4ead8',{emissive:'#ffd8a0',emissiveIntensity:1.1,roughness:.5,side:T.DoubleSide})};
/* ---------- the room: 4.4 x 5.0, 2.9 high; paper above a painted dado; door in the near wall ---------- */
const W=4.4,D=5.0,HH=2.9,hw=W/2;const WX=-.05,WY0=.9,WY1=2.35,WW=1.0;
plane(W,D,MAT.floor,0,0,D/2,0,-Math.PI/2);plane(W,D,MAT.ceil,0,HH,D/2,0,Math.PI/2);
const DADO=.95;
const wallSeg=(len,cx,cz,ry,hole)=>{// wall made of dado band and paper band; ry: 0 faces +z (front wall), PI faces -z (back), PI/2 faces +x (left wall at -hw)...
  for(const [y0,y1,mat] of [[0,DADO,MAT.paint],[DADO,HH,MAT.paper]]){const sh=new T.Shape();sh.moveTo(-len/2,y0);sh.lineTo(len/2,y0);sh.lineTo(len/2,y1);sh.lineTo(-len/2,y1);sh.lineTo(-len/2,y0);
    if(hole){const [u0,u1,v0,v1]=hole;const a=Math.max(v0,y0),b=Math.min(v1,y1);if(b>a){const p=new T.Path();p.moveTo(u0,a);p.lineTo(u0,b);p.lineTo(u1,b);p.lineTo(u1,a);p.lineTo(u0,a);sh.holes.push(p)}}
    const g=new T.ShapeGeometry(sh);const pp=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<pp.count;i++)uv.setXY(i,(pp.getX(i)+len/2)/len*len/1.1,pp.getY(i)/1.1);mat.map.repeat.set(1,1);
    const m=new T.Mesh(g,mat);m.position.set(cx,0,cz);m.rotation.y=ry;m.receiveShadow=true;scene.add(m)}};
TX.paper.repeat.set(1,1);TX.paint.repeat.set(1,1);
// back wall (faces -z; local x = -world x), with the window
wallSeg(W,0,D,Math.PI,[-WX-WW/2,-WX+WW/2,WY0,WY1]);
// side walls
wallSeg(D,-hw,D/2,Math.PI/2);wallSeg(D,hw,D/2,-Math.PI/2);
// front wall with the doorway we stand in
const DRX=0,DRW=.9,DRH=2.1;wallSeg(W,0,0,0,[DRX-DRW/2,DRX+DRW/2,-.01,DRH]);
// skirting, dado rail, picture rail, cornice; stop at the door and window
const trim=(len,x,z,ry,y,h,d,mat)=>add(BOX(len,h,d),mat,x,y,z,{ry,cast:false});
for(const [len,x,z,ry] of [[W,0,D-.01,0],[D,-hw+.01,D/2,Math.PI/2],[D,hw-.01,D/2,Math.PI/2]]){trim(len,x,z,ry,.07,.14,.025,MAT.walnutD);trim(len,x,z,ry,DADO,.04,.03,MAT.paint);trim(len,x,z,ry,2.42,.035,.03,MAT.paint);trim(len,x,z,ry,HH-.05,.1,.08,MAT.paint)}
for(const s of [-1,1]){const l=hw-DRW/2-.1;trim(l,s*(DRW/2+.1+l/2),.01,0,.07,.14,.025,MAT.walnutD);trim(l,s*(DRW/2+.1+l/2),.01,0,DADO,.04,.03,MAT.paint);}trim(W,0,.01,0,2.42,.035,.03,MAT.paint);trim(W,0,.01,0,HH-.05,.1,.08,MAT.paint);
/* ---------- window: sash, deep reveal, snow on the sill, curtains and pelmet ---------- */
for(const [w,h,x,y,d,z] of [[.06,WY1-WY0,WX-WW/2-.03,(WY0+WY1)/2,.28,D+.14],[.06,WY1-WY0,WX+WW/2+.03,(WY0+WY1)/2,.28,D+.14],[WW+.12,.06,WX,WY1+.03,.28,D+.14],[WW+.12,.06,WX,WY0-.03,.28,D+.14]])add(BOX(w,h,d),MAT.paint,x,y,z,{cast:false});
add(RB(WW+.2,.05,.2,.008),MAT.paint,WX,WY0-.02,D-.07);
const sash=M('#ece6d8',{roughness:.5});for(const [w,h,x,y] of [[.05,WY1-WY0,WX-WW/2+.025,(WY0+WY1)/2],[.05,WY1-WY0,WX+WW/2-.025,(WY0+WY1)/2],[WW,.05,WX,WY1-.025],[WW,.05,WX,WY0+.025],[WW,.06,WX,(WY0+WY1)/2],[.03,WY1-WY0,WX,(WY0+WY1)/2]])add(RB(w,h,.05,.006),sash,x,y,D+.1);
add(new T.PlaneGeometry(WW,WY1-WY0),new T.MeshPhysicalMaterial({color:'#9ab0d0',roughness:.05,transparent:true,opacity:.08,depthWrite:false}),WX,(WY0+WY1)/2,D+.11,{ry:Math.PI,cast:false});
add(RB(WW-.06,.05,.12,.02),M('#e8eef8',{roughness:.9}),WX,WY0+.02,D+.24,{cast:false});
add(new T.PlaneGeometry(4,4),new T.MeshBasicMaterial({map:TX.night,color:lin('#b8c0d0')}),WX,1.6,D+1.4,{ry:Math.PI,cast:false});
{const n=300,pp=new Float32Array(n*3);for(let i=0;i<n;i++){pp[i*3]=WX+(rnd()-.5)*2.4;pp[i*3+1]=rnd()*3.2;pp[i*3+2]=D+.35+rnd()*.9}const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pp,3));
 const sn=new T.Points(g,new T.PointsMaterial({color:'#e6ecff',size:.011,transparent:true,opacity:.85,depthWrite:false}));scene.add(sn);ANIM.push((dt,t)=>{const a=g.attributes.position.array;for(let i=0;i<n;i++){a[i*3+1]-=dt*(.3+(i%7)*.05);a[i*3]+=dt*.1*Math.sin(t+i);if(a[i*3+1]<0)a[i*3+1]=3.2}g.attributes.position.needsUpdate=true})}
function curtain(x0,width,tieY){const L=2.55;const g=new T.PlaneGeometry(width,L,40,60);const p=g.attributes.position;for(let i=0;i<p.count;i++){const u=p.getX(i)/width+.5,v=p.getY(i)/L+.5;let pinch=1;const t=Math.exp(-Math.pow((v-tieY)/.08,2));pinch=1-.5*t;
  const fold=Math.sin(u*TAU*4.2)*.035+Math.sin(u*TAU*9.3)*.01;p.setX(i,(u-.5)*width*(v<tieY?(.55+.45*Math.pow(1-v/tieY,.7)):pinch));p.setZ(i,fold*(.6+.4*v))}g.computeVertexNormals();const m=add(g,MAT.curtain,x0,WY1+.28-L/2,D-.12,{ry:Math.PI});m.material.side=T.DoubleSide;return m}
curtain(WX-WW/2-.14,.44,.42);curtain(WX+WW/2+.14,.44,.42);
{const sh=new T.Shape();const pw=WW+.75;sh.moveTo(-pw/2,0);sh.lineTo(pw/2,0);sh.lineTo(pw/2,.22);for(let i=0;i<=5;i++){const xx=pw/2-i*pw/5;sh.lineTo(xx,.22);if(i<5)sh.quadraticCurveTo(xx-pw/10,.12,xx-pw/5,.22)}sh.lineTo(-pw/2,0);
 const pg=new T.ExtrudeGeometry(sh,{depth:.04,bevelEnabled:true,bevelThickness:.008,bevelSize:.008,bevelSegments:2});pg.rotateZ(Math.PI);add(pg,MAT.rose,WX,WY1+.5,D-.17,{})}
/* ---------- twin beds, heads to the side walls, an aisle between their feet ---------- */
const headboard=(g,mat)=>{const sh=new T.Shape();sh.moveTo(-.5,0);sh.lineTo(.5,0);sh.lineTo(.5,.62);sh.lineTo(.42,.62);sh.lineTo(.42,.7);sh.quadraticCurveTo(.3,.92,0,.95);sh.quadraticCurveTo(-.3,.92,-.42,.7);sh.lineTo(-.42,.62);sh.lineTo(-.5,.62);sh.lineTo(-.5,0);
  const hg=new T.ExtrudeGeometry(sh,{depth:.06,bevelEnabled:true,bevelThickness:.025,bevelSize:.025,bevelSegments:4,curveSegments:24});add(hg,mat,0,.25,-.03,{to:g});
  const fr=new T.ExtrudeGeometry(sh,{depth:.03,bevelEnabled:true,bevelThickness:.01,bevelSize:.01,bevelSegments:2,curveSegments:24});const f=add(fr,MAT.walnut,0,.235,-.06,{to:g});f.scale.set(1.06,1.03,1)};
function bed(x,z,ry){const g=grp(x,0,z,ry);// local: head at -z end... built with head at local z=0, foot toward +z
  headboard(g,MAT.rose);const L=1.95,Wd=.95;
  add(RB(Wd,.22,L,.02),MAT.walnut,0,.22,L/2,{to:g});for(const [lx,lz] of [[-.42,.06],[.42,.06],[-.42,L-.06],[.42,L-.06]])add(new T.CylinderGeometry(.025,.018,.12,10),MAT.walnut,lx,.06,lz,{to:g});
  add(RB(.92,.18,1.86,.06),MAT.linen,0,.42,L/2+.02,{to:g});
  // bedspread: quilted top, falling skirts each side, turned down at the head
  add(RB(1.0,.06,1.6,.03),MAT.quilt,0,.52,L/2+.2,{to:g});for(const e of [-1,1])add(RB(.03,.36,1.6,.012),MAT.quilt,e*.5,.36,L/2+.2,{to:g});add(RB(1.0,.36,.03,.012),MAT.quilt,0,.36,L+.0,{to:g});
  add(RB(1.0,.075,.18,.035),MAT.quilt,0,.53,.52,{to:g});add(RB(.94,.03,.22,.012),MAT.linen,0,.515,.38,{to:g});
  // pillows
  for(const e of [-1,1])add(RB(.4,.12,.32,.055,4),MAT.linen,e*.21,.57,.2,{to:g,rx:-.25});
  return g}
const BZ=2.05;bed(hw,BZ,-Math.PI/2);bed(-hw,BZ,Math.PI/2);
/* ---------- the near nightstand by the left bed: lamp, water, travel clock ---------- */
function nightstand(x,z,ry){const g=grp(x,0,z,ry);add(RB(.44,.56,.36,.02),MAT.walnut,0,.28+.06,0,{to:g});for(const [lx,lz] of [[-.18,-.14],[.18,-.14],[-.18,.14],[.18,.14]])add(RB(.04,.08,.04,.01),MAT.walnut,lx,.04,lz,{to:g});
  add(RB(.38,.14,.012,.005),MAT.walnutD,0,.52,.183,{to:g});add(new T.SphereGeometry(.013,12,8),MAT.brass,0,.52,.196,{to:g});return g}
const nsA=nightstand(hw-.24,BZ+.78,-Math.PI/2);
{const g=grp(hw-.26,.62,BZ+.82);add(lathe([[0,0],[.07,0],[.07,.012],[.03,.03],[.012,.05],[.012,.3],[0,.3]]),MAT.brass,0,0,0,{to:g});add(lathe([[.08,0],[.14,0],[.14,.01],[.075,.2],[.07,.2]],36),MAT.shade,0,.24,0,{to:g,cast:false});
 const tc=grp(hw-.18,.62,BZ+.62,-Math.PI/2+.4);add(RB(.09,.08,.03,.01),M('#2a1e3a',{map:TX.velvet,roughness:.7}),0,.04,0,{to:tc});add(new T.CircleGeometry(.03,24),M('#ffffff',{map:TX.dial,roughness:.3}),0,.045,.0155,{to:tc,cast:false});add(new T.TorusGeometry(.031,.003,6,24),MAT.brass,0,.045,.016,{to:tc});
 const gl=grp(hw-.32,.62,BZ+.68);add(lathe([[0,0],[.03,0],[.033,.004],[.034,.1],[.031,.1],[.029,.006],[0,.006]],24),MAT.glass,0,0,0,{to:gl,cast:false}).renderOrder=3;add(new T.CylinderGeometry(.029,.028,.07,20),new T.MeshPhysicalMaterial({color:'#9ab4c8',roughness:.05,transparent:true,opacity:.25,depthWrite:false}),0,.042,0,{to:gl,cast:false}).renderOrder=2;
 add(RB(.12,.025,.17,.004),M('#4a1a1a',{roughness:.8}),hw-.3,.632,BZ+.95,{ry:.3})}
/* ---------- dressing table with a triple mirror, back wall left of the window ---------- */
const DTX=1.38;
{const g=grp(DTX,0,D-.26,0);// faces -z
 add(RB(1.05,.04,.48,.012),MAT.walnut,0,.74,0,{to:g});for(const e of [-1,1]){add(RB(.32,.66,.44,.015),MAT.walnut,e*.35,.4,0,{to:g});for(let k=0;k<3;k++){add(RB(.28,.18,.012,.005),MAT.walnutD,e*.35,.18+k*.2,-.226,{to:g});add(RB(.07,.012,.012,.004),MAT.brass,e*.35,.18+k*.2,-.236,{to:g})}}
 add(RB(.36,.12,.012,.005),MAT.walnutD,0,.64,-.226,{to:g});
 // mirrors: arched centre, angled wings
 const arch=(w,h)=>{const s=new T.Shape();s.moveTo(-w/2,0);s.lineTo(w/2,0);s.lineTo(w/2,h-w/2);s.absarc(0,h-w/2,w/2,0,Math.PI,false);s.lineTo(-w/2,0);return s};
 const mf=(w,h,x,z,ry)=>{const m=grp(x,.76,z,ry,g);add(new T.ExtrudeGeometry(arch(w+.05,h+.05),{depth:.025,bevelEnabled:true,bevelThickness:.006,bevelSize:.006,bevelSegments:2,curveSegments:24}),MAT.walnut,0,0,-.02,{to:m});
   const mg=new T.ShapeGeometry(arch(w,h),24);const mm=add(mg,MAT.mirror,0,.025,.012,{to:m,cast:false});mm.rotation.y=Math.PI;mm.position.z=-.034;return m};
 mf(.46,.72,0,.14,0);mf(.24,.56,.38,.1,.5);mf(.24,.56,-.38,.1,-.5);
 // Harriet's things: jewellery box open, scent atomiser, silver-backed brush, compact
 const jb=grp(-.18,.76,-.02,0,g);jb.rotation.y=.25;const jbM=M('#ffffff',{map:TX.walnut,roughness:.18});add(RB(.24,.08,.16,.01),jbM,0,.04,0,{to:jb});add(RB(.21,.01,.13,.003),M('#6a1420',{map:TX.velvet,roughness:.9}),0,.076,0,{to:jb,cast:false});
 for(const [w,xx] of [[.003,-.035],[.003,.035]])add(BOX(w,.03,.13),jbM,xx,.07,0,{to:jb,cast:false});
 const lid=grp(0,.08,.08,0,jb);lid.rotation.x=1.85;add(RB(.24,.016,.16,.006),jbM,0,.008,-.08,{to:lid});add(RB(.2,.004,.12,.002),M('#6a1420',{map:TX.velvet,roughness:.9}),0,-.002,-.08,{to:lid,cast:false});add(RB(.12,.003,.06,.002),M('#f0ece4',{roughness:.2,metalness:.2}),0,.0175,-.08,{to:lid,cast:false});
 const pearl=M('#f2ece2',{roughness:.18,metalness:.1});{const pts=[];for(let i=0;i<=40;i++){const t=i/40;pts.push(new T.Vector3(-.06+t*.05+Math.sin(t*6)*.02,.085+(t>.55?-(t-.55)*.18:0),-.03+t*.12+(t>.55?(t-.55)*.2:0)))}const c=new T.CatmullRomCurve3(pts);for(let i=0;i<=46;i++){const p=c.getPoint(i/46);add(new T.SphereGeometry(.0055,10,8),pearl,p.x,Math.max(p.y,.0),p.z,{to:jb,cast:false})}}
 add(new T.TorusGeometry(.009,.0025,8,20),MAT.brass,.05,.083,-.02,{to:jb,rx:Math.PI/2.4});add(new T.OctahedronGeometry(.006,0),M('#7a0a18',{roughness:.05,metalness:.2}),.05,.094,-.02,{to:jb,cast:false});
 {const sw=grp(.07,.082,.03,0,jb);const sh=new T.Shape();sh.moveTo(0,0);sh.quadraticCurveTo(.02,.01,.035,.0);sh.lineTo(.02,-.004);sh.lineTo(.03,-.016);sh.lineTo(.012,-.006);sh.quadraticCurveTo(-.01,-.01,-.02,.004);sh.lineTo(0,0);add(new T.ExtrudeGeometry(sh,{depth:.003,bevelEnabled:false}),MAT.silver,0,0,0,{to:sw,rx:-Math.PI/2,cast:false})}
 const at=grp(.18,.76,.02,0,g);add(lathe([[0,0],[.035,0],[.04,.02],[.038,.07],[.02,.09],[.008,.1],[.008,.12],[0,.12]],24),new T.MeshPhysicalMaterial({color:'#c87a8a',roughness:.02,transparent:true,opacity:.55,clearcoat:1,depthWrite:false}),0,0,0,{to:at,cast:false});add(new T.CylinderGeometry(.009,.009,.02,12),MAT.brass,0,.125,0,{to:at});
 tube([[0,.13,0],[.03,.13,.0],[.07,.11,.02],[.09,.06,.04]],.003,M('#6a1a24'),{to:at,cast:false});add(new T.SphereGeometry(.02,14,10),M('#6a1a24',{map:TX.velvet,roughness:.6}),.095,.04,.045,{to:at});
 const br=grp(.32,.76,-.05,0,g);br.rotation.y=-.5;add(RB(.075,.02,.15,.03),MAT.silver,0,.018,0,{to:br});add(RB(.03,.014,.12,.007),MAT.silver,0,.012,.12,{to:br});add(RB(.062,.012,.13,.025),M('#2a2420',{roughness:.9}),0,.004,0,{to:br,cast:false});
 add(new T.CylinderGeometry(.035,.035,.012,28),MAT.brass,.05,.766,-.12,{to:g});
 // the stool
 const st=grp(0,0,-.5,0,g);add(RB(.5,.12,.34,.05),MAT.rose,0,.48,0,{to:st});for(const [lx,lz] of [[-.2,-.13],[.2,-.13],[-.2,.13],[.2,.13]])add(new T.CylinderGeometry(.018,.012,.42,10),MAT.walnut,lx,.21,lz,{to:st})}
/* ---------- Iris's writing table under the window: portable typewriter, carbons, letters ---------- */
{const g=grp(WX,0,D-.36,0);add(RB(.9,.035,.46,.01),MAT.walnut,0,.74,0,{to:g});for(const [lx,lz] of [[-.4,-.18],[.4,-.18],[-.4,.18],[.4,.18]])add(new T.CylinderGeometry(.02,.014,.72,10),MAT.walnut,lx,.36,lz,{to:g});add(RB(.82,.08,.4,.006),MAT.walnut,0,.68,0,{to:g});
 const tw=grp(.02,.758,-.02,0,g);tw.rotation.y=-.12;const body=M('#0b0f0f',{roughness:.55,metalness:.1});body.userData.env=.25;
 {const sh=new T.Shape();sh.moveTo(-.14,0);sh.lineTo(.14,0);sh.lineTo(.14,.05);sh.lineTo(-.14,.09);sh.lineTo(-.14,0);const bg=new T.ExtrudeGeometry(sh,{depth:.26,bevelEnabled:true,bevelThickness:.012,bevelSize:.012,bevelSegments:3});bg.rotateY(Math.PI/2);bg.translate(-.13,0,0);add(bg,body,0,0,0,{to:tw})}
 add(new T.CylinderGeometry(.022,.022,.34,20),M('#141414',{roughness:.5}),0,.11,.1,{to:tw,rz:Math.PI/2});for(const e of [-1,1])add(new T.CylinderGeometry(.012,.012,.02,14),MAT.silver,e*.18,.11,.1,{to:tw,rz:Math.PI/2});
 const keyM=M('#ece4d0',{roughness:.4}),keyS=M('#2a2a2a',{metalness:.6,roughness:.4});for(let r=0;r<3;r++)for(let k=0;k<10;k++){const zz=-.11+r*.032,yy=.062+(zz+.14)/.28*.04;add(new T.CylinderGeometry(.0085,.0085,.006,14),keyM,-.105+k*.0233+r*.006,yy+.018,zz,{to:tw,cast:false});add(new T.CylinderGeometry(.0018,.0018,.02,6),keyS,-.105+k*.0233+r*.006,yy+.008,zz,{to:tw,cast:false})}
 add(RB(.12,.008,.02,.004),M('#e8e2d0'),0,.045,-.14,{to:tw});
 const sheet=new T.Mesh(new T.PlaneGeometry(.2,.26,1,8),M('#f2ece0',{roughness:.9,side:T.DoubleSide}));{const p=sheet.geometry.attributes.position;for(let i=0;i<p.count;i++){const v=p.getY(i)+.13;p.setZ(i,-Math.sin(v*4)*.03)}sheet.geometry.computeVertexNormals()}sheet.position.set(0,.24,.12);sheet.rotation.x=-.2;tw.add(sheet);
 // case lid propped beside it
 add(RB(.34,.1,.3,.02),M('#3a2a20',{map:TX.walnut,roughness:.45}),.33,.8,.02,{to:g,ry:.15});add(RB(.06,.012,.02,.004),MAT.brass,.33,.85,-.13,{to:g,ry:.15});
 const cp=add(new T.PlaneGeometry(.17,.225),M('#ffffff',{map:TX.carbons,roughness:.9}),-.3,.759,.0,{to:g,rx:-Math.PI/2,cast:false});cp.rotation.z=Math.PI+.15;for(let i=1;i<5;i++){const c2=add(new T.PlaneGeometry(.17,.225),M('#e0d8c8',{roughness:.9}),-.3+i*.002,.758-i*.0004,.0,{to:g,rx:-Math.PI/2,cast:false});c2.rotation.z=Math.PI+.15+i*.03}
 for(let i=0;i<3;i++){const e=add(RB(.15,.003,.1,.001),M('#e8dcc4',{roughness:.9}),-.3+i*.01,.76+i*.004,-.17,{to:g,ry:.2-i*.2,cast:false})}
 // a plain chair
 const ch=grp(0,0,-.5,Math.PI,g);for(const [lx,lz] of [[-.19,-.18],[.19,-.18],[-.19,.18],[.19,.18]])add(new T.CylinderGeometry(.017,.013,.44,8),MAT.walnut,lx,.22,lz,{to:ch});add(RB(.44,.06,.42,.02),MAT.rose,0,.47,0,{to:ch});
 for(const e of [-1,1])add(RB(.035,.48,.035,.01),MAT.walnut,e*.19,.72,.19,{to:ch});add(RB(.44,.16,.03,.012),MAT.walnut,0,.88,.19,{to:ch})}
/* ---------- wardrobe, back right; left door open; a spare green coat hangs inside, front-facing ---------- */
const WRX=-1.38,WRW=1.08,WRD=.58,WRH=2.0;
{const g=grp(WRX,0,D-WRD/2-.02,0);// front at local z=-WRD/2
 const shell=MAT.walnut;add(BOX(WRW,.02,WRD),shell,0,.1,0,{to:g});add(BOX(.025,WRH-.1,WRD),shell,-WRW/2+.0125,.1+(WRH-.1)/2,0,{to:g});add(BOX(.025,WRH-.1,WRD),shell,WRW/2-.0125,.1+(WRH-.1)/2,0,{to:g});add(BOX(WRW,WRH-.1,.02),M('#3a2414',{roughness:.8}),0,.1+(WRH-.1)/2,WRD/2-.01,{to:g,cast:false});add(BOX(WRW,.03,WRD),shell,0,WRH,0,{to:g});
 add(RB(WRW+.04,.1,WRD+.04,.01),MAT.walnutD,0,.05,0,{to:g});for(const [w,h,d,y] of [[WRW+.06,.05,WRD+.06,WRH+.04],[WRW+.0,.04,WRD+.02,WRH+.085],[WRW-.2,.04,WRD-.06,WRH+.125]])add(RB(w,h,d,.01),MAT.walnut,0,y,0,{to:g});
 add(BOX(WRW-.06,.02,WRD-.06),shell,0,WRH-.3,0,{to:g});add(new T.CylinderGeometry(.01,.01,WRW-.06,10),MAT.brass,0,WRH-.4,0,{to:g,rz:Math.PI/2});
 // hatbox on the shelf
 add(new T.CylinderGeometry(.16,.16,.2,32),M('#c8a8a0',{roughness:.7}),-.18,WRH-.18,.0,{to:g});add(new T.CylinderGeometry(.165,.165,.05,32),M('#7a3a3a',{roughness:.6}),-.18,WRH-.1,.0,{to:g});
 // doors: right one closed (with a mirror), left one open toward the room
 const door=(hx,dir,ang)=>{const d=grp(hx,.12,-WRD/2-.012,0,g);d.rotation.y=ang;const dw=WRW/2-.01;add(RB(dw,WRH-.14,.024,.006),MAT.walnut,dir*dw/2,(WRH-.14)/2,0,{to:d});
   add(RB(dw-.1,WRH-.4,.008,.004),MAT.walnutD,dir*dw/2,(WRH-.14)/2,-.014,{to:d});add(RB(.016,.14,.02,.006),MAT.brass,dir*(dw-.05),(WRH-.14)/2,-.024,{to:d});return d};
 door(-WRW/2,1,0);const od=door(WRW/2,-1,-1.95);
 // inside: a dress, the green coat on its hanger facing out
 const hanger=(x,y,z,to)=>{const h=grp(x,y,z,0,to);add(new T.TorusGeometry(.03,.004,6,16,Math.PI*1.4),MAT.silver,0,.04,0,{to:h,rz:-.3});tube([[-.2,-.04,0],[-.1,-.005,0],[0,.008,0],[.1,-.005,0],[.2,-.04,0]],.007,M('#7a5a3a',{roughness:.4}),{to:h});return h};
 const coatBody=(L)=>{const g2=new T.CylinderGeometry(1,1,1,44,56,true);const p=g2.attributes.position;const keys=[[0,.23],[.25,.22],[.5,.205],[.66,.212],[.8,.228],[.88,.236],[.93,.19],[.97,.12],[1,.07]];
   const rAt=v=>{for(let i=1;i<keys.length;i++){if(v<=keys[i][0]){const [v0,r0]=keys[i-1],[v1,r1]=keys[i];const t=(v-v0)/(v1-v0),s=t*t*(3-2*t);return r0+(r1-r0)*s}}return .07};
   for(let i=0;i<p.count;i++){const v=p.getY(i)+.5;const a=Math.atan2(p.getZ(i),p.getX(i));let r=rAt(v);const fc=1-Math.exp(-Math.pow(a-Math.PI/2,2)/.12);r+=(.006+.02*Math.pow(1-v,1.4))*Math.sin(a*8+1.7*Math.sin(v*4))*(v<.8?1:.3)*fc;
     let x=Math.cos(a)*r,z=Math.sin(a)*r;const ds=.52+.12*(1-v);z*=z<0?.32:ds;z+=r*.34+.02;if(v>.9)z-=(v-.9)*.25;p.setXYZ(i,x,-L*(1-v),z)}g2.computeVertexNormals();
   return {g:g2,zFront:v=>{const r=rAt(v);const ds=.52+.12*(1-v);return r*ds+r*.34+.02-(v>.9?(v-.9)*.25:0)}}};
 const hornT=ctex(128,128,(x,w,h)=>{x.fillStyle='#8a8a8a';x.fillRect(0,0,w,h);for(let i=0;i<26;i++){x.strokeStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:255},${rnd()<.5?0:255},${.08+rnd()*.14})`;x.lineWidth=1+rnd()*4;x.beginPath();x.arc(w/2+rnd()*20-10,h/2+rnd()*20-10,10+rnd()*60,rnd()*TAU,rnd()*TAU+2);x.stroke()}});
 const button=(col,r)=>{const b=new T.Group();const mat=new T.MeshPhysicalMaterial({color:col,map:hornT,roughness:.4,clearcoat:.6,clearcoatRoughness:.25});const sh=new T.Shape();sh.absarc(0,0,r,0,TAU,false);for(const [hx,hy] of [[-1,-1],[1,-1],[1,1],[-1,1]]){const hp=new T.Path();hp.absarc(hx*r*.25,hy*r*.25,r*.1,0,TAU,true);sh.holes.push(hp)}
   add(new T.ExtrudeGeometry(sh,{depth:r*.13,bevelEnabled:true,bevelThickness:r*.07,bevelSize:r*.07,bevelSegments:3,curveSegments:28}),mat,0,0,0,{to:b,cast:false});add(new T.TorusGeometry(r*.8,r*.09,8,32),mat,0,0,r*.2,{to:b,cast:false});
   const th=M('#111',{roughness:.9});add(BOX(r*.7,r*.08,r*.06),th,0,0,r*.24,{to:b,cast:false,rz:Math.PI/4});add(BOX(r*.7,r*.08,r*.06),th,0,0,r*.24,{to:b,cast:false,rz:-Math.PI/4});return b};
 const GREEN='#24452e',L=1.06;const cg=grp(.27,WRH-.4,.02,Math.PI,g);cg.scale.x=.86;hanger(0,0,0,cg);
 {const wm=M(GREEN,{map:TX.wool,roughness:.95});const {g:bg,zFront}=coatBody(L);const body=add(bg,wm,0,-.03,0,{to:cg});body.material=M(GREEN,{map:TX.wool,roughness:.95,side:T.DoubleSide});
  const matD=M(new T.Color(GREEN).multiplyScalar(.75),{map:TX.wool,roughness:.95});
  for(const s of [-1,1]){const sh=new T.Shape();sh.moveTo(0,0);sh.lineTo(s*.11,-.03);sh.lineTo(s*.075,-.12);sh.lineTo(s*.012,-.33);sh.lineTo(0,-.33);sh.lineTo(0,0);const lp=add(new T.ExtrudeGeometry(sh,{depth:.012,bevelEnabled:true,bevelThickness:.004,bevelSize:.004,bevelSegments:2}),wm,s*.012,-.03-L*.05,zFront(.9)-.012,{to:cg});lp.rotation.x=-.1}
  add(BOX(.008,L*.62,.006),matD,0,-.03-L*(1-.6)-L*.3+.02,zFront(.45)+.001,{to:cg,cast:false});
  [.66,.52,.38,.24].forEach(v=>{const b=button(GREEN,.0145);b.position.set(.016,-.03-L*(1-v),zFront(v)+.006);cg.add(b)});
  for(const s of [-1,1])add(RB(.13,.045,.016,.006),wm,s*.125,-.03-L*.7,zFront(.3)*.86,{to:cg,ry:-s*.32});
  for(const s of [-1,1]){const sx=s*.225;add(new T.SphereGeometry(.054,20,14),wm,sx*.92,-.03-L*.14-.02,zFront(.86)*.5,{to:cg}).scale.set(1,.8,1);
    add(new T.CylinderGeometry(.064,.056,.56,22,6,true),M(GREEN,{map:TX.wool,roughness:.95,side:T.DoubleSide}),sx+s*.01,-.03-L*.14-.28,zFront(.6)*.55,{to:cg,rx:-.1,rz:s*.03});
    add(new T.CylinderGeometry(.06,.06,.07,22,1,true),M(new T.Color(GREEN).multiplyScalar(.75),{map:TX.wool,roughness:.95,side:T.DoubleSide}),sx+s*.016,-.03-L*.14-.54,zFront(.6)*.55+.03,{to:cg,rx:-.1,rz:s*.03})}}
 // a dress behind it, to the side
 const dg=grp(-.04,WRH-.4,.1,Math.PI,g);hanger(0,0,0,dg);{const pr=lathe([[0,0],[.26,0],[.2,.4],[.15,.7],[.17,.95],[.12,1.05],[.04,1.1],[0,1.1]],32);const m=add(pr,M('#3a2a4a',{map:TX.velvet,roughness:.6}),0,-1.13,0,{to:dg});m.scale.set(1,1,.4)}
}
/* ---------- luggage rack at the foot of the right bed, a labelled case ---------- */
{const g=grp(-.75,0,.95,.05);for(const e of [-1,1]){tube([[e*.3,0,-.2],[e*.3,.5,.2]],.012,MAT.walnut,{to:g});tube([[e*.3,0,.2],[e*.3,.5,-.2]],.012,MAT.walnut,{to:g})}for(let i=0;i<3;i++)add(BOX(.6,.008,.05),M('#5a2a24',{roughness:.8}),0,.5,-.08+i*.08,{to:g,cast:false});
 add(RB(.62,.2,.4,.03),M('#6a4a2a',{roughness:.45}),0,.6,0,{to:g});for(const e of [-1,1]){add(RB(.035,.205,.405,.006),M('#4a3018',{roughness:.5}),e*.18,.6,0,{to:g});add(RB(.04,.03,.01,.003),MAT.brass,e*.18,.68,-.205,{to:g})}
 add(RB(.12,.025,.03,.01),M('#4a3018'),0,.715,0,{to:g});const lb=add(new T.PlaneGeometry(.11,.08),M('#ffffff',{map:TX.label,roughness:.8}),.08,.6,-.2015,{to:g,cast:false});lb.rotation.set(0,Math.PI,.12)}
/* ---------- rug, ceiling bowl ---------- */
add(new T.CircleGeometry(1,64),M('#ffffff',{map:TX.rug,roughness:.95}),0,.004,2.2,{rx:-Math.PI/2,cast:false}).scale.set(1.5,1.0,1);
{const g=grp(0,HH,2.4);add(new T.CylinderGeometry(.006,.006,.36,6),MAT.brass,0,-.18,0,{to:g});add(lathe([[0,0],[.3,0],[.32,.02],[.24,.1],[.1,.14],[0,.15]],48),MAT.bowl,0,-.5,0,{to:g,cast:false}).rotation.x=Math.PI;
 for(let i=0;i<3;i++){const a=i/3*TAU;tube([[0,-.3,0],[Math.cos(a)*.26,-.38,Math.sin(a)*.26]],.004,MAT.brass,{to:g})}add(new T.SphereGeometry(.03,12,10),MAT.brass,0,-.52,0,{to:g})}
/* ---------- lights ---------- */
const hemi=new T.HemisphereLight('#58607e','#3a2418',.5);scene.add(hemi);
const bowlL=new T.PointLight('#ffd8a8',1.3,9,1.6);bowlL.position.set(0,2.3,2.4);bowlL.castShadow=true;bowlL.shadow.mapSize.set(1024,1024);bowlL.shadow.bias=-.002;bowlL.shadow.radius=5;scene.add(bowlL);
const lampL=new T.PointLight('#ffc070',.6,4,2);lampL.position.set(hw-.26,1.0,BZ+.82);scene.add(lampL);
const fillL=new T.PointLight('#ffd0a0',.45,6,1.5);fillL.position.set(0,1.6,.6);scene.add(fillL);
const moonL=new T.SpotLight('#8aa6ff',1.6,10,.5,.8,1.2);moonL.position.set(WX,2.4,D+1.6);moonL.target.position.set(WX,0,D-2.6);moonL.castShadow=true;moonL.shadow.mapSize.set(1024,1024);moonL.shadow.bias=-.0008;scene.add(moonL,moonL.target);
/* ---------- views ---------- */
return {exposure:1.38,
 views:{
  wide:{p:[.2,1.62,.18],t:[-.1,.78,4.2],fov:72,where:'Room 1 · from the doorway',text:'Room 1, Harriet and Iris. Twin beds turned down, a dressing table, a typewriter under the window. The wardrobe stands open.'},
  dressing:{p:[1.1,1.45,3.55],t:[1.38,.95,4.8],fov:54,where:'Room 1 · close look',text:'The dressing table. Harriet\'s things: a jewellery box, a scent bottle, a silver-backed brush, a compact.'},
  jewels:{p:[1.1,1.16,4.18],t:[1.2,.8,4.72],fov:42,where:'Room 1 · close look',text:'The jewellery box, open. A string of pearls, a garnet ring, a little silver swallow.'},
  typewriter:{p:[-.05,1.32,4.0],t:[-.05,.78,4.68],fov:50,where:'Room 1 · close look',text:'Iris\'s portable typewriter. A sheet in it, still blank. Carbon copies squared off beside it.'},
  wardrobe:{p:[-.62,1.45,2.7],t:[-1.25,1.05,4.6],fov:56,where:'Room 1 · close look',text:'The wardrobe, one door open. A hatbox, an evening dress, a green wool coat on a hanger.'},
  coat:{p:[-1.0,1.32,3.2],t:[-1.11,1.12,4.6],fov:44,where:'Room 1 · close look',text:'The green coat in the wardrobe. Heavy wool, four horn buttons, the cuffs dry.'},
  night:{p:[1.5,1.05,3.55],t:[1.95,.66,2.8],fov:50,where:'Room 1 · close look',text:'Between the beds: a lamp, a glass of water, a travel clock at five past ten, a library novel.'},
  window:{p:[-.05,1.6,3.1],t:[-.05,1.6,5.6],fov:56,where:'Room 1 · close look',text:'The window. Snow banked on the sill outside, and pines beyond it.'},
  dark:{p:[.2,1.62,.18],t:[-.1,.78,4.2],fov:72,where:'Room 1 · power out',text:'The lights go. Moonlight falls across the beds.',dark:true}},
 update(t,dt,on,dk){bowlL.intensity=1.3*on;lampL.intensity=.6*on;fillL.intensity=.45*on;MAT.shade.emissiveIntensity=.55*on;MAT.bowl.emissiveIntensity=.7*on;hemi.intensity=.5-.26*dk;moonL.intensity=1.6+2.2*dk}};
});
