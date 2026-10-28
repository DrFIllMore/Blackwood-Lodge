// ROOM {"title": "Blackwood Study Proof", "aria": "The study, rendered in 3D", "loading": "Lighting the study…", "where": "Study · power on", "text": "The study. Edmund lies face down on the rug, one arm reaching out. The desk chair is pushed back. A small clock lies on the floor.", "buttons": [["wide", "The room"], ["clock", "The clock"], ["door", "The door frame"], ["shelves", "Bookcase"], ["desk", "The desk"], ["rug", "The rug"], ["window", "The window"], ["dark", "Power out"]]}
ROOM(7,_H=>{const {renderer,scene,camera,ANIM}=_H;
const T=THREE,TAU=Math.PI*2;let seed=7;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
/* ---------- procedural textures ---------- */
function ctex(w,h,draw,rep){const cv=document.createElement('canvas');cv.width=w;cv.height=h;const x=cv.getContext('2d');draw(x,w,h);const t=new T.CanvasTexture(cv);t.encoding=T.sRGBEncoding;t.anisotropy=8;if(rep){t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(rep[0],rep[1])}return t}
function noise(x,w,h,a,n=4000){for(let i=0;i<n;i++){x.fillStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:255},${rnd()<.5?0:255},${a*rnd()})`;x.fillRect(rnd()*w,rnd()*h,1+rnd()*2,1+rnd()*2)}}
const TX={
 wallpaper:ctex(512,512,(x,w,h)=>{x.fillStyle='#3a2547';x.fillRect(0,0,w,h);for(let i=0;i<8;i++){x.fillStyle=i%2?'rgba(255,255,255,.025)':'rgba(0,0,0,.05)';x.fillRect(i*w/8,0,w/8,h)}
   const motif=(cx,cy,s)=>{x.save();x.translate(cx,cy);x.scale(s,s);x.strokeStyle='rgba(214,170,96,.32)';x.fillStyle='rgba(214,170,96,.14)';x.lineWidth=2.2;
     x.beginPath();x.moveTo(0,-60);x.bezierCurveTo(30,-40,40,-10,0,20);x.bezierCurveTo(-40,-10,-30,-40,0,-60);x.fill();x.stroke();
     x.beginPath();x.moveTo(0,20);x.bezierCurveTo(50,30,55,70,0,80);x.bezierCurveTo(-55,70,-50,30,0,20);x.stroke();
     for(const s2 of [-1,1]){x.beginPath();x.moveTo(0,0);x.bezierCurveTo(s2*40,-20,s2*70,10,s2*55,45);x.stroke();x.beginPath();x.arc(s2*55,45,6,0,TAU);x.fill()}x.restore()};
   motif(w/4,h/4,1);motif(3*w/4,3*h/4,1);motif(3*w/4,-h/4,1);motif(w/4,5*h/4,1);motif(-w/4,3*h/4,1);motif(5*w/4,h/4,1);noise(x,w,h,.05)},[5,3]),
 wood:ctex(512,512,(x,w,h)=>{x.fillStyle='#4a2c19';x.fillRect(0,0,w,h);for(let i=0;i<120;i++){const y=rnd()*h;x.strokeStyle=`rgba(${rnd()<.5?20:120},${rnd()<.5?10:70},${rnd()<.5?5:30},${.08+rnd()*.18})`;x.lineWidth=.6+rnd()*2.4;x.beginPath();x.moveTo(0,y);for(let k=1;k<=8;k++)x.lineTo(k*w/8,y+Math.sin(k*1.3+y)*3*rnd());x.stroke()}
   for(let i=0;i<6;i++){const cx=rnd()*w,cy=rnd()*h;x.strokeStyle='rgba(20,10,4,.25)';for(let r=3;r<18;r+=3){x.beginPath();x.ellipse(cx,cy,r*2.5,r,0,0,TAU);x.stroke()}}noise(x,w,h,.04)}),
 floor:ctex(1024,1024,(x,w,h)=>{const n=8,pw=w/n;for(let i=0;i<n;i++){let y=-rnd()*400;while(y<h){const L=260+rnd()*380,t=rnd();x.fillStyle=`rgb(${92+t*30|0},${58+t*20|0},${34+t*12|0})`;x.fillRect(i*pw,y,pw,L);
     for(let g=0;g<14;g++){x.strokeStyle=`rgba(30,16,6,${.08+rnd()*.14})`;x.lineWidth=.8+rnd()*1.6;const gx=i*pw+rnd()*pw;x.beginPath();x.moveTo(gx,y);x.bezierCurveTo(gx+rnd()*6-3,y+L*.3,gx+rnd()*8-4,y+L*.7,gx+rnd()*4-2,y+L);x.stroke()}
     x.fillStyle='rgba(10,5,2,.7)';x.fillRect(i*pw,y,pw,2.5);y+=L}x.fillStyle='rgba(10,5,2,.75)';x.fillRect(i*pw,0,2.5,h)}noise(x,w,h,.05,9000)},[2.2,2.4]),
 rug:ctex(1024,768,(x,w,h)=>{x.fillStyle='#5e1418';x.fillRect(0,0,w,h);const B=70;x.fillStyle='#1a2238';x.fillRect(0,0,w,B);x.fillRect(0,h-B,w,B);x.fillRect(0,0,B,h);x.fillRect(w-B,0,B,h);
   x.strokeStyle='#c99a4a';x.lineWidth=5;x.strokeRect(B-8,B-8,w-2*B+16,h-2*B+16);x.strokeRect(14,14,w-28,h-28);
   for(let i=0;i<w;i+=34){x.fillStyle='#b8873e';x.save();x.translate(i+17,B/2);x.rotate(Math.PI/4);x.fillRect(-9,-9,18,18);x.restore();x.save();x.translate(i+17,h-B/2);x.rotate(Math.PI/4);x.fillRect(-9,-9,18,18);x.restore()}
   for(let i=0;i<h;i+=34){x.save();x.translate(B/2,i+17);x.rotate(Math.PI/4);x.fillStyle='#b8873e';x.fillRect(-9,-9,18,18);x.restore();x.save();x.translate(w-B/2,i+17);x.rotate(Math.PI/4);x.fillRect(-9,-9,18,18);x.restore()}
   x.save();x.translate(w/2,h/2);for(let r=0;r<5;r++){x.fillStyle=['#1a2238','#c99a4a','#7a1c20','#e2c58a','#1a2238'][r];x.beginPath();const R=170-r*30;for(let k=0;k<16;k++){const a=k/16*TAU,rr=k%2?R*.78:R;x.lineTo(Math.cos(a)*rr*1.4,Math.sin(a)*rr)}x.closePath();x.fill()}x.restore();
   for(const [cx,cy] of [[B+60,B+60],[w-B-60,B+60],[B+60,h-B-60],[w-B-60,h-B-60]]){x.fillStyle='#1a2238';x.beginPath();x.arc(cx,cy,40,0,TAU);x.fill();x.fillStyle='#c99a4a';x.beginPath();x.arc(cx,cy,18,0,TAU);x.fill()}
   x.strokeStyle='rgba(201,154,74,.35)';x.lineWidth=2;for(let i=0;i<60;i++){const px=B+20+rnd()*(w-2*B-40),py=B+20+rnd()*(h-2*B-40);x.beginPath();x.moveTo(px-8,py);x.lineTo(px,py-8);x.lineTo(px+8,py);x.lineTo(px,py+8);x.closePath();x.stroke()}
   noise(x,w,h,.08,20000)}),
 leather:ctex(512,256,(x,w,h)=>{x.fillStyle='#1f3b2c';x.fillRect(0,0,w,h);noise(x,w,h,.06,6000);x.strokeStyle='rgba(201,154,74,.7)';x.lineWidth=3;x.strokeRect(14,14,w-28,h-28);x.lineWidth=1;x.strokeRect(22,22,w-44,h-44)}),
 plaster:ctex(256,256,(x,w,h)=>{x.fillStyle='#2a2230';x.fillRect(0,0,w,h);noise(x,w,h,.05,5000)},[4,4]),
 portrait:ctex(256,320,(x,w,h)=>{const g=x.createRadialGradient(w*.5,h*.35,10,w*.5,h*.4,w*.8);g.addColorStop(0,'#3b3328');g.addColorStop(1,'#0e0c0a');x.fillStyle=g;x.fillRect(0,0,w,h);
   x.fillStyle='#14110e';x.beginPath();x.ellipse(w*.5,h*1.0,w*.42,h*.42,0,0,TAU);x.fill();x.fillStyle='#e8e0d0';x.beginPath();x.moveTo(w*.42,h*.62);x.lineTo(w*.5,h*.74);x.lineTo(w*.58,h*.62);x.fill();
   const fg=x.createRadialGradient(w*.46,h*.38,4,w*.5,h*.42,w*.2);fg.addColorStop(0,'#d9b896');fg.addColorStop(1,'#7a5a42');x.fillStyle=fg;x.beginPath();x.ellipse(w*.5,h*.42,w*.15,h*.15,0,0,TAU);x.fill();
   x.fillStyle='#b8b0a4';x.beginPath();x.ellipse(w*.5,h*.31,w*.16,h*.06,0,Math.PI,0);x.fill();x.fillStyle='#2a2018';x.fillRect(w*.42,h*.4,w*.05,h*.012);x.fillRect(w*.53,h*.4,w*.05,h*.012);x.fillStyle='#8a8070';x.fillRect(w*.43,h*.49,w*.14,h*.02);noise(x,w,h,.06,3000)}),
 dial:ctex(256,256,(x,w,h)=>{x.fillStyle='#efe6cf';x.fillRect(0,0,w,h);x.translate(w/2,h/2);x.fillStyle='#1a1410';x.font='bold 26px Georgia';x.textAlign='center';x.textBaseline='middle';
   for(let i=1;i<=12;i++){const a=i/12*TAU;x.fillText(['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][i-1],Math.sin(a)*92,-Math.cos(a)*92)}
   x.strokeStyle='#1a1410';x.lineCap='round';const hr=(9+40/60)/12*TAU,mn=40/60*TAU;x.lineWidth=7;x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(hr)*52,-Math.cos(hr)*52);x.stroke();x.lineWidth=4;x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(mn)*80,-Math.cos(mn)*80);x.stroke();
   x.strokeStyle='rgba(255,255,255,.85)';x.lineWidth=1.5;x.beginPath();x.moveTo(-60,-80);x.lineTo(5,8);x.lineTo(-20,90);x.moveTo(5,8);x.lineTo(80,-10);x.moveTo(5,8);x.lineTo(40,70);x.stroke()}),
 smear:ctex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);const fingers=[[70,30,0],[104,26,.06],[138,30,.1],[170,40,.04]];
   for(const [sx,sy,sk] of fingers){const len=110+rnd()*70;for(let s2=0;s2<26;s2++){const t=s2/25,y=sy+t*len,wd=(13-t*9)*(1+Math.sin(t*9+sx)*.15),a=(.55-t*.4);x.fillStyle=`rgba(58,6,10,${a})`;x.beginPath();x.ellipse(sx+t*len*sk+Math.sin(t*6)*2,y,wd/2,6,0,0,TAU);x.fill()}
     if(rnd()<.7){x.fillStyle='rgba(58,6,10,.45)';x.fillRect(sx+len*sk-1.5,sy+len,3,20+rnd()*30);x.beginPath();x.arc(sx+len*sk,sy+len+40,3,0,TAU);x.fill()}}
   x.globalCompositeOperation='destination-out';for(let i=0;i<400;i++){x.fillStyle=`rgba(0,0,0,${rnd()*.5})`;x.fillRect(rnd()*w,rnd()*h,1+rnd()*3,1+rnd()*3)}}),
 blood:ctex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);x.translate(w/2,h/2);x.fillStyle='rgba(64,6,10,.92)';x.beginPath();for(let i=0;i<=40;i++){const a=i/40*TAU,r=80+Math.sin(a*3)*14+Math.sin(a*7)*8+rnd()*6;x.lineTo(Math.cos(a)*r,Math.sin(a)*r*.8)}x.fill();x.fillStyle='rgba(120,20,26,.35)';x.beginPath();x.ellipse(-12,-10,40,26,0,0,TAU);x.fill()}),
 night:ctex(256,320,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0a1430');g.addColorStop(.7,'#1b2c55');g.addColorStop(1,'#33467a');x.fillStyle=g;x.fillRect(0,0,w,h);
   x.fillStyle='#f2f4ff';x.beginPath();x.arc(w*.7,h*.2,18,0,TAU);x.fill();const mg=x.createRadialGradient(w*.7,h*.2,16,w*.7,h*.2,90);mg.addColorStop(0,'rgba(200,215,255,.35)');mg.addColorStop(1,'rgba(200,215,255,0)');x.fillStyle=mg;x.fillRect(0,0,w,h);
   x.fillStyle='#050812';for(let i=0;i<7;i++){const tx=i/6*w,th=h*(.28+rnd()*.18),tw=w*.17;for(let k=0;k<4;k++){const yy=h-k*th*.2;x.beginPath();x.moveTo(tx-tw*(1-k*.2),yy);x.lineTo(tx,yy-th*.45);x.lineTo(tx+tw*(1-k*.2),yy);x.fill()}}
   x.fillStyle='rgba(235,240,255,.85)';for(let i=0;i<70;i++){x.beginPath();x.arc(rnd()*w,rnd()*h,.8+rnd()*1.6,0,TAU);x.fill()}const sg=x.createLinearGradient(0,h*.8,0,h);sg.addColorStop(0,'rgba(220,230,255,0)');sg.addColorStop(1,'rgba(220,230,255,.55)');x.fillStyle=sg;x.fillRect(0,h*.8,w,h*.2)}),
 moonpatch:ctex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);const panes=[[.08,.08,.4,.38],[.52,.08,.4,.38],[.08,.54,.4,.38],[.52,.54,.4,.38]];for(const [px,py,pw,ph] of panes){const g=x.createLinearGradient(0,py*h,0,(py+ph)*h);g.addColorStop(0,'rgba(170,195,255,.9)');g.addColorStop(1,'rgba(170,195,255,.5)');x.fillStyle=g;x.fillRect(px*w,py*h,pw*w,ph*h)}
   x.globalCompositeOperation='destination-in';const r=x.createRadialGradient(w/2,h/2,w*.2,w/2,h/2,w*.6);r.addColorStop(0,'rgba(0,0,0,1)');r.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=r;x.fillRect(0,0,w,h)}),
 globe:ctex(512,256,(x,w,h)=>{x.fillStyle='#c7b48a';x.fillRect(0,0,w,h);x.fillStyle='#7a6a44';for(let i=0;i<9;i++){x.beginPath();const cx=rnd()*w,cy=h*.2+rnd()*h*.6;for(let k=0;k<12;k++){const a=k/12*TAU,r=20+rnd()*40;x.lineTo(cx+Math.cos(a)*r*1.4,cy+Math.sin(a)*r)}x.fill()}x.strokeStyle='rgba(60,40,20,.35)';for(let i=1;i<8;i++){x.beginPath();x.moveTo(0,i*h/8);x.lineTo(w,i*h/8);x.stroke();x.beginPath();x.moveTo(i*w/8,0);x.lineTo(i*w/8,h);x.stroke()}noise(x,w,h,.08,3000)}),
 paper:ctex(256,320,(x,w,h)=>{x.fillStyle='#ece4d2';x.fillRect(0,0,w,h);x.strokeStyle='rgba(40,40,60,.45)';x.lineWidth=1.4;for(let i=0;i<14;i++){const y=40+i*18;x.beginPath();x.moveTo(24,y);for(let k=0;k<12;k++)x.lineTo(24+k*17,y+(rnd()-.5)*3);x.stroke()}}),
 photo:ctex(256,192,(x,w,h)=>{x.fillStyle='#d8cfbd';x.fillRect(0,0,w,h);const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#8a8070');g.addColorStop(1,'#3a342a');x.fillStyle=g;x.fillRect(12,12,w-24,h-24);x.fillStyle='#2a241c';x.beginPath();x.moveTo(40,h-30);x.lineTo(w/2,50);x.lineTo(w-40,h-30);x.fill();x.fillStyle='#e8d8a8';x.fillRect(w/2-10,h-60,20,20);x.fillStyle='#4a4234';x.font='12px Georgia';x.fillText('Blackwood, 1911',22,h-16)})};
const M=(c,o={})=>new T.MeshStandardMaterial({color:c,roughness:.7,metalness:0,...o});
const MAT={wall:M('#ffffff',{map:TX.wallpaper,roughness:.9}),wood:M('#ffffff',{map:TX.wood,roughness:.55}),woodDark:M('#7a6a62',{map:TX.wood,roughness:.5}),floor:M('#ffffff',{map:TX.floor,roughness:.42}),
  rug:M('#ffffff',{map:TX.rug,roughness:.95}),brass:M('#c9a24a',{metalness:.85,roughness:.32}),leather:M('#ffffff',{map:TX.leather,roughness:.6}),ceil:M('#ffffff',{map:TX.plaster,roughness:1}),
  velvet:M('#2c0a14',{roughness:.8}),sheet:M('#cfc8bc',{roughness:.95,side:T.DoubleSide}),skin:M('#d9b496',{roughness:.6}),cuff:M('#f1ede6',{roughness:.8}),shoe:M('#0e0b09',{roughness:.35}),
  glass:new T.MeshPhysicalMaterial({color:'#dfe9f2',roughness:.05,metalness:0,transparent:true,opacity:.14,clearcoat:1}),whisky:M('#a85a14',{roughness:.15,transparent:true,opacity:.85}),
  shade:M('#2f7a4c',{roughness:.25,emissive:'#1c5a34',emissiveIntensity:.4,transparent:true,opacity:.92}),bulb:M('#fff3d0',{emissive:'#ffd590',emissiveIntensity:3}),
  sconceShade:M('#f2e2c0',{emissive:'#ffcc80',emissiveIntensity:1.6,roughness:.6}),night:new T.MeshBasicMaterial({map:TX.night}),frameW:M('#d9d2c2',{roughness:.6}),gilt:M('#b8913c',{metalness:.7,roughness:.38})};
const add=(geo,mat,x,y,z,o={})=>{const m=new T.Mesh(geo,mat);m.position.set(x,y,z);if(o.ry)m.rotation.y=o.ry;if(o.rx)m.rotation.x=o.rx;if(o.rz)m.rotation.z=o.rz;m.castShadow=o.cast!==false;m.receiveShadow=true;(o.to||scene).add(m);return m};
const RB=(w,h,d,r=.02,s=3)=>new T.RoundedBoxGeometry(w,h,d,s,Math.min(r,w/2-.001,h/2-.001,d/2-.001));
const BOX=(w,h,d)=>new T.BoxGeometry(w,h,d);
const W=5,D=5.5,H=3.1,hw=W/2;
/* ---------- shell ---------- */
const plane=(w,h,mat,x,y,z,ry=0,rx=0)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),mat);m.position.set(x,y,z);m.rotation.set(rx,ry,0);m.receiveShadow=true;scene.add(m);return m};
plane(W,D,MAT.floor,0,0,D/2,0,-Math.PI/2);plane(W,D,MAT.ceil,0,H,D/2,0,Math.PI/2);
plane(D,H,MAT.wall,-hw,H/2,D/2,Math.PI/2);plane(D,H,MAT.wall,hw,H/2,D/2,-Math.PI/2);plane(W,H,MAT.wall,0,H/2,0,0);
// wainscot, rails, skirting, cornice on three walls
const DX=1.8,DW=.88,DH=2.12,DCas=.17;const dL=DX-DW/2-DCas+hw,dR=hw-(DX+DW/2+DCas);
const runs=[{len:W,x:0,z:D-.02,ry:0,axis:'x',top:1},{len:dL,x:-hw+dL/2,z:D-.02,ry:0,axis:'x',low:1},{len:dR,x:hw-dR/2,z:D-.02,ry:0,axis:'x',low:1},{len:D,x:-hw+.02,z:D/2,ry:Math.PI/2,axis:'z'},{len:D,x:hw-.02,z:D/2,ry:Math.PI/2,axis:'z'}];
for(const r of runs){const g=(w,h,d,y,mat)=>add(r.axis==='x'?BOX(w,h,d):BOX(d,h,w),mat,r.x,y,r.z,{cast:false});
  if(r.top){g(r.len,.1,.12,H-.05,MAT.wood);continue}g(r.len,.9,.03,.45,MAT.woodDark);g(r.len,.05,.07,.93,MAT.wood);g(r.len,.12,.05,.06,MAT.wood);if(!r.low)g(r.len,.1,.12,H-.05,MAT.wood);if(r.axis!=='x')g(r.len,.03,.04,2.25,MAT.wood);
  const n=Math.floor(r.len/.7);for(let i=0;i<n;i++){const u=-r.len/2+.35+i*r.len/n+(r.len/n-.6)/2;const m=r.axis==='x'?add(RB(.52,.56,.02,.01),MAT.wood,r.x+u+.24,.48,r.z-.02,{cast:false}):add(RB(.02,.56,.52,.01),MAT.wood,r.x+(r.x<0?.02:-.02),.48,r.z+u+.24,{cast:false})}}
/* ---------- window, curtains, moonlight ---------- */
const WX=-.1,WY0=1.0,WY1=2.82,WW=1.4;
{const sh=new T.Shape();sh.moveTo(-W/2,-H/2);sh.lineTo(W/2,-H/2);sh.lineTo(W/2,H/2);sh.lineTo(-W/2,H/2);sh.lineTo(-W/2,-H/2);
 const hx0=-(WX+WW/2),hx1=-(WX-WW/2),hy0=WY0-H/2,hy1=WY1-H/2;const hole=new T.Path();hole.moveTo(hx0,hy0);hole.lineTo(hx0,hy1);hole.lineTo(hx1,hy1);hole.lineTo(hx1,hy0);hole.lineTo(hx0,hy0);sh.holes.push(hole);
 const g=new T.ShapeGeometry(sh);const pa=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<pa.count;i++)uv.setXY(i,(pa.getX(i)+W/2)/W,(pa.getY(i)+H/2)/H);
 const m=new T.Mesh(g,MAT.wall);m.position.set(0,H/2,D);m.rotation.y=Math.PI;m.receiveShadow=true;scene.add(m);
 const RV=.32,rv=M('#2a1a12',{map:TX.wood,roughness:.6});add(BOX(.06,WY1-WY0,RV),rv,WX-WW/2-.03,(WY0+WY1)/2,D+RV/2,{cast:false});add(BOX(.06,WY1-WY0,RV),rv,WX+WW/2+.03,(WY0+WY1)/2,D+RV/2,{cast:false});
 add(BOX(WW+.12,.06,RV),rv,WX,WY1+.03,D+RV/2,{cast:false});add(BOX(WW+.12,.06,RV),M('#d9d2c2',{roughness:.6}),WX,WY0-.03,D+RV/2,{cast:false})}


const fr=(w,h,x,y)=>add(RB(w,h,.08,.012),MAT.frameW,x,y,D-.06);fr(WW+.12,.08,WX,WY0-.02);fr(WW+.12,.08,WX,WY1+.02);fr(.08,WY1-WY0+.1,WX-WW/2-.02,(WY0+WY1)/2);fr(.08,WY1-WY0+.1,WX+WW/2+.02,(WY0+WY1)/2);fr(.04,WY1-WY0,WX,(WY0+WY1)/2);fr(WW,.04,WX,(WY0+WY1)/2);
add(RB(WW+.4,.05,.2,.015),MAT.frameW,WX,WY0-.08,D-.1);
add(new T.CylinderGeometry(.018,.018,WW+1.3,12),MAT.brass,WX,WY1+.13,D-.16,{rz:Math.PI/2});for(const s of [-1,1])add(new T.SphereGeometry(.035,16,12),MAT.brass,WX+s*(WW/2+.66),WY1+.13,D-.16);
function curtain(x0,width,tieY){const g=new T.PlaneGeometry(width,2.75,40,60);const p=g.attributes.position;for(let i=0;i<p.count;i++){const u=p.getX(i)/width+.5,v=p.getY(i)/2.75+.5;let pinch=1;if(tieY){const t=Math.exp(-Math.pow((v-tieY)/.08,2));pinch=1-.55*t}
  const fold=Math.sin(u*TAU*4.2)*.035+Math.sin(u*TAU*9.3)*.01;p.setX(i,(u-.5)*width*(v<tieY?(.55+.45*Math.pow(1-v/tieY,.7)):pinch));p.setZ(i,fold*(.6+.4*v))}g.computeVertexNormals();const m=add(g,MAT.velvet,x0,WY1+.12-2.75/2,D-.2,{ry:Math.PI});return m}
curtain(WX-WW/2-.15,.5,.42);curtain(WX+WW/2+.12,.5,.42);
for(const s of [-1,1]){add(new T.TorusGeometry(.05,.012,8,16),MAT.brass,WX+s*(WW/2+.2),1.38,D-.2)}
const moon=new T.Mesh(new T.PlaneGeometry(1.7,2.6),new T.MeshBasicMaterial({map:TX.moonpatch,transparent:true,opacity:.42,blending:T.AdditiveBlending,depthWrite:false}));moon.rotation.x=-Math.PI/2;moon.position.set(WX-.6,.012,D-1.35);moon.scale.set(.8,.7,1);moon.visible=false;moon.rotation.z=.12;scene.add(moon);
/* ---------- outside: a real night beyond the glass ---------- */
{const EXT=new T.Group();scene.add(EXT);const GY=-.55,fogC=new T.Color('#1a2444').convertSRGBToLinear();
 // sky dome with gradient, stars
 const skyT=ctex(64,1024,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#03060f');g.addColorStop(.38,'#0b1530');g.addColorStop(.46,'#2a3e6e');g.addColorStop(.497,'#5a73a8');g.addColorStop(.503,'#3a4c7a');g.addColorStop(1,'#0a0f1c');x.fillStyle=g;x.fillRect(0,0,w,h)});
 const sky=new T.Mesh(new T.SphereGeometry(300,48,32),new T.MeshBasicMaterial({map:skyT,side:T.BackSide,depthWrite:false,fog:false}));sky.position.set(0,0,D);EXT.add(sky);
 {const n=900,pp=new Float32Array(n*3);for(let i=0;i<n;i++){const a=rnd()*TAU,e=.05+rnd()*1.2,r=280;pp[i*3]=Math.cos(a)*Math.cos(e)*r;pp[i*3+1]=Math.sin(e)*r;pp[i*3+2]=D+Math.abs(Math.sin(a))*Math.cos(e)*r}const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pp,3));EXT.add(new T.Points(g,new T.PointsMaterial({color:'#dfe6ff',size:1.1,sizeAttenuation:false,transparent:true,opacity:.8,depthWrite:false})))}
 // moon with halo, low over the trees, and slow clouds crossing it
 const moonT=ctex(256,256,(x,w,h)=>{const g=x.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);g.addColorStop(0,'rgba(255,255,250,1)');g.addColorStop(.12,'rgba(245,248,255,1)');g.addColorStop(.14,'rgba(190,210,255,.45)');g.addColorStop(.45,'rgba(140,170,240,.12)');g.addColorStop(1,'rgba(120,150,230,0)');x.fillStyle=g;x.fillRect(0,0,w,h);x.fillStyle='rgba(180,185,200,.35)';for(const [cx,cy,r] of [[118,120,6],[136,134,4],[126,140,3]]){x.beginPath();x.arc(cx,cy,r,0,TAU);x.fill()}});
 const moonS=new T.Sprite(new T.SpriteMaterial({map:moonT,transparent:true,depthWrite:false,fog:false}));moonS.position.set(-12,36,D+100);moonS.scale.set(26,26,1);EXT.add(moonS);
 const cloudT=ctex(512,256,(x,w,h)=>{for(let i=0;i<60;i++){const cx=w*.15+rnd()*w*.7,cy=h*.35+rnd()*h*.35,r=20+rnd()*60;const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,'rgba(170,185,220,.22)');g.addColorStop(1,'rgba(170,185,220,0)');x.fillStyle=g;x.fillRect(0,0,w,h)}});
 const clouds=[];for(let i=0;i<4;i++){const c=new T.Mesh(new T.PlaneGeometry(90,45),new T.MeshBasicMaterial({map:cloudT,transparent:true,opacity:.55,depthWrite:false,fog:false}));c.position.set(-80+i*55,20+i*3,D+140-i*6);c.rotation.y=Math.PI;EXT.add(c);clouds.push(c)}
 // mountains
 const mt=(x,z,r,h,col)=>{const g=new T.ConeGeometry(r,h,9,4);g.translate(0,h/2,0);const c=[];const pos=g.attributes.position;const base=new T.Color(col),snow=new T.Color('#b9c6e6').convertSRGBToLinear();for(let i=0;i<pos.count;i++){const y=pos.getY(i)/h;const k=y>.62?Math.min(1,(y-.62)*5):0;const cc=base.clone().lerp(snow,k*.85);c.push(cc.r,cc.g,cc.b)}g.setAttribute('color',new T.Float32BufferAttribute(c,3));const m=new T.Mesh(g,new T.MeshBasicMaterial({vertexColors:true,fog:false}));m.position.set(x,GY-2,z);m.rotation.y=rnd()*TAU;EXT.add(m)};
 for(let i=0;i<9;i++)mt(-120+i*30+rnd()*12,D+150+rnd()*40,30+rnd()*20,24+rnd()*20,'#1a2442');
 // snow ground, gently rolling, baked moonlight and distance haze in vertex colours
 {const g=new T.PlaneGeometry(260,260,120,120);g.rotateX(-Math.PI/2);const p=g.attributes.position,col=[];const snow=new T.Color('#8a9cc8').convertSRGBToLinear(),shade=new T.Color('#26305a').convertSRGBToLinear();
  for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i);const zz=z+124;const y=Math.sin(x*.09)*.6+Math.sin(z*.07+x*.03)*.8+Math.sin(x*.31+z*.23)*.12+Math.max(0,zz-6)*.12*Math.exp(-Math.max(0,zz-30)/40);p.setY(i,y*Math.min(1,Math.max(0,(z+124)/14)));}
  g.computeVertexNormals();const nr=g.attributes.normal;const L=new T.Vector3(-.4,.6,-.7).normalize();for(let i=0;i<p.count;i++){const d=Math.max(0,nr.getX(i)*L.x+nr.getY(i)*L.y+nr.getZ(i)*L.z);const c=shade.clone().lerp(snow,.25+.75*d);const dist=Math.hypot(p.getX(i),p.getZ(i)+124);c.lerp(fogC,Math.min(.75,dist/170));col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new T.Float32BufferAttribute(col,3));const m=new T.Mesh(g,new T.MeshBasicMaterial({vertexColors:true,fog:false}));m.position.set(0,GY,D+124);EXT.add(m)}
 // warm light from this window, falling on the snow outside
 {const t=ctex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);const g=x.createRadialGradient(w/2,h*.15,4,w/2,h*.45,w*.6);g.addColorStop(0,'rgba(255,200,120,.75)');g.addColorStop(1,'rgba(255,170,90,0)');x.fillStyle=g;x.beginPath();x.moveTo(w*.3,0);x.lineTo(w*.7,0);x.lineTo(w*.95,h);x.lineTo(w*.05,h);x.fill();x.fillStyle='rgba(0,0,0,.35)';x.globalCompositeOperation='destination-out';x.fillRect(w*.48,0,w*.04,h);x.fillRect(0,h*.45,w,h*.05)});
  const spill=new T.Mesh(new T.PlaneGeometry(2.6,4.2),new T.MeshBasicMaterial({map:t,transparent:true,blending:T.AdditiveBlending,depthWrite:false,fog:false}));spill.rotation.x=-Math.PI/2;spill.position.set(WX,GY+.06,D+2.4);EXT.add(spill);ANIM.push((dt,t2,on)=>{spill.material.opacity=on})}
 // pines: built once, scattered at real distances, swaying in the wind
 const treeGeo=(()=>{/* pines: jagged drooping tiers, moonlit from the left, snow on the upper faces */const parts=[];const Lm=new T.Vector3(-.55,.55,-.6).normalize();
   const add2=(g,col,lit,snowTop)=>{g=g.toNonIndexed();g.computeVertexNormals();const p=g.attributes.position,n=g.attributes.normal,c=[];const base=new T.Color(col).convertSRGBToLinear(),hi=new T.Color(lit).convertSRGBToLinear(),sn=new T.Color('#b7c6e4').convertSRGBToLinear();
    for(let i=0;i<p.count;i++){const nx=n.getX(i),ny=n.getY(i),nz=n.getZ(i);const d=Math.max(0,nx*Lm.x+ny*Lm.y+nz*Lm.z);const cc=base.clone().lerp(hi,d*.9);const k=snowTop?Math.max(0,Math.min(1,(ny-.55)*3))*(.35+.65*d):0;cc.lerp(sn,k*.75);c.push(cc.r,cc.g,cc.b)}g.setAttribute('color',new T.Float32BufferAttribute(c,3));parts.push(g)};
   const trunk=new T.CylinderGeometry(.06,.1,1.0,7);trunk.translate(0,.5,0);add2(trunk,'#1a120c','#3a2a1c',false);
   const tiers=7;for(let t=0;t<tiers;t++){const f=t/(tiers-1);const r=1.45*(1-f*.82)+.08,h=.95-.25*f,y=.55+f*3.25;const seg=18;const g=new T.ConeGeometry(r,h,seg,2,true);const p=g.attributes.position;
    for(let i=0;i<p.count;i++){const vy=p.getY(i);if(vy<-h/2+1e-3){const a=Math.atan2(p.getZ(i),p.getX(i));const idx=Math.round((a+Math.PI)/(TAU/seg));const out=idx%2?1.12:.8;p.setX(i,p.getX(i)*out);p.setZ(i,p.getZ(i)*out);p.setY(i,vy-(idx%2?.16:0))}else if(Math.abs(vy)<1e-3){p.setX(i,p.getX(i)*1.05);p.setZ(i,p.getZ(i)*1.05);p.setY(i,vy-.04)}}
    g.translate(0,y,0);g.rotateY(t*.7);add2(g,'#071712','#2c5a4a',true)}   let n=0;parts.forEach(g=>n+=g.attributes.position.count);const P=new Float32Array(n*3),C=new Float32Array(n*3);let o=0;parts.forEach(g=>{P.set(g.attributes.position.array,o*3);C.set(g.attributes.color.array,o*3);o+=g.attributes.position.count});
   const out=new T.BufferGeometry();out.setAttribute('position',new T.BufferAttribute(P,3));out.setAttribute('color',new T.BufferAttribute(C,3));return out})();
 const NT=130,trees=new T.InstancedMesh(treeGeo,new T.MeshBasicMaterial({vertexColors:true,fog:false,side:T.DoubleSide}),NT);const tinfo=[];const mx=new T.Matrix4(),q=new T.Quaternion(),e=new T.Euler(),sc=new T.Vector3(),ps=new T.Vector3();
 for(let i=0;i<NT;i++){let x,z;if(i<30){x=WX+(i-15)*1.5+(rnd()-.5)*1.0;z=D+11+rnd()*14}else{do{x=(rnd()-.5)*110;z=D+6+Math.pow(rnd(),1.5)*110}while(Math.abs(x-WX)<2.5&&z<D+10)}const s2=(.75+rnd()*.6)*(1+(z-D)/55);const dist=Math.hypot(x,z-D);tinfo.push({x,z,s:s2,ph:rnd()*TAU,ry:rnd()*TAU});
   trees.setColorAt(i,new T.Color('#ffffff').lerp(fogC,Math.min(.75,dist/85)))}
 trees.instanceColor.needsUpdate=true;trees.frustumCulled=false;EXT.add(trees);
 const hAt=(x,z)=>{const zz=z-D;return Math.sin(x*.09)*.6+Math.sin((z-D-124)*.07+x*.03)*.8+Math.max(0,zz-6)*.12*Math.exp(-Math.max(0,zz-30)/40)};const setTrees=t2=>{const gust=.5+.5*Math.pow(Math.max(0,Math.sin(t2*.37)),3);for(let i=0;i<NT;i++){const f=tinfo[i];const sway=(Math.sin(t2*1.3+f.ph)*.02+gust*.05)*(1-Math.min(1,(f.z-D)/80));e.set(0,f.ry,sway);q.setFromEuler(e);sc.set(f.s,f.s,f.s);ps.set(f.x,GY+hAt(f.x,f.z)-.2,f.z);mx.compose(ps,q,sc);trees.setMatrixAt(i,mx)}trees.instanceMatrix.needsUpdate=true};setTrees(0);
 // falling snow, blown by gusts
 const NS=2600,sp=new Float32Array(NS*3),sv=new Float32Array(NS);for(let i=0;i<NS;i++){sp[i*3]=(rnd()-.5)*22;sp[i*3+1]=GY+rnd()*8;sp[i*3+2]=D+.5+Math.pow(rnd(),1.4)*16;sv[i]=.35+rnd()*.6}
 const sg=new T.BufferGeometry();sg.setAttribute('position',new T.BufferAttribute(sp,3));
 const flake=ctex(32,32,(x,w,h)=>{const g=x.createRadialGradient(16,16,0,16,16,16);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.4,'rgba(255,255,255,.6)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h)});
 const snowP=new T.Points(sg,new T.PointsMaterial({color:'#dfe8ff',size:.04,map:flake,transparent:true,depthWrite:false,fog:false}));snowP.frustumCulled=false;EXT.add(snowP);
 ANIM.push((dt,t2)=>{const gust=.4+1.6*Math.pow(Math.max(0,Math.sin(t2*.37)),3);const a=sg.attributes.position.array;for(let i=0;i<NS;i++){a[i*3+1]-=sv[i]*dt;a[i*3]+=(gust+Math.sin(t2*1.7+i)*.25)*dt*(.6+sv[i]);a[i*3+2]+=Math.cos(t2*.9+i*.7)*.05*dt;
   if(a[i*3+1]<GY){a[i*3+1]=GY+8;a[i*3]=(rnd()-.5)*22}if(a[i*3]>11)a[i*3]-=22}sg.attributes.position.needsUpdate=true;setTrees(t2);clouds.forEach((c,k)=>{c.position.x+=dt*(.6+k*.15);if(c.position.x>120)c.position.x=-120})})}

/* ---------- door: stepped Deco casing, four raised panels, brass lever, light under the door ---------- */
const woodV=TX.wood.clone();woodV.center.set(.5,.5);woodV.rotation=Math.PI/2;woodV.needsUpdate=true;
const doorH=M('#8a6248',{map:TX.wood,roughness:.36}),doorVm=M('#8a6248',{map:woodV,roughness:.36}),casV=M('#5e4030',{map:woodV,roughness:.32}),casH=M('#5e4030',{map:TX.wood,roughness:.32});
const BLK=M('#060404',{roughness:.6});
add(BOX(DW+.02,DH+.01,.01),BLK,DX,DH/2,D-.004,{cast:false});
{const leaf=new T.Group();leaf.position.set(DX,.012,D-.032);scene.add(leaf);const ST=.12,LH=DH-.014;
 for(const e of [-1,1])add(RB(ST,LH,.04,.006),doorVm,e*(DW/2-ST/2),LH/2,0,{to:leaf});
 const rails=[[.24,.12],[.16,1.0],[.12,LH-.06]];for(const [h,y] of rails)add(RB(DW-2*ST+.004,h,.04,.006),doorH,0,y,0,{to:leaf});
 const ins=DW-2*ST,MW=.09,pw=(ins-MW)/2;const bands=[[.24,1.0-.08],[1.0+.08,LH-.12]];
 for(const [y0,y1] of bands){const ph=y1-y0,yc=(y0+y1)/2;add(RB(MW,ph+.004,.04,.006),doorVm,0,yc,0,{to:leaf});
  for(const e of [-1,1]){const xc=e*(MW/2+pw/2);add(BOX(pw,ph,.014),doorVm,xc,yc,.004,{to:leaf,cast:false});
   const sh=new T.Shape();const a=pw/2-.05,b=ph/2-.05;sh.moveTo(-a,-b);sh.lineTo(a,-b);sh.lineTo(a,b);sh.lineTo(-a,b);sh.lineTo(-a,-b);
   const fg=new T.ExtrudeGeometry(sh,{depth:.004,bevelEnabled:true,bevelThickness:.011,bevelSize:.032,bevelSegments:1});add(fg,doorVm,xc,yc,-.007,{to:leaf});
   for(const [w,h,dx,dy] of [[pw,.016,0,ph/2-.008],[pw,.016,0,-ph/2+.008],[.016,ph,pw/2-.008,0],[.016,ph,-pw/2+.008,0]])add(RB(w,h,.012,.005),doorH,xc+dx,yc+dy,-.022,{to:leaf,cast:false})}}
 // brass: kick plate, hinges, tall Deco backplate, lever, keyhole
 const kick=M('#c8a060',{metalness:.85,roughness:.4});add(RB(DW-.07,.19,.004,.002),kick,0,.115,-.022,{to:leaf});
 for(const y of [.28,1.05,1.82]){add(new T.CylinderGeometry(.009,.009,.1,14),MAT.brass,-DW/2-.003,y,-.022,{to:leaf});for(const c of [-.05,.05])add(new T.SphereGeometry(.009,10,8),MAT.brass,-DW/2-.003,y+c,-.022,{to:leaf})}
 const hx=DW/2-.065;add(RB(.052,.25,.008,.004),MAT.brass,hx,1.0,-.024,{to:leaf});add(RB(.036,.03,.01,.004),MAT.brass,hx,1.14,-.025,{to:leaf});add(RB(.036,.03,.01,.004),MAT.brass,hx,.86,-.025,{to:leaf});
 add(new T.CylinderGeometry(.018,.02,.016,24),MAT.brass,hx,1.04,-.034,{to:leaf,rx:Math.PI/2});
 const lv=new T.CatmullRomCurve3([new T.Vector3(hx,1.04,-.04),new T.Vector3(hx,1.04,-.066),new T.Vector3(hx-.03,1.038,-.074),new T.Vector3(hx-.13,1.03,-.072)]);add(new T.TubeGeometry(lv,24,.0085,10),MAT.brass,0,0,0,{to:leaf});
 add(new T.SphereGeometry(.0085,10,8),MAT.brass,hx-.13,1.03,-.072,{to:leaf});
 add(new T.CylinderGeometry(.006,.006,.003,14),BLK,hx,.945,-.029,{to:leaf,rx:Math.PI/2,cast:false});add(BOX(.004,.014,.003),BLK,hx,.935,-.029,{to:leaf,cast:false})}
// stepped casing, plinth blocks, ziggurat head
for(const [w,d] of [[DCas,.078],[.115,.094],[.06,.11]]){for(const e of [-1,1])add(RB(w,DH+w-.005,d,.006),casV,DX+e*(DW/2+w/2),(DH+w)/2,D-d/2,{});add(RB(DW+2*w,w,d,.006),casH,DX,DH+w/2,D-d/2,{})}
for(const e of [-1,1])add(RB(DCas+.012,.25,.12,.008),casH,DX+e*(DW/2+DCas/2),.125,D-.06);
for(const [w,h,d,y] of [[DW+2*DCas+.04,.045,.13,DH+DCas+.022],[DW+2*DCas-.06,.04,.11,DH+DCas+.064],[DW+.2,.035,.09,DH+DCas+.1]])add(RB(w,h,d,.008),casH,DX,y,D-d/2);
// someone's left the hall light on: a line of light under the door, spilling onto the boards
{const lm=new T.MeshBasicMaterial({color:new T.Color('#ffb868').convertSRGBToLinear()});add(BOX(DW-.02,.009,.003),lm,DX,.0055,D-.006,{cast:false});
 const st=ctex(256,128,(x,w,h)=>{x.clearRect(0,0,w,h);const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(255,190,110,.55)');g.addColorStop(1,'rgba(255,170,90,0)');x.fillStyle=g;x.beginPath();x.moveTo(w*.12,0);x.lineTo(w*.88,0);x.lineTo(w,h);x.lineTo(0,h);x.fill()});
 const sp=new T.Mesh(new T.PlaneGeometry(DW+.1,.42),new T.MeshBasicMaterial({map:st,transparent:true,blending:T.AdditiveBlending,depthWrite:false}));sp.rotation.x=-Math.PI/2;sp.rotation.z=Math.PI;sp.position.set(DX,.004,D-.22);scene.add(sp);
 ANIM.push((dt,t2,on)=>{sp.material.opacity=on;lm.color.setScalar(0).lerp(new T.Color('#ffb868').convertSRGBToLinear(),on)})}
const smear=new T.Mesh(new T.PlaneGeometry(.28,.28),new T.MeshStandardMaterial({map:TX.smear,transparent:true,roughness:.35,depthWrite:false}));smear.position.set(DX-DW/2-DCas-.15,1.2,D-.006);smear.rotation.y=Math.PI;scene.add(smear);
/* ---------- bookcase: fluted pilasters, stepped cornice, leather and gilt ---------- */
const BX0=-2.44,BX1=-1.22,BZ=D-.2,BH=2.55,BD=.38,BC=(BX0+BX1)/2,BWd=BX1-BX0,BF=BZ-BD/2;
const cV=M('#6e4c36',{map:woodV,roughness:.34}),cH=M('#6e4c36',{map:TX.wood,roughness:.34});
add(BOX(BWd,BH,.02),M('#4a3428',{map:TX.wood,roughness:.85}),BC,BH/2,D-.012,{cast:false});
add(RB(BWd+.06,.15,BD+.05,.01),cH,BC,.075,BZ+.01);add(RB(BWd+.02,.03,BD+.02,.008),cH,BC,.165,BZ);
for(const [w,h,d,y] of [[BWd+.03,.06,BD+.03,BH-.03],[BWd+.09,.04,BD+.08,BH+.02],[BWd+.15,.035,BD+.13,BH+.057]])add(RB(w,h,d,.01),cH,BC,y,BZ+.01-(d-BD)/2*0);
for(const x of [BX0+.035,BX1-.035]){add(RB(.07,BH-.1,BD,.012),cV,x,BH/2-.04,BZ);add(RB(.085,BH-.28,.02,.006),cV,x,BH/2,BF-.008);
  for(const f of [-.024,0,.024])add(new T.CylinderGeometry(.0065,.0065,BH-.42,10),cV,x+f,BH/2,BF-.019,{cast:false});
  for(const y of [.24,BH-.14])add(RB(.1,.05,.03,.006),MAT.brass,x,y,BF-.012)}
const bookCols=['#5a1416','#1a2a4a','#6a4a1c','#1e3a26','#3a1e3e','#6a2a14','#17161a','#7a6a48','#4a1222','#1a3a3e','#8a6a3a','#2c2018'];
const spineT={};const spineFor=(col,v)=>{const k=col+v;if(spineT[k])return spineT[k];return spineT[k]=ctex(64,256,(x,w,h)=>{x.fillStyle=col;x.fillRect(0,0,w,h);
  const g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,'rgba(0,0,0,.5)');g.addColorStop(.3,'rgba(255,240,220,.08)');g.addColorStop(.65,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.55)');x.fillStyle=g;x.fillRect(0,0,w,h);noise(x,w,h,.07,700);
  const gold='rgba(214,174,96,.95)';x.fillStyle=gold;
  if(v===0){for(const y of [20,27,229,236])x.fillRect(4,y,w-8,3);x.fillStyle='#120e0a';x.fillRect(9,58,w-18,40);x.strokeStyle=gold;x.lineWidth=2;x.strokeRect(9,58,w-18,40);x.fillStyle=gold;for(let i=0;i<3;i++)x.fillRect(15,67+i*9,w-30-rnd()*12,3)}
  else if(v===1){for(const y of [44,96,148,200]){x.fillStyle='rgba(0,0,0,.4)';x.fillRect(0,y-7,w,14);x.fillStyle='rgba(255,230,200,.12)';x.fillRect(0,y-7,w,3);x.fillStyle=gold;x.fillRect(5,y-1,w-10,2)}for(let i=0;i<2;i++)x.fillRect(13,62+i*10,w-26-rnd()*10,3)}
  else{x.fillRect(6,12,w-12,2);x.fillRect(6,h-14,w-12,2);x.save();x.translate(w/2,h*.5);x.rotate(-Math.PI/2);x.fillRect(-55,-4,96-rnd()*24,4);x.fillRect(-55,6,50,2);x.restore()}})};
const bookMat={},spineM={};const bodyFor=c=>bookMat[c]||(bookMat[c]=M(c,{roughness:.6}));const pageMat=M('#cdbf9e',{roughness:.9});
const SH=5,SG=(BH-.3)/SH;
const book=(x,y0,bw,bh,bd,ci,v,o={})=>{const col=bookCols[ci];const g=new T.Group();g.position.set(x,y0+bh/2,BF+.03+bd/2-(o.out||0));if(o.rz)g.rotation.z=o.rz;scene.add(g);
  add(RB(bw,bh,bd,.0035,2),bodyFor(col),0,0,0,{to:g});add(BOX(bw-.006,bh-.012,.004),pageMat,0,0,bd/2+.0005,{to:g,cast:false});
  const sp=new T.Mesh(new T.PlaneGeometry(bw*.98,bh*.985),(spineM[col+v]||(spineM[col+v]=M('#ffffff',{map:spineFor(col,v),roughness:.5}))));sp.position.z=-bd/2-.0009;sp.rotation.y=Math.PI;g.add(sp);
  if(v===1)for(const yy of [.33,.12,-.09,-.3])add(BOX(bw+.002,.006,.004),bodyFor(col),0,yy*bh,-bd/2-.001,{to:g,cast:false});return g};
for(let s=0;s<SH;s++){const y0=.18+s*SG;add(RB(BWd-.14,.034,BD-.02,.006),cH,BC,y0,BZ+.01);add(BOX(BWd-.14,.008,.004),MAT.brass,BC,y0+.005,BF+.008,{cast:false});
  const top=y0+.017;let x=BX0+.08;const end=BX1-.08;const tall=s===0;let i=0;const objAt=[.62,.3,.55,.7,.4][s]*(end-x)+x;let objDone=false;
  while(x<end-.03){
    if(!objDone&&x>objAt){objDone=true;
      if(s===1){const vg=[[0,0],[.045,0],[.05,.02],[.03,.06],[.058,.13],[.05,.17],[.02,.19],[.024,.2],[0,.2]].map(p=>new T.Vector2(p[0],p[1]));add(new T.LatheGeometry(vg,32),M('#3e6a5c',{roughness:.18,metalness:.05}),x+.07,top,BF+.15);x+=.16;continue}
      if(s===2||s===4){add(RB(.012,.15,.1,.003),MAT.brass,x+.006,top+.075,BF+.09);for(const [w,h,yy] of [[.06,.012,.15],[.04,.012,.162]])add(RB(w,h,.1,.003),MAT.brass,x-.015+w/2,top+yy,BF+.09);add(RB(.09,.006,.1,.002),MAT.brass,x+.045,top+.003,BF+.09);x+=.02;
        if(s===4){const lg=[[0,0],[.035,0],[.035,.012],[.018,.02],[.016,.09],[.03,.13],[.022,.16],[0,.17]].map(p=>new T.Vector2(p[0],p[1]));add(new T.LatheGeometry(lg,24),MAT.brass,x+.07,top,BF+.14);x+=.15}continue}
      if(s===3){for(let k=0;k<4;k++){const bh=.042;book(x+.12,top+k*bh,.24-k*.012,bh,.17,(k*5+3)%12,2,{})}x+=.27;continue}
    }
    if(rnd()<.05){x+=.05+rnd()*.06;continue}
    const bw=.024+rnd()*.03,bh=tall?.31+rnd()*.07:.21+rnd()*.11,bd=tall?.25+rnd()*.05:.17+rnd()*.07;const ci=Math.floor(rnd()*12);const runV=Math.floor(rnd()*3);
    const out=(s===3&&i===9)?.065:0;const lean=(rnd()<.05)?-.12:0;
    {const bk=book(x+bw/2+(lean?Math.sin(-lean)*bh/2:0),top-(lean?.0:0),bw,bh,bd,ci,runV,{out,rz:lean});if(out)(_H.hook||(()=>{}))('book',bk,{out})}x+=bw+(lean?Math.sin(-lean)*bh+.004:.0015);i++}}
/* ---------- the desk: Art Deco lacquer and burl, with the struggle left on it ---------- */
const DZ=4.35,DDp=.86,DWd=1.95,DHt=.78;
TX.burl=ctex(512,512,(x,w,h)=>{x.fillStyle='#6a3a1a';x.fillRect(0,0,w,h);for(let i=0;i<70;i++){const cx=rnd()*w,cy=rnd()*h,R=10+rnd()*60;for(let r=R;r>2;r-=2+rnd()*3){x.strokeStyle=`rgba(${rnd()<.5?40:150},${rnd()<.5?18:80},${rnd()<.5?6:30},${.12+rnd()*.2})`;x.lineWidth=1+rnd()*1.5;x.beginPath();x.ellipse(cx,cy,r*(1+rnd()*.6),r*(.6+rnd()*.5),rnd()*3,0,TAU);x.stroke()}x.fillStyle='rgba(30,12,4,.5)';x.beginPath();x.arc(cx,cy,1.5+rnd()*2.5,0,TAU);x.fill()}noise(x,w,h,.05,6000)},[2,2]);
TX.sunburst=ctex(512,512,(x,w,h)=>{const cx=w/2,cy=h*1.05;for(let i=0;i<36;i++){const a0=Math.PI+i/36*Math.PI,a1=Math.PI+(i+1)/36*Math.PI;x.fillStyle=i%2?'#7a4620':'#a8682e';x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(a0)*w*1.2,cy+Math.sin(a0)*w*1.2);x.lineTo(cx+Math.cos(a1)*w*1.2,cy+Math.sin(a1)*w*1.2);x.fill()}
  for(let i=0;i<300;i++){x.strokeStyle=`rgba(40,18,6,${.05+rnd()*.1})`;const a=Math.PI+rnd()*Math.PI;x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(a)*w,cy+Math.sin(a)*w);x.stroke()}x.strokeStyle='#d8b45a';x.lineWidth=6;x.beginPath();x.arc(cx,cy,w*.22,Math.PI,TAU);x.stroke()});
TX.typed=ctex(256,340,(x,w,h)=>{x.fillStyle='#efe8d8';x.fillRect(0,0,w,h);x.fillStyle='#1c1c26';x.font='13px "Courier New",monospace';const L=['Blackwood Lodge','','To the police, when they come.','','I know who it was. I saw the','light under the study door and','I heard','',''];L.forEach((t,k)=>x.fillText(t,20,40+k*19));noise(x,w,h,.05,1500)});
TX.ink=ctex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);x.fillStyle='rgba(8,10,22,.96)';x.beginPath();for(let i=0;i<=48;i++){const a=i/48*TAU,r=70+Math.sin(a*3)*18+Math.sin(a*7+1)*9+rnd()*6;x.lineTo(w*.5+Math.cos(a)*r*1.3,h*.5+Math.sin(a)*r*.8)}x.fill();for(let k=0;k<6;k++){x.beginPath();x.arc(w*.5+(rnd()-.5)*w*.9,h*.5+(rnd()-.5)*h*.7,3+rnd()*6,0,TAU);x.fill()}x.fillRect(w*.42,h*.62,w*.16,h*.38)});
TX.drip=ctex(64,256,(x,w,h)=>{x.clearRect(0,0,w,h);x.fillStyle='rgba(8,10,22,.95)';x.fillRect(16,0,32,20);x.beginPath();x.moveTo(20,0);x.bezierCurveTo(20,90,26,150,30,200);x.arc(32,206,8,Math.PI,0,true);x.bezierCurveTo(38,150,44,90,44,0);x.fill();x.beginPath();x.arc(32,240,6,0,TAU);x.fill()});
TX.whisky=ctex(128,128,(x,w,h)=>{x.clearRect(0,0,w,h);const g=x.createRadialGradient(64,64,4,64,64,60);g.addColorStop(0,'rgba(150,80,20,.85)');g.addColorStop(1,'rgba(150,80,20,0)');x.fillStyle=g;x.beginPath();x.ellipse(64,64,60,40,0,0,TAU);x.fill()});
MAT.lacquer=new T.MeshPhysicalMaterial({color:'#100c10',roughness:.2,metalness:0,clearcoat:1,clearcoatRoughness:.08});MAT.burl=M('#ffffff',{map:TX.burl,roughness:.6});MAT.blackGloss=M('#141416',{roughness:.22,metalness:.1});
MAT.dome=M('#f6e6c8',{emissive:'#ffcf8a',emissiveIntensity:1.3,roughness:.5,transparent:true,opacity:.94,side:T.DoubleSide});
const pill=(w,d,r)=>{const s=new T.Shape(),hw=w/2,hd=d/2;r=Math.min(r,hd-.0005,hw-.0005);s.moveTo(-hw+r,-hd);s.lineTo(hw-r,-hd);s.absarc(hw-r,-hd+r,r,-Math.PI/2,0);s.lineTo(hw,hd-r);s.absarc(hw-r,hd-r,r,0,Math.PI/2);s.lineTo(-hw+r,hd);s.absarc(-hw+r,hd-r,r,Math.PI/2,Math.PI);s.lineTo(-hw,-hd+r);s.absarc(-hw+r,-hd+r,r,Math.PI,1.5*Math.PI);return s};
const sideRound=(w,d,r,side)=>{const s=new T.Shape(),hw=w/2,hd=d/2;if(side>0){s.moveTo(-hw,-hd);s.lineTo(hw-r,-hd);s.absarc(hw-r,-hd+r,r,-Math.PI/2,0);s.lineTo(hw,hd-r);s.absarc(hw-r,hd-r,r,0,Math.PI/2);s.lineTo(-hw,hd);s.lineTo(-hw,-hd)}else{s.moveTo(hw,-hd);s.lineTo(hw,hd);s.lineTo(-hw+r,hd);s.absarc(-hw+r,hd-r,r,Math.PI/2,Math.PI);s.lineTo(-hw,-hd+r);s.absarc(-hw+r,-hd+r,r,Math.PI,1.5*Math.PI);s.lineTo(hw,-hd)}return s};
const slab=(shape,h,mat,x,y,z,b=0)=>{const g=new T.ExtrudeGeometry(shape,{depth:h,bevelEnabled:b>0,bevelThickness:b,bevelSize:b,bevelSegments:4,curveSegments:40});g.rotateX(-Math.PI/2);return add(g,mat,x,y+b,z)};
// pedestals: rounded outer ends wrapped in brass speed lines; graduated burl drawers on a black lacquer face
for(const s2 of [-1,1]){const px=s2*(DWd/2-.31),PR=.14;slab(sideRound(.56,.76,PR,s2),.05,MAT.lacquer,px,0,DZ);slab(sideRound(.56,.76,PR,s2),DHt-.15,MAT.burl,px,.05,DZ,.004);
  for(const y of [.2,.36,.52])slab(sideRound(.565,.765,PR+.002,s2),.008,MAT.brass,px,y,DZ);
  const fx=px-s2*.07,FZ=DZ-.384;add(RB(.42,.63,.014,.005),MAT.lacquer,fx,.375,FZ-.007);
  let y=.08;[.23,.18,.14].forEach((h,k)=>{const open=(s2>0&&k===1)?.16:0;const g=new T.Group();g.position.set(fx,y+h/2,FZ-.014-open);scene.add(g);if(open)(_H.hook||(()=>{}))('drawer',g,{open:FZ-.014-open,shut:FZ-.014});
    add(RB(.385,h+.004,.006,.002),MAT.brass,0,0,.004,{to:g});add(RB(.372,h-.01,.024,.007),MAT.burl,0,0,-.008,{to:g});
    add(new T.CylinderGeometry(.0065,.0065,.15,16),MAT.brass,0,0,-.05,{to:g,rz:Math.PI/2});for(const e of [-1,1]){add(RB(.016,.024,.032,.004),MAT.brass,e*.062,0,-.034,{to:g});add(RB(.026,.034,.004,.002),MAT.brass,e*.062,0,-.021,{to:g})}
    if(k===2){add(new T.CylinderGeometry(.011,.011,.004,20),MAT.brass,0,-h*.28,-.021,{to:g,rx:Math.PI/2});add(BOX(.003,.011,.002),M('#050505'),0,-h*.28,-.0235,{to:g,cast:false})}
    if(open){const bd=.36;for(const e of [-1,1])add(BOX(.012,h-.03,bd),MAT.wood,e*.175,-.012,bd/2+.004,{to:g});add(BOX(.36,.01,bd),MAT.wood,0,-h/2+.02,bd/2+.004,{to:g});
      for(const [w,d,xx,zz,r,yy] of [[.21,.28,-.04,.17,.15,0],[.21,.28,.05,.2,-.22,.003],[.2,.27,-.02,.24,.4,.006]]){const pm=new T.Mesh(new T.PlaneGeometry(w,d),M('#ffffff',{map:TX.paper,roughness:.9}));pm.rotation.x=-Math.PI/2;pm.rotation.z=r;pm.position.set(xx,-h/2+.027+yy,zz);g.add(pm)}
      add(RB(.14,.03,.2,.004),M('#22382a',{roughness:.6}),.09,-h/2+.044,.28,{to:g,ry:.2})}
    y+=h+.014})}
add(BOX(DWd-1.2,DHt-.14,.02),M('#8a7266',{map:TX.sunburst,roughness:.4}),0,(DHt-.14)/2+.04,DZ+.26);add(BOX(DWd-1.2,.04,.6),MAT.lacquer,0,.02,DZ);
slab(pill(DWd,DDp,.43),.04,MAT.lacquer,0,DHt-.05,DZ,.01);slab(pill(DWd-.14,DDp-.14,.36),.003,new T.MeshPhysicalMaterial({map:TX.burl,roughness:.25,clearcoat:.8,clearcoatRoughness:.15}),0,DHt+.0105,DZ);slab(pill(DWd+.012,DDp+.012,.436),.012,MAT.brass,0,DHt-.07,DZ);
// the lamp: stepped brass, frosted glass dome
const LX=.68,LZ=DZ+.17;add(new T.LatheGeometry([[0,0],[.1,0],[.1,.016],[.08,.016],[.08,.032],[.055,.032],[.055,.048],[.012,.048],[.012,.38],[.02,.385],[.02,.395],[0,.395]].map(p=>new T.Vector2(p[0],p[1])),40),MAT.brass,LX,DHt,LZ);
add(new T.SphereGeometry(.14,48,24,0,TAU,0,Math.PI/2),MAT.dome,LX,DHt+.36,LZ,{cast:false});add(new T.SphereGeometry(.02,12,8),MAT.brass,LX,DHt+.505,LZ);add(new T.TorusGeometry(.14,.006,8,48),MAT.brass,LX,DHt+.36,LZ,{rx:Math.PI/2});
add(new T.SphereGeometry(.03,12,8),MAT.bulb,LX,DHt+.37,LZ,{cast:false});
// typewriter, half a letter in it
{const tw=new T.Group();tw.position.set(-.22,DHt,DZ-.02);tw.rotation.y=.18;scene.add(tw);
 add(RB(.44,.1,.32,.03),MAT.blackGloss,0,.05,0,{to:tw});add(RB(.4,.09,.12,.035),MAT.blackGloss,0,.14,.09,{to:tw});add(new T.CylinderGeometry(.036,.036,.47,24),M('#0a0a0a',{roughness:.5}),0,.2,.1,{to:tw,rz:Math.PI/2});
 for(const e of [-1,1])add(new T.CylinderGeometry(.025,.025,.03,16),MAT.blackGloss,e*.25,.2,.1,{to:tw,rz:Math.PI/2});add(RB(.07,.012,.012,.005),MAT.brass,-.27,.23,.06,{to:tw,rz:.4});
 const ivory=M('#e9e2d0',{roughness:.4});for(let r=0;r<4;r++)for(let k=0;k<(r===3?7:10);k++){const kx=-.16+k*.036+(r===3?.05:0);add(new T.CylinderGeometry(.012,.012,.008,14),ivory,kx,.105+r*.012,-.13+r*.035,{to:tw,cast:false});add(new T.CylinderGeometry(.002,.002,.03,4),MAT.blackGloss,kx,.09+r*.012,-.13+r*.035,{to:tw,cast:false})}
 add(RB(.18,.016,.03,.008),ivory,0,.1,-.165,{to:tw,cast:false});
 const pg=new T.PlaneGeometry(.21,.28,1,14);const pp2=pg.attributes.position;for(let i=0;i<pp2.count;i++){const v=pp2.getY(i)/.28+.5;pp2.setZ(i,-Math.pow(1-v,2)*.05)}pg.computeVertexNormals();const paper=new T.Mesh(pg,M('#ffffff',{map:TX.typed,roughness:.85,side:T.DoubleSide}));paper.position.set(0,.33,.115);paper.rotation.set(-.22,Math.PI,0);paper.castShadow=true;tw.add(paper)}
// candlestick telephone; the receiver hangs off the desk on its cord and still sways
{const PX=.25,PZ=DZ+.2;add(new T.LatheGeometry([[0,0],[.068,0],[.064,.022],[.03,.04],[.015,.06],[.015,.27],[0,.27]].map(p=>new T.Vector2(p[0],p[1])),32),MAT.blackGloss,PX,DHt,PZ);
 add(new T.CylinderGeometry(.032,.016,.07,20),MAT.blackGloss,PX,DHt+.29,PZ-.035,{rx:Math.PI/2});add(RB(.012,.06,.012,.004),MAT.brass,PX+.03,DHt+.22,PZ,{});
 const top=new T.Vector3(.5,DHt-.17,DZ-DDp/2-.05);const cord=new T.CatmullRomCurve3([new T.Vector3(PX+.04,DHt+.02,PZ),new T.Vector3(.42,DHt+.012,DZ-.1),new T.Vector3(.52,DHt+.01,DZ-.41),new T.Vector3(.53,DHt-.06,DZ-DDp/2-.04),top]);
 add(new T.TubeGeometry(cord,60,.005,6,false),MAT.blackGloss,0,0,0,{cast:false});
 const rec=new T.Group();rec.position.copy(top);scene.add(rec);add(new T.CylinderGeometry(.017,.017,.12,16),MAT.blackGloss,0,-.06,0,{to:rec});add(new T.CylinderGeometry(.034,.02,.05,20),MAT.blackGloss,0,-.14,0,{to:rec});
 ANIM.push((dt,t2)=>{rec.rotation.z=Math.sin(t2*1.6)*.06;rec.rotation.x=Math.sin(t2*1.1+1)*.03})}
// spilled ink: bottle on its side, a pool on the lacquer, a drip down the front, drops on the floor
{const im=new T.MeshPhysicalMaterial({color:'#ffffff',map:TX.ink,transparent:true,roughness:.05,clearcoat:1,depthWrite:false});
 add(new T.LatheGeometry([[0,0],[.042,0],[.046,.035],[.022,.062],[.014,.08],[0,.08]].map(p=>new T.Vector2(p[0],p[1])),24),new T.MeshPhysicalMaterial({color:'#1a2030',roughness:.05,transmission:0,transparent:true,opacity:.7,clearcoat:1}),-.52,DHt+.058,DZ-.18,{rz:Math.PI/2+.1,ry:.6});
 const pool=new T.Mesh(new T.PlaneGeometry(.42,.3),im);pool.rotation.x=-Math.PI/2;pool.position.set(-.42,DHt+.0155,DZ-.27);scene.add(pool);
 const drip=new T.Mesh(new T.PlaneGeometry(.05,.2),new T.MeshPhysicalMaterial({map:TX.drip,transparent:true,roughness:.05,clearcoat:1,depthWrite:false}));drip.position.set(-.42,DHt-.13,DZ-DDp/2-.013);scene.add(drip);
 const drops=new T.Mesh(new T.PlaneGeometry(.16,.12),im);drops.rotation.x=-Math.PI/2;drops.position.set(-.42,.006,DZ-DDp/2-.08);drops.scale.set(.6,.6,1);scene.add(drops)}
// whisky glass knocked over, a puddle
{const tum=new T.LatheGeometry([[0,0],[.035,0],[.04,.09],[.038,.09],[.033,.005],[0,.005]].map(p=>new T.Vector2(p[0],p[1])),24);add(tum,MAT.glass,.05,DHt+.052,DZ-.27,{rz:Math.PI/2,ry:-.5,cast:false});
 const pud=new T.Mesh(new T.PlaneGeometry(.22,.16),new T.MeshPhysicalMaterial({map:TX.whisky,transparent:true,roughness:.05,clearcoat:1,depthWrite:false}));pud.rotation.x=-Math.PI/2;pud.position.set(.12,DHt+.0155,DZ-.27);scene.add(pud)}
// letters: some on the desk, some swept to the floor
const letter=(x,y,z,rz)=>{const m=add(new T.PlaneGeometry(.21,.28),M('#ddd5c6',{map:TX.paper,roughness:.9,side:T.DoubleSide}),x,y,z,{rx:-Math.PI/2,cast:false});m.rotation.z=rz;return m};
letter(.32,DHt+.017,DZ-.12,.5);letter(-.68,DHt+.017,DZ+.1,-.3);letter(-.35,.007,3.62,.8);letter(.2,.008,3.5,-.4);letter(.62,.007,3.78,1.4);
const pf=add(RB(.18,.14,.015,.004),MAT.gilt,-.72,DHt+.07,DZ+.24,{rx:-.2});const ph=new T.Mesh(new T.PlaneGeometry(.15,.11),M('#ffffff',{map:TX.photo,roughness:.6}));ph.position.set(0,0,-.009);ph.rotation.y=Math.PI;pf.add(ph);pf.rotation.y=Math.PI+.3;
// chair, pushed back and turned
const chair=new T.Group();chair.position.set(-.15,0,DZ+.85);chair.rotation.y=Math.PI+.55;scene.add(chair);
const CL=M('#3a1e14',{roughness:.45});add(RB(.56,.12,.52,.05),CL,0,.5,0,{to:chair});add(RB(.6,.62,.12,.06),CL,0,.88,.24,{to:chair});add(RB(.08,.22,.5,.04),CL,-.3,.62,0,{to:chair});add(RB(.08,.22,.5,.04),CL,.3,.62,0,{to:chair});
add(new T.CylinderGeometry(.03,.03,.42,10),MAT.woodDark,0,.24,0,{to:chair});for(let i=0;i<4;i++){const a=i/4*TAU+.4;add(RB(.3,.03,.05,.01),MAT.woodDark,Math.cos(a)*.15,.04,Math.sin(a)*.15,{ry:-a,to:chair})}
/* ---------- rug, body under sheet, blood, clock, button ---------- */
const rug=plane(3.4,2.9,MAT.rug,0,.004,2.6,0,-Math.PI/2);rug.castShadow=false;
const blood=new T.Mesh(new T.PlaneGeometry(.9,.75),new T.MeshStandardMaterial({map:TX.blood,transparent:true,roughness:.15,depthWrite:false}));blood.rotation.x=-Math.PI/2;blood.position.set(-1.12,.008,2.48);blood.scale.set(1.1,1,1);scene.add(blood);
{// the victim, face down where they fell: the inked body art laid on the rug, painted per case by the game
 const E=new T.Group();E.position.set(.05,0,2.55);E.rotation.y=.42;scene.add(E);scene.remove(blood);
 const bm=new T.MeshStandardMaterial({transparent:true,alphaTest:.04,roughness:.85,metalness:0,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2});
 const art=new T.Mesh(new T.PlaneGeometry(2.3,1.123),bm);art.rotation.x=-Math.PI/2;art.position.set(-.17,.011,0);art.receiveShadow=true;art.visible=false;art.renderOrder=2;E.add(art);
 (_H.hook||(()=>{}))('bodyArt',art)}

const clock=new T.Group();clock.position.set(-1.3,.1,3.5);clock.rotation.set(0,.7,Math.PI/2);scene.add(clock);
add(RB(.26,.2,.12,.02),MAT.brass,0,0,0,{to:clock});add(RB(.03,.16,.1,.01),MAT.brass,.145,0,0,{to:clock});add(new T.TorusGeometry(.04,.008,8,16),MAT.brass,.18,0,0,{to:clock,rz:Math.PI/2});
const dial=new T.Mesh(new T.CircleGeometry(.075,32),M('#ffffff',{map:TX.dial,roughness:.3}));dial.position.set(0,0,-.061);dial.rotation.set(0,Math.PI,Math.PI/2);clock.add(dial);
/* a torn overcoat button: dished horn face, raised rim, four holes, broken thread and a scrap of the coat still caught in it */
{const BR=.017,bg=new T.Group();bg.position.set(1.42,.0075,1.32);bg.rotation.set(.12,.6,-.08);scene.add(bg);(_H.hook||(()=>{}))('button',bg);
 const hornT=ctex(128,128,(x,w,h)=>{x.fillStyle='#2f6a3e';x.fillRect(0,0,w,h);for(let i=0;i<26;i++){x.strokeStyle=`rgba(${rnd()<.5?12:110},${rnd()<.5?40:150},${rnd()<.5?20:90},${.15+rnd()*.25})`;x.lineWidth=1+rnd()*4;x.beginPath();const r=10+rnd()*60;x.arc(w/2+rnd()*20-10,h/2+rnd()*20-10,r,rnd()*TAU,rnd()*TAU+2);x.stroke()}noise(x,w,h,.05,600)});
 const horn=new T.MeshPhysicalMaterial({map:hornT,color:'#8a9a8c',roughness:.4,clearcoat:.6,clearcoatRoughness:.25});
 // body: disc with four real holes, rounded edge
 const sh=new T.Shape();sh.absarc(0,0,BR,0,TAU,false);for(const [hx,hy] of [[-1,-1],[1,-1],[1,1],[-1,1]]){const hp=new T.Path();hp.absarc(hx*.0042,hy*.0042,.0017,0,TAU,true);sh.holes.push(hp)}
 const body=new T.ExtrudeGeometry(sh,{depth:.0022,bevelEnabled:true,bevelThickness:.0012,bevelSize:.0012,bevelSegments:4,curveSegments:40});body.rotateX(-Math.PI/2);add(body,horn,0,.0012,0,{to:bg});
 // raised rim around a dished centre
 add(new T.TorusGeometry(BR-.0032,.0016,10,48),horn,0,.0042,0,{to:bg,rx:Math.PI/2});
 // broken thread: one cross still stitched, the other pulled out and trailing
 const thr=M('#0c1a10',{roughness:.95});const tube=(pts,r=.00055)=>add(new T.TubeGeometry(new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(...p))),24,r,5),thr,0,0,0,{to:bg,cast:false});
 tube([[-.0042,.0035,-.0042],[0,.0047,0],[.0042,.0035,.0042]]);
 tube([[.0042,.0035,-.0042],[.0062,.006,-.006],[.011,.0045,-.013],[.02,.0012,-.02],[.03,.0008,-.026]]);
 tube([[-.0042,.0035,.0042],[-.007,.006,.008],[-.012,.004,.015],[-.016,.0012,.024]]);
 // a ragged scrap of green wool torn from the coat, caught under the button
 const woolT=ctex(128,128,(x,w,h)=>{x.clearRect(0,0,w,h);x.fillStyle='#24452f';x.beginPath();const n=22;for(let i=0;i<=n;i++){const a=i/n*TAU,r=w*(.3+rnd()*.17);x.lineTo(w/2+Math.cos(a)*r,h/2+Math.sin(a)*r*.7)}x.fill();x.globalCompositeOperation='source-atop';for(let i=0;i<500;i++){x.fillStyle=`rgba(${rnd()<.5?10:90},${rnd()<.5?30:110},${rnd()<.5?18:70},.35)`;x.fillRect(rnd()*w,rnd()*h,1,3)}
   x.globalCompositeOperation='source-over';x.strokeStyle='rgba(40,80,52,.9)';x.lineWidth=1;for(let i=0;i<40;i++){const a=rnd()*TAU,r=w*.36;const cx=w/2+Math.cos(a)*r,cy=h/2+Math.sin(a)*r*.7;x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(a)*(4+rnd()*8),cy+Math.sin(a)*(4+rnd()*8));x.stroke()}});
 const scrap=new T.Mesh(new T.PlaneGeometry(.05,.05),M('#ffffff',{map:woolT,transparent:true,alphaTest:.4,roughness:1,side:T.DoubleSide}));scrap.rotation.x=-Math.PI/2;scrap.rotation.z=.5;scrap.position.set(.012,-.0004,-.008);scrap.receiveShadow=true;bg.add(scrap)}
/* ---------- right wall: portrait, sconces; left: globe ---------- */
const pfr=add(RB(.06,1.0,.8,.02),MAT.gilt,hw-.04,1.92,3.1);const pt=new T.Mesh(new T.PlaneGeometry(.66,.86),M('#ffffff',{map:TX.portrait,roughness:.7}));pt.position.set(hw-.075,1.92,3.1);pt.rotation.y=-Math.PI/2;scene.add(pt);
const sconce=(x,z,ry)=>{const g=new T.Group();g.position.set(x,1.85,z);g.rotation.y=ry;scene.add(g);add(RB(.08,.14,.03,.01),MAT.brass,0,0,0,{to:g});add(new T.CylinderGeometry(.008,.008,.14,8),MAT.brass,0,.02,-.07,{to:g,rx:Math.PI/2});
  add(new T.CylinderGeometry(.045,.07,.1,20,1,true),MAT.sconceShade,0,.1,-.14,{to:g,cast:false}).material.side=T.DoubleSide;return g};
sconce(hw-.02,4.4,-Math.PI/2);sconce(-hw+.02,2.4,Math.PI/2);sconce(-hw+.02,4.2,Math.PI/2);
const globe=new T.Group();globe.position.set(-1.95,0,1.55);scene.add(globe);add(new T.SphereGeometry(.22,32,24),M('#ffffff',{map:TX.globe,roughness:.55}),0,.92,0,{to:globe,rz:.4});
add(new T.TorusGeometry(.25,.01,8,48),MAT.brass,0,.92,0,{to:globe,ry:Math.PI/2});add(new T.CylinderGeometry(.02,.03,.66,10),MAT.woodDark,0,.36,0,{to:globe});for(let i=0;i<3;i++){const a=i/3*TAU;add(RB(.24,.03,.04,.01),MAT.woodDark,Math.cos(a)*.11,.03,Math.sin(a)*.11,{ry:-a,to:globe})}
/* ---------- lights ---------- */
const hemi=new T.HemisphereLight('#5a5a86','#3a1e0c',.55);const roomFill=new T.PointLight('#ffd6a0',1.0,10,1.4);roomFill.position.set(0,2.85,2.6);scene.add(roomFill);scene.add(hemi);
const lampSpot=new T.SpotLight('#ffcf8a',2.7,7,.82,.65,1.6);lampSpot.position.set(LX,DHt+.35,LZ);lampSpot.target.position.set(0,0,2.7);scene.add(lampSpot,lampSpot.target);lampSpot.castShadow=true;lampSpot.shadow.mapSize.set(2048,2048);lampSpot.shadow.bias=-.0006;lampSpot.shadow.radius=4;
const lampGlow=new T.PointLight('#ffc070',.55,2.2,2);lampGlow.position.set(LX,DHt+.4,LZ);scene.add(lampGlow);
const sconceLights=[[hw-.2,1.95,4.26],[-hw+.2,1.95,2.54],[-hw+.2,1.95,4.34]].map(p=>{const l=new T.PointLight('#ffbf78',1.8,4,2);l.position.set(...p);scene.add(l);return l});
const moonLight=new T.SpotLight('#8aa6ff',2.2,9,.55,.9,1.4);moonLight.position.set(WX,2.4,D+1.6);moonLight.target.position.set(WX-.3,0,D-2.2);scene.add(moonLight,moonLight.target);moonLight.castShadow=true;moonLight.shadow.mapSize.set(1024,1024);moonLight.shadow.bias=-.0008;moonLight.shadow.radius=6;
const fill=new T.DirectionalLight('#6a78b0',.18);fill.position.set(-1,3,-2);scene.add(fill);
/* ---------- dust motes ---------- */
const dustG=new T.BufferGeometry();const N=70,dp=new Float32Array(N*3);for(let i=0;i<N;i++){dp[i*3]=-.8+rnd()*1.8;dp[i*3+1]=.2+rnd()*1.3;dp[i*3+2]=2.6+rnd()*1.8}dustG.setAttribute('position',new T.BufferAttribute(dp,3));
const dust=new T.Points(dustG,new T.PointsMaterial({color:'#ffe2b0',size:.007,transparent:true,opacity:.35,depthWrite:false,blending:T.AdditiveBlending,map:ctex(32,32,(x,w,h)=>{const g=x.createRadialGradient(16,16,0,16,16,16);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h)})}));scene.add(dust);
const V={wide:{p:[-.15,2.55,-.35],t:[.05,.25,2.95],fov:60,where:'Study · power on',text:'The study. Edmund lies face down on the rug, one arm reaching out. The desk chair is pushed back. A small clock lies on the floor.'},
 clock:{p:[-1.0,.66,2.85],t:[-1.3,.1,3.5],fov:40,where:'Study · close look',text:'A carriage clock on its side. The glass is cracked. The hands stand at twenty to ten.'},
 door:{p:[.95,1.32,4.3],t:[1.25,1.15,5.5],fov:50,where:'Study · close look',text:'Beside the door frame, four dark streaks on the wallpaper, dragged downward. They start about four feet up.'},
 shelves:{p:[-1.0,1.5,3.2],t:[-1.7,1.25,5.4],fov:52,where:'Study · close look',text:'The bookcase. Law reports, a run of Dickens, ledgers bound in green. A celadon vase, a brass urn. Dust along every shelf.'},
 desk:{p:[.05,1.85,2.85],t:[0,.72,4.3],fov:54,where:'Study · close look',text:'The desk. A typewriter with half a letter in it. Ink spilled across the lacquer and dripping over the edge. A glass on its side. The telephone receiver hangs off the desk on its cord.'},
 window:{p:[-.1,1.62,3.75],t:[-.12,1.95,6.5],fov:58,where:'Study · close look',text:'The window. Pines up to the ridge, the moon clear above them, snow blowing sideways. The road out is somewhere under all of it.'},
 rug:{p:[1.2,.52,.92],t:[1.42,0,1.32],fov:38,where:'Study · close look',text:'The edge of the rug, near the fringe. Something small and green.'},
 dark:{p:[-.15,2.55,-.35],t:[.05,.25,2.95],fov:60,where:'Study · power out',text:'The lights die. Moonlight through the window, and nothing else.',dark:true}};
return {far:420,views:V,exposure:1.4,darkExposure:0.4,bloom:[0.32, 0.3, 1.15],noEnv:true,update(t,dt,on,darkK){lampSpot.intensity=3.6*on;lampGlow.intensity=.9*on;sconceLights.forEach(l=>l.intensity=1.8*on);MAT.bulb.emissiveIntensity=3*on;MAT.sconceShade.emissiveIntensity=1.6*on;MAT.shade.emissiveIntensity=.4*on;MAT.dome.emissiveIntensity=1.3*on;
  hemi.intensity=.55-.25*darkK;roomFill.intensity=1.0*on;moonLight.intensity=2.2+2.8*darkK;
  const a=dustG.attributes.position;for(let i=0;i<N;i++){a.array[i*3+1]+=dt*(.01+((i*37)%7)*.002)*(i%2?1:-1);if(a.array[i*3+1]>1.6)a.array[i*3+1]=.2;if(a.array[i*3+1]<.2)a.array[i*3+1]=1.6}a.needsUpdate=true;dust.material.opacity=.35*on;moon.material.opacity=(.05+.4*darkK);
  }};});
