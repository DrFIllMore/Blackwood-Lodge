// ROOM {"title":"Blackwood Cellar Proof","aria":"The cellar, rendered in 3D","loading":"Lighting the lantern…","where":"Cellar · power on","text":"The cellar. A brick vault, racks down one side, barrels down the other. A lantern burning on a crate at the far end.","buttons":[["wide","The cellar"],["racks","Wine racks"],["barrels","Barrels"],["crate","The crate"],["floor","The floor"],["broken","By the rack"],["grate","Light well"],["dark","Power out"]]}
ROOM(31,H=>{const {T,TAU,rnd,ctex,noise,scene,ANIM,M,add,RB,BOX,lathe,grp,plane,tube,tiledBox,lin}=H;
/* ---------- textures ---------- */
const TX={
 brick:ctex(512,512,(x,w,h)=>{x.fillStyle='#3a2a22';x.fillRect(0,0,w,h);const bh=32,bw=96;for(let r=0;r<h/bh;r++){const off=r%2?bw/2:0;for(let c=-1;c<w/bw+1;c++){const t=rnd();const k=.62+t*.42;const pal=[[104,52,36],[88,44,32],[116,62,44],[78,42,32],[98,58,42]][Math.floor(rnd()*5)];
     x.fillStyle=`rgb(${pal[0]*k|0},${pal[1]*k|0},${pal[2]*k|0})`;const px=c*bw+off+3,py=r*bh+3;x.fillRect(px,py,bw-6,bh-6);const g=x.createLinearGradient(0,py,0,py+bh-6);g.addColorStop(0,'rgba(255,220,190,.08)');g.addColorStop(1,'rgba(0,0,0,.25)');x.fillStyle=g;x.fillRect(px,py,bw-6,bh-6);
     if(rnd()<.15){x.fillStyle='rgba(225,220,205,.22)';x.beginPath();x.ellipse(px+rnd()*bw,py+bh/2,20+rnd()*30,6+rnd()*8,0,0,TAU);x.fill()}}}noise(x,w,h,.08,9000)},[1,1]),
 rubble:ctex(1024,1024,(x,w,h)=>{const gx=7,gy=9,cw=w/gx,chh=h/gy;const S=[];for(let j=0;j<gy;j++)for(let i=0;i<gx;i++){const t=rnd();const pal=[[90,86,78],[80,76,72],[100,92,80],[72,70,66],[88,82,72]];const c=pal[Math.floor(rnd()*pal.length)];const k=.6+t*.4;S.push({x:(i+rnd())*cw,y:(j+rnd())*chh,c:[c[0]*k,c[1]*k,c[2]*k],gx:rnd()-.5,gy:rnd()-.5})}
   const im=x.createImageData(w,h),d=im.data;const site=(i,j)=>{const ii=((i%gx)+gx)%gx,jj=((j%gy)+gy)%gy;const s=S[jj*gx+ii];return [s,s.x+(i-ii)*cw,s.y+(j-jj)*chh]};
   for(let py=0;py<h;py++){const cj=Math.floor(py/chh);for(let px=0;px<w;px++){const ci=Math.floor(px/cw);let f1=1e9,f2=1e9,b=null,bx=0,by=0;for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){const [s0,sx,sy]=site(ci+di,cj+dj);const dx=(px-sx)*.8,dy=(py-sy)*1.2;const dd=Math.sqrt(dx*dx+dy*dy);if(dd<f1){f2=f1;f1=dd;b=s0;bx=sx;by=sy}else if(dd<f2)f2=dd}
     const e=f2-f1,o=(py*w+px)*4;if(e<6){const m=40+e*4;d[o]=m;d[o+1]=m*.96;d[o+2]=m*.9;d[o+3]=255;continue}const edge=Math.min(1,(e-6)/16),lit=1+((px-bx)*b.gx+(py-by)*b.gy)*.006-(py-by)*.002;const k=(.55+.45*edge)*lit;d[o]=b.c[0]*k;d[o+1]=b.c[1]*k;d[o+2]=b.c[2]*k;d[o+3]=255}}
   x.putImageData(im,0,0);noise(x,w,h,.08,30000)},[1,1]),
 // worn flagstones, with dust settled thicker at the edges
 flags:ctex(1024,1024,(x,w,h)=>{x.fillStyle='#2a2622';x.fillRect(0,0,w,h);let y=0;while(y<h){const rh=140+rnd()*110;let xx=0;while(xx<w){const fw=160+rnd()*200;const k=.6+rnd()*.3;x.fillStyle=`rgb(${86*k|0},${82*k|0},${76*k|0})`;x.fillRect(xx+4,y+4,Math.min(fw,w-xx)-8,rh-8);
     const g=x.createRadialGradient(xx+fw/2,y+rh/2,10,xx+fw/2,y+rh/2,fw*.7);g.addColorStop(0,'rgba(255,250,240,.05)');g.addColorStop(1,'rgba(0,0,0,.25)');x.fillStyle=g;x.fillRect(xx+4,y+4,Math.min(fw,w-xx)-8,rh-8);xx+=fw}y+=rh}
   for(let i=0;i<60;i++){x.strokeStyle='rgba(20,18,16,.35)';x.lineWidth=1;x.beginPath();let px=rnd()*w,py=rnd()*h;x.moveTo(px,py);for(let k=0;k<5;k++){px+=(rnd()-.5)*40;py+=(rnd()-.5)*40;x.lineTo(px,py)}x.stroke()}for(let i=0;i<30000;i++){const v=rnd()<.5?0:255;x.fillStyle=`rgba(${v},${v},${v},${rnd()*.06})`;x.fillRect(rnd()*w,rnd()*h,1+rnd()*2,1+rnd()*2)}},[2,3]),
 stave:ctex(256,512,(x,w,h)=>{const n=8,sw=w/n;for(let i=0;i<n;i++){const t=rnd();x.fillStyle=`rgb(${92+t*30|0},${60+t*18|0},${36+t*10|0})`;x.fillRect(i*sw,0,sw,h);for(let g=0;g<10;g++){x.strokeStyle=`rgba(30,16,6,${.1+rnd()*.15})`;x.lineWidth=.6+rnd()*1.4;const gx=i*sw+rnd()*sw;x.beginPath();x.moveTo(gx,0);x.bezierCurveTo(gx+rnd()*4-2,h*.3,gx+rnd()*4-2,h*.7,gx,h);x.stroke()}
   x.fillStyle='rgba(10,5,2,.8)';x.fillRect(i*sw,0,2,h)}const s=x.createLinearGradient(0,0,0,h);s.addColorStop(0,'rgba(60,10,20,.0)');s.addColorStop(.5,'rgba(60,10,20,.18)');s.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=s;x.fillRect(0,0,w,h);noise(x,w,h,.06,4000)}),
 head:ctex(256,256,(x,w,h)=>{x.fillStyle='#6a4628';x.fillRect(0,0,w,h);for(let i=0;i<5;i++){x.fillStyle=`rgba(0,0,0,${.05+rnd()*.1})`;x.fillRect(i*w/5,0,w/5,h);x.fillStyle='rgba(10,5,2,.8)';x.fillRect(i*w/5,0,2,h)}
   for(let g=0;g<50;g++){x.strokeStyle=`rgba(30,16,6,${.1+rnd()*.15})`;x.beginPath();const gx=rnd()*w;x.moveTo(gx,0);x.lineTo(gx+rnd()*6-3,h);x.stroke()}
   x.fillStyle='rgba(235,232,220,.75)';x.font='bold 30px Georgia';x.textAlign='center';x.fillText('1907',w/2,h*.36);x.font='italic 22px Georgia';x.fillText('Port',w/2,h*.78);noise(x,w,h,.06,3000)}),
 dust:ctex(512,512,(x,w,h)=>{x.clearRect(0,0,w,h);for(let i=0;i<4000;i++){x.fillStyle=`rgba(160,150,132,${.02+rnd()*.04})`;x.beginPath();x.arc(rnd()*w,rnd()*h,1+rnd()*6,0,TAU);x.fill()}},[3,4]),
 web:ctex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);x.strokeStyle='rgba(235,235,235,.55)';x.lineWidth=1;const cx=0,cy=0;for(let k=0;k<11;k++){const a=k/10*Math.PI/2;x.beginPath();x.moveTo(cx,cy);x.lineTo(Math.cos(a)*w*1.4,Math.sin(a)*h*1.4);x.stroke()}
   for(let r=18;r<w*1.3;r+=14+rnd()*8){x.beginPath();for(let k=0;k<=10;k++){const a=k/10*Math.PI/2;const rr=r*(.92+rnd()*.12);const px=Math.cos(a)*rr,py=Math.sin(a)*rr;k?x.quadraticCurveTo(Math.cos(a-.08)*rr*.94,Math.sin(a-.08)*rr*.94,px,py):x.moveTo(px,py)}x.stroke()}
   const g=x.createRadialGradient(0,0,10,0,0,w*1.3);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,1)');x.globalCompositeOperation='destination-out';x.fillStyle=g;x.fillRect(0,0,w,h)}),
 label:ctex(128,96,(x,w,h)=>{x.fillStyle='#e2d6b6';x.fillRect(0,0,w,h);x.strokeStyle='#5a1a1a';x.lineWidth=2;x.strokeRect(5,5,w-10,h-10);x.fillStyle='#2a1a10';x.font='bold 15px Georgia';x.textAlign='center';x.fillText('CHÂTEAU',w/2,32);x.font='italic 13px Georgia';x.fillText('Margaux',w/2,52);x.font='13px Georgia';x.fillText('1921',w/2,76);noise(x,w,h,.08,600)}),
 crate:ctex(256,256,(x,w,h)=>{x.fillStyle='#8a6a44';x.fillRect(0,0,w,h);for(let g=0;g<60;g++){x.strokeStyle=`rgba(60,36,16,${.1+rnd()*.2})`;x.beginPath();const gy=rnd()*h;x.moveTo(0,gy);x.lineTo(w,gy+rnd()*6-3);x.stroke()}
   x.fillStyle='rgba(30,20,12,.7)';x.font='bold 34px Georgia';x.textAlign='center';x.fillText('BORDEAUX',w/2,h*.5);x.font='18px Georgia';x.fillText('12 BOUTEILLES',w/2,h*.68);noise(x,w,h,.08,3000)}),
};
/* ---------- the vault: 4.2 m wide, 7.4 m long, brick barrel on rubble walls ---------- */
const W=4.2,hw=W/2,D=7.4,SP=1.25,RY=1.15;// springing height, vault rise
const brick=M('#ffffff',{map:TX.brick,bumpMap:TX.brick,bumpScale:.02,roughness:.92});TX.brick.repeat.set(Math.PI*hw/1.1,D/.55);
{const g=new T.CylinderGeometry(hw,hw,D,48,1,true,Math.PI/2,Math.PI);g.rotateX(Math.PI/2);g.scale(1,RY/hw,1);const m=add(g,brick,0,SP,D/2,{cast:false});m.material.side=T.BackSide}
const rub=M('#ffffff',{map:TX.rubble,bumpMap:TX.rubble,bumpScale:.04,roughness:.95});
for(const e of [-1,1])tiledBox(.3,SP,D,rub,e*(hw+.15),SP/2,D/2,1.4,{cast:false});
// end walls follow the vault
const endWall=(z,ry)=>{const sh=new T.Shape();sh.moveTo(-hw,0);sh.lineTo(hw,0);sh.lineTo(hw,SP);for(let i=0;i<=32;i++){const a=i/32*Math.PI;sh.lineTo(Math.cos(a)*hw,SP+Math.sin(a)*RY)}sh.lineTo(-hw,0);
  const hole=new T.Path();const gx=.55,gy=1.95;hole.moveTo(gx-.3,gy-.22);hole.lineTo(gx+.3,gy-.22);hole.lineTo(gx+.3,gy+.08);hole.absarc(gx,gy+.08,.3,0,Math.PI,false);hole.lineTo(gx-.3,gy-.22);if(z>1)sh.holes.push(hole);
  const g=new T.ShapeGeometry(sh,32);const p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+hw)/1.4,p.getY(i)/1.4);const m=new T.Mesh(g,rub);m.position.z=z;m.rotation.y=ry;m.receiveShadow=true;scene.add(m);return m};
endWall(D,Math.PI);endWall(0,0);
// the light well: a barred arch high in the far wall, snow on the sill, cold light
{const gx=-.55;// rotated by π, so the hole drawn at +.55 sits at x=-.55
 tiledBox(.66,.06,.42,rub,gx,1.71,D+.2,1.4,{cast:false});for(const e of [-1,1])tiledBox(.06,.42,.42,rub,gx+e*.33,1.95,D+.2,1.4,{cast:false});
 {const half=new T.CylinderGeometry(.3,.3,.42,24,1,true,-Math.PI/2,Math.PI);half.rotateX(-Math.PI/2);const hm=M('#ffffff',{map:TX.rubble,roughness:.95,side:T.BackSide});add(half,hm,gx,2.03,D+.2,{cast:false});
  const wellT=ctex(256,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#1a2848');g.addColorStop(.6,'#2e4270');g.addColorStop(1,'#4a5e90');x.fillStyle=g;x.fillRect(0,0,w,h);
    x.fillStyle='#141820';x.fillRect(0,0,30,h);x.fillRect(w-30,0,30,h);for(let i=0;i<9;i++){x.fillStyle='#0c0e14';x.fillRect(30+i*24,0,6,h*.55)}
    x.fillStyle='#c8d2e6';x.beginPath();x.moveTo(0,h);for(let i=0;i<=10;i++)x.lineTo(i/10*w,h*.78-Math.sin(i/10*Math.PI)*h*.12-rnd()*8);x.lineTo(w,h);x.fill();for(let i=0;i<40;i++){x.fillStyle='rgba(235,240,255,.8)';x.beginPath();x.arc(rnd()*w,rnd()*h*.7,.8+rnd()*1.4,0,TAU);x.fill()}});
  add(new T.PlaneGeometry(.9,1.0),new T.MeshBasicMaterial({map:wellT}),gx,2.0,D+.42,{ry:Math.PI,cast:false}).material.color.setScalar(.8)}
 {const bm=M('#141210',{metalness:.4,roughness:.65});bm.userData.env=.2;for(let i=0;i<5;i++)add(new T.CylinderGeometry(.012,.012,.6,8),bm,gx-.24+i*.12,2.02,D+.05)}
 const sn=M('#dfe6f2',{roughness:.9});for(let i=0;i<8;i++){const m=add(new T.IcosahedronGeometry(.04+rnd()*.03,1),sn,gx-.26+i*.075,1.75,D+.12+rnd()*.1,{cast:false});m.scale.y=.45}}
/* ---------- floor: flagstones with a skin of dust, and footprints through it ---------- */
plane(W,D,M('#ffffff',{map:TX.flags,roughness:.85}),0,0,D/2,0,-Math.PI/2);
{const pr=ctex(512,1024,(x,w,h)=>{x.clearRect(0,0,w,h);// an even skin of dust, then the prints scuffed through it
   x.fillStyle='rgba(150,140,124,.2)';x.fillRect(0,0,w,h);for(let i=0;i<3000;i++){x.fillStyle=`rgba(160,150,132,${rnd()*.08})`;x.beginPath();x.arc(rnd()*w,rnd()*h,2+rnd()*8,0,TAU);x.fill()}
   x.globalCompositeOperation='destination-out';const sole=(cx,cy,a,s)=>{x.save();x.translate(cx,cy);x.rotate(a);x.fillStyle=`rgba(0,0,0,${s})`;x.beginPath();x.ellipse(0,-14,11,20,0,0,TAU);x.fill();x.beginPath();x.ellipse(0,20,9,10,0,0,TAU);x.fill();x.restore()};
   // one set of prints, a short stride, out to the crate and back
   for(let i=0;i<11;i++){sole(232+(i%2?16:-16),h-40-i*78,.05,.8)}for(let i=0;i<10;i++){sole(300+(i%2?16:-16),120+i*80,Math.PI+.06,.6)}
   x.globalCompositeOperation='source-over'});
 const m=new T.Mesh(new T.PlaneGeometry(2.4,4.8),new T.MeshStandardMaterial({map:pr,transparent:true,roughness:1,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(-.1,.003,3.1);scene.add(m);
 // dust thick against the walls
 for(const e of [-1,1]){const d=new T.Mesh(new T.PlaneGeometry(.6,D),new T.MeshStandardMaterial({map:TX.dust,transparent:true,roughness:1,depthWrite:false,opacity:.9}));d.rotation.x=-Math.PI/2;d.position.set(e*(hw-.3),.002,D/2);scene.add(d)}}
/* ---------- wine racks down the left: oak cubbies, bottles necks out, gaps where bottles were taken ---------- */
const oak=M('#7a5638',{map:TX.stave,roughness:.6});
const RX=hw-.2,RZ0=.9,RZ1=5.6,RH=1.18,RD=.36,ROWS=5,COLS=16;
{const cw=(RZ1-RZ0)/COLS,rh=RH/ROWS;
 for(let r=0;r<=ROWS;r++)add(BOX(RD,.022,RZ1-RZ0+.03),oak,RX-RD/2+.02,.06+r*rh,(RZ0+RZ1)/2);
 for(let c=0;c<=COLS;c++)add(BOX(RD,RH,.018),oak,RX-RD/2+.02,.06+RH/2,RZ0+c*cw,{cast:c%4===0});
 add(BOX(RD+.04,.06,RZ1-RZ0+.08),oak,RX-RD/2+.02,.03,(RZ0+RZ1)/2);
 // bottles: dark glass, a foil capsule, dust
 const bg=lathe([[0,0],[.036,0],[.037,.005],[.037,.2],[.034,.22],[.016,.25],[.013,.29],[.013,.31],[.015,.315],[.015,.325],[0,.325]],16);bg.rotateZ(Math.PI/2);bg.translate(-.16,0,0);
 const glassM=new T.MeshPhysicalMaterial({color:'#040a06',roughness:.22,metalness:.0,clearcoat:.6,clearcoatRoughness:.3});glassM.userData.env=.22;
 const capG=new T.CylinderGeometry(.0155,.0155,.035,12);capG.rotateZ(Math.PI/2);capG.translate(-.16-.31,0,0);
 const spots=[];for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){const empty=(r===2&&c>=3&&c<=5)||(r===3&&(c===11||c===12))||(rnd()<.05);if(empty)continue;
   let k=5;if((r===1&&c===4)||rnd()<.12)k=2+Math.floor(rnd()*3);const y0=.06+r*rh+.011,z0=RZ0+c*cw+cw/2;const slots=[[-.074,0],[0,0],[.074,0],[-.037,1],[.037,1]].slice(0,k);
   for(const [dz,l] of slots)spots.push([y0+.037+l*.064,z0+dz+(rnd()-.5)*.006])}
 const n=spots.length;const bot=new T.InstancedMesh(bg,glassM,n),cap=new T.InstancedMesh(capG,M('#5a1018',{metalness:.5,roughness:.4}),n);bot.frustumCulled=cap.frustumCulled=false;bot.castShadow=true;bot.receiveShadow=true;
 const mx=new T.Matrix4(),q=new T.Quaternion();spots.forEach(([y,z],i)=>{q.setFromEuler(new T.Euler((rnd()-.5)*.6,0,0));mx.compose(new T.Vector3(RX+.12+(rnd()-.5)*.02,y,z),q,new T.Vector3(1,1,1));bot.setMatrixAt(i,mx);cap.setMatrixAt(i,mx);
   cap.setColorAt(i,new T.Color(['#3a080e','#8a6a30','#1a1a1a','#4a0c12','#3a080e','#1a1a1a'][Math.floor(rnd()*6)]))});scene.add(bot,cap);
 // chalk slates on the rack ends
 const slate=ctex(128,96,(x,w,h)=>{x.fillStyle='#262628';x.fillRect(0,0,w,h);x.strokeStyle='#6a4a30';x.lineWidth=8;x.strokeRect(0,0,w,h);x.fillStyle='rgba(235,235,230,.8)';x.font='italic 20px Georgia';x.textAlign='center';x.fillText('Claret',w/2,42);x.font='16px Georgia';x.fillText("'21 – '24",w/2,70)});
 for(const z of [RZ0+cw*4,RZ0+cw*12]){add(RB(.18,.13,.012,.004),M('#ffffff',{map:slate,roughness:.8}),RX-RD+.0,1.316,z,{ry:-Math.PI/2})}}
/* ---------- barrels down the right, on their cradles; bungs all in ---------- */
const hoopM=M('#2a2420',{metalness:.5,roughness:.55});
function barrel(x,z,L=.86,R=.33){const g=grp(x,0,z,0);const prof=[];for(let i=0;i<=16;i++){const t=i/16;prof.push([R*(.86+.14*Math.sin(t*Math.PI)),t*L-L/2])}
  const geo=lathe(prof,32);geo.rotateZ(Math.PI/2);const st=TX.stave.clone();st.needsUpdate=true;st.wrapS=st.wrapT=T.RepeatWrapping;st.repeat.set(3,1);add(geo,M('#ffffff',{map:st,roughness:.55}),0,R+.1,0,{to:g});
  for(const u of [-.42,-.32,.32,.42]){const rr=R*(.86+.14*Math.sin((u+.5)*Math.PI))+.004;add(new T.TorusGeometry(rr,.009,6,40),hoopM,u*L,R+.1,0,{to:g,ry:Math.PI/2})}
  // heads: the end facing the room carries chalk and the bung
  for(const e of [-1,1]){const hd=add(new T.CircleGeometry(R*.86,40),M('#ffffff',{map:TX.head,roughness:.7}),e*L/2,R+.1,0,{to:g,ry:e*Math.PI/2,cast:false});if(e<0)hd.rotation.z=0}
  // bung on top
  add(new T.CylinderGeometry(.022,.026,.03,16),M('#5a3a20',{roughness:.6}),0,2*R+.1,0,{to:g});
  // cradle
  for(const u of [-.28,.28]){const sh=new T.Shape();sh.moveTo(-.38,0);sh.lineTo(.38,0);sh.lineTo(.38,.2);sh.absarc(0,R+.1,R+.01,-Math.PI*.18,-Math.PI*.82,true);sh.lineTo(-.38,.2);sh.lineTo(-.38,0);const cg=new T.ExtrudeGeometry(sh,{depth:.06,bevelEnabled:false});cg.rotateY(Math.PI/2);add(cg,oak,u*L-.03,0,0,{to:g})}
  return g}
const BX=-hw+.55;barrel(BX,1.6);barrel(BX,2.65);barrel(BX,3.7,.8,.31);
// a small cask stacked on the gap at the end
{const g=barrel(BX+.02,4.75,.6,.24);}
/* ---------- far end: the crate, a lantern on it, an open bottle and one glass ---------- */
const CX=.35,CZ=6.2;
{const g=grp(CX,0,CZ,.25);const slat=M('#ffffff',{map:TX.crate,roughness:.8});
 add(RB(.62,.44,.44,.01),slat,0,.22,0,{to:g});for(const y of [.06,.22,.38])for(const e of [-1,1])add(RB(.64,.1,.012,.003),M('#8a6a44',{map:TX.stave,roughness:.8}),0,y,e*.226,{to:g});for(const e of [-1,1])add(RB(.04,.44,.46,.006),M('#6a4a2a',{roughness:.8}),e*.31,.22,0,{to:g});
 add(RB(.66,.02,.48,.006),M('#7a5a38',{map:TX.stave,roughness:.8}),0,.45,0,{to:g});
 // hurricane lantern
 const L=grp(-.16,.46,-.02,0,g);const tin=M('#3a3632',{metalness:.6,roughness:.5});add(lathe([[0,0],[.075,0],[.08,.02],[.07,.05],[.04,.06],[0,.06]],24),tin,0,0,0,{to:L});
 add(lathe([[.03,0],[.055,.02],[.062,.08],[.05,.14],[.032,.16]],24),new T.MeshPhysicalMaterial({color:'#e8d8b0',roughness:.05,transparent:true,opacity:.25,depthWrite:false}),0,.06,0,{to:L,cast:false});
 add(lathe([[0,0],[.045,0],[.03,.04],[.012,.07],[0,.075]],20),tin,0,.22,0,{to:L});for(const e of [-1,1])add(new T.CylinderGeometry(.005,.005,.24,6),tin,e*.068,.12,0,{to:L});add(new T.TorusGeometry(.06,.004,6,24,Math.PI),tin,0,.3,0,{to:L});
 const flame=new T.Sprite(new T.SpriteMaterial({map:ctex(32,64,(x,w,h)=>{const gr=x.createRadialGradient(16,40,1,16,36,22);gr.addColorStop(0,'rgba(255,250,220,1)');gr.addColorStop(.35,'rgba(255,190,90,.9)');gr.addColorStop(1,'rgba(255,120,30,0)');x.fillStyle=gr;x.beginPath();x.ellipse(16,38,10,24,0,0,TAU);x.fill()}),blending:T.AdditiveBlending,depthWrite:false}));flame.scale.set(.03,.07,1);flame.position.set(0,.12,0);L.add(flame);
 ANIM.push((dt,t)=>{flame.scale.y=.07*(.9+.1*Math.sin(t*9.3)+.04*Math.sin(t*17))});
 // the open bottle, its cork beside it with the screw still in, one glass with wine in it
 const ob=grp(.1,.46,.06,0,g);add(lathe([[0,0],[.036,0],[.037,.005],[.037,.2],[.034,.22],[.016,.25],[.013,.29],[.013,.31],[.015,.315],[0,.315]],24),new T.MeshPhysicalMaterial({color:'#0c1a10',roughness:.15,clearcoat:.6}),0,0,0,{to:ob});
 add(new T.CylinderGeometry(.0375,.0375,.08,24,1,true),M('#ffffff',{map:TX.label,roughness:.8}),0,.1,0,{to:ob,ry:2.6,cast:false});
 add(new T.CylinderGeometry(.0105,.0105,.04,12),M('#b88a5a',{roughness:.8}),.08,.012,.06,{to:ob,rz:Math.PI/2,ry:.4});
 {const cs=grp(.08,.02,.06,.4,ob);add(new T.TorusGeometry(.008,.0025,6,12),M('#9a9aa0',{metalness:.9,roughness:.3}),-.03,0,0,{to:cs,ry:Math.PI/2});add(RB(.06,.012,.012,.004),M('#5a3a20',{roughness:.6}),-.065,0,0,{to:cs,ry:Math.PI/2})}
 const gl=grp(.22,.46,-.08,0,g);add(lathe([[0,0],[.032,0],[.034,.004],[.006,.012],[.005,.08],[.03,.1],[.042,.14],[.04,.19],[.037,.19],[.038,.14],[.027,.105],[0,.095]],28),new T.MeshPhysicalMaterial({color:'#1c2428',roughness:.0,transparent:true,opacity:.32,clearcoat:1,depthWrite:false}),0,0,0,{to:gl,cast:false}).renderOrder=3;
 add(lathe([[0,0],[.026,.008],[.036,.035],[.037,.05],[0,.05]],24),new T.MeshPhysicalMaterial({color:'#24020a',roughness:.05,transparent:true,opacity:.95}),0,.098,0,{to:gl,cast:false}).renderOrder=2;
 // a drip ring on the crate lid
 add(new T.RingGeometry(.03,.038,24),M('#3a0a10',{roughness:.6,transparent:true,opacity:.6}),.0,.461,.18,{to:g,rx:-Math.PI/2,cast:false})}
/* ---------- a broken bottle at the foot of the rack ---------- */
{const g=grp(RX-.55,0,2.15,.6);const gm=new T.MeshPhysicalMaterial({color:'#06100a',roughness:.1,clearcoat:.8,transparent:true,opacity:.92,side:T.DoubleSide});gm.userData.env=.4;
 add(lathe([[.0,0],[.016,.0],[.013,.04],[.013,.06],[.016,.065],[0,.065]],16),gm,0,.016,0,{to:g,rz:Math.PI/2-.1});
 {const bodyG=lathe([[0,0],[.036,0],[.037,.005],[.037,.11]],18);const p=bodyG.attributes.position;for(let i=0;i<p.count;i++)if(p.getY(i)>.1)p.setY(i,.07+rnd()*.045);bodyG.computeVertexNormals();add(bodyG,gm,.13,.037,.02,{to:g,rz:Math.PI/2})}
 for(let i=0;i<16;i++){const sh=new T.Shape();sh.moveTo(0,0);sh.lineTo(.01+rnd()*.02,rnd()*.008);sh.lineTo(rnd()*.014,.01+rnd()*.02);const m=add(new T.ShapeGeometry(sh),gm,(rnd()-.4)*.32,.003,(rnd()-.5)*.3,{to:g,rx:-Math.PI/2,cast:false});m.rotation.z=rnd()*TAU}
 const st=ctex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);for(let i=0;i<9;i++){const gr=x.createRadialGradient(w/2+(rnd()-.5)*120,h/2+(rnd()-.5)*80,0,w/2,h/2,40+rnd()*60);gr.addColorStop(0,'rgba(34,3,8,.9)');gr.addColorStop(1,'rgba(34,3,8,0)');x.fillStyle=gr;x.fillRect(0,0,w,h)}});
 const s=new T.Mesh(new T.PlaneGeometry(.6,.45),new T.MeshPhysicalMaterial({map:st,color:'#7a5a5a',transparent:true,roughness:.3,clearcoat:.5,depthWrite:false}));s.rotation.x=-Math.PI/2;s.position.set(.05,.0035,0);g.add(s)}
/* ---------- shelf on the far wall: preserves, a candle stub, a ledger ---------- */
{const sx=1.05,sz=D-.16;for(const y of [.85,1.25]){add(RB(1.1,.03,.26,.006),oak,sx,y,sz);for(const e of [-1,1])add(RB(.03,.12,.2,.006),oak,sx+e*.5,y-.07,sz+.02)}
 const jarG=lathe([[0,0],[.045,0],[.05,.02],[.05,.13],[.035,.145],[.035,.16],[0,.16]],20);const jars=['#7a2a1a','#a8661a','#5a3a5a','#8a3a14','#6a6a1e'];
 for(let i=0;i<7;i++){const x=sx-.44+i*.13;add(jarG,new T.MeshPhysicalMaterial({color:jars[i%5],roughness:.2,clearcoat:.6}),x,.865,sz,{});add(new T.CylinderGeometry(.052,.052,.025,20),M('#e8dcc0',{roughness:.9}),x,.865+.165,sz)}
 add(RB(.22,.05,.3,.006),M('#2a3a2a',{roughness:.6}),sx-.25,1.29,sz-.0,{ry:.1});add(new T.CylinderGeometry(.02,.022,.06,14),M('#efe6d0',{roughness:.6}),sx+.3,1.295,sz)}
/* ---------- cobwebs in the corners and along the springing ---------- */
{const wm=new T.MeshBasicMaterial({map:TX.web,transparent:true,opacity:.55,depthWrite:false,side:T.DoubleSide,color:lin('#cfcfcf')});
 for(const [x,y,z,ry,rz,s] of [[hw-.02,SP-.05,RZ0+.02,-Math.PI/2,0,.5],[hw-.02,SP-.05,RZ1-.02,-Math.PI/2,Math.PI/2,.45],[-hw+.02,SP-.02,6.6,Math.PI/2,0,.55],[hw-.12,.95,D-.02,Math.PI,Math.PI/2,.5],[-hw+.3,1.6,D-.02,Math.PI,0,.6]]){const m=add(new T.PlaneGeometry(s,s),wm,x,y,z,{ry,cast:false});m.rotation.z=rz;m.geometry.translate(s/2,s/2,0)}}
/* ---------- the bulb, hanging from the crown on its flex ---------- */
const bulbM=M('#fff2d0',{emissive:'#ffd090',emissiveIntensity:2.4,roughness:.4});
{const y0=SP+RY;add(new T.CylinderGeometry(.004,.004,.55,6),M('#1a1a1a'),0,y0-.28,3.4,{cast:false});add(new T.CylinderGeometry(.018,.018,.05,14),M('#2a2420',{metalness:.5,roughness:.5}),0,y0-.58,3.4,{cast:false});add(lathe([[0,0],[.016,0],[.03,.03],[.03,.06],[.012,.09],[0,.095]].map(p=>[p[0],-p[1]]),20),bulbM,0,y0-.6,3.4,{cast:false})}
/* ---------- light ---------- */
const hemi=new T.HemisphereLight('#3a4466','#2a1a10',.3);scene.add(hemi);
const bulb=new T.PointLight('#ffcf90',1.7,9,1.5);bulb.position.set(0,SP+RY-.72,3.4);bulb.castShadow=true;bulb.shadow.mapSize.set(1024,1024);bulb.shadow.bias=-.003;scene.add(bulb);
const lan=new T.PointLight('#ffa850',1.1,5,1.7);lan.position.set(CX-.16,.66,CZ);scene.add(lan);
const well=new T.SpotLight('#8aa0d8',1.4,8,.45,.8,1.2);well.position.set(-.55,2.6,D+.9);well.target.position.set(.0,0,D-3.2);scene.add(well,well.target);well.castShadow=true;well.shadow.mapSize.set(512,512);
return {views:{
 wide:{p:[.15,1.0,.35],t:[-.05,.62,6.2],fov:66,where:'Cellar · power on',text:'The cellar. A brick vault, racks down one side, barrels down the other. A lantern burning on a crate at the far end.'},
 racks:{p:[.15,.95,2.0],t:[1.9,.6,3.6],fov:56,where:'Cellar · close look',text:'The racks. Claret, port, a run of something older. Gaps here and there where bottles have gone up for dinner.'},
 barrels:{p:[.4,.9,1.9],t:[-1.6,.42,2.9],fov:58,where:'Cellar · close look',text:'Three barrels on their cradles and a small cask. Chalked on the heads: 1907, port.'},
 crate:{p:[.75,1.0,5.25],t:[.35,.5,6.25],fov:48,where:'Cellar · close look',text:'A crate by the far wall. A lantern, still lit. A bottle with the cork drawn and one glass, half full.'},
 floor:{p:[-.2,1.45,1.0],t:[-.1,0,3.4],fov:56,where:'Cellar · close look',text:'The flagstones. Dust over everything, thicker against the walls.'},
 broken:{p:[.7,.6,1.5],t:[1.5,.05,2.2],fov:50,where:'Cellar · close look',text:'At the foot of the rack, a bottle broken on the flags. The wine has soaked into the dust.'},
 grate:{p:[-.2,1.3,5.4],t:[-.55,1.95,7.4],fov:52,where:'Cellar · close look',text:'The light well. Bars, a drift of snow on the sill, and the yard above.'},
 dark:{p:[.15,1.0,.35],t:[-.05,.62,6.2],fov:66,where:'Cellar · power out',text:'The bulb dies. The lantern on the crate, and the cold light from the well.',dark:true}},
 update(t,dt,on,dk){bulb.intensity=1.7*on;bulbM.emissiveIntensity=2.4*on;lan.intensity=1.1*(.92+.06*Math.sin(t*8.1)+.03*Math.sin(t*15))*(1+.3*dk);hemi.intensity=.3-.14*dk;well.intensity=1.4+1.0*dk},
 exposure:1.45,darkExposure:.45}});
