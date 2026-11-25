# Workspace Instructions

This repository is **Rudra — A Life in Progress**, a personal digital archive.

Before changing the product, read:

1. [ANTIGRAVITY_HANDOFF.md](./ANTIGRAVITY_HANDOFF.md) — current state, handoff and contributor instructions.
2. [PROJECT_PLAN.md](./PROJECT_PLAN.md) — product scope, architecture, roadmap and acceptance criteria.
3. [DESIGN_REFERENCE.md](./DESIGN_REFERENCE.md) — approved Figma source, tokens, screen references and known design cleanup.

## Non-negotiable constraints

- Work on feat/archive-public-v1 unless the owner explicitly selects another branch.
- Keep main untouched until the owner approves a coherent milestone.
- Preserve React 18 + Vite 5. Do not migrate frameworks without a documented reason and owner agreement.
- Preserve the approved editorial visual direction: paper, forest, clay, Instrument Serif, DM Sans and DM Mono.
- Do not replace the design with a generic portfolio or generic SaaS admin template.
- Treat Figma as the approved reference for existing screens; Stitch can extend the system but must not create a conflicting visual identity.
- Never represent static placeholders or mockups as working backend features.
- Never claim tests/builds have passed unless they were actually run.
- Respect reduced-motion settings, keyboard accessibility and responsive behavior.
- Do not commit secrets, API keys, private media, .env files or private content.
- Never expose Supabase service-role credentials in browser code.
- Enable and test RLS on every exposed database table. Private media must not be stored in a publicly readable bucket.
- Ask before publishing personal photographs, videos, location data, private writing or other sensitive content.
- Keep docs and status accurate as implementation progresses.

## Working style

- Inspect the existing code and patterns before replacing or adding components.
- Prefer small, coherent milestones and clear commits.
- Reuse existing components, CSS tokens and content models.
- Add loading, error, empty and success states to interactive flows.
- Run the production build and relevant tests after changes; report exact results.
- Update PROJECT_PLAN.md, README.md and/or ANTIGRAVITY_HANDOFF.md when a milestone or architectural decision changes.
- Do not deploy production or merge to main without explicit owner approval.
