# Toy Story Shooter — handoff notes

## Project

A Roblox third-person shooter set in the Toy Story universe. The player is a
toy. Levels are built at toy-scale, meaning everyday objects (beds, desks,
chairs) are enormous set pieces.

This repo currently contains **only the first build asset**: Andy's twin bed
from the film. No gameplay yet.

## Repo layout

Rojo project. Lift this folder into the repo root.

```
default.project.json                          # Rojo project, paths relative to here
src/ReplicatedStorage/BedBuilder.luau         # Procedural bed builder. Entry: BedBuilder.build(originCF, parent)
src/ServerScriptService/SpawnBed.server.luau  # Spawns one bed at the origin on server start
```

To open in Studio: `rojo serve` then connect from the Roblox Studio Rojo
plugin. The bed appears in `workspace.AndysBed` when the server starts.

## Current state of the bed

- Four-poster frame, square stock, ~16 studs wide x 30 long x ~13 tall.
  Deliberately oversized — a toy-scaled player should feel small next to it.
- Headboard: vertical spindles (square), flat-topped top rail.
- Footboard: same but shorter.
- Mattress: white base, sky-blue top sheet with red trim band.
- Three cloud puffs on the sheet (ball clusters), to evoke the film's bedding.
- Finials: 4-piece turned-wood stack on each post — base ring, drum, neck,
  ball cap. Uses `PartType.Cylinder` for the disks.

## Next improvements, in priority order

1. **Round posts and spindles.** Everything is still square stock — the
   single biggest "blocky kit -> real furniture" change. Use
   `PartType.Cylinder` rotated vertical (same trick as the finial disks).
2. **Arched headboard top.** Andy's headboard has a curved/scalloped top
   rail, not a flat rectangle. Likely a few angled wedge parts or a
   stack of decreasing-width slabs.
3. **Pillow + folded blanket at the foot.** Bare mattress reads as
   "showroom."
4. **Denser cloud pattern on the sheet.** The film's bedding has many
   small repeating clouds, not three big puffs. Probably wants a grid of
   smaller cloud clusters or a texture/decal.

Work through one at a time. Render a preview before claiming done.

## Working style the user prefers

- **One improvement per turn.** Do not bundle multiple upgrades into one
  commit unless explicitly asked.
- **No premature abstraction.** Three similar lines beats a helper that
  saves two. Don't add hypothetical-future config knobs.
- **No backwards-compat shims, no feature flags, no half-implementations.**
  Just change the code.
- **Comments are rare.** Only when WHY is non-obvious. No "what" comments,
  no "added for X" comments.
- **Show, don't tell.** When changing visual output, render a preview
  (matplotlib offscreen render of the parts list works fine — see the
  scratch script approach in the prior session if useful) and surface it
  before declaring success.
- **Brief updates.** One sentence per status update is enough. End-of-turn
  summary: 1-2 sentences max.
- **Confirm before risky/visible actions** (force push, opening PRs,
  destructive git, GitHub comments). Local file edits and commits to the
  feature branch are fine without asking.

## Branch

Working branch in this repo: `claude/toy-story-shooter-game-RXa47`. If you
lift this folder into a new repo, start fresh on `main` or a sensible
feature branch there.
