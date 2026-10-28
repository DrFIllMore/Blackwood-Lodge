// ROOM {"title": "Blackwood Lounge Proof", "aria": "The lounge, rendered in 3D", "loading": "Lighting the fire…", "where": "Lounge · power on", "text": "The lounge. A fire going, the chesterfield drawn up to it, two wing chairs either side of the hearth. Someone left a cigar burning.", "buttons": [["wide", "The lounge"], ["fire", "Fireplace"], ["grate", "The grate"], ["mantel", "Mantel"], ["chairs", "Wing chairs"], ["table", "Low table"], ["drinks", "Drinks"], ["cards", "Card table"], ["window", "Window"], ["dark", "Power out"]]}
ROOM(23,_H=>{const {renderer,scene,camera,ANIM}=_H;
const T=THREE,TAU=Math.PI*2;let seed=23;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
/* ---------- procedural textures ---------- */
function ctex(w,h,draw,rep){const cv=document.createElement('canvas');cv.width=w;cv.height=h;const x=cv.getContext('2d');draw(x,w,h);const t=new T.CanvasTexture(cv);t.encoding=T.sRGBEncoding;t.anisotropy=8;if(rep){t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(rep[0],rep[1])}return t}
function noise(x,w,h,a,n=4000){for(let i=0;i<n;i++){x.fillStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:255},${rnd()<.5?0:255},${a*rnd()})`;x.fillRect(rnd()*w,rnd()*h,1+rnd()*2,1+rnd()*2)}}
const TX={
 floor:ctex(1024,1024,(x,w,h)=>{const n=7,pw=w/n;for(let i=0;i<n;i++){let y=-rnd()*400;while(y<h){const L=300+rnd()*420,t=rnd();x.fillStyle=`rgb(${84+t*28|0},${54+t*18|0},${32+t*10|0})`;x.fillRect(i*pw,y,pw,L);
     for(let g=0;g<16;g++){x.strokeStyle=`rgba(30,16,6,${.08+rnd()*.14})`;x.lineWidth=.8+rnd()*1.6;const gx=i*pw+rnd()*pw;x.beginPath();x.moveTo(gx,y);x.bezierCurveTo(gx+rnd()*6-3,y+L*.3,gx+rnd()*8-4,y+L*.7,gx+rnd()*4-2,y+L);x.stroke()}
     for(const yy of [y+12,y+L-12]){x.fillStyle='rgba(10,6,3,.8)';x.beginPath();x.arc(i*pw+14,yy,2.5,0,TAU);x.arc(i*pw+pw-14,yy,2.5,0,TAU);x.fill()}
     x.fillStyle='rgba(10,5,2,.7)';x.fillRect(i*pw,y,pw,2.5);y+=L}x.fillStyle='rgba(10,5,2,.75)';x.fillRect(i*pw,0,3,h)}noise(x,w,h,.05,9000)},[2.4,2.6]),
 // knotty boards, run vertically, for the walls
 boards:ctex(512,512,(x,w,h)=>{const n=6,pw=w/n;for(let i=0;i<n;i++){const t=rnd();x.fillStyle=`rgb(${96+t*26|0},${60+t*16|0},${34+t*10|0})`;x.fillRect(i*pw,0,pw,h);
     for(let g=0;g<18;g++){x.strokeStyle=`rgba(40,20,8,${.08+rnd()*.15})`;x.lineWidth=.7+rnd()*1.8;const gx=i*pw+rnd()*pw;x.beginPath();x.moveTo(gx,0);x.bezierCurveTo(gx+rnd()*10-5,h*.3,gx+rnd()*10-5,h*.7,gx+rnd()*6-3,h);x.stroke()}
     for(let k=0;k<2;k++){const cx=i*pw+10+rnd()*(pw-20),cy=rnd()*h;x.fillStyle='rgba(40,18,6,.6)';x.beginPath();x.ellipse(cx,cy,4+rnd()*3,7+rnd()*5,0,0,TAU);x.fill();x.strokeStyle='rgba(40,18,6,.25)';for(let r=8;r<22;r+=4){x.beginPath();x.ellipse(cx,cy,r*.7,r*1.3,0,0,TAU);x.stroke()}}
     x.fillStyle='rgba(8,4,2,.85)';x.fillRect(i*pw,0,3,h);x.fillStyle='rgba(255,220,180,.06)';x.fillRect(i*pw+3,0,2,h)}noise(x,w,h,.04,5000)},[6,1]),
 plaster:ctex(256,256,(x,w,h)=>{x.fillStyle='#4a4036';x.fillRect(0,0,w,h);noise(x,w,h,.07,5000)},[4,4]),
 // fieldstone, laid in courses, with mortar; doubles as a bump map
 // fieldstone: packed irregular stones (cellular), thin dark mortar, each stone shaded and speckled; seamless
 stone:ctex(1024,1024,(x,w,h)=>{const gx=8,gy=10,cw=w/gx,chh=h/gy;const S=[];for(let j=0;j<gy;j++)for(let i=0;i<gx;i++){const t=rnd();const pal=[[128,120,108],[112,106,100],[140,126,104],[98,96,94],[126,110,92],[150,140,124],[90,84,78]];const c=pal[Math.floor(rnd()*pal.length)];const k=.62+t*.42;S.push({x:(i+rnd())*cw,y:(j+rnd())*chh,c:[c[0]*k,c[1]*k,c[2]*k],gx:rnd()-.5,gy:rnd()-.5})}
   const im=x.createImageData(w,h),d=im.data;const site=(i,j)=>{const ii=((i%gx)+gx)%gx,jj=((j%gy)+gy)%gy;const s=S[jj*gx+ii];return [s,s.x+(i-ii)*cw,s.y+(j-jj)*chh]};
   for(let py=0;py<h;py++){const cj=Math.floor(py/chh);for(let px=0;px<w;px++){const ci=Math.floor(px/cw);let f1=1e9,f2=1e9,b=null,bx=0,by=0;
     for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){const [s0,sx,sy]=site(ci+di,cj+dj);const dx=(px-sx)*.85,dy=(py-sy)*1.15;const dd=Math.sqrt(dx*dx+dy*dy);if(dd<f1){f2=f1;f1=dd;b=s0;bx=sx;by=sy}else if(dd<f2)f2=dd}
     const e=f2-f1,o=(py*w+px)*4;if(e<5){const m=26+e*3;d[o]=m;d[o+1]=m*.95;d[o+2]=m*.9;d[o+3]=255;continue}
     const edge=Math.min(1,(e-5)/16),lit=1+((px-bx)*b.gx+(py-by)*b.gy)*.006-(py-by)*.002;const k=(.55+.45*edge)*lit;d[o]=b.c[0]*k;d[o+1]=b.c[1]*k;d[o+2]=b.c[2]*k;d[o+3]=255}}
   x.putImageData(im,0,0);noise(x,w,h,.09,40000);for(let i=0;i<300;i++){x.fillStyle=`rgba(${rnd()<.5?30:200},${rnd()<.5?30:190},${rnd()<.5?30:170},.12)`;x.beginPath();x.arc(rnd()*w,rnd()*h,2+rnd()*6,0,TAU);x.fill()}},[1,1]),
 soot:ctex(256,256,(x,w,h)=>{const g=x.createLinearGradient(0,h,0,0);g.addColorStop(0,'#2a2420');g.addColorStop(.5,'#0e0c0b');g.addColorStop(1,'#050404');x.fillStyle=g;x.fillRect(0,0,w,h);noise(x,w,h,.08,3000)}),
 leather:ctex(256,256,(x,w,h)=>{x.fillStyle='#5a2214';x.fillRect(0,0,w,h);for(let i=0;i<60;i++){x.strokeStyle=`rgba(0,0,0,${.05+rnd()*.08})`;x.lineWidth=1;x.beginPath();const px=rnd()*w,py=rnd()*h;x.moveTo(px,py);x.quadraticCurveTo(px+rnd()*40-20,py+rnd()*40-20,px+rnd()*60-30,py+rnd()*60-30);x.stroke()}noise(x,w,h,.06,4000)},[2,2]),
 // deep-buttoned chesterfield: diamond pleats with a button at each crossing
 tufted:ctex(256,256,(x,w,h)=>{x.fillStyle='#5a2214';x.fillRect(0,0,w,h);const s=64;for(let i=-1;i<=4;i++)for(let j=-1;j<=4;j++){const cx=i*s+(j%2?s/2:0),cy=j*s/1.2;const g=x.createRadialGradient(cx,cy-6,4,cx,cy,s*.55);g.addColorStop(0,'rgba(255,200,170,.22)');g.addColorStop(.7,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.25)');x.fillStyle=g;x.beginPath();x.moveTo(cx,cy-s/1.2/2);x.lineTo(cx+s/2,cy);x.lineTo(cx,cy+s/1.2/2);x.lineTo(cx-s/2,cy);x.closePath();x.fill()}
   x.strokeStyle='rgba(20,6,2,.6)';x.lineWidth=2.4;for(let i=-4;i<8;i++){x.beginPath();x.moveTo(i*s/2,0);x.lineTo(i*s/2+h*.6,h);x.stroke();x.beginPath();x.moveTo(i*s/2,0);x.lineTo(i*s/2-h*.6,h);x.stroke()}
   for(let i=-1;i<=4;i++)for(let j=-1;j<=5;j++){const cx=i*s+(j%2?s/2:0)+s/2,cy=j*s/1.2+s/2.4;x.fillStyle='#1c0804';x.beginPath();x.arc(cx%w,cy,5,0,TAU);x.fill();x.fillStyle='rgba(255,200,170,.3)';x.beginPath();x.arc(cx%w-1.5,cy-1.5,2,0,TAU);x.fill()}noise(x,w,h,.05,2500)},[3,1]),
 velvet:ctex(256,256,(x,w,h)=>{x.fillStyle='#9a9a9a';x.fillRect(0,0,w,h);for(let i=0;i<3000;i++){x.fillStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:255},${rnd()<.5?0:255},${.04+rnd()*.05})`;x.fillRect(rnd()*w,rnd()*h,1,3)}},[3,3]),
 rug:ctex(1024,768,(x,w,h)=>{x.fillStyle='#4a1012';x.fillRect(0,0,w,h);const B=80;x.fillStyle='#101828';x.fillRect(0,0,w,B);x.fillRect(0,h-B,w,B);x.fillRect(0,0,B,h);x.fillRect(w-B,0,B,h);
   x.strokeStyle='#a07a3e';x.lineWidth=5;x.strokeRect(B-8,B-8,w-2*B+16,h-2*B+16);x.strokeRect(14,14,w-28,h-28);
   for(let i=0;i<w;i+=40){for(const yy of [B/2,h-B/2]){x.save();x.translate(i+20,yy);x.fillStyle='#9a7038';x.beginPath();for(let k=0;k<8;k++){const a=k/8*TAU,r=k%2?6:15;x.lineTo(Math.cos(a)*r,Math.sin(a)*r)}x.fill();x.restore()}}
   for(let i=0;i<h;i+=40){for(const xx of [B/2,w-B/2]){x.save();x.translate(xx,i+20);x.fillStyle='#c48a3e';x.beginPath();for(let k=0;k<8;k++){const a=k/8*TAU,r=k%2?6:15;x.lineTo(Math.cos(a)*r,Math.sin(a)*r)}x.fill();x.restore()}}
   x.save();x.translate(w/2,h/2);for(let r=0;r<6;r++){x.fillStyle=['#101828','#a07a3e','#5a1418','#b89a70','#1e3440','#a07a3e'][r];x.beginPath();const R=210-r*32;for(let k=0;k<24;k++){const a=k/24*TAU,rr=k%2?R*.82:R;x.lineTo(Math.cos(a)*rr*1.35,Math.sin(a)*rr)}x.closePath();x.fill()}x.restore();
   for(const [cx,cy,sx,sy] of [[B,B,1,1],[w-B,B,-1,1],[B,h-B,1,-1],[w-B,h-B,-1,-1]]){x.fillStyle='#14203a';x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+sx*220,cy);x.quadraticCurveTo(cx+sx*120,cy+sy*60,cx,cy+sy*180);x.closePath();x.fill()}
   x.strokeStyle='rgba(208,162,84,.35)';x.lineWidth=2;for(let i=0;i<90;i++){const px=B+20+rnd()*(w-2*B-40),py=B+20+rnd()*(h-2*B-40);x.beginPath();x.arc(px,py,4+rnd()*6,0,TAU);x.stroke()}noise(x,w,h,.08,24000)}),
 baize:ctex(256,256,(x,w,h)=>{x.fillStyle='#1d4a2e';x.fillRect(0,0,w,h);noise(x,w,h,.08,6000)}),
 paperN:ctex(512,384,(x,w,h)=>{x.fillStyle='#ddd6c4';x.fillRect(0,0,w,h);x.fillStyle='#1a1a1a';x.font='bold 34px Georgia';x.textAlign='center';x.fillText('The Northern Courier',w/2,44);x.fillRect(16,54,w-32,2);x.font='bold 20px Georgia';x.fillText('ROAD CLOSED AT FALLOW BRIDGE',w/2,84);
   x.fillStyle='rgba(30,30,30,.55)';for(let c=0;c<4;c++)for(let l=0;l<22;l++){if(c===3&&l>8)continue;x.fillRect(16+c*122,100+l*12,104-rnd()*20,4)}x.fillStyle='rgba(60,60,60,.5)';x.fillRect(16+3*122,210,104,140);
   x.strokeStyle='#222';x.lineWidth=1;for(let i=0;i<=7;i++){x.beginPath();x.moveTo(382+i*14,230);x.lineTo(382+i*14,328);x.stroke();x.beginPath();x.moveTo(382,230+i*14);x.lineTo(480,230+i*14);x.stroke()}
   x.fillStyle='#ddd6c4';x.fillRect(383,231,97,97);x.strokeStyle='#222';for(let i=0;i<=7;i++){x.beginPath();x.moveTo(382+i*14,230);x.lineTo(382+i*14,328);x.stroke();x.beginPath();x.moveTo(382,230+i*14);x.lineTo(480,230+i*14);x.stroke()}
   x.fillStyle='#111';for(let i=0;i<7;i++)for(let j=0;j<7;j++){if(rnd()<.18)x.fillRect(383+i*14,231+j*14,13,13);else if(rnd()<.35){x.font='11px Georgia';x.fillStyle='#2a2a6a';x.fillText(String.fromCharCode(65+rnd()*26|0),389+i*14,242+j*14);x.fillStyle='#111'}}}),
 // a corner of a letter the fire didn't finish
 scrap:ctex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);x.save();x.beginPath();x.moveTo(20,30);x.lineTo(230,24);for(let i=0;i<=14;i++){const t=i/14;x.lineTo(230-t*200+rnd()*16,24+t*200+Math.sin(t*9)*14+rnd()*14)}x.closePath();x.clip();
   x.fillStyle='#d8ccb0';x.fillRect(0,0,w,h);const g=x.createRadialGradient(60,60,30,40,40,260);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.55,'rgba(120,70,20,.5)');g.addColorStop(.8,'rgba(30,14,4,.95)');g.addColorStop(1,'rgba(0,0,0,1)');x.fillStyle=g;x.fillRect(0,0,w,h);
   x.fillStyle='#22284a';x.font='italic 22px Georgia';x.save();x.translate(34,72);x.rotate(-.02);x.fillText('...change the will',0,0);x.fillText('before Thurs',0,30);x.restore();x.restore()}),
 night:ctex(256,384,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0a1430');g.addColorStop(.6,'#1e3060');g.addColorStop(1,'#46588a');x.fillStyle=g;x.fillRect(0,0,w,h);
   x.fillStyle='#050812';for(let i=0;i<8;i++){const tx=i/7*w+(rnd()-.5)*20,th=h*(.3+rnd()*.25),tw=w*.13;for(let k=0;k<5;k++){const yy=h*.92-k*th*.17;x.beginPath();x.moveTo(tx-tw*(1-k*.17),yy);x.lineTo(tx,yy-th*.36);x.lineTo(tx+tw*(1-k*.17),yy);x.fill()}}
   const s=x.createLinearGradient(0,h*.85,0,h);s.addColorStop(0,'#8a9cc8');s.addColorStop(1,'#c8d4ee');x.fillStyle=s;x.fillRect(0,h*.88,w,h*.12);for(let i=0;i<60;i++){x.fillStyle='rgba(235,240,255,.8)';x.beginPath();x.arc(rnd()*w,rnd()*h*.85,.8+rnd()*1.4,0,TAU);x.fill()}}),
 dial:ctex(256,256,(x,w,h)=>{x.fillStyle='#e8dcc0';x.fillRect(0,0,w,h);x.translate(w/2,h/2);x.fillStyle='#1a1410';x.font='bold 30px Georgia';x.textAlign='center';x.textBaseline='middle';
   for(let i=1;i<=12;i++){const a=i/12*TAU;if(i%3===0)x.fillText(String(i),Math.sin(a)*92,-Math.cos(a)*92);else x.fillRect(Math.sin(a)*96-3,-Math.cos(a)*96-3,6,6)}
   x.strokeStyle='#1a1410';x.lineCap='round';const hr=(10+5/60)/12*TAU,mn=5/60*TAU;x.lineWidth=8;x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(hr)*54,-Math.cos(hr)*54);x.stroke();x.lineWidth=5;x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(mn)*84,-Math.cos(mn)*84);x.stroke();x.fillStyle='#1a1410';x.beginPath();x.arc(0,0,7,0,TAU);x.fill()}),
 photo:ctex(256,192,(x,w,h)=>{x.fillStyle='#e8dcc0';x.fillRect(0,0,w,h);const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#b8a080');g.addColorStop(.6,'#8a7458');g.addColorStop(1,'#5a4a36');x.fillStyle=g;x.fillRect(12,12,w-24,h-24);
   x.fillStyle='rgba(50,36,24,.85)';for(let i=0;i<6;i++){const px=40+i*34+(rnd()-.5)*8,py=150;x.beginPath();x.arc(px,py-62,7,0,TAU);x.fill();x.fillRect(px-9,py-54,18,40);x.fillRect(px-7,py-14,5,20);x.fillRect(px+2,py-14,5,20);if(i%2){x.save();x.translate(px+8,py-50);x.rotate(-.9);x.fillRect(0,0,30,2.5);x.restore()}}
   for(let i=0;i<1500;i++){x.fillStyle=`rgba(60,40,20,${rnd()*.15})`;x.fillRect(12+rnd()*(w-24),12+rnd()*(h-24),1,1)}}),
 cardBack:ctex(128,192,(x,w,h)=>{x.fillStyle='#f2ece0';x.fillRect(0,0,w,h);x.fillStyle='#7a1c20';x.fillRect(8,8,w-16,h-16);x.strokeStyle='rgba(242,236,224,.6)';x.lineWidth=1.5;for(let i=-h;i<w+h;i+=10){x.beginPath();x.moveTo(i,8);x.lineTo(i+h,h);x.stroke();x.beginPath();x.moveTo(i,h);x.lineTo(i+h,8);x.stroke()}x.strokeStyle='#f2ece0';x.lineWidth=3;x.strokeRect(14,14,w-28,h-28)}),
};
const cardFace=(r,s)=>ctex(128,192,(x,w,h)=>{x.fillStyle='#f4efe4';x.fillRect(0,0,w,h);const red=s==='♥'||s==='♦';x.fillStyle=red?'#a01c20':'#141414';x.font='bold 26px Georgia';x.textAlign='center';x.fillText(r,18,30);x.font='22px serif';x.fillText(s,18,54);
  x.save();x.translate(w-18,h-30);x.rotate(Math.PI);x.font='bold 26px Georgia';x.fillText(r,0,0);x.font='22px serif';x.fillText(s,0,24);x.restore();x.font='64px serif';x.fillText(s,w/2,h/2+22)});
const M=(c,o={})=>new T.MeshStandardMaterial({color:c,roughness:.7,metalness:0,...o});
const boardsV=TX.boards;
const MAT={floor:M('#ffffff',{map:TX.floor,roughness:.4}),wall:M('#d8c8b8',{map:TX.boards,roughness:.6}),ceil:M('#ffffff',{map:TX.plaster,roughness:1}),beam:M('#6a5240',{map:TX.floor,roughness:.6}),
  stone:M('#ffffff',{map:TX.stone,bumpMap:TX.stone,bumpScale:.035,roughness:.92}),soot:M('#ffffff',{map:TX.soot,roughness:1}),brass:M('#c9a24a',{metalness:.85,roughness:.3}),iron:M('#151413',{metalness:.3,roughness:.55}),
  wood:M('#7a5038',{map:TX.floor,roughness:.38}),walnut:M('#5a3a26',{map:TX.floor,roughness:.3}),leather:M('#ffffff',{map:TX.leather,roughness:.45}),tufted:M('#ffffff',{map:TX.tufted,bumpMap:TX.tufted,bumpScale:.012,roughness:.45}),
  rug:M('#ffffff',{map:TX.rug,roughness:.95}),velvet:M('#1c3a3e',{map:TX.velvet,roughness:.82}),curtain:M('#3a1418',{map:TX.velvet,roughness:.85}),bone:M('#d8ccb0',{roughness:.55}),
  glass:new T.MeshPhysicalMaterial({color:'#1e262a',roughness:.02,metalness:0,transparent:true,opacity:.3,clearcoat:1,depthWrite:false}),
  whisky:new T.MeshPhysicalMaterial({color:'#9a4a0c',roughness:.1,transparent:true,opacity:.82}),port:new T.MeshPhysicalMaterial({color:'#4a0612',roughness:.1,transparent:true,opacity:.86}),
  shade:M('#e8d4a8',{emissive:'#ffb860',emissiveIntensity:1.1,roughness:.8,side:T.DoubleSide}),wax:M('#efe6d0',{roughness:.6})};
const add=(geo,mat,x,y,z,o={})=>{const m=new T.Mesh(geo,mat);m.position.set(x,y,z);if(o.ry)m.rotation.y=o.ry;if(o.rx)m.rotation.x=o.rx;if(o.rz)m.rotation.z=o.rz;m.castShadow=o.cast!==false;m.receiveShadow=true;(o.to||scene).add(m);return m};
const RB=(w,h,d,r=.02,s=3)=>new T.RoundedBoxGeometry(w,h,d,s,Math.max(.0005,Math.min(r,w/2-.001,h/2-.001,d/2-.001)));
const BOX=(w,h,d)=>new T.BoxGeometry(w,h,d);
const lathe=(pts,seg=32)=>new T.LatheGeometry(pts.map(p=>new T.Vector2(p[0],p[1])),seg);
const grp=(x,y,z,ry=0,to=scene)=>{const g=new T.Group();g.position.set(x,y,z);g.rotation.y=ry;to.add(g);return g};
/* ---------- the room: boards, beams, oak floor; 6 m by 6.6 m ---------- */
const W=6,D=6.6,H=3.3,hw=W/2;
const plane=(w,h,mat,x,y,z,ry=0,rx=0)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),mat);m.position.set(x,y,z);m.rotation.set(rx,ry,0);m.receiveShadow=true;scene.add(m);return m};
plane(W,D,MAT.floor,0,0,D/2,0,-Math.PI/2);plane(W,D,MAT.ceil,0,H,D/2,0,Math.PI/2);plane(D,H,MAT.wall,-hw,H/2,D/2,Math.PI/2);plane(D,H,MAT.wall,hw,H/2,D/2,-Math.PI/2);plane(W,H,MAT.wall,0,H/2,0,0);
// back wall with the window cut out of it
const WX=-1.0,WY0=.75,WY1=2.75,WW=1.5;
{const sh=new T.Shape();sh.moveTo(-hw,0);sh.lineTo(hw,0);sh.lineTo(hw,H);sh.lineTo(-hw,H);sh.lineTo(-hw,0);const ho=new T.Path();ho.moveTo(-WX-WW/2,WY0);ho.lineTo(-WX-WW/2,WY1);ho.lineTo(-WX+WW/2,WY1);ho.lineTo(-WX+WW/2,WY0);ho.lineTo(-WX-WW/2,WY0);sh.holes.push(ho);
 const g=new T.ShapeGeometry(sh);const p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+hw)/W,p.getY(i)/H);const m=new T.Mesh(g,MAT.wall);m.position.z=D;m.rotation.y=Math.PI;m.receiveShadow=true;scene.add(m)}
for(const [w,h,x,y,dz] of [[.08,WY1-WY0,WX-WW/2,(WY0+WY1)/2,0],[.08,WY1-WY0,WX+WW/2,(WY0+WY1)/2,0],[WW,.08,WX,WY1,0]])add(BOX(w===.08?.04:w,h===.08?.04:h,.3),MAT.wall,x,y,D+.15,{cast:false});
add(RB(WW+.14,.06,.32,.01),MAT.wood,WX,WY0-.02,D-.08);add(RB(WW+.3,.05,.1,.01),MAT.wood,WX,WY0-.08,D-.02);
for(const [w,h,x,y] of [[.08,WY1-WY0+.1,WX-WW/2-.02,(WY0+WY1)/2],[.08,WY1-WY0+.1,WX+WW/2+.02,(WY0+WY1)/2],[WW+.14,.09,WX,WY1+.03],[WW,.05,WX,(WY0+WY1)/2+.25],[.05,WY1-WY0,WX,(WY0+WY1)/2]])add(RB(w,h,.08,.008),MAT.walnut,x,y,D+.02);
// outside: night, pines, falling snow
add(new T.PlaneGeometry(4,5),new T.MeshBasicMaterial({map:TX.night}),WX,1.6,D+1.6,{ry:Math.PI,cast:false}).material.color.setScalar(.85);
{const n=500,pp=new Float32Array(n*3);for(let i=0;i<n;i++){pp[i*3]=WX+(rnd()-.5)*3;pp[i*3+1]=rnd()*4;pp[i*3+2]=D+.2+rnd()*1.3}const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pp,3));
 const sn=new T.Points(g,new T.PointsMaterial({color:'#e6ecff',size:.012,transparent:true,opacity:.85,depthWrite:false}));scene.add(sn);ANIM.push((dt,t)=>{const a=g.attributes.position.array;for(let i=0;i<n;i++){a[i*3+1]-=dt*(.35+(i%7)*.05);a[i*3]+=dt*.12*Math.sin(t+i);if(a[i*3+1]<0)a[i*3+1]=4}g.attributes.position.needsUpdate=true})}
// heavy curtains
function curtain(x0,width,tieY){const g=new T.PlaneGeometry(width,2.9,40,60);const p=g.attributes.position;for(let i=0;i<p.count;i++){const u=p.getX(i)/width+.5,v=p.getY(i)/2.9+.5;let pinch=1;if(tieY){const t=Math.exp(-Math.pow((v-tieY)/.08,2));pinch=1-.55*t}
  const fold=Math.sin(u*TAU*4.2)*.04+Math.sin(u*TAU*9.3)*.012;p.setX(i,(u-.5)*width*(v<tieY?(.55+.45*Math.pow(1-v/tieY,.7)):pinch));p.setZ(i,fold*(.6+.4*v))}g.computeVertexNormals();const m=add(g,MAT.curtain,x0,WY1+.15-2.9/2,D-.18,{ry:Math.PI});m.material.side=T.DoubleSide;return m}
curtain(WX-WW/2-.12,.55,.4);curtain(WX+WW/2+.12,.55,.4);add(new T.CylinderGeometry(.018,.018,WW+.9,12),MAT.brass,WX,WY1+.17,D-.15,{rz:Math.PI/2});for(const e of [-1,1])add(new T.SphereGeometry(.035,14,10),MAT.brass,WX+e*(WW/2+.47),WY1+.17,D-.15);
// skirting, picture rail, beams
for(const [len,x,z,ry] of [[W,0,D-.012,0],[W,0,.012,0],[D,-hw+.012,D/2,Math.PI/2],[D,hw-.012,D/2,Math.PI/2]]){add(BOX(len,.14,.03),MAT.walnut,x,.07,z,{ry,cast:false});add(BOX(len,.04,.035),MAT.walnut,x,2.45,z,{ry,cast:false})}
for(let z=.7;z<D;z+=1.3)add(RB(W,.24,.22,.02),MAT.beam,0,H-.12,z,{cast:false});
/* ---------- the fireplace: fieldstone to the beams, timber mantel, raised hearth ---------- */
const FZ=3.6,FW=1.1,FHo=.92,BW=2.3,BD=.5,FX=hw-BD;// opening width/height, breast width/depth; FX = front face
const stoneAt=(w,h,d,x,y,z)=>{const g=BOX(d,h,w);const uv=g.attributes.uv,nm=g.attributes.normal;for(let i=0;i<uv.count;i++){const ny=Math.abs(nm.getY(i))>.5,nx=Math.abs(nm.getX(i))>.5;const su=nx?w:d,sv=ny?w:h;uv.setXY(i,uv.getX(i)*su/1.6,uv.getY(i)*sv/1.6)}return add(g,MAT.stone,x,y,z,{})};
stoneAt((BW-FW)/2,FHo,BD,hw-BD/2,FHo/2,FZ-FW/2-(BW-FW)/4);stoneAt((BW-FW)/2,FHo,BD,hw-BD/2,FHo/2,FZ+FW/2+(BW-FW)/4);stoneAt(BW,H-FHo,BD,hw-BD/2,FHo+(H-FHo)/2,FZ);
// firebox: sooted back and sides, slightly splayed
add(BOX(.02,FHo,FW),MAT.soot,hw-BD+.42,FHo/2,FZ,{cast:false});for(const e of [-1,1])add(BOX(.42,FHo,.02),MAT.soot,hw-BD+.21,FHo/2,FZ+e*(FW/2-.01),{cast:false});add(BOX(.42,.02,FW),MAT.soot,hw-BD+.21,FHo-.01,FZ,{cast:false});
// hearth and mantel beam
stoneAt(BW+.3,.12,.62,FX-.31+.05,.06,FZ).castShadow=false;add(RB(.5,.02,FW,.005),M('#1a1614',{roughness:1}),hw-BD+.2,.121,FZ,{cast:false});
add(RB(.34,.26,BW+.36,.03),M('#6a4a32',{map:TX.floor,roughness:.5}),FX-.12,FHo+.2,FZ);add(RB(.36,.04,BW+.4,.01),M('#5a3e2a',{map:TX.floor,roughness:.45}),FX-.13,FHo+.35,FZ);
/* ---------- the fire: logs, andirons, embers, flames, sparks ---------- */
const FC=new T.Vector3(hw-BD+.2,.13,FZ);
for(const e of [-1,1]){const g=grp(FC.x-.05,.12,FZ+e*.32);add(RB(.04,.24,.04,.008),MAT.iron,0,.12,-.1*0,{to:g});add(new T.CylinderGeometry(.012,.012,.42,8),MAT.iron,.1,.04,0,{to:g,rz:Math.PI/2});
  add(lathe([[0,0],[.04,0],[.05,.04],[.03,.1],[.045,.14],[0,.2]]),MAT.brass,-.1,.0,0,{to:g});add(new T.SphereGeometry(.035,16,12),MAT.brass,-.1,.22,0,{to:g})}
add(RB(.36,.03,.62,.006),MAT.iron,FC.x,.17,FZ);for(let i=0;i<6;i++)add(BOX(.36,.012,.012),MAT.iron,FC.x,.19,FZ-.27+i*.11);
const barkT=ctex(128,256,(x,w,h)=>{x.fillStyle='#2a1e16';x.fillRect(0,0,w,h);for(let i=0;i<40;i++){x.strokeStyle=`rgba(0,0,0,${.3+rnd()*.4})`;x.lineWidth=1+rnd()*3;const px=rnd()*w;x.beginPath();x.moveTo(px,0);x.lineTo(px+rnd()*10-5,h);x.stroke()}noise(x,w,h,.08,1500)},[2,1]);
barkT.repeat.set(3,2);const ringM=M('#ffffff',{map:ctex(64,64,(x,w,h)=>{x.fillStyle='#8a6440';x.fillRect(0,0,w,h);x.strokeStyle='rgba(60,36,18,.6)';for(let r=4;r<32;r+=3+rnd()*2){x.beginPath();x.arc(32+rnd(),32+rnd(),r,0,TAU);x.stroke()}x.strokeStyle='#1a0e08';x.lineWidth=5;x.beginPath();x.arc(32,32,30,0,TAU);x.stroke()}),roughness:.9});const logM=M('#ffffff',{map:barkT,bumpMap:barkT,bumpScale:.01,roughness:.95}),charM=M('#140c08',{roughness:1,emissive:'#ff4a10',emissiveIntensity:.0});
for(const [y,z,rx,ry,r,l] of [[.24,FZ-.08,0,.15,.07,.62],[.24,FZ+.1,0,-.2,.065,.6],[.36,FZ+.0,0,.6,.06,.52]]){const m=add(new T.CylinderGeometry(r,r*1.05,l,16,1),logM,FC.x,y,z,{rx:Math.PI/2});m.rotation.set(Math.PI/2,0,ry);
  for(const e of [-1,1])add(new T.CircleGeometry(r*.98,20),ringM,0,e*l/2+e*.001,0,{to:m,rx:-e*Math.PI/2,cast:false})}
const embM=M('#1a0804',{emissive:'#ff4a10',emissiveIntensity:1.2,roughness:1});for(let i=0;i<90;i++){const m=add(new T.IcosahedronGeometry(.006+rnd()*.01,1),embM,FC.x+(rnd()-.5)*.28,.19+rnd()*.03,FZ+(rnd()-.5)*.5,{cast:false});m.rotation.set(rnd()*3,rnd()*3,0)}
const fireMat=new T.ShaderMaterial({uniforms:{time:{value:0},seed:{value:0}},transparent:true,depthWrite:false,blending:T.AdditiveBlending,side:T.DoubleSide,
  vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:`uniform float time;uniform float seed;varying vec2 vUv;
  float hs(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float ns(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);return mix(mix(hs(i),hs(i+vec2(1,0)),u.x),mix(hs(i+vec2(0,1)),hs(i+vec2(1,1)),u.x),u.y);}
  float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*ns(p);p*=2.03;a*=.5;}return v;}
  void main(){vec2 uv=vUv;float n=fbm(vec2(uv.x*4.+seed,uv.y*2.6-time*1.9));float n2=fbm(vec2(uv.x*7.-seed,uv.y*4.-time*2.6));
   float shape=(1.-uv.y)*1.35-abs(uv.x-.5)*(1.9+uv.y*1.6);float f=shape+(n-.5)*1.1+(n2-.5)*.35;f=clamp(f,0.,1.);f=pow(f,1.6)*smoothstep(0.,.08,uv.y);
   vec3 col=mix(vec3(.5,.05,.0),vec3(1.,.45,.08),smoothstep(.08,.4,f));col=mix(col,vec3(1.,.82,.45),smoothstep(.45,.85,f));gl_FragColor=vec4(col*f*3.2,1.);}`});
const flames=[];for(let i=0;i<4;i++){const m=fireMat.clone();m.uniforms.seed.value=i*3.7;const f=add(new T.PlaneGeometry(.56,.62),m,FC.x,.48,FZ+(i-1.5)*.05,{ry:Math.PI/2+(i-1.5)*.55,cast:false});f.renderOrder=5;flames.push(f)}
{const n=40,pp=new Float32Array(n*3),life=new Float32Array(n);for(let i=0;i<n;i++){life[i]=rnd()}const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pp,3));
 const sp=new T.Points(g,new T.PointsMaterial({color:'#ffa040',size:.012,transparent:true,depthWrite:false,blending:T.AdditiveBlending}));scene.add(sp);
 ANIM.push((dt,t)=>{const a=g.attributes.position.array;for(let i=0;i<n;i++){life[i]+=dt*(.35+(i%5)*.06);if(life[i]>1)life[i]-=1;const L=life[i];a[i*3]=FC.x+Math.sin(i*7.1+t*.7)*.06*L;a[i*3+1]=.25+L*.85;a[i*3+2]=FZ+Math.sin(i*3.3)*.25+Math.sin(t*2+i)*.04*L}g.attributes.position.needsUpdate=true})}
// the corner of a letter in the ash, at the front of the grate
{const sc=new T.Mesh(new T.PlaneGeometry(.11,.11,8,8),M('#ffffff',{map:TX.scrap,transparent:true,alphaTest:.3,roughness:1,side:T.DoubleSide}));const p=sc.geometry.attributes.position;for(let i=0;i<p.count;i++)p.setZ(i,Math.pow(p.getX(i)+.055,2)*1.6);sc.geometry.computeVertexNormals();
 sc.rotation.set(-Math.PI/2,0,1.9);sc.scale.x=-1;sc.position.set(FX+.035,.128,FZ+.14);scene.add(sc);(_H.hook||(()=>{}))('scrap',sc)}
/* ---------- fire irons on their stand: brush, shovel, tongs, and a fourth hook ---------- */
{const g=grp(FX-.14,.12,FZ+.9);add(lathe([[0,0],[.12,0],[.12,.02],[.05,.04],[0,.045]]),MAT.brass,0,0,0,{to:g});add(new T.CylinderGeometry(.012,.012,.68,10),MAT.brass,0,.36,0,{to:g});add(new T.TorusGeometry(.04,.009,8,20),MAT.brass,0,.74,0,{to:g});
 const hooks=[[1,0],[0,1],[-1,0],[0,-1]];hooks.forEach(([hx,hz],i)=>{const a=Math.atan2(hz,hx);const h=add(new T.TorusGeometry(.018,.005,6,12,Math.PI*1.2),MAT.brass,hx*.05,.66,hz*.05,{to:g});h.rotation.set(0,-a,Math.PI*.9);
   if(i===3){const ps=grp(hx*.065,.66,hz*.065,0,g);ps.rotation.set(hz*.05,0,-hx*.05);(_H.hook||(()=>{}))('pokerSlot',ps,{a});return}const tg=grp(hx*.065,.66,hz*.065,0,g);if(i===2)(_H.hook||(()=>{}))('tongs',tg);tg.rotation.set(hz*.05,0,-hx*.05);add(new T.TorusGeometry(.016,.004,6,12),MAT.brass,0,.0,0,{to:tg,ry:a});add(new T.CylinderGeometry(.0065,.0065,.56,8),MAT.brass,0,-.3,0,{to:tg});add(new T.SphereGeometry(.014,10,8),MAT.brass,0,.02,0,{to:tg});
   if(i===0){add(new T.CylinderGeometry(.03,.024,.11,12),M('#2a2420',{roughness:1}),0,-.62,0,{to:tg})}
   if(i===1){add(RB(.09,.008,.11,.003),MAT.iron,0,-.6,0,{to:tg,rx:-.3})}
   if(i===2){add(new T.CylinderGeometry(.0065,.0065,.56,8),MAT.brass,.014,-.3,0,{to:tg});for(const e of [0,.014])add(RB(.012,.05,.03,.004),MAT.iron,e,-.6,0,{to:tg})}})}
/* ---------- on the mantel: clock, candlesticks, photograph; antlers above ---------- */
const MY=FHo+.37,MX=FX-.12;
{const ck=grp(MX,MY,FZ,-Math.PI/2);const sh=new T.Shape();sh.moveTo(-.13,0);sh.lineTo(.13,0);sh.lineTo(.13,.14);sh.absarc(0,.14,.13,0,Math.PI,false);sh.lineTo(-.13,0);
 add(new T.ExtrudeGeometry(sh,{depth:.09,bevelEnabled:true,bevelThickness:.008,bevelSize:.008,bevelSegments:3,curveSegments:32}),M('#3a2414',{map:TX.floor,roughness:.25}),0,.03,-.045,{to:ck});add(RB(.32,.03,.13,.008),M('#2a1a10',{roughness:.3}),0,.015,0,{to:ck});
 add(new T.CircleGeometry(.085,40),M('#ffffff',{map:TX.dial,roughness:.3}),0,.15,.055,{to:ck,cast:false});add(new T.TorusGeometry(.086,.008,8,40),MAT.brass,0,.15,.056,{to:ck})}
const candles=[];for(const dz of [-.78,.78]){const g=grp(MX,MY,FZ+dz);add(lathe([[0,0],[.05,0],[.05,.012],[.02,.03],[.014,.08],[.024,.1],[.012,.16],[.012,.22],[.026,.23],[.026,.24],[0,.24]]),MAT.brass,0,0,0,{to:g});
 add(new T.CylinderGeometry(.012,.012,.16,14),MAT.wax,0,.32,0,{to:g});const fl=new T.Sprite(new T.SpriteMaterial({map:ctex(32,64,(x,w,h)=>{const gr=x.createRadialGradient(16,40,1,16,36,22);gr.addColorStop(0,'rgba(255,250,220,1)');gr.addColorStop(.35,'rgba(255,190,90,.9)');gr.addColorStop(1,'rgba(255,120,30,0)');x.fillStyle=gr;x.beginPath();x.ellipse(16,38,10,24,0,0,TAU);x.fill()}),blending:T.AdditiveBlending,depthWrite:false}));
 fl.scale.set(.03,.06,1);fl.position.set(0,.43,0);g.add(fl);candles.push(fl)}
{const g=grp(MX+.02,MY,FZ-.42,-Math.PI/2);add(RB(.2,.16,.015,.004),MAT.brass,0,.09,0,{to:g,rx:-.12});add(new T.PlaneGeometry(.17,.13),M('#ffffff',{map:TX.photo,roughness:.5}),0,.092,.009,{to:g,rx:-.12,cast:false})}
{const g=grp(hw-BD+.03,2.12,FZ,-Math.PI/2);{const sh=new T.Shape();sh.moveTo(-.13,.12);sh.lineTo(.13,.12);sh.lineTo(.13,-.02);sh.quadraticCurveTo(.12,-.14,0,-.2);sh.quadraticCurveTo(-.12,-.14,-.13,-.02);sh.lineTo(-.13,.12);add(new T.ExtrudeGeometry(sh,{depth:.03,bevelEnabled:true,bevelThickness:.01,bevelSize:.01,bevelSegments:3}),M('#4a2e1c',{map:TX.floor,roughness:.35}),0,-.02,-.03,{to:g})}
 for(const s of [-1,1]){const beam=[[0,0,.05],[s*.12,.1,.1],[s*.28,.14,.12],[s*.42,.26,.1],[s*.5,.42,.06]];const c=new T.CatmullRomCurve3(beam.map(p=>new T.Vector3(...p)));add(new T.TubeGeometry(c,24,.022,8),MAT.bone,0,0,0,{to:g});
   for(const [t,dx,dy] of [[.3,.02,.16],[.5,.04,.2],[.7,.06,.18],[.9,.03,.14]]){const p=c.getPoint(t);const q=new T.CatmullRomCurve3([p.clone(),new T.Vector3(p.x+s*dx*.4,p.y+dy*.6,p.z+.02),new T.Vector3(p.x+s*dx,p.y+dy,p.z+.03)]);add(new T.TubeGeometry(q,10,.012,6),MAT.bone,0,0,0,{to:g})}}}
/* ---------- the chesterfield, drawn up to the fire ---------- */
{const g=grp(.35,0,FZ,Math.PI/2);const L=2.1,Dp=.92;
 for(const x of [-L/2+.1,L/2-.1])for(const z of [-Dp/2+.1,Dp/2-.1])add(lathe([[0,0],[.035,0],[.045,.04],[.03,.08],[0,.08]]),M('#2a1a10',{roughness:.35}),x,0,z,{to:g});
 add(RB(L,.28,Dp,.04),MAT.leather,0,.22,0,{to:g});for(const x of [-.66,0,.66])add(RB(.64,.14,.66,.06,4),MAT.leather,x,.43,.08,{to:g});
 add(RB(L,.5,.24,.06),MAT.tufted,0,.6,-Dp/2+.12,{to:g});add(new T.CylinderGeometry(.11,.11,L,24),MAT.leather,0,.83,-Dp/2+.12,{to:g,rz:Math.PI/2});
 for(const s of [-1,1]){add(RB(.22,.44,Dp,.05),MAT.tufted,s*(L/2-.11),.56,0,{to:g});add(new T.CylinderGeometry(.13,.13,Dp,24),MAT.leather,s*(L/2-.07),.8,0,{to:g,rx:Math.PI/2})}
 // the newspaper left on the seat
 const np=add(new T.PlaneGeometry(.36,.27),M('#ffffff',{map:TX.paperN,roughness:.95,side:T.DoubleSide}),-.55,.505,.15,{to:g,rx:-Math.PI/2,cast:false});np.rotation.z=.4}
/* ---------- two wing chairs, turned in toward each other ---------- */
function wing(x,z,ry,col){const g=grp(x,0,z,ry);const vel=M(col,{map:TX.velvet,roughness:.82});const legM=M('#2a1a10',{roughness:.35});
  for(const [lx,lz] of [[-.3,-.28],[.3,-.28],[-.3,.3],[.3,.3]])add(new T.CylinderGeometry(.022,.016,.14,10),legM,lx,.07,lz,{to:g});
  add(RB(.78,.24,.74,.04),vel,0,.26,0,{to:g});add(RB(.58,.13,.6,.06,4),vel,0,.44,.06,{to:g});
  const back=add(RB(.66,.78,.16,.07),vel,0,.86,-.3,{to:g});back.rotation.x=-.1;
  const sh=new T.Shape();sh.moveTo(.36,.36);sh.lineTo(-.04,.38);sh.bezierCurveTo(-.16,.5,-.16,.7,-.06,.82);sh.bezierCurveTo(.02,.98,.12,1.12,.36,1.2);sh.lineTo(.36,.36);
  for(const s of [-1,1]){const wg=new T.ExtrudeGeometry(sh,{depth:.07,bevelEnabled:true,bevelThickness:.02,bevelSize:.02,bevelSegments:3,curveSegments:20});wg.rotateY(Math.PI/2);add(wg,vel,s*.35-.035,0,0,{to:g});
    add(RB(.12,.2,.6,.04),vel,s*.33,.52,.04,{to:g});add(new T.CylinderGeometry(.07,.07,.62,20),vel,s*.34,.63,.05,{to:g,rx:Math.PI/2})}
  return g}
const chA=wing(1.75,FZ-1.45,.35,'#1a3a40'),chB=wing(1.75,FZ+1.45,Math.PI-.35,'#1a3a40');
// a glass by each: one with ice still in it
function tumbler(x,y,z,lvl,ice,to=scene){const g=grp(x,y,z,0,to);add(lathe([[0,0],[.036,0],[.04,.004],[.042,.09],[.038,.09],[.035,.008],[0,.008]],28),MAT.glass,0,0,0,{to:g,cast:false});
  if(lvl>0)add(new T.CylinderGeometry(.036,.034,lvl,24),MAT.whisky,0,.008+lvl/2,0,{to:g,cast:false});if(ice)for(let i=0;i<2;i++)(_H.hook||(()=>{}))('ice',add(RB(.022,.022,.022,.004),new T.MeshPhysicalMaterial({color:'#f0f6ff',roughness:.1,transparent:true,opacity:.55}),(i-.5)*.02,.008+lvl-.004,(i-.5)*.01,{to:g,cast:false,ry:i}));return g}
function sideTable(x,z){const g=grp(x,0,z);add(new T.CylinderGeometry(.22,.22,.025,40),MAT.walnut,0,.56,0,{to:g});add(new T.TorusGeometry(.22,.006,6,40),MAT.brass,0,.56,0,{to:g,rx:Math.PI/2});add(lathe([[0,0],[.14,0],[.14,.02],[.04,.04],[.025,.3],[.04,.54],[0,.55]]),MAT.walnut,0,0,0,{to:g});return g}
sideTable(2.45,FZ-1.95);tumbler(2.42,.573,FZ-1.95,.035,true);sideTable(2.45,FZ+1.95);(_H.hook||(()=>{}))('glassB',tumbler(2.48,.573,FZ+1.9,.022,false));
/* ---------- low table: the crossword, a cigar burning down ---------- */
{const g=grp(1.42,0,FZ);add(RB(.6,.04,1.1,.012),MAT.walnut,0,.42,0,{to:g});add(RB(.62,.012,1.12,.004),MAT.brass,0,.395,0,{to:g});for(const e of [-1,1])add(RB(.5,.38,.04,.01),MAT.walnut,0,.2,e*.45,{to:g});add(RB(.5,.02,.94,.006),MAT.walnut,0,.06,0,{to:g});
 add(lathe([[0,0],[.075,0],[.08,.03],[.06,.032],[.055,.018],[0,.018]],8),new T.MeshPhysicalMaterial({color:'#1e2830',roughness:.0,transparent:true,opacity:.55,clearcoat:1,flatShading:true}),.05,.44,-.25,{to:g,cast:false});
 add(new T.CylinderGeometry(.009,.009,.13,12),M('#5a3218',{roughness:.8}),.08,.468,-.24,{to:g,rz:Math.PI/2-.05,ry:.4});(_H.hook||(()=>{}))('ember',add(new T.CircleGeometry(.009,12),M('#3a1a0a',{emissive:'#ff5010',emissiveIntensity:1.5}),.145,.468,-.27,{to:g,ry:Math.PI/2+.4,cast:false}));
 const np=add(new T.PlaneGeometry(.3,.22),M('#ffffff',{map:TX.paperN,roughness:.95}),-.06,.4415,.22,{to:g,rx:-Math.PI/2,cast:false});np.rotation.z=-.25;add(new T.CylinderGeometry(.004,.004,.14,8),M('#c8a050'),.08,.446,.18,{to:g,rz:Math.PI/2,ry:.7,cast:false});
 add(RB(.05,.012,.035,.002),M('#c8b080'),-.15,.446,-.1,{to:g,ry:.3,cast:false})}
// cigar smoke
{const n=36,pp=new Float32Array(n*3),life=new Float32Array(n);for(let i=0;i<n;i++)life[i]=i/n;const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pp,3));
 const sm=new T.Points(g,new T.PointsMaterial({color:'#c8c8d0',size:.2,transparent:true,opacity:.025,depthWrite:false,map:ctex(32,32,(x,w,h)=>{const gr=x.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=gr;x.fillRect(0,0,w,h)})}));scene.add(sm);(_H.hook||(()=>{}))('smoke',sm);
 const o=new T.Vector3(1.42+.145*Math.cos(.4)-.0,.47,FZ-.25-.06);ANIM.push((dt,t)=>{const a=g.attributes.position.array;for(let i=0;i<n;i++){life[i]+=dt*.12;if(life[i]>1)life[i]-=1;const L=life[i];a[i*3]=o.x+Math.sin(L*6+t*.5+i)*.12*L+L*.1;a[i*3+1]=o.y+L*.9;a[i*3+2]=o.z+Math.sin(L*5+i*1.7)*.1*L}g.attributes.position.needsUpdate=true})}
/* ---------- the rug under it all ---------- */
add(new T.PlaneGeometry(3.4,2.6),MAT.rug,1.25,.004,FZ,{rx:-Math.PI/2,cast:false}).rotation.z=Math.PI/2;
/* ---------- standard lamp at the end of the sofa ---------- */
{const g=grp(.25,0,FZ+1.38);add(lathe([[0,0],[.16,0],[.16,.02],[.06,.04],[.02,.06],[.018,1.4],[.03,1.42],[0,1.42]]),MAT.brass,0,0,0,{to:g});
 const sh=add(lathe([[.13,0],[.2,0],[.2,.01],[.11,.3],[.1,.3]],40),MAT.shade,0,1.32,0,{to:g,cast:false});for(let i=0;i<60;i++){const a=i/60*TAU;add(new T.CylinderGeometry(.002,.002,.05,4),M('#c8a050'),Math.cos(a)*.2,1.3,Math.sin(a)*.2,{to:g,cast:false})}}
/* ---------- drinks trolley ---------- */
{const g=grp(-2.25,0,5.75,.5);const gl=new T.MeshPhysicalMaterial({color:'#1a2226',roughness:.02,transparent:true,opacity:.35,clearcoat:1,depthWrite:false});
 for(const [x,z] of [[-.38,-.2],[.38,-.2],[-.38,.2],[.38,.2]])add(new T.CylinderGeometry(.012,.012,.78,10),MAT.brass,x,.42,z,{to:g});for(const y of [.25,.72]){add(RB(.78,.01,.42,.004),gl,0,y,0,{to:g,cast:false}).renderOrder=1;for(const e of [-1,1]){add(RB(.82,.022,.014,.004),MAT.brass,0,y-.004,e*.22,{to:g});add(RB(.014,.022,.45,.004),MAT.brass,e*.4,y-.004,0,{to:g})}}
 for(const e of [-1,1]){add(new T.TorusGeometry(.1,.012,8,32),MAT.brass,.4,.1,e*.22,{to:g});add(new T.CylinderGeometry(.03,.03,.02,16),MAT.iron,.4,.1,e*.22,{to:g,rx:Math.PI/2});add(new T.SphereGeometry(.025,10,8),MAT.iron,-.38,.025,e*.2,{to:g})}
 add(new T.CylinderGeometry(.012,.012,.46,10),MAT.brass,-.46,.84,0,{to:g,rx:Math.PI/2});
 const dec=(x,z,lvl,mat)=>{const d=grp(x,.73,z,0,g);add(lathe([[0,0],[.055,0],[.06,.01],[.06,.15],[.035,.2],[.016,.23],[.016,.27],[.02,.28],[0,.28]],8),new T.MeshPhysicalMaterial({color:'#1c2428',roughness:.0,transparent:true,opacity:.4,clearcoat:1,flatShading:true,depthWrite:false}),0,0,0,{to:d,cast:false}).renderOrder=3;
   if(lvl>0)add(new T.CylinderGeometry(.05,.05,lvl,8),mat,0,.006+lvl/2,0,{to:d,cast:false}).renderOrder=2;add(new T.IcosahedronGeometry(.03,0),new T.MeshPhysicalMaterial({color:'#2a3438',roughness:.0,transparent:true,opacity:.55,flatShading:true}),0,.31,0,{to:d,cast:false})};
 dec(-.2,-.08,.025,MAT.whisky);dec(.0,.08,.11,new T.MeshPhysicalMaterial({color:'#b86a1c',roughness:.1,transparent:true,opacity:.8}));dec(.2,-.06,.09,MAT.port);
 {const s=grp(.3,.73,.12,0,g);add(new T.CylinderGeometry(.04,.04,.2,20),new T.MeshPhysicalMaterial({color:'#3a6aa0',roughness:.1,transparent:true,opacity:.6}),0,.1,0,{to:s,cast:false});add(lathe([[0,0],[.04,0],[.04,.03],[.02,.06],[.02,.09],[0,.1]]),M('#d8dce0',{metalness:.9,roughness:.2}),0,.2,0,{to:s});add(RB(.08,.012,.02,.004),M('#d8dce0',{metalness:.9,roughness:.2}),.04,.27,0,{to:s})}
 for(let i=0;i<4;i++){const t=tumbler(-.28+i*.09,.245,.08,0,false,g);t.rotation.x=Math.PI;t.position.y=.25+.09}
 add(lathe([[0,0],[.07,0],[.08,.14],[0,.14]],24),M('#c8ccd0',{metalness:.9,roughness:.15}),.18,.25,-.1,{to:g})}
/* ---------- card table by the window ---------- */
{const g=grp(-1.55,0,4.55,.2);add(RB(.84,.03,.84,.01),MAT.walnut,0,.72,0,{to:g});add(new T.PlaneGeometry(.74,.74),M('#ffffff',{map:TX.baize,roughness:1}),0,.7365,0,{to:g,rx:-Math.PI/2,cast:false});
 for(const [x,z] of [[-.38,-.38],[.38,-.38],[-.38,.38],[.38,.38]])add(new T.CylinderGeometry(.022,.015,.71,10),MAT.walnut,x,.355,z,{to:g});
 const cardG=new T.PlaneGeometry(.063,.088);const back=M('#ffffff',{map:TX.cardBack,roughness:.5});
 const card=(x,z,r,face,y=.738)=>{const m=add(cardG,face?M('#ffffff',{map:face,roughness:.5}):back,x,y,z,{to:g,rx:-Math.PI/2,cast:false});m.rotation.z=r;return m};
 for(let i=0;i<7;i++)card(-.2+i*.018,.24+Math.abs(i-3)*.004,-.3+i*.1,null,.738+i*.0004);
 for(let i=0;i<12;i++)card(.02,-.02,.05,null,.738+i*.0006);
 const faces=[['K','♥'],['7','♠'],['Q','♦']];faces.forEach(([r,s],i)=>card(.17+i*.02,.06+i*.012,.3+i*.35,cardFace(r,s),.738+i*.0005));
 for(let i=0;i<7;i++)card(.16+i*.02,-.27,.15-i*.12,null,.738+i*.0004);
 add(new T.PlaneGeometry(.1,.14),M('#ece4d0',{map:ctex(64,96,(x,w,h)=>{x.fillStyle='#ece4d0';x.fillRect(0,0,w,h);x.strokeStyle='rgba(60,60,90,.6)';x.beginPath();x.moveTo(w/2,4);x.lineTo(w/2,h-4);x.stroke();x.fillStyle='#2a2a4a';x.font='9px Georgia';[['H','I'],['40','20'],['60','90'],['110','90'],['','140']].forEach(([a,b],i)=>{x.fillText(a,8,14+i*14);x.fillText(b,w/2+6,14+i*14)})}),roughness:.9}),-.25,.738,-.2,{to:g,rx:-Math.PI/2,cast:false}).rotation.z=.4;
 add(new T.CylinderGeometry(.003,.003,.1,6),M('#c8a050'),-.18,.741,-.16,{to:g,rz:Math.PI/2,ry:.9,cast:false});
 const chair=(x,z,ry)=>{const c=grp(x,0,z,ry,g);for(const [lx,lz] of [[-.18,-.18],[.18,-.18],[-.18,.18],[.18,.18]])add(new T.CylinderGeometry(.016,.013,.44,8),MAT.walnut,lx,.22,lz,{to:c});add(RB(.42,.05,.42,.012),M('#3a1418',{map:TX.velvet,roughness:.8}),0,.46,0,{to:c});
   for(const e of [-1,1])add(RB(.03,.5,.03,.008),MAT.walnut,e*.18,.72,-.19,{to:c});add(RB(.42,.12,.025,.01),MAT.walnut,0,.9,-.19,{to:c});add(RB(.36,.04,.02,.008),MAT.walnut,0,.68,-.19,{to:c})};
 chair(0,.62,Math.PI+.1);chair(.05,-.72,.5)}
/* ---------- lights ---------- */
const hemi=new T.HemisphereLight('#4a5274','#3a2010',.42);scene.add(hemi);
const fireL=new T.PointLight('#ff8a3a',3.2,10,1.5);fireL.position.set(FX+.26,.72,FZ);fireL.castShadow=true;fireL.shadow.mapSize.set(1024,1024);fireL.shadow.bias=-.004;fireL.shadow.radius=4;scene.add(fireL);
const lampL=new T.PointLight('#ffc888',1.5,7,1.6);lampL.position.set(.25,1.45,FZ+1.38);scene.add(lampL);
const candL=new T.PointLight('#ffb060',.35,2.5,2);candL.position.set(MX-.1,MY+.45,FZ);scene.add(candL);
const roomL=new T.PointLight('#ffd0a0',.5,10,1.5);roomL.position.set(-.5,H-.4,3.2);scene.add(roomL);
const moonL=new T.SpotLight('#8aa6ff',1.6,10,.5,.8,1.2);moonL.position.set(WX,2.6,D+1.8);moonL.target.position.set(WX+.2,0,D-2.4);scene.add(moonL,moonL.target);moonL.castShadow=true;moonL.shadow.mapSize.set(1024,1024);moonL.shadow.bias=-.0008;
/* ---------- reflections: a small lit room for glass, brass and leather to mirror ---------- */
{const pm=new T.PMREMGenerator(renderer);const es=new T.Scene();es.background=new T.Color('#140c08');
 const eb=(c,k,x,y,z,sx,sy,sz)=>{const m=new T.Mesh(new T.BoxGeometry(sx,sy,sz),new T.MeshBasicMaterial({color:new T.Color(c).multiplyScalar(k)}));m.position.set(x,y,z);es.add(m)};
 eb('#3a2416',1,0,-2,0,12,.2,12);eb('#2a1a10',1,0,0,6,12,8,.2);eb('#2a1a10',1,0,0,-6,12,8,.2);eb('#2a1a10',1,-6,0,0,.2,8,12);
 eb('#ff7a2a',7,5,0,0,.2,1.2,2.4);eb('#ffd0a0',4,0,4,0,2.4,.2,2.4);eb('#ffc070',5,-1.5,1.6,2.4,.6,.8,.6);eb('#5a74b8',3,-2,1.4,-5.8,2,2.4,.2);
 const envT=pm.fromScene(es,.03).texture;scene.traverse(o=>{if(!o.isMesh)return;const m=o.material;if(!m||!m.isMeshStandardMaterial)return;if(m.isMeshPhysicalMaterial||m.metalness>.4||m===MAT.leather||m===MAT.tufted||m===MAT.walnut){m.envMap=envT;m.envMapIntensity=m.metalness>.4?1.0:(m.isMeshPhysicalMaterial?1.2:.35);m.needsUpdate=true}})}
const V={wide:{p:[-1.75,1.2,.95],t:[2.0,.72,4.0],fov:66,where:'Lounge · power on',text:'The lounge. A fire going, the chesterfield drawn up to it, two wing chairs either side of the hearth. Someone left a cigar burning.'},
 fire:{p:[.55,1.1,FZ-.85],t:[2.7,.52,FZ+.5],fov:62,where:'Lounge · close look',text:'The fireplace. Fieldstone to the beams, a log fire on brass andirons. The fire irons stand on the hearth.'},
 grate:{p:[FX-1.0,.78,FZ-.18],t:[FX+.08,.14,FZ+.12],fov:30,where:'Lounge · close look',text:'The grate. Under the logs, in the ash, a corner of paper the fire didn\'t finish.'},
 mantel:{p:[.75,1.7,FZ+.2],t:[2.7,1.78,FZ],fov:62,where:'Lounge · close look',text:'The mantel. A clock at five past ten, two candlesticks, a photograph of a shooting party. Antlers above.'},
 chairs:{p:[1.0,1.95,FZ-2.75],t:[2.0,.45,FZ+.9],fov:62,where:'Lounge · close look',text:'The two wing chairs, turned in toward each other. A glass by each. One still has ice in it.'},
 table:{p:[.85,1.0,FZ-.75],t:[1.45,.42,FZ-.05],fov:50,where:'Lounge · close look',text:'The low table. Today\'s paper folded to the crossword, half done. A cigar burning down in the ashtray.'},
 drinks:{p:[-1.05,1.4,4.45],t:[-2.25,.62,5.8],fov:50,where:'Lounge · close look',text:'The drinks trolley. Whisky, brandy, port, a soda siphon. The whisky decanter is nearly empty.'},
 cards:{p:[-1.25,1.45,3.75],t:[-1.55,.72,4.55],fov:50,where:'Lounge · close look',text:'A card table by the window. A hand left face down, the deck squared off, the score in pencil.'},
 window:{p:[-.9,1.6,4.2],t:[-1.0,1.7,6.8],fov:56,where:'Lounge · close look',text:'The window. Snow coming down past the glass, the pines black beyond it.'},
 dark:{p:[-1.75,1.2,.95],t:[2.0,.72,4.0],fov:66,where:'Lounge · power out',text:'The power goes. Only the fire now, and the candles on the mantel.',dark:true}};
return {views:V,exposure:1.4,darkExposure:0.3,bloom:[0.36, 0.35, 1.1],noEnv:true,update(t,dt,on,darkK){const fl=.86+.08*Math.sin(t*7.3)+.05*Math.sin(t*13.1+1.3)+.04*Math.sin(t*23.7);
  fireL.intensity=3.2*fl*(1+.25*darkK);fireL.position.y=.72+.03*Math.sin(t*5.1);embM.emissiveIntensity=1.0+.35*Math.sin(t*2.3);candL.intensity=.35*(.9+.1*Math.sin(t*11))*(1+darkK);candles.forEach((c,i)=>{c.scale.y=.06*(.92+.08*Math.sin(t*9+i*2))});
  flames.forEach(f=>f.material.uniforms.time.value=t);lampL.intensity=1.5*on;roomL.intensity=.5*on;MAT.shade.emissiveIntensity=1.1*on;hemi.intensity=.42-.24*darkK;moonL.intensity=1.6+1.6*darkK;
  }};});
