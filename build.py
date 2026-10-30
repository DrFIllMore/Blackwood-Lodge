import os,re,base64,sys
ROOT=os.path.dirname(os.path.abspath(__file__))+'/'
B=ROOT+'src/'
sys.path.insert(0,B+'play')
src=open(B+'engine/ui2.html').read()
i=src.index('const SPOTS={');j=src.index('};',i)+2
src=src[:i]+"""const SPOTS={lobby:{coatstand:'coat rack',umbrella:'umbrella stand',clock:'grandfather clock'},porch:{drift:'snow by the steps',bracket:'woodpile'},lounge:{sofa:'low table',table:'drinks trolley',grate:'fireplace grate',clock:'mantel'},library:{chairs:'reading chairs',ladder:'ladder shelf',lamptable:'writing table'},study:{desk:'desk',bookcase:'bookcase',rug:'rug'},dining:{sideboard:'sideboard',undertable:'space under the table',chairs:'head of the table'},kitchen:{range:'range',worktable:'worktable',counter:'side counter'},cellar:{rack:'wine rack',barrels:'barrels',crate:'crate'},boiler:{bench:'workbench',tank:'firebox',crates:'coal bunker'},stairs:{plant:'side table',lamp:'window seat',banister:'banister'},r1:{wardrobe:'wardrobe',desk:'dressing table',bed:'nightstand'},r2:{dresser:'chest of drawers',bed:'space between the beds',chair:'desk'},r3:{trunk:'pine chest',bed:'space under the beds',grate:'washstand'},attic:{trunk:'blue trunk',sheet:'sheeted chair',form:'old trunks'}};"""+src[j:]
import dice_rules,play_rules
src=dice_rules.apply(src);src=play_rules.apply(src)

a0=src.index('/* ---------- adaptive score ---------- */');a1=src.index("document.addEventListener('pointerdown',()=>{SND.init();",a0);a1=src.index('\n',a1)
src=src[:a0]+open(B+'play/bgm_suspense.js').read()+src[a1:]
a=src.index('/* ---------- SCENE DRAWING ---------- */');b=src.index('/* ---------- sheets ---------- */')
src=src[:a]+open(B+'rooms/bridge.js').read()+'\n'+src[b:]
# the play layer goes last so its functions win
k=src.index("window.addEventListener('resize',()=>{if(G&&!$('#play').hidden)setupCanvas()});")
src=src[:k]+open(B+'chars/people.js').read()+'\n'+open(B+'chars/poses.js').read()+'\n'+open(B+'chars/figure2.js').read()+'\n'+open(B+'chars/body.js').read()+'\n'+open(B+'chars/items.js').read()+'\n'+open(B+'play/play_data.js').read()+'\n'+open(B+'play/play.js').read()+'\n'+open(B+'play/people_game.js').read()+'\n'+open(B+'play/stand_game.js').read()+'\n'+open(B+'play/nav_game.js').read()+'\n'+open(B+'play/say_game.js').read()+'\n'+open(B+'play/sfx.js').read()+'\n'+open(B+'play/sfx_game.js').read()+'\n'+"window.BUILD3='"+__import__('time').strftime('%Y-%m-%d %H:%M')+"';\n"+open(B+'play/fix_game.js').read()+'\n'+src[k:]
css=''
css3='''
#sc{touch-action:manipulation;cursor:pointer}#hots{display:none!important}
.ppl3{position:absolute;left:10px;top:calc(var(--ui-top,60px) + 6px);z-index:3;display:flex;gap:6px;flex-wrap:wrap;max-width:70%}
.back3{position:absolute;right:10px;top:calc(var(--ui-top,60px) + 6px);z-index:3}
.veil3{position:absolute;inset:0;z-index:2;background:#05060a;opacity:0;pointer-events:none;transition:opacity .25s}.veil3.on{opacity:1}
.rip3{position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;border:1.5px solid #ffffffaa;pointer-events:none;z-index:3;animation:rip3 .55s ease-out forwards}
@keyframes rip3{from{transform:scale(.3);opacity:.9}to{transform:scale(1.6);opacity:0}}
@media (prefers-reduced-motion:reduce){.rip3{animation:none;display:none}}
'''
tx=''.join(f"--img-{n}:url(data:image/jpeg;base64,{base64.b64encode(open(B+'assets/'+n+'_s.jpg','rb').read()).decode()});" for n in ['porch','door'])

F=B+'fonts/'
ff="@font-face{font-family:'Bebas Neue';font-weight:400;font-display:swap;src:url(data:font/woff2;base64,"+base64.b64encode(open(F+'bebas-neue-latin-400-normal.woff2','rb').read()).decode()+") format('woff2')}"
for w in [400,500,600,700,800]:
    ff+="@font-face{font-family:'Inter';font-weight:%d;font-display:swap;src:url(data:font/woff2;base64,%s) format('woff2')}"%(w,base64.b64encode(open(F+'inter-latin-%d-normal.woff2'%w,'rb').read()).decode())
src=src.replace('</style>',ff+css3+':root{'+tx+'}\n'+open(B+'play/play.css').read()+'</style>',1)
src=src.replace('family=Spectral:ital,wght@0,500;0,700;1,500&','family=Spectral:ital,wght@0,500;0,700;1,500&family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&')
CDN='https://cdn.jsdelivr.net/npm/three@0.128.0/'
libs=['build/three.min.js','examples/js/geometries/RoundedBoxGeometry.js','examples/js/shaders/CopyShader.js','examples/js/shaders/LuminosityHighPassShader.js','examples/js/postprocessing/EffectComposer.js','examples/js/postprocessing/RenderPass.js','examples/js/postprocessing/ShaderPass.js','examples/js/postprocessing/UnrealBloomPass.js']
pre=''.join(f'<script src="{CDN}{l}"></script>\n' for l in libs)
pre+='<script>window.ROOM=function(seed,build){(window.__ROOMDEFS||(window.__ROOMDEFS={}))[window.__ROOMNAME]={seed,build}};</script>\n'
for r in ['study','hall','lounge','library','dining','kitchen','cellar','boiler','porch','upstairs','room1','room2','room3','attic']:
    pre+=f"<script>window.__ROOMNAME='{r}';</script>\n<script>\n{open(B+'rooms/'+r+'.js').read()}\n</script>\n"
k=src.index('<script>\n/* BLACKWOOD LODGE engine')
src=src[:k]+pre+src[k:]
if '<meta charset' not in src: src='<meta charset="utf-8">\n'+src
HEAD='''<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
<meta name="theme-color" content="#0c0c0f">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Blackwood">
<link rel="apple-touch-icon" href="icons/icon-180.png">
<link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192.png">
<link rel="manifest" href="manifest.webmanifest">
'''
if 'name="viewport"' not in src: src=src.replace('<meta charset="utf-8">','<meta charset="utf-8">\n'+HEAD,1)
open(ROOT+'index.html','w').write(src);print('built',len(src))
