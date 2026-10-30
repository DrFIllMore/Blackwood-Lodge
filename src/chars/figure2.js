/* Blackwood Lodge · full figures, second rig.
   Every body is built on a skeleton measured in heads, so each guest has their own height and build, and
   clothes are drawn over that skeleton: shoulders flow into sleeves, hems sit where the garment ends,
   legs and shoes are sized to the person. The faces are the existing inked heads. */
(function(root){
const P=root.PEOPLE||require('./people.js');const mix=P.mix,COATC=P.COATC;
const INK='#0c0c0f';let N=0;
const H=280,TOP=160;                         /* head height and top of head in the portrait's frame */
const f1=v=>Math.round(v*10)/10;
const pts=a=>a.map(p=>f1(p[0])+' '+f1(p[1])).join(' ');

/* ---------- who is who: height in heads, build, what they wear, what their hands are doing ---------- */
const SPEC={
 'Harriet Vane':  {hh:7.5,fem:1,sw:172,ww:112,hw:142,top:'longcoat',hem:.86,under:'gown',gown:'#2b2033',shoe:'heel',arms:['holder','waist'],lean:-1},
 'Dr. Okafor':    {hh:7.9,sw:228,ww:186,hw:184,top:'suit',hem:.52,trou:'#3a3a40',shoe:'oxford',arms:['hang','bag'],tie:'#2c3a66'},
 'Tomas Reyes':   {hh:7.2,sw:196,ww:150,hw:150,top:'peajacket',hem:.50,trou:'#2e323c',shoe:'boot',arms:['hang','hip'],lean:1.5,feet:'wide'},
 'Iris Lund':     {hh:6.9,fem:1,sw:156,ww:104,hw:132,top:'trench',hem:.70,legs:'stocking',shoe:'heel',arms:['folder','hang'],feet:'in'},
 'Colonel Ash':   {hh:7.3,sw:214,ww:214,hw:198,top:'greatcoat',hem:.72,trou:'#26262c',shoe:'oxford',arms:['cane','hang'],belly:40},
 'Nell Parry':    {hh:6.8,fem:1,sw:178,ww:160,hw:176,top:'cardigan',hem:.52,under:'maid',gown:'#24242a',shoe:'flat',legs:'stocking',arms:['tray','tray2']},
 'Lionel Crane':  {hh:8.1,sw:190,ww:128,hw:136,top:'tweed',hem:.53,trou:'#4a3c26',shoe:'tallboot',arms:['lantern','hang'],lean:2},
 'Mrs. Dunmore':  {hh:7.1,fem:1,sw:160,ww:112,hw:140,top:'bodice',hem:.48,under:'long',gown:'#1c1a20',shoe:'flat',arms:['keys','keys2']},
 'Felix Osei':    {hh:7.5,sw:200,ww:162,hw:160,top:'smock',hem:.64,trou:'#2a3550',shoe:'boot',arms:['brush','hang'],scarf:'#d9a020'},
 'Agnes Teale':   {hh:7.0,fem:1,sw:162,ww:118,hw:146,top:'nurse',hem:.80,legs:'stocking',shoe:'flat',arms:['hang','watch']},
 'Piet Hollander':{hh:6.7,sw:170,ww:136,hw:136,top:'waistcoat',hem:.47,trou:'#2a2a30',shoe:'oxford',arms:['vase','vase2'],stoop:6,shirt:'#ece6da'},
 'Marguerite Sol':{hh:7.6,fem:1,sw:166,ww:104,hw:146,top:'gown',hem:.99,gown:'#6a1424',shoe:'heel',arms:['glass','hang']}
};

/* ---------- drawing helpers ---------- */
function stroke(a,b,w,fill){return `<path d="M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])}" stroke="${INK}" stroke-width="${w+9}" stroke-linecap="round"/><path d="M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])}" stroke="${fill}" stroke-width="${w}" stroke-linecap="round"/>`}
const ang=(a,b)=>Math.atan2(b[0]-a[0],b[1]-a[1])*-180/Math.PI;
function cuff(e,w,wid,col='#efe9de'){const r=ang(e,w);return `<g transform="translate(${f1(w[0])} ${f1(w[1])}) rotate(${f1(r)})"><rect x="${-wid/2-2}" y="-12" width="${wid+4}" height="20" fill="${col}" stroke="${INK}" stroke-width="3.5" rx="2"/></g>`}
/* the one hand for everybody; the thumb goes where anatomy puts it */
function hand(kind,e,w,sk,skS,cx=300){const r=ang(e,w),rr=r*Math.PI/180,c0=Math.cos(rr),s0=Math.sin(rr),dx=w[0]-e[0],dy=w[1]-e[1],vert=Math.abs(dy)>Math.abs(dx)*1.2;
  const f=vert?((-c0)*(cx-w[0])>=0?1:-1):((-s0)<0?1:-1);const X=v=>v*f;const st=`stroke="${INK}" stroke-linejoin="round"`;
  const palm=`<path d="M${X(-36)} 0 C${X(-40)} 28 ${X(-38)} 56 ${X(-34)} 76 C${X(-12)} 84 ${X(14)} 84 ${X(36)} 76 C${X(40)} 52 ${X(39)} 24 ${X(35)} 0 Z" fill="${sk}" ${st} stroke-width="4"/><path d="M${X(14)} 8 C${X(22)} 30 ${X(24)} 52 ${X(22)} 70" stroke="${skS}" stroke-width="10" opacity=".4" fill="none"/>`;
  const thumb=`<path d="M${X(-34)} 12 C${X(-56)} 30 ${X(-62)} 62 ${X(-52)} 86 C${X(-46)} 98 ${X(-34)} 94 ${X(-35)} 82 C${X(-37)} 64 ${X(-31)} 46 ${X(-22)} 32 Z" fill="${sk}" ${st} stroke-width="3.5"/>`;
  const cx4=[-26,-9,8,25];
  const finger=(i,len,bend=0)=>{const x=cx4[i],t=x+bend;return `<path d="M${X(x-9)} 70 C${X(x-10)} ${70+len*.6} ${X(t-8)} ${70+len*.92} ${X(t)} ${70+len} C${X(t+8)} ${70+len*.94} ${X(x+10)} ${70+len*.6} ${X(x+9)} 70 Z" fill="${sk}" ${st} stroke-width="3.4"/><path d="M${X(x-6)} ${70+len*.52} C${X(x-2)} ${70+len*.58} ${X(x+3)} ${70+len*.58} ${X(x+6)} ${70+len*.52}" stroke="${INK}" stroke-width="1.7" fill="none" opacity=".5"/>`};
  const folded=i=>{const x=cx4[i];return `<path d="M${X(x-9)} 66 C${X(x-10)} 84 ${X(x-6)} 96 ${X(x)} 98 C${X(x+7)} 96 ${X(x+10)} 84 ${X(x+9)} 66 Z" fill="${sk}" ${st} stroke-width="3.2"/>`};
  let d='';
  if(kind==='relax'){const L=[56,64,60,47],B=[2,3,3,2];for(let i=3;i>=0;i--)d+=finger(i,L[i],B[i]);d+=palm+thumb}
  else if(kind==='flat'){const L=[60,68,64,50];for(let i=3;i>=0;i--)d+=finger(i,L[i],0);d+=palm+thumb}
  else if(kind==='grip'){for(let i=3;i>=0;i--)d+=folded(i);d+=palm+`<path d="M${X(-30)} 82 C${X(-10)} 90 ${X(12)} 90 ${X(32)} 82" stroke="${INK}" stroke-width="2" fill="none" opacity=".55"/><path d="M${X(-34)} 14 C${X(-52)} 34 ${X(-44)} 66 ${X(-20)} 84 C${X(-6)} 92 ${X(6)} 84 ${X(-2)} 74 C${X(-16)} 64 ${X(-24)} 44 ${X(-22)} 30 Z" fill="${sk}" ${st} stroke-width="3.5"/>`}
  else {d+=folded(3)+folded(2)+finger(1,68,0)+finger(0,62,0)+palm+`<path d="M${X(-34)} 14 C${X(-52)} 30 ${X(-54)} 56 ${X(-42)} 72 C${X(-34)} 80 ${X(-24)} 74 ${X(-26)} 64 C${X(-28)} 52 ${X(-24)} 40 ${X(-16)} 32 Z" fill="${sk}" ${st} stroke-width="3.4"/>`}
  return `<g transform="translate(${f1(w[0])} ${f1(w[1])}) rotate(${f1(r)}) scale(1.12)">${d}</g>`}

/* ---------- the body ---------- */
function figure(name,o){o=o||{};const L=P.LOOKS[name],S=SPEC[name];if(!L||!S)return '';const u='f'+(++N);
  const T=S.hh*H,Y=k=>TOP+T*k,cx=300;
  const yN=TOP+H+8,yS=Math.max(Y(.19),yN+70),yE=Y(.37),yW=Y(.37),yHip=Y(.5),yWr=Y(.5),yCr=Y(.5),yK=Y(.72),yA=Y(.95),yF=Y(1);
  const sw=S.sw,ww=S.ww,hw=S.hw,belly=S.belly||0,fem=!!S.fem;
  const C=COATC[o.coat||'dark'],c0=C[0],c1=C[1];const lt=o.light||{side:'L'};
  const sk=L.skin,skS=mix(sk,'#7a3a30',.28),skL=mix(sk,'#fff',.08);
  const halftone=`<pattern id="ht${u}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="3.5" cy="3.5" r="1.5" fill="${INK}"/></pattern>`;
  const split=`<clipPath id="far${u}"><rect x="${cx+6}" y="0" width="900" height="3000"/></clipPath>`;
  /* two tones: lit side and shadow side of every garment */
  const two=(d,a,b,extra='')=>`<path d="${d}" fill="${a}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="${d}" fill="${b}" clip-path="url(#far${u})"/><path d="${d}" fill="url(#ht${u})" opacity=".18" clip-path="url(#far${u})"/><path d="${d}" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>${extra}`;
  const sideX=s=>s<0?cx-sw:cx+sw*.92;              /* near (viewer-left) shoulder is a touch wider: three-quarter view */
  const shoulder=s=>[sideX(s)+(s<0?44:-40),yS+44];
  let back='',legs='',lower='',torso='',front='',props='',propsBack='';

  /* ---- legs and shoes ---- */
  const stance=S.feet==='wide'?[-hw*.62,hw*.58]:S.feet==='in'?[-hw*.3,hw*.24]:[-hw*.46,hw*.42];
  const legW=fem?78:104,ankW=fem?44:80;
  const legCol=S.legs==='stocking'?mix(sk,'#2a1e22',.45):(S.trou||'#2a2a30');
  [[1,stance[1]],[-1,stance[0]]].forEach(([s,dxF])=>{const hipX=cx+s*hw*.42,ankX=cx+dxF;const kneeX=(hipX+ankX)/2+(s<0?-6:6);
    const col=s>0?mix(legCol,'#000',.3):legCol;
    const yb=yF-(s>0?14:0),hemT=yb-(S.shoe==='tallboot'?320:S.shoe==='heel'?40:S.shoe==='boot'?74:58);
    if(S.legs==='stocking')legs+=stroke([hipX,yHip],[kneeX,yK],legW*.75,col)+stroke([kneeX,yK],[ankX+(s<0?0:2),yb-40],ankW+6,col)+shoe(S.shoe,ankX,yA,yF,fem,s);
    else legs+=shoe(S.shoe,ankX,yA,yF,fem,s)+`<path d="M${f1(hipX-legW/2-10)} ${f1(yW+10)} L${f1(hipX+legW/2+10)} ${f1(yW+10)} L${f1(ankX+ankW/2+10)} ${f1(hemT)} C${f1(ankX+ankW/2)} ${f1(hemT+14)} ${f1(ankX-ankW/2)} ${f1(hemT+20)} ${f1(ankX-ankW/2-14)} ${f1(hemT+12)} Z" fill="${col}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M${f1(hipX+(s<0?-10:10))} ${f1(yHip+80)} L${f1(ankX+(s<0?-6:6))} ${f1(hemT-20)}" stroke="${s<0?'#ffffff':'#000'}" stroke-width="3" opacity=".14"/>`;
    });
  /* ---- the garment below the waist: gowns, skirts, aprons ---- */
  if(S.under==='gown'||S.under==='long'){const g=S.gown,hy=yF-6;lower+=`<path d="M${cx-ww} ${yW} C${cx-hw-10} ${yHip} ${cx-hw-30} ${Y(.8)} ${cx-hw-46} ${hy} C${cx-60} ${hy+18} ${cx+60} ${hy+18} ${cx+hw*.9+40} ${hy} C${cx+hw*.9+24} ${Y(.8)} ${cx+hw*.9+8} ${yHip} ${cx+ww*.92} ${yW} Z" fill="${g}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M${cx+20} ${yW+40} C${cx+30} ${Y(.7)} ${cx+40} ${Y(.86)} ${cx+52} ${hy}" stroke="#000" stroke-width="22" opacity=".25" fill="none"/><path d="M${cx-ww+40} ${yHip} C${cx-hw+10} ${Y(.75)} ${cx-hw-6} ${Y(.9)} ${cx-hw-14} ${hy-10}" stroke="#fff" stroke-width="4" opacity=".14" fill="none"/>`}
  if(S.under==='maid'){const g=S.gown,hy=Y(.8);lower+=`<path d="M${cx-ww} ${yW} C${cx-hw-6} ${yHip} ${cx-hw-20} ${Y(.66)} ${cx-hw-30} ${hy} C${cx-80} ${hy+14} ${cx+80} ${hy+14} ${cx+hw+26} ${hy} C${cx+hw+16} ${Y(.66)} ${cx+hw+4} ${yHip} ${cx+ww} ${yW} Z" fill="${g}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
<path d="M${cx-ww*.7} ${yW+10} L${cx+ww*.7} ${yW+10} C${cx+hw*.7} ${Y(.62)} ${cx+hw*.74} ${Y(.72)} ${cx+hw*.76} ${hy-22} C${cx+30} ${hy-10} ${cx-30} ${hy-10} ${cx-hw*.8} ${hy-22} C${cx-hw*.78} ${Y(.72)} ${cx-hw*.74} ${Y(.62)} ${cx-ww*.7} ${yW+10} Z" fill="#f4f0e6" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M${cx-ww*.6} ${yW+44} C${cx-40} ${yW+52} ${cx+40} ${yW+52} ${cx+ww*.6} ${yW+44}" stroke="#d8d0c0" stroke-width="5" fill="none"/>`}

  /* ---- torso garment ---- */
  const nL=[cx-62,yN],nR=[cx+56,yN];
  const hemY=Y(S.hem),hemFlare={longcoat:70,trench:58,greatcoat:66,smock:70,nurse:60,gown:0,suit:16,peajacket:8,tweed:18,cardigan:20,bodice:0,waistcoat:4}[S.top]||10;
  const hemL=cx-hw-hemFlare,hemR=cx+hw*.92+hemFlare*.9;
  const sideL=`C${cx-sw+2} ${yS+90} ${cx-sw+16} ${yS+200} ${cx-ww-belly*.3} ${yW} C${cx-ww-belly-8} ${yW+90} ${cx-hw-6} ${yHip-40} ${S.hem>.6?cx-hw-10:cx-hw} ${Math.min(yHip,hemY)}`;
  let bodyD;
  if(S.top==='gown'){bodyD=`M${nL[0]+6} ${nL[1]+40} C${cx-sw+30} ${yS-6} ${cx-sw} ${yS+10} ${cx-sw+4} ${yS+40} C${cx-sw+18} ${yS+180} ${cx-ww} ${yW-40} ${cx-ww} ${yW} C${cx-hw-10} ${yHip} ${cx-hw-34} ${Y(.82)} ${cx-hw-50} ${yF-8} C${cx-70} ${yF+12} ${cx+70} ${yF+12} ${cx+hw*.9+44} ${yF-8} C${cx+hw*.9+26} ${Y(.82)} ${cx+hw*.9+8} ${yHip} ${cx+ww*.92} ${yW} C${cx+ww*.92} ${yW-40} ${cx+sw*.92-18} ${yS+180} ${cx+sw*.92-4} ${yS+40} C${cx+sw*.92} ${yS+10} ${cx+sw*.92-30} ${yS-6} ${nR[0]-6} ${nR[1]+40} Z`}
  else bodyD=`M${nL[0]} ${nL[1]} C${cx-sw*.62} ${yN+28} ${cx-sw+6} ${yS-2} ${cx-sw} ${yS+36} ${sideL} L${hemL} ${hemY} C${cx-60} ${hemY+14} ${cx+60} ${hemY+14} ${hemR} ${hemY} L${S.hem>.6?cx+hw*.92+10:cx+hw*.92} ${Math.min(yHip,hemY)} C${cx+hw*.92+6} ${yHip-40} ${cx+ww*.92+belly*.8+8} ${yW+90} ${cx+ww*.92+belly*.6} ${yW} C${cx+sw*.92-16} ${yS+200} ${cx+sw*.92-2} ${yS+90} ${cx+sw*.92} ${yS+36} C${cx+sw*.92-6} ${yS-2} ${cx+sw*.57} ${yN+28} ${nR[0]} ${nR[1]} Z`;
  const shirt=S.shirt||'#efe9de';
  /* what shows at the neck: shirt and tie, blouse, or bare skin */
  const vBot=S.top==='suit'||S.top==='tweed'||S.top==='greatcoat'?yS+230:S.top==='longcoat'||S.top==='trench'?yS+250:yS+170;
  const neck=`<path d="M${cx-52} ${TOP+H-70} L${cx+40} ${TOP+H-70} L${cx+46} ${yN+24} L${cx-56} ${yN+24} Z" fill="${sk}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M${cx-52} ${TOP+H-70} C${cx-24} ${TOP+H-30} ${cx+16} ${TOP+H-30} ${cx+40} ${TOP+H-70} L${cx+44} ${TOP+H-20} C${cx+10} ${TOP+H} ${cx-30} ${TOP+H} ${cx-54} ${TOP+H-20} Z" fill="${skS}" opacity=".75"/>`;
  let vfill='';
  if(S.top==='gown'){vfill=`<path d="M${cx-70} ${yN} C${cx-30} ${yS+60} ${cx+30} ${yS+60} ${cx+66} ${yN} Z" fill="${sk}" stroke="${INK}" stroke-width="4"/>`}
  else if(S.top==='nurse'||S.top==='bodice'){vfill=`<path d="M${cx-58} ${yN} L${cx+54} ${yN} L${cx+50} ${yS+10} C${cx+20} ${yS+22} ${cx-20} ${yS+22} ${cx-54} ${yS+10} Z" fill="${S.top==='nurse'?'#f4f2ec':'#1c1a20'}" stroke="${INK}" stroke-width="4"/>`}
  else {vfill=`<path d="M${cx-66} ${yN} L${cx+60} ${yN} L${cx+4} ${vBot} Z" fill="${shirt}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
    vfill+=`<path d="M${cx-56} ${yN+4} L${cx-6} ${yN+56} L${cx-30} ${yN+70} Z" fill="${shirt}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/><path d="M${cx+50} ${yN+4} L${cx+4} ${yN+56} L${cx+28} ${yN+70} Z" fill="${mix(shirt,'#000',.1)}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`;
    if(S.tie)vfill+=`<path d="M${cx-12} ${yN+20} L${cx+12} ${yN+20} L${cx+18} ${vBot-30} L${cx} ${vBot-6} L${cx-14} ${vBot-30} Z" fill="${S.tie}" stroke="${INK}" stroke-width="3.5"/>`;
    if(S.vest)vfill+=`<path d="M${cx-60} ${yS+40} L${cx-6} ${vBot+30} L${cx+4} ${vBot+30} L${cx+56} ${yS+40} L${cx+60} ${vBot+60} L${cx-64} ${vBot+60} Z" fill="${S.vest}" stroke="${INK}" stroke-width="4"/>`;
    if(S.scarf)vfill+=`<path d="M${cx-62} ${yN} C${cx-20} ${yS+10} ${cx+20} ${yS+10} ${cx+58} ${yN} L${cx+40} ${yS+30} L${cx+30} ${yS+150} L${cx} ${yS+140} L${cx+6} ${yS+40} C${cx-20} ${yS+30} ${cx-50} ${yS+10} ${cx-62} ${yN} Z" fill="${S.scarf}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
    if(S.top==='peajacket'||S.top==='cardigan')vfill=`<path d="M${cx-66} ${yN} L${cx+60} ${yN} L${cx+4} ${vBot} Z" fill="${S.top==='cardigan'?'#24242a':'#2a2c34'}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`}
  /* garment details: lapels, buttons, pockets, belt */
  let det='';const lap=(y0,y1,w=58)=>`<path d="M${cx-66} ${yN} C${cx-80} ${y0} ${cx-70} ${y1-60} ${cx+4} ${y1}" fill="none" stroke="${INK}" stroke-width="5"/><path d="M${cx-66} ${yN} L${cx-66-w} ${yS+70} L${cx-50} ${yS+110}" fill="${mix(c0,'#000',.12)}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M${cx+60} ${yN} L${cx+60+w*.85} ${yS+70} L${cx+46} ${yS+110}" fill="${mix(c1,'#000',.15)}" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>`;
  const btn=(x,y,col='#2a2018')=>`<circle cx="${x}" cy="${y}" r="9" fill="${col}" stroke="${INK}" stroke-width="3"/>`;
  const pocket=(x,y,w=96)=>`<path d="M${x-w/2} ${y} L${x+w/2} ${y-4} L${x+w/2+2} ${y+18} L${x-w/2+2} ${y+22} Z" fill="${mix(c0,'#000',.15)}" stroke="${INK}" stroke-width="3.5"/>`;
  const front_line=`<path d="M${cx+4} ${vBot} L${cx+4+(S.hem>.6?10:0)} ${hemY+8}" stroke="${INK}" stroke-width="5"/>`;
  if(S.top==='suit'){det+=lap(yS+60,vBot)+front_line+btn(cx-8,vBot+40)+btn(cx-8,vBot+120)+pocket(cx-ww+40,yW+90)+`<path d="M${cx-ww+20} ${yS+130} L${cx-ww+86} ${yS+128}" stroke="${INK}" stroke-width="3.5"/><path d="M${cx-ww+40} ${yS+128} L${cx-ww+50} ${yS+104} L${cx-ww+62} ${yS+128}" fill="#efe9de" stroke="${INK}" stroke-width="3"/>`}
  if(S.top==='longcoat'){det+=`<path d="M${cx-66} ${yN} L${cx-120} ${yS+90} L${cx-90} ${yS+380} L${cx-60} ${hemY}" fill="none" stroke="${INK}" stroke-width="5"/><path d="M${cx-66} ${yN} C${cx-150} ${yN+30} ${cx-160} ${yS+60} ${cx-120} ${yS+90}" fill="${mix(c0,'#000',.12)}" stroke="${INK}" stroke-width="4.5"/><path d="M${cx+60} ${yN} L${cx+110} ${yS+90} L${cx+86} ${yS+380} L${cx+70} ${hemY}" fill="none" stroke="${INK}" stroke-width="5"/><path d="M${cx-118} ${yS+90} L${cx-90} ${yS+380} L${cx-60} ${hemY} L${cx+70} ${hemY} L${cx+86} ${yS+380} L${cx+110} ${yS+90} L${cx+60} ${yN} L${cx-66} ${yN} Z" fill="${S.gown}"/><path d="M${cx-118} ${yS+90} L${cx-90} ${yS+380} L${cx-60} ${hemY}M${cx+110} ${yS+90} L${cx+86} ${yS+380} L${cx+70} ${hemY}" fill="none" stroke="${INK}" stroke-width="5"/>`}
  if(S.top==='trench'){det+=lap(yS+50,vBot,70)+`<path d="M${cx+4} ${vBot} L${cx+40} ${hemY}" stroke="${INK}" stroke-width="5"/>`+btn(cx-30,vBot+20,'#5a4a30')+btn(cx+50,vBot+20,'#5a4a30')+btn(cx-30,vBot+110,'#5a4a30')+btn(cx+50,vBot+110,'#5a4a30')+`<path d="M${cx-ww-12} ${yW-20} L${cx+ww*.92+12} ${yW-24} L${cx+ww*.92+14} ${yW+20} L${cx-ww-10} ${yW+24} Z" fill="${mix(c0,'#000',.18)}" stroke="${INK}" stroke-width="4"/><rect x="${cx-26}" y="${yW-26}" width="40" height="52" rx="6" fill="none" stroke="#c9a24a" stroke-width="6"/>`}
  if(S.top==='greatcoat'){det+=lap(yS+50,vBot,64)+front_line+[0,1,2,3].map(i=>btn(cx-36,vBot+20+i*90,'#c9a24a')+btn(cx+44,vBot+20+i*90,'#c9a24a')).join('')+`<path d="M${cx-ww-belly*.3-14} ${yW-14} L${cx+ww*.92+belly*.6+14} ${yW-20} L${cx+ww*.92+belly*.6+16} ${yW+28} L${cx-ww-belly*.3-12} ${yW+34} Z" fill="#3a2a1a" stroke="${INK}" stroke-width="4"/><rect x="${cx-22}" y="${yW-22}" width="40" height="50" rx="4" fill="none" stroke="#c9a24a" stroke-width="6"/><path d="M${cx-sw+10} ${yS+6} L${cx-sw+110} ${yS-10} L${cx-sw+112} ${yS+16} L${cx-sw+14} ${yS+32} Z" fill="#c9a24a" stroke="${INK}" stroke-width="3.5"/><path d="M${cx+sw*.92-110} ${yS-10} L${cx+sw*.92-10} ${yS+6} L${cx+sw*.92-14} ${yS+32} L${cx+sw*.92-112} ${yS+16} Z" fill="#a8842a" stroke="${INK}" stroke-width="3.5"/><g transform="translate(${cx-120} ${yS+120})"><rect width="44" height="16" fill="#c0303a" stroke="${INK}" stroke-width="2.5"/><rect x="14" width="16" height="16" fill="#e8c040"/><rect width="44" height="16" fill="none" stroke="${INK}" stroke-width="2.5"/></g>`}
  if(S.top==='peajacket'){det+=lap(yS+40,vBot,66)+`<path d="M${cx+4} ${vBot} L${cx+4} ${hemY+6}" stroke="${INK}" stroke-width="5"/>`+[0,1,2].map(i=>btn(cx-40,vBot+30+i*80,'#1a1a1a')+btn(cx+46,vBot+30+i*80,'#1a1a1a')).join('')+`<path d="M${cx-ww-10} ${yW+60} L${cx-ww+50} ${yW+56}" stroke="${INK}" stroke-width="4"/>`}
  if(S.top==='tweed'){det+=lap(yS+60,vBot)+front_line+btn(cx-8,vBot+40,'#3a2a1a')+btn(cx-8,vBot+120,'#3a2a1a')+pocket(cx-ww+36,yW+80,100)+pocket(cx+ww*.92-30,yW+80,90)+`<rect x="${cx-sw}" y="${yN}" width="${sw*1.92}" height="${hemY-yS+60}" fill="url(#tw${u})" opacity=".35" clip-path="url(#body${u})"/>`}
  if(S.top==='smock'){det+=`<path d="M${cx-66} ${yN} C${cx-40} ${yS+60} ${cx+40} ${yS+60} ${cx+60} ${yN}" fill="none" stroke="${INK}" stroke-width="4"/><path d="M${cx-30} ${yS+60} L${cx-60} ${hemY-10}M${cx+60} ${yS+70} L${cx+120} ${hemY-10}M${cx-130} ${yW} L${cx-170} ${hemY-20}" stroke="${INK}" stroke-width="3" opacity=".5"/>`+pocket(cx-ww+20,yHip-20,110)+`<g fill="#c0303a"><circle cx="${cx-70}" cy="${yHip+60}" r="7"/><circle cx="${cx+90}" cy="${yW+40}" r="5" fill="#2a6ac0"/><circle cx="${cx+40}" cy="${yHip+100}" r="6" fill="#e8c040"/></g>`}
  if(S.top==='cardigan'){det+=`<path d="M${cx-66} ${yN} L${cx+4} ${vBot}L${cx+60} ${yN}" fill="none" stroke="${INK}" stroke-width="5"/><path d="M${cx+4} ${vBot} L${cx+4} ${hemY+4}" stroke="${INK}" stroke-width="5"/>`+[0,1,2,3].map(i=>btn(cx-14,vBot+20+i*60,'#efe9de')).join('')+`<path d="M${hemL+10} ${hemY-30} L${hemR-10} ${hemY-30}" stroke="${INK}" stroke-width="3" opacity=".5"/>`}
  if(S.top==='nurse'){/* white dress, short cape over the shoulders in the coat colour */
    det+=`<path d="M${cx+4} ${yS+20} L${cx+4} ${hemY}" stroke="#d8d4cc" stroke-width="4"/>`+[0,1,2,3].map(i=>btn(cx+4,yS+60+i*80,'#efe9de')).join('')+`<path d="M${cx-ww-6} ${yW-14} L${cx+ww*.92+6} ${yW-18} L${cx+ww*.92+8} ${yW+20} L${cx-ww-4} ${yW+24} Z" fill="#e4e0d6" stroke="${INK}" stroke-width="4"/>`}
  if(S.top==='bodice'){det+=`<path d="M${cx+2} ${yN+20} L${cx+2} ${hemY}" stroke="${INK}" stroke-width="3" opacity=".7"/>`+[0,1,2,3,4,5].map(i=>`<circle cx="${cx+2}" cy="${yS+i*50}" r="5" fill="#3a3640"/>`).join('')+`<path d="M${cx-58} ${yN} C${cx-30} ${yS-10} ${cx+30} ${yS-10} ${cx+54} ${yN}" fill="none" stroke="#efe9de" stroke-width="10"/><circle cx="${cx}" cy="${yS-14}" r="13" fill="#c9a24a" stroke="${INK}" stroke-width="3"/>`}
  if(S.top==='waistcoat'){det+=`<path d="M${cx-62} ${yN} L${cx+4} ${yS+120} L${cx+58} ${yN}" fill="none" stroke="${INK}" stroke-width="5"/><path d="M${cx+4} ${yS+120} L${cx+4} ${hemY-20} L${cx-30} ${hemY+14} M${cx+4} ${hemY-20} L${cx+36} ${hemY+14}" fill="none" stroke="${INK}" stroke-width="5"/>`+[0,1,2,3].map(i=>btn(cx-6,yS+150+i*56,'#c9a24a')).join('')+`<path d="M${cx-90} ${yW-30} C${cx-60} ${yW+10} ${cx-20} ${yW+10} ${cx-6} ${yW-10}" fill="none" stroke="#d9b25e" stroke-width="5"/>`+pocket(cx-ww+40,yW-60,60)}
  if(S.top==='gown'){det+=`<path d="M${cx-ww} ${yW} C${cx-40} ${yW+24} ${cx+40} ${yW+24} ${cx+ww*.92} ${yW}" fill="none" stroke="${INK}" stroke-width="4" opacity=".7"/>`;
    /* fur stole round the shoulders, in the coat colour: soft scalloped edge, both ends crossing low at the front */
    det+=`<path d="M${cx-sw-24} ${yS+60} C${cx-sw-20} ${yN+20} ${cx-90} ${yS-56} ${cx} ${yN} C${cx+90} ${yS-56} ${cx+sw*.92+20} ${yN+20} ${cx+sw*.92+24} ${yS+60} C${cx+sw*.92+10} ${yS+110} ${cx+sw*.92-30} ${yS+120} ${cx+sw*.92-60} ${yS+100} C${cx+70} ${yS+40} ${cx+40} ${yS+30} ${cx} ${yS+60} C${cx-40} ${yS+30} ${cx-70} ${yS+40} ${cx-sw+50} ${yS+100} C${cx-sw+20} ${yS+120} ${cx-sw-14} ${yS+110} ${cx-sw-24} ${yS+60} Z" fill="${c0}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M${cx} ${yN} C${cx+90} ${yS-56} ${cx+sw*.92+20} ${yN+20} ${cx+sw*.92+24} ${yS+60} C${cx+sw*.92+10} ${yS+110} ${cx+sw*.92-30} ${yS+120} ${cx+sw*.92-60} ${yS+100} C${cx+70} ${yS+40} ${cx+40} ${yS+30} ${cx} ${yS+60} Z" fill="${c1}" opacity=".9"/><path d="M${cx-sw+10} ${yS+30} C${cx-sw+30} ${yS+40} ${cx-sw+50} ${yS+40} ${cx-sw+70} ${yS+30}M${cx+sw*.92-70} ${yS+30} C${cx+sw*.92-50} ${yS+40} ${cx+sw*.92-30} ${yS+40} ${cx+sw*.92-10} ${yS+30}M${cx-60} ${yN+30} C${cx-40} ${yS-10} ${cx-20} ${yS-10} ${cx} ${yN+30}" stroke="${INK}" stroke-width="2.5" fill="none" opacity=".5"/>`}
  const defs=`<defs>${halftone}${split}<pattern id="tw${u}" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M0 7 L14 7 M7 0 L7 14" stroke="#000" stroke-width="2" opacity=".5"/></pattern><clipPath id="body${u}"><path d="${bodyD}"/></clipPath></defs>`;
  torso=two(bodyD,S.top==='nurse'?'#f4f2ec':S.top==='bodice'?'#1c1a20':S.top==='gown'?S.gown:c0,S.top==='nurse'?'#d8d4ca':S.top==='bodice'?'#121116':S.top==='gown'?mix(S.gown,'#000',.35):c1)+`<g clip-path="url(#body${u})">${vfill}</g>`+det;
  if(S.top==='nurse')torso+=`<path d="M${cx-sw-16} ${yS+10} C${cx-sw+30} ${yN} ${cx+sw*.92-30} ${yN} ${cx+sw*.92+16} ${yS+10} L${cx+sw*.92+30} ${yS+250} C${cx+60} ${yS+290} ${cx-60} ${yS+290} ${cx-sw-30} ${yS+250} Z" fill="${c0}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M${cx+6} ${yN+20} L${cx+sw*.92+16} ${yS+10} L${cx+sw*.92+30} ${yS+250} C${cx+80} ${yS+280} ${cx+30} ${yS+286} ${cx+6} ${yS+286} Z" fill="${c1}"/><path d="M${cx-sw-16} ${yS+10} C${cx-sw+30} ${yN} ${cx+sw*.92-30} ${yN} ${cx+sw*.92+16} ${yS+10} L${cx+sw*.92+30} ${yS+250} C${cx+60} ${yS+290} ${cx-60} ${yS+290} ${cx-sw-30} ${yS+250} Z" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M${cx-60} ${yN} L${cx+56} ${yN} L${cx+40} ${yS+20} L${cx-44} ${yS+20} Z" fill="#c0303a" stroke="${INK}" stroke-width="4"/>`;

  /* ---- arms: sleeve from the shoulder, elbow, forearm, cuff, hand. The shoulder is shaped over the top of the
         sleeve so the arm grows out of the garment rather than sitting on it ---- */
  const sleeveCol=s=>S.top==='nurse'?(s<0?'#f4f2ec':'#d8d4ca'):S.top==='bodice'?(s<0?'#1c1a20':'#121116'):S.top==='gown'?(s<0?sk:skS):S.top==='waistcoat'?(s<0?S.shirt:mix(S.shirt,'#000',.18)):(s<0?c0:c1);
  const bare=S.top==='gown';
  const upW=fem?74:94,loW=fem?64:82;
  function arm(s,E,W,kind,layer){const Sh=shoulder(s),col=sleeveCol(s);let a='';
    a+=stroke(Sh,E,upW,col)+stroke(E,W,loW,col);
    /* the shoulder: garment line from the neck over the top of the arm and down its outside */
    const ox=Sh[0]+s*upW/2+s*4;
    const capD=`M${f1(s<0?nL[0]:nR[0])} ${f1(nL[1]+4)} C${f1(cx+s*sw*.55)} ${f1(yN+4)} ${f1(ox-s*4)} ${f1(yS-24)} ${f1(ox)} ${f1(yS+44)} L${f1(ox+(E[0]-Sh[0])*.25)} ${f1(Sh[1]+(E[1]-Sh[1])*.3)} L${f1(Sh[0]-s*upW/2+(E[0]-Sh[0])*.25)} ${f1(Sh[1]+(E[1]-Sh[1])*.3)} L${f1(Sh[0]-s*upW/2)} ${f1(yS+60)} L${f1(cx+s*60)} ${f1(yS+40)} Z`;
    const capCol=bare?col:(S.top==='gown'?col:col);
    a+=`<path d="${capD}" fill="${capCol}"/><path d="M${f1(s<0?nL[0]:nR[0])} ${f1(nL[1]+8)} C${f1(cx+s*sw*.55)} ${f1(yN+4)} ${f1(ox-s*4)} ${f1(yS-24)} ${f1(ox)} ${f1(yS+44)} L${f1(ox+(E[0]-Sh[0])*.25)} ${f1(Sh[1]+(E[1]-Sh[1])*.3)}" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
    if(!bare)a+=`<path d="M${f1(Sh[0]-s*upW*.5+s*8)} ${f1(yS+70)} C${f1(Sh[0]-s*upW*.2)} ${f1(yS+20)} ${f1(Sh[0]+s*upW*.3)} ${f1(yS+6)} ${f1(ox-s*6)} ${f1(yS+30)}" fill="none" stroke="${INK}" stroke-width="3" opacity=".45"/>`;
    if(!bare)a+=cuff(E,W,loW-4,S.top==='waistcoat'?'#e4ddd0':'#efe9de');
    a+=hand(kind,E,[W[0]+(W[0]-E[0])*.04,W[1]+(W[1]-E[1])*.04],sk,skS,cx);return a}
  /* ---- gestures ---- */
  const nearS=shoulder(-1),farS=shoulder(1);
  const lenU=T*.16,lenF=T*.13;
  const hangE=s=>{const Sh=shoulder(s);return [Sh[0]+s*14,Sh[1]+lenU]},hangW=s=>{const E=hangE(s);return [E[0]+s*4,E[1]+lenF]};
  let nearArm='',farArm='';
  const A=S.arms;
  const doArm=(s,g)=>{const E0=hangE(s),W0=hangW(s);let E=E0,W=W0,k='relax',p='',pb='',lay=s<0?'front':'back';
    if(g==='hang'){}
    else if(g==='hangstole'){/* the stole's long end hangs over this arm */}
    else if(g==='holder'){E=[cx+s*(sw-10),yS+lenU*.95];W=[cx-10,yS+lenU*.3];k='hold';lay='front';const tip=[W[0]+60,W[1]-170];GLOW.push([tip[0],tip[1],'#ff6a2a',22,7]);p=`<path d="M${W[0]+20} ${W[1]-80} L${tip[0]} ${tip[1]}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${W[0]+20} ${W[1]-80} L${tip[0]} ${tip[1]}" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/><circle cx="${tip[0]}" cy="${tip[1]}" r="6" fill="#ff6a2a"/><path d="M${tip[0]} ${tip[1]-10} C${tip[0]-12} ${tip[1]-50} ${tip[0]+12} ${tip[1]-80} ${tip[0]-4} ${tip[1]-120}" stroke="#d9d4cc" stroke-width="3.5" fill="none" opacity=".6"/>`}
    else if(g==='waist'){E=[cx+s*(sw+6),yW-20];W=[cx-ww*.4,yW+30];k='flat';lay='front'}
    else if(g==='bag'){E=[E0[0]+s*8,E0[1]];W=[W0[0]-s*4,W0[1]];k='grip';const bx=W[0],by=W[1]+90;p=`<path d="M${bx-40} ${by} C${bx-40} ${by-40} ${bx+40} ${by-40} ${bx+40} ${by}" stroke="${INK}" stroke-width="12" fill="none"/><path d="M${bx-40} ${by} C${bx-40} ${by-40} ${bx+40} ${by-40} ${bx+40} ${by}" stroke="#4a2a1a" stroke-width="6" fill="none"/><path d="M${bx-96} ${by+6} C${bx-94} ${by-20} ${bx+94} ${by-20} ${bx+96} ${by+6} L${bx+106} ${by+170} C${bx+30} ${by+186} ${bx-30} ${by+186} ${bx-106} ${by+170} Z" fill="#5a3220" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M${bx-96} ${by+30} C${bx-30} ${by+46} ${bx+30} ${by+46} ${bx+96} ${by+30}" stroke="${INK}" stroke-width="3" fill="none"/><path d="M${bx-6} ${by+40} L${bx-6} ${by+66}" stroke="#d9b25e" stroke-width="7"/>`}
    else if(g==='hip'){E=[cx+s*(sw+60),yW-40];W=[cx+s*(ww-6),yW+20];k='grip';lay='front'}
    else if(g==='folder'||g==='folder2'){E=[cx+s*(sw+6),yS+lenU*.96];W=[cx+70,yS+lenU*.86];k='flat';lay='front';if(g==='folder')pb=`<path d="M${cx-110} ${yS+40} L${cx+100} ${yS+30} L${cx+116} ${yS+lenU*.96+20} L${cx-96} ${yS+lenU*.96+30} Z" fill="#d9b25e" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M${cx-20} ${yS+30} L${cx-20} ${yS+12} L${cx+30} ${yS+12} L${cx+30} ${yS+28}" fill="#c9a24a" stroke="${INK}" stroke-width="4"/><path d="M${cx-80} ${yS+100} L${cx+70} ${yS+94}" stroke="#8a6a2a" stroke-width="3"/>`}
    else if(g==='cane'){E=[E0[0]-s*0,E0[1]];W=[W0[0]-10,W0[1]];k='grip';const top=[W[0]-4,W[1]+70];p=`<path d="M${top[0]} ${top[1]} L${top[0]-30} ${yF-4}" stroke="${INK}" stroke-width="18" stroke-linecap="round"/><path d="M${top[0]} ${top[1]} L${top[0]-30} ${yF-4}" stroke="#5a3a22" stroke-width="10" stroke-linecap="round"/>`;pb='';}
    else if(g==='tray'||g==='tray2'){E=[cx+s*(sw+20),yS+lenU*.92];W=[cx+s*(hw+30),yW+40];k='grip';lay='front'}
    else if(g==='lantern'){k='grip';const lx=W[0],ly=W[1]+80;GLOW.push([lx,ly+76,'#ffd27a',90,30]);p=`<path d="M${lx-26} ${ly} C${lx-26} ${ly-36} ${lx+26} ${ly-36} ${lx+26} ${ly}" stroke="${INK}" stroke-width="7" fill="none"/><path d="M${lx-44} ${ly} L${lx+44} ${ly} L${lx+38} ${ly+24} L${lx-38} ${ly+24} Z" fill="#6a5020" stroke="${INK}" stroke-width="4"/><rect x="${lx-34}" y="${ly+24}" width="68" height="104" rx="10" fill="#ffd27a" stroke="${INK}" stroke-width="4"/><path d="M${lx-22} ${ly+30} L${lx-22} ${ly+122}M${lx+22} ${ly+30} L${lx+22} ${ly+122}" stroke="#6a5020" stroke-width="5"/><path d="M${lx-44} ${ly+128} L${lx+44} ${ly+128} L${lx+50} ${ly+154} L${lx-50} ${ly+154} Z" fill="#6a5020" stroke="${INK}" stroke-width="4"/><circle cx="${lx}" cy="${ly+76}" r="70" fill="#ffd27a" opacity=".18"/>`}
    else if(g==='keys'||g==='keys2'){E=[cx+s*(sw-4),yS+lenU*.95];W=[cx+s*34,yW+60];k='flat';lay='front';if(g==='keys')p=`<g stroke="${INK}" stroke-width="3" fill="#c9a24a"><circle cx="${cx}" cy="${yW+150}" r="22" fill="none" stroke="#c9a24a" stroke-width="7"/><path d="M${cx-14} ${yW+168} L${cx-22} ${yW+240} L${cx-8} ${yW+240} L${cx-2} ${yW+170} Z"/><path d="M${cx+2} ${yW+172} L${cx+6} ${yW+250} L${cx+20} ${yW+248} L${cx+14} ${yW+170} Z"/><path d="M${cx+16} ${yW+164} L${cx+44} ${yW+226} L${cx+56} ${yW+220} L${cx+28} ${yW+160} Z"/></g>`}
    else if(g==='brush'){E=[cx+s*(sw+10),yS+lenU*.95];W=[cx-30,yS+lenU*.45];k='grip';lay='front';p=`<path d="M${W[0]+30} ${W[1]-40} L${W[0]+130} ${W[1]-240}" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M${W[0]+30} ${W[1]-40} L${W[0]+130} ${W[1]-240}" stroke="#b8862a" stroke-width="6" stroke-linecap="round"/><path d="M${W[0]+124} ${W[1]-228} L${W[0]+150} ${W[1]-276} L${W[0]+134} ${W[1]-222} Z" fill="#c0303a" stroke="${INK}" stroke-width="3"/>`}
    else if(g==='watch'){E=[cx+s*(sw+16),yW-10];W=[cx+10,yS+lenU*.75];k='flat';lay='front';p=`<path d="M${cx-30} ${yS+20} C${cx-10} ${yS+120} ${W[0]-20} ${W[1]-40} ${W[0]} ${W[1]+40}" stroke="#c9a24a" stroke-width="4" fill="none"/><circle cx="${W[0]+4}" cy="${W[1]+70}" r="26" fill="#f4ead2" stroke="#c9a24a" stroke-width="7"/><path d="M${W[0]+4} ${W[1]+70} L${W[0]+4} ${W[1]+54}M${W[0]+4} ${W[1]+70} L${W[0]+16} ${W[1]+74}" stroke="${INK}" stroke-width="3"/>`}
    else if(g==='vase'||g==='vase2'){E=[cx+s*(sw+10),yS+lenU*1.0];W=[cx+s*62,yS+lenU*.86];k='grip';lay='front';if(g==='vase')p=`<path d="M${cx-30} ${W[1]-120} L${cx+30} ${W[1]-120} L${cx+24} ${W[1]-96} C${cx+76} ${W[1]-60} ${cx+80} ${W[1]+20} ${cx+46} ${W[1]+60} L${cx+50} ${W[1]+80} L${cx-50} ${W[1]+80} L${cx-46} ${W[1]+60} C${cx-80} ${W[1]+20} ${cx-76} ${W[1]-60} ${cx-24} ${W[1]-96} Z" fill="#f4f6fa" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M${cx-44} ${W[1]-20} C${cx-20} ${W[1]-40} ${cx+20} ${W[1]} ${cx+44} ${W[1]-20}M${cx-50} ${W[1]+20} C${cx-20} ${W[1]} ${cx+20} ${W[1]+40} ${cx+50} ${W[1]+20}" stroke="#2a5ab0" stroke-width="5" fill="none"/>`}
    else if(g==='glass'){E=[cx+s*(sw+4),yS+lenU*.92];W=[cx-40,yS+lenU*.3];k='hold';lay='front';const gx=W[0]+30,gy=W[1]-110;p=`<path d="M${gx-44} ${gy} C${gx-40} ${gy+40} ${gx+40} ${gy+40} ${gx+44} ${gy} Z" fill="#f4e6b0" fill-opacity=".85" stroke="${INK}" stroke-width="4"/><path d="M${gx} ${gy+30} L${gx} ${gy+90}" stroke="${INK}" stroke-width="5"/><ellipse cx="${gx}" cy="${gy+92}" rx="24" ry="6" fill="#e8eef2" stroke="${INK}" stroke-width="4"/>`}
    const svg=arm(s,E,W,k,lay);
    return {lay,svg,p,pb}};
  const GLOW=[];const aN=doArm(-1,A[0]),aF=doArm(1,A[1]);
  /* back arm first, then body, then the near arm; things held in front of the body go between */
  const backArms=(aF.lay==='back'?aF.svg+aF.p:'')+(aN.lay==='back'?aN.svg+aN.p:'');
  const frontArms=(aF.lay==='front'?aF.svg:'')+(aN.lay==='front'?aN.svg:'');
  const midProps=aN.pb+aF.pb;const frontProps=aN.p+(aF.lay==='front'?aF.p:'');
  let tray='';if(A[0]==='tray'){const ty=yW+30;tray=`<path d="M${cx-hw-60} ${ty} L${cx+hw+60} ${ty} L${cx+hw+44} ${ty+40} L${cx-hw-44} ${ty+40} Z" fill="#c9c2b4" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M${cx-60} ${ty} C${cx-60} ${ty-70} ${cx+50} ${ty-70} ${cx+50} ${ty} Z" fill="#f4f0e6" stroke="${INK}" stroke-width="4"/><path d="M${cx-60} ${ty-30} L${cx-96} ${ty-56}" stroke="${INK}" stroke-width="5"/><circle cx="${cx-5}" cy="${ty-64}" r="8" fill="#f4f0e6" stroke="${INK}" stroke-width="3"/><path d="M${cx+80} ${ty} C${cx+80} ${ty-30} ${cx+130} ${ty-30} ${cx+130} ${ty} Z" fill="#f4f0e6" stroke="${INK}" stroke-width="4"/>`}
  /* hangstole: the stole falls over the far arm */
  let stoleEnd='';if(A[1]==='hangstole'){stoleEnd=`<path d="M${cx+sw*.92-10} ${yS+150} C${cx+sw*.92+30} ${yS+300} ${cx+sw*.92+20} ${yW+160} ${cx+sw*.92-10} ${yHip+80} L${cx+sw*.92+50} ${yHip+70} C${cx+sw*.92+80} ${yW+140} ${cx+sw*.92+80} ${yS+260} ${cx+sw*.92+30} ${yS+150} Z" fill="${c1}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`}
  const head=P.portrait(L,{headOnly:1,bg:false,expr:o.expr||'calm',cig:name==='Tomas Reyes',tilt:S.tilt!=null?S.tilt:-3,light:o.light||{side:'L',rim:null,k:.6},size:'x="0" y="0" width="600" height="900"'});
  const lean=S.lean||0,stoop=S.stoop||0;
  /* silhouette mode: the body is a dark shape in the coat's own colour, rim-lit on the side the light comes from;
     the face (the approved inked head) catches the light. Glowing things keep their glow. */
  const SIL=o.silhouette;let inner;
  const headG=`<g transform="translate(${-4+stoop*2} ${stoop*3}) rotate(${-stoop} ${cx} ${yS})">${head}</g>`;
  const bodyG=`${legs}${lower}${backArms}${neck}${torso}${midProps}${frontArms}${tray}${frontProps}${stoleEnd}`;
  if(SIL){const rc=SIL.rim||'#ffb060',side=(SIL.side||'L')==='L'?1:-1,d=SIL.w||10,tint=mix(o.coat==='pale'?'#6a6050':c0,'#06070b',SIL.dark??.78);
    const fx=`<filter id="sil${u}" x="-30%" y="-5%" width="160%" height="110%" color-interpolation-filters="sRGB"><feFlood flood-color="${tint}" result="t"/><feComposite in="t" in2="SourceAlpha" operator="in" result="flat"/><feColorMatrix in="SourceGraphic" type="matrix" values=".09 0 0 0 0  0 .09 0 0 0  0 0 .1 0 0  0 0 0 ${SIL.detail??.45} 0" result="det"/><feOffset in="SourceAlpha" dx="${side*d}" dy="${d*.35}" result="off"/><feComposite in="SourceAlpha" in2="off" operator="out" result="rim"/><feGaussianBlur in="rim" stdDeviation="1.3" result="rimb"/><feFlood flood-color="${rc}" result="rc"/><feComposite in="rc" in2="rimb" operator="in" result="rimc"/><feMerge><feMergeNode in="flat"/><feMergeNode in="det"/><feMergeNode in="rimc"/></feMerge></filter>`;
    const hx=-4+stoop*2,hy=stoop*3;
    if(name==='Tomas Reyes')GLOW.push([212+hx,418+hy,'#ff6a2a',20,6]);
    if(L.flower)GLOW.push([232+hx,206+hy,'#e3243b',18,12]);
    const eyes=[[242,290],[300,289]].map(([x,y])=>`<ellipse cx="${x+hx}" cy="${y+hy}" rx="5" ry="2.4" fill="#f4ead8" opacity="${SIL.eyes??.6}"/>`).join('');
    const glows=GLOW.map(g=>`<circle cx="${g[0]}" cy="${g[1]}" r="${g[3]}" fill="${g[2]}" opacity=".18"/><circle cx="${g[0]}" cy="${g[1]}" r="${g[4]}" fill="${g[2]}"/>`).join('');
    inner=`${defs}<defs>${fx}</defs><g transform="rotate(${lean} ${cx} ${yF})"><g filter="url(#sil${u})">${bodyG}${headG}</g>${eyes}${glows}</g>`;
  } else inner=`${defs}<g transform="rotate(${lean} ${cx} ${yF})">${bodyG}${headG}</g>`;
  const dir=o.dir;const wrap=dir==='R'?`translate(600 0) scale(-1 1)`:'';
  const vb=o.vb||`-150 0 900 ${Math.ceil(yF+30)}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" ${o.size||''} overflow="visible"><g transform="${wrap}">${inner}</g></svg>`}
/* shoes sized to the person: a man's shoe is about a head long; heels and boots differ */
function shoe(kind,x,yA,yF,fem,s){/* the far foot sits a little higher and smaller: it is further away */
  const far=s>0,k=1,yb=yF-(far?14:0),st=`stroke="${INK}" stroke-width="5" stroke-linejoin="round"`;
  const g=(d)=>`<g transform="translate(${x} ${yb}) scale(${k}) translate(${-x} ${-yb})">${d}</g>`;
  if(kind==='heel')return g(`<path d="M${x+28} ${yb-54} C${x+34} ${yb-26} ${x+30} ${yb-8} ${x+22} ${yb} L${x+12} ${yb} L${x+10} ${yb-22} L${x-62} ${yb-2} C${x-90} ${yb-2} ${x-96} ${yb-24} ${x-72} ${yb-36} C${x-40} ${yb-50} ${x} ${yb-60} ${x+28} ${yb-54} Z" fill="#141218" ${st}/><path d="M${x-60} ${yb-34} C${x-40} ${yb-44} ${x-10} ${yb-50} ${x+16} ${yb-48}" stroke="#fff" stroke-width="3.5" opacity=".28" fill="none"/>`);
  if(kind==='tallboot')return g(`<path d="M${x-48} ${yA-300} L${x+48} ${yA-300} L${x+46} ${yb-34} C${x+50} ${yb-6} ${x+44} ${yb} ${x+36} ${yb} L${x-104} ${yb} C${x-124} ${yb-6} ${x-118} ${yb-40} ${x-64} ${yb-52} L${x-48} ${yb-90} Z" fill="#3a2414" ${st}/><path d="M${x-48} ${yA-290} L${x+48} ${yA-290}" stroke="#5a3a24" stroke-width="10"/><path d="M${x-108} ${yb-6} L${x+40} ${yb-6}" stroke="#1a0e08" stroke-width="10"/><path d="M${x-28} ${yA-200} C${x-22} ${yA-100} ${x-28} ${yb-110} ${x-38} ${yb-80}" stroke="#fff" stroke-width="5" opacity=".15" fill="none"/>`);
  const L=fem?118:168,hb=kind==='boot'?96:62;
  return g(`<path d="M${x+44} ${yb-hb} C${x+52} ${yb-hb+30} ${x+50} ${yb-10} ${x+42} ${yb} L${x-L+26} ${yb} C${x-L-2} ${yb-2} ${x-L-6} ${yb-34} ${x-L+30} ${yb-46} C${x-64} ${yb-58} ${x-24} ${yb-hb+2} ${x+6} ${yb-hb-2} Z" fill="#17151b" ${st}/><path d="M${x-L+24} ${yb-4} L${x+42} ${yb-4}" stroke="#050506" stroke-width="9"/><rect x="${x+12}" y="${yb-16}" width="32" height="16" fill="#050506"/><path d="M${x-34} ${yb-56} L${x-10} ${yb-50}M${x-26} ${yb-62} L${x-2} ${yb-58}" stroke="#55545c" stroke-width="3"/><path d="M${x-L+38} ${yb-36} C${x-80} ${yb-48} ${x-50} ${yb-52} ${x-36} ${yb-50}" stroke="#fff" stroke-width="4" opacity=".28" fill="none"/>`)}
root.FIG2={figure,SPEC};
})(typeof window!=='undefined'?window:globalThis);
if(typeof module!=='undefined')module.exports=globalThis.FIG2;
