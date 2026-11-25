# Design Reference — Figma source of truth

This document records the approved visual direction and the actual Figma artifacts created so far. It is a map for implementation, not a claim that every screen is already implemented in React.

## Figma file

**Rudra — A Life in Progress | Design System & Website**

https://www.figma.com/design/cyGeaA8Uzaq3xCpopWm4ch

The file has three pages (Figma Starter workspace limit at the time of creation):

1. **00 — Foundations**
2. **01 — Public Archive**
3. **02 — Stories, Collections & Studio**

### Direct screen references

| Screen | Figma reference |
|---|---|
| Desktop public home | [Open frame 4:3](https://www.figma.com/design/cyGeaA8Uzaq3xCpopWm4ch?node-id=4-3) |
| Field Notes index | [Open frame 6:3](https://www.figma.com/design/cyGeaA8Uzaq3xCpopWm4ch?node-id=6-3) |
| Field Note detail | [Open frame 6:114](https://www.figma.com/design/cyGeaA8Uzaq3xCpopWm4ch?node-id=6-114) |
| Private Studio overview | [Open frame 9:2](https://www.figma.com/design/cyGeaA8Uzaq3xCpopWm4ch?node-id=9-2) |
| New Field Note editor | [Open frame 9:170](https://www.figma.com/design/cyGeaA8Uzaq3xCpopWm4ch?node-id=9-170) |
| Mobile public home | [Open frame 10:82](https://www.figma.com/design/cyGeaA8Uzaq3xCpopWm4ch?node-id=10-82) |
| Mobile New Field Note | [Open frame 10:124](https://www.figma.com/design/cyGeaA8Uzaq3xCpopWm4ch?node-id=10-124) |

The design source itself remains in Figma. This repository contains links and implementation notes; the Figma file and all of its original editable layers/assets have **not** been exported into this repo.

## Foundations and tokens

### Color

| Token / purpose | Value |
|---|---|
| Paper background | #F3F1E9 |
| Deep paper / surface | #E9E5D9 |
| Forest | #1E3028 |
| Sage | #DCE1D4 |
| Primary ink | #202820 |
| Secondary ink | #566056 |
| Border | #D5D3C8 |
| Clay accent | #A85F43 |
| Muted green | #708B65 |
| White | #FFFFFF |

### Typography

- **Instrument Serif:** display headlines and editorial accent italics.
- **DM Sans:** body copy and interface text.
- **DM Mono:** small labels, numbers, timestamps and metadata.

The existing index.html loads these Google Fonts. src/styles.css defines matching CSS custom properties.

### Spacing

The Figma spacing scale uses 4-point increments. Named values created in the foundations collection include 4, 8, 12, 16, 24, 32, 48, 64 and 80 px.

### Radius and elevation

Radius tokens include 0, 4, 8, 14 px and pill radius. A soft elevation style exists for restrained use. The design generally favors thin borders and paper/ink contrast over heavy shadows.

## What each design area contains

### 00 — Foundations

- Color variables and core design tokens.
- Typography styles.
- Spacing and radius tokens.
- A soft shadow style.
- This page is a token source; it is not currently a fully composed visual style-guide presentation.

### 01 — Public Archive

Desktop public home (frame 4:3) includes:

- Editorial left rail and index navigation.
- Hero headline: “A life, in progress.”
- Current-chapter note.
- Asymmetric visual/photo composition.
- Workroom/project cards.
- Field Notes section.
- Collection previews.
- About and footer.

A reusable Project Card component was created on this page and used for the home grid. Some content and artwork are still placeholders.

### 02 — Stories, Collections & Studio

- Field Notes index (6:3): featured entry, recent notes and editorial metadata.
- Field Note detail (6:114): cover, narrative, location/collection metadata and gallery.
- Private Studio overview (9:2): dashboard sidebar, stats, quick actions, recent activity and memory-vault panel.
- New Field Note editor (9:170): metadata, story editor, upload area, visibility controls, tags, cover and draft/publish actions.
- Mobile public home (10:82).
- Mobile New Field Note editor (10:124).

The Studio frames are design compositions only. There is no live Studio, authentication or content persistence in the current React implementation.

## Important Figma canvas cleanup

The following desktop frames were recorded at overlapping canvas positions on page 02:

| Frame | Position | Size |
|---|---:|---:|
| Field Notes index — 6:3 | x=60, y=60 | 1440 × 1720 |
| Studio overview — 9:2 | x=60, y=60 | 1450 × 1450 |
| Field Note detail — 6:114 | x=1620, y=60 | 1440 × 1720 |
| New Field Note — 9:170 | x=1670, y=60 | 1450 × 1450 |
| Mobile public home — 10:82 | x=3240, y=60 | 430 × 1540 |
| Mobile New Field Note — 10:124 | x=3740, y=60 | 430 × 1450 |

**Required cleanup:** move the Studio overview so it no longer overlaps the Field Notes index, and move the New Field Note editor so it no longer overlaps the Field Note detail. Preserve each frame's contents and dimensions. The mobile frames are already to the right of the desktop compositions.

The page 02 layout was not fully visually re-audited during this handoff because the Figma MCP tool-call allowance had been reached. Open each frame by its direct link and inspect it in the Figma editor before using canvas-level screenshots or exports. Do not assume the current canvas arrangement is polished.

## Implementation guidance

- Use Figma as the reference for the already approved screens.
- Google Stitch may be used from Antigravity to create or explore missing screens, especially other content types and Studio states. Treat Stitch output as an extension of the approved design, not a replacement for it.
- Keep all new screens on the paper/forest/clay palette and the same typography system.
- Prefer responsive layout primitives over pixel-positioned desktop-only implementations.
- Use the exact project/photography assets only when they are truly available in the repository or approved by the owner.
- The Figma screen compositions contain placeholder imagery and sample text in places; replace those with accurate content and real owner-approved assets before launch.
- When a design is materially changed in Stitch, update this document with the resulting source link or add a dedicated design-reference page to the repo.

## Design QA checklist

- [ ] Desktop public home matches the approved editorial direction.
- [ ] Public screens have responsive mobile layouts.
- [ ] Studio feels like the private side of the same archive, not a different product.
- [ ] Typography hierarchy and spacing remain consistent.
- [ ] Placeholder content is clearly marked until replaced.
- [ ] Page 02 frame overlap is fixed in Figma.
- [ ] Focus states, contrast and reduced-motion behavior are checked.
- [ ] Image crops, aspect ratios and alt text are intentional.
