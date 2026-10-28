// ROOM {"title":"Blackwood Boiler Room Proof","aria":"The boiler room, rendered in 3D","loading":"Stoking the boiler…","where":"Boiler room · power on","text":"The boiler room. The boiler takes up half of it, ticking as it heats. Tools on the pegboard, a wireless on the bench, coal in the bunker.","buttons":[["wide","Boiler room"],["gauge","The gauge"],["firebox","Firebox"],["pegboard","Pegboard"],["bench","Workbench"],["radio","The wireless"],["calendar","Calendar"],["coal","Coal bunker"],["dark","Power out"]]}
ROOM(57,H=>{const {T,TAU,rnd,ctex,noise,scene,M,add,RB,BOX,lathe,grp,plane,tube,tiledBox,lin}=H;
/* ---------- textures ---------- */
const TX={
 brick:ctex(512,512,(x,w,h)=>{x.fillStyle='#3a3430';x.fillRect(0,0,w,h);const bw=64,bh=24;for(let r=0;r<h/bh;r++)for(let c=-1;c<w/bw+1;c++){const t=rnd();const ox=(r%2)*bw/2;
     const col=[[128,62,44],[112,54,40],[140,74,52],[96,48,36],[120,70,56]][Math.floor(rnd()*5)];const k=.75+t*.35;x.fillStyle=`rgb(${col[0]*k|0},${col[1]*k|0},${col[2]*k|0})`;x.fillRect(c*bw+ox+2,r*bh+2,bw-4,bh-4);
     const g=x.createLinearGradient(0,r*bh,0,r*bh+bh);g.addColorStop(0,'rgba(255,220,200,.08)');g.addColorStop(1,'rgba(0,0,0,.18)');x.fillStyle=g;x.fillRect(c*bw+ox+2,r*bh+2,bw-4,bh-4)}
   noise(x,w,h,.1,9000);const s=x.createLinearGradient(0,0,0,h);s.addColorStop(0,'rgba(10,8,6,.45)');s.addColorStop(.5,'rgba(10,8,6,.1)');s.addColorStop(1,'rgba(10,8,6,0)');x.fillStyle=s;x.fillRect(0,0,w,h)},[1,1]),
 wash:ctex(512,512,(x,w,h)=>{x.fillStyle='#4a4440';x.fillRect(0,0,w,h);const bw=64,bh=24;for(let r=0;r<h/bh;r++)for(let c=-1;c<w/bw+1;c++){const ox=(r%2)*bw/2;const t=rnd();x.fillStyle=`rgb(${190+t*30|0},${184+t*28|0},${170+t*24|0})`;x.fillRect(c*bw+ox+2,r*bh+2,bw-4,bh-4)}
   for(let i=0;i<60;i++){x.fillStyle=`rgba(120,60,40,${.1+rnd()*.25})`;x.beginPath();x.ellipse(rnd()*w,rnd()*h,8+rnd()*30,4+rnd()*12,0,0,TAU);x.fill()}for(let i=0;i<40;i++){x.fillStyle=`rgba(30,26,20,${.05+rnd()*.12})`;x.fillRect(rnd()*w,rnd()*h,2+rnd()*40,2+rnd()*30)}noise(x,w,h,.08,9000)},[1,1]),
 concrete:ctex(1024,1024,(x,w,h)=>{x.fillStyle='#5a5652';x.fillRect(0,0,w,h);for(let i=0;i<300;i++){const g=x.createRadialGradient(rnd()*w,rnd()*h,0,rnd()*w,rnd()*h,40+rnd()*120);{const v=rnd()<.5?20:120;g.addColorStop(0,`rgba(${v},${v*.95|0},${v*.9|0},.12)`)};g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,w,h)}
   for(let i=0;i<14;i++){const cx=rnd()*w,cy=rnd()*h;const g=x.createRadialGradient(cx,cy,0,cx,cy,30+rnd()*60);g.addColorStop(0,'rgba(10,8,6,.55)');g.addColorStop(1,'rgba(10,8,6,0)');x.fillStyle=g;x.beginPath();x.ellipse(cx,cy,40+rnd()*50,20+rnd()*30,rnd()*3,0,TAU);x.fill()}
   x.strokeStyle='rgba(20,18,16,.5)';x.lineWidth=2;for(let i=0;i<6;i++){x.beginPath();let px=rnd()*w,py=rnd()*h;x.moveTo(px,py);for(let k=0;k<8;k++){px+=(rnd()-.5)*60;py+=(rnd()-.5)*60;x.lineTo(px,py)}x.stroke()}for(let i=0;i<30000;i++){const v=rnd()<.5?0:255;x.fillStyle=`rgba(${v},${v},${v},${rnd()*.07})`;x.fillRect(rnd()*w,rnd()*h,1+rnd()*2,1+rnd()*2)}},[2,2.5]),
 iron:ctex(512,512,(x,w,h)=>{x.fillStyle='#22302a';x.fillRect(0,0,w,h);for(let i=0;i<90;i++){const g=x.createRadialGradient(rnd()*w,rnd()*h,0,rnd()*w,rnd()*h,10+rnd()*50);g.addColorStop(0,`rgba(${90+rnd()*40|0},${44+rnd()*20|0},${20},.35)`);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,w,h)}
   for(let i=0;i<40;i++){x.fillStyle=`rgba(${rnd()<.5?10:80},${rnd()<.5?14:90},${rnd()<.5?12:80},.25)`;x.fillRect(rnd()*w,rnd()*h,1+rnd()*3,10+rnd()*60)}noise(x,w,h,.08,8000)},[2,1]),
 peg:ctex(1024,512,(x,w,h)=>{x.fillStyle='#6a5236';x.fillRect(0,0,w,h);for(let i=0;i<6000;i++){const v=rnd()<.5?0:255;x.fillStyle=`rgba(${v},${v},${v},${rnd()*.05})`;x.fillRect(rnd()*w,rnd()*h,1+rnd()*2,1+rnd()*2)}x.fillStyle='#1a140c';for(let i=12;i<w;i+=24)for(let j=12;j<h;j+=24){x.beginPath();x.arc(i,j,3.2,0,TAU);x.fill()}
   // painted outlines, white, slightly larger than each tool (positions match the tools hung below)
   x.strokeStyle='rgba(240,236,224,.95)';x.fillStyle='rgba(240,236,224,.18)';x.lineWidth=5;x.lineJoin='round';const P=(pts)=>{x.beginPath();pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.fill();x.stroke()};
   const S=(u,v)=>[u*w,v*h];
   // pipe wrench
   P([S(.07,.12),S(.13,.12),S(.13,.22),S(.115,.24),S(.115,.88),S(.085,.88),S(.085,.24),S(.07,.22)]);
   // claw hammer
   P([S(.2,.12),S(.31,.12),S(.31,.2),S(.265,.2),S(.265,.78),S(.245,.78),S(.245,.2),S(.2,.2)]);
   // saw
   P([S(.37,.1),S(.46,.1),S(.46,.3),S(.44,.86),S(.39,.86),S(.37,.3)]);
   // pliers
   P([S(.53,.12),S(.57,.12),S(.59,.5),S(.6,.66),S(.57,.66),S(.55,.5),S(.53,.66),S(.5,.66),S(.51,.5)]);
   // two screwdrivers
   P([S(.64,.12),S(.67,.12),S(.67,.4),S(.66,.72),S(.65,.72),S(.64,.4)]);P([S(.71,.12),S(.735,.12),S(.735,.36),S(.727,.62),S(.718,.62),S(.71,.36)]);
   // adjustable spanner, mallet
   P([S(.79,.1),S(.84,.1),S(.84,.2),S(.825,.22),S(.825,.72),S(.805,.72),S(.805,.22),S(.79,.2)]);P([S(.88,.12),S(.96,.12),S(.96,.26),S(.93,.26),S(.93,.8),S(.91,.8),S(.91,.26),S(.88,.26)])}),
 dial:ctex(256,256,(x,w,h)=>{x.fillStyle='#ece4d0';x.fillRect(0,0,w,h);x.translate(w/2,h/2);x.strokeStyle='#1a1410';x.fillStyle='#1a1410';for(let i=0;i<=40;i++){const a=-Math.PI*.75+i/40*Math.PI*1.5;x.lineWidth=i%5?1.5:3.5;const r0=i%5?96:88;x.beginPath();x.moveTo(Math.sin(a)*r0,-Math.cos(a)*r0);x.lineTo(Math.sin(a)*106,-Math.cos(a)*106);x.stroke()}
   x.font='bold 16px Georgia';x.textAlign='center';x.textBaseline='middle';for(let i=0;i<=8;i++){const a=-Math.PI*.75+i/8*Math.PI*1.5;x.fillText(String(i*20),Math.sin(a)*72,-Math.cos(a)*72)}
   x.strokeStyle='rgba(170,30,20,.9)';x.lineWidth=8;x.beginPath();x.arc(0,0,101,-Math.PI/2+Math.PI*.55,-Math.PI/2+Math.PI*.75);x.stroke();x.font='12px Georgia';x.fillStyle='#1a1410';x.fillText('LBS / SQ IN',0,40);x.font='bold 11px Georgia';x.fillText('BUDENBERG',0,58)}),
 cal:ctex(256,384,(x,w,h)=>{x.fillStyle='#e8dcc0';x.fillRect(0,0,w,h);const g=x.createLinearGradient(0,0,0,170);g.addColorStop(0,'#7a8aa0');g.addColorStop(1,'#c8b890');x.fillStyle=g;x.fillRect(14,14,w-28,150);
   x.fillStyle='#3a3a30';x.beginPath();x.moveTo(14,140);x.lineTo(60,100);x.lineTo(100,120);x.lineTo(150,80);x.lineTo(200,110);x.lineTo(242,95);x.lineTo(242,164);x.lineTo(14,164);x.fill();
   x.fillStyle='#1a1a1a';x.fillRect(80,118,90,26);x.fillRect(150,104,20,16);x.beginPath();x.arc(96,146,9,0,TAU);x.arc(126,146,9,0,TAU);x.arc(156,146,9,0,TAU);x.fill();x.fillStyle='rgba(230,230,230,.6)';x.beginPath();x.ellipse(160,90,14,9,0,0,TAU);x.ellipse(176,76,18,11,0,0,TAU);x.fill();
   x.fillStyle='#5a1a14';x.font='bold 13px Georgia';x.textAlign='center';x.fillText('NORTHERN COAL & COKE CO.',w/2,186);x.fillStyle='#1a1410';x.font='bold 22px Georgia';x.fillText('DECEMBER 1911',w/2,214);
   x.font='11px Georgia';const days=['S','M','T','W','T','F','S'];days.forEach((d,i)=>x.fillText(d,30+i*32,236));let day=1;for(let r=0;r<5;r++)for(let c=0;c<7;c++){if(r===0&&c<5)continue;if(day>31)break;x.fillStyle=(day===24||day===25)?'#8a1a14':'#1a1410';x.fillText(String(day),30+c*32,256+r*22);day++}
   x.strokeStyle='rgba(138,26,20,.9)';x.lineWidth=2;x.beginPath();x.arc(30+0*32,256+3*22-4,10,0,TAU);x.stroke();for(let i=0;i<500;i++){x.fillStyle=`rgba(90,70,40,${rnd()*.12})`;x.fillRect(rnd()*w,rnd()*h,2,2)}}),
 radioDial:ctex(256,64,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#f0d080');g.addColorStop(1,'#c89040');x.fillStyle=g;x.fillRect(0,0,w,h);x.strokeStyle='#3a2410';x.fillStyle='#3a2410';for(let i=0;i<=30;i++){x.lineWidth=i%5?1:2;x.beginPath();x.moveTo(10+i*7.8,h-6);x.lineTo(10+i*7.8,h-(i%5?14:22));x.stroke()}
   x.font='9px Georgia';['200','300','400','500','600','800','1000'].forEach((s,i)=>x.fillText(s,6+i*38,14));x.fillStyle='#a01a10';x.fillRect(150,4,2,h-8)}),
 walnut:ctex(256,256,(x,w,h)=>{x.fillStyle='#4a2a16';x.fillRect(0,0,w,h);for(let i=0;i<70;i++){const y=rnd()*h;x.strokeStyle=`rgba(${rnd()<.5?20:120},${rnd()<.5?10:70},${rnd()<.5?5:30},${.1+rnd()*.18})`;x.lineWidth=.6+rnd()*2;x.beginPath();x.moveTo(0,y);for(let k=1;k<=6;k++)x.lineTo(k*w/6,y+Math.sin(k+y)*4*rnd());x.stroke()}}),
 grille:ctex(128,128,(x,w,h)=>{x.fillStyle='#6a5a40';x.fillRect(0,0,w,h);for(let i=0;i<w;i+=3){x.fillStyle='rgba(0,0,0,.18)';x.fillRect(i,0,1,h);x.fillRect(0,i,w,1)}x.strokeStyle='#3a2a1a';x.lineWidth=5;for(let k=0;k<3;k++){x.beginPath();x.arc(w/2,h*1.1,30+k*28,Math.PI*1.15,Math.PI*1.85);x.stroke()}}),
 plank:ctex(512,256,(x,w,h)=>{const n=4;for(let i=0;i<n;i++){const t=rnd();x.fillStyle=`rgb(${100+t*26|0},${72+t*18|0},${44+t*10|0})`;x.fillRect(0,i*h/n,w,h/n);for(let g=0;g<14;g++){x.strokeStyle=`rgba(40,22,10,${.1+rnd()*.15})`;x.lineWidth=.6+rnd()*1.6;const y=i*h/n+rnd()*h/n;x.beginPath();x.moveTo(0,y);x.bezierCurveTo(w*.3,y+rnd()*6-3,w*.7,y+rnd()*6-3,w,y+rnd()*4-2);x.stroke()}x.fillStyle='rgba(10,6,2,.7)';x.fillRect(0,i*h/n,w,2)}
   for(let i=0;i<8;i++){const g=x.createRadialGradient(rnd()*w,rnd()*h,0,rnd()*w,rnd()*h,20+rnd()*40);g.addColorStop(0,'rgba(20,14,8,.35)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,w,h)}for(let i=0;i<3000;i++){const v=rnd()<.5?0:255;x.fillStyle=`rgba(${v},${v},${v},${rnd()*.06})`;x.fillRect(rnd()*w,rnd()*h,1+rnd()*2,1)}},[1,1]),
 rag:ctex(128,128,(x,w,h)=>{x.fillStyle='#8a8070';x.fillRect(0,0,w,h);for(let i=0;i<400;i++){x.fillStyle=`rgba(20,16,10,${rnd()*.25})`;x.fillRect(rnd()*w,rnd()*h,2+rnd()*8,1+rnd()*4)}}),
};
const MAT={floor:M('#ffffff',{map:TX.concrete,roughness:.82}),brick:M('#ffffff',{map:TX.brick,bumpMap:TX.brick,bumpScale:.02,roughness:.95}),wash:M('#ffffff',{map:TX.wash,bumpMap:TX.wash,bumpScale:.015,roughness:.95}),
 iron:M('#ffffff',{map:TX.iron,roughness:.62,metalness:.35}),castIron:(()=>{const m=M('#141312',{roughness:.7,metalness:.25});m.userData.env=.3;return m})(),brass:M('#c9a24a',{metalness:.85,roughness:.3}),copper:M('#b0603a',{metalness:.85,roughness:.35}),
 red:M('#8a1a14',{roughness:.45,metalness:.2}),pipe:M('#3a3a36',{roughness:.5,metalness:.5}),lag:M('#c8c0b0',{roughness:.95}),wood:M('#ffffff',{map:TX.plank,roughness:.7}),steel:M('#9aa0a4',{metalness:.85,roughness:.32}),
 coal:(()=>{const m=M('#121214',{roughness:.5,metalness:.05,flatShading:true});m.userData.env=.15;return m})(),glow:M('#1a0602',{emissive:'#c8300a',emissiveIntensity:.75,roughness:1})};
/* ---------- the room: tight, 3.6 m wide, 5 m deep, 2.6 m to the joists ---------- */
const W=3.6,D=5.0,Hh=2.6,hw=W/2;
const walls=(len,x,z,ry)=>{const lower=tiledBox(len,1.2,.04,MAT.wash,0,0,0,1.6,{cast:false}),upper=tiledBox(len,Hh-1.2,.04,MAT.brick,0,0,0,1.6,{cast:false});[lower,upper].forEach((m,i)=>{m.rotation.y=ry;m.position.set(x,i?1.2+(Hh-1.2)/2:.6,z)})};
walls(D,-hw-.02,D/2,Math.PI/2);walls(D,hw+.02,D/2,Math.PI/2);walls(W,0,D+.02,0);walls(W,0,-.02,0);
add(BOX(W+.1,.004,.08),M('#2a2420'),0,1.2,D-.0,{cast:false});
plane(W,D,MAT.floor,0,0,D/2,0,-Math.PI/2);plane(W,D,M('#2a2622',{roughness:1}),0,Hh,D/2,0,Math.PI/2);
for(let x=-hw+.3;x<hw;x+=.6)add(RB(.12,.2,D,.01),M('#2a2018',{roughness:.95}),x,Hh-.1,D/2,{cast:false});
// floor drain
add(new T.CylinderGeometry(.09,.09,.004,24),MAT.castIron,-.2,.002,3.2,{cast:false});for(let i=-3;i<=3;i++)add(BOX(.01,.006,.15),M('#050505'),-.2+i*.022,.004,3.2,{cast:false});
/* ---------- the boiler: a vertical riveted shell on a brick hearth, firebox at its foot, gauge on its chest ---------- */
const BX=.55,BZ=2.45,BR=.62,BY0=.14,BH=1.72,CAMX=-1.0,CAMZ=.35;
const toCam=Math.atan2(CAMX-BX,CAMZ-BZ);const fdx=Math.sin(toCam),fdz=Math.cos(toCam);
tiledBox(1.6,.14,1.6,MAT.brick,BX,.07,BZ,1.2,{cast:false});
{const sh=add(new T.CylinderGeometry(BR,BR,BH,56,1,true),MAT.iron,BX,BY0+BH/2,BZ);sh.material.side=T.DoubleSide;
 const dome=add(new T.SphereGeometry(BR,56,18,0,TAU,0,.62),MAT.iron,BX,BY0+BH-BR*Math.cos(.62),BZ);
 add(new T.CylinderGeometry(BR+.03,BR+.05,.08,56),MAT.castIron,BX,BY0+.04,BZ);
 // rivet seams: rings and a vertical row up the front
 const rv=new T.SphereGeometry(.011,8,6);const rivets=[];for(const y of [BY0+.1,BY0+BH*.36,BY0+BH*.68,BY0+BH-.04])for(let i=0;i<72;i++){const a=i/72*TAU;rivets.push([BX+Math.cos(a)*(BR+.004),y,BZ+Math.sin(a)*(BR+.004)])}
 const sa=toCam+Math.PI*.35;for(let y=BY0+.14;y<BY0+BH-.05;y+=.065)rivets.push([BX+Math.sin(sa)*(BR+.004),y,BZ+Math.cos(sa)*(BR+.004)]);
 const im=new T.InstancedMesh(rv,MAT.iron,rivets.length);const mm=new T.Matrix4();rivets.forEach((p,i)=>{mm.makeTranslation(...p);im.setMatrixAt(i,mm)});im.frustumCulled=false;im.castShadow=true;im.receiveShadow=true;scene.add(im);
 for(const y of [BY0+.1,BY0+BH*.36,BY0+BH*.68,BY0+BH-.04])add(new T.TorusGeometry(BR+.002,.008,6,72),MAT.iron,BX,y,BZ,{rx:Math.PI/2,cast:false});
 // asbestos-grey lagging band on the upper shell, strapped
 const lg=add(new T.CylinderGeometry(BR+.035,BR+.035,BH*.22,56,1,true),MAT.lag,BX,BY0+BH*.84,BZ);lg.material.side=T.DoubleSide;for(const k of [-.09,.09])add(new T.TorusGeometry(BR+.04,.006,6,56),MAT.steel,BX,BY0+BH*.84+k*BH*.9*.5,BZ,{rx:Math.PI/2,cast:false});
 // safety valve on the dome, flue up through the ceiling
 add(lathe([[0,0],[.06,0],[.06,.04],[.03,.05],[.03,.14],[.05,.15],[.05,.18],[0,.2]],20),MAT.brass,BX+.22,BY0+BH+.02,BZ+.1);
 tube([[BX,BY0+BH+.1,BZ],[BX,Hh-.6,BZ],[BX+.3,Hh-.25,BZ+.4],[BX+.9,Hh-.25,BZ+.9],[1.85,Hh-.25,BZ+.9]],.14,M('#1a1816',{roughness:.7,metalness:.3}),{seg:40,rs:20})}
// the firebox front: a cast mouthpiece standing proud of the shell, door with draught vents, ash-pit door below
const FG=grp(BX+fdx*(BR-.02),0,BZ+fdz*(BR-.02),toCam);
{add(RB(.62,.62,.12,.03),MAT.castIron,0,.62,.0,{to:FG});add(RB(.44,.36,.05,.02),MAT.castIron,0,.64,.075,{to:FG});
 add(RB(.45,.37,.01,.005),M('#200804',{emissive:'#ff4a10',emissiveIntensity:1.1}),0,.64,.056,{to:FG,cast:false});
 for(let i=0;i<6;i++){add(RB(.026,.1,.02,.006),MAT.glow,-.125+i*.05,.68,.108,{to:FG,cast:false});add(RB(.03,.11,.008,.003),MAT.castIron,-.125+i*.05,.705,.122,{to:FG,rx:-.6})}add(RB(.34,.022,.03,.006),MAT.castIron,0,.745,.11,{to:FG});add(RB(.34,.022,.03,.006),MAT.castIron,0,.615,.11,{to:FG});
 add(new T.TorusGeometry(.03,.008,8,20),MAT.steel,.17,.64,.12,{to:FG});add(RB(.08,.03,.04,.008),MAT.steel,.17,.64,.1,{to:FG});
 for(const y of [.52,.76])add(RB(.04,.07,.03,.006),MAT.castIron,-.23,y,.1,{to:FG});
 add(RB(.44,.16,.05,.01),MAT.castIron,0,.2,.04,{to:FG});add(RB(.06,.03,.05,.006),MAT.steel,.15,.2,.075,{to:FG});
 add(RB(.2,.055,.006,.003),MAT.brass,0,.9,.062,{to:FG})}
// gauge on its siphon, sight glass beside it, pipes and red valve wheels
const GG=grp(BX+fdx*(BR+.07),BY0+BH*.62,BZ+fdz*(BR+.07),toCam);
{add(new T.CylinderGeometry(.012,.012,.2,10),MAT.copper,-.15,.0,-.04,{to:GG});tube([[-.15,.1,-.04],[-.15,.16,-.02],[-.1,.18,0],[-.06,.16,0]],.011,MAT.copper,{to:GG});
 add(new T.CylinderGeometry(.11,.11,.05,40),MAT.brass,0,.14,.0,{to:GG,rx:Math.PI/2});add(new T.CircleGeometry(.095,40),M('#ffffff',{map:TX.dial,roughness:.35}),0,.14,.026,{to:GG,cast:false});
 add(new T.CircleGeometry(.096,40),new T.MeshPhysicalMaterial({color:'#dfe9f2',roughness:.02,transparent:true,opacity:.15,clearcoat:1,depthWrite:false}),0,.14,.03,{to:GG,cast:false});
 const nd=add(BOX(.006,.075,.003),M('#111',{roughness:.4}),0,.14,.028,{to:GG,cast:false});nd.geometry.translate(0,.03,0);add(new T.CircleGeometry(.008,12),MAT.brass,0,.14,.029,{to:GG,cast:false});
 H.ANIM.push((dt,t)=>{nd.rotation.z=-1.05+Math.sin(t*.7)*.015+Math.sin(t*3.1)*.004});
 const sg=grp(.24,-.05,0,0,GG);for(const y of [-.18,.18])add(RB(.05,.05,.05,.01),MAT.brass,0,y,0,{to:sg});add(new T.CylinderGeometry(.012,.012,.32,12),new T.MeshPhysicalMaterial({color:'#cfe0e8',roughness:.02,transparent:true,opacity:.35,clearcoat:1,depthWrite:false}),0,0,0,{to:sg,cast:false});add(new T.CylinderGeometry(.01,.01,.14,12),new T.MeshPhysicalMaterial({color:'#7a5a2a',transparent:true,opacity:.6}),0,-.07,0,{to:sg,cast:false})}
{const p=(pts,r=.035,m=MAT.pipe)=>tube(pts,r,m,{seg:40});
 p([[BX+.35,BY0+BH-.2,BZ-.4],[BX+.35,Hh-.4,BZ-.4],[BX+.35,Hh-.4,.3],[BX+.35,Hh+.1,.3]],.04);
 p([[BX-.45,BY0+BH-.3,BZ+.3],[BX-.45,Hh-.6,BZ+.3],[BX-.45,Hh+.1,BZ+.3]],.03,MAT.copper);p([[BX-.42,Hh-.22,BZ+.3],[-.4,Hh-.22,BZ+.3],[-hw+.06,Hh-.22,BZ+.3]],.025,MAT.copper);
 p([[BX+.5,.35,BZ+.3],[1.2,.35,BZ+.3],[1.2,.35,D-.1]],.045);
 for(const [x,y,z,ry] of [[BX+.35,Hh-.4,1.3,0],[-.2,Hh-.35,BZ+.3,Math.PI/2],[1.2,.35,BZ+1.4,0]]){const g=grp(x,y,z,ry);add(new T.TorusGeometry(.07,.01,8,24),MAT.red,0,0,.0,{to:g,ry:Math.PI/2});for(let i=0;i<4;i++)add(BOX(.008,.13,.01),MAT.red,0,0,0,{to:g,rx:i*Math.PI/4});add(lathe([[0,-.05],[.025,-.05],[.025,.05],[0,.05]],16),MAT.castIron,0,0,0,{to:g,rz:Math.PI/2})}}
/* ---------- pegboard with painted outlines, every tool in its place ---------- */
const PX=-.88,PY0=1.08,PW=1.6,PH=.8,PZ=D-.03;
{const g=grp(PX,PY0,PZ,Math.PI);add(RB(PW+.06,PH+.06,.03,.006),MAT.wood,0,PH/2,-.01,{to:g});add(new T.PlaneGeometry(PW,PH),M('#ffffff',{map:TX.peg,roughness:.85}),0,PH/2,.008,{to:g,cast:false});
 const U=(u,v)=>[-PW/2+u*PW,PH-v*PH];const hang=(u,v)=>{const [x,y]=U(u,v);add(new T.CylinderGeometry(.004,.004,.05,6),MAT.steel,x,y,.03,{to:g,rx:Math.PI/2,cast:false})};
 const dark=M('#2a2a2a',{metalness:.6,roughness:.4}),han=M('#6a3a1a',{roughness:.5}),red=M('#8a1a14',{roughness:.4}),yel=M('#c8901a',{roughness:.4});
 // pipe wrench
 const _w0=g.children.length;{const [x,y]=U(.1,.5);add(RB(.035,PH*.6,.018,.006),M('#a01a14',{roughness:.45,metalness:.3}),x,y-.03,.03,{to:g});const [hx,hy]=U(.1,.17);add(RB(.09,.07,.025,.008),dark,hx,hy,.032,{to:g});hang(.1,.12)}(H.hook||(()=>{}))('wrench',g.children.slice(_w0,-1));
 // claw hammer
 {const [x,y]=U(.255,.48);add(RB(.025,PH*.56,.022,.008),han,x,y,.03,{to:g});const [hx,hy]=U(.255,.16);add(RB(.13,.04,.03,.008),dark,hx,hy,.034,{to:g});hang(.255,.12)}
 // hand saw
 {const [x,y]=U(.415,.55);const sw=new T.Shape();sw.moveTo(-.035,.24);sw.lineTo(.035,.24);sw.lineTo(.02,-.22);sw.lineTo(-.02,-.22);sw.lineTo(-.035,.24);add(new T.ExtrudeGeometry(sw,{depth:.002,bevelEnabled:false}),(()=>{const m=M('#5a5e62',{metalness:.5,roughness:.5});m.userData.env=.15;return m})(),x,y,.03,{to:g});const [hx,hy]=U(.415,.18);add(RB(.07,.12,.025,.015),han,hx,hy,.034,{to:g});hang(.415,.12)}
 // pliers
 {const [x,y]=U(.55,.38);for(const s of [-1,1]){const l=add(RB(.012,.22,.012,.004),red,x+s*.012,y-.03,.03,{to:g});l.rotation.z=s*.12}const [hx,hy]=U(.55,.18);add(RB(.028,.07,.016,.005),dark,hx,hy,.032,{to:g});hang(.55,.12)}
 // screwdrivers
 for(const [u,len,col] of [[.655,.42,yel],[.722,.36,red]]){const [x,y]=U(u,.12+len*.35);add(lathe([[0,0],[.012,0],[.014,.03],[.012,.1],[0,.1]],12),col,x,y-.0,.03,{to:g,rz:Math.PI});const [sx,sy]=U(u,.12+len*.35+.15);add(new T.CylinderGeometry(.003,.003,len*PH*.75,8),MAT.steel,sx,sy-.06,.03,{to:g});hang(u,.12)}
 // adjustable spanner
 {const [x,y]=U(.815,.45);add(RB(.028,PH*.48,.012,.004),MAT.steel,x,y,.03,{to:g});const [hx,hy]=U(.815,.16);add(RB(.06,.06,.015,.006),MAT.steel,hx,hy,.032,{to:g});hang(.815,.12)}
 // mallet
 {const [x,y]=U(.92,.52);add(new T.CylinderGeometry(.01,.01,PH*.54,10),han,x,y,.03,{to:g});const [hx,hy]=U(.92,.19);add(new T.CylinderGeometry(.04,.04,.12,20),M('#a0825a',{roughness:.7}),hx,hy,.045,{to:g,rz:Math.PI/2});hang(.92,.12)}}
/* ---------- workbench: vice, oil can, rags, tins; the wireless at the far end ---------- */
{const g=grp(-.82,0,D-.33,Math.PI);const L=1.9;add(RB(L,.07,.6,.008),M('#ffffff',{map:TX.plank,roughness:.72}),0,.88,0,{to:g});add(RB(L,.2,.04,.006),MAT.wood,0,.76,.28,{to:g});
 for(const e of [-1,1])for(const f of [-1,1])add(RB(.07,.84,.07,.008),MAT.wood,e*(L/2-.06),.42,f*.25,{to:g});add(RB(L-.1,.04,.5,.006),MAT.wood,0,.18,0,{to:g});
 // vice at the near end
 const v=grp(-L/2+.2,.915,.24,0,g);add(RB(.16,.1,.12,.01),MAT.castIron,0,.05,0,{to:v});add(RB(.16,.07,.03,.006),MAT.castIron,0,.13,.07,{to:v});add(RB(.16,.07,.03,.006),MAT.castIron,0,.13,-.02,{to:v});add(new T.CylinderGeometry(.01,.01,.24,10),MAT.steel,0,.08,.16,{to:v,rx:Math.PI/2});add(new T.CylinderGeometry(.006,.006,.18,8),MAT.steel,0,.08,.28,{to:v,rz:Math.PI/2});
 // oil can with a long spout
 const oc=grp(-.35,.915,.05,0,g);add(lathe([[0,0],[.06,0],[.065,.01],[.06,.05],[.03,.08],[.012,.09],[0,.09]],24),M('#a8661a',{metalness:.7,roughness:.35}),0,0,0,{to:oc});tube([[0,.085,0],[.02,.12,0],[.09,.2,.0]],.004,MAT.brass,{to:oc});add(new T.TorusGeometry(.03,.006,6,14,Math.PI),MAT.brass,-.05,.07,0,{to:oc,rz:Math.PI/2});
 // rags
 const rg=add(new T.SphereGeometry(.08,14,10),M('#ffffff',{map:TX.rag,roughness:1}),-.1,.93,.15,{to:g});rg.scale.set(1.3,.35,1);
 // tin of screws, spare valve, a pencil
 add(new T.CylinderGeometry(.05,.05,.07,20,1,true),M('#7a7a70',{metalness:.7,roughness:.4}),.05,.95,-.12,{to:g}).material.side=T.DoubleSide;for(let i=0;i<14;i++)add(new T.CylinderGeometry(.002,.002,.025,5),MAT.steel,.05+(rnd()-.5)*.06,.97+rnd()*.01,-.12+(rnd()-.5)*.06,{to:g,rx:rnd()*3,rz:rnd()*3,cast:false});
 // the wireless: wooden cabinet, back off, valves lit, headphones, morse key, accumulator
 const r=grp(.5,.915,-.04,-.35,g);const cab=M('#ffffff',{map:TX.walnut,roughness:.35});
 // cabinet with its lid off: sides, bottom, back; the front faces the room (local +z)
 for(const e of [-1,1])add(RB(.03,.32,.28,.01),cab,e*.215,.16,0,{to:r});add(RB(.46,.02,.28,.006),cab,0,.01,0,{to:r});add(RB(.46,.32,.012,.006),cab,0,.16,-.134,{to:r});
 add(RB(.46,.32,.016,.006),cab,0,.16,.134,{to:r});add(new T.PlaneGeometry(.24,.16),M('#ffffff',{map:TX.grille,roughness:.95}),-.07,.18,.1435,{to:r,cast:false});
 add(new T.PlaneGeometry(.12,.04),M('#ffffff',{map:TX.radioDial,emissive:'#ffb050',emissiveMap:TX.radioDial,emissiveIntensity:.7,roughness:.4}),.13,.24,.1435,{to:r,cast:false});
 const kb=M('#1a1410',{roughness:.3});for(const [x,y] of [[.1,.1],[.17,.1],[.135,.16]])add(new T.CylinderGeometry(.018,.02,.02,20),kb,x,y,.15,{to:r,rx:Math.PI/2});
 // chassis and the valves, glowing, seen from above with the lid off
 add(RB(.4,.02,.22,.004),M('#8a8c8e',{metalness:.7,roughness:.4}),0,.15,0,{to:r});for(const e of [-1,1])add(RB(.02,.13,.2,.004),M('#6a6c6e',{metalness:.6,roughness:.45}),e*.18,.085,0,{to:r});
 for(const [x,z] of [[-.14,-.04],[-.06,.04],[.03,-.05],[.11,.03]]){add(lathe([[0,0],[.016,0],[.018,.06],[.012,.08],[0,.085]],16),new T.MeshPhysicalMaterial({color:'#d8c8b0',roughness:.05,transparent:true,opacity:.75,emissive:'#ff7a2a',emissiveIntensity:1.1}),x,.16,z,{to:r,cast:false})}
 add(new T.CylinderGeometry(.04,.04,.07,20),M('#2a2a2c',{metalness:.5,roughness:.4}),.15,.195,-.06,{to:r});
 // the lid, leaning against the wall behind
 add(RB(.46,.012,.28,.004),cab,.0,.17,-.27,{to:r,rx:-1.25});
 // headphones on the bench, the Morse key in front
 tube([[-.32,.0,-.05],[-.36,.06,.0],[-.34,.12,.08],[-.28,.1,.12],[-.24,.02,.1]],.006,M('#2a2a2a',{roughness:.5}),{to:r});for(const [x,z] of [[-.36,-.03],[-.24,.12]])add(new T.CylinderGeometry(.035,.035,.02,20),kb,x,.01,z,{to:r});
 const mk=grp(-.05,0,.26,0,r);add(RB(.1,.012,.05,.004),M('#3a2a1a',{roughness:.5}),0,.006,0,{to:mk});add(RB(.08,.006,.012,.002),MAT.brass,0,.02,0,{to:mk,rz:.06});add(new T.CylinderGeometry(.008,.008,.01,12),kb,.035,.028,0,{to:mk});
 add(RB(.14,.16,.1,.008),M('#1a1a1c',{roughness:.3}),.36,.08,.02,{to:r});for(const x of [.33,.39])add(new T.CylinderGeometry(.008,.008,.02,10),x<.36?MAT.red:MAT.castIron,x,.17,.02,{to:r});
 // stool
 const st=grp(.1,0,.62,0,g);add(new T.CylinderGeometry(.16,.16,.03,24),MAT.wood,0,.62,0,{to:st});for(let i=0;i<3;i++){const a=i/3*TAU;const l=add(RB(.03,.64,.03,.006),MAT.wood,Math.cos(a)*.11,.31,Math.sin(a)*.11,{to:st});l.rotation.set(Math.sin(a)*.12,0,-Math.cos(a)*.12)}}
/* ---------- calendar on a nail ---------- */
{const g=grp(-hw+.03,1.55,3.85,Math.PI/2);add(new T.PlaneGeometry(.26,.39),M('#ffffff',{map:TX.cal,roughness:.9,side:T.DoubleSide}),0,0,.01,{to:g,cast:false}).rotation.x=.02;add(new T.CylinderGeometry(.003,.003,.03,6),MAT.castIron,0,.2,.012,{to:g,rx:Math.PI/2})}
/* ---------- coal bunker at the back, scuttle and shovel ---------- */
{const bunk=M('#8a7a6a',{map:TX.plank,roughness:.85});const g=grp(-hw+.55,0,1.95,Math.PI/2);add(RB(1.6,.55,.06,.01),bunk,0,.275,-.48,{to:g});for(const e of [-1,1])add(RB(.06,.8,1.0,.01),bunk,e*.8,.4,0,{to:g});
 const cg=new T.IcosahedronGeometry(1,1);{const p=cg.attributes.position;const seen={};for(let i=0;i<p.count;i++){const k=p.getX(i).toFixed(3)+p.getY(i).toFixed(3)+p.getZ(i).toFixed(3);const f=seen[k]||(seen[k]=.75+rnd()*.45);p.setXYZ(i,p.getX(i)*f,p.getY(i)*f,p.getZ(i)*f)}cg.computeVertexNormals()}const n=420;const im=new T.InstancedMesh(cg,MAT.coal,n);const mm=new T.Matrix4(),q=new T.Quaternion(),e=new T.Euler(),s=new T.Vector3(),p=new T.Vector3();
 for(let i=0;i<n;i++){const u=rnd()*1.5-.75,w2=rnd()*.9-.45;const hgt=.5*Math.max(0,1-Math.pow(Math.abs(w2+.1)/.6,2))*(1-Math.abs(u)/.95)+.02;const r=.025+rnd()*.035;p.set(u,Math.max(r*.6,hgt*rnd()+r*.6),w2+.05);q.setFromEuler(e.set(rnd()*3,rnd()*3,rnd()*3));s.set(r*(1+rnd()*.4),r*(.7+rnd()*.3),r);mm.compose(p,q,s);im.setMatrixAt(i,mm)}
 im.castShadow=true;im.receiveShadow=true;im.frustumCulled=false;g.add(im);
 for(let i=0;i<30;i++){const r=.015+rnd()*.02;add(cg,MAT.coal,-.8+rnd()*1.6,r*.6,-.62-rnd()*.25,{to:g}).scale.set(r,r*.8,r)}
 const sc=grp(1.15,0,-.45,.6,g);add(lathe([[0,0],[.12,0],[.16,.06],[.18,.3],[.16,.32],[.14,.12],[0,.04]],24),M('#2a2826',{metalness:.5,roughness:.45}),0,0,0,{to:sc}).material.side=T.DoubleSide;add(new T.TorusGeometry(.12,.008,8,24,Math.PI),MAT.brass,0,.36,0,{to:sc});
 for(let i=0;i<14;i++){const r=.02+rnd()*.02;add(cg,MAT.coal,(rnd()-.5)*.2,.25+rnd()*.04,(rnd()-.5)*.2,{to:sc}).scale.set(r,r*.8,r)}
 const sv=grp(-.55,0,-.75,0,g);sv.rotation.set(.25,0,.05);add(new T.CylinderGeometry(.014,.014,.9,10),M('#6a4a2a',{roughness:.6}),0,.65,0,{to:sv});add(RB(.24,.3,.02,.01),M('#3a3836',{metalness:.6,roughness:.5}),0,.13,.0,{to:sv});add(RB(.12,.02,.03,.006),M('#6a4a2a'),0,1.1,0,{to:sv})}
/* ---------- the bulb in its cage ---------- */
const bulbM=M('#fff3d0',{emissive:'#ffd590',emissiveIntensity:3});
{const g=grp(-.45,Hh-.55,3.2);add(new T.CylinderGeometry(.004,.004,.45,6),M('#111'),0,.32,0,{to:g,cast:false});add(new T.SphereGeometry(.04,16,12),bulbM,0,0,0,{to:g,cast:false});for(let i=0;i<6;i++)add(new T.TorusGeometry(.07,.002,4,20,Math.PI),MAT.castIron,0,0,0,{to:g,ry:i*Math.PI/6,cast:false});add(new T.TorusGeometry(.07,.002,4,24),MAT.castIron,0,0,0,{to:g,rx:Math.PI/2,cast:false})}
/* ---------- the door we came in by ---------- */
{const g=grp(.6,0,.03);add(RB(.8,2.0,.05,.008),M('#3a4a3a',{roughness:.7}),0,1.0,0,{to:g});for(const e of [-1,1])add(RB(.08,2.08,.08,.008),MAT.wood,e*.44,1.04,0,{to:g})}
/* ---------- lights ---------- */
const hemi=new T.HemisphereLight('#4a5274','#3a2010',.36);scene.add(hemi);
const bulb=new T.PointLight('#ffd49a',1.35,8,1.6);bulb.position.set(-.45,Hh-.62,3.2);bulb.castShadow=true;bulb.shadow.mapSize.set(1024,1024);bulb.shadow.bias=-.004;scene.add(bulb);
const fire=new T.PointLight('#ff6a20',1.0,3.0,2);fire.position.set(BX+fdx*(BR+.3),.6,BZ+fdz*(BR+.3));scene.add(fire);
const bench=new T.SpotLight('#ffd49a',.55,4,.8,.6,1.5);bench.position.set(-.85,Hh-.15,D-1.2);bench.target.position.set(-.85,.9,D-.3);scene.add(bench,bench.target);
const radioL=new T.PointLight('#ffa050',.25,1.2,2);radioL.position.set(-1.35,1.1,D-.5);scene.add(radioL);
const glowMats=[];scene.traverse(o=>{if(o.isMesh&&o.material&&o.material.emissiveIntensity>0&&o.material!==MAT.glow&&glowMats.indexOf(o.material)<0&&!(o.material.emissive&&o.material.emissive.r>.9&&o.material.emissive.g<.4))glowMats.push(o.material)});const g0=glowMats.map(m=>m.emissiveIntensity);
return {start:'wide',bloom:[.3,.3,1.15],exposure:1.3,darkExposure:.1,
 views:{wide:{p:[CAMX,1.45,CAMZ],t:[-.05,.95,3.6],fov:72,where:'Boiler room · power on',text:'The boiler room. The boiler takes up half of it, ticking as it heats. Tools on the pegboard, a wireless on the bench, coal in the bunker.'},
  gauge:{p:[BX+fdx*(BR+.75),BY0+BH*.62+.35,BZ+fdz*(BR+.75)],t:[BX+fdx*(BR+.07),BY0+BH*.62+.12,BZ+fdz*(BR+.07)],fov:38,where:'Boiler room · close look',text:'The pressure gauge. The needle sits just short of the red.'},
  firebox:{p:[BX+fdx*(BR+1.1),.95,BZ+fdz*(BR+1.1)],t:[BX+fdx*BR,.55,BZ+fdz*BR],fov:50,where:'Boiler room · close look',text:'The firebox door. Coal fire behind it, showing red through the draught vents.'},
  pegboard:{p:[-.88,1.5,D-2.3],t:[-.88,1.4,D],fov:58,where:'Boiler room · close look',text:'The pegboard. Each tool hangs inside its own painted outline: wrench, hammer, saw, pliers, two screwdrivers, spanner, mallet.'},
  bench:{p:[-.75,1.75,D-1.75],t:[-.85,.9,D-.35],fov:62,where:'Boiler room · close look',text:'The workbench. A vice, an oil can, rags, a tin of screws.'},
  radio:{p:[-1.0,1.78,D-1.1],t:[-1.32,1.0,D-.4],fov:48,where:'Boiler room · close look',text:'The wireless, its lid off and its valves glowing. Headphones, a Morse key, an accumulator. Nothing but static.'},
  calendar:{p:[-.85,1.55,3.75],t:[-hw,1.55,3.85],fov:40,where:'Boiler room · close look',text:'A coal merchant\'s calendar, still pinned up. December 1911. Someone ringed a Sunday.'},
  coal:{p:[.35,1.55,1.4],t:[-1.3,.2,2.0],fov:58,where:'Boiler room · close look',text:'The coal bunker, half full. A scuttle and a shovel.'},
  dark:{p:[CAMX,1.45,CAMZ],t:[-.05,.95,3.6],fov:72,where:'Boiler room · power out',text:'The bulb goes out and the wireless dies. Only the firebox, red through its vents.',dark:true}},
 update(t,dt,on,dk){bulb.intensity=1.35*on;bench.intensity=.55*on;radioL.intensity=.25*on;bulbM.emissiveIntensity=3*on;glowMats.forEach((m,i)=>m.emissiveIntensity=g0[i]*on);
  const fl=.85+.1*Math.sin(t*6.3)+.05*Math.sin(t*15.7);fire.intensity=1.0*fl*(1+.3*dk);MAT.glow.emissiveIntensity=.75*fl;hemi.intensity=.36-.27*dk}};
});
