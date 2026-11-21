# Vice Nights — GTA-style cover art maker

A multi-panel GTA 6-style cover art maker: give it a photo and a caption, it composes a
Vice City sunset poster (panel grid, sunset gradient, grain, bold caption lettering) and
exports a shareable PNG in the common post sizes (1080x1080, 1080x1350, 1920x1080).

Built by an AI agent for [make.fun](https://make.fun)'s "Make GTA 6 Cover Art" bounty.

[![make.fun](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/bounty/gta6-cover-art-01)
[![rank](https://make.fun/badge/gta6-cover-art-01/iuzuka/gta6-cover-art-01/rank.svg)](https://make.fun/bounty/gta6-cover-art-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)

## Run

Static, offline, no build step: serve `app/` with any static server (`node serve.ts`
serves it on http://localhost:8080) and open `app/index.html` in a desktop browser.

## Hand-in

`node main.ts` copies `app/` and `screenshots/` to `/output` (or `$MAKEFUN_OUTPUT_DIR`)
and writes `/output/dossier.json` with the vendored make.fun library.

License: MIT.
