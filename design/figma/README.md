# Figma export package

## Source file

[Rudra — A Life in Progress | Design System & Website](https://www.figma.com/design/cyGeaA8Uzaq3xCpopWm4ch)

The native editable Figma source remains in the Figma workspace. This folder is intended for portable exports used by the codebase and Antigravity.

## Current contents

- ../tokens.json — portable color, typography, spacing and radius tokens.
- ../tokens.css — CSS custom-property version of those tokens.

## Pending native Figma export

The Figma MCP read/export allowance for the Starter team has been exhausted, so the original file and its layer assets could not be downloaded through the connected export tool during this task.

To preserve the full editable design (frames, text layers, vector nodes, components and page structure), open the source file in Figma and use:

**Main menu → File → Save local copy**

Figma saves a native .fig file. This is supported on all plans. The local copy does not include version history or comments and, when reimported, Figma treats it as a new file. See [Figma's official instructions](https://help.figma.com/hc/en-us/articles/8403626871063-Save-a-local-copy-of-files).

After saving it, upload the .fig file to the project handoff conversation. It can then be committed here under design/figma/source/. Check its size before committing; use Git LFS if it is too large for normal Git hosting.

## Recommended static exports

In addition to the .fig source, export the following as SVG/PNG from Figma:

- Desktop public home frame (4:3)
- Field Notes index frame (6:3)
- Field Note detail frame (6:114)
- Studio overview frame (9:2)
- New Field Note editor frame (9:170)
- Mobile public home frame (10:82)
- Mobile New Field Note editor frame (10:124)

Store screen previews under design/figma/exports/screens/.

Export reusable vector marks/icons as SVG under design/figma/exports/vectors/, and any intended source images in their original format under design/figma/exports/images/.

Do not use screen PNGs as substitutes for actual editable components in the React application. Use them as visual references only. SVGs and source images should be used as real assets where appropriate.

## Known canvas cleanup

The desktop Studio overview and Field Notes index overlap on Figma page 02. The New Field Note editor and Field Note detail also overlap. See DESIGN_REFERENCE.md before exporting page-level images; export each frame individually until the canvas is reorganized.
