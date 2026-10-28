// ROOM {"title":"Blackwood Library Proof","aria":"The library, rendered in 3D","loading":"Lighting the library…","where":"Library · power on","text":"The library. Shelves to the ceiling on three walls, the ladder on its rail. Through the doorway, the corridor runs straight to the study door.","buttons":[["wide","The library"],["shelves","Up the shelves"],["doorway","The doorway"],["chairs","Reading chairs"],["atlas","The atlas"],["desk","Writing table"],["bookends","Bookends"],["ladder","The ladder"],["dark","Power out"]]}
ROOM(31,H=>{const {T,TAU,rnd,ctex,noise,scene,M,add,RB,BOX,lathe,grp,plane,tube,tiledBox,lin}=H;
/* ---------- textures ---------- */
const woodT=(base,n=120,rep)=>ctex(512,512,(x,w,h)=>{x.fillStyle=base;x.fillRect(0,0,w,h);for(let i=0;i<n;i++){const y=rnd()*h;x.strokeStyle=`rgba(${rnd()<.5?20:120},${rnd()<.5?10:70},${rnd()<.5?5:30},${.08+rnd()*.16})`;x.lineWidth=.6+rnd()*2.2;x.beginPath();x.moveTo(0,y);for(let k=1;k<=8;k++)x.lineTo(k*w/8,y+Math.sin(k*1.3+y)*3*rnd());x.stroke()}noise(x,w,h,.04)},rep);
const TX={mahog:woodT('#4a2416'),mahogV:null,
 // chevron parquet
 parquet:ctex(512,512,(x,w,h)=>{x.fillStyle='#2a1a0e';x.fillRect(0,0,w,h);const cw=64,ph=32;for(let c=0;c<8;c++)for(let r=-4;r<22;r++){const x0=c*cw,y0=r*ph;const t=rnd();x.fillStyle=`rgb(${110+t*34|0},${70+t*22|0},${38+t*14|0})`;x.beginPath();
     if(c%2===0){x.moveTo(x0,y0);x.lineTo(x0+cw,y0-cw);x.lineTo(x0+cw,y0-cw+ph);x.lineTo(x0,y0+ph)}else{x.moveTo(x0,y0-cw);x.lineTo(x0+cw,y0);x.lineTo(x0+cw,y0+ph);x.lineTo(x0,y0-cw+ph)}x.closePath();x.fill();
     x.save();x.clip();for(let g=0;g<6;g++){x.strokeStyle=`rgba(40,20,8,${.1+rnd()*.15})`;x.lineWidth=.6+rnd();const o=rnd()*ph;x.beginPath();if(c%2===0){x.moveTo(x0,y0+o);x.lineTo(x0+cw,y0-cw+o)}else{x.moveTo(x0,y0-cw+o);x.lineTo(x0+cw,y0+o)}x.stroke()}x.restore();
     x.strokeStyle='rgba(12,6,2,.8)';x.lineWidth=1.4;x.stroke()}noise(x,w,h,.04,6000)},[3.2,3.8]),
 plaster:ctex(256,256,(x,w,h)=>{x.fillStyle='#4a4036';x.fillRect(0,0,w,h);for(let i=0;i<5000;i++){const v=rnd()<.5?0:255;x.fillStyle=`rgba(${v},${v},${v},${rnd()*.05})`;x.fillRect(rnd()*w,rnd()*h,1+rnd()*2,1+rnd()*2)}},[3,3]),
 green:ctex(256,256,(x,w,h)=>{x.fillStyle='#1e3a28';x.fillRect(0,0,w,h);for(let i=0;i<5000;i++){const v=rnd()<.5?0:255;x.fillStyle=`rgba(${v},${v},${v},${rnd()*.06})`;x.fillRect(rnd()*w,rnd()*h,1+rnd()*2,1+rnd()*2)}x.strokeStyle='rgba(206,166,92,.8)';x.lineWidth=3;x.strokeRect(10,10,w-20,h-20)}),
 leather:ctex(256,256,(x,w,h)=>{x.fillStyle='#7a4220';x.fillRect(0,0,w,h);for(let i=0;i<70;i++){x.strokeStyle=`rgba(0,0,0,${.05+rnd()*.08})`;x.lineWidth=1;x.beginPath();const px=rnd()*w,py=rnd()*h;x.moveTo(px,py);x.quadraticCurveTo(px+rnd()*40-20,py+rnd()*40-20,px+rnd()*60-30,py+rnd()*60-30);x.stroke()}noise(x,w,h,.06,4000)},[2,2]),
 rug:ctex(1024,768,(x,w,h)=>{x.fillStyle='#1a2a3a';x.fillRect(0,0,w,h);const B=70;x.fillStyle='#4a1a14';x.fillRect(B,B,w-2*B,h-2*B);x.strokeStyle='#a8844a';x.lineWidth=4;x.strokeRect(B-10,B-10,w-2*B+20,h-2*B+20);x.strokeRect(B+14,B+14,w-2*B-28,h-2*B-28);
   for(let i=0;i<w;i+=48)for(const yy of [B/2,h-B/2]){x.fillStyle='#8a6a3a';x.beginPath();x.arc(i+24,yy,10,0,TAU);x.fill();x.fillStyle='#4a1a14';x.beginPath();x.arc(i+24,yy,4,0,TAU);x.fill()}
   for(let i=0;i<h;i+=48)for(const xx of [B/2,w-B/2]){x.fillStyle='#8a6a3a';x.beginPath();x.arc(xx,i+24,10,0,TAU);x.fill()}
   x.save();x.translate(w/2,h/2);for(let r=0;r<4;r++){x.fillStyle=['#1a2a3a','#6a4c2a','#3a1a14','#7a5a38'][r];x.beginPath();x.ellipse(0,0,220-r*45,150-r*32,0,0,TAU);x.fill()}x.restore();
   for(let i=0;i<120;i++){x.strokeStyle='rgba(168,132,74,.3)';x.lineWidth=2;const px=B+30+rnd()*(w-2*B-60),py=B+30+rnd()*(h-2*B-60);x.beginPath();x.moveTo(px,py-6);x.lineTo(px+6,py);x.lineTo(px,py+6);x.lineTo(px-6,py);x.closePath();x.stroke()}noise(x,w,h,.08,22000)}),
 runner:ctex(256,512,(x,w,h)=>{x.fillStyle='#4a1418';x.fillRect(0,0,w,h);x.fillStyle='#1a2236';x.fillRect(0,0,30,h);x.fillRect(w-30,0,30,h);x.fillStyle='#b08a4a';x.fillRect(32,0,4,h);x.fillRect(w-36,0,4,h);noise(x,w,h,.07,3000)},[1,5]),
 wall:ctex(512,512,(x,w,h)=>{x.fillStyle='#3a2a22';x.fillRect(0,0,w,h);for(let i=0;i<8;i++){x.fillStyle=i%2?'rgba(255,255,255,.02)':'rgba(0,0,0,.05)';x.fillRect(i*w/8,0,w/8,h)}noise(x,w,h,.05,5000)},[4,2]),
 atlas:ctex(1024,640,(x,w,h)=>{x.fillStyle='#e6dcc0';x.fillRect(0,0,w,h);const pg=(ox)=>{x.save();x.translate(ox,0);x.fillStyle='#b8cad0';x.fillRect(30,40,w/2-60,h-90);x.fillStyle='#d8c890';
     for(let k=0;k<5;k++){x.beginPath();const cx=60+rnd()*(w/2-120),cy=80+rnd()*(h-180);for(let i=0;i<=22;i++){const a=i/22*TAU,r=30+rnd()*70;x.lineTo(cx+Math.cos(a)*r*1.3,cy+Math.sin(a)*r)}x.fill();x.strokeStyle='rgba(90,70,40,.6)';x.lineWidth=1.2;x.stroke()}
     x.strokeStyle='rgba(60,60,90,.25)';x.lineWidth=1;for(let i=1;i<8;i++){x.beginPath();x.moveTo(30+i*(w/2-60)/8,40);x.lineTo(30+i*(w/2-60)/8,h-50);x.stroke()}for(let i=1;i<6;i++){x.beginPath();x.moveTo(30,40+i*(h-90)/6);x.lineTo(w/2-30,40+i*(h-90)/6);x.stroke()}
     x.fillStyle='rgba(40,30,20,.75)';x.font='italic 15px Georgia';for(let i=0;i<9;i++)x.fillText(['Fallow','Kirkby','Ashdown','Mere','Holt','Carrick','Wendle','Brack','Scar'][i],60+rnd()*(w/2-160),70+rnd()*(h-140));
     x.strokeStyle='rgba(60,40,20,.8)';x.lineWidth=2;x.strokeRect(30,40,w/2-60,h-90);x.font='bold 18px Georgia';x.fillText(ox?'THE NORTHERN FELLS':'PLATE XIV',50,h-24);x.restore()};pg(0);pg(w/2);
   const g=x.createLinearGradient(w/2-40,0,w/2+40,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.5,'rgba(60,40,20,.4)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(w/2-40,0,80,h)}),
 letter:ctex(256,340,(x,w,h)=>{x.fillStyle='#eee6d4';x.fillRect(0,0,w,h);x.fillStyle='#22284a';x.font='italic 15px Georgia';const L=['Blackwood, Christmas Eve','','Dearest Mother,','The snow has not stopped','since four. The road is','closed below the bridge and','Mr Reyes says we shall be','here till Boxing Day at least.','Mr Blackwood has been in','a strange temper all','evening. I'];L.forEach((s,i)=>x.fillText(s,18,28+i*23))}),
 slip:ctex(64,128,(x,w,h)=>{x.fillStyle='#d8cfa8';x.fillRect(0,0,w,h);x.strokeStyle='rgba(80,60,40,.6)';for(let i=0;i<8;i++){x.beginPath();x.moveTo(4,14+i*14);x.lineTo(w-4,14+i*14);x.stroke()}x.fillStyle='#4a2a2a';x.font='9px Georgia';x.fillText('RETURNED',6,10)}),
};
const mahogV=TX.mahog.clone();mahogV.center.set(.5,.5);mahogV.rotation=Math.PI/2;mahogV.needsUpdate=true;
const MAT={floor:M('#ffffff',{map:TX.parquet,roughness:.34}),ceil:M('#ffffff',{map:TX.plaster,roughness:1}),wall:M('#ffffff',{map:TX.wall,roughness:.9}),
 case:M('#8a6a5a',{map:TX.mahog,roughness:.38}),caseV:M('#8a6a5a',{map:mahogV,roughness:.38}),dark:M('#6a5048',{map:TX.mahog,roughness:.4}),back:M('#3a2820',{map:TX.mahog,roughness:.85}),
 brass:M('#c9a24a',{metalness:.85,roughness:.3}),leather:M('#ffffff',{map:TX.leather,roughness:.42}),gilt:M('#b8913c',{metalness:.7,roughness:.36}),rug:M('#ffffff',{map:TX.rug,roughness:.95}),
 shade:M('#c8b088',{emissive:'#ffa850',emissiveIntensity:.45,roughness:.8,side:T.DoubleSide}),greenGlass:new T.MeshPhysicalMaterial({color:'#0a2a12',roughness:.12,clearcoat:1,emissive:'#14501e',emissiveIntensity:.18}),
 glass:new T.MeshPhysicalMaterial({color:'#1e262a',roughness:.02,transparent:true,opacity:.32,clearcoat:1,depthWrite:false}),whisky:new T.MeshPhysicalMaterial({color:'#9a4a0c',roughness:.1,transparent:true,opacity:.82}),
 paper:M('#ece4d2',{roughness:.9})};
/* ---------- room: 5 m wide, 6 m deep, 3.6 m high; doorway in the far wall ---------- */
const underDoor=new T.MeshBasicMaterial({color:lin('#ffb868')}),udC=lin('#ffb868');const W=5,D=6,Hh=3.6,hw=W/2,DX=1.45,DW=1.0,DH=2.2;
plane(W,D,MAT.floor,0,0,D/2,0,-Math.PI/2);plane(W,D,MAT.ceil,0,Hh,D/2,0,Math.PI/2);plane(D,Hh,MAT.wall,-hw,Hh/2,D/2,Math.PI/2);plane(D,Hh,MAT.wall,hw,Hh/2,D/2,-Math.PI/2);plane(W,Hh,MAT.wall,0,Hh/2,0,0);
{const sh=new T.Shape();sh.moveTo(-hw,0);sh.lineTo(hw,0);sh.lineTo(hw,Hh);sh.lineTo(-hw,Hh);sh.lineTo(-hw,0);const ho=new T.Path();ho.moveTo(-DX-DW/2,0);ho.lineTo(-DX-DW/2,DH);ho.lineTo(-DX+DW/2,DH);ho.lineTo(-DX+DW/2,0);ho.lineTo(-DX-DW/2,0);sh.holes.push(ho);
 const g=new T.ShapeGeometry(sh);const p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+hw)/W,p.getY(i)/Hh);const m=new T.Mesh(g,MAT.wall);m.position.z=D;m.rotation.y=Math.PI;m.receiveShadow=true;scene.add(m)}
// coffered ceiling
for(let x=-hw+.02;x<=hw;x+=1.25)add(RB(.16,.2,D,.015),MAT.dark,Math.min(x,hw-.08),Hh-.1,D/2,{cast:false});for(let z=.0;z<=D;z+=1.2)add(RB(W,.2,.16,.015),MAT.dark,0,Hh-.1,Math.max(.08,Math.min(z,D-.08)),{cast:false});
/* ---------- books: instanced by colour and spine style ---------- */
const bookCols=['#4a1012','#141f38','#523814','#162c1c','#2a1630','#521e0e','#141316','#5a4c32','#3a0e1a','#12292c','#6a5028','#241a12'];
const spineFor=(col,v)=>ctex(64,256,(x,w,h)=>{x.fillStyle=col;x.fillRect(0,0,w,h);const g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,'rgba(0,0,0,.5)');g.addColorStop(.3,'rgba(255,240,220,.08)');g.addColorStop(.65,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.55)');x.fillStyle=g;x.fillRect(0,0,w,h);noise(x,w,h,.07,700);
  const gold='rgba(214,174,96,.95)';x.fillStyle=gold;
  if(v===0){for(const y of [20,27,229,236])x.fillRect(4,y,w-8,3);x.fillStyle='#120e0a';x.fillRect(9,58,w-18,40);x.strokeStyle=gold;x.lineWidth=2;x.strokeRect(9,58,w-18,40);x.fillStyle=gold;for(let i=0;i<3;i++)x.fillRect(15,67+i*9,w-30-rnd()*12,3)}
  else if(v===1){for(const y of [44,96,148,200]){x.fillStyle='rgba(0,0,0,.4)';x.fillRect(0,y-7,w,14);x.fillStyle='rgba(255,230,200,.12)';x.fillRect(0,y-7,w,3);x.fillStyle=gold;x.fillRect(5,y-1,w-10,2)}for(let i=0;i<2;i++)x.fillRect(13,62+i*10,w-26-rnd()*10,3)}
  else{x.fillRect(6,12,w-12,2);x.fillRect(6,h-14,w-12,2);x.save();x.translate(w/2,h*.5);x.rotate(-Math.PI/2);x.fillRect(-55,-4,96-rnd()*24,4);x.fillRect(-55,6,50,2);x.restore()}});
const SP=[],BM=[];bookCols.forEach((c,i)=>{BM[i]=M(c,{roughness:.6});SP[i]=[0,1,2].map(v=>M('#ffffff',{map:spineFor(c,v),roughness:.5}))});
const buckets={};const bodyGeo=new T.RoundedBoxGeometry(1,1,1,2,.08);const spineGeo=new T.PlaneGeometry(1,1);spineGeo.rotateY(Math.PI);
const _m=new T.Matrix4(),_q=new T.Quaternion(),_s=new T.Vector3(),_p=new T.Vector3(),_e=new T.Euler();
function book(parent,x,y,z,bw,bh,bd,ci,v,rz=0,lay=false){const k=ci+'_'+v;const b=buckets[k]||(buckets[k]={ci,v,body:[],spine:[]});parent.updateMatrixWorld();
  const L=new T.Matrix4().compose(_p.set(x,y,z),_q.setFromEuler(_e.set(0,0,rz)),_s.set(1,1,1));const Wm=parent.matrixWorld.clone().multiply(L);
  b.body.push(Wm.clone().multiply(new T.Matrix4().makeScale(bw,bh,bd)));b.spine.push(Wm.clone().multiply(new T.Matrix4().makeTranslation(0,0,-bd/2-.0009)).multiply(new T.Matrix4().makeScale(bw*.98,bh*.985,1)))}
function flushBooks(){for(const k in buckets){const b=buckets[k];const im=new T.InstancedMesh(bodyGeo,BM[b.ci],b.body.length);b.body.forEach((m,i)=>im.setMatrixAt(i,m));im.castShadow=true;im.receiveShadow=true;im.frustumCulled=false;scene.add(im);
  const is=new T.InstancedMesh(spineGeo,SP[b.ci][b.v],b.spine.length);b.spine.forEach((m,i)=>is.setMatrixAt(i,m));is.receiveShadow=true;is.frustumCulled=false;scene.add(is)}}
/* ---------- shelving: bays with uprights, cornice, plinth; group local x runs along the wall, front faces local -z ---------- */
const BD=.36,SH=7,TOP=3.3,BAY=.92;const nosing=M('#a8843c',{metalness:.7,roughness:.5});nosing.userData.env=.35;
function shelving(px,pz,ry,L,opts={}){const g=grp(px,0,pz,ry);const nb=Math.max(1,Math.round(L/BAY)),bw=L/nb;
  add(BOX(L,TOP,.02),MAT.back,L/2,TOP/2,-.012,{to:g,cast:false});
  add(RB(L+.04,.12,BD+.04,.01),MAT.dark,L/2,.06,-BD/2,{to:g});add(RB(L+.02,.03,BD+.02,.006),MAT.case,L/2,.135,-BD/2,{to:g});
  for(const [hh,dd,yy] of [[.08,BD+.03,TOP+.04],[.05,BD+.08,TOP+.105],[.04,BD+.13,TOP+.15]])add(RB(L+.06,hh,dd,.01),MAT.dark,L/2,yy,-dd/2,{to:g});
  for(let i=0;i<=nb;i++){const ux=Math.min(L-.025,Math.max(.025,i*bw));add(RB(.05,TOP-.12,BD,.008),MAT.caseV,ux,(TOP+.12)/2,-BD/2,{to:g});add(RB(.06,TOP-.4,.012,.004),MAT.caseV,ux,TOP/2+.06,-BD-.006,{to:g,cast:false})}
  const gap=(TOP-.2)/SH;for(let bi=0;bi<nb;bi++){const x0=bi*bw+.03,x1=(bi+1)*bw-.03;
    for(let s=0;s<SH;s++){const y0=.16+s*gap;add(RB(x1-x0,.03,BD-.02,.005),MAT.case,(x0+x1)/2,y0,-BD/2-.01,{to:g});add(BOX(x1-x0,.006,.004),nosing,(x0+x1)/2,y0+.006,-BD-.022,{to:g,cast:false});
      if(opts.skip&&opts.skip(bi,s,g,x0,x1,y0+.015))continue;fillShelf(g,x0+.01,x1-.01,y0+.015,gap-.06,s===0)}}
  return g}
function fillShelf(g,x0,x1,top,maxH,tall){let x=x0;while(x<x1-.03){const r=rnd();
  if(r<.04){x+=.04+rnd()*.06;continue}
  if(r<.08&&x<x1-.3){const n=2+Math.floor(rnd()*3);for(let k=0;k<n;k++){const bh=.035+rnd()*.01;book(g,x+.12,top+bh/2+k*.045,-BD+.03+.09,.24-k*.01,bh,.18,Math.floor(rnd()*12),2)}x+=.27;continue}
  const bw=.022+rnd()*.03,bh=Math.min(maxH-.02,tall?.3+rnd()*.08:.2+rnd()*.12),bd=tall?.25+rnd()*.05:.17+rnd()*.07;const lean=rnd()<.04?-.14:0;
  book(g,x+bw/2+(lean?Math.sin(-lean)*bh/2:0),top+bh/2-(lean?.003:0),-BD+.025+bd/2,bw,bh,bd,Math.floor(rnd()*12),Math.floor(rnd()*3),lean);x+=bw+(lean?Math.sin(-lean)*bh+.004:.0015)}}
// left wall (x=-hw): runs +z; right wall (x=+hw): runs -z; back wall: left of the doorway
let bookendShelf=null;
shelving(-hw,1.0,-Math.PI/2,D-1.0);
shelving(hw,D,Math.PI/2,D-1.0);
shelving(-hw+BD,D,0,DX-DW/2-.22-(-hw+BD),{skip:(bi,s,g,x0,x1,top)=>{if(bi===1&&s===3){bookendShelf={g,x0,x1,top};return true}return false}});
// the pair of bookends, holding a short run in the middle of an eye-level shelf
if(bookendShelf){const {g,x0,x1,top}=bookendShelf;const c=(x0+x1)/2;const beM=M('#8a6a30',{metalness:.7,roughness:.5});beM.userData.env=.3;const be=(sx)=>{const b=grp(sx,top,-BD+.14,0,g);add(RB(.02,.2,.12,.004),beM,0,.1,0,{to:b});for(const [w,h,yy] of [[.06,.018,.2],[.042,.018,.218],[.024,.018,.236]])add(RB(w,h,.12,.004),beM,-.008,yy,0,{to:b});add(RB(.11,.008,.12,.003),beM,.045,.004,0,{to:b});return b};
 let x=c-.16;be(x-.008);for(let i=0;i<9;i++){const bw=.028+rnd()*.012,bh=.22+rnd()*.06;book(g,x+bw/2,top+bh/2,-BD+.025+.1,bw,bh,.2,(i*5+2)%12,i%3);x+=bw+.002}const end=be(x+.008);end.rotation.y=Math.PI;(H.hook||(()=>{}))('bookend',end)}
/* ---------- the doorway: casing, and the corridor running to the study door ---------- */
for(const [w,d] of [[.16,.05],[.1,.07]]){for(const e of [-1,1])add(RB(w,DH+w,d,.008),MAT.caseV,DX+e*(DW/2+w/2),(DH+w)/2,D-d/2);add(RB(DW+2*w,w,d,.008),MAT.case,DX,DH+w/2,D-d/2)}
for(const e of [-1,1])add(BOX(.02,DH,.3),MAT.dark,DX+e*(DW/2-.01),DH/2,D+.15,{cast:false});
{const CL=5.2,CW=1.5,CH=2.7,z0=D+.02,cx=DX;const wallC=M('#ffffff',{map:TX.wall,roughness:.9});
 add(new T.PlaneGeometry(CW,CL),M('#ffffff',{map:TX.parquet,roughness:.36}),cx,0,z0+CL/2,{rx:-Math.PI/2,cast:false});add(new T.PlaneGeometry(CW,CL),MAT.ceil,cx,CH,z0+CL/2,{rx:Math.PI/2,cast:false});
 add(new T.PlaneGeometry(CL,CH),wallC,cx-CW/2,CH/2,z0+CL/2,{ry:Math.PI/2,cast:false});add(new T.PlaneGeometry(CL,CH),wallC,cx+CW/2,CH/2,z0+CL/2,{ry:-Math.PI/2,cast:false});
 for(const e of [-1,1]){add(BOX(.03,.85,CL),MAT.dark,cx+e*(CW/2-.015),.425,z0+CL/2,{cast:false});add(BOX(.05,.04,CL),MAT.case,cx+e*(CW/2-.025),.87,z0+CL/2,{cast:false})}
 add(new T.PlaneGeometry(.7,CL-.3),M('#ffffff',{map:TX.runner,roughness:.95}),cx,.003,z0+CL/2,{rx:-Math.PI/2,cast:false});
 // the study door at the end: panelled, brass lever, lamplight under it
 const ez=z0+CL;add(new T.PlaneGeometry(CW,CH),wallC,cx,CH/2,ez,{ry:Math.PI,cast:false});const sd=grp(cx,0,ez-.03);
 add(RB(.88,2.1,.04,.006),M('#8a6248',{map:TX.mahog,roughness:.36}),0,1.065,0,{to:sd});for(const [y,h] of [[1.55,.7],[.6,.8]])for(const e of [-1,1])add(RB(.3,h,.02,.01),M('#7a5640',{map:mahogV,roughness:.36}),e*.19,y,-.025,{to:sd});
 add(RB(.05,.22,.008,.004),MAT.brass,.36,1.0,-.026,{to:sd});tube([[.36,1.04,-.04],[.36,1.04,-.066],[.33,1.038,-.072],[.24,1.03,-.07]],.0085,MAT.brass,{to:sd});
 for(const e of [-1,1])add(RB(.12,2.25,.06,.008),M('#5e4030',{map:mahogV,roughness:.32}),e*.5,1.125,.0,{to:sd});add(RB(1.12,.12,.06,.008),M('#5e4030',{map:TX.mahog,roughness:.32}),0,2.18,0,{to:sd});
 add(BOX(.84,.008,.004),underDoor,0,.005,-.02,{to:sd,cast:false});
 // a console table and a sconce halfway down
 const ct=grp(cx+CW/2-.2,0,z0+2.2,-Math.PI/2);add(RB(.9,.03,.3,.008),MAT.case,0,.8,0,{to:ct});for(const e of [-1,1])add(RB(.03,.78,.03,.006),MAT.case,e*.4,.39,-.1,{to:ct});add(lathe([[0,0],[.05,0],[.07,.08],[.05,.2],[.03,.26],[.04,.28],[0,.28]],24),M('#2a4a6a',{roughness:.2}),0,.815,0,{to:ct});
 const sc=grp(cx-CW/2+.02,1.85,z0+2.2,Math.PI/2);add(RB(.08,.14,.03,.01),MAT.brass,0,0,0,{to:sc});add(new T.CylinderGeometry(.05,.08,.12,20,1,true),MAT.shade,0,.08,.1,{to:sc,cast:false})}
/* ---------- rug, reading chairs, lamp table with one glass ---------- */
add(new T.PlaneGeometry(3.0,2.2),MAT.rug,.1,.004,3.0,{rx:-Math.PI/2,cast:false});
function club(x,z,ry){const g=grp(x,0,z,ry);const L=MAT.leather,feet=M('#2a1a10',{roughness:.35});for(const [lx,lz] of [[-.34,-.32],[.34,-.32],[-.34,.32],[.34,.32]])add(lathe([[0,0],[.03,0],[.035,.04],[0,.06]]),feet,lx,0,lz,{to:g});
  add(RB(.86,.3,.82,.06),L,0,.21,0,{to:g});add(RB(.58,.14,.6,.07,4),L,0,.43,.08,{to:g});const b=add(RB(.82,.5,.2,.08),L,0,.66,-.31,{to:g});b.rotation.x=-.12;
  for(const s of [-1,1]){add(RB(.16,.36,.8,.07),L,s*.35,.5,.0,{to:g});for(let i=0;i<9;i++)add(new T.SphereGeometry(.007,8,6),MAT.brass,s*.35+s*.081,.36+(i%9)*.0+.0,-.36+i*.09,{to:g,cast:false})}return g}
club(1.0,2.4,-.25);club(-.75,2.65,.45);
{const g=grp(.18,0,3.25);add(new T.CylinderGeometry(.26,.26,.03,40),MAT.case,0,.6,0,{to:g});add(new T.TorusGeometry(.26,.007,6,40),MAT.brass,0,.6,0,{to:g,rx:Math.PI/2});add(lathe([[0,0],[.18,0],[.18,.02],[.05,.05],[.03,.3],[.05,.58],[0,.59]]),MAT.case,0,0,0,{to:g});
 add(lathe([[0,0],[.08,0],[.08,.015],[.03,.03],[.015,.38],[.025,.4],[0,.4]]),MAT.brass,-.08,.615,-.05,{to:g});add(lathe([[.11,0],[.17,0],[.17,.01],[.1,.22],[.09,.22]],40),MAT.shade,-.08,.95,-.05,{to:g,cast:false});
 const tg=grp(.1,.615,.08,0,g);add(lathe([[0,0],[.036,0],[.04,.004],[.042,.09],[.038,.09],[.035,.008],[0,.008]],28),MAT.glass,0,0,0,{to:tg,cast:false}).renderOrder=3;add(new T.CylinderGeometry(.036,.034,.03,24),MAT.whisky,0,.023,0,{to:tg,cast:false}).renderOrder=2;
 add(new T.CylinderGeometry(.05,.05,.004,24),M('#2a1a10',{roughness:.5}),.1,.613,.08,{to:g,cast:false})}
/* ---------- the atlas open on its stand, reading glasses on the page ---------- */
{const g=grp(-1.85,0,3.4,-1.05);add(lathe([[0,0],[.2,0],[.2,.03],[.06,.06],[.04,.8],[.06,.85],[0,.85]]),MAT.case,0,0,0,{to:g});const top=grp(0,.92,0,0,g);top.rotation.x=-.5;
 add(RB(.7,.04,.46,.01),MAT.case,0,0,0,{to:top});add(RB(.7,.03,.03,.006),MAT.case,0,.035,.22,{to:top});add(RB(.66,.025,.42,.004),M('#2a3a2a',{roughness:.5}),0,.032,0,{to:top});
 for(const s of [-1,1])add(RB(.31,.02,.4,.004),MAT.paper,s*.16,.05,0,{to:top,rz:s*.035});const pg=new T.Mesh(new T.PlaneGeometry(.64,.4),M('#ffffff',{map:TX.atlas,roughness:.85}));pg.rotation.set(-Math.PI/2,0,Math.PI);pg.position.set(0,.0615,0);top.add(pg);
 const gl=grp(.12,.068,.04,.0,top);gl.rotation.y=.4;const rim=M('#2a1a10',{metalness:.3,roughness:.25});const lensM=new T.MeshPhysicalMaterial({color:'#c8d8e0',roughness:0,transparent:true,opacity:.25,clearcoat:1,depthWrite:false});
 for(const e of [-1,1]){add(new T.TorusGeometry(.021,.0035,10,32),rim,e*.026,.004,0,{to:gl,rx:Math.PI/2});add(new T.CircleGeometry(.02,28),lensM,e*.026,.0055,0,{to:gl,rx:-Math.PI/2,cast:false})}
 tube([[-.006,.005,-.002],[0,.008,-.004],[.006,.005,-.002]],.0025,rim,{to:gl});
 // temples folded flat behind the lenses
 tube([[-.047,.004,-.004],[-.046,.006,.012],[.02,.007,.016],[.04,.007,.012]],.0018,rim,{to:gl});tube([[.047,.004,-.004],[.046,.009,.01],[-.02,.01,.02],[-.04,.01,.014]],.0018,rim,{to:gl})}
/* ---------- the writing table: Iris's letters, returned books, banker's lamp ---------- */
{const g=grp(-.75,0,3.85,.08);const tw=1.3,td=.68;add(RB(tw,.04,td,.01),MAT.case,0,.76,0,{to:g});add(new T.PlaneGeometry(tw-.16,td-.16),M('#ffffff',{map:TX.green,roughness:.6}),0,.7805,0,{to:g,rx:-Math.PI/2,cast:false});
 add(RB(tw-.06,.1,td-.06,.008),MAT.case,0,.69,0,{to:g});for(const e of [-1,1])for(const f of [-1,1])add(lathe([[0,0],[.025,0],[.03,.1],[.022,.4],[.03,.6],[.035,.64],[0,.64]],16),MAT.case,e*(tw/2-.06),0,f*(td/2-.06),{to:g});
 for(const e of [-1,1]){add(RB(.4,.07,.01,.004),MAT.case,e*.32,.69,-td/2+.025,{to:g});add(new T.SphereGeometry(.012,10,8),MAT.brass,e*.32,.69,-td/2+.012,{to:g})}
 // banker's lamp
 const bl=grp(.45,.78,.18,0,g);add(RB(.16,.02,.1,.01),MAT.brass,0,.01,0,{to:bl});add(new T.CylinderGeometry(.008,.008,.3,10),MAT.brass,0,.16,0,{to:bl});add(new T.CylinderGeometry(.075,.075,.34,24,1,true,0,Math.PI),MAT.greenGlass,0,.33,0,{to:bl,rz:Math.PI/2,ry:-Math.PI/2}).material.side=T.DoubleSide;add(new T.CylinderGeometry(.02,.02,.2,12),M('#fff3d0',{emissive:'#ffd590',emissiveIntensity:2.4}),0,.31,0,{to:bl,rz:Math.PI/2,cast:false});
 // the letter in progress, two finished ones, pen and ink
 const pl=new T.Mesh(new T.PlaneGeometry(.2,.27),M('#ffffff',{map:TX.letter,roughness:.9}));pl.rotation.set(-Math.PI/2,0,.1);pl.position.set(-.05,.7815,.02);g.add(pl);
 for(const [x,z,r] of [[-.36,.1,.3],[-.34,.08,.18]]){const p=add(new T.PlaneGeometry(.2,.27),MAT.paper,x,.7812+(r>.2?.0003:0),z,{to:g,rx:-Math.PI/2,cast:false});p.rotation.z=r}
 add(new T.CylinderGeometry(.0055,.0055,.14,12),M('#0e0e10',{roughness:.2}),.1,.789,.05,{to:g,rz:Math.PI/2,ry:.5});add(new T.CylinderGeometry(.006,.006,.02,12),MAT.gilt,.04,.789,.085,{to:g,rz:Math.PI/2,ry:.5});
 add(lathe([[0,0],[.03,0],[.032,.04],[.012,.05],[.012,.06],[0,.06]],8),(()=>{const m=new T.MeshPhysicalMaterial({color:'#050508',roughness:.2,clearcoat:.4});m.userData.env=.25;return m})(),.25,.78,-.12,{to:g});
 // the returned books, stacked, slips sticking out
 for(let i=0;i<4;i++){const h=.045-i*.004,w=.24-i*.02;add(RB(w,h,.17-i*.01,.004),M(bookCols[(i*3+1)%12],{roughness:.6}),-.45,.78+.022+i*.044-(i*.002),-.15,{to:g,ry:(rnd()-.5)*.2});
  add(new T.PlaneGeometry(.03,.06),M('#ffffff',{map:TX.slip,roughness:.9,side:T.DoubleSide}),-.45+w/2-.03,.78+.04+i*.044,-.15-.02,{to:g,ry:Math.PI/2,cast:false})}
 // Iris's chair, pushed in
 const ch=grp(0,0,-.55,0,g);for(const [lx,lz] of [[-.2,-.18],[.2,-.18],[-.2,.2],[.2,.2]])add(new T.CylinderGeometry(.018,.014,.45,8),MAT.case,lx,.225,lz,{to:ch});add(RB(.46,.05,.44,.012),M('#5a1418',{roughness:.7}),0,.47,0,{to:ch});
 for(const e of [-1,1])add(RB(.03,.52,.03,.008),MAT.case,e*.2,.74,-.2,{to:ch});add(RB(.46,.14,.025,.01),MAT.case,0,.94,-.2,{to:ch})}
/* ---------- the rolling ladder on its brass rail ---------- */
add(new T.CylinderGeometry(.014,.014,DX-DW/2-.3+hw,12),MAT.brass,(-hw+DX-DW/2-.3)/2+.0,TOP-.25,D-BD-.06,{rz:Math.PI/2});
for(const x of [-hw+.2,DX-DW/2-.32])add(RB(.03,.06,.08,.008),MAT.brass,x,TOP-.25,D-BD-.02);
{const lx=-1.62,topZ=D-BD-.06,botZ=D-BD-.95,topY=TOP-.25;const L=Math.hypot(topY,topZ-botZ),ang=Math.atan2(topZ-botZ,topY);const g=grp(lx,0,botZ);
 const lad=grp(0,0,0,0,g);lad.rotation.x=ang;for(const e of [-1,1])add(RB(.05,L,.03,.008),MAT.case,e*.22,L/2,0,{to:lad});for(let i=1;i<11;i++)add(RB(.44,.03,.07,.008),MAT.case,0,i*L/11.5,.02,{to:lad});
 for(const e of [-1,1]){add(new T.CylinderGeometry(.03,.03,.02,16),MAT.brass,e*.22,.03,0,{to:g,rz:Math.PI/2});const hk=add(new T.TorusGeometry(.02,.006,8,16,Math.PI*1.3),MAT.brass,e*.22,L,.0,{to:lad,ry:Math.PI/2})}}
/* ---------- a window behind us: the moon comes through it in the dark ---------- */
{const g=grp(-.6,1.2,.03);for(const [w,h,x,y] of [[1.3,.08,0,0],[1.3,.08,0,1.6],[.08,1.6,-.65,.8],[.08,1.6,.65,.8],[.05,1.6,0,.8],[1.3,.05,0,.8]])add(RB(w,h,.08,.01),MAT.case,x,y,0,{to:g})}
/* ---------- pendant ---------- */
{const g=grp(.1,Hh-.8,1.9);add(new T.CylinderGeometry(.006,.006,.7,6),MAT.brass,0,.5,0,{to:g,cast:false});add(lathe([[0,0],[.22,.03],[.24,.07],[.2,.09],[0,.05]],48),M('#c8b48a',{emissive:'#ffb060',emissiveIntensity:.32,roughness:.6,side:T.DoubleSide}),0,-.05,0,{to:g,cast:false});add(new T.TorusGeometry(.235,.01,8,48),MAT.brass,0,.02,0,{to:g,rx:Math.PI/2,cast:false})}
flushBooks();
/* ---------- lights ---------- */
const hemi=new T.HemisphereLight('#4a5274','#3a2010',.42);scene.add(hemi);
const pend=new T.PointLight('#ffd0a0',1.3,10,1.5);pend.position.set(.1,Hh-.95,1.9);scene.add(pend);
const bank=new T.SpotLight('#ffd890',.9,3.5,.9,.6,1.6);bank.position.set(-.3,1.12,4.05);bank.target.position.set(-.7,.7,3.85);scene.add(bank,bank.target);bank.castShadow=true;bank.shadow.mapSize.set(1024,1024);bank.shadow.bias=-.0006;
const lampL=new T.PointLight('#ffc888',1.4,6,1.6);lampL.position.set(.1,1.2,3.2);scene.add(lampL);
const corr=new T.PointLight('#ffbf78',2.0,5,1.6);corr.position.set(DX-.5,2.0,D+2.2);scene.add(corr);const corr2=new T.PointLight('#ffc888',1.1,3,1.8);corr2.position.set(DX,1.9,D+4.6);scene.add(corr2);
const shelfL=new T.PointLight('#ffd0a0',.8,6,1.5);shelfL.position.set(-1.0,2.6,4.6);scene.add(shelfL);
const moon=new T.SpotLight('#8aa6ff',1.2,12,.3,.6,1.2);moon.position.set(-.6,2.5,-2.0);moon.target.position.set(-1.35,0,3.4);scene.add(moon,moon.target);moon.castShadow=true;moon.shadow.mapSize.set(1024,1024);moon.shadow.bias=-.0008;
const glowMats=[];scene.traverse(o=>{if(o.isMesh&&o.material&&o.material.emissiveIntensity>0&&glowMats.indexOf(o.material)<0)glowMats.push(o.material)});const glow0=glowMats.map(m=>m.emissiveIntensity);
const FZ=0;
return {start:'wide',exposure:1.3,
 views:{wide:{p:[.12,.55,.75],t:[.25,1.85,5.7],fov:70,where:'Library · power on',text:'The library. Shelves to the ceiling on three walls, the ladder on its rail. Through the doorway, the corridor runs straight to the study door.'},
  shelves:{p:[.4,.45,3.6],t:[-1.2,2.9,5.9],fov:66,where:'Library · close look',text:'Up the shelves. Law, travel, sermons, a run of bound Punch. The top row is a long reach even from the ladder.'},
  doorway:{p:[1.1,1.35,2.6],t:[1.45,1.05,11.0],fov:46,where:'Library · close look',text:'The doorway. The corridor runs straight down to the study door. A line of lamplight shows under it.'},
  chairs:{p:[-.4,1.45,1.2],t:[.35,.45,2.9],fov:60,where:'Library · close look',text:'Two reading chairs and the lamp table between them. One glass, a finger of whisky left in it.'},
  atlas:{p:[-1.15,1.5,3.0],t:[-1.85,.95,3.4],fov:46,where:'Library · close look',text:'An atlas open at the Northern Fells, on its stand. A pair of reading glasses folded on the page.'},
  desk:{p:[-.75,1.85,2.55],t:[-.75,.8,3.85],fov:60,where:'Library · close look',text:'The writing table. A letter half written to someone\'s mother. A stack of books with return slips. The banker\'s lamp still on.'},
  bookends:{p:[-.7,1.62,4.55],t:[-.7,1.55,5.7],fov:46,where:'Library · close look',text:'A short run of books on an eye-level shelf, held between two brass bookends.'},
  ladder:{p:[-.2,1.05,2.7],t:[-1.62,1.6,5.4],fov:60,where:'Library · close look',text:'The library ladder, hooked onto its brass rail, wheels on the parquet.'},
  dark:{p:[.12,.55,.75],t:[.25,1.85,5.7],fov:70,where:'Library · power out',text:'The lights die. Moonlight from the window, and nothing at the end of the corridor now.',dark:true}},
 update(t,dt,on,dk){underDoor.color.copy(udC).multiplyScalar(on);pend.intensity=1.3*on;bank.intensity=.9*on;lampL.intensity=1.4*on;corr.intensity=2.0*on;corr2.intensity=1.1*on;shelfL.intensity=.8*on;glowMats.forEach((m,i)=>m.emissiveIntensity=glow0[i]*on);hemi.intensity=.42-.26*dk;moon.intensity=1.2+1.8*dk}};
});
