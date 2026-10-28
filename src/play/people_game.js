/* ---------- people: inked portraits whose faces follow the night ---------- */
/* temperament: [first-meeting face, usual pose, composure 3, 2, 1, glances away when nervous] */
const TEMPER={
 'Harriet Vane':['doubt','crossed','doubt','angry','defiant',0],
 'Dr. Okafor':['calm','','doubt','uneasy','afraid',0],
 'Tomas Reyes':['evasive','','uneasy','angry','afraid',1],
 'Iris Lund':['uneasy','','uneasy','afraid','broken',1],
 'Colonel Ash':['doubt','crossed','angry','angry','defiant',0],
 'Nell Parry':['polite','','uneasy','afraid','grief',1],
 'Lionel Crane':['calm','','evasive','angry','defiant',1],
 'Mrs. Dunmore':['uneasy','chin','uneasy','afraid','grief',1],
 'Felix Osei':['sly','','doubt','angry','uneasy',0],
 'Agnes Teale':['calm','','uneasy','afraid','afraid',0],
 'Piet Hollander':['polite','','sly','uneasy','afraid',1],
 'Marguerite Sol':['sly','','shocked','angry','grief',0]};
const PIC3={};let UQ3=0;function uniq3(svg){const u='_'+(++UQ3);return svg.replace(/id="([^"]+)"/g,(m,a)=>'id="'+a+u+'"').replace(/url\(#([^)]+)\)/g,(m,a)=>'url(#'+a+u+')')}
function hash3(s){let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0)/4294967296}
function lookP3(n){return PEOPLE.LOOKS[n]||PEOPLE.VICTIMS[n]||PEOPLE.VICTIMS['A guest']}
/* the face a guest wears right now: their temperament, their composure, and what you just did */
function face3(s){if(!G)return {expr:'calm'};const T=TEMPER[s.n]||['calm','','doubt','uneasy','afraid',0],comp=(G.comp||{})[s.id]??4,broke=(G.broke||{})[s.id],st=(G.stmts||{})[s.id]||{};
  const r=(G.react3||{})[s.id];if(r&&r.t===G.time)return r;
  if(broke)return s.id===G.M.killer?{expr:'defiant',pose:'crossed'}:{expr:'calm'};
  let expr=comp>=4?T[0]:comp===3?T[2]:comp===2?T[3]:T[4],pose=comp>=4?T[1]:'';
  if(comp>=4&&!st.alibi&&T[0]==='calm')expr='polite';
  if(comp>=3&&G.time>=23*60&&/uneasy|calm|polite/.test(expr)&&hash3(s.id+(G.seed||0))<.5)expr='uneasy';
  return {expr,pose}}
function react3(s,expr,pose){G.react3=G.react3||{};G.react3[s.id]={expr,pose:pose||'',t:G.time}}
function pic3(s,kind){const f=face3(s),n=s.n,coat=s.coat||'dark';const tilt=Math.round((hash3(n+G.time)-.5)*6);
  const lt=kind==='fig'&&typeof light3==='function'?light3(G.room):{side:'F',rim:null,k:.5};const key=[n,coat,f.expr,f.pose,kind,kind==='fig'?tilt:0,lt.side,lt.rim,lt.k].join('|');if(PIC3[key])return uniq3(PIC3[key]);
  const L=lookP3(n);let o={coat,expr:f.expr,pose:f.pose,bg:false,light:lt,tilt:kind==='fig'?tilt:0};
  if(kind==='fig')Object.assign(o,{vb:'60 80 480 820',size:'width="100%" height="100%" preserveAspectRatio="xMidYMin meet"'});
  else Object.assign(o,{vb:'140 110 320 390',size:'width="100%" height="100%" preserveAspectRatio="xMidYMid slice"',pose:''});
  const keys=Object.keys(PIC3);if(keys.length>80)delete PIC3[keys[0]];PIC3[key]=PEOPLE.portrait(L,o);return uniq3(PIC3[key])}
/* the old silhouettes now draw the real people */
function sil(s,crop){return `<span class="pp3 ${s.height==='short'?'short':''}">${pic3(s,crop?'med':'fig')}</span>`}
function vicPic(name){const k='vic|'+name;return uniq3(PIC3[k]||(PIC3[k]=PEOPLE.portrait(lookP3(name),{bg:false,expr:'calm',light:{side:'F',rim:null,k:.5},vb:'140 110 320 390',size:'width="100%" height="100%" preserveAspectRatio="xMidYMid slice"'})))}
function mePic(){const k='me|'+(G&&G.arch),L=PEOPLE.PLAYERS[(G&&G.arch)||'detective']||PEOPLE.PLAYERS.detective;
  const lowN=G&&G.nerve<=3,hurt=G&&G.hp<=Math.ceil(G.hpMax/3);const e=hurt?'afraid':lowN?'uneasy':'doubt';const kk=k+e;
  return uniq3(PIC3[kk]||(PIC3[kk]=PEOPLE.portrait(L,{bg:false,coat:'dark',expr:e,light:{side:'F',rim:null,k:.5},vb:'150 120 300 360',size:'width="100%" height="100%" preserveAspectRatio="xMidYMid slice"'})))}
function meHTML(){const lit=Math.ceil(G.nerve/2);let n='';for(let i=0;i<5;i++)n+=`<i class="${i<lit?'on':''}"></i>`;let h='';for(let i=0;i<G.hpMax;i++)h+=`<i class="${i<G.hp?'on':''}"></i>`;
  return `<span class="bars3"><span class="br"><b>NERVE</b><span class="nv" aria-label="Nerve ${Math.round(G.nerve)} of 10">${n}</span></span><span class="br"><b class="r">HEALTH</b><span class="hpb" aria-label="Health ${G.hp} of ${G.hpMax}">${h}</span></span></span><span class="pf3" aria-label="You, the ${ARCH[G.arch].n}">${mePic()}</span>`}
/* reactions to what you do in questioning */
const press0=press;
press=function(s,mode,o){const c0=(G.comp||{})[s.id]??4,T=TEMPER[s.n]||[];press0(s,mode,o);const c1=(G.comp||{})[s.id]??4,broke=(G.broke||{})[s.id];
  if(broke&&c0>0){if(s.id===G.M.killer)react3(s,'shocked','mouth');else react3(s,'broken');return}
  const e=o.ev?G.ev.find(x=>x.id===o.ev):null;
  if(e){if(implicates(e,s))react3(s,'shocked','mouth');else react3(s,c1<c0?'uneasy':'doubt',c1<c0?'chin':'');return}
  if(mode==='nerve'){if((G.shut||{})[s.id]>G.time)react3(s,'angry','palm');else react3(s,c1<c0?(T[3]||'angry'):'doubt',c1<c0?'':'crossed');return}
  if(c1<c0)react3(s,c1<=1?(T[4]||'afraid'):(T[3]||'uneasy'),'');else react3(s,'doubt','crossed')};
/* first answers: some look away when they lie, and the nervous ones look away whatever they say */
const talk0=talk;
talk=function(Gx,sid){const had=((Gx.stmts||{})[sid]||{}).alibi;talk0(Gx,sid);if(Gx._force!=null||had)return;const s=Gx.M.sus.find(x=>x.id===sid),T=TEMPER[s.n]||[],liar=sid===Gx.M.killer||sid===Gx.M.liar2;
  const p=hash3(sid+':'+(Gx.seed||0));if((liar&&p<.5)||(T[5]&&p<.45))react3(s,'evasive','');else react3(s,T[0]==='calm'?'polite':T[0],T[1])};
/* the victim photo in the case file, and on the casebook */
function vicPhoto(e){return vicPic(e.victim)}
/* the body: the drawn victim on the rug, then the wound once you have read it */
function bodyArt3(){const M=G.M;const L=lookP3(M.victim.n);const w=G.flags.body?M.weapon.id:null;
  $('#body3')?.remove();$('#play').classList.add('bodyview');$('#play').classList.toggle('wound3',!!w);$('#play').insertAdjacentHTML('beforeend',`<div class="body3" id="body3" aria-label="${M.victim.n}, dead on the rug"><div class="bp">${BODY.bodyScene(L,{examined:!!w,wound:w,size:'width="100%" height="100%" preserveAspectRatio="xMidYMid slice"'})}</div>${w?`<div class="wc"><div class="lens">${BODY.woundClose(L,w,'100%')}</div><b>${M.weapon.wound.split(' to ')[0].toUpperCase()}</b></div>`:''}</div>`)}
function bodyArtClose(){P3.bodyOn=false;$('#body3')?.remove();$('#play')?.classList.remove('bodyview','wound3')}
const bodyTap0=bodyTap;
bodyTap=function(){P3.bodyOn=true;bodyArt3();bodyTap0()};
const wide30=wide3;
wide3=function(...a){if(P3.bodyOn)bodyArtClose();return wide30(...a)};
const objTap0=objTap;
objTap=function(tap){if(tap!=='body'&&P3.bodyOn)bodyArtClose();return objTap0(tap)};
const examineAs0=examineAs;
examineAs=function(Gx,w){examineAs0(Gx,w);if(P3.bodyOn)setTimeout(()=>{if(P3.bodyOn)bodyArt3()},0)};
/* the 3D study: the same drawing laid on the rug, painted for this case's victim */
function paintBody3(mesh){if(!G||!mesh)return;const L=lookP3(G.M.victim.n),k=G.M.victim.n;if(mesh.userData.who===k)return;mesh.userData.who=k;
  const svg=BODY.bodyScene(L,{full:1,bg:false,vb:'0 0 860 420',size:'width="1720" height="840"'});const img=new Image();
  img.onload=()=>{const cv=document.createElement('canvas');cv.width=1720;cv.height=840;cv.getContext('2d').drawImage(img,0,0);const T=THREE,tx=new T.CanvasTexture(cv);tx.encoding=T.sRGBEncoding;tx.anisotropy=8;
    mesh.material.map=tx;mesh.material.needsUpdate=true;mesh.visible=true;if(GL.cur&&GL.cur.scene){try{GL.r.shadowMap.needsUpdate=true}catch(_){}}};
  img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}
function rolePic(k){const kk='role|'+k;return uniq3(PIC3[kk]||(PIC3[kk]=PEOPLE.portrait(PEOPLE.PLAYERS[k],{bg:false,expr:'calm',light:{side:'F',rim:null,k:.5},vb:'150 120 300 360',size:'width="100%" height="100%" preserveAspectRatio="xMidYMid slice"'})))}
/* whoever you are questioning stays in the room until you let them go; after that the night moves them again */
const tick30=tick;
tick=function(Gx,mins){const sid=(typeof P3!=='undefined')&&P3.talk,here=sid&&Gx.pos[sid];tick30(Gx,mins);
  if(sid&&here&&Gx.pos[sid]!==here&&!Gx.flags['dead_'+sid]&&!(Gx.locked||{})[sid])Gx.pos[sid]=here};
