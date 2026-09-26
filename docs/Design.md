# My Good Day — Design

Updated September 26, 2026.

## Purpose

Turn self-care into a playful gacha experience. Small, unexpected activities can interrupt repetitive routines and give an ordinary day a little fun and meaning. Keep the experience welcoming, low-pressure, and simple for people of different ages.

**[Play My Good Day online](https://my-good-day.xj2365.chatgpt.site)** — no installation required.

## Current experience

1. Optionally choose a capsule type: green **Just me**, orange **With others**, or **A little of each**. Tapping a selected option clears it. Without a selection, the machine randomly chooses a solo or shared capsule with equal probability.
2. Tap the large red button on the cat machine. A native control aligned with the 3D button supports focus, Enter, and Space. There is no separate “Give me a little good” button.
3. Watch the button press, crank turn, machine shake, capsules bounce, and a capsule roll out and open. Gentle synthesized sounds accompany the sequence. Reduced motion uses a brief reveal. Overlapping spins are blocked.
4. Choose from three distinct suggestions drawn from 228 tasks. Solo and shared selections use their respective pools; **A little of each** guarantees both types among its three suggestions. Avoid the immediately preceding suggestions where possible. Users may spin again.
5. Try the activity whenever ready. Check **I did it!** to enable saving. **Jot down ideas** and photos are optional. Do not ask specific reflection questions.
6. Use one **Add a photo** button to select one or multiple images, or add more later. Show removable thumbnails. Each source image is limited to 15 MB and resized to at most 1400 pixels along its longest side. Saving is unavailable during processing.
7. Save the completed moment to **My Good Day Diary**. Display the local weekday, date, and time captured at saving, newest first. Include notes and attached photos when supplied. Support deletion and older single-photo entries.

## Visual direction

The user-supplied style reference informed original procedural geometry: a retro, low-poly glass cat inspired by PS1/PS2-era figures, with angular ears, faceted shapes, and glossy materials. The reference image itself is not included in the app.

The cat has a translucent capsule-filled head, star eye, omega-shaped mouth, pink blush, paws, tail, side crank, and a prominent red button. It sways gently while idle. The larger model and clear button help make direct interaction discoverable.

Keep the machine pastel blue against a soft pale-yellow page. Use green for solo capsules and orange for shared capsules across the model, choice controls, and task cards. Mixed capsules combine green and orange. Labels and pressed states supplement color.

## Language and guidance

- “What kind of little moment?” introduces the optional choices.
- “Solo and shared ideas in one spin” explains **A little of each**.
- “Tap the red button to shake things up!” makes the primary action clear.
- “Pick one that catches your eye—or spin again” explains the reveal.
- “Give it a try whenever you’re ready. Photos and ideas are optional” keeps completion gentle.
- The current save button reads **Save my little good**. “Save this moment” was discussed as an alternative, not implemented.

Use short instructions in context rather than a mandatory tutorial. Do not add time, location, or activity filters: unpredictability is part of the concept. Avoid streaks, missed-day warnings, or other pressure to participate.

## Technology and storage

The app uses HTML, CSS, JavaScript, Three.js, and Vite. Original sounds are synthesized with Web Audio after user interaction. A sound toggle remembers the preference locally; hiding the page stops sounds.

IndexedDB stores entries and photo blobs in the visitor's browser. No account or app backend is required. Diaries do not synchronize across browsers, devices, or origins. Clearing browser data removes them. The public site and local preview have separate diaries. Storage errors keep the form available for retry.

Use native controls, visible focus, responsive layouts, and reduced-motion support. If WebGL initialization fails, a visible red fallback button still allows task selection. Camera availability depends on the device's native image picker.

## Source and distribution

Application code and tests live in `code/`; documentation lives in `docs/`; reusable guidance lives in `skills/my-good-day/`. Root-level package commands manage development. See [development.md](development.md) and [../README.md](../README.md).

Original source, geometry, and audio use the MIT license. Never publish credentials, personal diary content, or reference images without redistribution rights. The Desktop reference is retained separately in `references/` and excluded from Git.

## Validation and limitations

Task tests check complete unique definitions, three distinct choices, avoidance of immediate repeats, and solo/shared/mixed selection. Production builds pass. Iterative user feedback informed the interface; a friend's confusion about “Both” led to “A little of each.”

These checks are not a full usability study. Broader phone, keyboard, photo-format, and assistive-technology testing remains useful. Task counts differ between solo and shared pools, so shared suggestions can recur sooner over repeated visits.
