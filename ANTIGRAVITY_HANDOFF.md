# Antigravity Handoff — Rudra: A Life in Progress

This file is the implementation handoff for the next coding agent. Read it before changing code.

## Owner-approved direction

The owner has reviewed and approved the editorial design direction and authorized implementation to proceed.

**Product:** Rudra — A Life in Progress  
**Repository:** https://github.com/the-Hoeser/portfolio  
**Work branch:** feat/archive-public-v1  
**Design source:** https://www.figma.com/design/cyGeaA8Uzaq3xCpopWm4ch  
**Detailed roadmap:** PROJECT_PLAN.md  
**Design details and frame links:** DESIGN_REFERENCE.md

The owner intends to import this repository into Google Antigravity and use Google Stitch (via MCP, if configured there) to help complete the remaining design work. Keep all implementation and documentation changes in this GitHub repository.

## 1. First actions — do these before building

1. Check out **feat/archive-public-v1**, not main.
2. Read README.md, PROJECT_PLAN.md and DESIGN_REFERENCE.md.
3. Inspect the current repository and preserve the existing React + Vite architecture.
4. Run npm install and npm run build. Report the result accurately. Do not claim a build passed unless it actually runs successfully.
5. Run the app locally and inspect the existing desktop and mobile experience.
6. Inspect the linked Figma file and its existing frames. Resolve the page 02 artboard overlaps documented in DESIGN_REFERENCE.md without changing the visual content unnecessarily.
7. Check that the Stitch MCP server is actually connected and callable in this Antigravity workspace. If it is missing, report the exact connection requirement; do not pretend Stitch was used.

## 2. Product summary

This is a personal archive with two connected experiences:

- **Public Archive:** selected projects, case studies, field notes, collections, achievements and personal context.
- **Private Studio:** an owner-only content management workspace for drafting, editing, uploading, organizing and publishing the archive.

The result should feel like an independent editorial publication, not a template portfolio or generic SaaS dashboard.

The owner is a computer engineering student and builder. Current project content in the source code is starter content only. Confirm project descriptions, statuses, outcomes and public links with the owner before presenting them as verified facts.

## 3. Visual rules — do not drift from these

- Warm paper background (#F3F1E9).
- Deep forest (#1E3028) and primary ink (#202820).
- Restrained clay accent (#A85F43).
- Sage (#DCE1D4), deep paper (#E9E5D9), border (#D5D3C8), secondary ink (#566056).
- Instrument Serif for editorial display.
- DM Sans for body and interface.
- DM Mono for labels, numbers and metadata.
- Asymmetric editorial image compositions, generous whitespace, thin rules and thoughtful crop ratios.
- Keep the Studio visually related to the public archive.
- Preserve the current responsive behavior while improving it.
- Avoid gratuitous gradients, glassmorphism, oversized dashboard cards, generic icon grids and animation overload.

The Figma file is the primary approved design reference for existing screens. Stitch may extend the system for missing screens, but new output must use the same palette, typography, spacing logic and editorial tone. Do not let Stitch create a disconnected second visual identity.

## 4. Current code reality

The repository is a small React 18 + Vite 5 JavaScript project.

- index.html loads Instrument Serif, DM Sans and DM Mono from Google Fonts.
- src/main.jsx contains the current public one-page archive shell, navigation, project filters, search overlay and responsive menu.
- src/styles.css contains the editorial layout, tokens and responsive rules.
- src/content.js contains static starter project and visual-study arrays.
- src/motion.css contains the initial motion layer.
- netlify.toml exists and the README documents Netlify build/publish settings.
- package.json currently has React, React DOM and Vite only.

Current interaction details:

- Desktop side-rail navigation and mobile menu.
- Active section updates using IntersectionObserver.
- Search overlay opens via UI and Cmd/Ctrl+K, but currently searches section destinations only, not the entire archive.
- Project category filters.
- Initial section/card reveal and subtle image hover motion.
- Reduced-motion CSS behavior.

Not implemented yet:

- Supabase client or environment configuration.
- Database schema/migrations.
- Authentication or owner session.
- Studio routes or functional dashboard.
- CRUD/persistence.
- Image/video upload or media library.
- Public/private/unlisted enforcement.
- Real project case-study pages or dedicated note/collection/achievement routes.
- SEO/sitemap and production QA.

Do not mistake Figma Studio compositions or static frontend placeholders for working product features.

## 5. Git status and change policy

The initial motion implementation has been committed to feat/archive-public-v1. Current known head at handoff preparation:

92a3839b09ebd915d1392ab8641d141683dc862d

The main branch remains unchanged by this work.

- Continue on feat/archive-public-v1.
- Commit logical milestones with clear messages.
- Keep secrets, private files, API keys and personal private media out of Git.
- Do not merge into main or deploy production without the owner's explicit approval.
- Keep docs updated when architecture or design decisions change.
- Create a PR when a coherent milestone is ready for owner review.

## 6. Required implementation sequence

Follow the detailed milestones and acceptance criteria in PROJECT_PLAN.md. The order matters:

### A. Reconcile design and complete the public archive

- Fix the overlapping Figma page 02 desktop frames.
- Use Stitch to explore/design missing screens if the MCP server is configured.
- Complete public project case-study detail pages.
- Complete Field Notes index and individual entry detail pages.
- Complete Collections and Achievements pages.
- Complete About/Now content.
- Make search and filters meaningful and ensure every link works.
- Design loading, empty, error and not-found states.
- Keep mobile layouts first-class.

Do not start by rebuilding the entire application. Work screen-by-screen and reuse existing components and styles.

### B. Implement the backend and security

Use Supabase Postgres, Auth, RLS and Storage. Read current Supabase documentation before implementing because APIs and limits change.

- Single owner only for v1.
- No public user registration.
- Public visitors can read only published public items, plus unlisted direct-link content only if implemented deliberately.
- Owner can manage their own records.
- Enable RLS on every exposed table.
- Owner policies must verify auth.uid() equals owner_id.
- Never expose service_role/secret keys in browser code.
- Commit SQL migrations and test them with owner and anonymous sessions.

### C. Implement the Studio

Studio areas: Overview, New Entry, Field Notes, Projects, Achievements, Media Library, Collections, Drafts and Settings.

The Studio must let the owner create, edit, delete/archive, preview, reorder and publish content without code edits.

Field Note editor needs title, date, type, optional place, collection, story/caption, tags, multi-photo/video upload, reordering, visibility and draft/publish actions.

### D. Implement media pipeline

- Preserve originals in a private bucket.
- Only generate public derivatives for explicitly public content.
- Add multi-file uploads, progress, cancellation, retry and reorder.
- Use resumable uploads for larger files (TUS; Supabase recommends it for files above 6 MB).
- Optimize image derivatives; generate video posters.
- Strip GPS/EXIF from public derivatives unless owner intentionally opts in.
- Avoid autoplay with sound.
- Add backup/export procedures.

### E. Personal assets and final motion

Wait until the structure and asset pipeline are ready before asking the owner for/adding their real media.

The owner should provide selected personal photos/videos, project screenshots and certificates. Replace temporary stock/visual-study imagery and label all sample content clearly until then.

After real assets and final layouts are in place, refine motion: hero entrance, scroll reveals, gallery/lightbox interactions, page transitions only where useful, and Studio/upload feedback. Respect reduced-motion preferences and mobile performance.

### F. QA and launch

- Clean install and production build.
- Responsive checks at mobile/tablet/desktop widths.
- Keyboard and reduced-motion checks.
- Anonymous versus owner authorization tests.
- RLS and storage policy tests.
- Upload interruption/retry tests.
- SEO metadata, Open Graph, sitemap and robots.
- Netlify preview deployment and environment configuration.
- Database/media backup and restore test.

## 7. Stitch usage guidance

If Stitch MCP is connected:

1. Inspect the approved Figma screens and design system first.
2. Use Stitch to generate only missing screens or explore a better implementation of an agreed screen.
3. Do not blindly import generated output. Review it against the current design reference and accessibility requirements.
4. Export/download relevant code/assets into this repository using supported tools.
5. Normalize output into the existing React/Vite architecture; do not introduce a second app or unrelated framework.
6. Record source links and any design decisions in DESIGN_REFERENCE.md.
7. Keep any generated assets that are intended for the public website inside a documented public asset directory. Never commit private personal media.

If Stitch isn't available in the tool list, stop at the design-tool setup boundary and tell the owner what needs connecting. Continue only with work that does not depend on Stitch.

## 8. First milestone to deliver

The first Antigravity milestone should be a verified public-archive implementation checkpoint:

- Build passes locally.
- Existing page is inspected at desktop and mobile sizes.
- Figma page 02 overlap is resolved/documented.
- Public route/component plan is agreed.
- Public home has been aligned to the approved screen.
- Temporary placeholder imagery is explicitly marked.
- A progress note is committed to the repo.
- No backend/security shortcuts are introduced.

Then continue phase-by-phase from PROJECT_PLAN.md.

## 9. Owner communication

The owner will stay involved and return to ChatGPT for planning/review. Provide clear checkpoints with:

- What changed.
- Files changed.
- Commit SHA/branch.
- What was tested and the actual result.
- What is still incomplete or blocked.
- Any owner input needed, asked as one focused question at a time.

Never report a feature as complete because a mockup exists. Never claim tests/builds passed unless they were run. Never publish the owner's private memories or media without explicit permission.
