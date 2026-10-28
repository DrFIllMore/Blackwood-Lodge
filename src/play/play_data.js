/* ---------- PLAY CONTENT: what the narrator says, and the ways to go at each thing ---------- */
ROOMS.lobby.n='Front hall';ROOMS.stairs.n='Landing';ROOMS.dining.n='Dining room';ROOMS.r1.n='Blue room';ROOMS.r2.n='Twin room';ROOMS.r3.n='Eaves room';
/* every search spot: what kind of thing it is (decides the approaches) and what you see when you look at it */
const SPOTX={
 'lobby:coatstand':{k:'soft',d:'Six coats on brass hooks, heavy with melted snow.'},
 'lobby:umbrella':{k:'low',d:'A brass umbrella stand: three umbrellas, a walking cane, and meltwater pooled in the bottom.'},
 'lobby:clock':{k:'container',d:'The grandfather clock. Its long case has a small door, and the key is still in it.'},
 'porch:drift':{k:'dig',d:'Snow banked against the steps and already crusted over. Anything dropped here is buried by now.'},
 'porch:bracket':{k:'heavy',d:'Split logs stacked under the eaves, and an empty lantern bracket above them.'},
 'lounge:sofa':{k:'surface',d:'A low table between the sofas: an ashtray, a hand of cards laid down, yesterday\'s newspaper.'},
 'lounge:table':{k:'surface',d:'The drinks trolley. Decanters, a soda siphon, a bucket of ice going to water.'},
 'lounge:grate':{k:'hot',d:'The fire has burned down to a red bed of ash behind the guard.'},
 'lounge:clock':{k:'high',d:'The mantel: candlesticks, a pair of china dogs, a clock, and a line of dust along the back.'},
 'library:chairs':{k:'soft',d:'Two reading chairs, deep and cracked with age, the cushions sunk in the middle.'},
 'library:ladder':{k:'high',d:'The library ladder on its rail, and the top shelf it was built to reach.'},
 'library:lamptable':{k:'container',d:'A writing table under a green lamp. Paper, an inkstand, one shallow drawer.'},
 'study:desk':{k:'locked',d:'The desk. Papers everywhere on top, and a locked drawer at the bottom.'},
 'study:bookcase':{k:'surface',d:'Floor to ceiling, leather and cloth spines, a gap here and there.'},
 'study:rug':{k:'floor',d:'The rug the body lies on, rucked up at one corner.'},
 'dining:sideboard':{k:'container',d:'The sideboard. Silver in baize-lined drawers, table linen in the cupboard below.'},
 'dining:undertable':{k:'low',d:'Under the long table: a forest of chair legs in the dark.'},
 'dining:chairs':{k:'surface',d:'The head of the table, where the host sat. His napkin is still folded.'},
 'kitchen:range':{k:'hot',d:'The range, still warm, a kettle pushed to the back of the hob.'},
 'kitchen:worktable':{k:'surface',d:'A scrubbed worktable, flour in the grain of the wood, a bowl of eggs.'},
 'kitchen:counter':{k:'surface',d:'The side counter: tins, a bread crock, and a box of matches by the lamp.'},
 'cellar:rack':{k:'surface',d:'Racks of bottles, dust on every neck but a few.'},
 'cellar:barrels':{k:'heavy',d:'Old barrels stacked two high, their hoops gone to rust.'},
 'cellar:crate':{k:'container',d:'A packing crate, nailed shut once and prised open since.'},
 'boiler:bench':{k:'surface',d:'A workbench under a hanging bulb: a vice, an oilcan, screws and a screwdriver.'},
 'boiler:tank':{k:'hot',d:'The boiler\'s firebox. The door is shut and the heat breathes through the seams.'},
 'boiler:crates':{k:'dig',d:'The coal bunker, a black slope of coal against the wall.'},
 'stairs:plant':{k:'container',d:'A half-moon side table with one drawer and a vase of dried flowers.'},
 'stairs:lamp':{k:'container',d:'A window seat with a hinged lid, its cushion faded by the sun.'},
 'stairs:banister':{k:'high',d:'The banister, polished by a century of hands, and the flat top of the newel post above it.'},
 'r1:wardrobe':{k:'container',d:'A tall wardrobe, door ajar, a dinner jacket on the hanger.'},
 'r1:desk':{k:'container',d:'A dressing table: brushes, a jewellery tray, hairpins in a saucer.'},
 'r1:bed':{k:'container',d:'A nightstand with a book face down and a glass of water.'},
 'r2:dresser':{k:'container',d:'A chest of drawers under a cracked marble top.'},
 'r2:bed':{k:'low',d:'The narrow gap between the two beds, dark, a slipper under one of them.'},
 'r2:chair':{k:'container',d:'A small desk under the window. Its chair has been knocked over and left.'},
 'r3:trunk':{k:'locked',d:'A pine chest at the foot of the bed, brass-bound and locked.'},
 'r3:bed':{k:'low',d:'Under the beds: dust, dark, and the smell of mothballs.'},
 'r3:grate':{k:'container',d:'A washstand: jug, basin, and a cupboard underneath.'},
 'attic:trunk':{k:'locked',d:'A blue steamer trunk with a heavy hasp.'},
 'attic:sheet':{k:'soft',d:'A chair under a dust sheet.'},
 'attic:form':{k:'heavy',d:'Old trunks and hatboxes stacked against the chimney breast.'}};
/* the ways to go at each kind of thing. A rolled way is quick; a sure way costs time or noise. */
const WAYS={
 container:[{t:'Go through it piece by piece.',stat:'wits',dc:11,mins:10,tag:'read'},{t:'Turn it all out onto the floor.',sure:1,mins:10,loud:1}],
 locked:[{t:'Work the lock, slow and quiet.',stat:'wits',dc:13,mins:10,tag:'lock'},{t:'Wrench it open.',sure:1,mins:5,loud:1,tag:'pry'}],
 surface:[{t:'Run your eye over everything.',stat:'wits',dc:11,mins:10,tag:'read'},{t:'Lift and check every piece.',sure:1,mins:25}],
 high:[{t:'Climb up and feel along the top.',stat:'body',dc:11,mins:10},{t:'Fetch a chair and take your time.',sure:1,mins:25}],
 low:[{t:'Reach into the dark, blind.',stat:'nerve',dc:11,mins:10},{t:'Get down on the floor and look properly.',sure:1,mins:25,tag:'dark'}],
 soft:[{t:'Feel along the seams and under the cushions.',stat:'wits',dc:11,mins:10},{t:'Pull it apart.',sure:1,mins:10,loud:1}],
 hot:[{t:'Rake through it while it\'s hot.',stat:'nerve',dc:11,mins:10},{t:'Let it cool, then sift it.',sure:1,mins:30}],
 heavy:[{t:'Heave it aside.',stat:'body',dc:12,mins:10,tag:'heavy'},{t:'Shift it a piece at a time.',sure:1,mins:25}],
 dig:[{t:'Dig in with your hands.',stat:'body',dc:11,mins:10},{t:'Sift through it slowly.',sure:1,mins:25,tag:'dark'}],
 floor:[{t:'Go over it on your hands and knees.',stat:'wits',dc:11,mins:10,tag:'read'},{t:'Roll it right back.',sure:1,mins:15}]};
/* what a sharp eye notices on walking in, when something is hidden in a thing of that kind */
const TELL={container:n=>`The ${n} has been shut in a hurry. Something inside stops it closing true.`,locked:n=>`Fresh scratches around the lock of the ${n}.`,
 surface:n=>`On the ${n}, one thing sits out of line, as if put down fast.`,high:n=>`A clean stripe in the dust along the top of the ${n}.`,low:n=>`The dust at the mouth of the ${n} is scuffed. Something was pushed in there.`,
 soft:n=>`The ${n} has been disturbed: a seam pulled, a cushion turned the wrong way.`,hot:n=>`The ash in the ${n} has been raked, and recently.`,heavy:n=>`The ${n} has moved. There are fresh marks on the boards.`,
 dig:n=>`The surface of the ${n} has been broken and smoothed over.`,floor:n=>'The rug fringe has been kicked up, as if someone left in a hurry.'};
/* tools: in your bag from the start, or somewhere in the house */
const TOOLS={
 torch:{n:'Torch',tags:['dark'],d:'A battery torch. Only as good as its battery.'},
 lockpicks:{n:'Lockpicks',tags:['lock'],d:'A slim roll of picks and tension wrenches. A detective\'s habit.'},
 scalpel:{n:'Scalpel',tags:['read','body'],d:'From your medical bag. For reading a wound properly.'},
 flask:{n:'Hip flask',tags:['talk','calm'],uses:3,d:'Brandy. It loosens tongues, yours included.'},
 knife:{n:'Service knife',tags:['pry'],d:'You have carried it since the war. Good for prising.'},
 opener:{n:'Letter opener',tags:['lock','pry'],d:'A thin steel blade with a brass grip. Slips a latch nicely.'},
 matches:{n:'Matches',tags:['dark'],uses:3,d:'A box of safety matches. A little light, for a little while.'},
 screwdriver:{n:'Screwdriver',tags:['pry','repair'],d:'From the boiler room bench. Opens things and mends them.'},
 crowbar:{n:'Crowbar',tags:['pry','heavy'],d:'Short and heavy, made for crates.'},
 hairpins:{n:'Hairpins',tags:['lock'],d:'Steel pins from a dressing table. A lock pick, with patience.'},
 brandy:{n:'Brandy',tags:['calm'],uses:1,d:'A medicine bottle of good brandy from the drinks trolley.'},
 magnifier:{n:'Magnifying glass',tags:['read'],d:'A reading glass in a horn handle. Nothing small gets past it.'}};
const KIT={detective:['torch','lockpicks'],doctor:['torch','scalpel'],journalist:['torch','flask'],soldier:['torch','knife']};
const TOOLSPOT={'library:lamptable':'opener','kitchen:counter':'matches','boiler:bench':'screwdriver','cellar:crate':'crowbar','r1:desk':'hairpins','lounge:table':'brandy','stairs:plant':'magnifier'};
const TAGWORD={lock:'picking a lock',pry:'prising things open quietly',read:'close looking',body:'reading a wound',dark:'seeing in the dark, when the power is out',heavy:'shifting heavy things',talk:'getting people to talk',calm:'steadying your nerve',repair:'mending things'};
/* the narrator, walking into each room for the first time */
const OPEN={
 lobby:G=>'The front hall. Coats steaming on the rack, boots in the tray, the guest book open on its stand. The fire in here went out an hour ago.',
 porch:G=>'Cold hits like a slap. The porch lamp is dead, and the road beyond the gate is gone under the snow. Nobody is leaving tonight.',
 lounge:G=>'The lounge. The fire has burned down to a glow, and the room still smells of cigars and somebody\'s scent.',
 library:G=>'The library. Green lamps, the tick of a clock, and a long view down the corridor to the study door.',
 study:G=>{const M=G.M,she=/Margaret|Celia|Rose/.test(M.victim.n);return `The study. ${M.victim.n} lies on the rug where ${she?'she':'he'} fell. The desk lamp is still burning. The room smells of pipe smoke and something burnt.`},
 dining:G=>'The dining room. Dinner was never cleared: candles burned to stubs, and one dessert left untouched.',
 kitchen:G=>'The kitchen. The range ticks as it cools. Somebody has left the cold tap dripping.',
 cellar:G=>'The cellar. Cold stone, the smell of wine and damp, one bulb turning slowly on its cord.',
 boiler:G=>'The boiler room. Heat, and the thud of the pump. On the bench, a wireless set with its lid off.',
 stairs:G=>'The upstairs landing. Bedroom doors, a runner down the middle, and the attic hatch overhead.',
 r1:G=>'A bedroom done in blue. A dinner jacket hangs on the wardrobe door. Nobody has slept in the bed.',
 r2:G=>'A twin room. The desk chair lies on its side, and nobody has picked it up.',
 r3:G=>'A small room under the eaves: a pine chest at the foot of the bed, a washstand, a cold grate.',
 attic:G=>'The attic. Your breath shows. Trunks and sheeted furniture go back into the dark under the roof.'};
/* the house, on the hour */
const NIGHT=[
 G=>({t:'Somewhere above you, a door slams. Then nothing.',nerve:-.5}),
 G=>G.flags.power_out?({t:'Your torch flickers, browns, and comes back.',batt:-5}):({t:'The lights dim to brown, hold, and come back.'}),
 G=>{const s=G.r.pick(G.M.sus.filter(x=>!G.flags['dead_'+x.id]&&G.pos[x.id]&&G.pos[x.id]!==G.room));return s?{t:`Footsteps cross the ${ROOMS[G.pos[s.id]].n.toLowerCase()}. Someone is up and about.`}:{t:'The house creaks as it cools.'}},
 G=>({t:'The grandfather clock in the hall strikes the hour. Every stroke goes right through the house.'}),
 G=>({t:'A draught moves along the floor. Somewhere a window is open that was shut before.',nerve:-.5}),
 G=>{const s=G.r.pick(G.M.sus.filter(x=>!G.flags['dead_'+x.id]&&G.pos[x.id]!==G.room));return s?{t:`Someone passes the doorway. You catch a ${s.coat} sleeve, and they are gone.`,nerve:-.5}:{t:'Nothing. The house holds its breath.'}},
 G=>({t:'The wind drops. In the quiet you hear two voices arguing, too low to make out.'}),
 G=>({t:'Nothing. The house holds its breath.'})];
