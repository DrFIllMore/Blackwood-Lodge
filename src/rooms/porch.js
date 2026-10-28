// ROOM {"title":"Blackwood Porch Proof","aria":"The front porch, rendered in 3D","loading":"Lighting the lantern…","where":"Porch · outside","text":"The front porch, from the yard. Snow on the boards and the rail, a lantern by the door. A line of footprints comes down the steps.","buttons":[["wide","The porch"],["door","Front door"],["prints","The steps"],["yard","The yard"],["lantern","Lantern"],["wood","Woodpile"],["dark","Power out"]]}
ROOM(31,H=>{const {T,TAU,rnd,ctex,noise,scene,ANIM,M,add,RB,BOX,lathe,grp,tube,lin}=H;
/* ---------- textures ---------- */
const TX={
 // weathered log: bark-stripped, silvered, with checks along the grain
 log:ctex(512,256,(x,w,h)=>{x.fillStyle='#5a4636';x.fillRect(0,0,w,h);for(let i=0;i<160;i++){const y=rnd()*h;x.strokeStyle=`rgba(${rnd()<.5?40:100},${rnd()<.5?32:90},${rnd()<.5?24:80},${.06+rnd()*.1})`;x.lineWidth=.6+rnd()*2.4;x.beginPath();x.moveTo(0,y);for(let k=1;k<=10;k++)x.lineTo(k*w/10,y+Math.sin(k+y)*2*rnd());x.stroke()}
   for(let i=0;i<14;i++){x.strokeStyle='rgba(20,10,4,.55)';x.lineWidth=1.5;const y=rnd()*h,x0=rnd()*w;x.beginPath();x.moveTo(x0,y);x.lineTo(x0+40+rnd()*120,y+rnd()*4-2);x.stroke()}
   for(let i=0;i<6;i++){const cx=rnd()*w,cy=rnd()*h;x.fillStyle='rgba(40,22,10,.6)';x.beginPath();x.ellipse(cx,cy,6,4,0,0,TAU);x.fill()}noise(x,w,h,.06,5000)},[3,1]),
 ring:ctex(128,128,(x,w,h)=>{x.fillStyle='#9a7650';x.fillRect(0,0,w,h);for(let r=4;r<62;r+=3+rnd()*3){x.strokeStyle=`rgba(70,44,22,${.3+rnd()*.3})`;x.lineWidth=1+rnd();x.beginPath();x.arc(64+rnd()*2,64+rnd()*2,r,0,TAU);x.stroke()}
   x.strokeStyle='rgba(30,16,6,.7)';x.lineWidth=2;x.beginPath();x.moveTo(64,64);x.lineTo(120,50);x.stroke();x.strokeStyle='#3a2414';x.lineWidth=8;x.beginPath();x.arc(64,64,60,0,TAU);x.stroke()}),
 boards:ctex(512,512,(x,w,h)=>{const n=6,pw=w/n;for(let i=0;i<n;i++){const t=rnd();x.fillStyle=`rgb(${92+t*24|0},${76+t*18|0},${62+t*14|0})`;x.fillRect(i*pw,0,pw,h);
     for(let g=0;g<16;g++){x.strokeStyle=`rgba(30,22,16,${.1+rnd()*.15})`;x.lineWidth=.6+rnd()*1.6;const gx=i*pw+rnd()*pw;x.beginPath();x.moveTo(gx,0);x.bezierCurveTo(gx+rnd()*8-4,h*.3,gx+rnd()*8-4,h*.7,gx+rnd()*4-2,h);x.stroke()}
     x.fillStyle='rgba(8,6,4,.85)';x.fillRect(i*pw,0,4,h)}noise(x,w,h,.05,6000)},[1,1]),
 oak:ctex(512,512,(x,w,h)=>{x.fillStyle='#4a2c18';x.fillRect(0,0,w,h);for(let i=0;i<130;i++){const xx=rnd()*w;x.strokeStyle=`rgba(${rnd()<.5?20:110},${rnd()<.5?10:66},${rnd()<.5?4:30},${.1+rnd()*.18})`;x.lineWidth=.6+rnd()*2.4;x.beginPath();x.moveTo(xx,0);for(let k=1;k<=8;k++)x.lineTo(xx+Math.sin(k*1.3+xx)*3*rnd(),k*h/8);x.stroke()}noise(x,w,h,.05)}),
 snow:ctex(256,256,(x,w,h)=>{x.fillStyle='#dfe6f2';x.fillRect(0,0,w,h);for(let i=0;i<2500;i++){x.fillStyle=`rgba(${rnd()<.5?150:255},${rnd()<.5?170:255},255,${rnd()*.25})`;x.fillRect(rnd()*w,rnd()*h,1+rnd()*2,1+rnd()*2)}},[6,6]),
 sky:ctex(32,512,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#02040c');g.addColorStop(.35,'#081228');g.addColorStop(.48,'#1c2c58');g.addColorStop(.5,'#2c3e6c');g.addColorStop(1,'#0a0f1c');x.fillStyle=g;x.fillRect(0,0,w,h)}),
 // warm interior seen through glass: lamplight, curtain edges, a frosted rim of snow at the bottom
 winGlow:ctex(256,256,(x,w,h)=>{const g=x.createRadialGradient(w*.55,h*.55,10,w*.5,h*.5,w*.7);g.addColorStop(0,'#ffcc88');g.addColorStop(.6,'#c8743a');g.addColorStop(1,'#4a2410');x.fillStyle=g;x.fillRect(0,0,w,h);
   x.fillStyle='rgba(58,22,14,.92)';x.fillRect(0,0,w*.14,h);x.fillRect(w*.86,0,w*.14,h);for(let i=0;i<5;i++){x.fillStyle=`rgba(30,8,6,${.12+rnd()*.12})`;x.fillRect(rnd()*w*.12,0,5,h);x.fillRect(w*.88+rnd()*w*.12,0,5,h)}
   const f=x.createLinearGradient(0,h,0,h*.75);f.addColorStop(0,'rgba(230,238,255,.85)');f.addColorStop(1,'rgba(230,238,255,0)');x.fillStyle=f;x.fillRect(0,h*.75,w,h*.25)}),
 fan:ctex(256,256,(x,w,h)=>{const g=x.createLinearGradient(0,h,0,0);g.addColorStop(0,'#ffd090');g.addColorStop(1,'#e09048');x.fillStyle=g;x.fillRect(0,0,w,h);for(let i=0;i<900;i++){x.fillStyle=`rgba(255,255,255,${rnd()*.12})`;x.fillRect(rnd()*w,rnd()*h,2,2)}}),
 marker:ctex(32,256,(x,w,h)=>{for(let i=0;i<8;i++){x.fillStyle=i%2?'#e8e4da':'#a8201c';x.fillRect(0,i*h/8,w,h/8)}noise(x,w,h,.08,300)}),
 bark:ctex(128,256,(x,w,h)=>{x.fillStyle='#3a2a1e';x.fillRect(0,0,w,h);for(let i=0;i<50;i++){x.strokeStyle=`rgba(0,0,0,${.3+rnd()*.4})`;x.lineWidth=1+rnd()*3;const px=rnd()*w;x.beginPath();x.moveTo(px,0);x.lineTo(px+rnd()*10-5,h);x.stroke()}noise(x,w,h,.08,1500)}),
 split:ctex(128,128,(x,w,h)=>{x.fillStyle='#b89468';x.fillRect(0,0,w,h);const cx=-20+rnd()*30,cy=-20+rnd()*30;for(let r=10;r<200;r+=5+rnd()*4){x.strokeStyle=`rgba(110,72,36,${.2+rnd()*.2})`;x.lineWidth=1.5;x.beginPath();x.arc(cx,cy,r,0,TAU);x.stroke()}for(let i=0;i<5;i++){x.strokeStyle='rgba(60,36,16,.5)';x.beginPath();x.moveTo(rnd()*w,rnd()*h);x.lineTo(rnd()*w,rnd()*h);x.stroke()}noise(x,w,h,.05,600)}),
};
const MAT={log:M('#9a9088',{map:TX.log,bumpMap:TX.log,bumpScale:.004,roughness:.88}),ring:M('#ffffff',{map:TX.ring,roughness:.85}),chink:M('#a89c88',{roughness:1}),deck:M('#b8aa9a',{map:TX.boards,roughness:.8}),
  oak:M('#c0a080',{map:TX.oak,roughness:.55}),iron:M('#151414',{metalness:.4,roughness:.55}),snow:M('#c8d0de',{map:TX.snow,roughness:.82}),brass:M('#b8923e',{metalness:.85,roughness:.35}),
  glow:M('#000000',{emissive:'#ffffff',emissiveMap:TX.winGlow,emissiveIntensity:1.0,roughness:.2}),fan:M('#000000',{emissive:'#ffffff',emissiveMap:TX.fan,emissiveIntensity:.9,roughness:.2}),trim:M('#3a2a20',{map:TX.oak,roughness:.6}),
  ice:new T.MeshPhysicalMaterial({color:'#cfe2f4',roughness:.05,transparent:true,opacity:.75,clearcoat:1})};
/* ---------- the facade sits at z=F, the porch runs in front of it, the yard in front of that ---------- */
const F=6.0,DY=.45,DZ0=3.5,RY=3.15,FY=2.72,FX0=-4.4,FX1=4.4;
const openings=[{x0:-.98,x1:.98,y0:DY-.05,y1:3.24},{x0:-3.55,x1:-2.05,y0:1.15,y1:2.45},{x0:2.05,x1:3.55,y0:1.15,y1:2.45}];
// logs: rows of round logs, split around the openings, chinking behind
add(new T.PlaneGeometry(FX1-FX0,RY+.4),MAT.chink,0,(RY+.4)/2-.1,F+.07,{ry:Math.PI,cast:false});
for(let k=0;k<12;k++){const y=.05+k*.275,r=.152;let segs=[[FX0-.25,FX1+.25]];for(const o of openings)if(y+r*.6>o.y0&&y-r*.6<o.y1){const ns=[];for(const [a,b] of segs){if(o.x1<=a||o.x0>=b){ns.push([a,b]);continue}if(o.x0>a)ns.push([a,o.x0]);if(o.x1<b)ns.push([o.x1,b])}segs=ns}
  for(const [a,b] of segs){if(b-a<.05)continue;const m=add(new T.CylinderGeometry(r,r*1.02,b-a,22,1),MAT.log,(a+b)/2,y,F,{rz:Math.PI/2});m.material.map.repeat.set((b-a)/2,1);
    for(const [ex,s] of [[a,-1],[b,1]])if(Math.abs(ex)>4.5)add(new T.CircleGeometry(r*.99,22),MAT.ring,ex+s*.001,y,F,{ry:s*Math.PI/2,cast:false})}}
// openings: timber casings, sills, the dark reveal
for(const o of openings){const w=o.x1-o.x0,h=o.y1-o.y0,cx=(o.x0+o.x1)/2;add(BOX(w,h,.02),M('#0a0806'),cx,(o.y0+o.y1)/2,F+.14,{cast:false});
  for(const e of [-1,1])add(RB(.13,h+.1,.2,.012),MAT.trim,cx+e*(w/2+.05),(o.y0+o.y1)/2,F-.03);add(RB(w+.36,.14,.22,.012),MAT.trim,cx,o.y1+.07,F-.03);
  if(o.x0<-1||o.x0>1){add(RB(w+.3,.06,.3,.01),MAT.trim,cx,o.y0-.03,F-.08);add(RB(w+.28,.05,.28,.02),MAT.snow,cx,o.y0+.02,F-.08,{cast:false})}}
// windows: four panes, warm lamplight inside, snow on the sills
for(const o of openings.slice(1)){const w=o.x1-o.x0,h=o.y1-o.y0,cx=(o.x0+o.x1)/2,cy=(o.y0+o.y1)/2;add(new T.PlaneGeometry(w,h),MAT.glow,cx,cy,F+.08,{ry:Math.PI,cast:false});
  for(const [bw,bh,bx,by] of [[.05,h,cx,cy],[w,.05,cx,cy],[.05,h,o.x0+.025,cy],[.05,h,o.x1-.025,cy],[w,.05,cx,o.y0+.025],[w,.05,cx,o.y1-.025]])add(RB(bw,bh,.06,.006),MAT.trim,bx,by,F+.05)}
/* ---------- front door from outside: oak pair, iron straps, warm fanlight and sidelights ---------- */
{const DW=1.3,DH=2.25,SL=.28,cx=0;add(new T.PlaneGeometry(1.96,2.85),M('#000'),0,DY+1.4,F+.12,{ry:Math.PI,cast:false});
 for(const e of [-1,1]){const lf=grp(cx+e*DW/4,DY,F+.06);for(let i=0;i<4;i++)add(RB(DW/2/4-.004,DH,.06,.006),MAT.oak,-DW/4+DW/16+i*DW/8,DH/2,0,{to:lf});
   for(const y of [.3,1.15,1.95]){add(RB(DW/2-.05,.05,.012,.004),MAT.iron,e*.015,y,-.035,{to:lf});for(let k=0;k<4;k++)add(new T.SphereGeometry(.011,10,8),MAT.iron,-DW/4+.07+k*(DW/2-.14)/3,y,-.042,{to:lf})}
   add(new T.TorusGeometry(.055,.009,10,26),MAT.iron,-e*(DW/4-.08),1.05,-.05,{to:lf});add(RB(.03,.12,.012,.004),MAT.iron,-e*(DW/4-.08),1.12,-.036,{to:lf})}
 for(const e of [-1,1]){const x=e*(DW/2+SL/2+.02);add(new T.PlaneGeometry(SL,DH-.5),MAT.fan,x,DY+.4+(DH-.5)/2,F+.07,{ry:Math.PI,cast:false});add(RB(SL+.04,.4,.08,.01),MAT.oak,x,DY+.2,F+.05);
   for(let k=1;k<4;k++)add(BOX(SL,.02,.03),MAT.trim,x,DY+.4+k*(DH-.5)/4,F+.04);add(BOX(.02,DH-.5,.03),MAT.trim,x,DY+.4+(DH-.5)/2,F+.04)}
 const fy=DY+DH+.02;add(new T.PlaneGeometry(1.9,.48),MAT.fan,0,fy+.24,F+.07,{ry:Math.PI,cast:false});for(let k=1;k<6;k++)add(BOX(.022,.48,.03),MAT.trim,-.95+k*1.9/6,fy+.24,F+.04);add(BOX(1.94,.04,.05),MAT.trim,0,fy,F+.04);
 // threshold, snow banked against it
 add(RB(1.98,.05,.24,.01),MAT.trim,0,DY+.01,F-.06);}
/* ---------- deck, steps, posts, rail, roof ---------- */
const PX=[-2.95,-1.05,1.05,2.95],PZ=DZ0+.08;
add(RB(9,.08,F-DZ0+.1,.01),MAT.deck,0,DY-.04,(F+DZ0)/2)
add(RB(9,.3,.06,.01),MAT.trim,0,DY-.2,DZ0);for(const x of [-4.2,-2.95,-1.05,1.05,2.95,4.2])add(BOX(.2,DY,.2),MAT.trim,x,DY/2,DZ0+.15);
// steps down to the yard
for(const [y,z] of [[.3,DZ0-.3],[.15,DZ0-.6]]){add(RB(2.0,.05,.32,.01),MAT.deck,0,y-.025,z);add(BOX(2.0,y-.05,.04),MAT.trim,0,(y-.05)/2,z-.14)}
for(const e of [-1,1])add(RB(.08,.4,.7,.01),MAT.trim,e*1.02,.2,DZ0-.42,{rx:-.0});
// posts with chamfers and caps
for(const x of PX){add(RB(.17,FY-DY,.17,.025),MAT.trim,x,DY+(FY-DY)/2,PZ);add(RB(.24,.07,.24,.015),MAT.trim,x,DY+.035,PZ)}
// rails, balusters; no rail across the steps
for(const [a,b] of [[-4.4,-2.95],[-2.95,-1.05],[1.05,2.95],[2.95,4.4]]){const L=b-a,cx=(a+b)/2;add(RB(L,.07,.11,.015),MAT.trim,cx,DY+.9,PZ);add(RB(L,.05,.07,.01),MAT.trim,cx,DY+.12,PZ);
  for(let x=a+.12;x<b-.06;x+=.13)add(BOX(.045,.74,.045),MAT.trim,x,DY+.5,PZ);
  // snow lying along the top rail, lumpy, overhanging a little
  const sg=new T.CylinderGeometry(.075,.075,L-.05,10,8,false,0,Math.PI);const p=sg.attributes.position;for(let i=0;i<p.count;i++){const yy=p.getY(i);p.setX(i,p.getX(i)*(1+.25*Math.sin(yy*5+cx)));p.setZ(i,p.getZ(i)*(.6+.2*Math.sin(yy*3.1)))}sg.computeVertexNormals();
  const s=add(sg,MAT.snow,cx,DY+.935,PZ,{rz:Math.PI/2});s.rotation.set(0,0,Math.PI/2);s.rotation.x=-Math.PI/2;s.scale.set(1,1,.55)}
// roof: beam, rafters, soffit boards, fascia, a thick cap of snow and icicles
add(RB(9.2,.2,.18,.015),MAT.trim,0,FY+.1,PZ);for(let x=-4.3;x<=4.31;x+=.6){const L=Math.hypot(F-PZ+.4,RY-FY),a=Math.atan2(RY-FY,F-PZ+.4);add(BOX(.08,.16,L),MAT.trim,x,(FY+RY)/2+.12,(F+PZ-.4)/2,{rx:-a})}
{const L=Math.hypot(F-PZ+.5,RY-FY),a=Math.atan2(RY-FY,F-PZ+.5);add(BOX(9.2,.03,L),MAT.deck,0,(FY+RY)/2+.22,(F+PZ-.5)/2,{rx:-a});add(RB(9.3,.2,.05,.01),MAT.trim,0,FY+.22,PZ-.42,{rx:-a});
 const sg=new T.BoxGeometry(9.5,.22,L+.05,60,2,14);const p=sg.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i);if(y>0)p.setY(i,y+.05*Math.sin(x*1.3)+.03*Math.sin(x*4.1+z*2));if(z<-L/2+.02){p.setZ(i,z-.06);p.setY(i,p.getY(i)*.55-.03)}}sg.computeVertexNormals();
 add(sg,MAT.snow,0,(FY+RY)/2+.36,(F+PZ-.5)/2-.05,{rx:-a});
 for(let i=0;i<46;i++){const x=-4.5+i*.2+rnd()*.1,l=.06+Math.pow(rnd(),2)*.4;add(new T.ConeGeometry(.012+l*.04,l,6),MAT.ice,x,FY+.25-l/2,PZ-.46,{rx:Math.PI,cast:false})}}
/* ---------- snow: a layer on the deck and treads, the yard in drifts, footprints pressed in ---------- */
const printGeo=(len,wid,depth,fresh)=>{const g=new T.PlaneGeometry(.52,.52,34,34);g.rotateX(-Math.PI/2);const p=g.attributes.position,col=[];
  for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i);const d1=Math.hypot(x/(wid*.5),(z-len*.12)/(len*.34)),d2=Math.hypot(x/(wid*.42),(z+len*.3)/(len*.19));const d=Math.min(d1,d2);let y=0,c=1;
    if(d<1){y=-depth*(1-Math.pow(d,fresh?8:3));if(d<.85&&fresh)y+=depth*.15*Math.max(0,Math.sin(z*140));c=.5+.35*d}else if(d<1.6){y=depth*.3*Math.sin((d-1)/.6*Math.PI)}
    if(Math.max(Math.abs(x),Math.abs(z))>.22)y*=Math.max(0,(.26-Math.max(Math.abs(x),Math.abs(z)))/.04);p.setY(i,y);col.push(c<1?c*.86:1,c<1?c*.92:1,c)}
  g.setAttribute('color',new T.Float32BufferAttribute(col,3));g.computeVertexNormals();return g};
const snowV=M('#c8d0de',{map:TX.snow,roughness:.82,vertexColors:true});
const PG=[printGeo(.31,.115,.065,true),printGeo(.31,.115,.065,true)],PO=printGeo(.36,.15,.05,false);
const print=(x,y,z,a,side)=>{const m=add(PG[side>0?0:1],snowV,x,y,z,{cast:false});m.rotation.y=a;if(side<0)m.scale.x=-1;return m};
// deck snow: thin, drifted against the wall and the rail posts
{const g=new T.PlaneGeometry(8.8,F-DZ0-.06,140,40);g.rotateX(-Math.PI/2);const p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i)+(F+DZ0)/2;const toWall=Math.max(0,1-(F-z)/.6),toEdge=Math.max(0,1-(z-DZ0)/.35),lip=Math.min(1,(z-DZ0+.03)/.12);
   const pathK=Math.min(1,Math.max(0,(Math.abs(x)-.55)/.4));p.setY(i,.012+(.09*toWall*toWall+.05*toEdge)*(.12+.88*pathK)+(.008*Math.sin(x*3.1+z*2)+.006*Math.sin(x*9.3))*pathK);p.setY(i,p.getY(i)*lip)}g.computeVertexNormals();const m=add(g,MAT.snow,0,DY+.002,(F+DZ0)/2,{cast:false})}
for(const [y,z] of [[.3,DZ0-.3],[.15,DZ0-.6]]){const g=new T.PlaneGeometry(2.0,.3,40,8);g.rotateX(-Math.PI/2);const p=g.attributes.position;for(let i=0;i<p.count;i++){const ax=Math.abs(p.getX(i)),zz=p.getZ(i);const lip=Math.min(1,(zz+.16)/.06);p.setY(i,(.018+(ax>.6?.012*Math.sin(p.getX(i)*4):0)+(ax>.85?.03:0))*lip)}g.computeVertexNormals();add(g,MAT.snow,0,y+.001,z,{cast:false});
  const lp=add(new T.CylinderGeometry(.022,.022,1.98,10,1),MAT.snow,0,y+.004,z-.155,{rz:Math.PI/2,cast:false});lp.scale.set(1,1,.8)}
{const lp=add(new T.CylinderGeometry(.03,.03,8.8,10,1),MAT.snow,0,DY+.006,DZ0+.01,{rz:Math.PI/2,cast:false});lp.scale.set(1,1,.8)}
// the yard: rolling drifts, a ridge banked against the porch skirt
const hAt=(x,z)=>{let y=.06+.08*Math.sin(x*.7)+.06*Math.sin(z*.9+x*.3)+.03*Math.sin(x*2.3+z*1.7);y+=.25*Math.exp(-Math.pow((z-(DZ0-.2))/.45,2))*(Math.abs(x)>1.1?1:0);y+=Math.max(0,-z-2)*.02;return y};
{const g=new T.PlaneGeometry(60,40,180,120);g.rotateX(-Math.PI/2);const p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i)+(DZ0-20.3);p.setY(i,z>DZ0-.1?-.2:hAt(x,z))}g.computeVertexNormals();add(g,MAT.snow,0,0,DZ0-20.3,{cast:false})}
// footprints: from the door, across the boards, down the steps, out across the yard toward the road; long stride, edges still sharp
const PR=[];{let side=1;const path=[[.05,F-.35],[.12,4.65],[.18,3.62]];for(const [x,z] of path){PR.push([x+side*.1,DY+.0145,z,Math.PI+.04,side]);side=-side}
 PR.push([.22+side*.1,.3+.0195,DZ0-.3,Math.PI+.05,side]);side=-side;PR.push([.26+side*.1,.15+.0195,DZ0-.6,Math.PI+.08,side]);side=-side;
 let x=.3,z=DZ0-1.55,a=Math.PI+.15;for(let i=0;i<9;i++){PR.push([x+side*.1*Math.cos(a-Math.PI),hAt(x,z)+.004,z,a,side]);side=-side;a+=.07;x+=Math.sin(a-Math.PI)*-.95;z-=Math.cos(a-Math.PI)*.95}
 for(const [x,y,z,a,s] of PR)print(x,y,z,a,s);
 let ox=-2.9,oz=-2.6,oside=1;for(let i=0;i<8;i++){const a=Math.atan2(-.55-ox, DZ0-1.0-oz);const m=add(PO,snowV,ox+oside*.09*Math.cos(a),hAt(ox,oz)+.004,oz,{cast:false});m.rotation.y=a;if(oside<0)m.scale.x=-1;oside=-oside;ox+=Math.sin(a)*.62;oz+=Math.cos(a)*.62}}
/* ---------- props: lantern by the door, woodpile and shovel, the buried road marker ---------- */
const LP=new T.Vector3(-1.32,2.02,F-.32);
add(RB(.04,.04,.34,.01),MAT.iron,LP.x,LP.y+.33,F-.17);add(new T.TorusGeometry(.03,.006,8,18),MAT.iron,LP.x,LP.y+.3,LP.z,{});
const lan=grp(LP.x,LP.y+.27,LP.z);{const tin=M('#2a2a28',{metalness:.6,roughness:.45});add(new T.TorusGeometry(.028,.005,8,16),tin,0,0,0,{to:lan,rx:Math.PI/2});
 add(lathe([[0,0],[.02,0],[.075,-.04],[.072,-.06],[0,-.06]],24),tin,0,-.01,0,{to:lan});
 add(lathe([[.045,0],[.07,.03],[.075,.08],[.06,.13],[.04,.15]],24),new T.MeshPhysicalMaterial({color:'#fff4e0',roughness:.1,transparent:true,opacity:.35,depthWrite:false}),0,-.23,0,{to:lan,cast:false});
 for(let k=0;k<4;k++){const a=k/4*TAU;tube([[Math.cos(a)*.065,-.08,Math.sin(a)*.065],[Math.cos(a)*.08,-.15,Math.sin(a)*.08],[Math.cos(a)*.065,-.22,Math.sin(a)*.065]],.003,tin,{to:lan})}
 add(lathe([[0,0],[.08,0],[.085,.02],[.06,.04],[0,.04]],24),tin,0,-.27,0,{to:lan});
 const fl=new T.Sprite(new T.SpriteMaterial({map:ctex(32,64,(x,w,h)=>{const g=x.createRadialGradient(16,40,1,16,36,22);g.addColorStop(0,'rgba(255,250,220,1)');g.addColorStop(.35,'rgba(255,190,90,.9)');g.addColorStop(1,'rgba(255,120,30,0)');x.fillStyle=g;x.beginPath();x.ellipse(16,38,10,24,0,0,TAU);x.fill()}),blending:T.AdditiveBlending,depthWrite:false}));fl.scale.set(.04,.08,1);fl.position.set(0,-.17,0);lan.add(fl)}
// woodpile against the wall under the right-hand window: split rounds in a crib, snow on top
{const g=grp(-2.85,DY,F-.38);const sm=M('#ffe8cc',{map:TX.split,roughness:.9,emissive:'#3a2412',emissiveIntensity:.5}),bm=M('#ffffff',{map:TX.bark,roughness:.95});
 for(let row=0;row<6;row++)for(let i=0;i<8;i++){const r=.065+rnd()*.02,x=-.55+i*.15+(row%2?.07:0)+rnd()*.02;if(x>.55)continue;const y=.07+row*.13;const piece=new T.CylinderGeometry(r,r,.42,3+(i+row)%2*2,1);const m=add(piece,bm,x,y,0,{to:g});m.rotation.set(Math.PI/2,rnd()*TAU,0);
   const cap=add(new T.CircleGeometry(r*.97,3+(i+row)%2*2),sm,x,y,-.211,{to:g,cast:false});cap.rotation.set(0,Math.PI,-m.rotation.y)}
 const sg=new T.SphereGeometry(.5,24,10,0,TAU,0,Math.PI/2);const s=add(sg,MAT.snow,0,.8,0,{to:g,cast:false});s.scale.set(1.25,.16,.5)}
// shovel leaning on the logs beside the woodpile, blade in the snow
{const g=grp(-1.88,DY+.02,F-.24);g.rotation.z=.18;g.rotation.x=-.08;add(new T.CylinderGeometry(.016,.016,1.15,10),M('#8a6a44',{map:TX.oak,roughness:.6}),0,.75,0,{to:g});
 add(new T.TorusGeometry(.05,.012,8,16,Math.PI),M('#2a1e14',{roughness:.5}),0,1.37,0,{to:g});add(BOX(.1,.02,.02),M('#2a1e14'),0,1.33,0,{to:g});
 add(RB(.26,.3,.02,.006),M('#6a6e72',{metalness:.7,roughness:.4}),0,.15,.01,{to:g,rx:-.1});add(RB(.24,.07,.03,.01),MAT.snow,0,.06,.0,{to:g,cast:false})}
// road marker, buried to its last stripe
{const mx=-1.15,mz=-1.6;const m=add(new T.CylinderGeometry(.035,.035,2.0,12),M('#ffffff',{map:TX.marker,roughness:.6}),mx,hAt(mx,mz)-.62,mz,{});m.rotation.z=.08;add(new T.SphereGeometry(.14,14,8),MAT.snow,mx,hAt(mx,mz)+.01,mz,{cast:false}).scale.set(1,.4,1)}
/* ---------- beyond: sky, stars, pines, falling snow ---------- */
add(new T.SphereGeometry(120,32,20),new T.MeshBasicMaterial({map:TX.sky,side:T.BackSide,depthWrite:false,fog:false}),0,0,0,{cast:false});
{const n=600,pp=new Float32Array(n*3);for(let i=0;i<n;i++){const a=rnd()*TAU,e=.08+rnd()*1.3,r=110;pp[i*3]=Math.cos(a)*Math.cos(e)*r;pp[i*3+1]=Math.sin(e)*r;pp[i*3+2]=Math.sin(a)*Math.cos(e)*r}const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pp,3));scene.add(new T.Points(g,new T.PointsMaterial({color:'#dfe6ff',size:1.1,sizeAttenuation:false,transparent:true,opacity:.7,depthWrite:false})))}
{const parts=[];const Lm=new T.Vector3(.5,.6,.6).normalize();const add2=(g,col,lit,snowTop)=>{g=g.toNonIndexed();g.computeVertexNormals();const p=g.attributes.position,n=g.attributes.normal,c=[];const base=lin(col),hi=lin(lit),sn=lin('#56627e');
   for(let i=0;i<p.count;i++){const d=Math.max(0,n.getX(i)*Lm.x+n.getY(i)*Lm.y+n.getZ(i)*Lm.z);const cc=base.clone().lerp(hi,d*.8);const k=snowTop?Math.max(0,Math.min(1,(n.getY(i)-.5)*3))*(.4+.6*d):0;cc.lerp(sn,k*.6);c.push(cc.r,cc.g,cc.b)}g.setAttribute('color',new T.Float32BufferAttribute(c,3));parts.push(g)};
 const trunk=new T.CylinderGeometry(.08,.12,1,7);trunk.translate(0,.5,0);add2(trunk,'#120c08','#2a1c12',false);
 for(let t=0;t<7;t++){const f=t/6;const r=1.4*(1-f*.82)+.08,h=.95-.25*f,y=.5+f*3.3;const seg=16;const g=new T.ConeGeometry(r,h,seg,2,true);const p=g.attributes.position;for(let i=0;i<p.count;i++){if(p.getY(i)<-h/2+1e-3){const a=Math.atan2(p.getZ(i),p.getX(i));const idx=Math.round((a+Math.PI)/(TAU/seg));const o=idx%2?1.12:.82;p.setX(i,p.getX(i)*o);p.setZ(i,p.getZ(i)*o);p.setY(i,p.getY(i)-(idx%2?.15:0))}}g.translate(0,y,0);g.rotateY(t*.7);add2(g,'#050d0a','#173428',true)}
 let n=0;parts.forEach(g=>n+=g.attributes.position.count);const P=new Float32Array(n*3),C=new Float32Array(n*3);let o=0;parts.forEach(g=>{P.set(g.attributes.position.array,o*3);C.set(g.attributes.color.array,o*3);o+=g.attributes.position.count});
 const tg=new T.BufferGeometry();tg.setAttribute('position',new T.BufferAttribute(P,3));tg.setAttribute('color',new T.BufferAttribute(C,3));
 const NT=90,trees=new T.InstancedMesh(tg,new T.MeshBasicMaterial({vertexColors:true,side:T.DoubleSide}),NT);trees.frustumCulled=false;const mx=new T.Matrix4(),q=new T.Quaternion(),sc=new T.Vector3(),ps=new T.Vector3();const fogC=lin('#0e1830');
 for(let i=0;i<NT;i++){let x,z;do{x=(rnd()-.5)*50;z=-18+rnd()*40}while((Math.abs(x)<6&&z>-3&&z<12)||(Math.abs(x)<3.5&&z<-3&&z>-9));const s=1.1+rnd()*.9;ps.set(x,hAt(x,Math.min(z,DZ0-1))-.1,z);q.setFromAxisAngle(new T.Vector3(0,1,0),rnd()*TAU);sc.set(s,s*(1+rnd()*.3),s);mx.compose(ps,q,sc);trees.setMatrixAt(i,mx);
   const dist=Math.hypot(x-1,z+1.6);trees.setColorAt(i,new T.Color(1,1,1).lerp(fogC,Math.min(.8,dist/34)))}scene.add(trees)}
{const n=1600,pp=new Float32Array(n*3);for(let i=0;i<n;i++){pp[i*3]=(rnd()-.5)*14;pp[i*3+1]=rnd()*6;pp[i*3+2]=-4+rnd()*10}const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pp,3));
 const sn=new T.Points(g,new T.PointsMaterial({color:'#eef2ff',size:.022,transparent:true,opacity:.9,depthWrite:false,map:ctex(32,32,(x,w,h)=>{const r=x.createRadialGradient(16,16,0,16,16,16);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=r;x.fillRect(0,0,w,h)})}));sn.frustumCulled=false;scene.add(sn);
 ANIM.push((dt,t)=>{const a=g.attributes.position.array;const gust=.5+.4*Math.sin(t*.4);for(let i=0;i<n;i++){a[i*3+1]-=dt*(.45+(i%7)*.06);a[i*3]+=dt*(gust+.2*Math.sin(t*1.3+i));if(a[i*3+1]<0){a[i*3+1]=6;a[i*3]=(rnd()-.5)*14}if(a[i*3]>7)a[i*3]-=14}g.attributes.position.needsUpdate=true})}
/* ---------- light ---------- */
const hemi=new T.HemisphereLight('#3a4a7a','#1a1a2a',.5);scene.add(hemi);
const moon=new T.DirectionalLight('#9ab0ff',.85);moon.position.set(6,9,-4);moon.target.position.set(0,0,3);scene.add(moon,moon.target);moon.castShadow=true;moon.shadow.mapSize.set(2048,2048);Object.assign(moon.shadow.camera,{left:-7,right:7,top:7,bottom:-7,near:1,far:30});moon.shadow.bias=-.0008;moon.shadow.radius=3;
const lanL=new T.PointLight('#ffb060',1.6,8,1.6);lanL.position.set(LP.x,LP.y+.1,LP.z-.05);lanL.castShadow=true;lanL.shadow.mapSize.set(1024,1024);lanL.shadow.bias=-.003;scene.add(lanL);
const doorL=new T.PointLight('#ffb870',1.1,5,1.8);doorL.position.set(0,1.9,F-.6);scene.add(doorL);
const winL=[-2.8,2.8].map(x=>{const l=new T.PointLight('#ffa860',.8,4.5,1.8);l.position.set(x,1.8,F-.5);scene.add(l);return l});
return {exposure:1.45,env:[['#0a1020',1,0,-2,0,12,.2,12],['#1a2440',1,0,0,6,12,8,.2],['#1a2440',1,0,0,-6,12,8,.2],['#1a2440',1,-6,0,0,.2,8,12],['#1a2440',1,6,0,0,.2,8,12],['#ffb060',4,0,2,5.8,2,2,.2],['#8aa0e0',2,0,5,0,6,.2,6]],
 views:{wide:{p:[1.3,1.55,-1.55],t:[-.15,1.05,5.6],fov:62,where:'Porch · outside',text:'The front porch, from the yard. Snow on the boards and the rail, a lantern by the door. A line of footprints comes down the steps.'},
  door:{p:[.3,1.62,3.15],t:[0,1.75,6],fov:60,where:'Porch · close look',text:'The front door from outside. Lamplight through the fanlight and the side panes. Snow banked against the threshold.'},
  prints:{p:[1.05,1.25,2.2],t:[.12,.25,4.3],fov:54,where:'Porch · close look',text:'Footprints cross the boards and go down the steps. Every edge is still sharp, the tread pattern still in the bottom of each one.'},
  yard:{p:[1.2,1.55,2.4],t:[-1.6,.05,-3.2],fov:58,where:'Porch · close look',text:'Out in the yard the prints keep going, toward where the road should be. The road marker is buried to its last stripe.'},
  lantern:{p:[-.55,2.0,4.55],t:[-1.32,1.95,5.75],fov:48,where:'Porch · close look',text:'A storm lantern on its hook, burning paraffin. It swings a little when the wind comes round the corner.'},
  wood:{p:[-1.25,1.35,3.85],t:[-2.45,.65,5.65],fov:58,where:'Porch · close look',text:'Split logs stacked against the wall under the window, snow on the top row. A shovel leaning beside them.'},
  dark:{p:[1.3,1.55,-1.55],t:[-.15,1.05,5.6],fov:62,where:'Porch · power out',text:'Every window goes dark at once. Only the lantern now, and the snow giving back what light there is.',dark:true}},
 update(t,dt,on,dk){const sw=Math.sin(t*1.3)*.06+Math.sin(t*2.9)*.025;lan.rotation.z=sw;lan.rotation.x=sw*.4;const fl=.9+.06*Math.sin(t*9.1)+.04*Math.sin(t*15.7);lanL.intensity=1.6*fl*(1+.3*dk);
  MAT.glow.emissiveIntensity=1.0*on;MAT.fan.emissiveIntensity=.9*on;doorL.intensity=1.1*on;winL.forEach(l=>l.intensity=.8*on);hemi.intensity=.5-.1*dk}};
});
