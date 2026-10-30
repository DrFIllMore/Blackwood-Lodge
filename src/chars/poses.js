/* Blackwood Lodge — every guest stands their own way. figure(name,{coat,expr,mirror}) -> full-length SVG 600x2200.
   Each guest has a build, a stance, what their hands are doing and something that says who they are. */
(function(root){
const P=root.PEOPLE||require('./people.js');const mix=P.mix,COATC=P.COATC;
const INK='#0c0c0f';
const pt=(a)=>a.map(p=>p.join(' '));
/* a limb: an inked, round-jointed stroke; upper and lower parts can taper */
function limb(pts,w0,w1,fill,ink=INK){const [a,b,c]=pts;let s='';
  s+=`<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" stroke="${ink}" stroke-width="${w0+9}" stroke-linecap="round" fill="none"/>`;
  if(c)s+=`<path d="M${b[0]} ${b[1]} L${c[0]} ${c[1]}" stroke="${ink}" stroke-width="${w1+9}" stroke-linecap="round" fill="none"/>`;
  s+=`<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" stroke="${fill}" stroke-width="${w0}" stroke-linecap="round" fill="none"/>`;
  if(c)s+=`<path d="M${b[0]} ${b[1]} L${c[0]} ${c[1]}" stroke="${fill}" stroke-width="${w1}" stroke-linecap="round" fill="none"/>`;return s}
const ang=(a,b)=>Math.atan2(b[0]-a[0],b[1]-a[1])*-180/Math.PI;
/* a cuff across the end of a forearm */
function cuff(e,w,wid,col='#efe9de'){const r=ang(e,w);return `<g transform="translate(${w[0]} ${w[1]}) rotate(${r})"><rect x="${-wid/2-3}" y="-14" width="${wid+6}" height="24" fill="${col}" stroke="${INK}" stroke-width="3.5" rx="2"/></g>`}
/* hands, drawn pointing down from the wrist and turned to the forearm */
/* one hand for the whole cast: the same palm, the same four fingers and thumb, the same size against the cuff.
   Only what the fingers are doing changes: relaxed, flat, gripping, or holding something between two fingers. */
function hand(type,e,w,sk,skS,flip){const r=ang(e,w);
  /* where the thumb goes is decided by anatomy, not by hand: a hand hanging at the side turns its thumb forward,
     toward the body's centre; a hand held across the body keeps its thumb on top */
  const rr=r*Math.PI/180,cx0=Math.cos(rr),sy0=Math.sin(rr),dx=w[0]-e[0],dy=w[1]-e[1],vert=Math.abs(dy)>Math.abs(dx)*1.2;
  const f=vert?((-cx0)*(300-w[0])>=0?1:-1):((-sy0)<0?1:-1);const X=v=>v*f;const st=`stroke="${INK}" stroke-linejoin="round"`;
  const kind={hang:'relax',hang2:'relax',flat:'flat',grip:'grip',holder:'hold',holder2:'hold'}[type]||'relax';
  const palm=`<path d="M${X(-36)} 0 C${X(-40)} 28 ${X(-38)} 56 ${X(-34)} 76 C${X(-12)} 84 ${X(14)} 84 ${X(36)} 76 C${X(40)} 52 ${X(39)} 24 ${X(35)} 0 Z" fill="${sk}" ${st} stroke-width="4"/><path d="M${X(14)} 8 C${X(22)} 30 ${X(24)} 52 ${X(22)} 70" stroke="${skS}" stroke-width="10" opacity=".4" fill="none"/>`;
  const thumbSide=`<path d="M${X(-34)} 12 C${X(-56)} 30 ${X(-62)} 62 ${X(-52)} 86 C${X(-46)} 98 ${X(-34)} 94 ${X(-35)} 82 C${X(-37)} 64 ${X(-31)} 46 ${X(-22)} 32 Z" fill="${sk}" ${st} stroke-width="3.5"/>`;
  const cx=[-26,-9,8,25];
  const finger=(i,len,bend=0)=>{const x=cx[i];const t=x+bend;return `<path d="M${X(x-9)} 70 C${X(x-10)} ${70+len*.6} ${X(t-8)} ${70+len*.92} ${X(t)} ${70+len} C${X(t+8)} ${70+len*.94} ${X(x+10)} ${70+len*.6} ${X(x+9)} 70 Z" fill="${sk}" ${st} stroke-width="3.4"/><path d="M${X(x-6)} ${70+len*.52} C${X(x-2)} ${70+len*.58} ${X(x+3)} ${70+len*.58} ${X(x+6)} ${70+len*.52}" stroke="${INK}" stroke-width="1.7" fill="none" opacity=".5"/>`};
  const folded=i=>{const x=cx[i];return `<path d="M${X(x-9)} 66 C${X(x-10)} 84 ${X(x-6)} 96 ${X(x)} 98 C${X(x+7)} 96 ${X(x+10)} 84 ${X(x+9)} 66 Z" fill="${sk}" ${st} stroke-width="3.2"/>`};
  let d='';
  if(kind==='relax'){const L=[56,64,60,47],B=[2,3,3,2];for(let i=3;i>=0;i--)d+=finger(i,L[i],B[i]);d+=palm+thumbSide}
  else if(kind==='flat'){const L=[60,68,64,50];for(let i=3;i>=0;i--)d+=finger(i,L[i],0);d+=palm+thumbSide}
  else if(kind==='grip'){for(let i=3;i>=0;i--)d+=folded(i);d+=palm+`<path d="M${X(-30)} 82 C${X(-10)} 90 ${X(12)} 90 ${X(32)} 82" stroke="${INK}" stroke-width="2" fill="none" opacity=".55"/><path d="M${X(-34)} 14 C${X(-52)} 34 ${X(-44)} 66 ${X(-20)} 84 C${X(-6)} 92 ${X(6)} 84 ${X(-2)} 74 C${X(-16)} 64 ${X(-24)} 44 ${X(-22)} 30 Z" fill="${sk}" ${st} stroke-width="3.5"/>`}
  else {d+=folded(3)+folded(2)+finger(1,68,0)+finger(0,62,0)+palm+`<path d="M${X(-34)} 14 C${X(-52)} 30 ${X(-54)} 56 ${X(-42)} 72 C${X(-34)} 80 ${X(-24)} 74 ${X(-26)} 64 C${X(-28)} 52 ${X(-24)} 40 ${X(-16)} 32 Z" fill="${sk}" ${st} stroke-width="3.4"/>`}
  return `<g transform="translate(${w[0]} ${w[1]}) rotate(${r})">${d}</g>`}
function shoe(a,dir,fem,col='#141218'){const [x,y]=a,f=dir==='R'?-1:1;
  return fem?`<path d="M${x+40*f} ${y+38} C${x+40*f} ${y+12} ${x+6*f} ${y-2} ${x-34*f} ${y+4} C${x-54*f} ${y+8} ${x-62*f} ${y+24} ${x-58*f} ${y+40} L${x-40*f} ${y+40} L${x-34*f} ${y+30} L${x+24*f} ${y+38} L${x+30*f} ${y+52} L${x+40*f} ${y+52} Z" fill="${col}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>`
   :`<path d="M${x+44*f} ${y+46} C${x+46*f} ${y+10} ${x+10*f} ${y-6} ${x-40*f} ${y} C${x-70*f} ${y+4} ${x-78*f} ${y+30} ${x-74*f} ${y+50} Z" fill="${col}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M${x-50*f} ${y+14} C${x-30*f} ${y+4} ${x-6*f} ${y+2} ${x+14*f} ${y+6}" stroke="#fff" stroke-width="3" opacity=".3" fill="none"/>`}
/* coat skirt: drawn over the jacket's lower edge so the two read as one coat.
   It starts exactly where the jacket is cut, at the same width, and carries on its seams, shading and halftone. */
let SK=null;function skirt(c,o){SK={c,o};return ''}
function skirt2(c,o,bx,belly){const {hl,hr,hy,trou,vent}=o,pale=o.pale;const st=pale?'#3a3630':INK;const Y=944,sp=304;
  const tl=300-200*bx+22-belly,tr=300+200*bx-22,hx=300+170*bx,fl=300-150*bx;
  const side=`M${tl} ${Y} C${tl-8} 1150 ${hl+6} 1380 ${hl} ${hy} C${(hl+hr)/2-80} ${hy+14} ${(hl+hr)/2+80} ${hy+14} ${hr} ${hy} C${hr-6} 1380 ${tr+8} 1150 ${tr} ${Y}`;
  let s=`<path fill="${c[0]}" d="${side} Z"/>`;
  s+=`<path fill="${c[1]}" d="M${sp} ${Y} L${tr} ${Y} C${tr+8} 1150 ${hr-6} 1380 ${hr} ${hy} C${(hr+sp)/2} ${hy+10} ${sp+30} ${hy+12} ${sp+18} ${hy+12} L${sp} 1380 Z"/>`;
  s+=`<path fill="url(#htx)" opacity="${(o.lt&&o.lt!=='L'?0:1)*(pale?.3:.5)}" d="M${hx} ${Y} L${tr} ${Y} C${tr+8} 1150 ${hr-6} 1380 ${hr} ${hy} L${hr-56} ${hy+6} C${hr-50} 1380 ${hx+4} 1150 ${hx} ${Y} Z"/>`;
  s+=`<path d="M${fl} ${Y} C${fl-2} 1150 ${hl+60} 1380 ${hl+66} ${hy-6}M${hx} ${Y} C${hx+2} 1150 ${hr-60} 1380 ${hr-66} ${hy-6}" stroke="${st}" stroke-width="3" fill="none" opacity=".7"/>`;
  s+=`<path d="M${sp} ${Y} L${sp} 1380" stroke="${st}" stroke-width="3.5" fill="none"/>`;
  if(vent)s+=`<path fill="${trou}" stroke="${st}" stroke-width="3.5" stroke-linejoin="round" d="M${sp} 1380 L${sp-22} ${hy+12} L${sp+22} ${hy+12} Z"/>`;
  s+=`<path d="M${tl-40} ${(Y+1150)/2} L${tl+50} ${(Y+1150)/2+4} L${tl+50} ${(Y+1150)/2+18} L${tl-38} ${(Y+1150)/2+14} Z" fill="${mix(c[0],'#000',.22)}" stroke="${st}" stroke-width="3" opacity="0"/>`;
  s+=`<path d="${side}" fill="none" stroke="${st}" stroke-width="5" stroke-linejoin="round"/>`;
  s+=`<path stroke="#e3243b" stroke-width="5" fill="none" stroke-linecap="round" d="M${tr+6} 1000 C${tr+8} 1150 ${hr-6} 1380 ${hr} ${hy}"/>`;
  return s}
const HT='<pattern id="htx" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="3" cy="3" r="1.5" fill="#0c0c0f"/></pattern>';
/* the torso clip keeps the jacket and lapels and drops the cape-like sides of the bust */
const torso=(bx,belly=0)=>{const L=300-(300-100)*bx,R=300+(500-300)*bx;return `M${300-280*bx} 380 L${300+280*bx} 380 L${R+30} 560 C${R+10} 700 ${R-10} 860 ${R-22} 946 L${L+22-belly} 946 C${L+6-belly} 860 ${L-6-belly*.5} 700 ${L-30} 560 Z`};

/* ---------- the six ---------- */
const POSE={
 /* cold, guarded: chin up, cigarette holder at her lips' height, the other arm across her waist propping the elbow */
 'Harriet Vane':{dir:'L',bx:.9,tilt:-5,expr:'doubt',draw(c,L,sk,skS){const fem=1;let b='',f='';
   b+=shoe([226,2120],'L',fem)+shoe([338,2112],'L',fem);
   b+=`<path stroke="${INK}" stroke-width="5" stroke-linejoin="round" fill="${L.dress||'#2b2033'}" d="M150 940 C140 1300 120 1800 104 2140 C220 2160 400 2160 500 2136 C484 1800 462 1300 452 940 Z"/><path fill="#000" opacity=".35" d="M330 940 L452 940 C462 1300 484 1800 500 2136 C440 2148 390 2152 352 2154 C358 1700 350 1200 330 940 Z"/><path d="M200 1100 C190 1500 176 1850 168 2120" stroke="${mix(L.dress||'#2b2033','#fff',.22)}" stroke-width="4" fill="none"/>`;
   b+=`<path stroke="${INK}" stroke-width="5" fill="${c[0]}" d="M84 600 C70 900 72 1250 88 1560 L190 1560 C186 1250 188 900 196 620 Z"/><path stroke="${INK}" stroke-width="5" fill="${c[1]}" d="M404 610 C414 900 420 1250 414 1560 L512 1560 C528 1250 528 900 514 600 Z"/>`;
   f+=limb([[470,606],[478,940],[250,970]],96,78,c[1])+cuff([470,940],[250,970],70)+hand('flat',[470,940],[214,972],sk,skS);
   f+=`<path d="M120 900 C150 860 190 820 214 760" stroke="#000" stroke-width="30" opacity=".22" fill="none" stroke-linecap="round"/>`+limb([[132,606],[94,918]],96,0,c[0])+limb([[94,918],[226,706]],80,0,mix(c[0],'#000',.14))+`<circle cx="104" cy="924" r="40" fill="${c[0]}"/><path d="M66 900 C70 940 96 966 130 960" stroke="${INK}" stroke-width="5" fill="none"/>`+cuff([94,918],[226,706],68)+hand('holder2',[94,918],[234,668],sk,skS);
   f+=`<path d="M300 560 L206 462" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M300 560 L206 462" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/><path d="M214 470 L200 456" stroke="#f4efe4" stroke-width="6" stroke-linecap="round"/><circle cx="198" cy="454" r="5" fill="#ff6a2a"/><path d="M196 444 C186 412 208 388 194 356 C184 332 200 310 190 282" stroke="#d9d4cc" stroke-width="3.5" fill="none" opacity=".6"/>`;
   return {b,f}}},
 /* steady: broad, square to the room, bag in one hand and the other hand in his pocket */
 'Dr. Okafor':{dir:'R',bx:1.06,expr:'calm',draw(c,L,sk,skS){let b='',f='';const tr='#26262c';
   b+=limb([[248,1180],[240,1640],[232,2100]],100,92,tr)+limb([[364,1180],[380,1640],[392,2096]],100,92,mix(tr,'#000',.35));
   b+=shoe([232,2108],'L')+shoe([392,2102],'L');
   b+=skirt(c,{wl:118,wr:482,hl:96,hr:510,hy:1570,split:300,trou:tr,vent:1});
   f+=limb([[478,624],[516,920],[496,1170]],90,80,c[1])+cuff([516,920],[496,1170],76)+hand('hang',[516,920],[496,1184],sk,skS);
   f+=limb([[126,626],[96,950],[112,1250]],92,82,c[0])+cuff([96,950],[112,1250],76)+hand('grip',[96,950],[113,1268],sk,skS);
   f+=`<path d="M70 1336 C70 1300 160 1300 160 1336" stroke="${INK}" stroke-width="12" fill="none"/><path d="M70 1336 C70 1300 160 1300 160 1336" stroke="#4a2a1a" stroke-width="6" fill="none"/>
<path d="M20 1360 C24 1330 210 1330 214 1360 L224 1520 C150 1536 80 1536 10 1520 Z" fill="#5a3220" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M20 1360 C80 1380 160 1380 214 1360" stroke="${INK}" stroke-width="3" fill="none"/><path d="M110 1374 L110 1400" stroke="#d9b25e" stroke-width="7"/><path d="M140 1356 L200 1356 L208 1520 L150 1526 Z" fill="#000" opacity=".28"/><path d="M34 1390 C40 1440 40 1480 34 1510" stroke="#fff" stroke-width="3" opacity=".25" fill="none"/>`;
   return {b,f}}},
 /* wary: back against the wall, one foot up on it, hands deep in his pockets, cigarette in his mouth */
 'Tomas Reyes':{dir:'L',bx:.92,lean:6,tilt:-3,expr:'evasive',cig:1,draw(c,L,sk,skS){let b='',f='';const tr='#2e323c';
   b+=limb([[360,1180],[430,1600],[352,1840]],96,88,mix(tr,'#000',.35))+shoe([340,1842],'L',0);
   b+=limb([[246,1180],[226,1640],[214,2104]],98,90,tr)+shoe([214,2110],'L');
   b+=`<path d="M200 1580 L190 2090" stroke="${INK}" stroke-width="5" fill="none" opacity=".6"/>`;
   b+=skirt(c,{wl:130,wr:470,hl:110,hr:500,hy:1560,split:300,trou:tr,vent:1});
   f+=limb([[470,604],[516,910],[486,1160]],96,82,mix(c[1],'#fff',.1))+cuff([516,910],[486,1160],74)+hand('hang2',[516,910],[486,1172],sk,skS,1);
   f+=limb([[130,604],[92,910],[116,1170]],96,82,mix(c[0],'#fff',.1))+cuff([92,910],[116,1170],74)+hand('hang2',[92,910],[116,1182],sk,skS);
   return {b,f}}},
 /* nervous: folder clutched to her chest with both arms, shoulders in, feet together and turned in */
 'Iris Lund':{dir:'R',bx:.86,tilt:5,expr:'uneasy',draw(c,L,sk,skS){const fem=1;let b='',f='';const leg=mix(sk,'#2a1e22',.35);
   b+=limb([[268,1600],[270,1860],[268,2100]],58,54,leg)+limb([[334,1600],[332,1860],[334,2096]],58,54,mix(leg,'#000',.3));
   b+=shoe([276,2106],'R',fem)+shoe([326,2100],'L',fem);
   b+=`<path stroke="${INK}" stroke-width="5" fill="#2c2c38" d="M150 1480 L450 1480 C462 1560 470 1650 472 1730 C380 1744 220 1744 128 1730 C130 1650 138 1560 150 1480 Z"/>`;
   b+=skirt(c,{wl:146,wr:454,hl:130,hr:470,hy:1580,split:300,trou:'#2c2c38'});
   f+=`<g transform="rotate(-7 300 780)"><rect x="196" y="640" width="200" height="262" rx="4" fill="#d8b878" stroke="${INK}" stroke-width="5"/><rect x="214" y="626" width="70" height="26" rx="4" fill="#d8b878" stroke="${INK}" stroke-width="4"/><path d="M214 690 L376 690M214 720 L350 720" stroke="#8a6a3a" stroke-width="3"/><rect x="300" y="640" width="96" height="262" fill="#000" opacity=".15"/></g>`;
   f+=limb([[470,624],[470,890],[330,790]],84,72,c[1])+cuff([470,890],[330,790],64)+hand('flat',[470,890],[300,784],sk,skS);
   f+=limb([[132,626],[150,900],[262,810]],84,72,c[0])+cuff([150,900],[262,810],64)+hand('flat',[150,900],[292,800],sk,skS);
   return {b,f}}},
 /* gruff: stout and planted, chest out, cane ahead of him, the other hand behind his back */
 'Colonel Ash':{dir:'L',bx:1.12,belly:34,tilt:-4,expr:'doubt',draw(c,L,sk,skS){let b='',f='';const tr='#26262c';
   b+=limb([[234,1190],[214,1640],[204,2100]],108,96,tr)+limb([[372,1190],[394,1640],[404,2096]],108,96,mix(tr,'#000',.35));
   b+=shoe([204,2108],'L')+shoe([404,2102],'L');
   b+=skirt(c,{wl:96,wr:500,hl:76,hr:520,hy:1560,split:296,trou:tr,vent:1});
   f+=limb([[486,624],[530,910],[512,1180]],96,84,c[1])+cuff([530,910],[512,1180],80)+hand('hang',[530,910],[512,1194],sk,skS);
   f+=`<path d="M62 1236 L22 2150" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M62 1236 L22 2150" stroke="#5a3a22" stroke-width="9" stroke-linecap="round"/><path d="M30 1236 C40 1200 92 1196 104 1232" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M30 1236 C40 1200 92 1196 104 1232" stroke="#d9b25e" stroke-width="10" fill="none" stroke-linecap="round"/>`;
   f+=limb([[124,632],[64,920],[66,1180]],98,86,c[0])+cuff([64,920],[66,1180],80)+hand('grip',[64,920],[68,1196],sk,skS);
   return {b,f}}},
 /* seated, turned three-quarters: thighs run forward to the knees, shins drop to the floor, the coat lies over his lap;
    one hand on the cane planted in front of his knees, the other flat on his thigh */
 /* seated, built on the same skeleton as the standing figure: shoulders, waist and hips stay where they are (hips at 1150),
    so the body keeps its length. Only the legs change: thighs come forward toward you (foreshortened, wider at the knee
    because the knee is nearer), knees at seat height, shins straight down to the floor, feet toward you.
    The coat opens over the lap and its skirts fall over the seat either side. */
 'Colonel Ash·sit':{dir:'L',bx:1.12,belly:34,tilt:-4,expr:'doubt',draw(c,L,sk,skS){let b='',f='';const tr='#3a3a48',trD=mix(tr,'#000',.3),st=`stroke="${INK}" stroke-width="6" stroke-linejoin="round"`;
   /* coat skirts behind the legs, falling onto the seat */
   b+=`<path d="M64 944 L300 944 L300 1150 C220 1200 120 1220 34 1214 C30 1120 44 1020 64 944 Z" fill="${c[0]}" ${st}/><path d="M300 944 L504 944 C520 1030 532 1120 536 1214 C450 1220 370 1200 300 1150 Z" fill="${c[1]}" ${st}/>`;
   /* far leg: thigh (hip 1150 to knee 1250), knee, shin to the ankle at 1690, shoe toward you */
   b+=`<path d="M336 1120 L446 1120 L470 1250 C440 1286 344 1286 316 1252 Z" fill="${trD}" ${st}/>`;
   b+=`<path d="M330 1262 L452 1262 L436 1692 L350 1692 Z" fill="${trD}" ${st}/><path d="M402 1290 C406 1450 404 1580 400 1680" stroke="#000" stroke-width="10" opacity=".22" fill="none"/>`;
   b+=`<path d="M330 1700 C330 1676 360 1668 394 1668 C430 1668 458 1678 458 1702 C458 1726 432 1738 394 1738 C356 1738 330 1726 330 1700 Z" fill="#141218" ${st}/><path d="M356 1688 C376 1680 404 1680 426 1686" stroke="#fff" stroke-width="4" opacity=".28" fill="none"/>`;
   /* near leg: a little lower and wider, it is nearer to you */
   b+=`<path d="M170 1130 L292 1130 L318 1268 C286 1306 172 1306 140 1270 Z" fill="${tr}" ${st}/>`;
   b+=`<path d="M146 1282 L314 1282 L294 1712 L180 1712 Z" fill="${tr}" ${st}/><path d="M238 1310 C242 1460 240 1600 236 1700" stroke="#000" stroke-width="10" opacity=".2" fill="none"/>`;
   b+=`<path d="M164 1722 C164 1694 200 1684 238 1684 C278 1684 310 1694 310 1722 C310 1750 280 1764 238 1764 C196 1764 164 1750 164 1722 Z" fill="#141218" ${st}/><path d="M190 1708 C214 1698 246 1698 272 1706" stroke="#fff" stroke-width="4" opacity=".28" fill="none"/>`;
   /* knee tops catch the firelight */
   b+=`<path d="M156 1264 C190 1252 268 1252 304 1262" stroke="#fff" stroke-width="5" opacity=".16" fill="none"/><path d="M326 1246 C356 1238 432 1238 460 1246" stroke="#fff" stroke-width="5" opacity=".12" fill="none"/>`;
   /* the coat front falls open over the tops of the thighs */
   b+=`<path d="M64 944 L292 944 C280 1010 250 1080 200 1132 C150 1150 96 1150 52 1140 C50 1070 56 1000 64 944 Z" fill="${c[0]}" ${st}/><path d="M300 944 L504 944 C512 1010 516 1080 516 1132 C480 1146 430 1144 392 1128 C350 1080 314 1010 300 944 Z" fill="${c[1]}" ${st}/>`;
   /* other hand resting on his knee */
   f+=limb([[486,624],[536,900],[410,1176]],96,84,c[1])+cuff([536,900],[410,1176],78)+hand('flat',[536,900],[404,1190],sk,skS);
   /* cane planted by his near foot, hand over the knob */
   f+=`<path d="M78 1148 L96 1752" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M78 1148 L96 1752" stroke="#5a3a22" stroke-width="9" stroke-linecap="round"/><path d="M44 1154 C54 1118 106 1114 118 1150" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M44 1154 C54 1118 106 1114 118 1150" stroke="#d9b25e" stroke-width="10" fill="none" stroke-linecap="round"/>`;
   f+=limb([[124,632],[66,900],[80,1092]],98,86,c[0])+cuff([66,900],[80,1092],80)+hand('grip',[66,900],[80,1106],sk,skS);
   return {b,f}}},
 /* warm: round and busy, bringing the tea on a tray */
 'Nell Parry':{dir:'R',bx:1.1,belly:20,expr:'polite',draw(c,L,sk,skS){const fem=1;let b='',f='';const leg=mix(sk,'#2a1e22',.35);
   b+=limb([[250,1620],[246,1860],[242,2100]],62,56,leg)+limb([[352,1620],[356,1860],[360,2096]],62,56,mix(leg,'#000',.3));
   b+=shoe([244,2106],'R',fem)+shoe([358,2100],'R',fem);
   b+=`<path stroke="${INK}" stroke-width="5" fill="#8a6a5a" d="M120 1470 L480 1470 C494 1560 504 1660 506 1760 C400 1776 200 1776 96 1760 C98 1660 106 1560 120 1470 Z"/><path stroke="${INK}" stroke-width="4" fill="#f1ede4" d="M180 1470 L420 1470 L430 1720 L170 1720 Z"/>`;
   b+=skirt(c,{wl:110,wr:490,hl:96,hr:506,hy:1580,split:300,trou:'#8a6a5a'});
   f+=limb([[126,626],[80,900],[92,1060]],94,82,c[0])+limb([[478,624],[524,900],[508,1060]],94,82,c[1]);
   f+=`<path d="M70 1050 L530 1050 L512 1090 L88 1090 Z" fill="#c9c2b4" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M88 1090 L512 1090 L508 1102 L92 1102 Z" fill="#8a8274" stroke="${INK}" stroke-width="3"/>
<path d="M250 1050 C230 1050 222 990 244 966 C258 950 304 946 322 962 C344 984 340 1050 316 1050 Z" fill="#f1ede4" stroke="${INK}" stroke-width="4.5"/><path d="M326 990 C352 984 362 970 372 960" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M326 990 C352 984 362 970 372 960" stroke="#f1ede4" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M244 1000 C228 996 220 1010 230 1026" stroke="${INK}" stroke-width="5" fill="none"/><ellipse cx="282" cy="960" rx="22" ry="7" fill="#f1ede4" stroke="${INK}" stroke-width="4"/><circle cx="282" cy="950" r="6" fill="#3f6a4c" stroke="${INK}" stroke-width="2.5"/><path d="M262 1006 C278 1012 300 1012 314 1006" stroke="#3f6a4c" stroke-width="5" fill="none"/>
<path d="M118 1050 C116 1030 118 1018 128 1016 L170 1016 C178 1018 180 1032 178 1050 Z" fill="#f1ede4" stroke="${INK}" stroke-width="4"/><path d="M420 1050 C418 1030 420 1018 430 1016 L472 1016 C480 1018 482 1032 480 1050 Z" fill="#f1ede4" stroke="${INK}" stroke-width="4"/><path d="M176 1028 C188 1026 190 1040 178 1042M478 1028 C490 1026 492 1040 480 1042" stroke="${INK}" stroke-width="3.5" fill="none"/>`;
   f+=cuff([80,900],[92,1060],70)+cuff([524,900],[508,1060],70)+hand('grip',[-20,1072],[96,1072],sk,skS)+hand('grip',[620,1072],[504,1072],sk,skS);
   return {b,f}}},
 /* quiet: broad and still, storm lantern hanging from one hand, thumb hooked in his pocket */
 'Lionel Crane':{dir:'R',bx:1.08,expr:'calm',draw(c,L,sk,skS){let b='',f='';const tr='#4a3e2a';
   b+=limb([[244,1180],[236,1640],[228,2096]],104,94,tr)+limb([[366,1180],[384,1640],[396,2092]],104,94,mix(tr,'#000',.35));
   b+=shoe([228,2104],'L',0,'#2a1e14')+shoe([396,2100],'L',0,'#22180f');
   b+=skirt(c,{wl:116,wr:484,hl:94,hr:512,hy:1560,split:300,trou:tr,vent:1});
   f+=limb([[472,624],[506,920],[490,1160]],92,82,c[1])+cuff([506,920],[490,1160],76)+hand('hang',[506,920],[490,1174],sk,skS);
   f+=limb([[132,624],[108,940],[118,1236]],94,84,c[0])+cuff([108,940],[118,1236],78)+hand('grip',[108,940],[119,1254],sk,skS);
   f+=`<path d="M92 1318 C92 1280 150 1280 150 1318" stroke="${INK}" stroke-width="9" fill="none"/><path d="M92 1318 C92 1280 150 1280 150 1318" stroke="#8a6a2a" stroke-width="4" fill="none"/>
<path d="M78 1330 L164 1330 L156 1352 L86 1352 Z" fill="#6a5020" stroke="${INK}" stroke-width="4"/><rect x="88" y="1352" width="66" height="96" rx="10" fill="#ffd27a" stroke="${INK}" stroke-width="4"/><path d="M98 1360 L98 1440M144 1360 L144 1440" stroke="#6a5020" stroke-width="5"/><ellipse cx="121" cy="1408" rx="10" ry="18" fill="#fff4c8"/>
<path d="M80 1448 L162 1448 L168 1474 L74 1474 Z" fill="#6a5020" stroke="${INK}" stroke-width="4"/><circle cx="121" cy="1400" r="60" fill="#ffd27a" opacity=".16"/>`;
   return {b,f}}},
 /* anxious: rigid and upright, hands clasped at her waist around the ring of house keys */
 'Mrs. Dunmore':{dir:'L',bx:.9,tilt:2,expr:'uneasy',draw(c,L,sk,skS){const fem=1;let b='',f='';const leg=mix(sk,'#2a1e22',.45);
   b+=limb([[268,1640],[268,1880],[266,2100]],56,52,leg)+limb([[334,1640],[334,1880],[336,2096]],56,52,mix(leg,'#000',.3));
   b+=shoe([262,2106],'L',fem)+shoe([334,2100],'L',fem);
   b+=`<path stroke="${INK}" stroke-width="5" fill="#18151c" d="M140 1480 L460 1480 C470 1580 476 1680 478 1760 C380 1772 220 1772 122 1760 C124 1680 130 1580 140 1480 Z"/>`;
   b+=skirt(c,{wl:138,wr:462,hl:124,hr:476,hy:1590,split:300,trou:'#18151c'});
   f+=limb([[472,624],[466,930],[336,1040]],84,74,c[1])+cuff([466,930],[336,1040],66)+limb([[132,624],[142,930],[264,1040]],84,74,c[0])+cuff([142,930],[264,1040],66);
   f+=`<path d="M300 1060 L300 1110" stroke="${INK}" stroke-width="4"/><circle cx="300" cy="1128" r="18" fill="none" stroke="${INK}" stroke-width="7"/><circle cx="300" cy="1128" r="18" fill="none" stroke="#c9a24a" stroke-width="3.5"/>
<g stroke="${INK}" stroke-width="3" fill="#c9a24a"><path d="M288 1142 L280 1196 L292 1196 L296 1146 Z"/><path d="M302 1146 L304 1210 L316 1208 L312 1144 Z"/><path d="M314 1138 L334 1186 L344 1180 L322 1134 Z"/></g>`;
   f+=hand('flat',[262,880],[272,1048],sk,skS)+hand('flat',[338,880],[328,1048],sk,skS);
   return {b,f}}},
 /* amused: easy and loose, weight on one hip, brush up by his shoulder, other hand in his pocket */
 'Felix Osei':{dir:'R',bx:.95,lean:-3,expr:'sly',draw(c,L,sk,skS){let b='',f='';const tr='#34405a';
   b+=limb([[242,1180],[236,1640],[230,2100]],98,90,tr)+limb([[364,1180],[338,1620],[366,2086]],98,90,mix(tr,'#000',.35));
   b+=`<g opacity=".85"><circle cx="214" cy="1820" r="7" fill="#e3a83a"/><circle cx="244" cy="1900" r="5" fill="#2f6fb0"/><circle cx="350" cy="1760" r="6" fill="#c41a30"/></g>`;
   b+=shoe([230,2108],'L')+shoe([366,2094],'L');
   b+=skirt(c,{wl:126,wr:474,hl:104,hr:494,hy:1560,split:300,trou:tr,vent:1});
   f+=limb([[472,624],[504,930],[488,1170]],88,78,c[1])+cuff([504,930],[488,1170],72)+hand('hang',[504,930],[488,1184],sk,skS);
   f+=limb([[132,624],[160,950],[206,720]],88,76,c[0])+cuff([160,950],[206,720],68)+hand('grip',[160,950],[210,700],sk,skS);
   f+=`<path d="M190 690 L112 520" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M190 690 L112 520" stroke="#a8743a" stroke-width="6" stroke-linecap="round"/><path d="M118 532 L108 510" stroke="#c0c0c8" stroke-width="10" stroke-linecap="round"/><path d="M106 506 C100 494 102 482 108 474 C114 484 114 496 106 506 Z" fill="#c41a30" stroke="${INK}" stroke-width="3"/>`;
   return {b,f}}},
 /* composed: checking the watch pinned at her breast, the other arm easy at her side */
 'Agnes Teale':{dir:'L',bx:.9,tilt:4,expr:'calm',draw(c,L,sk,skS){const fem=1;let b='',f='';const leg=mix(sk,'#ffffff',.2);
   b+=limb([[266,1640],[264,1880],[262,2100]],56,52,leg)+limb([[336,1640],[338,1880],[340,2096]],56,52,mix(leg,'#000',.12));
   b+=shoe([258,2106],'L',fem,'#e8e4dc')+shoe([336,2100],'L',fem,'#d8d4cc');
   b+=`<path stroke="${INK}" stroke-width="5" fill="#eef0f2" d="M140 1480 L460 1480 C470 1580 476 1680 478 1760 C380 1772 220 1772 122 1760 C124 1680 130 1580 140 1480 Z"/><path fill="#000" opacity=".12" d="M320 1480 L460 1480 C470 1580 476 1680 478 1760 C420 1768 370 1770 330 1770 Z"/>`;
   b+=skirt(c,{wl:138,wr:462,hl:124,hr:476,hy:1590,split:300,trou:'#eef0f2'});
   f+=limb([[472,624],[486,940],[480,1236]],84,74,c[1])+cuff([486,940],[480,1236],66)+hand('hang',[486,940],[480,1254],sk,skS,1);
   f+=limb([[132,624],[136,930],[236,850]],84,74,c[0])+cuff([136,930],[236,850],66)+hand('flat',[136,930],[268,840],sk,skS);
   f+=`<circle cx="292" cy="836" r="20" fill="#d9b25e" stroke="${INK}" stroke-width="4"/><circle cx="292" cy="836" r="13" fill="#f6f1e6"/><path d="M292 836 L292 826M292 836 L299 840" stroke="${INK}" stroke-width="2.4"/><path d="M300 818 C320 790 330 770 330 750" stroke="#d9b25e" stroke-width="3" fill="none"/>`;
   return {b,f}}},
 /* smooth: thin, a little stooped, turning a porcelain figure in his fingers, the other hand behind his back */
 'Piet Hollander':{dir:'R',bx:.84,lean:-4,tilt:6,expr:'polite',draw(c,L,sk,skS){let b='',f='';const tr='#26262c';
   b+=limb([[252,1180],[248,1640],[244,2100]],92,84,tr)+limb([[352,1180],[364,1640],[374,2096]],92,84,mix(tr,'#000',.35));
   b+=shoe([244,2108],'L')+shoe([374,2102],'L');
   f+=limb([[472,624],[508,900],[494,1150]],84,74,c[1])+cuff([508,900],[494,1150],68)+hand('hang',[508,900],[494,1164],sk,skS);
   b+=skirt(c,{wl:146,wr:454,hl:126,hr:476,hy:1570,split:300,trou:tr,vent:1});
   f+=limb([[132,624],[156,900],[210,770]],84,72,c[0])+cuff([156,900],[210,770],64)+hand('grip',[156,900],[214,752],sk,skS);
   f+=`<path d="M196 728 C190 700 196 676 210 668 C202 650 206 632 222 628 C238 632 240 650 232 668 C246 676 250 700 244 728 Z" fill="#f4f6fa" stroke="${INK}" stroke-width="4"/><path d="M204 700 C214 694 228 694 238 700" stroke="#2f6fb0" stroke-width="4" fill="none"/><path d="M212 680 C216 684 226 684 230 680" stroke="#2f6fb0" stroke-width="2.5" fill="none"/><path d="M200 724 C198 704 204 686 214 678" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>`;
   return {b,f}}},
 /* theatrical: hip cocked, one hand on it, a coupe of champagne held up at her shoulder */
 'Marguerite Sol':{dir:'L',bx:.88,lean:3,tilt:-4,expr:'sly',draw(c,L,sk,skS){const fem=1;let b='',f='';
   b+=shoe([232,2120],'L',fem,'#5a1420')+shoe([336,2112],'L',fem,'#4a1018');
   b+=`<path stroke="${INK}" stroke-width="5" stroke-linejoin="round" fill="${L.dress||'#5a1420'}" d="M152 940 C150 1180 130 1500 120 1800 C112 1960 104 2080 96 2140 C220 2162 400 2162 512 2136 C490 2020 474 1880 466 1700 C458 1420 450 1160 450 940 Z"/><path fill="#000" opacity=".32" d="M330 940 L450 940 C450 1160 458 1420 466 1700 C474 1880 490 2020 512 2136 C450 2150 400 2154 352 2156 C360 1700 350 1200 330 940 Z"/><path d="M196 1060 C186 1460 168 1820 156 2110" stroke="${mix(L.dress||'#5a1420','#fff',.25)}" stroke-width="4" fill="none"/><g fill="#fff" opacity=".55"><circle cx="210" cy="1700" r="2.4"/><circle cx="240" cy="1850" r="2"/><circle cx="196" cy="1990" r="2.4"/><circle cx="262" cy="1620" r="2"/><circle cx="232" cy="2060" r="2"/></g>`;
   b+=`<path stroke="${INK}" stroke-width="5" fill="${c[0]}" d="M88 600 C74 900 76 1180 92 1440 L190 1440 C186 1180 188 900 196 620 Z"/><path stroke="${INK}" stroke-width="5" fill="${c[1]}" d="M404 610 C414 900 420 1180 414 1440 L512 1440 C528 1180 528 900 514 600 Z"/>`;
   f+=limb([[472,624],[548,860],[448,1000]],84,74,'#2a0a10')+hand('flat',[548,860],[430,1006],sk,skS,1);
   f+=limb([[132,624],[118,930],[188,830]],84,74,'#2a0a10')+hand('holder',[118,930],[190,810],sk,skS);
   f+=`<path d="M150 760 C150 720 230 720 230 760 C228 780 206 790 190 790 C174 790 152 780 150 760 Z" fill="#f6ecc8" fill-opacity=".85" stroke="${INK}" stroke-width="4"/><path d="M160 758 C176 766 204 766 220 758" stroke="#d9b25e" stroke-width="3" fill="none"/><path d="M190 790 L192 840" stroke="${INK}" stroke-width="5"/><path d="M190 790 L192 840" stroke="#f6ecc8" stroke-width="2"/><g fill="#fff"><circle cx="182" cy="748" r="2"/><circle cx="198" cy="742" r="1.6"/><circle cx="210" cy="752" r="1.6"/></g>`;
   return {b,f}}}};
const CLOSE=(c)=>`<path fill="${c[0]}" d="M262 836 L304 836 L304 946 L262 946 Z"/><path fill="${c[1]}" d="M304 836 L340 836 L340 946 L304 946 Z"/><path d="M304 836 L304 946" stroke="#0c0c0f" stroke-width="3.5"/>`;
function figure(name,o){o=o||{};const L=P.LOOKS[name],Q=POSE[o.pose||name];if(!L||!Q)return '';
  /* the light is given in screen space; a guest drawn facing right is mirrored, so their light comes from the other side of the drawing */
  const dir0=o.dir||Q.dir;const lt=o.light?Object.assign({},o.light):null;if(lt&&dir0==='R'&&lt.side!=='F')lt.side=lt.side==='L'?'R':'L';
  let c=COATC[o.coat||'dark'];if(lt&&lt.side==='R')c=[c[1],c[0]];else if(lt&&lt.side==='F')c=[c[0],mix(c[0],c[1],.35)];
  const sk=L.skin,s1=mix(sk,'#fff',.08),s2=mix(sk,'#7a3a30',.28);SK=null;const d=Q.draw(c,L,s1,s2);const sk2=SK?skirt2(c,Object.assign({pale:o.coat==='pale',lt:lt&&lt.side},SK.o),Q.bx||1,Q.belly||0):'';
  const dir=o.dir||Q.dir;const lean=Q.lean||0;
  const wrapT=(dir==='R'?'translate(600 0) scale(-1 1) ':'')+(lean?`rotate(${lean} 300 2150)`:'');
  return P.portrait(L,{posed:1,bg:false,light:lt||undefined,coat:o.coat||'dark',expr:o.expr||Q.expr,tilt:Q.tilt||0,cig:Q.cig,bx:Q.bx||1,torsoClip:torso(Q.bx||1,Q.belly||0),
    behind:'<defs>'+HT+'</defs>'+d.b,front:sk2+(L.coatStyle==='stole'?'':CLOSE(c))+d.f,wrapT,size:o.size,vb:o.vb})}
root.POSES={figure,POSE};
})(typeof window!=='undefined'?window:globalThis);
if(typeof module!=='undefined')module.exports=globalThis.POSES;
