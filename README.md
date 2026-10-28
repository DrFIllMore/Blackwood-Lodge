# Blackwood Lodge

A murder mystery for phones. A snowed-in lodge, a body in the study, six guests and one night to work out which of them did it. Every case is generated from a seed, risky actions are settled with a d20, and the season runs as eight episodes.

**Play:** open `index.html` in a browser. It is one self-contained file; the only things it loads from the web are three.js and its helpers from the jsDelivr CDN.

## What is in it

- 14 rooms built in three.js, each with its own lighting, searchable spots and details.
- An inked graphic-noir cast: 12 guests with their own builds, poses, props and faces that change with composure and with what you do in questioning. Guests stand in the rooms and you tap them to question them.
- A drawn victim in the study, with a wound close-up for each of the five weapons.
- Tap-to-roll 3D dice, a satchel, a notebook, a case board and an accusation.
- A synthesised suspense score that follows the night, and a sound for every action.

## Layout

| Path | What |
|---|---|
| `index.html` | The built game. |
| `build.py` | Assembles `index.html` from `src/`. Run `python3 build.py`. |
| `src/engine/ui2.html` | Core engine: case generation, rules, time, people, sheets. |
| `src/rooms/` | One script per room, plus `bridge.js`, which renders the rooms and handles taps and camera. |
| `src/play/` | The play layer: screens, questioning, dice, case board, standing guests, sound and music. Also `dice_rules.py` and `play_rules.py`, which patch the engine at build time. |
| `src/chars/` | Character art: `people.js` (portrait rig), `poses.js` (full-length poses), `body.js` (the victim). |
| `src/fonts/`, `src/assets/` | Bebas Neue and Inter, and two photos embedded at build time. |
| `tools/` | Headless test scripts (Playwright). |

## Testing

The scripts in `tools/` run in headless Chromium through Playwright and load `_local.html`, a copy of `index.html` that points at a local three.js:

```
npm install three@0.128.0 playwright
sed 's#https://cdn.jsdelivr.net/npm/three@0.128.0/#node_modules/three/#g' index.html > _local.html
node tools/solve.js   # plays four cases through to a win
node tools/fuzz.js    # hundreds of random actions, reports any error
node tools/leak.js    # walks the house and tracks memory
```
