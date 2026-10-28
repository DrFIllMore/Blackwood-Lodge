// ROOM {"title":"Blackwood Kitchen Proof","aria":"The kitchen, rendered in 3D, seen from above","loading":"Lighting the range…","where":"Kitchen · from above","text":"The kitchen from above. The range lit, a stockpot on it. The worktable floured, a bowl of dough under a cloth. The sink under the window.","buttons":[["wide","The kitchen"],["range","The range"],["sink","The sink"],["knives","Knife block"],["table","Worktable"],["bread","The dough"],["pans","Copper pans"],["dresser","Dresser"],["dark","Power out"]]}
ROOM(31,H=>{const {T,TAU,rnd,ctex,noise,scene,ANIM,M,add,RB,BOX,lathe,grp,plane,tube,tiledBox,lin}=H;
/* ---------- textures ---------- */
const TX={
 quarry:ctex(512,512,(x,w,h)=>{const n=4,s=w/n;x.fillStyle='#3a2a20';x.fillRect(0,0,w,h);for(let i=0;i<n;i++)for(let j=0;j<n;j++){const t=rnd();x.fillStyle=`rgb(${104+t*28|0},${50+t*14|0},${36+t*10|0})`;x.fillRect(i*s+3,j*s+3,s-6,s-6);
     const g=x.createRadialGradient(i*s+s*rnd(),j*s+s*rnd(),4,i*s+s/2,j*s+s/2,s*.8);g.addColorStop(0,'rgba(255,200,160,.12)');g.addColorStop(1,'rgba(30,10,0,.18)');x.fillStyle=g;x.fillRect(i*s+3,j*s+3,s-6,s-6)}
   noise(x,w,h,.08,9000);for(let i=0;i<40;i++){x.fillStyle=`rgba(40,20,10,${.05+rnd()*.08})`;x.beginPath();x.arc(rnd()*w,rnd()*h,3+rnd()*14,0,TAU);x.fill()}}),
 subway:ctex(512,512,(x,w,h)=>{x.fillStyle='#8e8a82';x.fillRect(0,0,w,h);const tw=128,th=64;for(let j=0;j<h/th;j++)for(let i=-1;i<w/tw+1;i++){const ox=(j%2)*tw/2;const t=rnd();x.fillStyle=`rgb(${226+t*14|0},${222+t*12|0},${208+t*10|0})`;x.fillRect(i*tw+ox+3,j*th+3,tw-6,th-6);
     const g=x.createLinearGradient(0,j*th,0,j*th+th);g.addColorStop(0,'rgba(255,255,255,.35)');g.addColorStop(.25,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(0,0,0,.1)');x.fillStyle=g;x.fillRect(i*tw+ox+3,j*th+3,tw-6,th-6)}noise(x,w,h,.03,3000)}),
 plaster:ctex(256,256,(x,w,h)=>{x.fillStyle='#cdbf9f';x.fillRect(0,0,w,h);for(let i=0;i<30;i++){const g=x.createRadialGradient(rnd()*w,rnd()*h,0,rnd()*w,rnd()*h,80);g.addColorStop(0,'rgba(120,96,60,.08)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,w,h)}noise(x,w,h,.06,5000)}),
 brick:ctex(512,512,(x,w,h)=>{x.fillStyle='#4a3a30';x.fillRect(0,0,w,h);const bw=128,bh=42;for(let j=0;j<h/bh+1;j++)for(let i=-1;i<w/bw+1;i++){const ox=(j%2)*bw/2,t=rnd();x.fillStyle=`rgb(${110+t*40|0},${44+t*18|0},${30+t*12|0})`;x.fillRect(i*bw+ox+4,j*bh+4,bw-8,bh-8);
     x.fillStyle=`rgba(0,0,0,${rnd()*.25})`;x.fillRect(i*bw+ox+4,j*bh+4,bw-8,bh-8)}noise(x,w,h,.1,12000)}),
 pine:ctex(512,512,(x,w,h)=>{x.fillStyle='#b08c5e';x.fillRect(0,0,w,h);for(let i=0;i<110;i++){const y=rnd()*h;{const k=rnd()<.5;x.strokeStyle=k?`rgba(110,72,36,${.1+rnd()*.2})`:`rgba(210,170,110,${.1+rnd()*.15})`}x.lineWidth=.6+rnd()*2.2;x.beginPath();x.moveTo(0,y);for(let k=1;k<=8;k++)x.lineTo(k*w/8,y+Math.sin(k*1.1+y)*4*rnd());x.stroke()}
   x.strokeStyle='rgba(90,60,30,.25)';for(let i=0;i<70;i++){const px=rnd()*w,py=rnd()*h,a=rnd()*TAU,l=6+rnd()*26;x.lineWidth=.6;x.beginPath();x.moveTo(px,py);x.lineTo(px+Math.cos(a)*l,py+Math.sin(a)*l);x.stroke()}
   for(let i=0;i<4;i++){const cx=rnd()*w,cy=rnd()*h;x.strokeStyle='rgba(90,50,20,.3)';for(let r=3;r<16;r+=3){x.beginPath();x.ellipse(cx,cy,r*2.6,r,0,0,TAU);x.stroke()}}noise(x,w,h,.04,5000)}),
 wood:ctex(512,512,(x,w,h)=>{x.fillStyle='#5a3a22';x.fillRect(0,0,w,h);for(let i=0;i<120;i++){const y=rnd()*h;x.strokeStyle=`rgba(${rnd()<.5?24:130},${rnd()<.5?12:76},${rnd()<.5?6:34},${.08+rnd()*.18})`;x.lineWidth=.6+rnd()*2.4;x.beginPath();x.moveTo(0,y);for(let k=1;k<=8;k++)x.lineTo(k*w/8,y+Math.sin(k*1.3+y)*3*rnd());x.stroke()}noise(x,w,h,.04)}),
 towel:ctex(256,256,(x,w,h)=>{x.fillStyle='#e8e0cc';x.fillRect(0,0,w,h);x.fillStyle='rgba(160,40,40,.7)';for(const y of [30,44,200,214])x.fillRect(0,y,w,6);x.fillStyle='rgba(160,40,40,.25)';for(let i=0;i<w;i+=32)x.fillRect(i,0,3,h);
   for(let i=0;i<4000;i++){x.fillStyle=`rgba(0,0,0,${rnd()*.06})`;x.fillRect(rnd()*w,rnd()*h,1,2)}}),
 enamel:ctex(256,256,(x,w,h)=>{x.fillStyle='#2a3a34';x.fillRect(0,0,w,h);noise(x,w,h,.04,1500)}),
 night:ctex(256,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0a1430');g.addColorStop(.7,'#22346a');g.addColorStop(1,'#46588a');x.fillStyle=g;x.fillRect(0,0,w,h);
   x.fillStyle='#050812';for(let i=0;i<6;i++){const tx=i/5*w+(rnd()-.5)*20,th=h*(.35+rnd()*.25),tw=w*.14;for(let k=0;k<4;k++){const yy=h*.95-k*th*.2;x.beginPath();x.moveTo(tx-tw*(1-k*.2),yy);x.lineTo(tx,yy-th*.42);x.lineTo(tx+tw*(1-k*.2),yy);x.fill()}}
   for(let i=0;i<40;i++){x.fillStyle='rgba(235,240,255,.85)';x.beginPath();x.arc(rnd()*w,rnd()*h*.85,.8+rnd()*1.2,0,TAU);x.fill()}}),
 willow:ctex(256,256,(x,w,h)=>{x.fillStyle='#f2eee6';x.fillRect(0,0,w,h);x.translate(w/2,h/2);x.strokeStyle='#2a4a8a';x.fillStyle='#2a4a8a';x.lineWidth=7;x.beginPath();x.arc(0,0,118,0,TAU);x.stroke();x.lineWidth=2;x.beginPath();x.arc(0,0,104,0,TAU);x.stroke();
   for(let i=0;i<24;i++){x.save();x.rotate(i/24*TAU);x.beginPath();x.moveTo(0,-112);x.quadraticCurveTo(8,-104,0,-96);x.quadraticCurveTo(-8,-104,0,-112);x.fill();x.restore()}x.lineWidth=2;x.beginPath();x.arc(0,0,66,0,TAU);x.stroke();
   x.fillRect(-40,10,80,4);x.beginPath();x.moveTo(-30,10);x.lineTo(-20,-24);x.lineTo(-10,10);x.fill();x.fillRect(-20,-30,4,40);x.beginPath();x.arc(26,-12,18,0,TAU);x.fill();x.fillRect(24,-12,4,24);for(let i=0;i<5;i++){x.beginPath();x.moveTo(-50+i*25,40);x.quadraticCurveTo(-40+i*25,30,-30+i*25,40);x.stroke()}
   x.beginPath();x.moveTo(-14,-46);x.quadraticCurveTo(-6,-52,2,-46);x.moveTo(8,-50);x.quadraticCurveTo(16,-56,24,-50);x.stroke()}),
 label:ctex(256,128,(x,w,h)=>{x.fillStyle='#e8dcc0';x.fillRect(0,0,w,h);x.strokeStyle='#5a1a14';x.lineWidth=4;x.strokeRect(8,8,w-16,h-16);x.fillStyle='#5a1a14';x.font='bold 40px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillText('FLOUR',w/2,h/2)}),
};
const MAT={floor:M('#ffffff',{map:TX.quarry,roughness:.62}),tile:M('#ffffff',{map:TX.subway,roughness:.22}),plaster:M('#ffffff',{map:TX.plaster,roughness:.95}),brick:M('#ffffff',{map:TX.brick,bumpMap:TX.brick,bumpScale:.01,roughness:.9}),
  pine:M('#ffffff',{map:TX.pine,roughness:.72}),wood:M('#ffffff',{map:TX.wood,roughness:.45}),paint:M('#3e5a50',{map:TX.enamel,roughness:.45}),iron:M('#0d0d0f',{metalness:.35,roughness:.4}),
  steel:M('#8a8c90',{metalness:.85,roughness:.35}),brass:M('#c9a24a',{metalness:.85,roughness:.3}),copper:M('#c0663a',{metalness:.9,roughness:.32}),china:M('#f2eee6',{roughness:.18}),blueChina:M('#e8ecf2',{roughness:.2}),
  cap:M('#1a1410',{roughness:1}),towel:M('#ffffff',{map:TX.towel,roughness:.95,side:T.DoubleSide}),wet:new T.MeshPhysicalMaterial({color:'#0c1014',roughness:.03,clearcoat:1,transparent:true,opacity:.5,depthWrite:false})};
/* ---------- the room: a cutaway box, seen from above ---------- */
const W=3.6,D=5.6,HW=2.65,hw=W/2,WT=.14;
const fl=plane(W,D,MAT.floor,0,0,D/2,0,-Math.PI/2);fl.material.map.wrapS=fl.material.map.wrapT=T.RepeatWrapping;fl.material.map.repeat.set(W/.92,D/.92);
// walls with thickness, dark caps on top so the cut reads as a cut
const wall=(len,x,z,ry)=>{const g=grp(x,0,z,ry);const tw=add(BOX(len,1.2,.01),MAT.tile,0,.6,0,{to:g,cast:false});tw.material=MAT.tile.clone();tw.material.map=TX.subway.clone();tw.material.map.needsUpdate=true;tw.material.map.wrapS=tw.material.map.wrapT=T.RepeatWrapping;tw.material.map.repeat.set(len/.6,1.2/.3);
  const pw=add(BOX(len,HW-1.2,.01),MAT.plaster,0,1.2+(HW-1.2)/2,0,{to:g,cast:false});add(BOX(len,.05,.03),MAT.paint,0,1.22,.012,{to:g,cast:false});add(BOX(len,.14,.025),MAT.paint,0,.07,.012,{to:g,cast:false});
  add(BOX(len+WT*2,.02,WT),MAT.cap,0,HW+.01,-WT/2,{to:g,cast:false});add(BOX(len+WT*2,HW,WT-.012),M('#2a2420',{roughness:1}),0,HW/2,-WT/2-.006,{to:g,cast:false});return g};
wall(D,hw,D/2,-Math.PI/2);wall(D,-hw,D/2,Math.PI/2);
// back wall with a window over the sink
const WX=-.55,WY0=1.25,WY1=2.3,WW=.9;
{const g=grp(0,0,D,Math.PI);const sh=new T.Shape();sh.moveTo(-hw,0);sh.lineTo(hw,0);sh.lineTo(hw,HW);sh.lineTo(-hw,HW);sh.lineTo(-hw,0);const ho=new T.Path();ho.moveTo(-WX-WW/2,WY0);ho.lineTo(-WX-WW/2,WY1);ho.lineTo(-WX+WW/2,WY1);ho.lineTo(-WX+WW/2,WY0);ho.lineTo(-WX-WW/2,WY0);sh.holes.push(ho);
 const geo=new T.ShapeGeometry(sh);const p=geo.attributes.position,uv=geo.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+hw)/W,p.getY(i)/HW);
 // tiles below 1.2 m and plaster above: two materials by splitting into two meshes via clipping is overkill; use a vertical gradient texture
 const bt=ctex(512,512,(x,w,h)=>{const img=TX.subway.image;const ty=h*(1-1.2/HW);x.fillStyle='#cdbf9f';x.fillRect(0,0,w,h);x.drawImage(TX.plaster.image,0,0,w,ty);for(let i=0;i<W/.6;i++)x.drawImage(img,i*w/(W/.6),ty,w/(W/.6),(h-ty)/2*1.0),x.drawImage(img,i*w/(W/.6),ty+(h-ty)/2,w/(W/.6),(h-ty)/2);x.fillStyle='#3e5a50';x.fillRect(0,ty-6,w,8);x.fillRect(0,h-16,w,16)});
 const m=new T.Mesh(geo,M('#ffffff',{map:bt,roughness:.4}));m.receiveShadow=true;g.add(m);add(BOX(W+WT*2,.02,WT),MAT.cap,0,HW+.01,-WT/2,{to:g,cast:false});
 for(const [w,h,x,y] of [[.06,WY1-WY0+.06,-WX-WW/2,(WY0+WY1)/2],[.06,WY1-WY0+.06,-WX+WW/2,(WY0+WY1)/2],[WW+.06,.06,-WX,WY1],[WW,.035,-WX,(WY0+WY1)/2],[.035,WY1-WY0,-WX,(WY0+WY1)/2]])add(RB(w,h,.06,.006),MAT.paint,x,y,-.02,{to:g});
 add(RB(WW+.12,.04,.18,.008),MAT.paint,-WX,WY0-.02,.06,{to:g})}
add(new T.PlaneGeometry(2.6,2.4),new T.MeshBasicMaterial({map:TX.night,color:lin('#c8c8d0')}),WX,1.6,D+.9,{ry:Math.PI,cast:false});
add(BOX(WW,.06,.12),M('#e8eef8',{roughness:.9}),WX,WY0+.02,D+.08,{cast:false});
/* ---------- the range: black iron, brass rail, firebox glowing; in a brick alcove ---------- */
const RZ=3.75,RL=1.3,RD=.66,RH=.82,RX=hw-RD/2;
tiledBox(.02,HW,RL+.5,MAT.brick,hw-.035,HW/2,RZ,.9,{cast:false});for(const e of [-1,1])tiledBox(.14,HW,.2,MAT.brick,hw-.08,HW/2,RZ+e*(RL/2+.15),.9,{cast:false});
add(RB(.24,.07,RL+.56,.01),MAT.wood,hw-.12,1.62,RZ);
{const g=grp(RX,0,RZ);add(RB(RD,RH-.04,RL,.02),MAT.iron,0,(RH-.04)/2,0,{to:g});add(RB(RD+.04,.05,RL+.04,.012),MAT.iron,0,RH-.02,0,{to:g});
 // hotplates
 for(const [dz,r] of [[-.36,.13],[0,.15],[.38,.12]]){add(new T.CylinderGeometry(r,r,.012,32),MAT.steel,-.04,RH+.01,dz,{to:g});for(const rr of [r*.6,r*.3])add(new T.TorusGeometry(rr,.004,6,32),MAT.iron,-.04,RH+.017,dz,{to:g,rx:Math.PI/2,cast:false})}
 // oven doors, firebox, ash door, brass handles and rail
 const front=-RD/2-.004;for(const [dz,w,y,h,fire] of [[-.38,.44,.42,.42,false],[.12,.36,.5,.28,true],[.12,.36,.18,.16,false],[.48,.26,.42,.42,false]]){add(RB(.02,h,w,.008),M('#202024',{metalness:.5,roughness:.35}),front,y,dz,{to:g});
   add(RB(.012,h-.05,w-.05,.004),M('#2a2a2e',{metalness:.5,roughness:.4}),front-.012,y,dz,{to:g});add(RB(.02,.02,w*.6,.006),MAT.brass,front-.03,y+h/2-.05,dz,{to:g});
   if(fire){for(let k=0;k<5;k++)add(BOX(.006,.018,w*.55),M('#200800',{emissive:'#ff5a14',emissiveIntensity:1.6}),front-.019,y-.08+k*.03,dz,{to:g,cast:false})}}
 add(new T.CylinderGeometry(.012,.012,RL+.1,12),MAT.brass,front-.07,RH-.1,0,{to:g,rx:Math.PI/2});for(const e of [-1,1])add(RB(.07,.02,.02,.005),MAT.brass,front-.035,RH-.1,e*(RL/2-.02),{to:g});
 add(RB(.02,.28,.4,.01),MAT.towel,front-.085,RH-.24,-.2,{to:g,cast:false});
 // flue
 add(new T.CylinderGeometry(.075,.075,HW-RH,20),MAT.iron,.18,RH+(HW-RH)/2,.42,{to:g})}
// stockpot with lid and a lazy steam; kettle on the back plate
{const sx=RX-.04,sz=RZ;add(lathe([[0,0],[.15,0],[.16,.01],[.16,.24],[.165,.25],[.15,.25],[.15,.02],[0,.02]],36),M('#d8dade',{metalness:.85,roughness:.3}),sx,RH+.016,sz);add(lathe([[0,0],[.165,0],[.12,.03],[.02,.035],[.025,.055],[0,.06]],36),M('#d8dade',{metalness:.85,roughness:.3}),sx,RH+.27,sz+.0);
 for(const e of [-1,1])add(new T.TorusGeometry(.03,.007,8,16,Math.PI),MAT.iron,sx,RH+.2,sz+e*.17,{ry:Math.PI/2});
 const n=40,pp=new Float32Array(n*3),life=new Float32Array(n);for(let i=0;i<n;i++)life[i]=i/n;const sg=new T.BufferGeometry();sg.setAttribute('position',new T.BufferAttribute(pp,3));
 const st=new T.Points(sg,new T.PointsMaterial({color:'#e8e8ee',size:.22,transparent:true,opacity:.03,depthWrite:false,map:ctex(32,32,(x,w,h)=>{const g=x.createRadialGradient(16,16,0,16,16,16);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h)})}));scene.add(st);
 ANIM.push((dt,t)=>{const a=sg.attributes.position.array;for(let i=0;i<n;i++){life[i]+=dt*.14;if(life[i]>1)life[i]-=1;const L=life[i];a[i*3]=sx+Math.sin(L*5+i)*.1*L-.1*L;a[i*3+1]=RH+.33+L*.9;a[i*3+2]=sz+.12-.06+Math.sin(L*4+i*2)*.12*L}sg.attributes.position.needsUpdate=true});
 const k=grp(RX-.04,RH+.016,RZ+.4);add(lathe([[0,0],[.1,0],[.11,.02],[.105,.1],[.07,.15],[.03,.165],[0,.17]],32),MAT.copper,0,0,0,{to:k});add(new T.CylinderGeometry(.012,.02,.13,10),MAT.copper,-.12,.08,0,{to:k,rz:-1.0});
 tube([[.07,.13,0],[.02,.26,0],[-.06,.13,0]],.008,MAT.brass,{to:k});add(new T.SphereGeometry(.015,10,8),MAT.wood,0,.175,0,{to:k})}
// on the mantel shelf: tins, a clock (five past ten), a box of matches
{const y=1.66;[['#7a1c1c',.09,-.55],['#1c3a5a',.11,-.4],['#5a4a1c',.08,-.26]].forEach(([c,h,dz])=>{add(new T.CylinderGeometry(.045,.045,h,24),M(c,{metalness:.4,roughness:.35}),hw-.12,y+h/2,RZ+dz);add(new T.CylinderGeometry(.047,.047,.012,24),MAT.brass,hw-.12,y+h+.002,RZ+dz)});
 const ck=grp(hw-.13,y,RZ+.35,-Math.PI/2);add(new T.CylinderGeometry(.08,.08,.05,32),M('#2a2a2e',{metalness:.5,roughness:.35}),0,.09,0,{to:ck,rx:Math.PI/2});
 add(new T.CircleGeometry(.065,32),M('#ffffff',{map:ctex(128,128,(x,w,h)=>{x.fillStyle='#efe8d4';x.fillRect(0,0,w,h);x.translate(64,64);x.fillStyle='#1a1410';for(let i=0;i<12;i++){const a=i/12*TAU;x.fillRect(Math.sin(a)*52-2,-Math.cos(a)*52-2,4,4)}x.strokeStyle='#1a1410';x.lineCap='round';const hr=(10+5/60)/12*TAU,mn=5/60*TAU;x.lineWidth=5;x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(hr)*30,-Math.cos(hr)*30);x.stroke();x.lineWidth=3;x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(mn)*46,-Math.cos(mn)*46);x.stroke()}),roughness:.3}),0,.09,.026,{to:ck,cast:false});
 for(const e of [-1,1])add(new T.CylinderGeometry(.01,.01,.04,8),MAT.iron,e*.05,.02,0,{to:ck})}
/* ---------- the sink: Belfast, brass taps, drainer, a wet cloth in the bowl ---------- */
const SZ=D-.33,SX=WX;
{add(RB(.86,.8,.6,.02),MAT.paint,SX,.4,SZ+.02);add(RB(.9,.03,.62,.008),MAT.wood,SX,.81,SZ+.01);
 // ceramic bowl: outer shell, inner hollow
 const g=grp(SX,.86,SZ);const bw=.7,bd=.48,bh=.26,wt=.035;add(RB(bw,wt,bd,.012),MAT.china,0,wt/2-.04,0,{to:g});for(const e of [-1,1]){add(RB(wt,bh,bd,.012),MAT.china,e*(bw/2-wt/2),bh/2-.04,0,{to:g});add(RB(bw,bh,wt,.012),MAT.china,0,bh/2-.04,e*(bd/2-wt/2),{to:g})}
 add(new T.CircleGeometry(.025,16),MAT.steel,.15,-.004,.05,{to:g,rx:-Math.PI/2,cast:false});
 // the cloth: crumpled, dark with water, a little pool round it
 const cg=new T.PlaneGeometry(.3,.26,24,20);const p=cg.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i);p.setZ(i,.02*Math.sin(x*40+y*12)+.015*Math.cos(y*55-x*9)+.03*Math.exp(-(x*x+y*y)*60))}cg.computeVertexNormals();
 const cloth=new T.Mesh(cg,M('#4a4844',{map:TX.towel,roughness:.16}));cloth.rotation.set(-Math.PI/2,0,.5);cloth.position.set(-.06,.012,.02);cloth.castShadow=true;g.add(cloth);
 add(new T.CircleGeometry(.2,24),MAT.wet,.02,-.0035,0,{to:g,rx:-Math.PI/2,cast:false}).scale.set(1,.7,1);
 // taps on the wall
 for(const e of [-1,1]){const t=grp(SX+e*.16,1.12,D-.04,Math.PI);add(new T.CylinderGeometry(.018,.018,.1,14),MAT.brass,0,0,.05,{to:t,rx:Math.PI/2});tube([[0,0,.1],[0,.02,.15],[0,-.06,.19]],.012,MAT.brass,{to:t});
   add(new T.CylinderGeometry(.03,.03,.016,6),MAT.brass,0,.05,.08,{to:t});for(let k=0;k<4;k++)add(BOX(.07,.01,.01),MAT.brass,0,.06,.08,{to:t,ry:k*Math.PI/4})}
 // a drip from the cold tap
 const drip=add(new T.SphereGeometry(.006,10,8),MAT.wet,SX+.16,1.03,D-.23,{cast:false});ANIM.push((dt,t)=>{const k=(t*.6)%1;drip.position.y=1.03-k*k*.2;drip.visible=k<.9});
 // drainer board and a plate rack with plates
 const dr=add(RB(.55,.03,.5,.008),MAT.pine,SX-.66,.9,SZ);dr.rotation.z=.03;for(let i=0;i<7;i++)add(BOX(.48,.004,.008),M('#9a7a52'),SX-.66,.917,SZ-.2+i*.065,{cast:false});
 const rk=grp(SX-.66,.92,SZ);for(const e of [-1,1])add(RB(.5,.03,.03,.006),MAT.wood,0,.02,e*.18,{to:rk});for(let i=0;i<9;i++)for(const e of [-1,1])add(new T.CylinderGeometry(.004,.004,.16,6),MAT.wood,-.22+i*.055,.1,e*.18,{to:rk});
 for(let i=0;i<5;i++){const pl=add(lathe([[0,0],[.09,0],[.11,.012],[.13,.02],[.125,.022],[.1,.016],[0,.012]],32),MAT.blueChina,-.18+i*.06,.15,0,{to:rk});pl.rotation.z=Math.PI/2;pl.rotation.y=0;
   add(new T.TorusGeometry(.115,.004,6,32),M('#2a4a8a',{roughness:.2}),-.18+i*.06+.012,.15,0,{to:rk,ry:Math.PI/2,cast:false})}}
/* ---------- counter on the right wall: knife block (full), scales, crocks; shelves above ---------- */
const CX=-hw+.3,CZ0=1.0,CZ1=4.5;
{add(RB(.58,.86,CZ1-CZ0,.01),MAT.paint,CX,.43,(CZ0+CZ1)/2);add(RB(.64,.05,CZ1-CZ0+.04,.01),MAT.pine,CX-.02,.885,(CZ0+CZ1)/2);
 for(let z=CZ0+.4;z<CZ1-.2;z+=.7){add(RB(.01,.62,.6,.004),M('#466a5e',{roughness:.45}),CX+.295,.44,z+.0,{});add(new T.SphereGeometry(.014,12,8),MAT.brass,CX+.31,.62,z+.24)}
 for(const y of [1.55,1.95]){add(RB(.26,.03,CZ1-CZ0,.006),MAT.pine,-hw+.13,y,(CZ0+CZ1)/2);for(const z of [CZ0+.1,(CZ0+CZ1)/2,CZ1-.1])add(RB(.03,.14,.2,.004),MAT.wood,-hw+.03,y-.08,z,{rx:0})}
 // jars and crockery on the shelves
 const jar=(z,y,h,c,lab)=>{add(lathe([[0,0],[.055,0],[.06,.02],[.06,h-.03],[.045,h],[0,h]],24),new T.MeshPhysicalMaterial({color:'#2a3438',roughness:.02,transparent:true,opacity:.35,depthWrite:false}),-hw+.14,y,z,{cast:false}).renderOrder=3;
   add(new T.CylinderGeometry(.054,.054,h*.7,20),M(c,{roughness:.9}),-hw+.14,y+h*.35+.005,z,{cast:false}).renderOrder=2;add(new T.CylinderGeometry(.048,.048,.025,20),MAT.brass,-hw+.14,y+h+.01,z)};
 [[1.3,'#e8dcc0'],[1.45,'#6a4020'],[1.6,'#d8c070'],[1.75,'#2a1a10'],[2.0,'#c8a060'],[2.15,'#a03020']].forEach(([z,c],i)=>jar(z,1.565,.18+(i%2)*.04,c));
 for(let i=0;i<6;i++){const z=2.6+i*.22;const pl=add(lathe([[0,0],[.09,0],[.11,.012],[.13,.02],[.125,.022],[.1,.016],[0,.012]],32),MAT.blueChina,-hw+.07,1.965+.13,z);pl.rotation.z=-Math.PI/2+.18;add(new T.TorusGeometry(.115,.004,6,32),M('#2a4a8a',{roughness:.2}),-hw+.09,1.965+.13,z,{ry:Math.PI/2,cast:false}).rotation.x=.0}
 add(RB(.03,.02,1.4,.004),MAT.wood,-hw+.21,1.99,3.15);
 // knife block: six handles, every slot filled
 const kb=grp(CX+.06,.91,3.75,Math.PI/2+.35);{const sh=new T.Shape();sh.moveTo(-.1,0);sh.lineTo(.1,0);sh.lineTo(.1,.25);sh.lineTo(-.1,.13);sh.lineTo(-.1,0);
  const bg=new T.ExtrudeGeometry(sh,{depth:.13,bevelEnabled:true,bevelThickness:.008,bevelSize:.008,bevelSegments:3});bg.translate(0,0,-.065);bg.rotateY(Math.PI/2);add(bg,MAT.wood,0,.008,0,{to:kb});
  // slots along the slanted top, a handle standing in each, leaning with the slant
  const slope=Math.atan2(.12,.2);for(let i=0;i<6;i++){const row=Math.floor(i/3),col=i%3;const zz=-.05+row*.075,yy=.13+(.1-zz)*.6+.008,xx=-.04+col*.04;
   const k=grp(xx,yy,zz,0,kb);(H.hook||(()=>{}))('knife',k,{i});k.rotation.x=slope;add(RB(.018,.004,.04,.002),M('#0a0806'),0,-.001,0,{to:k,cast:false});add(RB(.02,.11-col*.012,.03,.008),M('#1a1210',{roughness:.35}),0,.055,0,{to:k});for(const y of [.025,.07])add(new T.CylinderGeometry(.004,.004,.022,8),MAT.brass,0,y,0,{to:k,rz:Math.PI/2})}}
 // a brass balance scale and a crock of wooden spoons
 const sc=grp(CX,.91,2.95);add(RB(.32,.03,.16,.01),MAT.iron,0,.015,0,{to:sc});add(new T.CylinderGeometry(.012,.018,.18,10),MAT.iron,0,.12,0,{to:sc});add(RB(.3,.012,.02,.004),MAT.iron,0,.21,0,{to:sc});
 for(const e of [-1,1]){add(lathe([[0,0],[.08,0],[.09,.03],[.085,.032],[0,.006]],28),MAT.brass,e*.13,.22,0,{to:sc})}add(lathe([[0,0],[.06,0],[.07,.03],[0,.03]],24),MAT.brass,-.13,.03,0,{to:sc});
 const cr=grp(CX+.02,.91,1.6);add(lathe([[0,0],[.07,0],[.08,.06],[.075,.17],[.08,.18],[.07,.18],[.065,.02],[0,.02]],28),M('#d8c8a0',{roughness:.3}),0,0,0,{to:cr});for(let i=0;i<5;i++){const s=add(new T.CylinderGeometry(.006,.006,.32,8),M('#c8a070',{roughness:.7}),(rnd()-.5)*.05,.25,(rnd()-.5)*.05,{to:cr});s.rotation.set((rnd()-.5)*.4,0,(rnd()-.5)*.4);add(new T.SphereGeometry(.025,10,8),M('#c8a070'),0,.16,0,{to:s}).scale.set(1,.4,.6)}}
/* ---------- the worktable: scrubbed pine, floured, half-made pie, onions, eggs ---------- */
const TX0=-.05,TZ=2.75,TWd=.92,TL=1.9,TH=.8;
{const g=grp(TX0,0,TZ);add(RB(TWd,.07,TL,.01),MAT.pine,0,TH-.035,0,{to:g});add(RB(TWd-.08,.12,TL-.1,.008),MAT.pine,0,TH-.13,0,{to:g});
 for(const [x,z] of [[-1,-1],[1,-1],[-1,1],[1,1]])add(lathe([[0,0],[.035,0],[.04,.05],[.03,.12],[.042,.2],[.032,.32],[.036,.6],[.04,.66],[0,.66]],16),MAT.pine,x*(TWd/2-.06),0,z*(TL/2-.07),{to:g});
 add(RB(TWd-.12,.02,TL-.16,.006),MAT.pine,0,.12,0,{to:g});add(RB(.01,.09,.4,.004),MAT.pine,-TWd/2+.035,TH-.13,-.3,{to:g});add(new T.SphereGeometry(.015,10,8),M('#e8e0d0',{roughness:.3}),-TWd/2+.025,TH-.13,-.3,{to:g});
 // flour dusting
 const ft=ctex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);for(let i=0;i<900;i++){x.fillStyle=`rgba(255,255,255,${rnd()*.5})`;const r=rnd()*90*Math.sqrt(rnd());const a=rnd()*TAU;x.beginPath();x.arc(w/2+Math.cos(a)*r,h/2+Math.sin(a)*r,1+rnd()*2,0,TAU);x.fill()}});
 add(new T.PlaneGeometry(.6,.6),M('#ffffff',{map:ft,transparent:true,depthWrite:false,roughness:1}),.05,TH+.0015,.25,{to:g,rx:-Math.PI/2,cast:false});
 // rolling pin, pie dish with pastry lid half on, flour bag
 add(new T.CylinderGeometry(.03,.03,.32,20),MAT.pine,.12,TH+.03,.4,{to:g,rx:Math.PI/2,rz:.3}).rotation.set(Math.PI/2,0,.3);for(const e of [-1,1])add(new T.CylinderGeometry(.012,.014,.08,10),MAT.pine,.12+e*.2*Math.sin(.3),TH+.03,.4+e*.2*Math.cos(.3),{to:g,rx:Math.PI/2}).rotation.set(Math.PI/2,0,.3);
 add(lathe([[0,0],[.1,0],[.12,.045],[.13,.05],[.115,.05],[.1,.008],[0,.008]],40),M('#f0e8d8',{roughness:.2}),-.15,TH,.15,{to:g});add(new T.CylinderGeometry(.11,.11,.03,40),M('#7a2a3a',{roughness:.5}),-.15,TH+.03,.15,{to:g});
 const lid=add(new T.CylinderGeometry(.125,.125,.01,40),M('#e0c896',{roughness:.8}),-.1,TH+.05,.2,{to:g});lid.rotation.z=.08;
 const bag=grp(.28,TH,-.25,.3,g);add(RB(.16,.24,.1,.03),M('#e8dcc0',{roughness:.95}),0,.12,0,{to:bag});add(new T.PlaneGeometry(.13,.065),M('#ffffff',{map:TX.label,roughness:.9}),0,.13,-.0505,{to:bag,ry:Math.PI,cast:false});
 // board with an onion, halved, and a carrot
 const bd=grp(-.2,TH,-.45,.15,g);add(RB(.28,.025,.42,.008),MAT.wood,0,.0125,0,{to:bd});{const skin=M('#a8702c',{roughness:.45});const wo=add(new T.SphereGeometry(.045,24,16),skin,-.06,.065,-.1,{to:bd});wo.scale.set(1,.9,1);add(new T.ConeGeometry(.012,.03,10),M('#7a5020',{roughness:.6}),-.06,.115,-.1,{to:bd});
  const ring=ctex(128,128,(x,w,h)=>{x.fillStyle='#ece6cc';x.fillRect(0,0,w,h);x.strokeStyle='rgba(170,150,90,.7)';x.lineWidth=2;for(let r=8;r<62;r+=8){x.beginPath();x.arc(64,64,r,0,TAU);x.stroke()}x.strokeStyle='#a8702c';x.lineWidth=5;x.beginPath();x.arc(64,64,61,0,TAU);x.stroke()});
  const ho=add(new T.SphereGeometry(.045,24,16,0,TAU,0,Math.PI/2),skin,.07,.025+.0405,-.05,{to:bd});ho.scale.set(1,.9,1);ho.rotation.x=Math.PI;add(new T.CircleGeometry(.045,32),M('#ffffff',{map:ring,roughness:.4}),.07,.0665,-.05,{to:bd,rx:-Math.PI/2,cast:false})}
 add(new T.CylinderGeometry(.018,.006,.2,12),M('#d86a20',{roughness:.6}),.05,.045,.1,{to:bd,rz:Math.PI/2}).rotation.set(0,.6,Math.PI/2);
 // bowl of eggs, a jug of milk
 const eb=grp(.25,TH,.68,0,g);add(lathe([[0,0],[.06,0],[.12,.07],[.125,.075],[.115,.075],[.055,.008],[0,.008]],32),M('#c86a3a',{roughness:.35}),0,0,0,{to:eb});for(let i=0;i<5;i++){const e=add(new T.SphereGeometry(.024,16,12),M('#e8d4b0',{roughness:.5}),Math.cos(i*1.3)*.045,.045+(i>3?.02:0),Math.sin(i*1.3)*.045,{to:eb});e.scale.set(1,1.3,1);e.rotation.z=i}
 const jg=grp(-.28,TH,.62,0,g);add(lathe([[0,0],[.045,0],[.05,.02],[.04,.12],[.05,.15],[0,.15]],28),M('#f0ece4',{roughness:.2}),0,0,0,{to:jg});add(new T.CylinderGeometry(.042,.042,.005,24),M('#fafaf4',{roughness:.3}),0,.13,0,{to:jg,cast:false});tube([[.045,.12,0],[.08,.1,0],[.045,.04,0]],.006,M('#f0ece4',{roughness:.2}),{to:jg})}
/* ---------- the dough: rising in a bowl under a tea towel, near the warmth ---------- */
{const g=grp(-.12,TH,TZ+.72);add(lathe([[0,0],[.1,0],[.17,.1],[.19,.13],[.18,.13],[.1,.01],[0,.01]],40),M('#e8dcc8',{roughness:.25}),0,0,0,{to:g});add(new T.TorusGeometry(.18,.006,6,40),M('#4a6a9a',{roughness:.25}),0,.11,0,{to:g,rx:Math.PI/2,cast:false});
 const cg=new T.PlaneGeometry(.46,.46,30,30);const p=cg.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),r=Math.hypot(x,y);let z=r<.2?.085*(1-r*r/(.2*.2))+.0:-(r-.2)*2.2;z+=.006*Math.sin(x*60)*Math.cos(y*50);p.setZ(i,Math.max(z,-.14))}cg.computeVertexNormals();
 const tw=new T.Mesh(cg,MAT.towel);tw.rotation.set(-Math.PI/2,0,.3);tw.position.set(0,.135,0);tw.castShadow=true;g.add(tw)}
/* ---------- copper pans on a rail on the back wall, left of the window ---------- */
{const y=1.75;add(new T.CylinderGeometry(.014,.014,1.05,12),MAT.brass,.85,y,D-.07,{rz:Math.PI/2});for(const e of [-1,1])add(new T.CylinderGeometry(.01,.01,.06,8),MAT.brass,.85+e*.5,y,D-.04,{rx:Math.PI/2});
 [[.4,.11,.16],[.62,.13,.2],[.86,.1,.14],[1.08,.15,.24],[1.3,.09,.13]].forEach(([x,r,dh])=>{const g=grp(x,y,D-.08);add(new T.TorusGeometry(.016,.004,6,14),MAT.brass,0,-.02,0,{to:g});
   add(RB(.022,dh,.012,.005),MAT.brass,0,-.03-dh/2,0,{to:g});const pan=add(lathe([[0,0],[r,0],[r+.004,.006],[r+.006,r*.6],[r,r*.6],[r-.002,.008],[0,.008]],40),MAT.copper,0,-.03-dh-r,.004,{to:g,rx:Math.PI/2});pan.position.z=r*.3+.02})}
/* ---------- dresser near the door: plates on edge, jugs on hooks ---------- */
{const g=grp(-hw+.25,0,.55,-Math.PI/2);add(RB(1.0,.85,.45,.01),MAT.paint,0,.425,0,{to:g});add(RB(1.04,.04,.48,.01),MAT.pine,0,.87,0,{to:g});for(const x of [-.25,.25]){add(RB(.46,.36,.012,.004),M('#466a5e',{roughness:.45}),x,.5,-.23,{to:g});add(new T.SphereGeometry(.014,10,8),MAT.brass,x+.18,.5,-.24,{to:g})}
 add(RB(1.0,1.1,.02,.006),MAT.paint,0,1.45,.2,{to:g});for(const y of [1.25,1.62,1.98])add(RB(1.0,.025,.2,.006),MAT.pine,0,y,.1,{to:g});for(const e of [-1,1])add(RB(.03,1.1,.24,.006),MAT.paint,e*.5,1.45,.09,{to:g});add(RB(1.08,.06,.28,.01),MAT.paint,0,2.02,.09,{to:g});
 const wm=M('#ffffff',{map:TX.willow,roughness:.18});for(const y of [1.25,1.62])for(let i=0;i<4;i++){const p=add(lathe([[0,0],[.08,0],[.1,.012],[.12,.02],[.115,.022],[.09,.016],[0,.012]],32),MAT.blueChina,-.36+i*.24,y+.13,.13,{to:g,rx:-Math.PI/2+.2});const d=add(new T.CircleGeometry(.118,40),wm,-.36+i*.24,y+.13+.0,.115,{to:g,cast:false});d.rotation.set(.2,Math.PI,0);d.position.z=.13-.017*Math.cos(.2);d.position.y=y+.13+.017*Math.sin(.2)}
 for(let i=0;i<5;i++){const jx=-.4+i*.2;add(new T.TorusGeometry(.012,.003,6,10,Math.PI),MAT.brass,jx,1.2,.0,{to:g});add(lathe([[0,0],[.035,0],[.04,.03],[.03,.08],[.035,.09],[0,.09]],20),M(['#e8e0d0','#4a6a9a','#e8e0d0','#8a4a2a','#e8e0d0'][i],{roughness:.25}),jx,1.08,.03,{to:g})}}
/* ---------- rag rug by the range ---------- */
add(new T.PlaneGeometry(.7,1.2),M('#ffffff',{map:ctex(128,256,(x,w,h)=>{const cs=['#5a2a22','#2a3a44','#8a7050','#4a4a36','#6a5444','#3a2a22'];for(let y=0;y<h;y+=6){x.fillStyle=cs[Math.floor(rnd()*cs.length)];x.fillRect(0,y,w,6)}noise(x,w,h,.15,4000)}),roughness:1}),hw-RD-.42,.004,RZ,{rx:-Math.PI/2,cast:false});
/* ---------- enamel bracket lamps on the walls ---------- */
const shadeM=M('#2a4a40',{roughness:.3,side:T.DoubleSide});const bulbM=M('#fff2d0',{emissive:'#ffcf88',emissiveIntensity:2.0});
const LAMPS=[[-hw+.02,2.15,2.4,Math.PI/2],[hw-.02,2.15,1.7,-Math.PI/2]];
for(const [x,y,z,ry] of LAMPS){const g=grp(x,y,z,ry);add(RB(.08,.12,.02,.006),MAT.iron,0,0,.0,{to:g});tube([[0,0,.01],[0,.04,.12],[0,.0,.24]],.008,MAT.iron,{to:g});
 add(lathe([[.02,.06],[.03,.05],[.06,.02],[.12,-.03],[.115,-.035],[.055,.015],[.025,.045],[.015,.06]],32),shadeM,0,-.03,.24,{to:g,cast:false});add(new T.SphereGeometry(.025,14,10),bulbM,0,-.02,.24,{to:g,cast:false})}
/* ---------- lights ---------- */
const hemi=new T.HemisphereLight('#6a6a80','#3a2414',.5);scene.add(hemi);
const pend=LAMPS.map(([x,y,z,ry])=>{const l=new T.PointLight('#ffd6a0',.8,5,1.7);l.position.set(x+(x<0?.24:-.24),y-.1,z);scene.add(l);return l});
const key=new T.SpotLight('#ffe0b8',1.05,9,.9,.8,1.2);key.position.set(0,3.6,1.6);key.target.position.set(0,0,3.2);scene.add(key,key.target);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.bias=-.0006;key.shadow.radius=5;
const fireL=new T.PointLight('#ff7a30',.7,3,1.8);fireL.position.set(RX-RD/2-.2,.5,RZ+.12);scene.add(fireL);
const moon=new T.SpotLight('#8aa6ff',1.4,8,.55,.8,1.2);moon.position.set(WX,2.6,D+1.6);moon.target.position.set(WX,0,D-1.6);scene.add(moon,moon.target);moon.castShadow=true;moon.shadow.mapSize.set(1024,1024);
return {exposure:1.22,
 views:{wide:{p:[0,5.4,.55],t:[0,0,3.25],fov:60,where:'Kitchen · from above',text:'The kitchen from above. The range lit, a stockpot on it. The worktable floured, a bowl of dough under a cloth. The sink under the window.'},
  range:{p:[.25,1.6,2.75],t:[1.55,.7,3.85],fov:56,where:'Kitchen · close look',text:'The range. Black iron and a brass rail, the firebox glowing through its vents. Stock on the boil, the kettle pushed to the back.'},
  sink:{p:[-.55,1.85,4.35],t:[-.55,.86,5.3],fov:46,where:'Kitchen · close look',text:'The sink. A cloth in the bottom of the bowl, wrung out and left. The cold tap drips.'},
  knives:{p:[-.55,1.6,2.85],t:[-1.45,.98,3.4],fov:56,where:'Kitchen · close look',text:'The counter. A knife block against the tiles, a brass scale beside it, the jar shelves above.'},
  table:{p:[.55,2.1,1.6],t:[-.05,.8,2.6],fov:52,where:'Kitchen · close look',text:'The worktable. Scrubbed pine, floured. A pie waiting for its lid, a rolling pin, an onion halved on the board.'},
  bread:{p:[.45,1.5,2.75],t:[-.12,.86,3.47],fov:44,where:'Kitchen · close look',text:'A bowl under a tea towel, the dough lifting it.'},
  pans:{p:[.6,1.5,4.2],t:[.85,1.55,5.6],fov:54,where:'Kitchen · close look',text:'Copper pans on the rail, biggest to smallest and back again.'},
  dresser:{p:[.3,1.55,1.9],t:[-1.6,1.35,.55],fov:52,where:'Kitchen · close look',text:'The dresser. Willow-pattern plates on edge, jugs on hooks.'},
  dark:{p:[0,5.4,.55],t:[0,0,3.25],fov:60,where:'Kitchen · power out',text:'The lights go. The range still glows through its vents; the window gives a little snowlight.',dark:true}},
 update(t,dt,on,dk){pend.forEach(l=>l.intensity=.8*on);key.intensity=1.05*on;bulbM.emissiveIntensity=2.0*on;hemi.intensity=.5-.3*dk;moon.intensity=1.4+1.4*dk;fireL.intensity=(.7+.6*dk)*(.9+.1*Math.sin(t*7)+.05*Math.sin(t*13))}}});
