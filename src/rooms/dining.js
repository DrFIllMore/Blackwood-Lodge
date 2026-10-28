// ROOM {"title":"Blackwood Dining Room Proof","aria":"The dining room, rendered in 3D, from above the end of the table","loading":"Lighting the candles…","where":"Dining room · down the table","text":"The dining room. Dinner is over and the table half cleared. Candles burning low in both candelabra, holly down the middle, chairs pushed back where people got up.","buttons":[["wide","The table"],["dessert","A place"],["cards","Place cards"],["stain","The cloth"],["head","Head of table"],["candles","Candelabra"],["sideboard","Sideboard"],["curtains","Curtains"],["dark","Power out"]]}
ROOM(47,H=>{const {T,TAU,rnd,ctex,noise,scene,ANIM,M,add,RB,BOX,lathe,grp,plane,tube,tiledBox,lin}=H;
/* ---------- textures ---------- */
const TX={
 parquet:ctex(512,512,(x,w,h)=>{x.fillStyle='#2a160c';x.fillRect(0,0,w,h);const pl=128,pw=32;for(let j=-4;j<20;j++)for(let i=-2;i<10;i++){for(const s of [0,1]){x.save();x.translate(i*pl/1.4142*2+ (s?pw/1.4142:0),j*pw*1.4142*1);x.rotate(s?-Math.PI/4:Math.PI/4);const t=rnd();x.fillStyle=`rgb(${92+t*34|0},${52+t*20|0},${28+t*12|0})`;x.fillRect(0,0,pl-2,pw-2);
       for(let g=0;g<5;g++){x.strokeStyle=`rgba(30,14,4,${.1+rnd()*.15})`;x.lineWidth=.7;x.beginPath();const yy=rnd()*pw;x.moveTo(0,yy);x.lineTo(pl,yy+(rnd()-.5)*3);x.stroke()}x.restore()}}noise(x,w,h,.05,6000)},[1,1]),
 damask:ctex(512,512,(x,w,h)=>{x.fillStyle='#4a1016';x.fillRect(0,0,w,h);const mot=(cx,cy)=>{x.save();x.translate(cx,cy);x.fillStyle='rgba(20,2,6,.22)';x.strokeStyle='rgba(160,90,60,.2)';x.lineWidth=2;
     x.beginPath();x.moveTo(0,-110);x.bezierCurveTo(50,-80,60,-20,0,0);x.bezierCurveTo(-60,-20,-50,-80,0,-110);x.fill();x.stroke();x.beginPath();x.moveTo(0,0);x.bezierCurveTo(70,10,80,80,0,110);x.bezierCurveTo(-80,80,-70,10,0,0);x.fill();x.stroke();
     for(const s of [-1,1]){x.beginPath();x.moveTo(0,-20);x.bezierCurveTo(s*60,-60,s*110,-10,s*90,40);x.bezierCurveTo(s*70,20,s*40,0,0,-20);x.fill();x.stroke()}x.restore()};
   mot(w/4,h/4);mot(3*w/4,3*h/4);mot(3*w/4,-h/4);mot(w/4,5*h/4);mot(-w/4,3*h/4);mot(5*w/4,h/4);noise(x,w,h,.04,6000)},[3,1.4]),
 mahog:ctex(512,512,(x,w,h)=>{x.fillStyle='#4a1c10';x.fillRect(0,0,w,h);for(let i=0;i<140;i++){const y=rnd()*h;x.strokeStyle=`rgba(${rnd()<.5?20:120},${rnd()<.5?6:40},${rnd()<.5?2:20},${.1+rnd()*.2})`;x.lineWidth=.6+rnd()*2.4;x.beginPath();x.moveTo(0,y);for(let k=1;k<=8;k++)x.lineTo(k*w/8,y+Math.sin(k*1.2+y)*5*rnd());x.stroke()}noise(x,w,h,.04)}),
 linen:ctex(256,256,(x,w,h)=>{x.fillStyle='#ebe6da';x.fillRect(0,0,w,h);for(let i=0;i<w;i+=2){x.fillStyle=`rgba(0,0,0,${.015+rnd()*.02})`;x.fillRect(i,0,1,h);x.fillRect(0,i,w,1)}for(let i=0;i<w;i+=32){x.fillStyle='rgba(0,0,0,.03)';x.fillRect(i,0,1,h)}},[4,4]),
 velvet:ctex(256,256,(x,w,h)=>{x.fillStyle='#9a9a9a';x.fillRect(0,0,w,h);for(let i=0;i<3000;i++){x.fillStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:255},${rnd()<.5?0:255},${.04+rnd()*.05})`;x.fillRect(rnd()*w,rnd()*h,1,3)}},[2,2]),
 stain:ctex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);x.save();x.translate(w/2,h/2);x.fillStyle='rgba(110,16,30,.55)';x.beginPath();for(let i=0;i<=40;i++){const a=i/40*TAU,r=70+Math.sin(a*3)*14+Math.sin(a*7)*8+rnd()*6;x.lineTo(Math.cos(a)*r*1.3,Math.sin(a)*r)}x.fill();
   x.strokeStyle='rgba(80,8,20,.6)';x.lineWidth=5;x.stroke();x.fillStyle='rgba(110,16,30,.4)';for(let i=0;i<8;i++){x.beginPath();x.arc((rnd()-.5)*220,(rnd()-.5)*160,3+rnd()*8,0,TAU);x.fill()}x.restore()}),
 night:ctex(256,384,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0a1430');g.addColorStop(.65,'#1e3060');g.addColorStop(1,'#46588a');x.fillStyle=g;x.fillRect(0,0,w,h);
   x.fillStyle='#050812';for(let i=0;i<7;i++){const tx=i/6*w+(rnd()-.5)*20,th=h*(.28+rnd()*.2),tw=w*.13;for(let k=0;k<5;k++){const yy=h*.92-k*th*.17;x.beginPath();x.moveTo(tx-tw*(1-k*.17),yy);x.lineTo(tx,yy-th*.36);x.lineTo(tx+tw*(1-k*.17),yy);x.fill()}}
   const s=x.createLinearGradient(0,h*.86,0,h);s.addColorStop(0,'#8a9cc8');s.addColorStop(1,'#c8d4ee');x.fillStyle=s;x.fillRect(0,h*.89,w,h*.11);for(let i=0;i<60;i++){x.fillStyle='rgba(235,240,255,.8)';x.beginPath();x.arc(rnd()*w,rnd()*h*.85,.8+rnd()*1.4,0,TAU);x.fill()}}),
 still:ctex(384,288,(x,w,h)=>{const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'#2a2018');g.addColorStop(1,'#0e0a08');x.fillStyle=g;x.fillRect(0,0,w,h);x.fillStyle='#5a4a30';x.fillRect(0,h*.72,w,h*.28);
   const blob=(cx,cy,r,c,hi)=>{const gg=x.createRadialGradient(cx-r*.3,cy-r*.3,r*.1,cx,cy,r);gg.addColorStop(0,hi);gg.addColorStop(1,c);x.fillStyle=gg;x.beginPath();x.arc(cx,cy,r,0,TAU);x.fill()};
   blob(140,180,40,'#5a0a10','#c03040');blob(190,190,34,'#6a5a10','#e8c040');blob(110,200,26,'#3a5a10','#8ac040');blob(230,200,22,'#5a0a10','#c03040');x.fillStyle='#8a8070';x.beginPath();x.ellipse(260,130,26,70,0,0,TAU);x.fill();x.fillStyle='rgba(255,255,240,.3)';x.fillRect(250,80,6,80);
   for(let i=0;i<3000;i++){x.fillStyle=`rgba(${rnd()*200|0},${rnd()*150|0},${rnd()*100|0},.05)`;x.fillRect(rnd()*w,rnd()*h,3+rnd()*4,2+rnd()*3)}}),
};
const card=name=>ctex(256,96,(x,w,h)=>{x.fillStyle='#f4efe2';x.fillRect(0,0,w,h);x.strokeStyle='#b8913c';x.lineWidth=3;x.strokeRect(6,6,w-12,h-12);x.fillStyle='#22284a';x.font='italic 30px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillText(name,w/2,h/2+2)});
const MAT={floor:M('#ffffff',{map:TX.parquet,roughness:.35}),wall:M('#ffffff',{map:TX.damask,roughness:.85}),mahog:M('#ffffff',{map:TX.mahog,roughness:.3}),linen:M('#d8d2c4',{map:TX.linen,roughness:.85,side:T.DoubleSide}),
  ceil:M('#d8cfc0',{roughness:1}),silver:M('#a4a6ac',{metalness:.9,roughness:.2}),brass:M('#c9a24a',{metalness:.85,roughness:.3}),velvet:M('#1e3a2e',{map:TX.velvet,roughness:.8}),
  china:M('#f4f0e8',{roughness:.15}),glass:new T.MeshPhysicalMaterial({color:'#1c2428',roughness:.02,transparent:true,opacity:.32,clearcoat:1,depthWrite:false}),wine:new T.MeshPhysicalMaterial({color:'#4a0612',roughness:.1,transparent:true,opacity:.9}),
  wax:M('#efe6d0',{roughness:.6}),curtain:M('#2a3a2a',{map:TX.velvet,roughness:.85,side:T.DoubleSide}),gold:M('#b8913c',{metalness:.75,roughness:.35})};
/* ---------- the room ---------- */
const W=4.6,D=7.2,HH=3.2,hw=W/2;
plane(W,D,MAT.floor,0,0,D/2,0,-Math.PI/2).material.map.repeat.set(W/1.4,D/1.4);TX.parquet.wrapS=TX.parquet.wrapT=T.RepeatWrapping;
plane(W,D,MAT.ceil,0,HH,D/2,0,Math.PI/2);
// back wall (far end) and right wall plain; the left wall has two tall windows
plane(W,HH,MAT.wall,0,HH/2,D,Math.PI);plane(D,HH,MAT.wall,-hw,HH/2,D/2,Math.PI/2);plane(W,HH,MAT.wall,0,HH/2,0,0);
const WINS=[2.6,5.0],WW=1.0,WY0=.75,WY1=2.65;
{const sh=new T.Shape();sh.moveTo(0,0);sh.lineTo(D,0);sh.lineTo(D,HH);sh.lineTo(0,HH);sh.lineTo(0,0);for(const wz of WINS){const ho=new T.Path();ho.moveTo(wz-WW/2,WY0);ho.lineTo(wz-WW/2,WY1);ho.lineTo(wz+WW/2,WY1);ho.lineTo(wz+WW/2,WY0);ho.lineTo(wz-WW/2,WY0);sh.holes.push(ho)}
 const g=new T.ShapeGeometry(sh);const p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,p.getX(i)/D,p.getY(i)/HH);const m=new T.Mesh(g,MAT.wall.clone());m.material.map=TX.damask.clone();m.material.map.needsUpdate=true;m.material.map.wrapS=m.material.map.wrapT=T.RepeatWrapping;m.material.map.repeat.set(D/.55,HH/.8);
 m.position.set(hw,0,0);m.rotation.y=-Math.PI/2;m.receiveShadow=true;scene.add(m)}
TX.damask.repeat.set(W/.55,HH/.8);
// panelled dado and cornice on every wall, stopping at the windows
const pan=M('#ffffff',{map:TX.mahog,roughness:.35});
const dado=(len,cx,cz,ry)=>{const g=grp(cx,0,cz,ry);add(BOX(len,.95,.02),pan,0,.475,0,{to:g,cast:false});add(RB(len,.06,.05,.01),pan,0,.97,.02,{to:g,cast:false});add(RB(len,.16,.035,.01),pan,0,.08,.01,{to:g,cast:false});add(RB(len,.12,.14,.02),M('#e8dfcc',{roughness:.6}),0,HH-.06,.07,{to:g,cast:false});
  const n=Math.max(1,Math.round(len/.7));for(let i=0;i<n;i++){const u=-len/2+len/n*(i+.5);add(RB(len/n-.14,.62,.02,.01),pan,u,.5,.015,{to:g,cast:false})}return g};
dado(W,0,D-.012,Math.PI);dado(D,-hw+.012,D/2,Math.PI/2);dado(W,0,.012,0);
{const segs=[[0,WINS[0]-WW/2-.08],[WINS[0]+WW/2+.08,WINS[1]-WW/2-.08],[WINS[1]+WW/2+.08,D]];for(const [a,b] of segs)dado(b-a,hw-.012,(a+b)/2,-Math.PI/2);add(RB(D,.12,.14,.02),M('#e8dfcc',{roughness:.6}),hw-.07,HH-.06,D/2,{ry:Math.PI/2,cast:false})}
// windows: reveals, frames, glazing bars, sill, the night beyond
for(const wz of WINS){for(const [w,h,dz,y] of [[.3,WY1-WY0,-WW/2-.01,(WY0+WY1)/2],[.3,WY1-WY0,WW/2+.01,(WY0+WY1)/2]])add(BOX(.3,h,.02),M('#d8cfc0',{roughness:.9}),hw+.15,y,wz+dz,{cast:false});add(BOX(.3,.02,WW),M('#d8cfc0',{roughness:.9}),hw+.15,WY1,wz,{cast:false});
 const g=grp(hw+.04,0,wz,-Math.PI/2);for(const [w,h,x,y] of [[.06,WY1-WY0+.06,-WW/2,(WY0+WY1)/2],[.06,WY1-WY0+.06,WW/2,(WY0+WY1)/2],[WW+.06,.06,0,WY1],[WW,.04,0,WY0+.62],[WW,.04,0,WY0+1.25],[.035,WY1-WY0,0,(WY0+WY1)/2]])add(RB(w,h,.05,.006),M('#e8e0d0',{roughness:.5}),x,y,0,{to:g});
 add(RB(WW+.16,.05,.22,.01),M('#e8e0d0',{roughness:.5}),0,WY0-.02,-.08,{to:g});add(new T.PlaneGeometry(3,3.4),new T.MeshBasicMaterial({map:TX.night,color:lin('#c0c4d0')}),hw+1.4,1.6,wz,{ry:-Math.PI/2,cast:false})}
// curtains, each held by a tie-back cord with a tassel
function curtain(z,width,side){const L=WY1+.25,g=new T.PlaneGeometry(width,L,40,60);const p=g.attributes.position;const tieV=.38;for(let i=0;i<p.count;i++){const u=p.getX(i)/width+.5,v=p.getY(i)/L+.5;const t=Math.exp(-Math.pow((v-tieV)/.07,2));const pinch=1-.6*t;
   const fold=Math.sin(u*TAU*4.2)*.04+Math.sin(u*TAU*9.3)*.012;const sw=v<tieV?(.5+.5*Math.pow(1-v/tieV,.7)):pinch;const ux=side>0?(u-1)*sw+.5:u*sw-.5;p.setX(i,ux*width);p.setZ(i,fold*(.6+.4*v)+(1-v)*.02)}g.computeVertexNormals();
 const m=add(g,MAT.curtain,hw-.16,L/2+.0,z,{ry:-Math.PI/2});const cz=z+side*(width*.5*.4);
 // the cord: a twisted rope loop around the gathered curtain, hooked to the wall, with a tassel
 const _n0=scene.children.length;const ty=L*tieV,hz=z+side*(width*.5+.08);const loop=[];for(let k=0;k<=24;k++){const a=k/24*TAU;loop.push(new T.Vector3(hw-.16+Math.cos(a)*.07,ty+Math.sin(a)*.01,z+side*width*.32+Math.sin(a)*.09))}
 add(new T.TubeGeometry(new T.CatmullRomCurve3(loop,true),48,.009,8,true),MAT.gold,0,0,0,{});tube([[hw-.16,ty,z+side*(width*.32+.09)],[hw-.08,ty-.01,hz-side*.03],[hw-.02,ty,hz]],.008,MAT.gold);
 add(new T.SphereGeometry(.018,12,10),MAT.brass,hw-.015,ty,hz);const ts=grp(hw-.11,ty-.02,z+side*(width*.32+.09));add(new T.SphereGeometry(.02,12,10),MAT.gold,0,-.03,0,{to:ts});add(new T.CylinderGeometry(.012,.03,.1,16,1,true),MAT.gold,0,-.1,0,{to:ts}).material.side=T.DoubleSide;(H.hook||(()=>{}))('cord',scene.children.slice(_n0));return m}
for(const wz of WINS){curtain(wz-WW/2-.08,.5,-1);curtain(wz+WW/2+.08,.5,1);add(new T.CylinderGeometry(.016,.016,WW+.9,12),MAT.brass,hw-.12,WY1+.3,wz,{rx:Math.PI/2});for(const e of [-1,1])add(new T.SphereGeometry(.03,12,10),MAT.brass,hw-.12,WY1+.3,wz+e*(WW/2+.46))}
/* ---------- the table: mahogany under white linen ---------- */
const TZ=3.8,TL=3.2,TWd=1.12,TH=.76,DROP=.3;
{for(const [x,z] of [[-1,-1],[1,-1],[-1,1],[1,1],[0,-1],[0,1]]){if(x===0)continue;add(lathe([[0,0],[.04,0],[.05,.06],[.035,.14],[.045,.24],[.03,.5],[.04,.56],[0,TH-.05]],18),MAT.mahog,x*(TWd/2-.12),0,z*(TL/2-.2))}
 add(lathe([[0,0],[.28,0],[.3,.04],[.08,.1],[.06,.5],[.1,.6],[0,TH-.05]],32),MAT.mahog,0,0,TZ);
 add(RB(TWd,.04,TL,.01),MAT.mahog,0,TH-.02,TZ);
 // cloth: top and four drops with soft folds
 const top=add(BOX(TWd+.02,.006,TL+.02),MAT.linen,0,TH+.003,TZ,{cast:false});
 const drop=(len,cx,cz,ry)=>{const g=new T.PlaneGeometry(len+.04,DROP,Math.round(len*30),6);const p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i);const k=(DROP/2-y)/DROP;p.setZ(i,k*(.012*Math.sin(x*26+cz)+.02*Math.sin(x*9.7+cx)+.03*k))}g.computeVertexNormals();const m=add(g,MAT.linen,cx,TH-DROP/2+.004,cz,{ry,cast:true});return m};
 drop(TL+.02,TWd/2+.012,TZ,Math.PI/2);drop(TL+.02,-TWd/2-.012,TZ,-Math.PI/2);drop(TWd+.02,0,TZ+TL/2+.012,0);drop(TWd+.02,0,TZ-TL/2-.012,Math.PI)}
/* ---------- the places ---------- */
const SEATS=[// name, x, z, facing (ry of the sitter looking at the table), chair pushback, chair turn
 ['Edmund',0,TZ+TL/2+.42,Math.PI,.06,.0],['Harriet Vane',0,TZ-TL/2-.42,0,.22,.25],
 ['Dr. Okafor',TWd/2+.42,TZ-1.0,-Math.PI/2,.18,-.2],['Marguerite Sol',TWd/2+.42,TZ,-Math.PI/2,.1,.1],['Colonel Ash',TWd/2+.42,TZ+1.0,-Math.PI/2,.3,-.3],
 ['Iris Lund',-TWd/2-.42,TZ-1.0,Math.PI/2,.12,.15],['Felix Osei',-TWd/2-.42,TZ,Math.PI/2,.42,.5],['Piet Hollander',-TWd/2-.42,TZ+1.0,Math.PI/2,.16,-.1]];
function chair(x,z,ry,head){const g=grp(x,0,z,ry);const leg=MAT.mahog;for(const [lx,lz,b] of [[-.2,-.2,0],[.2,-.2,0],[-.2,.2,1],[.2,.2,1]])add(new T.CylinderGeometry(.018,.014,.44,10),leg,lx,.22,lz,{to:g}).rotation.x=b?.08:0;
  add(RB(.48,.05,.46,.012),leg,0,.44,0,{to:g});add(RB(.44,.07,.42,.04,4),MAT.velvet,0,.49,-.01,{to:g});
  const bh=head?.82:.62;for(const e of [-1,1])add(RB(.035,bh,.035,.01),leg,e*.21,.47+bh/2,.21,{to:g});
  const sh=new T.Shape();sh.moveTo(-.23,0);sh.lineTo(.23,0);sh.lineTo(.23,bh-.12);sh.quadraticCurveTo(.2,bh+.02,0,bh+.04);sh.quadraticCurveTo(-.2,bh+.02,-.23,bh-.12);sh.lineTo(-.23,0);
  add(new T.ExtrudeGeometry(sh,{depth:.03,bevelEnabled:true,bevelThickness:.01,bevelSize:.01,bevelSegments:3,curveSegments:24}),leg,0,.5,.2,{to:g});
  const sh2=new T.Shape();sh2.moveTo(-.18,0);sh2.lineTo(.18,0);sh2.lineTo(.18,bh-.2);sh2.quadraticCurveTo(.15,bh-.08,0,bh-.06);sh2.quadraticCurveTo(-.15,bh-.08,-.18,bh-.2);sh2.lineTo(-.18,0);
  add(new T.ExtrudeGeometry(sh2,{depth:.02,bevelEnabled:true,bevelThickness:.012,bevelSize:.012,bevelSegments:3,curveSegments:24}),MAT.velvet,0,.56,.185,{to:g});return g}
const cardG=(name,x,z,ry)=>{const g=grp(x,TH+.006,z,ry);const t=card(name);const m=M('#ffffff',{map:t,roughness:.6});
  for(const s of [-1,1]){const p=add(new T.PlaneGeometry(.1,.04),m,0,.019,s*.009,{to:g,cast:false});p.rotation.order='YXZ';p.rotation.y=s<0?Math.PI:0;p.rotation.x=-.42}return g};
function wineGlass(x,z,dreg,to){const g=grp(x,TH+.006,z,0,to);add(lathe([[0,0],[.035,0],[.036,.004],[.006,.008],[.004,.1],[.012,.11],[.034,.14],[.04,.18],[.036,.2],[.035,.2],[.038,.18],[.031,.142],[.01,.115],[0,.113]],28),MAT.glass,0,0,0,{to:g,cast:false}).renderOrder=3;
  if(dreg)add(lathe([[0,0],[.012,0],[.028,.022],[0,.022]],20),MAT.wine,0,.115,0,{to:g,cast:false}).renderOrder=2;return g}
function napkin(x,z,r,to){const g=new T.PlaneGeometry(.26,.22,16,14);const p=g.attributes.position;for(let i=0;i<p.count;i++){const a=p.getX(i),b=p.getY(i);p.setZ(i,.03*Math.exp(-(a*a+b*b)*30)+.012*Math.sin(a*40+b*20)+.01*Math.cos(b*45))}g.computeVertexNormals();
  const m=new T.Mesh(g,MAT.linen);m.rotation.set(-Math.PI/2,0,r);m.position.set(x,TH+.012,z);m.castShadow=true;scene.add(m);return m}
const spoon=(x,z,r)=>{const g=grp(x,TH+.008,z,r);add(RB(.008,.003,.12,.0015),MAT.silver,0,0,.05,{to:g,cast:false});const b=add(new T.SphereGeometry(.018,16,10,0,TAU,0,Math.PI/2),MAT.silver,0,-.0,-.03,{to:g,cast:false});b.scale.set(.9,.25,1.4);b.rotation.x=Math.PI;return g};
SEATS.forEach(([name,x,z,ry,back,turn],i)=>{const dir=new T.Vector3(Math.sin(ry),0,Math.cos(ry));// facing toward the table
  const cx=x-dir.x*back,cz=z-dir.z*back;chair(cx,cz,ry+Math.PI+turn,i===0);
  // the setting, on the table edge in front of the seat
  const px=x+dir.x*.62,pz=z+dir.z*.62;const sx=new T.Vector3(Math.cos(ry),0,-Math.sin(ry));
  cardG(name,px+dir.x*.18,pz+dir.z*.18,ry);
  wineGlass(px+dir.x*.12-sx.x*.16,pz+dir.z*.12-sx.z*.16,name!=='Felix Osei');
  if(name==='Felix Osei'){// the one plate not cleared: a dessert, untouched, the spoon still clean beside it
    const pl=grp(px,TH+.006,pz,0);add(lathe([[0,0],[.08,0],[.1,.008],[.115,.014],[.11,.016],[.09,.01],[0,.008]],40),MAT.china,0,0,0,{to:pl});add(new T.TorusGeometry(.105,.003,6,40),MAT.gold,0,.013,0,{to:pl,rx:Math.PI/2,cast:false});
    add(lathe([[0,0],[.03,0],[.032,.006],[.006,.012],[.005,.05],[.04,.06],[.055,.1],[.054,.1],[.038,.062],[0,.06]],32),MAT.glass,0,.008,0,{to:pl,cast:false}).renderOrder=3;
    for(const [r0,r1,y,c] of [[.035,.042,.068,'#c89a5a'],[.042,.048,.078,'#a01828'],[.048,.052,.088,'#f2ead2']])add(new T.CylinderGeometry(r1,r0,.01,28),M(c,{roughness:.5}),0,y,0,{to:pl,cast:false}).renderOrder=2;
    add(new T.SphereGeometry(.012,12,10),M('#a0101a',{roughness:.2}),0,.096,0,{to:pl,cast:false});spoon(px+sx.x*.15,pz+sx.z*.15,ry)}
  else{napkin(px-sx.x*.0+dir.x*.0,pz,rnd()*TAU);if(i%2)spoon(px+sx.x*.14+dir.x*.05,pz+sx.z*.14+dir.z*.05,ry+.4)}
  if(name==='Colonel Ash'){const st=new T.Mesh(new T.PlaneGeometry(.2,.16),M('#ffffff',{map:TX.stain,transparent:true,depthWrite:false,roughness:.8}));st.rotation.set(-Math.PI/2,0,.6);st.position.set(px+dir.x*.08+sx.x*.14,TH+.0065,pz+dir.z*.08+sx.z*.14);scene.add(st)}});
/* ---------- candelabra and holly down the middle ---------- */
const flames=[];const flameT=ctex(32,64,(x,w,h)=>{const gr=x.createRadialGradient(16,40,1,16,36,22);gr.addColorStop(0,'rgba(255,250,220,1)');gr.addColorStop(.35,'rgba(255,190,90,.9)');gr.addColorStop(1,'rgba(255,120,30,0)');x.fillStyle=gr;x.beginPath();x.ellipse(16,38,10,24,0,0,TAU);x.fill()});
function candelabrum(z){const g=grp(0,TH+.006,z);add(lathe([[0,0],[.1,0],[.1,.015],[.05,.03],[.03,.06],[.02,.12],[.03,.16],[.015,.2],[.015,.36],[.025,.38],[0,.38]],32),MAT.silver,0,0,0,{to:g});
  const cup=(x,zz,y)=>{add(lathe([[0,0],[.022,0],[.03,.01],[.03,.03],[.016,.03],[0,.02]],20),MAT.silver,x,y,zz,{to:g});const h=.12+rnd()*.1;add(new T.CylinderGeometry(.011,.012,h,14),MAT.wax,x,y+.025+h/2,zz,{to:g});
    for(let k=0;k<2;k++)add(new T.CylinderGeometry(.003,.004,.03+rnd()*.03,6),MAT.wax,x+(rnd()-.5)*.02,y+.025+h-.03,zz+.011*(k?1:-1),{to:g,cast:false});
    const f=new T.Sprite(new T.SpriteMaterial({map:flameT,blending:T.AdditiveBlending,depthWrite:false}));f.scale.set(.025,.05,1);f.position.set(x,y+.025+h+.025,zz);g.add(f);flames.push(f)};
  cup(0,0,.38);for(let k=0;k<4;k++){const a=k/4*TAU+Math.PI/4;const ax=Math.cos(a)*.16,az=Math.sin(a)*.16;tube([[0,.3,0],[ax*.5,.36,az*.5],[ax,.3,az]],.007,MAT.silver,{to:g});cup(ax,az,.3)}return g}
candelabrum(TZ-.85);candelabrum(TZ+.85);
{const lf=M('#1e3a22',{roughness:.35}),berry=M('#a01018',{roughness:.2});const holly=new T.Shape();holly.moveTo(0,0);for(let k=0;k<=6;k++){const t=k/6;holly.lineTo(.012*(k%2?1.6:.6),t*.06)}for(let k=6;k>=0;k--){const t=k/6;holly.lineTo(-.012*(k%2?1.6:.6),t*.06)}
 const hg=new T.ShapeGeometry(holly);for(let i=0;i<120;i++){const z=TZ-1.25+rnd()*2.5;if(Math.abs(z-TZ+.85)<.12||Math.abs(z-TZ-.85)<.12)continue;const m=add(hg,lf,(rnd()-.5)*.14,TH+.012+rnd()*.03,z,{cast:true});m.rotation.set(-Math.PI/2+(rnd()-.5)*.8,rnd()*TAU,0);m.material.side=T.DoubleSide;
   if(rnd()<.35)for(let k=0;k<3;k++)add(new T.SphereGeometry(.007,8,6),berry,m.position.x+(rnd()-.5)*.02,m.position.y+.008,m.position.z+(rnd()-.5)*.02,{cast:false})}}
/* ---------- sideboard on the right wall ---------- */
{const g=grp(-hw+.3,0,TZ,-Math.PI/2);add(RB(1.9,.82,.5,.02),MAT.mahog,0,.47,0,{to:g});add(RB(1.96,.04,.54,.01),MAT.mahog,0,.9,0,{to:g});for(const x of [-.7,-.23,.23,.7]){add(RB(.42,.5,.012,.008),M('#ffffff',{map:TX.mahog,roughness:.25}),x,.45,-.255,{to:g});add(new T.SphereGeometry(.016,12,8),MAT.brass,x+(x<0?.16:-.16),.45,-.27,{to:g})}
 for(const x of [-.86,.86])add(lathe([[0,0],[.03,0],[.035,.03],[.02,.06],[0,.06]],12),MAT.mahog,x,0,0,{to:g});
 // silver tea service on a tray, two decanters, fruit in a bowl, a stack of dessert plates
 add(RB(.5,.015,.32,.006),MAT.silver,-.45,.927,0,{to:g});[[-.6,.0,.12,1],[-.42,.04,.09,1],[-.3,-.03,.07,0]].forEach(([x,z,h,sp])=>{add(lathe([[0,0],[.045,0],[.06,.04],[.055,h],[.03,h+.02],[.012,h+.04],[0,h+.04]],28),MAT.silver,x,.935,z,{to:g});
  add(new T.TorusGeometry(.035,.006,8,20,Math.PI*1.2),MAT.silver,x+.06,.935+h*.6,z,{to:g,rz:-Math.PI*.6});add(new T.SphereGeometry(.01,10,8),M('#1a1210'),x,.935+h+.045,z,{to:g});
  if(sp)tube([[x-.05,.935+h*.35,z],[x-.09,.935+h*.6,z],[x-.11,.935+h*.95,z]],.008,MAT.silver,{to:g})});
 for(const [x,c] of [[.05,'#9a4a0c'],[.22,'#4a0612']]){add(lathe([[0,0],[.055,0],[.06,.01],[.06,.15],[.035,.2],[.016,.23],[.016,.27],[.02,.28],[0,.28]],8),new T.MeshPhysicalMaterial({color:'#1c2428',roughness:0,transparent:true,opacity:.4,flatShading:true,depthWrite:false}),x,.92,0,{to:g,cast:false}).renderOrder=3;
   add(new T.CylinderGeometry(.05,.05,.1,8),new T.MeshPhysicalMaterial({color:c,roughness:.1,transparent:true,opacity:.85}),x,.98,0,{to:g,cast:false}).renderOrder=2;add(new T.IcosahedronGeometry(.03,0),new T.MeshPhysicalMaterial({color:'#2a3438',roughness:0,transparent:true,opacity:.55,flatShading:true}),x,1.23,0,{to:g,cast:false})}
 add(lathe([[0,0],[.05,0],[.06,.06],[.16,.1],[.15,.105],[0,.07]],40),MAT.silver,.55,.92,0,{to:g});for(let i=0;i<7;i++){const a=i/7*TAU;add(new T.SphereGeometry(.04,16,12),M(['#c8a020','#a02818','#d86a18','#5a8a20'][i%4],{roughness:.4}),.55+Math.cos(a)*.07,1.04+(i===6?.04:0),Math.sin(a)*.07,{to:g})}
 for(let i=0;i<6;i++)add(lathe([[0,0],[.08,0],[.1,.008],[.11,.012],[0,.012]],32),MAT.china,.85,.922+i*.012,.0,{to:g});
 // a still life above it
 add(new T.PlaneGeometry(.96,.72),M('#ffffff',{map:TX.still,roughness:.6}),0,1.85,.27,{to:g,ry:Math.PI,cast:false});for(const [w,h,x,y] of [[1.1,.07,0,1.85+.395],[1.1,.07,0,1.85-.395],[.07,.86,.515,1.85],[.07,.86,-.515,1.85]])add(RB(w,h,.05,.012),MAT.gold,x,y,.265,{to:g})}
/* ---------- chandelier ---------- */
const bulbM=M('#fff2d0',{emissive:'#ffcf88',emissiveIntensity:1.8});
{const g=grp(0,HH-.75,TZ);add(new T.CylinderGeometry(.006,.006,.6,6),MAT.brass,0,.45,0,{to:g,cast:false});add(new T.TorusGeometry(.38,.014,8,48),MAT.brass,0,0,0,{to:g,rx:Math.PI/2,cast:false});add(new T.TorusGeometry(.22,.01,8,40),MAT.brass,0,.12,0,{to:g,rx:Math.PI/2,cast:false});
 add(lathe([[0,-.18],[.05,-.12],[.03,0],[.02,.15],[0,.2]]),MAT.brass,0,0,0,{to:g,cast:false});for(let k=0;k<8;k++){const a=k/8*TAU,x=Math.cos(a)*.38,z=Math.sin(a)*.38;add(new T.CylinderGeometry(.012,.012,.08,10),MAT.wax,x,.05,z,{to:g,cast:false});add(new T.SphereGeometry(.018,10,8),bulbM,x,.11,z,{to:g,cast:false}).scale.set(1,1.5,1);
   for(let d=0;d<3;d++)add(new T.OctahedronGeometry(.012,0),new T.MeshPhysicalMaterial({color:'#e8f0f4',roughness:0,transparent:true,opacity:.6,flatShading:true}),x*.95,-.04-d*.035,z*.95,{to:g,cast:false})}}
/* ---------- sconces either side of the still life, rug under the table ---------- */
const sconceL=[];for(const dz of [-1.0,1.0]){const g=grp(-hw+.02,1.95,TZ+dz,Math.PI/2);add(RB(.08,.16,.02,.006),MAT.brass,0,0,0,{to:g});tube([[0,0,.01],[0,.03,.1],[0,.08,.14]],.007,MAT.brass,{to:g});add(new T.CylinderGeometry(.05,.07,.1,20,1,true),M('#f2e2c0',{emissive:'#ffcc80',emissiveIntensity:1.2,roughness:.6,side:T.DoubleSide}),0,.14,.14,{to:g,cast:false});
 const l=new T.PointLight('#ffbf78',.5,3.5,2);l.position.set(-hw+.3,2.05,TZ+dz);scene.add(l);sconceL.push(l)}
add(new T.PlaneGeometry(2.8,4.4),M('#ffffff',{map:ctex(512,768,(x,w,h)=>{x.fillStyle='#1a2236';x.fillRect(0,0,w,h);x.strokeStyle='#8a6a3a';x.lineWidth=6;x.strokeRect(30,30,w-60,h-60);x.fillStyle='#3a1a1e';x.fillRect(60,60,w-120,h-120);
  x.strokeStyle='rgba(160,120,70,.5)';x.lineWidth=3;for(let i=0;i<14;i++){x.beginPath();x.moveTo(60,60+i*48);x.lineTo(w-60,60+i*48+24);x.stroke()}noise(x,w,h,.08,9000)}),roughness:1}),0,.004,TZ,{rx:-Math.PI/2,cast:false});
/* ---------- lights ---------- */
const hemi=new T.HemisphereLight('#5a5a7a','#3a1e10',.42);scene.add(hemi);
const chand=new T.PointLight('#ffd09a',.9,10,1.5);chand.position.set(0,HH-.9,TZ);scene.add(chand);
const candL=[TZ-.85,TZ+.85].map(z=>{const l=new T.PointLight('#ffb060',.32,4,1.6);l.position.set(0,TH+.95,z);scene.add(l);return l});candL[0].castShadow=true;candL[0].shadow.mapSize.set(1024,1024);candL[0].shadow.bias=-.004;
const key=new T.SpotLight('#ffe0c0',.55,10,.75,.8,1.2);key.position.set(.3,HH-.05,TZ-1.8);key.target.position.set(0,TH,TZ+.4);scene.add(key,key.target);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.bias=-.0006;key.shadow.radius=4;
const moon=new T.SpotLight('#8aa6ff',1.2,9,.6,.8,1.2);moon.position.set(hw+1.8,2.6,TZ+.6);moon.target.position.set(-.5,0,TZ);scene.add(moon,moon.target);moon.castShadow=true;moon.shadow.mapSize.set(1024,1024);
const seat=n=>SEATS.find(s=>s[0]===n);const fz=seat('Felix Osei'),az=seat('Colonel Ash');
return {exposure:1.25,
 views:{wide:{p:[.12,2.45,.55],t:[0,.55,4.6],fov:60,where:'Dining room · down the table',text:'The dining room. Dinner is over and the table half cleared. Candles burning low in both candelabra, holly down the middle, chairs pushed back where people got up.'},
  dessert:{p:[.12,1.28,TZ-.42],t:[-.36,TH+.05,TZ],fov:40,where:'Dining room · close look',text:'A place at the side of the table. A dessert glass on its plate, the spoon beside it clean. Raspberry, custard, cream.'},
  cards:{p:[.0,1.2,TZ-2.25],t:[.0,TH+.02,TZ-1.2],fov:50,where:'Dining room · close look',text:'Place cards in a careful hand. Harriet Vane at the foot, Dr. Okafor and Iris Lund either side of her.'},
  stain:{p:[-.3,1.3,TZ+1.45],t:[.3,TH,TZ+1.12],fov:44,where:'Dining room · close look',text:'The cloth by Colonel Ash\'s place. A spread of red wine, dried at the edges. His glass stands a hand\'s width from it.'},
  head:{p:[.45,1.45,TZ+.7],t:[0,TH+.1,TZ+1.55],fov:54,where:'Dining room · close look',text:'The head of the table. Edmund\'s chair, the tallest, pushed in. His card. His glass.'},
  candles:{p:[.45,1.25,TZ-1.45],t:[0,1.0,TZ-.85],fov:48,where:'Dining room · close look',text:'Five-branched silver. The candles burned down unevenly, wax run over the cups.'},
  sideboard:{p:[-.85,1.6,TZ-1.25],t:[-2.1,1.25,TZ],fov:58,where:'Dining room · close look',text:'The sideboard. Tea things on a tray, two decanters, fruit, the dessert plates stacked. A still life above.'},
  curtains:{p:[-.4,1.4,1.6],t:[2.2,1.15,2.85],fov:56,where:'Dining room · close look',text:'Green velvet curtains, each caught back with a gold cord and tassel.'},
  dark:{p:[.12,2.45,.55],t:[0,.55,4.6],fov:60,where:'Dining room · power out',text:'The lights go. The candles on the table keep burning; the snow outside gives the windows a little blue.',dark:true}},
 update(t,dt,on,dk){chand.intensity=.9*on;key.intensity=.55*on;bulbM.emissiveIntensity=1.8*on;sconceL.forEach(l=>l.intensity=.5*on);hemi.intensity=.42-.26*dk;moon.intensity=1.2+1.4*dk;
   const f=.9+.06*Math.sin(t*9)+.04*Math.sin(t*15.3);candL.forEach((l,i)=>l.intensity=(.32+.3*dk)*f);flames.forEach((s,i)=>s.scale.y=.05*(.92+.08*Math.sin(t*9+i*1.7)))}}});
