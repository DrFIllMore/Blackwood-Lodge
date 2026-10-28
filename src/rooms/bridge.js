/* ---------- SCENE: the lodge in 3D ----------
   Replaces the flat drawings. Each room is a lit 3D set; the case decides what's in it.
   Tap things in the room to look closer: search spots, the body, and the room's tell-tale details. */
const ROOM3={lobby:'hall',stairs:'upstairs',r1:'room1',r2:'room2',r3:'room3'};const r3id=id=>ROOM3[id]||id;
const COATHEX={dark:'#1c2233',pale:'#8a7550',green:'#24452e',red:'#5a1c26'};
/* where each search spot, the body and each detail sits in its room: a view to move to and a point to tap */
const SPOT3={lobby:{coatstand:'coats',umbrella:{p:[-1.2,1.3,5.6],t:[-2.15,.45,6.85],fov:50},clock:'clock'},porch:{drift:'prints',bracket:'wood'},
  lounge:{sofa:'table',table:'drinks',grate:'grate',clock:'mantel'},library:{chairs:'chairs',ladder:'ladder',lamptable:'desk'},study:{desk:{p:[.05,1.05,2.95],t:[.08,.22,4.2],fov:54},bookcase:'shelves',rug:'rug'},
  dining:{sideboard:'sideboard',undertable:'cards',chairs:'head'},kitchen:{range:'range',worktable:'table',counter:'knives'},cellar:{rack:'racks',barrels:'barrels',crate:'crate'},
  boiler:{bench:'bench',tank:'firebox',crates:'coal'},stairs:{plant:'portrait',lamp:'window',banister:'banister'},r1:{wardrobe:'wardrobe',desk:'dressing',bed:'night'},
  r2:{dresser:'chest',bed:'night',chair:'desk'},r3:{trunk:'chest',bed:'under',grate:'wash'},attic:{trunk:'trunk',sheet:'form',form:'trunks'}};
/* where to tap, when the close-up's aim point isn't where the thing shows in the room shot */
const TAP3={lobby:{'spot:clock':[-2.2,1.5,6.05]},study:{'spot:rug':[.9,.03,1.9],'spot:bookcase':[-1.25,1.0,5.0],'obs:clock':[-1.15,.12,3.45]},cellar:{'spot:rack':[1.15,.8,5.6],'spot:barrels':[-.95,.5,5.1]},
  boiler:{radio:[-1.2,1.05,0]},stairs:{'spot:banister':[.95,1.0,2.4]},r1:{'spot:bed':[.6,.55,2.1]},r2:{'spot:dresser':[-1.5,.9,2.5],'spot:chair':[1.55,.8,2.5]},attic:{'spot:form':[-.75,1.0,5.6]},library:{'spot:ladder':[-1.2,1.4,5.3]}};
const BODY3={p:[-1.15,1.8,1.15],t:[.2,.12,2.7],fov:58};
/* details: things anyone could notice, which tell different stories in different cases */
const OBS={
 lounge:[{id:'irons',name:'fire irons',view:{p:[1.05,1.15,3.75],t:[2.36,.48,4.5],fov:44},mins:2,text:G=>G.M.weapon.id==='poker'?['The fire irons: brush, shovel, tongs. The fourth hook is empty.','home','The poker is missing from the lounge fire irons.']:['Brush, shovel, tongs and poker, all four on their hooks.']},
  {id:'glasses',name:'wing chairs',view:'chairs',mins:2,text:G=>{const M=G.M,pr=M.sched[M.pair[0]][2],lr=M.sched[M.lone][2];return pr==='lounge'?['Two wing chairs turned in toward each other. A glass by each, both used. Two people sat here and talked.','room_lounge','Two people sat together in the lounge: two glasses, two chairs turned in.']:lr==='lounge'?['The chairs face the fire. One glass, on the near table. Whoever sat here sat alone.','room_lounge','Only one person sat in the lounge: one glass, one chair used.']:['One glass, a while ago, the ice long gone. Nobody has sat here for an hour.']}}],
 kitchen:[{id:'knives',name:'knife block',view:'knives',mins:2,text:G=>G.M.weapon.id==='knife'?['The knife block. One slot is empty, the largest.','home','A knife is missing from the kitchen block.']:['The knife block: every slot filled.']},
  {id:'sink',name:'sink',view:'sink',mins:2,text:G=>['A cloth in the bottom of the sink, wrung out and left. The cold tap drips.']}],
 dining:[{id:'curtains',name:'curtains',view:'curtains',mins:2,text:G=>G.M.weapon.id==='cord'?['Three curtains caught back with gold cords. The fourth hangs loose: its cord is gone.','home','A tie-back cord is missing from the dining room curtains.']:['Each curtain caught back with its gold cord and tassel.']},
  {id:'places',name:'place cards',view:'dessert',mins:2,text:G=>['One place not cleared: a dessert untouched, the spoon clean. Whoever sat there left before pudding.']}],
 boiler:[{id:'pegboard',name:'pegboard',view:'pegboard',mins:2,text:G=>G.M.weapon.id==='wrench'?['The pegboard. Every tool inside its painted outline, except the first: the wrench\'s outline is empty.','home','The pipe wrench is missing from the boiler room pegboard.']:['Every tool in its painted outline, the wrench included.']}],
 library:[{id:'bookends',name:'bookends',view:'bookends',mins:2,text:G=>G.M.weapon.id==='statue'?['One bronze bookend on the shelf. The books lean over into the space where its pair stood.','home','One of the library\'s bronze bookends is missing.']:['A short run of books held between a pair of bronze bookends.']},
  {id:'doorway',name:'doorway',view:'doorway',mins:1,text:G=>['From the doorway the corridor runs straight to the study door. Anyone sitting here would see who went in.']}],
 lobby:[{id:'rack',name:'coat rack',view:'coat',mins:2,text:G=>{const k=G.M.sus.find(s=>s.id===G.M.killer);return ['Six coats. One, '+k.coat+', has lost its second button: two threads and a small tear. Its cuffs are wet through. No name in the collar.','coat',`A ${k.coat} coat on the rack is short a button and wet at the cuffs.`]}},
  {id:'boots',name:'boot tray',view:'boots',mins:1,text:G=>['Boots in the tray. Some dry, some still standing in their meltwater. Everyone came in out of the snow this afternoon.']},
  {id:'book',name:'guest book',view:'book',mins:1,text:G=>['The guest book, open at today: '+G.M.sus.map(s=>s.n).join(', ')+'. Under remarks: road closed below the bridge.']}],
 stairs:[{id:'runner',name:'runner',view:'runner',mins:2,text:G=>G.M.weaponRoom==='attic'&&!G.M.weaponMoved?(G.time<23*60+30?['Wet marks off the top stair and along the runner, ending under the attic hatch.','trail','Wet marks on the upstairs runner lead to the attic hatch.']:['Faint tidemarks along the runner, toward the attic hatch. Nearly dry.','trail','Dried tidemarks on the upstairs runner lead to the attic hatch.']):['The runner, a little worn. Nothing on it tonight.']}],
 attic:[{id:'dust',name:'floorboards',view:{p:[.3,1.5,2.4],t:[.2,0,4.6],fov:55},mins:2,text:G=>G.M.weaponRoom==='attic'?['Dust over the boards, and one sharp new track from the hatch into the middle of the attic and back.','track','A fresh track in the attic dust, from the hatch and back.']:['Dust over the boards, an old blurred path down the middle. Nobody has been up here for weeks.']}],
 cellar:[{id:'bottle',name:'open bottle',view:'crate',mins:1,text:G=>['On the crate, an open bottle with the cork drawn, and one glass, half full. Somebody came down here to drink alone.']}],
 study:[{id:'clock',name:'carriage clock',view:'clock',mins:1,text:G=>['A carriage clock on the floor, on its side. The glass is cracked. The hands stand at twenty to ten.','clock','The study clock stopped at 9:40 when it hit the floor.']},
  {id:'smear',name:'door frame',view:'door',mins:2,text:G=>{const k=G.M.sus.find(s=>s.id===G.M.killer);return [k.height==='tall'?'Four dark streaks beside the door frame, dragged downward. They start about five and a half feet up.':'Four dark streaks beside the door frame, dragged downward. They start at about four and a half feet.','smear',`A bloody hand smear by the study door, at a ${k.height} person's height.`]}}]};
const GL={};
function glInit(){if(GL.r)return true;const cv=document.createElement('canvas');cv.id='sc';
  try{GL.r=new THREE.WebGLRenderer({canvas:cv,antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:true})}catch(e){return false}
  const T=THREE,r=GL.r;GL.cv=cv;GL.PR=Math.min(2,devicePixelRatio||1);r.setPixelRatio(GL.PR);r.shadowMap.enabled=true;r.shadowMap.type=T.PCFSoftShadowMap;r.shadowMap.autoUpdate=false;r.outputEncoding=T.sRGBEncoding;r.toneMapping=T.NoToneMapping;
  GL.cam=new T.PerspectiveCamera(60,1,.03,300);
  const isGL2=r.capabilities.isWebGL2;const rt=isGL2&&T.WebGLMultisampleRenderTarget?new T.WebGLMultisampleRenderTarget(2,2,{type:T.HalfFloatType}):new T.WebGLRenderTarget(2,2,{type:T.HalfFloatType});if(rt.samples!==undefined)rt.samples=4;
  GL.comp=new T.EffectComposer(r,rt);GL.comp.setPixelRatio(GL.PR);GL.pass=new T.RenderPass(new T.Scene(),GL.cam);GL.comp.addPass(GL.pass);GL.bloom=new T.UnrealBloomPass(new T.Vector2(512,512),.32,.32,1.12);GL.comp.addPass(GL.bloom);
  GL.fin=new T.ShaderPass({uniforms:{tDiffuse:{value:null},time:{value:0},exposure:{value:1.4}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
   fragmentShader:`uniform sampler2D tDiffuse;uniform float time;uniform float exposure;varying vec2 vUv;
   vec3 aces(vec3 x){const float a=2.51,b=.03,c=2.43,d=.59,e=.14;return clamp((x*(a*x+b))/(x*(c*x+d)+e),0.,1.);}
   float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
   void main(){vec3 col=texture2D(tDiffuse,vUv).rgb*exposure;col=aces(col);col=pow(col,vec3(1./2.2));
    col=clamp((col-.5)*1.05+.5,0.,1.);col=col*col*(3.-2.*col)*.18+col*.82;float lum=dot(col,vec3(.299,.587,.114));col=mix(vec3(lum),col,1.12);col=mix(col,col*vec3(.9,.95,1.06),smoothstep(.4,0.,lum)*.35);col=mix(col,col*vec3(1.05,1.0,.93),smoothstep(.4,.9,lum)*.3);
    vec2 q=vUv-.5;float v=smoothstep(.85,.25,length(q*vec2(1.,1.25)));col*=mix(.74,1.,v);col+=(h(vUv*vec2(900.,1300.)+time)-.5)*.018;gl_FragColor=vec4(col,1.);}`});GL.comp.addPass(GL.fin);
  GL.rooms={};GL.cur=null;GL.ray=new T.Raycaster();GL.shadowFrames=3;GL.scale=1;GL.acc=0;GL.n=0;GL.lastAdj=0;GL.auto=!navigator.webdriver;
  GL.cv.addEventListener('pointerdown',e=>{GL.down={x:e.clientX,y:e.clientY}});
  GL.cv.addEventListener('pointerup',e=>{const d=GL.down;GL.down=null;if(!d||Math.hypot(e.clientX-d.x,e.clientY-d.y)>10)return;tap3(e)});
  return true}
function helpers3(seedIn,scene,ANIM,hooks){const T=THREE;let seed=seedIn||7;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
  const ctex=(w,h,draw,rep)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');draw(x,w,h);const t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;t.anisotropy=8;if(rep){t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(rep[0],rep[1])}return t};
  const noise=(x,w,h,a,n=4000)=>{for(let i=0;i<n;i++){x.fillStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:255},${rnd()<.5?0:255},${a*rnd()})`;x.fillRect(rnd()*w,rnd()*h,1+rnd()*2,1+rnd()*2)}};
  const M=(c,o={})=>new T.MeshStandardMaterial({color:c,roughness:.7,metalness:0,...o});
  const add=(geo,mat,x,y,z,o={})=>{const m=new T.Mesh(geo,mat);m.position.set(x,y,z);if(o.ry)m.rotation.y=o.ry;if(o.rx)m.rotation.x=o.rx;if(o.rz)m.rotation.z=o.rz;m.castShadow=o.cast!==false;m.receiveShadow=true;(o.to||scene).add(m);return m};
  const RB=(w,h,d,r=.02,s=3)=>new T.RoundedBoxGeometry(w,h,d,s,Math.max(.0005,Math.min(r,w/2-.001,h/2-.001,d/2-.001)));
  const BOX=(w,h,d)=>new T.BoxGeometry(w,h,d);const lathe=(pts,seg=32)=>new T.LatheGeometry(pts.map(p=>new T.Vector2(p[0],p[1])),seg);
  const grp=(x,y,z,ry=0,to=scene)=>{const g=new T.Group();g.position.set(x,y,z);g.rotation.y=ry;to.add(g);return g};
  const plane=(w,h,mat,x,y,z,ry=0,rx=0)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),mat);m.position.set(x,y,z);m.rotation.set(rx,ry,0);m.receiveShadow=true;scene.add(m);return m};
  const tube=(pts,r,mat,o={})=>add(new T.TubeGeometry(new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(...p))),o.seg||24,r,o.rs||8),mat,0,0,0,o);
  const tiledBox=(w,h,d,mat,x,y,z,tile=1,o={})=>{const g=BOX(w,h,d);const uv=g.attributes.uv,nm=g.attributes.normal;for(let i=0;i<uv.count;i++){const nx=Math.abs(nm.getX(i))>.5,ny=Math.abs(nm.getY(i))>.5;const su=nx?d:w,sv=ny?d:h;uv.setXY(i,uv.getX(i)*su/tile,uv.getY(i)*sv/tile)}return add(g,mat,x,y,z,o)};
  const lin=c=>new T.Color(c).convertSRGBToLinear();const hook=(n,o,data)=>{(hooks[n]||(hooks[n]=[])).push({o,data})};
  return {T,TAU:Math.PI*2,rnd,ctex,noise,scene,renderer:GL.r,camera:GL.cam,ANIM,M,add,RB,BOX,lathe,grp,plane,tube,tiledBox,lin,hook}}
function env3(scene,R){if(R.noEnv)return;const T=THREE;const pm=new T.PMREMGenerator(GL.r);const es=new T.Scene();es.background=new T.Color('#120c08');
  const eb=(c,k,x,y,z,sx,sy,sz)=>{const m=new T.Mesh(new T.BoxGeometry(sx,sy,sz),new T.MeshBasicMaterial({color:new T.Color(c).multiplyScalar(k)}));m.position.set(x,y,z);es.add(m)};
  (R.env||[['#3a2416',1,0,-2,0,12,.2,12],['#2a1a10',1,0,0,6,12,8,.2],['#2a1a10',1,0,0,-6,12,8,.2],['#2a1a10',1,-6,0,0,.2,8,12],['#2a1a10',1,6,0,0,.2,8,12],['#ffd0a0',4,0,4,0,2.4,.2,2.4],['#5a74b8',2.5,-2,1.4,-5.8,2,2.4,.2]]).forEach(a=>eb(...a));
  const envRT=pm.fromScene(es,.03),envT=envRT.texture;scene.userData.envRT=envRT;es.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)o.material.dispose()});scene.traverse(o=>{if(!o.isMesh)return;const m=o.material;if(!m||!m.isMeshStandardMaterial||m.envMap||m.userData.noEnv)return;
    if(m.isMeshPhysicalMaterial||m.metalness>.4||m.roughness<.36){m.envMap=envT;m.envMapIntensity=m.userData.env!=null?m.userData.env:(m.metalness>.4?1.0:(m.isMeshPhysicalMaterial?1.2:.35));m.needsUpdate=true}});pm.dispose()}
function merge3(room){const T=THREE,scene=room.scene;scene.updateMatrixWorld(true);const groups=new Map();
  scene.traverse(o=>{if(!o.isMesh||o.isInstancedMesh)return;const m=o.material;if(!m||Array.isArray(m)||m.transparent||m.isShaderMaterial)return;for(let p=o;p;p=p.parent)if(!p.visible||p.userData.dyn)return;
    const s0=room.snap.get(o);if(!s0||!s0.equals(o.matrixWorld)||o.matrixWorld.determinant()<=0)return;const g=o.geometry;if(!g||!g.attributes.position||(g.morphAttributes&&Object.keys(g.morphAttributes).length))return;
    const names=Object.keys(g.attributes).sort();for(const n of names){const a=g.attributes[n];if(a.isInterleavedBufferAttribute||!(a.array instanceof Float32Array))return}
    const k=m.uuid+'|'+names.join(',')+'|'+names.map(n=>g.attributes[n].itemSize).join(',')+'|'+o.castShadow+'|'+o.receiveShadow+'|'+(o.renderOrder||0);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(o)});
  for(const [k,list] of groups){if(list.length<2)continue;const names=k.split('|')[1].split(',');let total=0;const parts=list.map(o=>{const g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.applyMatrix4(o.matrixWorld);total+=g.attributes.position.count;return g});
    const out=new T.BufferGeometry();for(const n of names){const sz=parts[0].attributes[n].itemSize;const arr=new Float32Array(total*sz);let off=0;for(const g of parts){arr.set(g.attributes[n].array,off);off+=g.attributes[n].array.length}out.setAttribute(n,new T.BufferAttribute(arr,sz))}
    out.computeBoundingSphere();const mesh=new T.Mesh(out,list[0].material);mesh.castShadow=list[0].castShadow;mesh.receiveShadow=list[0].receiveShadow;mesh.renderOrder=list[0].renderOrder;mesh.matrixAutoUpdate=false;mesh.updateMatrix();scene.add(mesh);list.forEach(o=>{o.parent.remove(o);if(o.geometry)o.geometry.dispose()});parts.forEach(g=>g.dispose())}
  GL.shadowFrames=3}
function evict3(keep){for(const k of Object.keys(GL.rooms)){if(keep.includes(k))continue;GL.rooms[k].scene.traverse(o=>{if(o.isLight&&o.shadow&&o.shadow.map){o.shadow.map.dispose();o.shadow.map=null}if(o.geometry)o.geometry.dispose();const ms=o.material?(Array.isArray(o.material)?o.material:[o.material]):[];ms.forEach(m=>{for(const key in m){const v=m[key];if(v&&v.isTexture)v.dispose()}m.dispose()})});const rt=GL.rooms[k].scene.userData.envRT;if(rt)rt.dispose();GL.rooms[k].snap=null;GL.rooms[k].hits=[];GL.rooms[k].st3=null;delete GL.rooms[k]}}
function build3(id){const T=THREE,name=r3id(id),def=(window.__ROOMDEFS||{})[name];if(!def)return null;const scene=new T.Scene();scene.background=new T.Color('#05060a');const ANIM=[],hooks={};
  const R=def.build(helpers3(def.seed,scene,ANIM,hooks));env3(scene,R);const torch=new T.PointLight('#ffd8a8',0,8,1.3);scene.add(torch);
  const r={id,name,scene,R,ANIM,hooks,torch,views:R.views,hits:[],far:R.far||300,exp:R.exposure||1.4,dexp:R.darkExposure!=null?R.darkExposure:.35,bloom:R.bloom||[.32,.32,1.12],age:0,merged:false,G:G};
  caseSet3(r);hits3(r);
  GL.pass.scene=scene;const cull=[];scene.traverse(o=>{if(o.frustumCulled){cull.push(o);o.frustumCulled=false}});try{GL.r.compile(scene,GL.cam);GL.r.shadowMap.needsUpdate=true;GL.comp.render()}catch(e){}cull.forEach(o=>o.frustumCulled=true);
  scene.updateMatrixWorld(true);r.snap=new Map();scene.traverse(o=>{if(o.isMesh)r.snap.set(o,o.matrixWorld.clone())});GL.rooms[id]=r;return r}
const dyn3=o=>{if(o&&o.isObject3D)o.userData.dyn=true};
function view3(r,v){return typeof v==='string'?r.views[v]:v}
/* what the case puts in each room */
function caseSet3(r){const T=THREE,H=r.hooks,M=G.M,k=M.sus.find(s=>s.id===M.killer),tw=M.sus.find(s=>s.id===M.twin);
  if(r.name==='study'&&typeof paintBody3==='function')(H.bodyArt||[]).forEach(h=>paintBody3(h.o));
  if(r.name==='lounge'){(H.pokerSlot||[]).forEach(h=>{if(M.weapon.id==='poker')return;const g=h.o;const br=new T.MeshStandardMaterial({color:'#c9a24a',metalness:.85,roughness:.3});
      const add=(geo,y)=>{const m=new T.Mesh(geo,br);m.position.y=y;m.castShadow=true;g.add(m);return m};add(new T.TorusGeometry(.016,.004,6,12),0);add(new T.SphereGeometry(.014,10,8),.02);add(new T.CylinderGeometry(.0065,.0065,.56,8),-.3);
      const hk=new T.Mesh(new T.CylinderGeometry(.006,.006,.08,8),new T.MeshStandardMaterial({color:'#151413',metalness:.3,roughness:.55}));hk.position.set(.025,-.6,0);hk.rotation.z=.9;g.add(hk)});
    const pr=M.sched[M.pair[0]][2];(H.glassB||[]).forEach(h=>{h.o.visible=pr==='lounge';dyn3(h.o)})}
  if(r.name==='kitchen'&&M.weapon.id==='knife')(H.knife||[]).forEach(h=>{if(h.data.i===0)h.o.children.forEach((c,j)=>{if(j>0)c.visible=false})});
  if(r.name==='dining'&&M.weapon.id==='cord'){const tv=new T.Vector3(...r.views.curtains.t);let c=null,best=1e9;(H.cord||[]).forEach(h=>{const ps=h.o.filter(o=>o.isMesh&&o.geometry&&o.geometry.type==='SphereGeometry');const p=ps.length?ps[0].position:new T.Vector3(0,0,1e3);const d=p.distanceTo(tv);if(d<best){best=d;c=h}});if(c)c.o.forEach(o=>{if(!(o.geometry&&o.geometry.type==='SphereGeometry'&&o.parent===r.scene))o.visible=false})}
  if(r.name==='boiler'&&M.weapon.id==='wrench')(H.wrench||[]).forEach(h=>h.o.forEach(o=>o.visible=false));
  if(r.name==='library'&&M.weapon.id==='statue')(H.bookend||[]).forEach(h=>h.o.visible=false);
  if(r.name==='hall'){const cs=H.coat||[];const others=M.sus.filter(s=>s!==k&&s!==tw);const order=[others[0],tw,others[1],others[2],k,others[3]];
    cs.forEach((h,i)=>{const who=order[i];if(!who)return;const from=new T.Color(h.data.col),to=new T.Color(COATHEX[who.coat]);
      h.o.traverse(o=>{if(!o.isMesh||!o.material||!o.material.color)return;const c=o.material.color;for(const f of [1,.75,.5,.45,.4]){const ref=from.clone().multiplyScalar(f);if(Math.abs(c.r-ref.r)+Math.abs(c.g-ref.g)+Math.abs(c.b-ref.b)<.004){o.material=o.material.clone();o.material.color.copy(to.clone().multiplyScalar(f));break}}})})}
  if(r.name==='study'){const b=(H.button||[])[0];if(b){const pos={rug:[1.42,.0075,1.32],desk:[.1,.008,4.3],bookcase:[-1.6,.008,4.98]}[M.itemSpot]||[1.42,.0075,1.32];b.o.position.set(...pos);dyn3(b.o);
      const to=new T.Color(COATHEX[k.coat]);b.o.traverse(o=>{if(!o.isMesh||!o.material||!o.material.map)return;const m=o.material.clone();if(m.transparent){m.alphaMap=m.map;m.map=null;m.color.copy(to).multiplyScalar(.8)}else{m.map=null;m.color.copy(to)}o.material=m})}}
  if(r.name==='attic'){(H.poker||[]).forEach(h=>{h.o.visible=false;dyn3(h.o)});(H.trunk||[]).forEach(h=>{h.o.lid.rotation.x=M.weaponRoom==='attic'&&M.weaponSpot==='trunk'?-.13:0;dyn3(h.o.lid)})}
  if(r.name==='upstairs')(H.wet||[]).forEach(h=>dyn3(h.o));
  for(const k2 of ['drawer','scrap','tongs','ice','ember','smoke','hatchShut','coat','lining','knife','bookend','pokerSlot','glassB'])(H[k2]||[]).forEach(h=>{if(h.o&&h.o.isObject3D)dyn3(h.o)})}
function tick3(r){const H=r.hooks,M=G.M,m=G.time-22*60;
  if(r.name==='study'){const b=(H.button||[])[0];if(b)b.o.visible=G.ev.some(e=>e.id==='item');const d=(H.drawer||[])[0];if(d)d.o.position.z=d.data.open}
  if(r.name==='lounge'){(H.scrap||[]).forEach(h=>h.o.visible=false);(H.ice||[]).forEach(h=>h.o.visible=m<20);(H.ember||[]).forEach(h=>h.o.visible=m<40);(H.smoke||[]).forEach(h=>h.o.visible=m<40)}
  if(r.name==='hall'){(H.prints||[]).forEach(h=>h.o.opacity=.8*Math.max(0,Math.min(1,1-(m-20)/50)));(H.puddle||[]).forEach(h=>h.o.material.opacity=.5*Math.max(0,Math.min(1,1-(m-35)/45)))}
  if(r.name==='upstairs'){const on=M.weaponRoom==='attic'&&!M.weaponMoved;(H.wet||[]).forEach(h=>{h.o.visible=on;h.o.material.opacity=h.data.base*Math.max(.12,Math.min(1,1-(m-60)/60))})}
  if(r.name==='attic'){const a=(H.poker||[])[0];if(a)a.o.visible=false}}
/* tap targets: every search spot, the body, each detail, and the radio */
function hits3(r){const T=THREE,geo=new T.SphereGeometry(1,8,6),mat=new T.MeshBasicMaterial();const mk=(id,v,rad)=>{const vv=view3(r,v);if(!vv)return;const m=new T.Mesh(geo,mat);const tp=(TAP3[r.id]||{})[id];m.position.set(...(tp||vv.t));if(tp&&tp[2]===0)m.position.z=vv.t[2];m.scale.setScalar(rad||.3);m.visible=false;m.userData={tap:id,view:vv};r.scene.add(m);r.hits.push(m)};
  const id=r.id;for(const s of Object.keys(SPOTS[id]||{}))mk('spot:'+s,(SPOT3[id]||{})[s]||'wide');(OBS[id]||[]).forEach(o=>mk('obs:'+o.id,o.view,.26));
  if(id==='study')mk('body',{p:BODY3.p,t:[.1,.25,2.55],fov:BODY3.fov},.7);if(id==='boiler')mk('radio','radio',.35)}
function tap3(e){if(!G||G.over||V.intro||V.rolling||V.anim||$('#sheet'))return;const r=GL.cur;if(!r)return;const b=GL.cv.getBoundingClientRect();
  const v=new THREE.Vector2((e.clientX-b.left)/b.width*2-1,-(e.clientY-b.top)/b.height*2+1);GL.ray.setFromCamera(v,GL.cam);r.hits.forEach(h=>{h.visible=true;h.updateMatrixWorld()});const all=GL.ray.intersectObjects(r.hits,false);let hit=all[0];if(all.length>1){/* prefer the target whose centre is closest to the tap line */let best=1e9;for(const h of all){const c=h.object.position;const d=GL.ray.ray.distanceSqToPoint(c)/h.object.scale.x;if(d<best){best=d;hit=h}}}r.hits.forEach(h=>h.visible=false);
  const rip=document.createElement('i');rip.className='rip3';rip.style.left=(e.clientX-b.left)+'px';rip.style.top=(e.clientY-b.top)+'px';$('#view').appendChild(rip);setTimeout(()=>rip.remove(),600);
  if(!hit)return;const u=hit.object.userData;look3(u.view);SND.click();
  if(u.tap==='body')return objSheet('The body',G.flags.body?'You have seen what there is to see.':`${G.M.victim.n}, face down on the rug.`,[{id:'ex',t:'Examine the body',s:'Learn what kind of weapon did this.',c:'15 min<br><em>Wits roll</em>',i:I.body,dim:G.flags.body,f:()=>act(()=>examine(G),'examine')}]);
  if(u.tap==='radio')return objSheet('The wireless',G.radio?'Working. The police are coming.':'Lid off, valves cold.',[{id:'rp',t:'Repair the radio',s:'Call the police. They arrive on a clock, ready or not.',c:'30 min<br><em>Wits roll</em>',i:I.radio,dim:G.radio,f:()=>act(()=>repair(G),'search')}]);
  if(u.tap.startsWith('spot:'))return spotSheet(u.tap.slice(5));
  if(u.tap.startsWith('obs:')){const o=(OBS[G.room]||[]).find(x=>x.id===u.tap.slice(4));if(o)obsSheet(o)}}
function look3(v){if(!v)return;GL.from={p:GL.p.clone(),t:GL.t.clone(),fov:GL.fov};GL.to={p:new THREE.Vector3(...v.p),t:new THREE.Vector3(...v.t),fov:v.fov};GL.tw=0;GL.close=v!==(GL.cur&&GL.cur.views.wide);const b=$('#back3');if(b)b.hidden=!GL.close}
function wide3(){if(GL.cur)look3(GL.cur.views.wide)}
function objSheet(title,sub,opts){optSheet(title,sub,opts,'Step back');const cl=$('#cl');if(cl){const f=cl.onclick;cl.onclick=()=>{f&&f();wide3()}}const sc=$('#scrim');if(sc){const f=sc.onclick;sc.onclick=()=>{f&&f();wide3()}}}
function spotSheet(id){const R=G.room,name=SPOTS[R][id],key=R+':'+id,done=G.searched[key],found=G.found&&G.found[key];
  objSheet(name[0].toUpperCase()+name.slice(1),found?'You found something here.':done?'You searched it. Nothing.':'',[{id:'s',t:`Search the ${name}`,s:found?'You found something here.':done?'Searched. Nothing.':'Takes time and makes noise.',c:'15 min<br><em>Wits roll</em>',i:I.search,dim:!!done,f:()=>{V.lastSpot=id;act(()=>search(G,id),'search')}}])}
function obsSheet(o){const seen=G.obs&&G.obs[G.room+':'+o.id];objSheet(o.name[0].toUpperCase()+o.name.slice(1),seen||'',[{id:'o',t:`Look closely at the ${o.name}`,s:seen?'Look again: things change as the night goes on.':'Notice what is there, and what isn\'t.',c:`${o.mins} min`,i:I.look,f:()=>act(()=>observe(G,o),'examine')}])}
function observe(G,o){tick(G,o.mins);const [t,ev,evt]=o.text(G);G.obs=G.obs||{};G.obs[G.room+':'+o.id]=t;say(G,t,ev?'':'dim');if(ev)addEv(G,ev==='home'?'home_'+G.M.weapon.id:ev,evt)}
/* lookSheet: the old list, plus the room's details, each moving the camera as you pick it */
function lookSheet(){if(V.intro||V.rolling)return;const R=G.room,r=GL.cur;const opts=[];
  if(R==='study')opts.push({id:'body',t:'Examine the body',s:G.flags.body?'You have seen what there is to see.':'Learn what kind of weapon did this.',c:'15 min<br><em>Wits roll</em>',i:I.body,dim:G.flags.body,f:()=>{look3(BODY3);act(()=>examine(G),'examine')}});
  for(const [id,name] of Object.entries(SPOTS[R])){const key=R+':'+id,done=G.searched[key],found=G.found&&G.found[key];opts.push({id:'s_'+id,t:`Search the ${name}`,s:found?'You found something here.':done?'Searched. Nothing.':'Takes time and makes noise.',c:'15 min<br><em>Wits roll</em>',i:I.search,dim:!!done,f:()=>{if(r)look3(view3(r,(SPOT3[R]||{})[id]));V.lastSpot=id;act(()=>search(G,id),'search')}})}
  for(const o of OBS[R]||[])opts.push({id:'o_'+o.id,t:`Look closely at the ${o.name}`,s:G.obs&&G.obs[R+':'+o.id]?'Look again: things change as the night goes on.':'Notice what is there, and what isn\'t.',c:`${o.mins} min`,i:I.look,f:()=>{if(r)look3(view3(r,o.view));act(()=>observe(G,o),'examine')}});
  if(R==='boiler')opts.push({id:'radio',t:'Repair the radio',s:G.radio?'Already working. The police are coming.':'Call the police. They arrive on a clock, ready or not.',c:'30 min<br><em>Wits roll</em>',i:I.radio,dim:G.radio,f:()=>{if(r)look3(r.views.radio);act(()=>repair(G),'search')}});
  optSheet(`Look around the ${ROOMS[R].n.toLowerCase()}`,'Tap things in the room, or pick one here. Dawn is at '+fmtT(G.R.dawn)+'.',opts)}
function speech(sid,text){$('.speech')?.remove();const el=document.createElement('div');el.className='speech s3';el.innerHTML=`<b>${G.M.sus.find(s=>s.id===sid).n}</b>${text.replace(/^"|"$/g,'')}`;$('#view').appendChild(el);setTimeout(()=>el.remove(),6000)}
function people3(){const box=$('#ppl3');if(!box)return;const here=npcsIn(G,G.room);const many=here.length>3;box.classList.toggle('many',many);box.innerHTML=here.map(s=>`<button data-p3="${s.id}" aria-label="${s.n}" title="${s.n}">${face(s,34)}${many?'':`<span>${short(s.n)}</span>`}</button>`).join('');
  box.querySelectorAll('[data-p3]').forEach(b=>b.onclick=()=>{if(V.intro||V.rolling||V.anim)return;personSheet(G.M.sus.find(x=>x.id===b.dataset.p3))})}
const SCENE={invalidate(){},render(){}};
function setupCanvas(){if(!glInit()){const v=$('#view');if(v)v.innerHTML='<p style="padding:40px 20px;color:#8d99b8">This device could not start 3D rendering.</p>';return}
  const old=$('#sc');if(old&&old!==GL.cv)old.replaceWith(GL.cv);const view=$('#view');
  if(!$('#ppl3'))view.insertAdjacentHTML('beforeend','<div class="ppl3" id="ppl3"></div><button class="back3" id="back3" hidden>Room view</button><div class="veil3" id="veil3"></div>');$('#back3').onclick=()=>wide3();
  if(!GL.ro){GL.ro=new ResizeObserver(()=>size3());GL.ro.observe(view)}else{GL.ro.disconnect();GL.ro.observe(view)}size3();GL.cur=null;GL.shownRoom=null}
function size3(){const v=$('#view');if(!v||!GL.r)return;const b=v.getBoundingClientRect();if(b.width<2)return;V.W=b.width;V.H=b.height;GL.r.setSize(b.width,b.height,false);GL.comp.setSize(b.width,b.height);GL.bloom.resolution.set(b.width,b.height);
  // frame the room in the part of the screen the panel doesn't cover
  const vis=Math.max(200,b.height-(V.uiBottom||230)+150);GL.cam.aspect=b.width/b.height;GL.cam.setViewOffset(b.width,vis,0,0,b.width,b.height);GL.cam.updateProjectionMatrix()}
function enter3(id){const veil=$('#veil3');if(veil)veil.classList.add('on');GL.entering=id;
  setTimeout(()=>{if(!G||GL.entering!==id)return;const prev=GL.cur&&GL.cur.id;evict3([id,prev].filter(Boolean));const r=GL.rooms[id]||build3(id);if(!r)return;GL.cur=r;GL.shownRoom=id;GL.pass.scene=r.scene;GL.cam.far=r.far;GL.cam.updateProjectionMatrix();
    GL.bloom.strength=r.bloom[0];GL.bloom.radius=r.bloom[1];GL.bloom.threshold=r.bloom[2];const w=r.views.wide;GL.p=new THREE.Vector3(...w.p);GL.t=new THREE.Vector3(...w.t);GL.fov=w.fov;GL.to=null;GL.tw=1;GL.close=false;GL.altI=0;GL.altRoom=id;$('#back3').hidden=true;
    GL.dk=G.flags.power_out?1:0;GL.shadowFrames=3;people3();setTimeout(()=>veil&&veil.classList.remove('on'),140)},GL.cur?260:40)}
const _refresh0=refresh;
refresh=function(){_refresh0();if(!GL.r)return;people3();if(GL.shownRoom!==G.room&&GL.entering!==G.room)enter3(G.room);size3()};
function loop(){if(!G||$('#play').hidden){V.running=false;BGM.set('title');return}BGM.set(bgmMode());const raw=Math.min(.5,(performance.now()-(V.lastT||performance.now()))/1000);V.lastT=performance.now();const dt=Math.min(.05,raw);V.t+=dt;
  if(V.anim){V.anim.t+=raw;if(V.anim.t>=V.anim.dur)V.anim=null}V.fade=Math.max(0,V.fade-raw*2);for(const f of V.fx)f.t+=raw;V.fx=V.fx.filter(f=>f.t<1);
  if(GL.r&&GL.cur&&G.room===GL.cur.id){const r=GL.cur,T=THREE;r.age+=raw;if(!r.merged&&r.age>1.1){r.merged=true;try{merge3(r)}catch(e){console.warn(e)}}
    if(GL.tw<1&&GL.to){GL.tw=Math.min(1,GL.tw+raw/.85);const e=GL.tw<.5?4*GL.tw**3:1-Math.pow(-2*GL.tw+2,3)/2;GL.p.lerpVectors(GL.from.p,GL.to.p,e);GL.t.lerpVectors(GL.from.t,GL.to.t,e);GL.fov=GL.from.fov+(GL.to.fov-GL.from.fov)*e}
    GL.cam.position.copy(GL.p);GL.cam.lookAt(GL.t);GL.cam.fov=GL.fov;GL.cam.updateProjectionMatrix();
    const dTo=G.flags.power_out?1:0;GL.dk+=(dTo-GL.dk)*Math.min(1,raw*2);const on=1-GL.dk;
    r.torch.position.copy(GL.cam.position).add(new T.Vector3(.2,-.25,0).applyQuaternion(GL.cam.quaternion));r.torch.intensity=G.flags.power_out&&G.light?1.5*GL.dk:0;
    if(r.R.update)r.R.update(V.t,dt,on,GL.dk);r.ANIM.forEach(f=>f(dt,V.t,on));tick3(r);
    GL.fin.uniforms.exposure.value=r.exp+r.dexp*GL.dk-(G.flags.power_out&&!G.light?.7*GL.dk:0);GL.fin.uniforms.time.value=V.t%10;
    if(GL.shadowFrames>0){GL.r.shadowMap.needsUpdate=true;GL.shadowFrames--}GL.comp.render();
    if(GL.auto&&r.merged){GL.acc+=raw;GL.n++;if(GL.n>=40){const avg=GL.acc/GL.n;GL.acc=0;GL.n=0;if(V.t-GL.lastAdj>2){let s=GL.scale;if(avg>1/42)s=Math.max(.5,s*.82);else if(avg<1/57&&s<1)s=Math.min(1,s*1.15);if(Math.abs(s-GL.scale)>.01){GL.scale=s;GL.lastAdj=V.t;GL.r.setPixelRatio(GL.PR*s);GL.comp.setPixelRatio(GL.PR*s);size3()}}}}}
  requestAnimationFrame(loop)}
/* ---------- careful or quick: the player chooses whether to roll ---------- */
const bonusOf=k=>3*((G.miss||{})[k]||0);
const quickCost=(mins,stat,k,extra)=>{const b=bonusOf(k);return `${mins} min<br><em>${stat} roll${b?` · +${b}`:''}</em>`};
function carefulQuick({careful,quick,cMins,qMins,stat,key,lead,cText,qText,cDo,qDo,done,doneText}){
  if(done)return [{id:'d',t:doneText,s:'',c:'',i:I.look,dim:true,f:()=>{}}];
  if(lead)return [{id:'q',t:quick,s:'You know exactly where to look now.',c:`${qMins} min<br><em>no roll</em>`,i:I.search,f:qDo}];
  return [{id:'c',t:careful,s:cText,c:`${cMins} min<br><em>no roll</em>`,i:I.search,f:cDo},{id:'q',t:quick,s:qText+(bonusOf(key)?' Easier now you\'ve tried once.':''),c:quickCost(qMins,stat,key),i:I.search,f:qDo}]}
function spotSheet(id){const R=G.room,name=SPOTS[R][id],key=R+':'+id,done=G.searched[key],found=G.found&&G.found[key];G.lead=G.lead||{};
  objSheet(name[0].toUpperCase()+name.slice(1),found?'You found something here.':done?'You searched it. Nothing.':G.lead[key]?'There is something here.':'',
    carefulQuick({careful:`Search the ${name} carefully`,quick:`Search the ${name}`,cMins:25,qMins:10,stat:'Wits',key:'search:'+key,lead:G.lead[key]&&!done,done,doneText:found?'Searched. You found something.':'Searched. Nothing here.',
      cText:'Slow and thorough. Whatever is here, you find.',qText:'Quick. You may miss something, but you\'ll know if it\'s there.',cDo:()=>{V.lastSpot=id;act(()=>search(G,id,true),'search')},qDo:()=>{V.lastSpot=id;act(()=>search(G,id,false),'search')}}))}
function bodySheet(){const doc=G.arch==='doctor';objSheet('The body',G.flags.body?'You have seen what there is to see.':`${G.M.victim.n}, face down on the rug.`,
  G.flags.body?[{id:'d',t:'Examined',s:'',c:'',i:I.body,dim:true,f:()=>{}}]:doc?[{id:'q',t:'Examine the body',s:'You read wounds at a glance.',c:'15 min<br><em>no roll</em>',i:I.body,f:()=>act(()=>examine(G,false),'examine')}]:
  carefulQuick({careful:'Examine the body carefully',quick:'Examine the body',cMins:30,qMins:15,stat:'Wits',key:'examine',cText:'Take your time. You will learn what kind of weapon did this.',qText:'A quick look. You will at least see where the wound is.',cDo:()=>act(()=>examine(G,true),'examine'),qDo:()=>act(()=>examine(G,false),'examine')}))}
function radioSheet(){objSheet('The wireless',G.radio?'Working. The police are coming.':'Lid off, valves cold.',G.radio?[{id:'d',t:'Working',s:'',c:'',i:I.radio,dim:true,f:()=>{}}]:
  carefulQuick({careful:'Repair the radio properly',quick:'Try to get it working',cMins:60,qMins:30,stat:'Wits',key:'radio',cText:'An hour with the valves. It will work.',qText:'It might come on, or it might not.',cDo:()=>act(()=>repair(G,true),'search'),qDo:()=>act(()=>repair(G,false),'search')}).map(o=>({...o,i:I.radio})))}
function tap3(e){if(!G||G.over||V.intro||V.rolling||V.anim||$('#sheet'))return;const r=GL.cur;if(!r)return;const b=GL.cv.getBoundingClientRect();
  const v=new THREE.Vector2((e.clientX-b.left)/b.width*2-1,-(e.clientY-b.top)/b.height*2+1);GL.ray.setFromCamera(v,GL.cam);r.hits.forEach(h=>{h.visible=true;h.updateMatrixWorld()});
  const all=GL.ray.intersectObjects(r.hits,false);let hit=all[0];if(all.length>1){let best=1e9;for(const h of all){const d=GL.ray.ray.distanceSqToPoint(h.object.position)/h.object.scale.x;if(d<best){best=d;hit=h}}}r.hits.forEach(h=>h.visible=false);
  const rip=document.createElement('i');rip.className='rip3';rip.style.left=(e.clientX-b.left)+'px';rip.style.top=(e.clientY-b.top)+'px';$('#view').appendChild(rip);setTimeout(()=>rip.remove(),600);
  if(!hit)return;const u=hit.object.userData;look3(u.view);SND.click();
  if(u.tap==='body')return bodySheet();if(u.tap==='radio')return radioSheet();if(u.tap.startsWith('spot:'))return spotSheet(u.tap.slice(5));
  if(u.tap.startsWith('obs:')){const o=(OBS[G.room]||[]).find(x=>x.id===u.tap.slice(4));if(o)obsSheet(o)}}
function lookSheet(){if(V.intro||V.rolling)return;const R=G.room,r=GL.cur;const opts=[];const go=v=>{if(r&&v)look3(view3(r,v))};
  if(R==='study')opts.push({id:'body',t:'The body',s:G.flags.body?'Examined.':'Examine it, carefully or quickly.',c:'→',i:I.body,f:()=>{look3(BODY3);setTimeout(bodySheet,60)}});
  for(const [id,name] of Object.entries(SPOTS[R])){const key=R+':'+id,done=G.searched[key],found=G.found&&G.found[key];opts.push({id:'s_'+id,t:name[0].toUpperCase()+name.slice(1),s:found?'You found something here.':done?'Searched. Nothing.':(G.lead||{})[key]?'There is something here.':'Search it, carefully or quickly.',c:'→',i:I.search,dim:!!done,f:()=>{go((SPOT3[R]||{})[id]);setTimeout(()=>spotSheet(id),60)}})}
  for(const o of OBS[R]||[])opts.push({id:'o_'+o.id,t:`Look closely at the ${o.name}`,s:G.obs&&G.obs[R+':'+o.id]?'Look again: things change as the night goes on.':'Notice what is there, and what isn\'t.',c:`${o.mins} min`,i:I.look,f:()=>{go(o.view);act(()=>observe(G,o),'examine')}});
  if(R==='boiler')opts.push({id:'radio',t:'The wireless',s:G.radio?'Working. The police are coming.':'Repair it, carefully or quickly.',c:'→',i:I.radio,f:()=>{go('radio');setTimeout(radioSheet,60)}});
  optSheet(`Look around the ${ROOMS[R].n.toLowerCase()}`,'Tap things in the room, or pick one here. Dawn is at '+fmtT(G.R.dawn)+'.',opts)}
function personSheet(p){const st=G.stmts[p.id]||{};const M=G.M;const statement=st.alibi?`"${ROOMS[st.room].n}${st.with&&st.with.length?', with '+st.with.map(id=>M.sus.find(x=>x.id===id).n).join(' and '):', alone'}."`:'';
  const pro=p.n.split(' ')[0]==='Dr.'||p.n.split(' ')[0]==='Mrs.'?'them':/Harriet|Iris|Nell|Agnes|Marguerite/.test(p.n)?'her':'him';const pb=bonusOf('press:'+p.id),wb=bonusOf('warn:'+p.id);
  const careful=fn=>()=>act(()=>{G._careful=true;try{fn()}finally{G._careful=false}},'talk',p.id);
  const opts=[
   {id:'ask',t:'Ask about 9:40',s:st.alibi?`Done. ${statement}`:'Where were they when it happened, and with whom.',c:st.alibi?'':'10 min',i:I.talk,dim:!!st.alibi,f:()=>act(()=>talk(G,p.id),'talk',p.id)},
   {id:'pressc',t:`Take your time with ${pro}`,s:st.alibi?'No roll. Sit down with them until they say more.':'Get their alibi first.',c:'25 min<br><em>no roll</em>',i:I.talk,dim:!st.alibi,f:careful(()=>talk(G,p.id))},
   {id:'press',t:`Press ${pro}`,s:st.alibi?'Quick. If it doesn\'t work, how they react still tells you something.'+(pb?' Easier now you\'ve tried once.':''):'Get their alibi first.',c:`10 min<br><em>Charm roll${pb?` · +${pb}`:''}</em>`,i:I.warn,dim:!st.alibi,f:()=>act(()=>talk(G,p.id),'talk',p.id)},
   {id:'warnc',t:'Make sure they lock their door',s:G.warned[p.id]?'Done. They are locked in upstairs.':st.saw?'No roll. Stay with them until they do it.':'Only matters once they have told you something.',c:'15 min<br><em>no roll</em>',i:I.lock,dim:!st.saw||!!G.warned[p.id],f:()=>act(()=>warn(G,p.id,true),'talk',p.id)},
   {id:'warn',t:'Tell them to lock their door',s:G.warned[p.id]?'Done.':st.saw?'Quick. They may laugh it off.'+(wb?' Easier now.':''):'Only matters once they have told you something.',c:`5 min<br><em>Charm roll${wb?` · +${wb}`:''}</em>`,i:I.lock,dim:!st.saw||!!G.warned[p.id],f:()=>act(()=>warn(G,p.id,false),'talk',p.id)}];
  closeSheet();$('#play').insertAdjacentHTML('beforeend',`<div class="scrim" id="scrim"></div><div class="sheet opts" id="sheet"><div class="grab"></div><div class="person">${face(p,52)}<div><b>${p.n}</b><small>${p.role} · ${p.height}, ${p.coat} coat</small><span class="tag">${st.alibi?(st.saw?'Witness · talked':st.truth?'Admitted a lie':'Alibi given'):'Not questioned'}${G.ev.some(e=>e.id==='contra_'+p.id)?' · contradicted':''}</span></div></div>${opts.map(optRow).join('')}<button class="btn ghost" id="cl">Back to the room</button></div>`);
  $('#scrim').onclick=closeSheet;$('#cl').onclick=closeSheet;document.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const o=opts.find(x=>x.id===b.dataset.o);if(o&&!o.dim){closeSheet();o.f()}})}
