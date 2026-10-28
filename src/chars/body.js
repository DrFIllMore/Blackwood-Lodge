/* Blackwood Lodge — the body. bodyScene(look,{wound,examined,bg,vb,size}) -> SVG 600x420, seen from standing height. */
(function(root){
const P=root.PEOPLE||require('./people.js');const mix=P.mix;
let N=0;
const HX=140,HY=250,S=.44;const hp=(px,py)=>[HX+(py-300)*S,HY-(px-300)*S];
const WOUND={poker:hp(372,250),statue:hp(305,152),wrench:hp(352,262),knife:[392,346],cord:hp(305,445)};
function bodyScene(L,o){
 o=o||{};const u='b'+(++N);const w=o.examined?o.wound:null;
 const skin=mix(L.skin,'#a9b4bd',.38),skS=mix(skin,'#1a1420',.45);
 const suit=L.suit||'#1a1b22',collar=L.collar!==false,suitS=mix(suit,'#000',.55),suitL=mix(suit,'#8a90a8',.18);
 let head=P.portrait(L,{dead:1,headOnly:1,bg:false,expr:'calm'});
 head=head.replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'');
 const sl=(d,f,wd)=>`<path d="${d}" fill="none" stroke="#0c0c0f" stroke-width="${wd+8}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${f}" stroke-width="${wd}" stroke-linecap="round" stroke-linejoin="round"/>`;
 const pool=(d,hl)=>`<path d="${d}" fill="#4a0810" stroke="#0c0c0f" stroke-width="2.5"/><path d="${d}" fill="url(#bl${u})" opacity=".85"/>${hl?`<path d="${hl}" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".55"/>`:''}`;
 // rug + floor
 const rug=o.bg===false?'':`<rect width="600" height="420" fill="#5e1019"/>
<rect width="600" height="44" fill="#2e1c12"/><path d="M0 14 H600M0 30 H600M120 0 V14M300 14 V30M460 0 V14M60 30 V44M380 30 V44" stroke="#1a0f08" stroke-width="2"/>
<rect y="44" width="600" height="34" fill="#18203c"/><rect y="44" width="600" height="3" fill="#c9a24a"/><rect y="75" width="600" height="3" fill="#c9a24a"/>
<g fill="#c9a24a">${Array.from({length:16},(_,i)=>`<path d="M${i*40+20} 52 L${i*40+28} 61 L${i*40+20} 70 L${i*40+12} 61 Z"/>`).join('')}</g>
<rect y="86" width="600" height="2" fill="#c9a24a" opacity=".6"/>
<g fill="none" stroke="#c9a24a" stroke-width="2" opacity=".35"><rect x="470" y="300" width="18" height="18"/><rect x="40" y="350" width="18" height="18"/><rect x="520" y="140" width="18" height="18"/></g>
<rect width="600" height="420" fill="url(#ht${u})" opacity=".18"/>`;
 // generic pool (from the fall) unless the wound has been read
 const blob=(cx,cy,rx,ry,k)=>{let d='';const n=48;for(let i=0;i<=n;i++){const t=i/n*Math.PI*2,r=1+Math.sin(t*3+k)*.12+Math.sin(t*5+k*2)*.07;const x=cx+Math.cos(t)*rx*r,y=cy+Math.sin(t)*ry*r;d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)}return d+'Z'};
 const hl=(cx,cy,rx)=>`M${cx-rx*.5} ${cy-6} C${cx-rx*.2} ${cy-10} ${cx+rx*.2} ${cy-10} ${cx+rx*.4} ${cy-7}`;
 const W=WOUND[w]||[0,0],wx=W[0],wy=W[1];
 const blood=!w?pool(blob(186,296,34,20,1),hl(186,296,34))
 :w==='poker'?pool(blob(wx-6,wy-30,40,22,2),hl(wx-6,wy-30,40))+pool(blob(186,300,22,13,4))
 :w==='statue'?pool(blob(wx-34,wy,30,40,3),hl(wx-34,wy-14,30))
 :w==='wrench'?pool(blob(176,298,42,24,5),hl(176,298,42))
 :w==='knife'?pool(blob(392,372,70,22,6),hl(392,372,70))
 :'';
 const marks=w==='poker'?`<path d="M${wx-12} ${wy-14} C${wx-2} ${wy-18} ${wx+12} ${wy-12} ${wx+14} ${wy} C${wx+14} ${wy+12} ${wx} ${wy+16} ${wx-10} ${wy+10} C${wx-18} ${wy+4} ${wx-18} ${wy-8} ${wx-12} ${wy-14} Z" fill="#5a0a12" opacity=".8"/><path d="M${wx-4} ${wy-12} L${wx+4} ${wy+12}" stroke="#1a0204" stroke-width="5" stroke-linecap="round"/><path d="M${wx-1} ${wy-8} L${wx+3} ${wy+4}" stroke="#fff" stroke-width="1.4" opacity=".6"/><path d="M${wx-8} ${wy-12} C${wx-10} ${wy-20} ${wx-10} ${wy-26} ${wx-8} ${wy-32}" stroke="#5a0a12" stroke-width="3.5" fill="none"/>`
 :w==='statue'?`<ellipse cx="${wx+3}" cy="${wy}" rx="16" ry="19" fill="#5a0a12"/><ellipse cx="${wx+3}" cy="${wy}" rx="9" ry="11" fill="#1a0204"/><path d="M${wx-4} ${wy-8} L${wx+4} ${wy-4}" stroke="#fff" stroke-width="1.6" opacity=".55"/><path d="M${wx-10} ${wy-10} C${wx-18} ${wy-14} ${wx-26} ${wy-14} ${wx-32} ${wy-10}M${wx-10} ${wy+12} C${wx-18} ${wy+18} ${wx-26} ${wy+18} ${wx-32} ${wy+14}" stroke="#5a0a12" stroke-width="3.5" fill="none"/>`
 :w==='wrench'?`<ellipse cx="${wx}" cy="${wy}" rx="16" ry="13" fill="#4a2a5a" opacity=".9"/><ellipse cx="${wx}" cy="${wy}" rx="9" ry="8" fill="#5a0a12"/><path d="M${wx-7} ${wy-5} L${wx+7} ${wy+5}M${wx+2} ${wy-7} L${wx-3} ${wy+7}" stroke="#1a0204" stroke-width="2.6"/><path d="M${wx+8} ${wy+10} C${wx+16} ${wy+24} ${wx+22} ${wy+36} ${wx+24} ${wy+50}" stroke="#5a0a12" stroke-width="4" fill="none"/>`
 :w==='knife'?`<path d="M362 332 C380 328 404 328 422 334 L418 352 C400 346 380 346 364 350 Z" fill="#f1ede4" stroke="#0c0c0f" stroke-width="2.5"/><path d="M372 338 C384 342 400 342 410 339 L410 351 C398 352 384 352 374 350 Z" fill="#8a1420"/><path d="M384 341 L402 342" stroke="#1a0204" stroke-width="3" stroke-linecap="round"/>`
 :w==='cord'?`<path d="M${wx-4} ${wy-26} C${wx-2} ${wy-10} ${wx} ${wy+10} ${wx-2} ${wy+28}" stroke="#6a2244" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M${wx+3} ${wy-26} C${wx+5} ${wy-10} ${wx+7} ${wy+10} ${wx+5} ${wy+28}" stroke="#b04050" stroke-width="2" fill="none" opacity=".8"/><path d="M${wx+12} ${wy-22} C${wx+22} ${wy-26} ${wx+30} ${wy-20} ${wx+26} ${wy-12}" stroke="#d9b25e" stroke-width="2" fill="none"/><g fill="#6a2244" opacity=".6"><circle cx="${wx-40}" cy="${wy+16}" r="1.6"/><circle cx="${wx-30}" cy="${wy+10}" r="1.4"/><circle cx="${wx-46}" cy="${wy}" r="1.5"/><circle cx="${wx-36}" cy="${wy-6}" r="1.3"/></g>`:'';
 const congested=w==='cord'?`<path transform="translate(${HX} ${HY}) rotate(-90) scale(${S}) translate(-300 -300)" d="M240 206 C228 230 222 258 222 282 C220 298 218 312 220 330 C222 352 226 372 230 388 C234 404 238 418 248 430 C258 440 272 442 288 436 C314 426 340 406 362 384 C372 372 376 352 376 330 L372 250 C352 214 300 196 240 206 Z" fill="#6a3a6a" opacity=".22"/>`:'';
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${o.vb||'0 0 600 420'}" ${o.size||'width="600" height="420"'}>
<defs><pattern id="ht${u}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="3" cy="3" r="1.5" fill="#0c0c0f"/></pattern>
<radialGradient id="bl${u}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#8a1420"/><stop offset=".7" stop-color="#5a0a12"/><stop offset="1" stop-color="#3a050a"/></radialGradient>
<radialGradient id="vg${u}" cx=".4" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></radialGradient>
<filter id="sh${u}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter></defs>
${rug}
<g transform="rotate(-6 300 240)">
<path d="M214 196 C226 160 262 146 300 146 C350 146 400 166 440 186 L${o.full?840:640} 200 L${o.full?840:640} 330 L440 316 C400 334 350 352 300 352 C262 352 228 338 214 304 Z" fill="#000" opacity=".55" filter="url(#sh${u})" transform="translate(8 14)"/>
${blood}
${o.full?`${sl('M500 228 C580 220 660 214 760 206',suit,62)}${sl('M500 290 C580 302 660 316 740 330',suitS,62)}<path d="M752 184 C790 180 826 188 838 202 C846 216 830 228 800 228 L756 228 Z" fill="#0e0e12" stroke="#0c0c0f" stroke-width="4"/><path d="M770 192 C796 190 818 194 830 204" stroke="#fff" stroke-width="2.5" opacity=".35" fill="none"/><path d="M732 310 C770 310 806 318 816 334 C822 348 806 358 778 356 L734 352 Z" fill="#0e0e12" stroke="#0c0c0f" stroke-width="4"/>`:`${sl('M500 228 C550 222 590 216 650 210',suit,66)}${sl('M500 290 C550 300 590 310 650 318',suitS,66)}`}
${o.full?'':'<path d="M500 322 C550 332 590 340 650 350" stroke="#e3243b" stroke-width="3.5" fill="none" stroke-linecap="round"/>'}
${sl('M262 330 C254 360 250 384 262 400 C286 404 306 402 326 398',suitS,46)}
<path d="M322 382 L338 380 L342 414 L326 416 Z" fill="#efe9de" stroke="#0c0c0f" stroke-width="3"/>
<path d="M340 382 C356 378 376 384 384 396 C390 406 384 418 370 418 C360 420 348 418 342 414 Z" fill="${skin}" stroke="#0c0c0f" stroke-width="3.5"/>
<path d="M356 390 C366 390 374 396 376 404M350 402 C360 404 368 408 370 414" stroke="#0c0c0f" stroke-width="2" fill="none"/>
<path d="M214 196 C226 160 262 146 300 146 C350 146 400 166 440 186 C470 196 500 202 512 222 C520 240 520 270 512 288 C500 304 470 308 440 316 C400 334 350 352 300 352 C262 352 228 338 214 304 C206 280 204 222 214 196 Z" fill="${suit}" stroke="#0c0c0f" stroke-width="5" stroke-linejoin="round"/>
<path d="M210 258 C300 264 420 262 516 258 C518 276 512 290 504 296 C476 306 448 312 432 320 C396 336 350 350 300 350 C262 350 230 336 216 306 Z" fill="${suitS}"/>
<path d="M226 300 C280 330 340 338 400 326 L396 336 C340 348 280 344 230 316 Z" fill="url(#ht${u})" opacity=".55"/>
<path d="M232 186 C252 162 290 154 330 158" stroke="${suitL}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>
<path d="M440 186 L440 316" stroke="#0c0c0f" stroke-width="2.4" opacity=".5"/>
<path d="M214 254 C300 256 420 256 514 254" stroke="#0c0c0f" stroke-width="2.4" fill="none" opacity=".7"/>
<path d="M470 254 L514 254M476 238 C490 240 502 240 512 238" stroke="#0c0c0f" stroke-width="2.4" fill="none"/>
<path d="M270 196 C300 186 336 190 350 206M270 312 C300 322 336 318 352 304" stroke="#0c0c0f" stroke-width="2" fill="none" opacity=".55"/>
<path d="M214 304 C228 338 262 352 300 352 C350 352 400 334 440 316 C470 308 500 304 512 288" stroke="#e3243b" stroke-width="4" fill="none" stroke-linecap="round"/>
${sl('M252 172 C226 140 204 114 184 98 C164 82 146 68 132 56',suit,48)}
<path d="M176 74 C198 88 214 104 224 124" stroke="${suitL}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>
<path d="M144 42 L128 62 L114 52 L130 32 Z" fill="#efe9de" stroke="#0c0c0f" stroke-width="3"/>
<path d="M126 36 C114 24 96 20 84 28 L62 20 C54 18 52 28 60 30 L78 36 L58 38 C50 40 52 50 60 50 L78 48 L62 56 C54 60 60 70 68 66 L84 58 C88 64 100 64 110 58 Z" fill="${skin}" stroke="#0c0c0f" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M96 34 C92 42 92 50 98 56" stroke="${skS}" stroke-width="2" fill="none"/>
<!-- neck + collar -->
<path d="M194 226 L216 222 L220 276 L198 278 Z" fill="${skin}" stroke="#0c0c0f" stroke-width="3"/>
${collar?'<path d="M212 220 L224 218 L228 280 L216 282 Z" fill="#efe9de" stroke="#0c0c0f" stroke-width="3"/>':''}
<!-- head -->
<g transform="translate(${HX} ${HY}) rotate(-90) scale(${S}) translate(-300 -300)">${head}</g>
${congested}${marks}
</g>
${o.bg===false?'':`<rect width="600" height="420" fill="url(#vg${u})"/>`}
</svg>`;
 return svg;
}
function woundClose(L,weapon,size){const [x,y]=WOUND[weapon];const r=weapon==='knife'?62:50;
 return bodyScene(L,{examined:1,wound:weapon,vb:`${x-r} ${y-r} ${r*2} ${r*2}`,size:`width="${size}" height="${size}"`})}
root.BODY={bodyScene,woundClose,WOUND};
})(typeof window!=='undefined'?window:globalThis);
if(typeof module!=='undefined')module.exports=globalThis.BODY;
