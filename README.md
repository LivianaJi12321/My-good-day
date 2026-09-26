# My Good Day

When someone presses the red button on the cat machine, the experience should surprise them with three small ideas that make their day feel a little different.

## My Idea

My idea for this project is to turn self-care into a gacha experience. Many days can feel like we are repeating the same routine. I wanted to make a web page that helps people discover unexpected things to do, so each day can have a little fun and meaning instead of feeling exactly like the day before.

A gacha machine fits this idea because of its unpredictability. You never know which capsule will come out, so choosing something to do feels like a small surprise instead of another decision or obligation. I wanted the experience to feel welcoming to people of different ages, with a playful appearance and simple interactions.

The center of the web page is a retro, low-poly glass cat machine, inspired by the visual style of PS1/PS2-era game figures. Its soft colors, moving capsules, and gentle sounds make a small act of self-care feel like play.

## How to Run

### Play online

**[Play My Good Day online](https://my-good-day.xj2365.chatgpt.site)**

Open the link in your browser on a computer or phone. No installation or local server is needed. Your diary stays in the browser you use to play.

### How to play

1. **Choose a capsule type if you like.** Green **Just me** capsules suggest solo activities. Orange **With others** capsules suggest ways to connect. **A little of each** gives a mix of solo and shared ideas. Leave all options unselected for a surprise color, or tap a selected option again to clear it.
2. **Tap the red button on the cat machine.** Watch it shake, turn its crank, and release a capsule. Keyboard users can focus the button with Tab and press Enter or Space.
3. **Explore three little possibilities.** The web page selects from 228 ideas. Choose one that catches your eye, or spin again. It avoids repeating the immediately previous suggestions when possible.
4. **Try the activity whenever you are ready.** Check **“I did it!”** before saving. You can add one or more photos and use **“Jot down ideas”** for anything you feel like noting down. Both are optional.
5. **Keep your moment in My Good Day Diary.** Entries include the save date and time, newest first. You can revisit or delete them whenever you like.

Sound can be switched on or off. Reduced-motion preferences are supported. There are no streaks or missed-day warnings.

### For developers

Playing the published web page does not require these steps. To edit or run the source locally, use Node.js 20.19+ or 22.12+ and pnpm. Run these commands from the repository root:

```sh
pnpm install
pnpm dev
```

Open the URL printed by Vite, normally `http://127.0.0.1:5173/`. That address is only a local preview and requires the development server to remain running.

```sh
pnpm test       # Check task-selection behavior
pnpm build      # Create the static build in code/dist/
pnpm preview    # Preview the production build locally
```

## AI Tools and Selected Prompts

I used Codex for most of the development and revisions. I described my ideas in natural language, including the UI, user experience, functions, and technology choices. I also supplied a low-poly style reference and gave feedback after trying different versions.

The following prompts are shortened summaries of requests from my development process, rather than exact transcripts:

- **Initial idea:** Build a self-care gacha web page with a low-poly glass cat machine. Each spin reveals three small energy tasks, and users can save completed moments with photos and notes.
- **Sound and feedback:** Add sounds when users press the button, the machine spins, and capsules roll out.
- **A pressure-free experience:** Change “My Reflection” to “Jot down ideas.” Keep the writing area optional and avoid specific reflection questions.
- **Surprise with a small choice:** Keep the unpredictability of gacha, but allow users to choose solo activities, activities with others, or a mix.
- **Interaction:** Make the machine and its red button larger, and remove the separate “Give me a little good” button so users interact with the machine itself.
- **Clarity after feedback:** Rename “Both” to “A little of each,” add short instructions, and change the shared capsule color from blue to orange so it stands out from the blue machine.
- **Simplifying photos:** Replace repeated upload controls with one “Add a photo” button that accepts multiple images.

Codex translated these requests into HTML, CSS, JavaScript, and Three.js code. I guided the design through decisions about the mood, wording, colors, and interaction, and chose which suggestions to accept or reject.

## Reflection

Some parts matched my expectations and some did not. At first, I thought that if my description was detailed enough, I would not need many changes. This project showed me that a detailed prompt is only a starting point. I still needed to try the experience, notice what felt unclear, and explain what I wanted to change.One mistake I noticed was relying on assumptions. My first description did not include audio because I assumed Codex would generate it automatically. When I later asked for audio, Codex also added a sound on/off option that I had not specifically requested. The option lets people choose a quieter experience, but it reminded me to review both missing details and unexpected additions.

When I thought the web page was nearly finished, I asked Codex for suggestions based on my design goals and intended users. That conversation helped me see more opportunities to improve it. One suggestion that stood out was the wording “Save this moment,” because it frames even a small activity as something worth remembering. Although the current button still says “Save my little good,” that suggestion helped me think more carefully about how wording can make an experience feel meaningful rather than like another task.
One suggestion I did not accept was adding context filters, such as time available, staying indoors, or wanting something new. I felt that unpredictability is the heart of a gacha machine. Too many conditions could turn it into an ordinary search tool. However, I kept a useful part of the suggestion by letting users optionally choose a capsule type. Choosing a capsule color feels like part of the play rather than filling out a form. Feedback from a friend taught me something I had not noticed myself. He found “Both” confusing and wondered how an activity could be done alone and with others at the same time. Based on that feedback, I renamed it “A little of each” and added the explanation “Solo and shared ideas in one spin.” I also changed the shared capsules from blue to orange because the blue was too similar to the machine.
Other revisions focused on reducing pressure and repetition. “Jot down ideas” felt more open-ended than “My Reflection.” A single photo button was clearer than several overlapping upload controls. Short instructions made the next action easier to understand without requiring a full tutorial.

Throughout the process, AI helped me turn my ideas into working code and offered possibilities I had not considered. But I still needed to decide whether those suggestions supported the experience I wanted. My biggest lesson was that making a meaningful web page depends on more than generating features: it requires questioning assumptions, listening to other people, and revising small details with a clear purpose.

## Testing and Remaining Limitations

Automated tests check that every task is unique and complete, each spin shows three different suggestions, back-to-back spins avoid repeats, and each capsule type returns the right kind of activity. The interface was revised based on hands-on testing and a friend's feedback on the "Both" label. This is not yet a full usability study: more testing on different phones, with keyboard users, and with different photo formats is still needed.

The diary is saved only in the visitor's browser. It does not sync across devices, and clearing browser data deletes it. Photos are limited to 15 MB each and resized before saving. The 3D machine needs WebGL, but a fallback button still lets users get tasks if it cannot load.

## Project Structure

```text
my-good-day/
├── code/
│   ├── index.html          # Page structure and dialogs
│   ├── src/                # Web page, 3D model, sounds, tasks, storage, styles
│   ├── tests/              # Task-selection tests
│   └── dist/               # Generated build; ignored by Git
├── docs/
│   ├── Design.md           # Product brief and design decisions
│   └── development.md      # Source map and development workflow
├── skills/my-good-day/    # Reusable Codex project guidance
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

See the [design brief](docs/Design.md), [development notes](docs/development.md), and [contribution guide](CONTRIBUTING.md). The reusable skill is in [skills/my-good-day/SKILL.md](skills/my-good-day/SKILL.md).

## License and Credits

Original source, procedural geometry, and synthesized sound effects are released under the [MIT License](LICENSE). The web page uses Three.js and Vite, which are MIT licensed. DM Sans and Outfit are served through Google Fonts under the SIL Open Font License; no diary content is sent to that service.

The supplied low-poly image was used as a style reference, not as a distributed web page asset. No third-party character models or textures are included. The Desktop project copy keeps the personal reference separately in `references/`; that image is excluded from Git because redistribution rights have not been established.
