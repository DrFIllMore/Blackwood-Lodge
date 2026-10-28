/* ---------- guests standing in the house ----------
   Each guest present is a full-length inked cut-out standing on the floor of the 3D room, lit by the room,
   turned to face whoever they are with, with a soft shadow at their feet. Tap them to question them. */
/* the room's own light, as seen from its starting view: which side it comes from and the colour of the edge it puts on people */
const LIGHT3={lounge:{side:'L',rim:'#ff9a3c',k:1},library:{side:'L',rim:'#f2d38a',k:.8},dining:{side:'F',rim:null,k:.55},kitchen:{side:'L',rim:'#ffb35a',k:.8},
  lobby:{side:'R',rim:'#ffd9a0',k:.7},study:{side:'R',rim:'#f2d38a',k:.8},stairs:{side:'L',rim:'#cfd8ff',k:.6},porch:{side:'R',rim:'#ffcf7a',k:.8},
  cellar:{side:'R',rim:'#ffcf7a',k:.85},boiler:{side:'L',rim:'#ff8a3c',k:.9},r1:{side:'R',rim:'#ffd9a0',k:.7},r2:{side:'L',rim:'#ffd9a0',k:.7},r3:{side:'R',rim:'#ffd9a0',k:.7},attic:{side:'L',rim:'#b8c8ff',k:.7}};
const DARK3={side:'F',rim:null,k:.6};
function light3(room){return G&&G.flags.power_out?DARK3:(LIGHT3[room]||{side:'F',rim:null,k:.5})}
/* hand-placed spots, in room coordinates, where people stand for a reason */
const SPOTW3={study:[[1.01,3.94],[-.82,3.79],[.26,3.85]],lounge:[[1.96,3.83],[1.44,4.14],[-.03,3.27]],library:[[-.41,4.73]],dining:[[-.10,5.54]]};
const ST3={tex:{},room:null,sig:''};
/* find more places to stand: open floor that is clear of furniture, visible from the room's starting view, with the head clear of the buttons */
function right3(cam){const f=new THREE.Vector3();cam.getWorldDirection(f);return f.cross(new THREE.Vector3(0,1,0)).normalize()}
function autoSpots3(r){if(r.spots3)return r.spots3;const T=THREE,w=r.views.wide,cam=GL.cam.clone();cam.position.set(...w.p);cam.lookAt(new T.Vector3(...w.t));cam.fov=w.fov;cam.aspect=GL.cam.aspect;cam.updateProjectionMatrix();cam.updateMatrixWorld();
  const ray=new T.Raycaster(),objs=[];r.scene.traverse(o=>{if(o.isMesh&&o.visible&&!o.userData.tap&&!o.userData.st3&&!(o.material&&o.material.transparent))objs.push(o)});
  const vb=$('#view').getBoundingClientRect(),tb=$('.top3')?$('.top3').getBoundingClientRect():{bottom:90},nb=$('.bot3')?$('.bot3').getBoundingClientRect():{top:vb.height*.78};
  const yMin=(tb.bottom+40)/vb.height,yMax=(nb.top-10)/vb.height;const cand=[];
  const fixed=(SPOTW3[r.id]||[]).map(([x,z])=>new T.Vector3(x,0,z));
  for(let fy=.44;fy<=yMax;fy+=.025)for(let fx=.2;fx<=.8;fx+=.04){ray.setFromCamera(new T.Vector2(fx*2-1,-fy*2+1),cam);const h=ray.intersectObjects(objs,false)[0];if(!h||!h.face)continue;
    const n=h.face.normal.clone().transformDirection(h.object.matrixWorld);if(n.y<.9||h.point.y>.08)continue;const p=h.point.clone();p.y=0;const d=p.distanceTo(cam.position);if(d<2.7||d>8)continue;if(r.id==='study'&&(Math.hypot(p.x-.05,p.z-2.55)<1.6||Math.hypot(p.x+.8,p.z-2.2)<1.2))continue;
    const head=p.clone();head.y=1.55;const hs=head.clone().project(cam);const hy=(1-hs.y)/2;if(hy<yMin||hs.x<-.9||hs.x>.9)continue;const top=p.clone();top.y=1.85;const ty=(1-top.clone().project(cam).y)/2;if(fy-ty>.4)continue;
    let blocked=false;for(const y of [.3,1,1.55])for(const dx of [-.16,0,.16]){const q=p.clone().add(right3(cam).multiplyScalar(dx));q.y=y;const dv=q.clone().sub(cam.position);const dl=dv.length();ray.set(cam.position,dv.normalize());const hh=ray.intersectObjects(objs,false)[0];if(hh&&hh.distance<dl-.3){blocked=true;break}}if(blocked)continue;
    cand.push({p,score:-Math.abs(d-4.2)})}
  const out=fixed.slice();cand.sort((a,b)=>b.score-a.score);while(out.length<7&&cand.length){let best=null,bd=-1;for(const c of cand){const m=Math.min(...out.map(o=>o.distanceTo(c.p)),99);if(m>bd){bd=m;best=c}}if(!best||bd<.75)break;out.push(best.p);cand.splice(cand.indexOf(best),1)}
  return r.spots3=out}
function figTex3(s,dir,lt){const f=face3(s),key=[s.n,s.coat,f.expr,dir,lt.side,lt.rim,lt.k].join('|');if(ST3.tex[key])return ST3.tex[key];
  const T=THREE,cv=document.createElement('canvas');cv.width=384;cv.height=1408;const tx=new T.CanvasTexture(cv);tx.encoding=T.sRGBEncoding;tx.anisotropy=4;ST3.tex[key]=tx;
  const svg=POSES.POSE[s.n]?POSES.figure(s.n,{coat:s.coat,expr:f.expr,dir,light:lt,size:'width="384" height="1408"'}):PEOPLE.portrait(lookP3(s.n),{full:1,bg:false,coat:s.coat,expr:f.expr,light:lt,size:'width="384" height="1408"'});
  const img=new Image();img.onload=()=>{cv.getContext('2d').drawImage(img,0,0,384,1408);tx.needsUpdate=true};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  const used=new Set(((GL.cur&&GL.cur.st3)||[]).map(o=>o.material&&o.material.map).filter(Boolean));const ks=Object.keys(ST3.tex);for(const k0 of ks){if(Object.keys(ST3.tex).length<=8)break;const old=ST3.tex[k0];if(used.has(old)||old===tx)continue;delete ST3.tex[k0];try{old.dispose()}catch(_){}}return tx}
function clear3(r){if(!r||!r.st3)return;for(const o of r.st3){r.scene.remove(o);if(o.geometry)o.geometry.dispose();if(o.material&&o.material.dispose)o.material.dispose()}r.hits=r.hits.filter(h=>!String(h.userData.tap).startsWith('person:'));r.st3=[]}
let SHADOW3=null;function shadowTex3(){if(SHADOW3)return SHADOW3;const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');const g=x.createRadialGradient(64,64,4,64,64,62);g.addColorStop(0,'rgba(0,0,0,.7)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128);return SHADOW3=new THREE.CanvasTexture(c)}
let QMARK3=null;function qTex3(){if(QMARK3)return QMARK3;const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.translate(64,64);x.rotate(Math.PI/4);x.fillStyle='#000';x.fillRect(-36,-30,70,70);x.fillStyle='#ffc83d';x.fillRect(-40,-40,70,70);x.rotate(-Math.PI/4);x.fillStyle='#0c0c0f';x.font='400 64px "Bebas Neue", Impact, sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('?',-2,2);const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;return QMARK3=t}
function place3(){const r=GL.cur;if(ST3.room&&ST3.room!==r&&!GL.rooms[ST3.room.id])ST3.room=null;if(!G||!r||r.id!==G.room||GL.shownRoom!==G.room||!window.POSES)return;
  const here=npcsIn(G,G.room),lt=light3(G.room),dark=!!G.flags.power_out;
  const sig=[r.id,lt.side,dark,here.map(s=>s.id+':'+face3(s).expr+':'+!!((G.stmts||{})[s.id]||{}).alibi).join(',')].join('|');if(r.st3&&ST3.room===r&&ST3.sig===sig)return;
  clear3(r);ST3.room=r;ST3.sig=sig;r.st3=[];if(!here.length)return;
  const T=THREE,spots=autoSpots3(r);G.spot3=G.spot3||{};const taken={};const map=G.spot3[r.id]=G.spot3[r.id]||{};
  const pos={};let extra=0;for(const s of here){let i=map[s.id];if(i==null||i>=spots.length||taken[i]){i=spots.findIndex((_,k)=>!taken[k]);if(i>=0)map[s.id]=i}if(i>=0){taken[i]=1;pos[s.id]=spots[i]}else{const base=spots[extra%Math.max(1,spots.length)]||new T.Vector3(...r.views.wide.t).setY(0);const rr=new T.Vector3().subVectors(new T.Vector3(...r.views.wide.t),new T.Vector3(...r.views.wide.p)).cross(new T.Vector3(0,1,0)).normalize();pos[s.id]=base.clone().add(rr.multiplyScalar((extra%2?-1:1)*(.55+.2*Math.floor(extra/2))));extra++}}
  const cam=GL.cam,w=r.views.wide,camP=new T.Vector3(...w.p),camT=new T.Vector3(...w.t),right=new T.Vector3().subVectors(camT,camP).cross(new T.Vector3(0,1,0)).normalize();
  const sx=p=>p.clone().sub(camP).dot(right);
  for(const s of here){const p=pos[s.id];
    /* face whoever is nearest; alone, face into the room */
    let other=null,bd=1e9;for(const o of here){if(o===s)continue;const d=pos[o.id].distanceTo(p);if(d<bd){bd=d;other=o}}
    const dir=other?(sx(pos[other.id])>sx(p)?'R':'L'):(sx(p)<sx(camT)?'R':'L');
    const H=(s.height==='tall'?1.84:1.64)*2200/2175,W=H*600/2200;
    const mat=new T.MeshStandardMaterial({map:figTex3(s,dir,lt),alphaTest:.5,roughness:1,metalness:0,side:T.DoubleSide,emissive:'#ffffff',emissiveMap:null,emissiveIntensity:0});
    mat.emissiveMap=mat.map;mat.emissiveIntensity=dark?0:.16;
    const m=new T.Mesh(new T.PlaneGeometry(W,H),mat);m.rotation.order='YXZ';m.position.set(p.x,H/2-.012,p.z);m.userData.st3=1;m.castShadow=false;
    m.onBeforeRender=(rr,sc,c)=>{const dx=c.position.x-m.position.x,dz=c.position.z-m.position.z;m.rotation.set(0,Math.atan2(dx,dz),0);const pitch=Math.atan2(c.position.y-m.position.y,Math.hypot(dx,dz));if(pitch>.8)m.rotation.x=-(pitch-.8)};
    r.scene.add(m);r.st3.push(m);
    const sh=new T.Mesh(new T.PlaneGeometry(W*1.3,W*.62),new T.MeshBasicMaterial({map:shadowTex3(),transparent:true,depthWrite:false,opacity:dark?.5:.8}));sh.rotation.x=-Math.PI/2;sh.position.set(p.x,.013,p.z);sh.userData.st3=1;r.scene.add(sh);r.st3.push(sh);
    if(!((G.stmts||{})[s.id]||{}).alibi){const q=new T.Sprite(new T.SpriteMaterial({map:qTex3(),depthTest:false,transparent:true}));q.scale.set(.26,.26,1);q.position.set(p.x,H+.04,p.z);q.renderOrder=9;q.userData.st3=1;r.scene.add(q);r.st3.push(q)}
    const hit=new T.Mesh(new T.SphereGeometry(1,8,6),new T.MeshBasicMaterial());hit.scale.set(W*.6,H*.5,W*.6);hit.position.set(p.x,H*.52,p.z);hit.visible=false;hit.userData={tap:'person:'+s.id,view:null};r.scene.add(hit);r.st3.push(hit);r.hits.push(hit)}
  try{GL.r.shadowMap.needsUpdate=true}catch(_){}}
setInterval(()=>{try{if(G&&!G.over&&!P3.talk&&!P3.busy&&$('#play')&&!$('#play').hidden)place3()}catch(e){console.warn(e)}},400);
/* tapping a guest in the room opens the questioning */
const objTap3=objTap;objTap=function(tap){if(String(tap).startsWith('person:')){const sid=tap.slice(7);if(typeof bodyArtClose==='function'&&P3.bodyOn)bodyArtClose();return openTalk(sid)}return objTap3(tap)};
/* turn views ignore people; they are about the room's things */
const hiddenHits3=hiddenHits;hiddenHits=function(r,v){const sv=r.hits;r.hits=sv.filter(h=>!String(h.userData.tap).startsWith('person:'));try{return hiddenHits3(r,v)}finally{r.hits=sv}};
