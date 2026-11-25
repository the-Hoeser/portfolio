# Project Plan — Rudra: A Life in Progress

> A personal digital archive: part portfolio, part field journal, part memory collection.

**Status:** Approved direction; implementation in progress  
**Current implementation branch:** \`feat/archive-public-v1\`  
**Default branch:** \`main\`  
**Design reference:** [Rudra — A Life in Progress | Figma](https://www.figma.com/design/cyGeaA8Uzaq3xCpopWm4ch)

---

## 1. Product intent

Build a personal website that works as both:

1. **A public archive** — a carefully curated view of projects, learning, achievements, writing, places and selected memories.
2. **A private Studio** — a secure owner-only workspace for creating, editing, organizing, uploading and publishing archive content without changing source code.

This should feel like an independent editorial publication and a living personal archive, not a conventional developer portfolio and not a generic admin template.

The long-term idea is to document both what is being built and the life happening around it. The archive should be able to grow over years without requiring a redesign every time new material is added.

### Product principles

- **Editorial, not templated:** distinctive typography, deliberate composition, whitespace, quiet metadata and thoughtful image crops.
- **Content first:** projects and memories should be easy to add, revisit and curate.
- **Private by default:** nothing personal is public unless it is explicitly published as public.
- **One-owner workflow:** v1 is a personal archive, not a multi-user SaaS product.
- **No code edits for normal publishing:** the owner should manage content through the Studio.
- **Progressive enhancement:** the site should remain readable and usable with reduced motion, keyboard navigation and on small screens.
- **Honest content:** unfinished projects, drafts and placeholder assets must never be presented as finished work or personal photography.

---

## 2. Approved visual direction

The approved direction is an editorial field journal:

- Warm paper background.
- Deep forest-green ink and panels.
- Restrained clay/rust accent.
- Instrument Serif for expressive display headings.
- DM Sans for body copy and interface text.
- DM Mono for compact labels, dates and metadata.
- Asymmetric photo compositions, clear hierarchy and generous spacing.
- A calm, tactile, archival feel.

The design system values and current screen references are recorded in [DESIGN_REFERENCE.md](./DESIGN_REFERENCE.md). The Figma file remains the visual reference; use Google Stitch to extend or explore remaining screens only while preserving this approved design language.

Do not replace the design with a standard SaaS dashboard or a generic developer portfolio layout.

---

## 3. Information architecture

### Public archive

| Area | Purpose | Main capabilities |
|---|---|---|
| Home / Overview | Front door to the archive | Introduction, current chapter, selected work, recent notes, collections |
| Workroom | Project index | Browse, filter and open project case studies |
| Project detail | Show the story behind a build | Problem, approach, architecture/decisions, implementation, outcome, lessons, stack, links and media |
| Field Notes | Journal index | Browse published notes by date, type, tag and collection |
| Field Note detail | Read an individual entry | Narrative, date, optional place, photos, videos and related collection |
| Collections | Curated groups | Albums, places, topics, timelines and other themed collections |
| Achievements | Evidence of progress | Certificates, hackathons, awards, courses and milestones |
| About / Now | Personal context | Short profile, current interests and what is being worked on now |

The current public implementation has a single-page home with Work, Field Notes, Collections and About sections. Dedicated detail pages and the Achievements index are still to be built.

### Private Studio

Owner-only areas:

- Overview / Dashboard
- New Field Note
- Manage Field Notes
- Projects
- Achievements
- Media Library
- Collections
- Drafts
- Settings

The Studio must be responsive and usable from a phone, especially for capturing a memory immediately after an event or trip.

---

## 4. Content models and publishing workflow

### Field Notes

Fields:

- Title and URL slug
- Entry date/time (default to today; editable)
- Type: Personal, Travel, College, Thought, Achievement, or custom
- Optional location
- Optional collection
- Story/body and short caption/excerpt
- Optional cover media
- Multiple photos and videos, with ordering and alt text/captions
- Tags
- Visibility: Public, Private or Unlisted
- Publication state: Draft, Published or Archived
- Created/updated/published timestamps

Creation flow:

1. Owner starts a new note from the Studio.
2. Enters a title, date, type and optional place.
3. Writes the story and selects a collection/tags.
4. Uploads one or more photos/videos and reorders them.
5. Chooses visibility separately from publication state.
6. Saves a draft or publishes.
7. The public archive only shows content that is eligible for public display.

### Projects

Fields:

- Title and slug
- One-line summary
- Problem/context
- Approach and solution
- Architecture and important decisions
- Implementation details
- Outcome/status
- Lessons learned
- Technologies/tags
- Repository URL and optional live demo
- Screenshots/media
- Featured flag
- Visibility and publication state

Projects should be treated as case studies, not just cards with a title and technology badges.

### Achievements

Fields:

- Title
- Issuer/organization
- Category (certificate, hackathon, award, course, milestone, etc.)
- Date earned
- Credential URL (optional)
- Certificate/attachment (optional)
- Notes
- Visibility and publication state

### Collections

A collection groups content such as photo albums, trips, places, college memories, themes or project-related material. It needs a title, slug, description, optional cover, ordered items and visibility/publication state.

### Publication and privacy rules

Visibility and publication state are independent:

- **Draft:** not published; owner can edit.
- **Published + Public:** appears in public pages, listings, search and sitemap where appropriate.
- **Published + Unlisted:** addressable by its direct link but omitted from public indexes, feeds and sitemap. Unlisted is not a security boundary; anyone with the link may be able to view it.
- **Published + Private:** owner only. Never expose private body text or media to anonymous visitors.
- **Archived:** removed from normal public discovery while retained for the owner.

Do not treat a hidden navigation link or an obscure slug as access control. Enforce private access with authentication, database Row Level Security (RLS) and private storage.

---

## 5. Technical architecture

### Existing application

- React 18
- Vite 5
- JavaScript / JSX
- Plain CSS with design tokens
- Netlify configuration already exists
- Current data is static in \`src/content.js\`

Keep the existing React + Vite stack. Do not migrate to Next.js or another framework without a concrete requirement and explicit discussion.

### Planned backend

- **Supabase Postgres:** content records and relationships.
- **Supabase Auth:** owner login.
- **Supabase RLS:** public/owner access rules at database level.
- **Supabase Storage:** original media and generated derivatives.
- **Netlify:** static frontend hosting and build/deploy pipeline.

No Supabase client, schema, auth, storage, API or live persistence is currently implemented. Add these deliberately in a later phase; do not claim that static mock content is connected.

### Suggested relational model

Use UUID primary keys and timestamps. Adapt names and constraints during schema design.

- \`entries\`: field notes; includes \`owner_id\`, \`slug\`, \`title\`, \`body\`, \`entry_type\`, \`entry_date\`, \`location\`, \`visibility\`, \`status\`, \`collection_id\`, \`published_at\`.
- \`projects\`: case studies; includes \`owner_id\`, \`slug\`, \`title\`, \`summary\`, \`problem\`, \`approach\`, \`decisions\`, \`implementation\`, \`outcome\`, \`lessons\`, \`technologies\`, \`repo_url\`, \`demo_url\`, \`featured\`, \`visibility\`, \`status\`.
- \`achievements\`: credential and milestone records; includes \`owner_id\`, \`title\`, \`issuer\`, \`category\`, \`earned_at\`, \`credential_url\`, \`notes\`, \`visibility\`, \`status\`.
- \`collections\`: title, slug, description, cover reference, visibility, status and owner.
- \`media_assets\`: owner, private original object path, optional derivative path, original filename, MIME type, byte size, dimensions/duration, alt text and timestamps.
- \`content_media\`: ordered join between media and supported content records. Prefer explicit integrity constraints or typed join tables if polymorphic references would weaken referential integrity.
- \`tags\` and content-tag join tables may be added when filtering/search needs justify them.

Use SQL migrations committed to the repository. Keep schema evolution reproducible.

### Authentication and access rules

- This is a single-owner v1. Do not implement public registration or multi-tenant account management.
- Set up the owner's account using a deliberate invitation/initialization process, then disable open registration.
- Anonymous visitors can read only published public content and, if intentionally supported, published unlisted content by direct URL.
- Authenticated owner can read and manage their own records.
- Every exposed table must have RLS enabled.
- Owner policies must check \`auth.uid() = owner_id\`; \`TO authenticated\` alone is not authorization.
- UPDATE policies need both \`USING\` and \`WITH CHECK\` ownership checks.
- Never use editable user metadata as an authorization claim.
- Never put the Supabase service-role/secret key in browser code, Vite variables or GitHub.
- Only the publishable/anon key and project URL belong in frontend environment configuration.

### Media and storage rules

Recommended bucket strategy:

- Private bucket for originals and private media.
- Public bucket only for optimized derivatives explicitly created for content marked Public.
- Unlisted media must not be put in an unrestricted public bucket merely because the page is not indexed. Choose and document a deliberate access method.
- Private media is delivered through authenticated access or short-lived signed URLs.

Upload requirements:

- Support multiple files per entry.
- Show upload progress, success, failure and retry states.
- Allow reordering before and after save.
- Validate type and size in the client and again in trusted server-side logic where needed.
- Use resumable TUS uploads for larger files; Supabase recommends this approach for files above 6 MB.
- Preserve originals. Generate optimized image derivatives and video poster/thumbnail assets.
- Strip GPS/EXIF from public derivatives unless the owner explicitly chooses to disclose it.
- Lazy-load galleries and video; never autoplay video with sound.
- Design a backup/export strategy for the database and original media before relying on the site as the sole archive.

---

## 6. Animation and asset strategy

Animation is a planned finishing phase, not a substitute for content or layout quality.

### Motion already present

The current feature branch adds:

- IntersectionObserver-based reveal behavior for major content sections/cards.
- A subtle vertical entrance and opacity transition.
- Staggered project and collection card timing.
- Restrained image hover scaling.
- \`prefers-reduced-motion\` handling.

This is a foundation only. It has not yet been browser-tested in this environment.

### Later motion pass

Once page layouts and real assets are in place, consider:

- Hero/title entrance sequence.
- Route/page transitions only if they improve orientation and do not harm performance.
- Image gallery/lightbox transitions.
- Editorial image reveals and subtle parallax only where appropriate.
- Project-card hover/focus states.
- Studio drawer/modal and form feedback.
- Upload progress, retry and publish-state transitions.
- Mobile-specific reduced motion and touch behavior.

Prefer CSS transitions and the platform APIs already in use. Add a motion library only if the use case warrants its bundle size and complexity.

### Asset pass

Replace the current temporary Unsplash/visual-study images with selected owner-provided media.

Needed asset groups:

1. Hero image(s): one strong workspace/building image and one personal/outside image.
2. Project covers: genuine screenshots, diagrams or photos for each project.
3. Field Notes: personal photos/videos selected by the owner.
4. Collections: album cover images and curated gallery items.
5. Achievements: certificate scans/images where useful.
6. Optional profile portrait or personal mark, only if the owner wants one.

For every asset:

- Confirm it is allowed to be published.
- Store descriptive alt text and optional caption.
- Produce responsive, compressed WebP/AVIF image derivatives where supported.
- Retain originals privately.
- Keep aspect ratios/crops consistent with the editorial layout.
- Avoid large image payloads and layout shift.
- Do not fabricate personal photography or imply stock images are personal memories.

---

## 7. Phased roadmap and acceptance criteria

### Phase 0 — Repository and handoff baseline

**Status: documented in this branch.**

- [x] Existing React/Vite repository inspected.
- [x] Existing public-page structure and static content identified.
- [x] Figma source file and frames recorded.
- [x] Initial reduced-motion-aware reveal layer committed.
- [x] This plan and Antigravity handoff committed.
- [ ] Local production build verified by the implementation environment.

### Phase 1 — Design reconciliation and public archive

- Inspect all existing public pages against the approved Figma direction.
- Resolve overlapping Figma artboards noted in DESIGN_REFERENCE.md.
- Use Stitch, if connected in the coding environment, to extend missing screens while preserving the existing token system and editorial direction.
- Build responsive public pages for project details, Field Notes index/detail, collections, achievements and About/Now.
- Replace generic placeholder copy with accurate owner-approved content.
- Keep navigation, filtering, search, empty/loading/error states and keyboard accessibility coherent.

**Done when:** every public route works at desktop and mobile sizes, links resolve, content hierarchy is consistent, and no placeholder is passed off as real personal content.

### Phase 2 — Supabase foundation and security

- Create/configure the Supabase project.
- Add a pinned Supabase JS client dependency and commit the lockfile.
- Add environment-variable example file containing names only.
- Create SQL migrations for content tables, indexes, relationships and constraints.
- Enable RLS on every exposed table.
- Add separate public-read and owner-manage policies.
- Configure single-owner authentication and disable open signup.
- Create storage buckets and storage policies.
- Test public/private/unlisted behavior using anonymous and owner sessions.

**Done when:** unauthorized users cannot read private rows or original files, the owner can manage their own records, and the policies are tested rather than assumed.

### Phase 3 — Private Studio and content management

- Build the Studio shell matching the approved design.
- Add login, session handling and logout.
- Add dashboard counts and recent activity.
- Implement create/edit/delete flows for Field Notes, Projects, Achievements and Collections.
- Implement draft/publish/archive states and public/private/unlisted visibility.
- Add previews before publishing.
- Implement search, filters, tags and ordering.
- Ensure forms work on mobile.

**Done when:** the owner can create and manage every content type without editing code, and public views update from persisted data.

### Phase 4 — Media library and uploads

- Implement multi-file image/video uploads.
- Add progress, retry, validation, cancellation and reorder controls.
- Store original files privately.
- Generate public derivatives only for content explicitly marked Public.
- Add image optimization, video posters and metadata/EXIF handling.
- Build the Media Library for browsing and reusing uploaded assets.
- Add deletion/cleanup rules so database records and stored objects do not drift apart.

**Done when:** a complete journal entry with multiple images/video can be uploaded, saved as a draft, published with intended visibility and rendered correctly on mobile.

### Phase 5 — Personal asset and content population

- Collect the owner's selected images, videos, project screenshots and certificates.
- Replace all temporary visual studies and sample content.
- Verify every project's description, status, repository/demo link and actual outcome with the owner.
- Add first real Field Notes and Collections.
- Confirm which content is public, unlisted or private.

**Done when:** no temporary/stock imagery or invented project outcomes remain in featured content.

### Phase 6 — Final motion and visual polish

- Refine current scroll reveals and stagger timing.
- Add approved hero, gallery and route transitions only where useful.
- Add lightbox and media interactions.
- Polish Studio feedback states and upload states.
- Audit reduced-motion mode, keyboard behavior and touch devices.
- Keep animations performant; avoid unnecessary GPU-heavy effects and scroll jank.

**Done when:** motion feels intentional, supports hierarchy and does not interfere with content, accessibility or mobile performance.

### Phase 7 — QA, deployment and long-term preservation

- Run clean install and production build.
- Add automated smoke tests for routes and critical flows.
- Test responsive layouts on common viewport sizes.
- Test keyboard-only and reduced-motion navigation.
- Test RLS and storage access as anonymous and owner.
- Test upload interruptions and retry behavior.
- Add SEO metadata, canonical URLs, Open Graph images, sitemap and robots rules.
- Connect Netlify to the selected production branch.
- Configure production environment variables safely.
- Configure domain and HTTPS when available.
- Create documented database/media backup and restore procedures.
- Verify restore from backup before treating the archive as durable.

**Done when:** production site is live, private content remains private, uploads are reliable, and a recovery path exists.

---

## 8. Definition of done for the whole product

The product is complete when:

- The public archive feels like the approved editorial design, not a generic template.
- Projects have real case-study pages.
- Field Notes, Collections and Achievements are browsable.
- The owner has a secure, responsive Studio.
- The owner can create, edit, reorder, draft, publish and archive content without touching code.
- Public, private and unlisted access is enforced consistently.
- Original uploads are preserved privately and public derivatives are generated intentionally.
- Motion and assets have been curated after content structure is stable.
- The site builds and deploys reliably.
- A tested backup/restore path exists.

---

## 9. Operating rules for future contributors/agents

1. Work from \`feat/archive-public-v1\` until changes are reviewed; do not silently push unfinished work to \`main\`.
2. Read [ANTIGRAVITY_HANDOFF.md](./ANTIGRAVITY_HANDOFF.md) and [DESIGN_REFERENCE.md](./DESIGN_REFERENCE.md) before making structural changes.
3. Preserve React + Vite unless there is a documented reason to change it.
4. Preserve the approved visual language and existing responsive behavior.
5. Do not implement mock UI in place of working functionality without labeling it.
6. Do not store secrets, private media or private personal content in this public repository.
7. Do not weaken RLS or expose service-role credentials to fix frontend errors.
8. Add migrations and tests alongside backend changes.
9. Keep the UI accessible and respect reduced-motion preferences.
10. Update this plan and the README status when a phase is materially completed.
11. Run the production build and relevant tests after code changes; report failures honestly.
12. Ask the owner before publishing personal photos, videos, location metadata or sensitive entries.

