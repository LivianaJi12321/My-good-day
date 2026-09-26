# Development

Run commands from the repository root with Node.js 20.19+ or 22.12+ and pnpm:

```sh
pnpm install
pnpm dev
pnpm test
pnpm build
pnpm preview
```

The development server uses `http://127.0.0.1:5173/` and fails if that port is
occupied instead of silently selecting another one. Keeping the same origin
preserves access to the browser-local diary. Production preview normally uses
port 4173, which has its own browser storage.

Vite serves `code/` as the web root and builds to `code/dist/`. Thus the HTML
entry's `/src/main.js` URL resolves to `code/src/main.js`; no URL change is
needed when moving the repository on disk. Dependencies and lockfiles are
managed at the repository root.

## Source map

| File in `code/` | Responsibility |
| --- | --- |
| `index.html` | Page structure, native controls, and dialogs |
| `src/main.js` | Spin, task selection, completion form, and diary UI |
| `src/machine.js` | Procedural Three.js model and animation |
| `src/sound.js` | Synthesized sound effects and saved mute preference |
| `src/tasks.js` | Original tasks and nonrepeating random selection |
| `src/extra-tasks.js` | Additional tasks grouped by theme |
| `src/storage.js` | IndexedDB entries and photo processing |
| `src/style.css` | Responsive layout, colors, type, and reduced motion |
| `tests/tasks.test.js` | Task completeness, uniqueness, and spin behavior |

Preserve existing task IDs when updating wording. Append new tasks within
existing groups so their generated IDs remain stable.

## Data and assets

Diary entries and photos live in the browser, not in this repository. Never
check personal content into Git. The model and audio are generated in code;
there are no separate model or sound files to maintain. Add asset folders only
when actual distributable assets are introduced, and record their licenses.

`node_modules/`, `code/dist/`, local package caches, and `.env` files are ignored.
Do not edit generated build output; change source files and rebuild.

## Public web page

[Play My Good Day](https://my-good-day.xj2365.chatgpt.site) without installing anything. Local files do not automatically update this hosted version. Publish a new version after web page changes when requested.

The hosting workspace has `.openai/hosting.json` identifying the existing Site. Its deployment uses root `dist/`, produced with `vite build code --outDir ../dist`; ordinary `pnpm build` still outputs `code/dist/`. Both are generated and ignored by Git. Preserve the existing Site identity when publishing from the hosting workspace.

The Desktop folder is a separate copy, not a synchronized checkout. Its `references/` directory preserves the personal style image. Updating that copy does not move the running preview or change the public web page. Browser diaries are unaffected by documentation or source-folder copies.
