/* Blackwood Lodge — noir portrait rig. portrait(look, {coat, expr, bg, dead}) -> SVG string (600x900) */
(function(root){
const hx=h=>{h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');return[0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const toh=a=>'#'+a.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
const mix=(a,b,t)=>{a=hx(a);b=hx(b);return toh(a.map((v,i)=>v+(b[i]-v)*t))};
const COATC={dark:['#3a4054','#22263a'],pale:['#d8d0bf','#a39a88'],green:['#3f6a4c','#24412f'],red:['#a8323e','#6a1b25']};

/* ---------- head geometry ---------- */
const FACE={
 f:'M240 206 C228 230 222 258 222 282 C220 298 218 312 220 330 C222 352 226 372 230 388 C234 404 238 418 248 430 C258 440 272 442 288 436 C314 426 340 406 362 384 C372 372 376 352 376 330 L372 250 C352 214 300 196 240 206 Z',
 m:'M240 206 C228 230 222 258 222 282 C220 298 218 312 220 330 C222 352 224 378 228 398 C232 418 238 432 250 440 C264 448 284 448 302 440 C328 428 350 408 366 386 C376 372 380 352 380 330 L376 250 C354 214 300 196 240 206 Z'};
const SHAD={
 f:'M346 226 C334 254 328 286 334 316 C340 342 334 370 312 396 C300 410 288 424 278 438 C288 440 300 436 314 428 C336 414 352 400 362 384 C372 372 376 352 376 330 L372 250 C366 238 356 230 346 226 Z',
 m:'M346 226 C334 254 328 286 334 316 C340 342 336 372 316 400 C304 416 292 432 284 446 C296 448 310 444 320 436 C342 422 356 404 366 386 C376 372 380 352 380 330 L376 250 C368 238 356 230 346 226 Z'};
const TERM={
 f:'M346 226 C334 254 328 286 334 316 C340 342 334 370 312 396 C322 370 324 344 318 318 C312 290 320 254 346 226 Z',
 m:'M346 226 C334 254 328 286 334 316 C340 342 336 372 316 400 C326 372 326 344 318 318 C312 290 320 254 346 226 Z'};
const RIMF={f:'M362 384 C350 398 334 414 314 428',m:'M366 386 C352 402 338 418 320 436'};
const NECK={
 f:['M270 400 C274 424 270 446 258 462 C290 482 324 478 350 452 C344 430 346 410 362 382 Z','M274 412 C300 432 332 424 362 384 C350 410 344 432 350 452 C340 460 330 466 318 470 C326 450 320 440 300 438 C288 434 280 424 274 412 Z'],
 m:['M262 408 C266 432 260 452 246 468 C284 492 330 488 360 458 C352 436 352 414 366 384 Z','M268 420 C296 444 334 432 366 386 C356 414 350 438 358 458 C346 468 334 474 322 478 C330 458 322 448 300 446 C284 442 274 432 268 420 Z']};
const BROW={
 neutral:['M220 272 C228 262 244 260 258 262 C250 264 236 267 222 276 Z','M270 266 C286 254 312 252 334 260 C326 261 308 259 290 264 C282 266 276 268 270 266 Z'],
 sceptic:['M220 268 C228 258 244 254 258 258 C250 260 236 264 222 272 Z','M270 262 C284 244 310 238 336 252 C330 252 310 248 290 256 C282 260 276 262 270 262 Z'],
 angry:['M220 264 C234 264 248 270 260 280 C246 278 234 274 222 271 Z','M268 280 C284 268 310 258 336 254 C328 262 308 268 292 276 C282 280 274 282 268 280 Z'],
 worried:['M220 276 C230 270 244 262 258 254 C252 262 238 270 222 280 Z','M268 256 C286 254 314 260 336 272 C320 268 296 264 270 264 Z']};
Object.assign(BROW,{
 smile:['M220 268 C228 258 244 256 258 258 C250 261 236 264 222 272 Z','M270 262 C286 250 312 248 334 256 C326 257 308 255 290 260 C282 262 276 264 270 262 Z'],
 afraid:['M220 270 C230 260 244 250 258 244 C252 254 238 264 222 276 Z','M268 248 C286 242 314 248 336 258 C320 254 296 254 270 258 Z'],
 grief:['M220 276 C232 272 246 262 258 250 C254 262 240 272 222 282 Z','M268 252 C284 252 310 260 334 276 C318 270 294 264 270 262 Z'],
 sneer:['M220 264 C230 254 246 252 258 256 C250 258 236 262 222 270 Z','M268 280 C284 268 310 258 336 254 C328 262 308 268 292 276 C282 280 274 282 268 280 Z']});
const MOUTH={
 set:{f:'<path fill="#9a4248" class="ink" stroke-width="2" d="M240 386 C252 380 270 380 288 384 C276 390 254 392 240 386 Z"/><path fill="#b5555a" class="ink" stroke-width="2" d="M242 387 C254 398 274 398 286 386 C272 390 256 391 242 387 Z"/><path class="ink" fill="none" stroke-width="3.2" d="M238 386 C254 384 272 384 290 385"/><path class="ink" fill="none" stroke-width="2" d="M290 385 L294 389"/>',
      m:'<path class="ink" fill="none" stroke-width="3.4" d="M238 392 C254 389 274 389 292 391"/><path class="ink" fill="none" stroke-width="1.8" opacity=".55" d="M248 402 C260 406 274 406 284 402"/>'},
 frown:{f:'<path fill="#9a4248" class="ink" stroke-width="2" d="M240 390 C252 381 272 381 288 388 C274 390 254 390 240 390 Z"/><path fill="#b5555a" class="ink" stroke-width="2" d="M244 390 C256 396 274 396 286 389 C272 391 258 391 244 390 Z"/><path class="ink" fill="none" stroke-width="3.4" d="M236 394 C250 384 274 383 292 391"/>',
      m:'<path class="ink" fill="none" stroke-width="3.6" d="M236 398 C250 388 274 387 294 395"/><path class="ink" fill="none" stroke-width="1.8" opacity=".55" d="M250 406 C262 410 274 410 284 406"/>'},
 open:{f:'<path fill="#3a1418" class="ink" stroke-width="3" d="M242 386 C254 380 274 380 288 386 C282 398 256 400 242 386 Z"/><path fill="#f3ece2" d="M248 386 C258 383 272 383 282 386 L280 389 C270 387 258 387 250 389 Z"/><path fill="#b5555a" class="ink" stroke-width="2" d="M246 396 C256 404 276 404 284 394 C276 400 256 400 246 396 Z"/>',
      m:'<path fill="#3a1418" class="ink" stroke-width="3.2" d="M240 390 C254 384 276 384 292 390 C284 402 254 404 240 390 Z"/><path fill="#f3ece2" d="M246 390 C258 387 274 387 286 390 L284 393 C272 391 258 391 248 393 Z"/>'}};

Object.assign(MOUTH,{
 smile:{f:'<path fill="#9a4248" class="ink" stroke-width="2" d="M238 382 C254 386 274 386 294 374 C284 396 252 398 238 382 Z"/><path fill="#f3ece2" d="M244 384 C258 388 276 387 290 378 L288 382 C274 390 258 391 246 388 Z"/><path class="ink" fill="none" stroke-width="3.2" d="M234 379 C254 387 276 387 296 372"/><path class="ink" fill="none" stroke-width="2" opacity=".6" d="M296 362 C302 370 302 378 296 386M230 370 C228 376 230 382 234 386"/>',
  m:'<path class="ink" fill="none" stroke-width="3.4" d="M234 384 C254 394 278 392 298 376"/><path class="ink" fill="none" stroke-width="2" opacity=".6" d="M296 364 C304 372 304 382 298 390M248 404 C260 408 274 406 284 400"/>'},
 smirk:{f:'<path fill="#9a4248" class="ink" stroke-width="2" d="M240 388 C256 384 274 382 294 374 C284 392 256 396 240 388 Z"/><path class="ink" fill="none" stroke-width="3.2" d="M238 388 C256 388 276 384 296 372"/><path class="ink" fill="none" stroke-width="2" opacity=".6" d="M296 364 C302 370 302 378 298 384"/>',
  m:'<path class="ink" fill="none" stroke-width="3.4" d="M238 392 C256 392 278 388 298 374"/><path class="ink" fill="none" stroke-width="2" opacity=".6" d="M298 364 C304 372 304 380 300 386M250 404 C262 408 274 406 282 402"/>'},
 sad:{f:'<path fill="#9a4248" class="ink" stroke-width="2" d="M240 394 C252 384 274 384 290 392 C276 392 254 393 240 394 Z"/><path fill="#b5555a" class="ink" stroke-width="2" d="M244 394 C256 402 276 402 286 393 C272 395 258 395 244 394 Z"/><path class="ink" fill="none" stroke-width="3" d="M234 400 C248 386 276 384 294 398"/>',
  m:'<path class="ink" fill="none" stroke-width="3.4" d="M234 402 C250 388 276 386 296 400"/><path class="ink" fill="none" stroke-width="1.8" opacity=".55" d="M250 410 C262 414 274 414 284 410"/>'},
 shocked:{f:'<ellipse cx="264" cy="396" rx="13" ry="17" fill="#3a1418" class="ink" stroke-width="3"/><path fill="#b5555a" class="ink" stroke-width="2" d="M251 396 C251 380 277 380 277 396 C273 386 255 386 251 396 Z"/><path fill="#f3ece2" d="M256 384 L272 384 L270 388 L258 388 Z"/>',
  m:'<ellipse cx="264" cy="400" rx="14" ry="18" fill="#3a1418" class="ink" stroke-width="3.2"/><path fill="#f3ece2" d="M256 386 L272 386 L270 390 L258 390 Z"/>'},
 afraid:{f:'<path fill="#3a1418" class="ink" stroke-width="3" d="M236 386 C252 378 278 378 296 384 C290 404 244 408 236 386 Z"/><path fill="#f3ece2" d="M242 386 C256 381 278 381 290 385 L288 390 C274 387 256 387 244 391 Z M246 400 C260 398 278 398 286 396 L282 400 C270 403 258 404 248 403 Z"/><path fill="#b5555a" class="ink" stroke-width="2" d="M240 400 C252 410 278 410 290 396 C280 404 254 406 240 400 Z"/>',
  m:'<path fill="#3a1418" class="ink" stroke-width="3.2" d="M234 390 C252 382 280 382 298 388 C292 408 244 412 234 390 Z"/><path fill="#f3ece2" d="M240 390 C256 385 280 385 292 389 L290 394 C276 391 256 391 242 395 Z M246 404 C260 402 278 402 288 400 L284 404 C272 407 258 408 248 407 Z"/>'},
 sneer:{f:'<path fill="#3a1418" class="ink" stroke-width="2.4" d="M240 390 C254 388 266 386 274 380 C282 374 292 376 296 384 C288 392 274 394 258 394 Z"/><path fill="#f3ece2" d="M270 384 C278 378 288 378 292 384 L288 387 C282 384 276 385 272 387 Z"/><path fill="#9a4248" class="ink" stroke-width="2" d="M240 390 C254 386 266 384 274 378 C282 372 292 374 296 384 C290 376 280 376 272 382 C264 386 252 388 240 390 Z"/><path class="ink" fill="none" stroke-width="2.2" d="M288 358 C298 364 300 374 296 382"/>',
  m:'<path fill="#3a1418" class="ink" stroke-width="2.6" d="M238 394 C254 392 266 390 274 384 C282 378 294 380 298 388 C290 396 274 398 258 398 Z"/><path fill="#f3ece2" d="M270 388 C278 382 290 382 294 388 L290 391 C284 388 276 389 272 391 Z"/><path class="ink" fill="none" stroke-width="2.2" d="M290 360 C300 366 302 378 298 386"/>'}});
const EMO={
 calm:{brow:'neutral',mouth:'set'},
 polite:{brow:'smile',mouth:'smile'},
 sly:{brow:'sceptic',mouth:'smirk',gaze:[2,0],eye:'narrow'},
 doubt:{brow:'sceptic',mouth:'set'},
 evasive:{brow:'neutral',mouth:'set',gaze:[7,4],tilt:-4},
 uneasy:{brow:'worried',mouth:'set',gaze:[6,2],sweat:1},
 afraid:{brow:'afraid',mouth:'afraid',eye:'wide',sweat:2,pale:1,gaze:[-1,0]},
 shocked:{brow:'afraid',mouth:'shocked',eye:'wide',pale:1},
 grief:{brow:'grief',mouth:'sad',eye:'narrow',tears:1,gaze:[2,5],tilt:4},
 angry:{brow:'angry',mouth:'frown',eye:'narrow',flush:1},
 defiant:{brow:'sneer',mouth:'sneer',eye:'narrow',flush:1,tilt:-5},
 broken:{brow:'grief',mouth:'sad',eye:'low',tears:2,down:1,gaze:[3,7],tilt:7},
 // older names kept working
 neutral:{brow:'neutral',mouth:'set'},sceptic:{brow:'sceptic',mouth:'set'},worried:{brow:'worried',mouth:'open',sweat:1}};
/* gestures: arms drawn over the coat */
function gesture(g,c,s1,s2){
 const sl=(d,f,w)=>`<path d="${d}" fill="none" stroke="#0c0c0f" stroke-width="${w+9}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${f}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
 if(g==='crossed')return `<g transform="translate(0 -120)">${sl('M520 800 C430 760 320 720 200 712',c[1],78)}
<path class="ink" stroke-width="3.5" fill="${s2}" d="M206 682 C186 680 168 690 164 708 C162 726 176 742 196 744 L214 742 Z"/><path class="ink" fill="none" stroke-width="2.4" d="M172 700 C180 704 192 706 204 704M168 716 C178 720 192 722 204 720"/>
<path fill="#0c0c0f" opacity=".3" d="M140 800 C240 760 340 740 440 730 L440 760 C340 770 240 800 150 840 Z"/>
${sl('M80 820 C180 760 300 720 420 702',c[0],80)}
<path fill="${c[1]}" opacity=".7" d="M90 850 C190 800 300 760 420 744 L424 738 C300 752 190 790 86 840 Z"/>
<path class="ink" stroke-width="3.5" fill="#efe9de" d="M410 664 L432 662 L446 738 L424 744 Z"/>
<path class="ink" stroke-width="3.5" fill="${s1}" d="M436 664 C456 652 486 656 498 674 C508 692 502 716 484 728 C470 736 456 742 444 740 Z"/>
<path fill="${s2}" d="M470 690 C484 694 494 706 490 720 C482 728 470 734 456 738 C468 724 474 708 470 690 Z"/>
<path class="ink" fill="none" stroke-width="2.6" d="M456 668 C470 672 482 684 486 698M450 686 C464 690 474 700 476 714M448 704 C458 708 464 716 464 726"/></g>`;
 if(g==='mouth'||g==='chin'){const up=g==='mouth'?'translate(8 -30)':'';return `<g transform="${up}">${sl('M150 960 C170 800 200 640 236 500',c[0],86)}
<path fill="${c[1]}" opacity=".8" d="M196 940 C212 800 236 660 268 520 L284 530 C254 660 230 800 214 950 Z"/>
<path class="ink" stroke-width="3.5" fill="#efe9de" d="M206 486 L268 500 L262 528 L200 512 Z"/>
<path class="ink" stroke-width="4" fill="${s1}" d="M214 492 C204 460 210 420 230 396 C244 378 264 368 288 370 C302 372 304 384 292 390 C304 392 306 406 292 410 C302 414 300 428 286 430 C294 436 288 448 274 448 C272 466 268 482 262 500 Z"/>
<path fill="${s2}" d="M262 500 C268 482 272 466 274 448 C288 448 294 436 286 430 C276 444 262 452 250 456 C254 470 258 486 262 500 Z"/>
<path class="ink" fill="none" stroke-width="2.4" d="M240 396 C256 388 272 386 290 390M244 412 C260 406 276 406 292 410M248 428 C262 424 274 424 286 430"/>
<path class="ink" fill="none" stroke-width="2" opacity=".5" d="M226 440 C232 420 236 404 238 396"/></g>`}
 if(g==='palm')return `${sl('M120 960 C140 820 160 700 176 610',c[0],84)}
<path fill="${c[1]}" opacity=".8" d="M164 950 C180 820 196 700 210 624 L222 630 C210 700 196 820 186 960 Z"/>
<path class="ink" stroke-width="3.5" fill="#efe9de" d="M140 598 L214 610 L210 640 L136 628 Z"/>
<path class="ink" stroke-width="4" fill="${s1}" d="M146 602 C134 574 134 544 142 522 L136 466 C134 450 156 446 160 462 L168 518 L170 448 C170 430 194 430 194 448 L192 516 L204 456 C208 440 230 444 226 460 L216 524 L236 486 C244 472 262 480 256 496 L234 564 C226 592 210 608 190 612 Z"/>
<path fill="${s2}" d="M216 524 L236 486 C244 472 262 480 256 496 L234 564 C226 592 210 608 190 612 C206 596 216 576 220 556 Z"/>
<path class="ink" fill="none" stroke-width="2.2" opacity=".55" d="M154 560 C170 548 190 546 206 554M160 584 C176 574 196 574 210 580"/>`;
 return '';
}
const NOSE={
 straight:`<path class="ink" fill="none" stroke-width="3.5" d="M262 286 C258 306 250 328 236 346"/><path class="sk2" d="M262 300 C266 320 266 338 262 352 C272 350 278 344 280 338 C272 326 268 312 262 300 Z"/><path class="ink" fill="none" stroke-width="3.5" d="M236 346 C238 356 248 358 256 354"/><path class="ink" fill="none" stroke-width="2.5" d="M262 350 C270 354 278 350 280 340"/><path fill="#0c0c0f" d="M248 352 C252 348 258 349 260 352 C256 354 252 354 248 352 Z"/>`,
 broad:`<path class="ink" fill="none" stroke-width="3.2" d="M264 290 C262 310 258 328 248 340"/><path class="sk2" d="M264 300 C270 320 272 338 268 356 C282 354 290 346 290 336 C280 326 272 312 264 300 Z"/><path class="ink" fill="none" stroke-width="3.8" d="M240 340 C230 350 236 364 252 362"/><path class="ink" fill="none" stroke-width="3" d="M266 358 C280 360 292 352 290 336"/><path fill="#0c0c0f" d="M248 356 C254 350 264 352 266 357 C260 360 252 360 248 356 Z"/><path class="ink" fill="none" stroke-width="2.2" opacity=".6" d="M244 344 C250 340 258 342 262 346"/>`,
 hook:`<path class="ink" fill="none" stroke-width="3.8" d="M262 280 C256 296 250 308 246 318 C240 330 232 340 226 350"/><path class="sk2" d="M262 296 C268 318 268 340 262 356 C274 354 280 346 282 338 C274 324 268 310 262 296 Z"/><path class="ink" fill="none" stroke-width="3.5" d="M226 350 C228 362 242 364 256 358"/><path class="ink" fill="none" stroke-width="2.5" d="M262 354 C272 356 280 350 282 340"/><path fill="#0c0c0f" d="M244 356 C250 352 256 353 258 356 C254 358 248 358 244 356 Z"/><path fill="#fff" opacity=".45" d="M254 298 L246 318 L250 318 Z"/>`,
 button:`<path class="ink" fill="none" stroke-width="3" d="M262 294 C260 312 254 326 244 336"/><path class="sk2" d="M262 304 C266 322 266 336 262 346 C270 344 276 340 276 332 C270 322 266 312 262 304 Z"/><path class="ink" fill="none" stroke-width="3.2" d="M244 336 C240 346 248 350 256 346"/><path class="ink" fill="none" stroke-width="2.2" d="M262 346 C268 348 274 344 276 336"/><path fill="#0c0c0f" d="M250 346 C253 343 258 344 259 346 C256 348 253 348 250 346 Z"/>`};
/* ---------- hair ---------- */
function hair(L,C){
 const s=L.hair,o={back:'',front:'',rim:''};
 const strand=(d,w)=>`<path class="hrl" stroke-width="${w||2.4}" d="${d}"/>`;
 if(s==='bun'){
  o.front=`<path class="hr1 ink" stroke-width="5" d="M222 278 C214 232 230 186 270 162 C314 138 374 144 404 188 C424 220 420 262 410 290 L398 300 C396 262 386 230 366 212 C344 194 312 196 294 206 C268 196 246 212 236 240 C230 256 228 268 228 282 Z"/>
<path class="hr2" d="M330 150 C370 150 398 170 410 200 C420 230 416 262 410 290 L398 300 C396 262 386 230 366 212 C352 198 332 194 316 196 C330 186 338 170 330 150 Z"/>
${strand('M232 250 C238 214 260 184 300 170M246 232 C262 204 290 186 330 182M300 204 C330 190 366 196 388 222M270 196 C300 176 340 168 372 176')}
${L.grey?'':'<path fill="none" stroke="#b8b0a6" stroke-width="3" d="M226 262 C230 226 246 196 276 176M238 246 C246 222 262 200 288 186"/>'}
<path class="hr1 ink" stroke-width="5" d="M360 150 C368 112 412 98 440 118 C466 136 464 178 436 194 C414 206 388 198 376 182"/>
<path class="hr2" d="M440 118 C466 136 464 178 436 194 C424 200 410 200 398 196 C430 186 444 156 440 118 Z"/>
${strand('M378 132 C398 116 428 120 442 140M376 156 C396 140 424 144 440 164M390 182 C406 172 426 172 438 182')}
${L.pin?'<path fill="none" stroke="#0c0c0f" stroke-width="7" d="M402 108 L452 82"/><path fill="none" stroke="#d9b25e" stroke-width="3.5" d="M402 108 L452 82"/><circle cx="454" cy="81" r="5" fill="#d9b25e" class="ink" stroke-width="2"/>':''}`;
  o.rim='M410 200 C420 232 418 262 410 290|M440 118 C466 136 464 178 436 194';
 }
 if(s==='crop'||s==='slick'){
  const slick=s==='slick';
  o.front=`<path class="hr1 ink" stroke-width="5" d="M224 266 C216 222 236 178 282 158 C330 140 386 154 408 196 C420 222 418 262 410 292 L398 300 C394 268 386 240 370 222 C346 204 306 200 278 206 C258 210 240 226 230 248 Z"/>
<path class="hr2" d="M320 148 C366 146 400 168 410 200 C420 230 416 262 410 292 L398 300 C394 268 386 240 370 222 C356 210 338 204 318 202 C334 186 336 166 320 148 Z"/>
<path class="hr1 ink" stroke-width="3.5" d="M370 262 C376 276 380 292 378 312 L370 316 C366 296 362 280 358 266 Z"/>
${slick?strand('M232 244 C244 210 274 182 320 172M248 226 C272 198 312 184 356 186M266 210 C300 192 344 190 384 208',2.2)+'<path fill="none" stroke="#fff" stroke-width="3.5" opacity=".55" d="M252 214 C276 190 310 178 344 176"/>'
:strand('M230 246 C232 222 244 200 262 186M246 228 C256 210 270 196 290 186M280 206 C300 196 330 194 358 202')+'<path class="ink" fill="none" stroke-width="2.6" d="M262 200 C276 184 296 172 316 166"/>'}`;
  o.rim='M408 196 C420 222 418 262 410 292';
 }
 if(s==='tight'){
  o.front=`<path class="hr1 ink" stroke-width="5" d="M226 262 C220 220 240 176 286 160 C332 144 388 158 408 198 C420 224 418 262 410 292 L398 300 C394 268 386 240 370 222 C344 206 304 202 276 210 C256 214 240 230 232 252 Z"/>
<path fill="url(#curl)" d="M226 262 C220 220 240 176 286 160 C332 144 388 158 408 198 C420 224 418 262 410 292 L398 300 C394 268 386 240 370 222 C344 206 304 202 276 210 C256 214 240 230 232 252 Z"/>
<path class="hr2" opacity=".7" d="M320 150 C366 148 400 170 410 200 C420 230 416 262 410 292 L398 300 C394 268 386 240 370 222 C356 210 338 204 318 204 C332 188 334 168 320 150 Z"/>
<path class="hr1 ink" stroke-width="3.5" d="M370 262 C376 276 380 292 378 312 L370 316 C366 296 362 280 358 266 Z"/>`;
  o.rim='M408 198 C420 224 418 262 410 292';
 }
 if(s==='bald'){
  o.front=`<path fill="#fff" opacity=".55" d="M262 186 C282 170 310 164 334 168 C312 172 290 180 272 194 Z"/>
<path class="hr1 ink" stroke-width="4.5" d="M370 214 C394 222 412 248 412 282 C412 304 406 320 398 330 L384 300 C386 270 380 244 362 226 Z"/>
<path class="hr1 ink" stroke-width="3.5" d="M366 252 C374 268 378 286 376 304 L368 306 C364 288 360 272 354 260 Z"/>
${strand('M378 230 C394 244 402 262 404 284M372 250 C384 262 390 278 392 294',2)}`;
  o.rim='M410 260 C412 290 406 316 398 330';
 }
 if(s==='bob'){
  o.back=`<path class="hr2 ink" stroke-width="5" d="M206 300 C196 220 230 156 296 146 C360 136 420 172 428 240 C434 300 430 380 410 430 C380 446 352 446 330 436 C350 400 360 360 362 320 Z"/>`;
  o.front=`<path class="hr1 ink" stroke-width="5" d="M214 300 C206 236 232 174 292 158 C350 144 406 172 418 230 C426 280 424 360 408 424 C390 432 372 432 356 426 C366 392 372 356 372 316 C370 280 362 248 346 226 C320 238 286 244 252 240 C238 254 230 272 230 296 Z"/>
<path class="hr2" d="M346 226 C362 248 370 280 372 316 C372 356 366 392 356 426 C372 432 390 432 408 424 C420 376 424 320 420 270 C400 256 372 240 346 226 Z"/>
<path class="hr1 ink" stroke-width="4.5" d="M216 296 C214 330 216 370 228 404 C222 360 222 330 228 296 Z"/>
${strand('M236 228 C262 200 300 186 340 190M224 270 C230 230 252 196 290 176M352 214 C380 222 400 246 408 280M380 300 C388 340 388 380 380 416M400 290 C406 330 406 370 398 410')}
<path fill="none" stroke="#fff" stroke-width="3" opacity=".4" d="M250 196 C276 176 310 170 344 176"/>`;
  o.rim='M418 230 C426 280 424 360 408 424';
 }
 if(s==='waves'){
  o.back=`<path class="hr2 ink" stroke-width="5" d="M210 300 C190 220 230 150 300 142 C372 134 428 176 432 250 C436 320 440 400 452 470 C430 486 400 488 380 476 C368 430 366 380 364 330 Z"/>`;
  o.front=`<path class="hr1 ink" stroke-width="5" d="M216 296 C204 230 236 168 296 154 C354 142 410 170 422 232 C430 290 432 370 444 450 C430 462 408 464 392 456 C380 410 376 360 374 316 C370 276 360 246 340 224 C306 232 268 226 244 210 C232 236 226 264 226 296 Z"/>
<path class="hr2" d="M340 224 C360 246 370 276 374 316 C376 360 380 410 392 456 C408 464 430 462 444 450 C436 400 430 330 424 270 C400 252 368 236 340 224 Z"/>
<path class="hr1 ink" stroke-width="5" d="M244 210 C236 186 252 160 284 152 C266 172 264 196 284 216 C268 220 254 218 244 210 Z"/>
${strand('M250 204 C246 184 258 166 278 158M228 280 C226 244 236 214 250 196M356 206 C390 214 410 240 416 280M384 300 C392 340 396 400 410 452M404 300 C410 350 414 400 428 450M296 164 C330 158 366 166 392 186')}
<path fill="none" stroke="#fff" stroke-width="3" opacity=".4" d="M300 168 C332 164 364 172 386 190M398 330 C402 370 406 410 414 440"/>
${L.flower?'<g class="ink" stroke-width="2.5"><circle cx="232" cy="200" r="16" fill="#e3243b"/><circle cx="216" cy="214" r="13" fill="#c41a30"/><circle cx="246" cy="220" r="12" fill="#c41a30"/><circle cx="230" cy="208" r="6" fill="#ffc83d"/></g>':''}`;
  o.rim='M422 232 C430 290 432 370 444 450';
 }
 if(s==='scarf'){ // cook: hair tied up under a knotted kerchief, curls escaping
  o.front=`<path class="hr1 ink" stroke-width="4.5" d="M224 276 C218 250 222 226 236 210 C240 236 236 256 232 280 Z"/>
<path class="hr1 ink" stroke-width="4.5" d="M368 240 C386 250 398 270 400 300 L388 306 C384 280 376 262 362 252 Z"/>
<path class="ink" stroke-width="5" fill="${L.scarf||'#c8a24a'}" d="M222 238 C224 186 266 148 318 146 C372 144 412 180 414 236 C404 228 384 218 360 214 C318 206 272 212 236 230 Z"/>
<path fill="#0c0c0f" opacity=".25" d="M330 148 C374 150 410 182 414 236 C404 228 384 218 360 214 C362 196 354 170 330 148 Z"/>
<path class="ink" stroke-width="4.5" fill="${L.scarf||'#c8a24a'}" d="M408 216 C430 200 452 204 456 222 C440 226 428 232 414 240 Z M410 230 C432 238 444 256 436 270 C424 258 414 250 404 246 Z"/>
<g fill="#0c0c0f" opacity=".35"><circle cx="260" cy="190" r="4"/><circle cx="292" cy="172" r="4"/><circle cx="326" cy="168" r="4"/><circle cx="360" cy="178" r="4"/><circle cx="276" cy="212" r="4"/><circle cx="310" cy="196" r="4"/><circle cx="346" cy="198" r="4"/><circle cx="384" cy="200" r="4"/></g>`;
  o.rim='M414 236 C412 190 380 152 330 146';
 }
 return o;
}

/* ---------- hats ---------- */
const HAT={
 fedora:`<path class="ink" stroke-width="5" fill="#24222a" d="M234 206 C236 162 264 132 316 128 C368 126 404 152 410 196 C392 204 364 208 330 206 C296 204 262 204 234 206 Z"/><path fill="#0c0c0f" opacity=".35" d="M340 130 C380 136 404 158 410 196 C398 200 384 203 370 205 C372 178 362 150 340 130 Z"/><path class="ink" stroke-width="3" fill="#3a1418" d="M234 196 C270 192 330 192 410 186 L410 202 C340 208 270 208 234 210 Z"/><path class="ink" stroke-width="4.5" fill="#1a181e" d="M196 214 C230 202 300 198 360 200 C400 202 430 208 446 216 C430 226 396 228 360 224 C300 220 240 226 196 214 Z"/><path fill="none" stroke="#fff" stroke-width="2.5" opacity=".3" d="M262 150 C282 138 306 134 330 136"/><path class="ink" fill="none" stroke-width="2.4" d="M310 132 C306 150 306 170 312 192"/>`,
 chauffeur:`<path class="ink" stroke-width="5" fill="#1b1d26" d="M222 214 C224 168 262 136 318 134 C376 132 414 160 418 206 C404 218 370 224 324 222 C282 220 246 220 222 214 Z"/>
<path class="ink" stroke-width="4.5" fill="#262a36" d="M224 212 C252 204 300 202 344 206 C380 208 404 214 418 206 C420 222 416 232 410 236 C380 238 340 236 300 232 C264 230 238 228 226 226 Z"/>
<path class="ink" stroke-width="4.5" fill="#0c0c0f" d="M222 224 C232 240 262 252 300 250 C276 260 236 262 206 252 C206 240 212 230 222 224 Z"/>
<path fill="#fff" opacity=".35" d="M232 238 C250 246 270 248 288 248 C268 252 246 252 228 246 Z"/>
<rect x="282" y="208" width="26" height="14" rx="3" fill="#d9b25e" class="ink" stroke-width="2.5"/>`,
 flatcap:`<path class="ink" stroke-width="5" fill="#6b5a3e" d="M216 236 C212 190 248 152 304 146 C364 140 414 168 420 222 C406 236 372 242 330 240 C290 238 248 240 216 236 Z"/>
<path fill="url(#tweed)" d="M216 236 C212 190 248 152 304 146 C364 140 414 168 420 222 C406 236 372 242 330 240 C290 238 248 240 216 236 Z"/>
<path class="ink" stroke-width="4.5" fill="#4a3e2a" d="M214 232 C232 250 270 258 310 254 C282 266 236 266 200 254 C200 244 206 236 214 232 Z"/>
<path class="ink" fill="none" stroke-width="2.5" d="M252 160 C276 186 292 214 296 240"/>`,
 nurse:`<path class="ink" stroke-width="4.5" fill="#f4f1ea" d="M246 196 C268 170 316 158 360 168 C380 174 392 184 398 196 C372 192 344 194 314 200 C290 206 266 206 246 196 Z"/>
<path fill="#c9c2b4" d="M360 168 C380 174 392 184 398 196 C384 194 370 194 356 196 C362 188 364 178 360 168 Z"/>
<path fill="#e3243b" class="ink" stroke-width="2" d="M302 176 h10 v-9 h8 v9 h10 v8 h-10 v9 h-8 v-9 h-10 Z"/>`
};

/* ---------- inner garments + coat ---------- */
function body(L,C){
 let c=COATC[C.coat]||COATC.dark;if(C.lt==='R')c=[c[1],c[0]];else if(C.lt==='F')c=[c[0],mix(c[0],c[1],.35)];
 const pale=C.coat==='pale';
 const st=pale?'#3a3630':'#0c0c0f';
 let inner='',acc='';
 const skinV=`<path class="sk1 ink" stroke-width="3.5" d="M246 462 C262 510 280 558 300 594 C318 558 336 510 350 454 C318 478 280 480 246 462 Z"/><path class="sk2" d="M350 454 C336 510 318 558 300 594 C304 562 318 510 324 476 C334 470 344 462 350 454 Z"/>`;
 const g=L.garment;
 if(g==='dress'||g==='gown'){
  const d1=L.dress||'#2b2033',d2=mix(d1,'#000',.5);
  inner=`<path class="ink" stroke-width="4" fill="${d1}" d="M236 468 C250 522 270 572 300 612 C326 572 346 522 360 456 L392 482 C404 602 392 742 388 950 L214 950 C206 742 196 602 210 482 Z"/><path fill="${d2}" d="M330 562 C346 522 356 492 360 456 L392 482 C404 602 392 742 388 950 L330 950 C340 762 338 662 330 562 Z"/><path fill="none" stroke="${mix(d1,'#fff',.25)}" stroke-width="3" d="M228 522 C222 602 224 702 232 822"/>`+skinV;
  if(g==='gown')inner+=`<g fill="#fff" opacity=".55"><circle cx="232" cy="640" r="2"/><circle cx="250" cy="700" r="2"/><circle cx="226" cy="760" r="2"/><circle cx="262" cy="650" r="1.6"/><circle cx="244" cy="600" r="1.6"/><circle cx="270" cy="740" r="2"/><circle cx="238" cy="820" r="1.6"/></g>`;
 }
 if(g==='priest')inner=`<path class="ink" stroke-width="4" fill="#15141a" d="M232 470 C250 462 290 470 300 470 C320 470 350 462 366 458 L392 482 C404 602 392 742 388 950 L214 950 C206 742 196 602 210 482 Z"/><path class="ink" stroke-width="4" fill="#15141a" d="M248 456 C276 476 326 476 354 448 L360 482 C330 504 272 506 244 488 Z"/><rect x="290" y="472" width="20" height="20" fill="#fff" class="ink" stroke-width="2.5"/><path fill="none" stroke="#d9b25e" stroke-width="3" d="M300 520 L300 600M288 540 L312 540"/>`;
 if(g==='suit'||g==='uniform'||g==='painter'||g==='sweater'||g==='blouse'||g==='apron'||g==='house'||g==='nurse'){
  // base chest
  const base={suit:'#f1ede4',uniform:'#3b3f4a',painter:'#d9d2c2',sweater:'#5a5444',blouse:'#f3efe6',apron:'#8a6a5a',house:'#18151c',nurse:'#eef0f2'}[g];
  inner=`<path class="ink" stroke-width="4" fill="${base}" d="M232 470 C250 462 290 470 300 470 C320 470 350 462 366 458 L392 482 C404 602 392 742 388 950 L214 950 C206 742 196 602 210 482 Z"/><path fill="#0c0c0f" opacity=".28" d="M330 470 C350 466 360 460 366 458 L392 482 C404 602 392 742 388 950 L332 950 C344 760 344 600 330 470 Z"/>`;
  if(g==='suit'){
   const tie=L.tie||'#6a1b25';
   inner+=`<path class="ink" stroke-width="4" fill="${L.vest||'#2d2a2a'}" d="M232 520 L300 640 L366 520 L392 560 C398 680 392 800 388 950 L214 950 C208 800 204 680 210 560 Z"/>
<path class="ink" stroke-width="3.5" fill="#f1ede4" d="M262 456 L300 492 L282 516 L250 476 Z M346 450 L300 492 L320 516 L352 470 Z"/>
<path class="ink" stroke-width="3.5" fill="${tie}" d="M292 492 L308 492 L312 508 L300 516 L288 508 Z M290 512 L310 512 L318 600 L300 626 L282 600 Z"/>
${L.stripe?`<path fill="none" stroke="${L.stripe}" stroke-width="5" d="M286 540 L314 520M284 570 L316 548M286 600 L316 578"/>`:''}
<g class="ink" stroke-width="2" fill="#c9a24a"><circle cx="300" cy="680" r="5"/><circle cx="300" cy="730" r="5"/></g>`;
  }
  if(g==='uniform') inner+=`<path class="ink" stroke-width="4" fill="#2e323c" d="M248 458 C276 476 324 476 354 452 L360 488 C330 508 274 510 244 492 Z"/><g class="ink" stroke-width="2.5" fill="#d9b25e"><circle cx="270" cy="560" r="7"/><circle cx="330" cy="560" r="7"/><circle cx="270" cy="630" r="7"/><circle cx="330" cy="630" r="7"/><circle cx="270" cy="700" r="7"/><circle cx="330" cy="700" r="7"/></g><path class="ink" fill="none" stroke-width="3" d="M300 508 L300 950"/>`;
  if(g==='painter') inner=skinV.replace('M246 462','M248 462')+inner.replace('d="M232 470 C250 462 290 470 300 470 C320 470 350 462 366 458','d="M232 470 C250 520 280 580 300 600 C320 580 350 520 366 458')+`<path class="ink" stroke-width="4" fill="#e3a83a" d="M244 462 C270 488 330 486 356 452 C350 478 336 496 314 506 L326 556 L304 540 L294 562 L288 510 C266 500 250 486 244 462 Z"/><g opacity=".9"><circle cx="236" cy="660" r="7" fill="#2f6fb0"/><circle cx="250" cy="680" r="4" fill="#e3243b"/><circle cx="372" cy="720" r="6" fill="#ffc83d"/></g>`;
  if(g==='sweater') inner+=`<path class="ink" stroke-width="4.5" fill="#5a5444" d="M246 452 C276 474 326 474 356 446 C362 466 362 486 356 500 C326 520 274 522 246 504 C240 486 240 468 246 452 Z"/><path fill="none" stroke="#0c0c0f" stroke-width="2" opacity=".55" d="M262 470 L262 510M278 476 L278 516M294 478 L294 518M310 478 L310 518M326 474 L326 514M342 466 L342 506"/><path fill="none" stroke="#0c0c0f" stroke-width="2" opacity=".35" d="M240 560 C280 570 330 570 380 556M236 620 C280 630 330 630 384 616M236 680 C280 690 330 690 386 676"/>`;
  if(g==='blouse') inner+=`<path class="ink" stroke-width="3.5" fill="#f3efe6" d="M252 460 C270 478 330 476 350 452 C348 470 332 486 312 492 L300 498 L288 492 C268 486 254 476 252 460 Z"/><path class="ink" stroke-width="3.5" fill="${L.bow||'#2c3a66'}" d="M300 498 C284 486 262 490 262 504 C262 518 284 518 300 506 C316 518 338 518 338 504 C338 490 316 486 300 498 Z M296 506 L278 570 L292 566 L300 520 L308 566 L322 570 L304 506 Z"/><circle cx="300" cy="502" r="7" class="ink" stroke-width="2.5" fill="${L.bow||'#2c3a66'}"/>`;
  if(g==='apron') inner=skinV+inner.replace('d="M232 470 C250 462 290 470 300 470 C320 470 350 462 366 458','d="M232 470 C250 540 280 560 300 560 C320 560 350 540 366 458')+`<path class="ink" stroke-width="4" fill="#f1ede4" d="M246 600 C280 594 320 594 356 600 L362 950 L240 950 Z"/><path fill="#0c0c0f" opacity=".15" d="M320 596 L356 600 L362 950 L330 950 Z"/><path class="ink" fill="none" stroke-width="3" d="M246 600 L238 520M356 600 L364 520"/><path fill="#c9b9a0" opacity=".7" d="M266 700 C280 692 296 700 290 714 C280 718 268 712 266 700 Z"/>`;
  if(g==='house') inner+=`<path class="ink" stroke-width="3.5" fill="#f1ede4" d="M248 448 C270 470 330 470 354 444 L360 462 C340 486 266 488 242 466 Z"/><ellipse cx="300" cy="500" rx="17" ry="21" fill="#d9b25e" class="ink" stroke-width="3"/><ellipse cx="300" cy="500" rx="10" ry="14" fill="#efe1c8"/><path fill="#7a5a44" d="M296 492 C302 490 306 496 304 502 C300 508 296 506 296 500 Z"/><path class="ink" fill="none" stroke-width="3" d="M300 520 L300 600"/><g class="ink" stroke-width="3" fill="none" stroke="#c9a24a"><path d="M300 600 L286 650 M300 600 L300 660 M300 600 L314 650"/></g><g class="ink" stroke-width="2.5" fill="#c9a24a"><circle cx="286" cy="656" r="6"/><circle cx="300" cy="666" r="6"/><circle cx="314" cy="656" r="6"/></g>`;
  if(g==='nurse') inner+=`<path class="ink" stroke-width="3.5" fill="#fff" d="M248 452 C268 474 330 474 354 446 L364 476 C336 500 266 502 240 482 Z"/><path class="ink" fill="none" stroke-width="3" d="M300 488 L300 950"/><circle cx="330" cy="560" r="12" fill="#d9b25e" class="ink" stroke-width="2.5"/><circle cx="330" cy="560" r="7" fill="#f6f1e6"/><path class="ink" fill="none" stroke-width="2.5" d="M330 540 L330 548"/>`;
 }
 // coat
 const ink=`class="ink" stroke="${st}"`;
 let coat=`<path fill="${c[0]}" ${ink} stroke-width="5" d="M48 950 C52 722 62 602 96 552 C128 506 186 482 236 468 L290 460 L352 454 C420 456 486 482 520 538 C548 586 560 722 566 950 Z"/>
<path fill="${c[1]}" d="M352 454 C420 456 486 482 520 538 C548 586 560 722 566 950 L392 950 C408 722 400 562 352 454 Z"/>
<path fill="url(#ht)" opacity="${(C.lt&&C.lt!=='L'?0:1)*(pale?.35:.55)}" d="M430 482 C486 502 510 522 520 538 C548 586 560 722 566 950 L470 950 C478 722 470 582 430 482 Z"/>
${L.coatStyle==='stole'?'':`<path fill="${mix(c[1],'#000',.2)}" ${ink} stroke-width="4.5" d="M226 474 C222 440 246 418 276 414 L330 408 C360 406 380 428 372 460 Z"/>`}
<path ${ink} fill="none" stroke-width="3" d="M150 950 C150 762 140 662 128 602M470 950 C470 782 462 682 450 622M96 552 C110 572 116 602 118 634"/>`;
 let front;
 if(L.coatStyle==='stole'){
  front=`<path fill="${c[0]}" ${ink} stroke-width="4.5" d="M236 468 C196 522 184 622 196 950 L150 950 C140 722 150 582 176 514 C190 486 210 472 236 468 Z"/>
<path fill="${c[1]}" ${ink} stroke-width="4.5" d="M360 456 C404 510 420 622 412 950 L460 950 C468 722 456 582 430 518 C414 482 390 462 360 456 Z"/>
<path fill="${c[0]}" ${ink} stroke-width="4.5" d="M150 522 C176 482 214 462 252 460 C262 468 262 482 250 490 C214 496 186 514 166 542 C156 546 146 536 150 522 Z"/>
<path fill="${c[1]}" ${ink} stroke-width="4.5" d="M348 450 C392 448 440 466 470 502 C476 516 466 526 454 522 C428 498 392 482 356 478 C344 472 342 458 348 450 Z"/>
<path ${ink} fill="none" stroke-width="2.4" d="M176 510 C190 502 204 496 218 492M196 490 C206 484 220 480 232 478M384 466 C404 470 424 478 440 490M372 482 C392 486 410 494 426 506"/>`;
 }else{
  // overcoat with notched lapels
  front=`<path fill="${c[0]}" ${ink} stroke-width="4.5" d="M236 468 C226 470 214 476 204 486 L190 520 L214 540 L198 560 C214 640 250 720 286 800 L288 950 L150 950 C142 760 150 600 176 520 C190 492 212 474 236 468 Z"/>
<path fill="${c[1]}" ${ink} stroke-width="4.5" d="M360 456 C376 460 392 470 404 484 L414 520 L392 540 L406 562 C388 640 352 720 316 800 L316 950 L460 950 C468 760 456 600 430 520 C414 484 390 462 360 456 Z"/>
<path fill="${mix(c[0],'#000',.12)}" ${ink} stroke-width="4" d="M236 468 C248 530 268 590 292 650 L286 800 C250 720 214 640 198 560 L214 540 L190 520 L204 486 C214 476 226 470 236 468 Z"/>
<path fill="${mix(c[1],'#000',.15)}" ${ink} stroke-width="4" d="M360 456 C350 520 332 590 310 650 L316 800 C352 720 388 640 406 562 L392 540 L414 520 L404 484 C392 470 376 460 360 456 Z"/>

<g fill="${mix(c[0],'#000',.45)}" ${ink} stroke-width="3"><circle cx="276" cy="830" r="9"/><circle cx="326" cy="830" r="9"/></g>`;
  if(L.medals)front+=`<g class="ink" stroke-width="2"><rect x="200" y="590" width="22" height="10" fill="#e3243b"/><rect x="222" y="590" width="22" height="10" fill="#2c3a66"/><rect x="200" y="600" width="22" height="10" fill="#ffc83d"/><rect x="222" y="600" width="22" height="10" fill="#3f6a4c"/></g>`;
  if(L.pocket)front+=`<path class="ink" stroke-width="3" fill="${L.pocket}" d="M206 610 L216 592 L230 612 Z"/>`;
 }
 const rim=`<path class="rim" stroke-width="5" d="M520 538 C548 586 560 722 566 950"/>`;
 return coat+inner+front+rim;
}

/* full length: coat skirts, sleeves and hands, trousers or skirt, legs and shoes. Canvas grows to 600x2200. */
function lower(L,o,sk,skS,part){const c=COATC[o.coat||'dark'],pale=o.coat==='pale',st=pale?'#3a3630':'#0c0c0f',ink=`stroke="${st}" stroke-linejoin="round" stroke-linecap="round"`;
 const sex=L.sex||'f',g=L.garment,stole=L.coatStyle==='stole',pose=o.pose||'';
 const sl=(d,f,w,stroke)=>`<path d="${d}" fill="none" stroke="${stroke||st}" stroke-width="${w+9}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${f}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
 const skirtC={dress:L.dress||'#2b2033',gown:L.dress||'#5a1420',blouse:'#2c2c38',apron:'#8a6a5a',house:'#18151c',nurse:'#eef0f2'}[g]||'#2b2033';
 const trouC={suit:'#26262c',uniform:'#2e323c',painter:'#34405a',sweater:'#4a3e2a',priest:'#141318'}[g]||'#26262c';
 let out='';
 /* legs and shoes first, so the coat hangs over them */
 if(sex==='m'){out+=sl('M236 1500 C232 1760 226 1960 222 2120',trouC,104)+sl('M372 1500 C378 1760 384 1960 390 2112',mix(trouC,'#000',.35),104);
   if(g==='uniform')out+=`<path d="M200 1580 L190 2100" stroke="#0c0c0f" stroke-width="5" fill="none" opacity=".6"/>`;
   if(g==='painter')out+=`<g opacity=".85"><circle cx="210" cy="1820" r="7" fill="#e3a83a"/><circle cx="240" cy="1900" r="5" fill="#2f6fb0"/><circle cx="392" cy="1760" r="6" fill="#e3243b"/></g>`;
   out+=`<path ${ink} stroke-width="5" fill="#141218" d="M140 2150 C138 2112 180 2098 236 2102 C266 2104 276 2130 272 2168 L144 2172 Z"/><path fill="#fff" opacity=".3" d="M156 2124 C176 2112 200 2108 222 2110 L220 2116 C198 2116 176 2122 160 2130 Z"/>
<path ${ink} stroke-width="5" fill="#0e0d12" d="M334 2148 C330 2110 370 2096 420 2100 C448 2102 458 2128 452 2164 L338 2168 Z"/>`}
 else{const leg=mix(sk,'#2a1e22',.35);const hem=g==='gown'?2120:1720;
   if(g!=='gown')out+=sl('M246 1660 C242 1860 236 1990 232 2112',leg,58)+sl('M364 1660 C368 1860 374 1990 378 2106',mix(leg,'#000',.3),58);
   out+=`<path ${ink} stroke-width="4.5" fill="#141218" d="M178 2150 C178 2122 206 2108 238 2110 C258 2112 266 2128 262 2160 L250 2160 L248 2140 L240 2160 L182 2164 Z"/><path ${ink} stroke-width="4.5" fill="#0e0d12" d="M342 2146 C344 2118 372 2104 402 2106 C420 2108 428 2124 424 2156 L412 2156 L410 2136 L402 2156 L346 2160 Z"/>`;
   out+=`<path ${ink} stroke-width="5" fill="${skirtC}" d="M118 1480 L486 1480 C500 ${hem-200} 510 ${hem-60} 512 ${hem} C420 ${hem+14} 190 ${hem+14} 96 ${hem} C98 ${hem-60} 106 ${hem-200} 118 1480 Z"/><path fill="#000" opacity=".3" d="M330 1480 L486 1480 C500 ${hem-200} 510 ${hem-60} 512 ${hem} C460 ${hem+8} 400 ${hem+12} 340 ${hem+12} Z"/>`;
   if(g==='apron')out+=`<path ${ink} stroke-width="4" fill="#f1ede4" d="M170 1480 L430 1480 L440 1700 L160 1700 Z"/>`;
   if(g==='gown')out+=`<g fill="#fff" opacity=".5"><circle cx="200" cy="1700" r="2.4"/><circle cx="240" cy="1850" r="2"/><circle cx="190" cy="1990" r="2.4"/><circle cx="260" cy="1620" r="2"/><circle cx="230" cy="2060" r="2"/></g>`}
 /* coat skirts: start well above the waist so the upper coat overlaps them, taper to a waist, flare to the hem */
 if(part==='arms')return arms();
 if(stole){out+=`<path ${ink} stroke-width="5" fill="${c[0]}" d="M66 880 C74 1080 76 1300 84 1566 C130 1574 170 1576 202 1572 C196 1320 192 1120 196 880 Z"/><path ${ink} stroke-width="5" fill="${c[1]}" d="M412 880 C416 1120 420 1320 416 1572 C450 1576 490 1574 522 1566 C530 1300 532 1080 540 880 Z"/>`;
   const d1=g==='gown'||g==='dress'?(L.dress||'#2b2033'):skirtC;out+=`<path ${ink} stroke-width="4" fill="${d1}" d="M196 880 L412 880 C416 1120 420 1320 418 1560 L${g==='gown'?'470 2120 L140 2120':'420 1562 L196 1562'} L200 1560 C196 1320 192 1120 196 940 Z"/><path fill="#000" opacity=".35" d="M330 880 L412 880 C416 1120 420 1320 418 1560 L${g==='gown'?'470 2120 L360 2120':'420 1562 L340 1562'} Z"/>`}
 else{out+=`<path ${ink} stroke-width="5" fill="${c[0]}" d="M64 880 C70 1060 74 1180 80 1290 C84 1380 86 1470 88 1562 C210 1580 390 1580 512 1562 C514 1470 516 1380 520 1290 C526 1180 530 1060 536 880 Z"/>
<path fill="${c[1]}" d="M300 880 L536 880 C530 1060 526 1180 520 1290 C516 1380 514 1470 512 1562 C450 1572 380 1578 318 1578 L300 1390 Z"/>
<path fill="url(#ht)" opacity="${pale?.3:.5}" d="M470 880 L536 880 C530 1060 526 1180 520 1290 C516 1380 514 1470 512 1562 C498 1564 484 1566 470 1567 C478 1360 478 1140 470 880 Z"/>
<path ${ink} fill="none" stroke-width="3.5" d="M300 940 L300 1390"/><path ${ink} stroke-width="3.5" fill="${trouC}" d="M300 1390 L282 1576 L318 1576 Z"/>
<g fill="${mix(c[0],'#000',.45)}" ${ink} stroke-width="3"><circle cx="278" cy="1010" r="9"/><circle cx="278" cy="1170" r="9"/></g>
<path ${ink} fill="none" stroke-width="2.6" opacity=".7" d="M150 940 C152 1100 166 1320 176 1560M470 940 C468 1100 436 1320 426 1560"/>
<path ${ink} stroke-width="3" fill="${mix(c[0],'#000',.2)}" d="M160 1190 L248 1186 L248 1200 L162 1204 Z"/>
<path ${ink} fill="none" stroke-width="2.4" opacity=".55" d="M110 1080 C160 1100 230 1104 290 1100M310 1100 C380 1104 450 1100 492 1080"/>`}
 out+=`<path stroke="#e3243b" stroke-width="5" fill="none" stroke-linecap="round" d="M532 1300 C528 1400 524 1480 520 1560"/>`;
 return out;
 function arms(){let out='';
  if(!stole&&o.full)out+=`<path fill="${c[0]}" d="M272 842 L300 842 L300 960 L272 960 Z"/><path fill="${c[1]}" d="M300 842 L330 842 L330 960 L300 960 Z"/><path ${ink} fill="none" stroke-width="3.5" d="M300 842 L300 960"/>`;
 /* sleeves with a slight elbow, relaxed hands with the thumb forward */
 const handL=pose==='crossed'||pose==='mouth'||pose==='chin'||pose==='palm',handR=pose==='crossed';
 if(!handL)out+=sl('M112 588 C94 720 82 860 86 980 C90 1090 102 1190 108 1282',c[0],94)+`<path ${ink} fill="none" stroke-width="2.4" opacity=".6" d="M70 960 C82 990 96 1000 112 998"/>`
   +`<path ${ink} stroke-width="3.5" fill="#efe9de" d="M64 1266 L150 1270 L148 1298 L62 1294 Z"/><path ${ink} stroke-width="4" fill="${sk}" d="M72 1294 C66 1330 70 1372 86 1398 C96 1414 112 1418 124 1408 C138 1396 144 1364 142 1330 L140 1296 Z"/><path ${ink} stroke-width="3.5" fill="${sk}" d="M74 1300 C60 1318 56 1344 64 1360 C70 1368 80 1364 80 1352 C80 1336 84 1318 90 1306 Z"/><path ${ink} fill="none" stroke-width="2" d="M100 1356 C106 1380 116 1394 128 1398M116 1350 C122 1372 130 1384 138 1388"/>`;
 if(!handR)out+=sl('M500 578 C520 720 532 860 528 980 C524 1090 512 1190 506 1282',c[1],94)+`<path stroke="#e3243b" stroke-width="5" fill="none" stroke-linecap="round" d="M548 640 C566 780 574 900 570 1000 C566 1120 556 1220 550 1272"/>`
   +`<path ${ink} stroke-width="3.5" fill="#efe9de" d="M462 1270 L548 1266 L550 1294 L464 1298 Z"/><path ${ink} stroke-width="4" fill="${skS}" d="M470 1296 C466 1334 470 1372 484 1398 C494 1414 512 1418 524 1406 C538 1390 544 1360 542 1326 L540 1294 Z"/><path ${ink} fill="none" stroke-width="2" d="M496 1356 C502 1380 512 1392 522 1396"/>`;
 return out}}
function portrait(L,o){
 o=o||{};const LT=o.light||{side:'L',rim:'#e3243b',k:1};const lside=LT.side||'L';const shk=LT.k==null?1:LT.k;
 const refl=lside==='R'?'translate(598 0) scale(-1 1)':'';const sex=L.sex||'f',ex=o.expr||L.expr||'calm',E=EMO[ex]||EMO.calm,dead=o.dead;
 const sk0=dead?mix(L.skin,'#a9b4bd',.38):E.pale?mix(L.skin,'#e8e4dc',.22):L.skin,sk=sk0,s1=mix(sk,'#fff',.08),s2=mix(sk,'#7a3a30',.28),s3=mix(sk,'#120a14',.78);
 const h1=L.hairC||'#3a2418',h2=mix(h1,'#000',.5),hl=L.grey?mix(h1,'#000',.35):mix(h1,'#fff',.28);
 const brow=L.brow||mix(h1,'#000',.25);
 const eye=L.eye||'#3f5f6a';
 const H=hair(L,o);
 const mouth=(MOUTH[o.mouth||E.mouth]||MOUTH.set)[sex];
 const B=BROW[E.brow]||BROW.neutral;
 const gz=E.gaze||[0,0],gx=gz[0],gy=gz[1];
 const ek={wide:1.35,narrow:.72,low:.55}[E.eye]||1;
 const C=COATC[o.coat||'dark'];
 const fy=sex==='m'?8:0;
 const eyeG=(cx,cy,w,iris,ir,lw,far)=>{const k=dead?.5:ek;const T=`translate(${cx} ${cy}) scale(1 ${k}) translate(${-cx} ${-cy})`;
  const wh=far?`M${cx-18} ${cy} C${cx-10} ${cy-8} ${cx+4} ${cy-8} ${cx+12} ${cy} C${cx+4} ${cy+7} ${cx-10} ${cy+8} ${cx-18} ${cy} Z`:`M${cx-26} ${cy+1.5} C${cx-14} ${cy-10.5} ${cx+10} ${cy-12.5} ${cx+24} ${cy-.5} C${cx+12} ${cy+9.5} ${cx-10} ${cy+11.5} ${cx-26} ${cy+1.5} Z`;
  const lid=far?`M${cx-20} ${cy+1} C${cx-12} ${cy-10} ${cx+6} ${cy-12} ${cx+14} ${cy-1}`:`M${cx-29} ${cy+2.5} C${cx-16} ${cy-14.5} ${cx+14} ${cy-16.5} ${cx+28} ${cy-.5}`;
  const id='e'+(far?'f':'n');
  return `<clipPath id="${id}"><path transform="${T}" d="${wh}"/></clipPath><path transform="${T}" class="ink" fill="${dead?'#e4e2dc':'#f7f1e8'}" stroke-width="2.2" d="${wh}"/>
<g clip-path="url(#${id})"><circle cx="${cx+gx}" cy="${cy+gy}" r="${ir}" fill="${dead?mix(iris,'#9aa0a4',.55):iris}"/><circle cx="${cx+gx}" cy="${cy+gy}" r="${ir*.46}" fill="#0c0c0f"/>${dead?'':`<circle cx="${cx+gx+ir*.35}" cy="${cy+gy-ir*.36}" r="${ir*.25}" fill="#fff"/>`}
<path fill="${s3}" opacity=".35" d="M${cx-28} ${cy-14} H${cx+30} V${cy-2} C${cx+10} ${cy-8} ${cx-14} ${cy-8} ${cx-28} ${cy-2} Z" transform="${T}"/></g>
<path transform="${T}" class="ink" fill="none" stroke-width="${lw}" d="${lid}"/>${(E.eye==='wide'&&!dead)?`<path class="ink" fill="none" stroke-width="1.6" opacity=".5" transform="translate(0 ${far?-6:-9})" d="${lid}"/>`:''}`};
 const eyes=`<path class="sk2" opacity=".8" d="M226 272 C238 262 252 264 258 276 C250 286 236 288 226 282 Z"/><path class="sk2" opacity=".8" d="M270 270 C286 258 318 258 334 276 C320 290 288 292 270 282 Z"/>
${eyeG(242,290,0,L.eye||'#3f5f6a',5.6,sex==='f'?4.5:3.6,1)}${eyeG(300,289,0,L.eye||'#3f5f6a',7.4,sex==='f'?5:4,0)}
${sex==='f'&&!dead?`<path class="ink" fill="none" stroke-width="2.4" transform="translate(0 ${(1-ek)*8})" d="M328 288 L336 282M326 284 L332 276"/>`:''}${dead?'<path fill="#6a5a6a" opacity=".35" d="M272 296 C290 306 312 304 326 294 C312 312 284 312 272 296 Z M226 294 C236 302 248 302 256 296 C248 308 232 306 226 294 Z"/>':''}`;
 const fx=(E.sweat&&!dead?`<path fill="#e6f6ff" class="ink" stroke-width="2" d="M230 232 C235 243 239 250 235 257 C229 262 222 256 226 247 Z"/><path fill="#fff" d="M229 248 C230 244 232 243 232 246 Z"/>${E.sweat>1?`<path fill="#e6f6ff" class="ink" stroke-width="2" d="M344 236 C348 245 351 251 347 256 C342 260 337 255 340 248 Z"/><path fill="#e6f6ff" class="ink" stroke-width="1.8" d="M224 312 C227 319 229 323 226 327 C222 329 218 326 220 320 Z"/>`:''}<path fill="none" stroke="#fff" stroke-width="2.5" opacity=".55" stroke-linecap="round" d="M250 226 L262 222M290 222 L304 220"/>`:'')
 +(E.tears&&!dead?`<path fill="none" stroke="#bfe6ff" stroke-width="2.5" opacity=".9" d="M276 296 C290 300 312 300 322 294"/><path fill="#cfeeff" class="ink" stroke-width="1.6" opacity=".92" d="M276 298 C272 316 270 334 272 352 C274 362 284 362 284 352 C282 334 280 316 280 298 Z"/>${E.tears>1?`<path fill="#cfeeff" class="ink" stroke-width="1.6" d="M232 300 C230 316 230 328 232 340 C234 346 240 346 240 340 C238 328 236 316 236 300 Z"/>`:''}`:'')
 +(E.flush&&!dead?`<ellipse cx="250" cy="330" rx="26" ry="13" fill="#e0404a" opacity=".3"/><path fill="none" stroke="#c0303a" stroke-width="2" opacity=".6" d="M240 326 L246 334M250 324 L256 332M260 324 L266 332"/>`:'');
 const age=L.age||0;
 const lines=(age>0?`<path class="ink" fill="none" stroke-width="1.6" opacity=".55" d="M280 298 C292 303 308 302 318 296M228 296 C236 299 246 299 252 296"/>`:'')+
  (age>1?`<path class="ink" fill="none" stroke-width="1.6" opacity=".5" d="M330 296 C336 300 340 304 342 310M332 290 C338 290 344 292 348 296M282 344 C290 360 292 376 288 392"/><path class="ink" fill="none" stroke-width="1.4" opacity=".4" d="M250 238 C270 232 296 232 320 238M254 250 C272 246 292 246 312 250"/>`:'')+
  (age>2?`<path class="ink" fill="none" stroke-width="1.6" opacity=".45" d="M236 404 C240 414 244 420 250 424M276 300 C272 312 270 320 272 330"/>`:'');
 const glasses=L.glasses?`<g fill="#e8eef2" fill-opacity=".14" stroke="#0c0c0f" stroke-width="${L.glasses==='heavy'?6:3.5}"><ellipse cx="240" cy="290" rx="16" ry="20"/><circle cx="300" cy="290" r="24"/></g><path fill="none" stroke="#0c0c0f" stroke-width="3.5" d="M256 288 C264 282 270 282 276 286M324 286 L378 296"/><path fill="none" stroke="#fff" stroke-width="2.5" opacity=".6" d="M286 276 L296 270M232 278 L238 274"/>`:'';
 const stache=L.stache==='walrus'?`<path class="ink" stroke-width="3.5" fill="${L.stacheC||h1}" d="M224 392 C226 370 252 360 266 368 C280 360 306 366 310 388 C296 380 286 384 270 390 C256 382 240 384 224 392 Z"/><path class="hrl" stroke-width="2" d="M240 378 L236 388M254 372 L250 386M280 372 L284 386M294 376 L300 386"/>`:
  L.stache==='pencil'?`<path class="ink" stroke-width="2" fill="${h1}" d="M236 382 C248 374 262 374 266 378 C272 374 288 374 296 382 C286 380 276 380 266 382 C256 380 246 380 236 382 Z"/>`:'';
 const stubble=L.stubble?`<path fill="url(#stub)" opacity=".8" d="M226 360 C228 390 236 424 250 438 C266 448 290 446 304 440 C320 432 340 414 356 396 C330 404 300 410 280 404 C262 400 246 390 236 370 Z"/>`:'';
 const ear=`<path fill="${lside==='L'?s3:lside==='R'?s1:s2}" class="ink" stroke-width="4" d="M376 290 C394 278 410 290 406 318 C404 340 394 356 380 360 C372 348 372 310 376 290 Z"/><path class="ink" fill="none" stroke-width="2.5" d="M384 302 C396 300 398 318 392 334"/>`;
 const earring=L.earring==='drop'?`<path class="ink" stroke-width="2" fill="#efe9de" d="M388 362 C396 366 398 380 390 388 C382 384 380 370 388 362 Z"/><circle cx="386" cy="372" r="2" fill="#fff"/>`:L.earring==='gold'?`<circle cx="386" cy="372" r="9" fill="none" stroke="#0c0c0f" stroke-width="6"/><circle cx="386" cy="372" r="9" fill="none" stroke="#d9b25e" stroke-width="3"/>`:'';
 const pearls=L.pearls?`<g transform="translate(0,-38)"><g class="ink" stroke-width="1.6" fill="#efe9de"><circle cx="258" cy="496" r="7.5"/><circle cx="268" cy="511" r="7.5"/><circle cx="281" cy="522" r="7.5"/><circle cx="296" cy="527" r="7.5"/><circle cx="311" cy="525" r="7.5"/><circle cx="325" cy="517" r="7.5"/><circle cx="337" cy="505" r="7.5"/><circle cx="346" cy="491" r="7.5"/></g><g fill="#fff"><circle cx="255.5" cy="493.5" r="2.2"/><circle cx="265.5" cy="508.5" r="2.2"/><circle cx="278.5" cy="519.5" r="2.2"/><circle cx="293.5" cy="524.5" r="2.2"/><circle cx="308.5" cy="522.5" r="2.2"/><circle cx="322.5" cy="514.5" r="2.2"/></g><g fill="#8a8274"><circle cx="339" cy="508" r="3"/><circle cx="348" cy="494" r="3"/></g></g>`:'';
 const lip=sex==='f'?'':'';
 const skull=L.hair==='bald'?`<path fill="${s1}" class="ink" stroke-width="5" d="M232 214 C250 168 300 150 344 160 C392 172 412 214 410 270 C408 320 398 360 378 386 L362 384 Z"/><path fill="${s3}" d="M352 166 C390 180 410 214 410 270 C408 320 398 360 378 386 L362 384 L372 250 C368 220 362 190 352 166 Z"/>`
  :`<path fill="${h2}" class="ink" stroke-width="5" d="M232 214 C250 168 300 150 344 160 C392 172 412 214 410 270 C408 320 398 360 378 386 L362 384 Z"/>`;
 const N=NECK[sex];
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${o.vb||(o.full||o.posed?'0 0 600 2200':'0 0 600 900')}" ${o.size||(o.full||o.posed?'width="600" height="2200"':'width="600" height="900"')}>
<defs>
<pattern id="ht" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="3" cy="3" r="1.5" fill="#0c0c0f"/></pattern>
<pattern id="htr" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="3" cy="3" r="1.4" fill="#e3243b"/></pattern>
<pattern id="curl" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M1 5 q2 -4 4 0 q2 4 4 0" fill="none" stroke="${mix(h1,'#fff',.22)}" stroke-width="1.4"/></pattern>
<pattern id="stub" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r=".9" fill="${mix(h1,s2,.3)}"/></pattern>
<pattern id="tweed" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 8 L8 0M-2 2 L2 -2M6 10 L10 6" stroke="#3a2e1c" stroke-width="1.4"/></pattern>
${o.posed?`<clipPath id="tso"><path d="${o.torsoClip}"/></clipPath>`:''}<clipPath id="upc"><rect x="-100" y="-100" width="800" height="1046"/></clipPath><radialGradient id="bg" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#2a2a36"/><stop offset="1" stop-color="#101016"/></radialGradient>
<style>.ink{stroke:#0c0c0f;stroke-linejoin:round;stroke-linecap:round}.sk1{fill:${s1}}.sk2{fill:${s2}}.sk3{fill:${s3}}.hr1{fill:${h1}}.hr2{fill:${h2}}.hrl{fill:none;stroke:${hl}}.rim{fill:none;stroke:#e3243b;stroke-linecap:round}</style>
</defs>
${o.bg===false?'':'<rect width="600" height="'+(o.full||o.posed?2200:900)+'" fill="url(#bg)"/>'}<g transform="${o.wrapT||''}">${o.behind||''}
${H.back}
${o.headOnly?'':(o.posed?`<g clip-path="url(#tso)"><g transform="translate(300 0) scale(${o.bx||1} 1) translate(-300 0)">`:o.full?lower(L,o,s1,s2,'base')+'<g clip-path="url(#upc)">':'')+body(L,{coat:o.coat||'dark',lt:lside})+(o.posed?'</g></g>'+(o.front||''):o.full?'</g>':'')+`<path class="sk1 ink" stroke-width="4.5" d="${N[0]}"/><path fill="${s3}" opacity="${lside==='F'?.35*shk:shk}" transform="${lside==='R'?'translate(624 0) scale(-1 1)':''}" d="${N[1]}"/>`+pearls+(o.full?lower(L,o,s1,s2,'arms'):'')}
${o.headOnly?"":""}<g transform="translate(0 ${E.down?16:0}) rotate(${(E.tilt||0)+(o.tilt||0)} 300 440) translate(300 430) scale(${L.fw||1} ${L.fh||1}) translate(-300 -430)">
${skull}
<path class="sk1 ink" stroke-width="5" d="${FACE[sex]}"/>
<g transform="${refl}" opacity="${lside==='F'?0:shk}"><path fill="${s3}" d="${SHAD[sex]}"/>
<path fill="url(#htr)" opacity=".9" d="M340 300 C344 330 338 360 318 392 C330 380 346 360 352 334 C356 314 350 300 340 300 Z"/>
<path class="sk2" opacity=".85" d="${TERM[sex]}"/></g>${lside==='F'?`<path class="sk2" opacity=".35" d="${TERM[sex]}"/>`:''}
<path class="sk2" opacity=".8" d="M226 340 C238 356 256 362 270 360 C258 372 240 372 230 362 Z"/>
${ear}${earring}
${sex==='f'?`<ellipse cx="248" cy="334" rx="22" ry="12" fill="#e0606a" opacity=".22"/>`:''}${L.round?`<path class="sk2" opacity=".6" d="M228 360 C236 380 252 388 268 386 C254 396 236 392 228 380 Z"/><ellipse cx="250" cy="326" rx="14" ry="7" fill="#fff" opacity=".25"/>`:''}${L.gaunt?`<path fill="${s2}" opacity=".9" d="M226 336 C240 360 262 372 284 372 C264 384 240 380 228 362 Z"/>`:''}
${stubble}
${eyes}
${lines}${L.hooded&&!dead?`<path fill="${s2}" d="M270 282 C286 268 316 266 332 282 C318 276 290 276 272 286 Z"/><path class="ink" fill="none" stroke-width="2.2" d="M272 280 C288 268 316 266 332 280M224 284 C232 276 246 276 256 282"/>`:''}${L.full&&!dead?`<path fill="${sex==='f'?'#a8464e':s2}" class="ink" stroke-width="2" d="M244 394 C256 406 276 406 288 392 C276 398 256 398 244 394 Z"/>`:''}
<path fill="${brow}" class="ink" stroke-width="${sex==='m'?3.5:1.5}" d="${B[0]}"/><path fill="${brow}" class="ink" stroke-width="${sex==='m'?3.5:1.5}" d="${B[1]}"/>
${NOSE[L.nose||"straight"]}
${fx}
${dead?'<path fill="#5a4a58" class="ink" stroke-width="2.4" d="M240 390 C254 386 274 386 290 390 C282 396 256 398 240 390 Z"/><path fill="#2a1a22" d="M246 391 C258 389 272 389 284 391 C276 393 256 393 246 391 Z"/>':mouth}
${stache}${o.cig?'<path d="M262 392 L212 418" stroke="#0c0c0f" stroke-width="9" stroke-linecap="round"/><path d="M262 392 L216 416" stroke="#f4efe4" stroke-width="5" stroke-linecap="round"/><circle cx="212" cy="418" r="4.5" fill="#ff6a2a"/><path d="M210 410 C200 390 216 372 204 350 C196 334 208 318 200 300" stroke="#d9d4cc" stroke-width="3" fill="none" opacity=".55"/>':''}
<path class="sk2" opacity=".7" transform="translate(0,${fy})" d="M240 414 C252 428 272 430 290 420 C280 436 262 440 250 432 Z"/>
${H.front}
${L.hat?HAT[L.hat]:''}
${glasses}
${lside==='L'&&o.light?`<path class="rim" stroke-width="4.5" d="M240 206 C228 230 222 258 222 282 C220 298 218 312 220 330 C222 352 226 372 230 388 C234 404 238 418 248 430"/>`:''}<g opacity="${lside==='L'&&o.light?0:1}">${H.rim.split('|').filter(Boolean).map(d=>`<path class="rim" stroke-width="4.5" d="${d}"/>`).join('')}
<path class="rim" stroke-width="4" d="M406 318 C404 340 394 356 380 360"/>
<path class="rim" stroke-width="4" d="${RIMF[sex]}"/></g>
</g>
${o.posed?'':gesture(o.pose||E.pose,C,s1,s2)}${o.after||''}</g>
</svg>`;
 const u='p'+(++CNT);const rc=LT.rim||'none';
 return svg.replace(/stroke="#e3243b"/g,`stroke="${o.light&&lside!=='R'?'none':rc}"`).replace('.rim{fill:none;stroke:#e3243b','.rim{fill:none;stroke:'+rc).replace(/(<pattern id="htr"[^>]*><circle[^>]*fill=")#e3243b/,'$1'+(o.light?'#0c0c0f':'#e3243b')).replace(/\b(sk1|sk2|sk3|hr1|hr2|hrl|ink|rim)\b(?=[^"]*"|[{])/g,'$1'+u).replace(/id="(\w+)"/g,'id="$1'+u+'"').replace(/url\(#(\w+)\)/g,'url(#$1'+u+')');
}
let CNT=0;

/* ---------- the cast ---------- */
const LOOKS={
 'Harriet Vane':{fw:.96,gaunt:1,sex:'f',skin:'#f1c9a5',hairC:'#5a3a2a',hair:'bun',pin:1,pearls:1,earring:'drop',garment:'dress',coatStyle:'stole',age:2,eye:'#3f6b5c',expr:'sceptic'},
 'Dr. Okafor':{nose:'broad',fw:1.06,full:1,hooded:1,sex:'m',skin:'#8a5a3b',hairC:'#1a1a1a',hair:'tight',glasses:'wire',garment:'suit',tie:'#2c3a66',vest:'#3a3a40',age:1,eye:'#3a2414',pocket:'#f1ede4'},
 'Tomas Reyes':{fw:1.02,sex:'m',skin:'#c68b59',hairC:'#1d1d1d',hair:'slick',stache:'pencil',hat:'chauffeur',garment:'uniform',age:0,eye:'#3a2414',stubble:1},
 'Iris Lund':{nose:'button',fw:.94,fh:.97,sex:'f',skin:'#f6d5c0',hairC:'#c9a24a',hair:'bob',garment:'blouse',bow:'#2c3a66',age:0,eye:'#4a6a9a',earring:'gold'},
 'Colonel Ash':{nose:'broad',fw:1.08,round:1,hooded:1,sex:'m',skin:'#efc4a2',hairC:'#d9d9d9',grey:1,hair:'bald',stache:'walrus',stacheC:'#e6e3dc',garment:'suit',tie:'#6a1b25',stripe:'#ffc83d',vest:'#5a4a36',medals:1,age:3,eye:'#4a6a7a',brow:'#bdb8ae'},
 'Nell Parry':{nose:'button',round:1,fw:1.08,full:1,sex:'f',skin:'#e8b894',hairC:'#7a3b1e',hair:'scarf',scarf:'#3f6a4c',garment:'apron',age:1,eye:'#5a4024',earring:'gold'},
 'Lionel Crane':{fw:1.04,gaunt:1,hooded:1,sex:'m',skin:'#e2b48c',hairC:'#3a2a1a',hair:'crop',hat:'flatcap',garment:'sweater',age:2,eye:'#5a6a3a',stubble:1},
 'Mrs. Dunmore':{nose:'hook',fw:.95,fh:1.04,gaunt:1,hooded:1,sex:'f',skin:'#f1d2b6',hairC:'#9a9690',grey:1,hair:'bun',garment:'house',glasses:'wire',age:3,eye:'#5a5a62'},
 'Felix Osei':{nose:'broad',full:1,fh:1.03,sex:'m',skin:'#6a4530',hairC:'#111',hair:'tight',garment:'painter',age:0,eye:'#2a1a10',stubble:1},
 'Agnes Teale':{nose:'button',fw:.97,sex:'f',skin:'#f6d5c0',hairC:'#2a1c14',hair:'bob',hat:'nurse',garment:'nurse',age:1,eye:'#4a3a2a'},
 'Piet Hollander':{nose:'hook',fw:.92,fh:1.07,gaunt:1,sex:'m',skin:'#f1c9a5',hairC:'#c9c9c9',grey:1,hair:'bald',glasses:'heavy',garment:'suit',tie:'#3f6a4c',vest:'#6a4a2a',age:2,eye:'#4a6a8a',brow:'#9a968e',pocket:'#ffc83d'},
 'Marguerite Sol':{full:1,fw:.97,sex:'f',skin:'#c68b59',hairC:'#1a1a1a',hair:'waves',flower:1,garment:'gown',dress:'#5a1420',coatStyle:'stole',pearls:1,age:0,eye:'#3a2414',earring:'drop'}
};
const VICTIMS={
 'Edmund Blackwood':{sex:'m',skin:'#efc8a8',hairC:'#a8a49c',grey:1,hair:'slick',nose:'hook',fw:1.02,hooded:1,age:3,garment:'suit',vest:'#5a1420',tie:'#2a1a20',eye:'#4a5a6a',brow:'#8a8680',stache:'pencil'},
 'Margaret Blackwood':{sex:'f',skin:'#f3d4bc',hairC:'#b0aaa2',grey:1,hair:'waves',garment:'dress',dress:'#141218',coatStyle:'stole',pearls:1,age:2,eye:'#4a5a6a',earring:'drop',gaunt:1,fw:.95},
 'Father Lyle':{sex:'m',skin:'#e8bc98',hairC:'#6a6058',hair:'crop',glasses:'wire',garment:'priest',age:2,round:1,fw:1.06,nose:'button',eye:'#4a6a5a'},
 'Aldous Finch':{sex:'m',skin:'#f1cdb0',hairC:'#8a7a6a',hair:'bald',glasses:'heavy',garment:'suit',vest:'#2a2a30',tie:'#2c3a66',age:2,nose:'hook',fw:.94,fh:1.05,gaunt:1,eye:'#5a5a5a'}};
Object.assign(VICTIMS,{
 'Celia Marsh':{sex:'f',skin:'#f3d0b4',hairC:'#8a3a1e',hair:'waves',garment:'gown',dress:'#5a1420',coatStyle:'stole',pearls:1,earring:'drop',full:1,fw:.96,eye:'#4a6a4a',suit:'#4a1018',collar:false},
 'Inspector Garrow':{sex:'m',skin:'#e8bc98',hairC:'#6a5444',hair:'crop',stache:'walrus',garment:'suit',vest:'#3a3428',tie:'#2a2a30',age:2,round:1,fw:1.08,nose:'broad',hooded:1,eye:'#5a5a4a',suit:'#2a2620'},
 'Rose Blackwood':{sex:'f',skin:'#f6d8c4',hairC:'#3a2418',hair:'bob',garment:'blouse',bow:'#5a1420',nose:'button',fw:.94,eye:'#4a6a9a',suit:'#1c2440',collar:false},
 'Victor Blackwood':{sex:'m',skin:'#f0caa8',hairC:'#2a1a12',hair:'slick',garment:'suit',vest:'#1a1a20',tie:'#5a1420',fw:.96,fh:1.03,nose:'hook',eye:'#4a5a6a',suit:'#1a1b22'},
 'A guest':{sex:'m',skin:'#ecc4a2',hairC:'#5a4432',hair:'crop',garment:'suit',vest:'#2a2a30',tie:'#3f6a4c',age:1,fw:1.02,eye:'#4a5a5a',suit:'#22232a'}});
const PLAYERS={
 detective:{sex:'m',skin:'#e6b896',hairC:'#2a1e16',hair:'crop',hat:'fedora',garment:'suit',vest:'#2a2a30',tie:'#5a1420',stubble:1,fw:1.04,hooded:1,age:1,eye:'#4a5a6a'},
 doctor:{sex:'f',skin:'#a8714c',hairC:'#1a1210',hair:'bun',garment:'blouse',bow:'#2c3a66',glasses:'wire',age:1,fw:.97,eye:'#3a2414',nose:'straight'},
 journalist:{sex:'m',skin:'#f1cdb0',hairC:'#b08a4a',hair:'crop',garment:'suit',vest:'#5a4a36',tie:'#8a6a1a',fw:.97,nose:'button',eye:'#4a7a9a'},
 soldier:{sex:'f',skin:'#e2b48c',hairC:'#3a2a1a',hair:'scarf',scarf:'#3a4a2a',garment:'sweater',age:1,gaunt:1,fw:1.0,eye:'#5a6a3a'}};
root.PEOPLE={portrait,LOOKS,COATC,VICTIMS,EMO,mix,PLAYERS};
})(typeof window!=='undefined'?window:globalThis);
if(typeof module!=='undefined')module.exports=globalThis.PEOPLE;
