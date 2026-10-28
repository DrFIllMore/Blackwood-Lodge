// ROOM {"title":"Blackwood Room 3 Proof","aria":"Room 3, the staff room under the eaves, seen from low down, rendered in 3D","loading":"Lighting Room 3…","where":"Room 3 · from the floor","text":"Room 3, under the eaves: Nell and Tomas. Two iron beds, a washstand, a chest under the window. Boots lined up under the beds.","buttons":[["wide","The room"],["chest","The chest"],["tin","Recipe tin"],["chair","The chair"],["gloves","Gloves and cap"],["wash","Washstand"],["hooks","The hooks"],["under","Under the beds"],["dark","Power out"]]}
ROOM(63,H=>{const {T,TAU,rnd,ctex,noise,scene,M,add,RB,BOX,lathe,grp,plane,tube,lin,ANIM}=H;
/* ---------- textures: whitewash, scrubbed pine, patchwork, rag rug, ironstone ---------- */
const TX={
 pine:ctex(1024,1024,(x,w,h)=>{const n=6,pw=w/n;for(let i=0;i<n;i++){const t=rnd();x.fillStyle=`rgb(${168+t*22|0},${132+t*18|0},${92+t*12|0})`;x.fillRect(i*pw,0,pw,h);
     for(let g=0;g<22;g++){x.strokeStyle=`rgba(90,60,30,${.06+rnd()*.12})`;x.lineWidth=.8+rnd()*2;const gx=i*pw+rnd()*pw;x.beginPath();x.moveTo(gx,0);x.bezierCurveTo(gx+rnd()*14-7,h*.3,gx+rnd()*14-7,h*.7,gx+rnd()*8-4,h);x.stroke()}
     for(let k=0;k<3;k++){const cx=i*pw+16+rnd()*(pw-32),cy=rnd()*h;x.fillStyle='rgba(80,46,18,.55)';x.beginPath();x.ellipse(cx,cy,5+rnd()*4,8+rnd()*5,0,0,TAU);x.fill();x.strokeStyle='rgba(90,56,24,.22)';for(let r=8;r<26;r+=4){x.beginPath();x.ellipse(cx,cy,r*.7,r*1.4,0,0,TAU);x.stroke()}}
     for(const yy of [rnd()*h*.4,h*.5+rnd()*h*.4]){x.fillStyle='rgba(30,18,8,.8)';x.beginPath();x.arc(i*pw+12,yy,3,0,TAU);x.arc(i*pw+pw-12,yy,3,0,TAU);x.fill()}
     x.fillStyle='rgba(30,16,6,.7)';x.fillRect(i*pw,0,3,h)}noise(x,w,h,.05,9000)},[2,1.6]),
 limewash:ctex(512,512,(x,w,h)=>{x.fillStyle='#e6e0d0';x.fillRect(0,0,w,h);for(let i=0;i<70;i++){const g=x.createRadialGradient(rnd()*w,rnd()*h,0,rnd()*w,rnd()*h,40+rnd()*90);g.addColorStop(0,`rgba(${rnd()<.5?180:255},${rnd()<.5?170:250},${rnd()<.5?150:235},.12)`);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,w,h)}noise(x,w,h,.05,9000)},[2,2]),
 boards:ctex(512,256,(x,w,h)=>{const n=10,pw=w/n;for(let i=0;i<n;i++){x.fillStyle=i%2?'#8a9a88':'#869684';x.fillRect(i*pw,0,pw,h);x.fillStyle='rgba(30,40,30,.45)';x.fillRect(i*pw,0,2,h);x.fillStyle='rgba(255,255,240,.08)';x.fillRect(i*pw+2,0,2,h)}
   for(let i=0;i<40;i++){x.fillStyle='rgba(120,90,60,.18)';x.fillRect(rnd()*w,rnd()*h,2+rnd()*10,1)}noise(x,w,h,.06,4000)},[3,1]),
 patch:ctex(512,512,(x,w,h)=>{const s=64;const cols=['#8a2a24','#c8b48a','#3a4a6a','#6a7a4a','#a86a3a','#e0d4b8','#5a2a3a','#2a5a5a'];for(let i=0;i<8;i++)for(let j=0;j<8;j++){const c=cols[Math.floor(rnd()*cols.length)];x.fillStyle=c;x.fillRect(i*s,j*s,s,s);
     const p=Math.floor(rnd()*4);x.fillStyle='rgba(255,250,235,.28)';if(p===0)for(let a=0;a<4;a++)for(let b=0;b<4;b++){x.beginPath();x.arc(i*s+8+a*16,j*s+8+b*16,3,0,TAU);x.fill()}else if(p===1)for(let a=0;a<s;a+=8)x.fillRect(i*s+a,j*s,3,s);else if(p===2){x.beginPath();x.moveTo(i*s,j*s);x.lineTo(i*s+s,j*s+s);x.lineTo(i*s,j*s+s);x.fill()}
     x.strokeStyle='rgba(30,20,10,.55)';x.setLineDash([3,3]);x.lineWidth=1.2;x.strokeRect(i*s+2,j*s+2,s-4,s-4);x.setLineDash([])}noise(x,w,h,.06,5000)},[2,2]),
 rag:ctex(512,512,(x,w,h)=>{x.fillStyle='#5a4a3a';x.fillRect(0,0,w,h);const cols=['#7a3a2a','#3a4a5a','#a8925a','#5a6a4a','#8a6a5a','#2a2a30','#b8a888'];for(let r=250;r>8;r-=9){const c=cols[Math.floor(rnd()*cols.length)];x.strokeStyle=c;x.lineWidth=8;x.beginPath();x.ellipse(w/2,h/2,r,r*.98,0,0,TAU);x.stroke();
     x.strokeStyle='rgba(0,0,0,.25)';x.lineWidth=1;for(let k=0;k<r/2;k++){const a=k/(r/2)*TAU;x.beginPath();x.moveTo(w/2+Math.cos(a)*(r-4),h/2+Math.sin(a)*(r-4));x.lineTo(w/2+Math.cos(a+.05)*(r+4),h/2+Math.sin(a+.05)*(r+4));x.stroke()}}noise(x,w,h,.06,6000)}),
 ironstone:ctex(256,128,(x,w,h)=>{x.fillStyle='#f0ece2';x.fillRect(0,0,w,h);x.fillStyle='#2a4a8a';x.fillRect(0,h*.12,w,5);x.fillRect(0,h*.2,w,2);noise(x,w,h,.03,800)}),
 tin:ctex(512,256,(x,w,h)=>{x.fillStyle='#7a1a1a';x.fillRect(0,0,w,h);x.strokeStyle='#d8b060';x.lineWidth=4;x.strokeRect(10,10,w-20,h-20);for(let i=0;i<26;i++){const cx=30+rnd()*(w-60),cy=30+rnd()*(h-60);for(let k=0;k<5;k++){const a=k/5*TAU;x.fillStyle=['#e8c8a0','#e8a0a0','#f0e0b0'][i%3];x.beginPath();x.ellipse(cx+Math.cos(a)*7,cy+Math.sin(a)*7,6,3.5,a,0,TAU);x.fill()}x.fillStyle='#d8b060';x.beginPath();x.arc(cx,cy,3,0,TAU);x.fill();x.fillStyle='#3a5a2a';x.beginPath();x.ellipse(cx+12,cy+8,8,3,.6,0,TAU);x.fill()}
   x.fillStyle='rgba(122,26,26,.85)';x.fillRect(w/2-120,h/2-26,240,52);x.strokeStyle='#d8b060';x.lineWidth=2;x.strokeRect(w/2-120,h/2-26,240,52);x.fillStyle='#e8c870';x.font='bold 34px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillText('RECIPES',w/2,h/2+2)}),
 wool:ctex(128,128,(x,w,h)=>{x.fillStyle='#9a9a9a';x.fillRect(0,0,w,h);for(let i=0;i<1400;i++){x.strokeStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:255},${rnd()<.5?0:255},.07)`;const px=rnd()*w,py=rnd()*h,a=rnd()*TAU;x.beginPath();x.moveTo(px,py);x.lineTo(px+Math.cos(a)*3,py+Math.sin(a)*3);x.stroke()}},[2,2]),
 leather:ctex(128,128,(x,w,h)=>{x.fillStyle='#a87a4a';x.fillRect(0,0,w,h);for(let i=0;i<40;i++){x.strokeStyle=`rgba(60,30,10,${.08+rnd()*.12})`;x.beginPath();const px=rnd()*w,py=rnd()*h;x.moveTo(px,py);x.quadraticCurveTo(px+rnd()*20-10,py+rnd()*20-10,px+rnd()*30-15,py+rnd()*30-15);x.stroke()}noise(x,w,h,.05,1500)}),
 night:ctex(256,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0a1430');g.addColorStop(.7,'#22345e');g.addColorStop(1,'#4a5c8a');x.fillStyle=g;x.fillRect(0,0,w,h);x.fillStyle='#050812';for(let i=0;i<6;i++){const tx=i/5*w,th=h*(.35+rnd()*.3),tw=w*.16;for(let k=0;k<4;k++){const yy=h-k*th*.2;x.beginPath();x.moveTo(tx-tw*(1-k*.2),yy);x.lineTo(tx,yy-th*.4);x.lineTo(tx+tw*(1-k*.2),yy);x.fill()}}for(let i=0;i<40;i++){x.fillStyle='rgba(235,240,255,.8)';x.beginPath();x.arc(rnd()*w,rnd()*h*.8,1+rnd(),0,TAU);x.fill()}}),
 linen:ctex(128,128,(x,w,h)=>{x.fillStyle='#e8e2d4';x.fillRect(0,0,w,h);for(let i=0;i<w;i+=2){x.fillStyle=`rgba(0,0,0,${.02+rnd()*.03})`;x.fillRect(i,0,1,h);x.fillRect(0,i,w,1)}},[4,4]),
 towel:ctex(128,128,(x,w,h)=>{x.fillStyle='#ece6d8';x.fillRect(0,0,w,h);x.fillStyle='#8a2a24';x.fillRect(0,12,w,6);x.fillRect(0,h-18,w,6);for(let i=0;i<w;i+=2){x.fillStyle='rgba(0,0,0,.04)';x.fillRect(i,0,1,h)}}),
};
TX.limewash.repeat.set(1,1);const MAT={floor:M('#ffffff',{map:TX.pine,roughness:.62}),lime:M('#ffffff',{map:TX.limewash,roughness:.95,side:T.DoubleSide}),boards:M('#ffffff',{map:TX.boards,roughness:.7}),iron:M('#18181a',{metalness:.45,roughness:.42}),brass:M('#c9a24a',{metalness:.85,roughness:.3}),
  patch:M('#ffffff',{map:TX.patch,roughness:.92}),linen:M('#ffffff',{map:TX.linen,roughness:.88}),pineF:M('#c8a070',{map:TX.pine,roughness:.5}),paintG:M('#7a8a78',{roughness:.55}),
  stone:M('#ffffff',{map:TX.ironstone,roughness:.2}),marble:M('#ddd6cc',{roughness:.22}),beam:M('#6a4a30',{map:TX.pine,roughness:.7}),enamel:M('#f0ece2',{roughness:.25})};
/* ---------- the room under the eaves: 3.6 x 4.4; ceiling slopes down to a 1.3 m knee wall on the +x side ---------- */
const W=3.6,D=4.4,HH=2.55,hw=W/2,KW=1.3,SX=.35;// slope starts at x=SX
const WX=-.12,WY0=1.0,WY1=1.85,WW=.7;
plane(W,D,MAT.floor,0,0,D/2,0,-Math.PI/2);TX.limewash.repeat.set(1,1);
// flat ceiling (x < SX) and sloped ceiling to the knee wall
plane(SX+hw,D,MAT.lime,(SX-hw)/2,HH,D/2,0,Math.PI/2);
{const g=new T.BufferGeometry();const L=Math.hypot(hw-SX,HH-KW);g.setAttribute('position',new T.Float32BufferAttribute([SX,HH,0, hw,KW,0, hw,KW,D, SX,HH,0, hw,KW,D, SX,HH,D],3));g.setAttribute('uv',new T.Float32BufferAttribute([0,0, L/1.8,0, L/1.8,D/1.8, 0,0, L/1.8,D/1.8, 0,D/1.8],2));g.computeVertexNormals();const m=new T.Mesh(g,MAT.lime);m.receiveShadow=true;scene.add(m)}
// walls: back (with the window) and front, cut to the slope; -x wall full height; +x knee wall
const endWall=(z,ry,hole)=>{const sh=new T.Shape();sh.moveTo(-hw,0);sh.lineTo(hw,0);sh.lineTo(hw,KW);sh.lineTo(SX,HH);sh.lineTo(-hw,HH);sh.lineTo(-hw,0);
  if(hole){const [u0,u1,v0,v1]=hole;const p=new T.Path();p.moveTo(u0,v0);p.lineTo(u0,v1);p.lineTo(u1,v1);p.lineTo(u1,v0);p.lineTo(u0,v0);sh.holes.push(p)}
  const g=new T.ShapeGeometry(sh);const pp=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<pp.count;i++)uv.setXY(i,(pp.getX(i)+hw)/1.8,pp.getY(i)/1.8);if(ry){for(let i=0;i<pp.count;i++)pp.setX(i,-pp.getX(i));g.computeVertexNormals()}
  const m=new T.Mesh(g,MAT.lime);m.position.z=z;m.rotation.y=ry;m.receiveShadow=true;m.material.side=T.DoubleSide;scene.add(m)};
// back wall: build with x already mirrored so the slope lands on +x after the turn
endWall(D,Math.PI,[WX-WW/2,WX+WW/2,WY0,WY1]);endWall(0,0);
plane(D,HH,MAT.lime,-hw,HH/2,D/2,Math.PI/2);plane(D,KW,MAT.lime,hw,KW/2,D/2,-Math.PI/2);
// painted board wainscot to 1.05 m on the -x and back walls; a collar beam and purlin
const wainH=1.05;{const b=new T.PlaneGeometry(D,wainH);const uv=b.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)*D/1.2,uv.getY(i));add(b,MAT.boards,-hw+.012,wainH/2,D/2,{ry:Math.PI/2,cast:false})}
for(const [l,x] of [[WX-WW/2-.05+hw,(-hw+WX-WW/2-.05)/2],[hw-(WX+WW/2+.05),(hw+WX+WW/2+.05)/2]]){const lh=Math.min(wainH,1.05);const b=new T.PlaneGeometry(l,lh);const uv=b.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)*l/1.2,uv.getY(i));add(b,MAT.boards,x,lh/2,D-.012,{ry:Math.PI,cast:false})}
add(BOX(.035,.04,D),MAT.paintG,-hw+.02,wainH,D/2,{cast:false});add(BOX(W,.04,.035),MAT.paintG,0,wainH,D-.02,{cast:false});add(BOX(.03,.12,D),MAT.paintG,-hw+.015,.06,D/2,{cast:false});add(BOX(W,.12,.03),MAT.paintG,0,.06,D-.015,{cast:false});
add(BOX(.03,.12,D),MAT.paintG,hw-.015,.06,D/2,{cast:false});
for(const z of [.9,2.2,3.5]){const run=hw-SX,drop=HH-KW,L=Math.hypot(run,drop);const r=add(BOX(L,.12,.09),MAT.beam,(SX+hw)/2-.03,(HH+KW)/2-.06,z,{cast:false});r.rotation.z=-Math.atan2(drop,run)}
// the window: a small casement with a deep sill and a gingham half-curtain
for(const [w,h,x,y] of [[.06,WY1-WY0,WX-WW/2-.03,(WY0+WY1)/2],[.06,WY1-WY0,WX+WW/2+.03,(WY0+WY1)/2],[WW+.12,.06,WX,WY1+.03],[WW+.12,.06,WX,WY0-.03]])add(BOX(w,h,.3),MAT.lime,x,y,D+.15,{cast:false});
add(RB(WW+.16,.04,.24,.008),MAT.paintG,WX,WY0-.02,D-.04);const cas=M('#e8e2d2',{roughness:.5});for(const [w,h,x,y] of [[.045,WY1-WY0,WX-WW/2+.022,(WY0+WY1)/2],[.045,WY1-WY0,WX+WW/2-.022,(WY0+WY1)/2],[WW,.045,WX,WY1-.022],[WW,.045,WX,WY0+.022],[.04,WY1-WY0,WX,(WY0+WY1)/2],[WW,.025,WX,(WY0+WY1)/2]])add(RB(w,h,.045,.005),cas,x,y,D+.08);
add(RB(WW-.04,.04,.1,.018),M('#e8eef8',{roughness:.9}),WX,WY0+.02,D+.22,{cast:false});add(new T.PlaneGeometry(3,3),new T.MeshBasicMaterial({map:TX.night,color:lin('#b0b8c8')}),WX,1.4,D+1.2,{ry:Math.PI,cast:false});
{const n=180,pp=new Float32Array(n*3);for(let i=0;i<n;i++){pp[i*3]=WX+(rnd()-.5)*1.8;pp[i*3+1]=rnd()*2.6;pp[i*3+2]=D+.3+rnd()*.8}const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pp,3));
 const sn=new T.Points(g,new T.PointsMaterial({color:'#e6ecff',size:.01,transparent:true,opacity:.85,depthWrite:false}));scene.add(sn);ANIM.push((dt,t)=>{const a=g.attributes.position.array;for(let i=0;i<n;i++){a[i*3+1]-=dt*(.3+(i%7)*.05);a[i*3]+=dt*.1*Math.sin(t+i);if(a[i*3+1]<0)a[i*3+1]=2.6}g.attributes.position.needsUpdate=true})}
{const gt=ctex(128,128,(x,w,h)=>{x.fillStyle='#f2ece0';x.fillRect(0,0,w,h);x.fillStyle='rgba(60,90,140,.45)';for(let i=0;i<w;i+=16){x.fillRect(i,0,8,h);x.fillRect(0,i,w,8)}},[3,2]);const g=new T.PlaneGeometry(WW+.1,.5,24,6);const p=g.attributes.position;for(let i=0;i<p.count;i++)p.setZ(i,Math.sin(p.getX(i)*40)*.012);g.computeVertexNormals();
 add(g,M('#ffffff',{map:gt,roughness:.9,side:T.DoubleSide}),WX,WY0+.3,D-.06,{ry:Math.PI});add(new T.CylinderGeometry(.006,.006,WW+.16,8),MAT.brass,WX,WY0+.55,D-.06,{rz:Math.PI/2})}
/* ---------- iron bedsteads with patchwork quilts ---------- */
function bed(x,z,headH){const g=grp(x,0,z,Math.PI);// local +z = foot
  const Wd=.92,L=1.92;const frame=(zz,hgt,sp)=>{for(const e of [-1,1]){add(new T.CylinderGeometry(.018,.018,hgt,12),MAT.iron,e*Wd/2,hgt/2,zz,{to:g});add(new T.SphereGeometry(.03,16,12),MAT.brass,e*Wd/2,hgt+.02,zz,{to:g})}
    for(const y of [.32,hgt-.06])add(new T.CylinderGeometry(.012,.012,Wd,10),MAT.iron,0,y,zz,{to:g,rz:Math.PI/2});for(let i=1;i<sp;i++)add(new T.CylinderGeometry(.007,.007,hgt-.38,8),MAT.iron,-Wd/2+i*Wd/sp,(hgt+.26)/2,zz,{to:g});
    tube([[-Wd/2+.05,hgt-.06,zz],[-.15,hgt+.06,zz],[.15,hgt+.06,zz],[Wd/2-.05,hgt-.06,zz]],.009,MAT.iron,{to:g})};
  frame(0,headH,7);frame(L,.78,7);for(const e of [-1,1])add(BOX(.03,.03,L),MAT.iron,e*(Wd/2-.01),.32,L/2,{to:g});
  add(RB(Wd-.04,.17,L-.06,.05),MAT.linen,0,.42,L/2,{to:g});
  // the quilt: draped over, falling at the sides and the foot
  add(RB(Wd+.06,.045,1.45,.02),MAT.patch,0,.525,L/2+.2,{to:g});for(const e of [-1,1])add(RB(.025,.2,1.45,.01),MAT.patch,e*(Wd/2+.03),.44,L/2+.2,{to:g});
  add(RB(Wd-.02,.03,.24,.012),MAT.linen,0,.51,.42,{to:g});add(RB(.62,.12,.32,.055,4),MAT.linen,0,.55,.2,{to:g,rx:-.22});return g}
bed(-1.15,D-.04,1.15);bed(1.0,D-.04,1.0);
/* ---------- chest under the window: Nell's recipe tin, a chamberstick, her spectacles ---------- */
{const g=grp(WX,0,D-.24,0);const pine=MAT.pineF;add(RB(.72,.72,.42,.012),pine,0,.38,0,{to:g});add(RB(.76,.03,.46,.01),pine,0,.755,0,{to:g});add(RB(.72,.05,.42,.01),M('#8a6a44',{roughness:.6}),0,.025,0,{to:g});
 for(let k=0;k<3;k++){const y=.15+k*.2;add(RB(.66,.17,.012,.004),M('#c8a070',{map:TX.pine,roughness:.45}),0,y,-.215,{to:g});for(const e of [-1,1])add(new T.SphereGeometry(.016,10,8),M('#e8e2d4',{roughness:.3}),e*.18,y,-.228,{to:g})}
 // the tin
 const tn=grp(-.12,.77,-.03,.2,g);const tinM=M('#ffffff',{map:TX.tin,metalness:.35,roughness:.32});const sideM=M('#7a1a1a',{metalness:.4,roughness:.3});
 add(RB(.22,.1,.14,.008),sideM,0,.05,0,{to:tn});const front=add(new T.PlaneGeometry(.21,.09),tinM,0,.05,-.0705,{to:tn,cast:false});front.rotation.y=Math.PI;add(RB(.225,.022,.145,.006),M('#d8b060',{metalness:.7,roughness:.3}),0,.103,0,{to:tn});
 add(new T.PlaneGeometry(.2,.13),tinM,0,.1145,0,{to:tn,rx:-Math.PI/2,cast:false}).rotation.z=Math.PI;
 // chamberstick with a stub of candle
 const cs=grp(.2,.77,.02,0,g);add(lathe([[0,0],[.07,0],[.075,.012],[.07,.018],[.02,.02],[.016,.05],[.024,.055],[0,.055]],28),MAT.enamel,0,0,0,{to:cs});tube([[.06,.012,0],[.09,.03,0],[.085,.05,0]],.006,MAT.enamel,{to:cs});add(new T.CylinderGeometry(.011,.012,.07,12),M('#efe6cc',{roughness:.6}),0,.09,0,{to:cs});
 const fl=new T.Sprite(new T.SpriteMaterial({map:ctex(32,64,(x,w,h)=>{const gr=x.createRadialGradient(16,40,1,16,36,22);gr.addColorStop(0,'rgba(255,250,220,1)');gr.addColorStop(.35,'rgba(255,190,90,.9)');gr.addColorStop(1,'rgba(255,120,30,0)');x.fillStyle=gr;x.beginPath();x.ellipse(16,38,10,24,0,0,TAU);x.fill()}),blending:T.AdditiveBlending,depthWrite:false}));fl.scale.set(.02,.045,1);fl.position.set(0,.145,0);cs.add(fl);fl.visible=false;window.__flame=fl;
 // spectacles
 const sp=grp(.02,.772,-.14,.3,g);for(const e of [-1,1])add(new T.TorusGeometry(.02,.0022,6,24),MAT.iron,e*.026,.002,0,{to:sp,rx:Math.PI/2});add(new T.CylinderGeometry(.0018,.0018,.012,6),MAT.iron,0,.002,0,{to:sp,rz:Math.PI/2})}
/* ---------- washstand on the -x wall: marble top, jug and basin, towel, a small mirror ---------- */
{const g=grp(-hw+.25,0,2.05,-Math.PI/2);// faces +x
 add(RB(.82,.04,.44,.01),MAT.marble,0,.8,0,{to:g});add(RB(.82,.25,.03,.006),MAT.marble,0,.93,.21,{to:g});add(RB(.78,.62,.4,.01),MAT.pineF,0,.47,0,{to:g});
 for(const [lx,lz] of [[-.36,-.17],[.36,-.17],[-.36,.17],[.36,.17]])add(RB(.04,.16,.04,.008),MAT.pineF,lx,.08,lz,{to:g});for(const e of [-1,1]){add(RB(.34,.5,.012,.004),M('#c8a070',{map:TX.pine,roughness:.45}),e*.18,.47,-.205,{to:g});add(new T.SphereGeometry(.014,10,8),M('#e8e2d4',{roughness:.3}),e*.05,.5,-.215,{to:g})}
 const basin=add(lathe([[0,0],[.08,0],[.14,.04],[.19,.1],[.2,.105],[.185,.1],[.13,.05],[.07,.012],[0,.012]],40),MAT.stone,-.1,.82,0,{to:g});basin.material.side=T.DoubleSide;
 add(lathe([[0,0],[.06,0],[.075,.04],[.085,.12],[.07,.2],[.055,.25],[.06,.27],[.072,.285],[0,.285]],36),MAT.stone,.24,.82,.04,{to:g}).rotation.y=-.8;tube([[.24+.05,1.06,.07],[.24+.1,1.03,.12],[.24+.1,.92,.12],[.24+.06,.9,.08]],.01,MAT.stone,{to:g});
 add(new T.CylinderGeometry(.15,.15,.002,32),new T.MeshPhysicalMaterial({color:'#8aa0b0',roughness:.03,transparent:true,opacity:.4,depthWrite:false}),-.1,.9,0,{to:g,cast:false});
 // towel rail and towel
 for(const e of [-1,1])add(new T.CylinderGeometry(.008,.008,.12,8),MAT.pineF,e*.4,.75,-.26,{to:g,rx:Math.PI/2*0});add(new T.CylinderGeometry(.01,.01,.86,10),MAT.pineF,0,.72,-.26,{to:g,rz:Math.PI/2});
 const tw=new T.PlaneGeometry(.36,.5,8,14);const p=tw.attributes.position;for(let i=0;i<p.count;i++)p.setZ(i,Math.sin(p.getX(i)*18)*.01);tw.computeVertexNormals();add(tw,M('#ffffff',{map:TX.towel,roughness:.95,side:T.DoubleSide}),.12,.5,-.27,{to:g,cast:false});
 // mirror above
 add(RB(.36,.46,.03,.01),MAT.pineF,0,1.45,.2,{to:g});add(new T.PlaneGeometry(.3,.4),M('#c8ccd0',{metalness:1,roughness:.05}),0,1.45,.184,{to:g,ry:Math.PI,cast:false})}
/* ---------- the chair at the foot of the right bed: Tomas's cap and gauntlets ---------- */
const CX=.85,CZ=1.8;
{const g=grp(CX,0,CZ,.5);const legM=M('#6a4a2a',{map:TX.pine,roughness:.5});legM.color.set('#8a6a4a');for(const [lx,lz] of [[-.19,-.18],[.19,-.18],[-.19,.18],[.19,.18]])add(new T.CylinderGeometry(.018,.016,.44,10),legM,lx,.22,lz,{to:g});
 for(const z of [-.18,.18])add(new T.CylinderGeometry(.009,.009,.38,8),legM,0,.12,z,{to:g,rz:Math.PI/2});
 // rush seat: twisted rings
 add(RB(.44,.05,.42,.02),M('#a88a50',{map:ctex(128,128,(x,w,h)=>{x.fillStyle='#a88a50';x.fillRect(0,0,w,h);x.strokeStyle='rgba(60,40,10,.4)';x.lineWidth=2;for(let i=0;i<w;i+=6){x.beginPath();x.moveTo(i,0);x.lineTo(w/2,h/2);x.stroke();x.beginPath();x.moveTo(0,i);x.lineTo(w/2,h/2);x.stroke()}}),roughness:.85}),0,.465,0,{to:g});
 for(const e of [-1,1])add(new T.CylinderGeometry(.018,.016,.5,10),legM,e*.19,.72,.19,{to:g});for(const y of [.72,.84,.95])add(RB(.38,.05,.02,.008),legM,0,y,.19,{to:g});
 // chauffeur's cap: grey crown, black band, glossy peak
 const cp=grp(.08,.49,.04,-.6,g);add(lathe([[0,0],[.1,0],[.105,.04],[.13,.07],[.13,.08],[.06,.085],[0,.085]],40),M('#5a5e64',{map:TX.wool,roughness:.85}),0,0,0,{to:cp});add(new T.CylinderGeometry(.102,.102,.035,40,1,true),M('#141414',{roughness:.5}),0,.018,0,{to:cp});
 {const sh=new T.Shape();sh.absarc(0,0,.1,Math.PI*.15,Math.PI*.85,false);sh.absarc(0,.03,.07,Math.PI*.85,Math.PI*.15,true);const pk=new T.ExtrudeGeometry(sh,{depth:.004,bevelEnabled:false,curveSegments:24});const m=add(pk,M('#0c0c0c',{roughness:.12}),0,.004,.0,{to:cp,rx:Math.PI/2-.25});m.position.z=-.01}
 add(new T.CylinderGeometry(.003,.003,.16,6),MAT.brass,0,.036,-.1,{to:cp,rz:Math.PI/2});
 // driving gauntlets, one on the other
 // driving gauntlets lying flat: a cut-leather hand outline with stitched fingers and a flared cuff
 const gloveShape=()=>{const sh=new T.Shape();sh.moveTo(-.04,0);sh.lineTo(-.042,.05);
   const fing=[[-.034,.05,.06],[-.012,.055,.075],[.01,.055,.072],[.031,.05,.058]];sh.lineTo(-.045,.05);
   for(const [fx,fy,len] of fing){sh.lineTo(fx-.0095,fy);sh.lineTo(fx-.0095,fy+len-.009);sh.quadraticCurveTo(fx,fy+len+.004,fx+.0095,fy+len-.009);sh.lineTo(fx+.0095,fy)}
   sh.lineTo(.043,.045);sh.quadraticCurveTo(.075,.06,.088,.085);sh.quadraticCurveTo(.095,.1,.08,.104);sh.quadraticCurveTo(.06,.08,.04,.028);sh.lineTo(.04,0);sh.lineTo(-.04,0);return sh};
 const cuffShape=()=>{const sh=new T.Shape();sh.moveTo(-.04,0);sh.lineTo(.04,0);sh.lineTo(.07,-.085);sh.quadraticCurveTo(0,-.1,-.07,-.085);sh.lineTo(-.04,0);return sh};
 const glove=(gx,gz,ry,flip,y)=>{const gl=grp(gx,.492+y,gz,ry,g);const lm=M('#7a5030',{map:TX.leather,roughness:.6});const cm=M('#5a3a20',{map:TX.leather,roughness:.6});
   const ex=(sh,d,b)=>new T.ExtrudeGeometry(sh,{depth:d,bevelEnabled:true,bevelThickness:b,bevelSize:b,bevelSegments:3,curveSegments:10});
   const hand=add(ex(gloveShape(),.008,.006),lm,0,0,0,{to:gl,rx:-Math.PI/2});hand.scale.x=flip;const cuff=add(ex(cuffShape(),.004,.004),cm,0,.002,0,{to:gl,rx:-Math.PI/2});
   for(const [fx] of [[-.023],[-.001],[.021]])add(BOX(.0012,.001,.05),M('#3a2414'),fx*flip,.016,-.08,{to:gl,cast:false});add(new T.TorusGeometry(.012,.0025,6,14),MAT.brass,0,.012,.06,{to:gl,rx:Math.PI/2});return gl};
 glove(-.05,-.02,.5,1,0);glove(-.1,-.07,-.2,-1,.016)}
/* ---------- hooks on the -x wall by the door: Nell's apron, Tomas's grey uniform jacket ---------- */
{const g=grp(-hw+.03,0,.9,Math.PI/2);add(RB(.9,.07,.025,.008),MAT.paintG,0,1.62,0,{to:g});for(const e of [-.3,.0,.3]){add(new T.CylinderGeometry(.008,.008,.06,8),MAT.brass,e,1.62,.04,{to:g,rx:Math.PI/2});add(new T.SphereGeometry(.014,8,6),MAT.brass,e,1.62,.07,{to:g})}
 const ap=new T.PlaneGeometry(.42,.82,10,20);{const p=ap.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i);p.setX(i,p.getX(i)*(y>.25?.55:1));p.setZ(i,.05+Math.sin(p.getX(i)*22)*.012)}ap.computeVertexNormals()}add(ap,M('#f0ece2',{map:TX.linen,roughness:.9,side:T.DoubleSide}),-.3,1.22,.0,{to:g,cast:false});
 tube([[-.38,1.62,.06],[-.3,1.66,.08],[-.22,1.62,.06]],.006,M('#f0ece2'),{to:g});
 const jk=lathe([[0,0],[.22,0],[.215,.3],[.2,.5],[.23,.62],[.12,.7],[0,.72]],28);const j=add(jk,M('#4a4e56',{map:TX.wool,roughness:.85}),.25,.9,.06,{to:g});j.scale.set(1,1,.38);
 for(let i=0;i<4;i++)add(new T.SphereGeometry(.01,10,8),MAT.brass,.25,1.05+i*.1,.145,{to:g,cast:false})}
/* ---------- under the beds: boots, a carpet bag, a chamber pot ---------- */
const soleShape=(fl,fw)=>{const s=new T.Shape(),h=fw/2;s.moveTo(0,-.02);s.bezierCurveTo(h*.95,-.02,h*.95,.06,h*.8,.1);s.bezierCurveTo(h*.7,fl*.45,h*1.05,fl*.62,h,fl*.8);s.bezierCurveTo(h*.95,fl+.0,-h*.95,fl+.0,-h,fl*.8);s.bezierCurveTo(-h*1.05,fl*.62,-h*.7,fl*.45,-h*.8,.1);s.bezierCurveTo(-h*.95,.06,-h*.95,-.02,0,-.02);return s};
const boot=(x,z,ry,col,tall)=>{const g=grp(x,0,z,ry);const mat=M(col,{roughness:.3});const sole=M('#100d0b',{roughness:.65});const P=tall?{sh:.36,fl:.28,fw:.09,heel:.03,r:.056}:{sh:.13,fl:.25,fw:.085,heel:.03,r:.05};
  const sg=new T.ExtrudeGeometry(soleShape(P.fl,P.fw),{depth:.014,bevelEnabled:true,bevelThickness:.003,bevelSize:.003,bevelSegments:2,curveSegments:16});sg.rotateX(Math.PI/2);add(sg,sole,0,P.heel+.014,-.05,{to:g});
  add(RB(P.fw*.8,P.heel,.07,.006),sole,0,P.heel/2,-.02,{to:g});
  const v=add(new T.SphereGeometry(1,32,20,0,TAU,0,Math.PI/2),mat,0,P.heel+.014,P.fl*.48-.05,{to:g});v.scale.set(P.fw*.48,.062,P.fl*.44);
  const prof=[[0,0],[P.r,0],[P.r*.92,P.sh*.25],[P.r*.98,P.sh*.7],[P.r*1.1,P.sh],[P.r*1.02,P.sh],[P.r*.88,P.sh*.95],[0,P.sh*.95]];const shf=add(lathe(prof,28),mat,0,P.heel+.018,0,{to:g});shf.scale.z=.82;
  add(new T.CircleGeometry(P.r*.9,24),M('#0a0806'),0,P.heel+.018+P.sh*.95+.001,0,{to:g,rx:-Math.PI/2,cast:false}).scale.y=.82;
  if(!tall)for(let k=0;k<5;k++)add(BOX(.045,.003,.004),M('#2a2420'),0,P.heel+.06+k*.02,.048-k*.003,{to:g,rx:-.5,cast:false});else add(RB(.03,.02,.012,.004),MAT.brass,P.r*.9,P.heel+.06,0,{to:g});return g};
for(const e of [-1,1])boot(-.62+e*.08,D-1.15,Math.PI/2+.1*e,'#151210',false);for(const e of [-1,1])boot(.5+e*.08,D-1.2,-Math.PI/2-.05*e,'#0e0c0a',true);
{const g=grp(-.8,0,D-.9,.4);add(RB(.42,.26,.2,.06),M('#6a2a24',{map:TX.patch,roughness:.85}),0,.14,0,{to:g});tube([[-.12,.27,0],[0,.36,0],[.12,.27,0]],.008,M('#3a2414',{roughness:.5}),{to:g});add(RB(.44,.02,.21,.006),MAT.brass,0,.27,0,{to:g})}
add(lathe([[0,0],[.1,0],[.12,.04],[.13,.13],[.15,.15],[.14,.16],[.12,.14],[0,.14]],32),MAT.enamel,1.25,0,D-1.7,{});
/* ---------- braided rag rug between the beds; a bare bulb in an enamel shade ---------- */
add(new T.CircleGeometry(1,64),M('#ffffff',{map:TX.rag,roughness:.95}),-.05,.004,2.4,{rx:-Math.PI/2,cast:false}).scale.set(.95,.7,1);
{const g=grp(-.2,HH,2.3);tube([[0,0,0],[.01,-.2,0],[0,-.45,0]],.004,M('#1a1a1a'),{to:g});add(lathe([[0,0],[.025,0],[.03,.02],[.17,.12],[.18,.13]],36),M('#f0ece2',{roughness:.3,side:T.DoubleSide}),0,-.6,0,{to:g,cast:false}).rotation.x=Math.PI;
 add(new T.SphereGeometry(.035,16,12),M('#fff6e0',{emissive:'#ffe0a0',emissiveIntensity:2.2}),0,-.62,0,{to:g,cast:false});window.__bulb=g.children[g.children.length-1]}
/* ---------- lights ---------- */
const hemi=new T.HemisphereLight('#5a6488','#3a2a1a',.5);scene.add(hemi);
const bulb=new T.PointLight('#ffe0b0',1.5,8,1.6);bulb.position.set(-.2,HH-.68,2.3);bulb.castShadow=true;bulb.shadow.mapSize.set(1024,1024);bulb.shadow.bias=-.002;bulb.shadow.radius=4;scene.add(bulb);
const fill=new T.PointLight('#ffd8b0',.35,6,1.5);fill.position.set(.3,1.0,.6);scene.add(fill);
const candle=new T.PointLight('#ffb060',0,2.4,2);candle.position.set(WX+.2,.98,D-.22);scene.add(candle);
const moonL=new T.SpotLight('#8aa6ff',1.4,9,.5,.8,1.2);moonL.position.set(WX,2.1,D+1.5);moonL.target.position.set(WX,0,D-2.4);moonL.castShadow=true;moonL.shadow.mapSize.set(1024,1024);moonL.shadow.bias=-.0008;scene.add(moonL,moonL.target);
return {exposure:1.38,
 views:{
  wide:{p:[.25,.34,.4],t:[-.15,.9,4.2],fov:72,where:'Room 3 · from the floor',text:'Room 3, under the eaves: Nell and Tomas. Two iron beds, a washstand, a chest under the window. Boots lined up under the beds.'},
  chest:{p:[-.05,1.3,3.3],t:[-.12,.8,4.2],fov:54,where:'Room 3 · close look',text:'The chest under the window. A painted tin, a chamberstick with a stub of candle, a pair of spectacles.'},
  tin:{p:[-.32,1.05,3.82],t:[-.22,.8,4.18],fov:42,where:'Room 3 · close look',text:'Nell\'s recipe tin, red with painted flowers, RECIPES in gold. The lid sits square.'},
  chair:{p:[.3,.95,.95],t:[.88,.45,1.85],fov:54,where:'Room 3 · close look',text:'A rush-seated chair. A chauffeur\'s cap on it, and a pair of leather driving gauntlets.'},
  gloves:{p:[.62,.82,1.42],t:[.8,.49,1.78],fov:42,where:'Room 3 · close look',text:'Tomas\'s gauntlets, tan leather, worn soft at the fingers. Dry.'},
  wash:{p:[-.6,1.35,1.4],t:[-1.6,.9,2.05],fov:56,where:'Room 3 · close look',text:'The washstand. Jug and basin, an inch of water standing in the bowl, a towel on the rail.'},
  hooks:{p:[-.5,1.3,1.6],t:[-1.75,1.2,.9],fov:56,where:'Room 3 · close look',text:'Two hooks by the door. A white apron, a grey uniform jacket with brass buttons.'},
  under:{p:[.05,.24,2.35],t:[-.62,.12,3.3],fov:60,where:'Room 3 · close look',text:'Under the beds: two pairs of boots, a carpet bag, a chamber pot. The boots are dry.'},
  dark:{p:[.25,.34,.4],t:[-.15,.9,4.2],fov:72,where:'Room 3 · power out',text:'The bulb dies. Someone has lit the candle on the chest.',dark:true}},
 update(t,dt,on,dk){bulb.intensity=1.5*on;fill.intensity=.35*on;if(window.__bulb)window.__bulb.material.emissiveIntensity=2.2*on;hemi.intensity=.5-.26*dk;moonL.intensity=1.4+1.8*dk;
   candle.intensity=dk*.9*(.9+.1*Math.sin(t*11));if(window.__flame){window.__flame.visible=dk>.3;window.__flame.scale.y=.045*(.92+.08*Math.sin(t*9))}}};
});
