---
name: my-good-day
description: Build or extend the My Good Day self-care capsule machine app, including its low-poly Three.js cat, energy-task flow, and private diary. Use for work on this product or an explicitly requested recreation.
---

# My Good Day

Maintain a gentle, playful experience: spin a glass cat capsule machine, choose one of three small energy tasks, and save a completed moment in a diary.

When working in the project, read its `docs/Design.md` for the product brief and `README.md` for setup and storage decisions. Keep Three.js modeling in `code/src/machine.js`, task definitions and selection in `code/src/tasks.js`, persistence in `code/src/storage.js`, interactions in `code/src/main.js`, and styling in `code/src/style.css`.

Preserve these product invariants unless the user changes them:

- Each spin selects three distinct tasks from the 228-task collection, avoiding the immediately preceding suggestions where possible. Green “Just me” uses solo tasks; orange “With others” uses shared tasks; “A little of each” guarantees a mix. With no selection, randomly choose either capsule type. Tapping a selected option clears it.
- The cat has angular ears, a translucent capsule-filled head, a star eye, an omega-shaped mouth, blush, paws, tail, a side crank, and a red button. Favor faceted retro geometry and pastel blue, yellow, and pink against pale yellow.
- The animation presses the button, turns the crank, shakes the capsules, and dispenses an opening capsule. Block overlapping spins and honor reduced motion.
- The large red button on the machine is the primary spin control, with a native hit target aligned to it. Do not restore the separate “Give me a little good” button. Enter and Space activate the focused native spin control. Keep all task and diary interactions keyboard-accessible.
- Saving requires “I did it!”; “Jot down ideas” and photos remain optional. Do not add specific reflection questions or context filters. Use a single “Add a photo” control supporting multiple attachments and individual removal. Prevent saving while photos are processing; retain compatibility with older single-photo entries.
- Diary entries retain save timestamps, appear newest first, and can be deleted. Store user text as text, never HTML.
- Diary and photo data remain browser-local unless the user requests another storage model. Explain persistence and deletion limitations. Never bundle personal data or reference images without redistribution rights.

For validation, run the project's task tests and production build. When changing flows, check the affected behavior in a browser, including an appropriate narrow-screen or keyboard case. When delivering a recreation, include editable task data and setup documentation; use original procedural geometry rather than copying reference characters.
