# Rudra — A Life in Progress

A personal digital archive: part portfolio, part field journal, part memory collection.

The intention is to build a public archive and a private owner-only Studio where content can be created, organized, uploaded and published without changing source code.

## Project direction

The visual identity is an editorial field journal: warm paper, deep forest ink, restrained clay accents, expressive serif typography, precise mono labels, asymmetric image compositions and generous breathing room. The public experience should feel like an independent publication rather than a conventional developer portfolio.

## Current repository state

**Active implementation branch:** [feat/archive-public-v1](https://github.com/the-Hoeser/portfolio/tree/feat/archive-public-v1)  
**Default branch:** main  
**Approved design reference:** [Figma — Rudra: A Life in Progress](https://www.figma.com/design/cyGeaA8Uzaq3xCpopWm4ch)

The current codebase is a React + Vite public-site shell. It includes a responsive one-page archive, project filters, section navigation, a search overlay and the initial reduced-motion-aware reveal layer.

The Studio, Supabase backend, authentication, media uploads and persistent content management are **not implemented yet**. Some project content and imagery are temporary starter content.

## Start locally

~~~bash
npm install
npm run dev
~~~

Create a production build:

~~~bash
npm run build
npm run preview
~~~

## Deployment

The repository includes Netlify configuration. Current intended settings:

- Build command: npm run build
- Publish directory: dist

Do not deploy production until the owner approves the release milestone and production environment variables are configured.

## Documentation

Read these in order before implementing:

1. [AGENTS.md](./AGENTS.md) — persistent workspace rules for Antigravity and coding agents.
2. [ANTIGRAVITY_HANDOFF.md](./ANTIGRAVITY_HANDOFF.md) — current implementation state and next-agent handoff.
3. [PROJECT_PLAN.md](./PROJECT_PLAN.md) — product goals, information architecture, data model, security, roadmap and acceptance criteria.
4. [DESIGN_REFERENCE.md](./DESIGN_REFERENCE.md) — Figma screen links, design tokens and known design cleanup.
5. [IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md) — verified completed work, current limitations and next action.
6. [design/figma/README.md](./design/figma/README.md) — Figma export package, native source handoff and asset organization.
7. [design/tokens.json](./design/tokens.json) and [design/tokens.css](./design/tokens.css) — portable design tokens.

## Repository structure

~~~text
.
├── AGENTS.md
├── ANTIGRAVITY_HANDOFF.md
├── DESIGN_REFERENCE.md
├── PROJECT_PLAN.md
├── index.html
├── netlify.toml
├── package.json
└── src/
    ├── content.js
    ├── main.jsx
    ├── motion.css
    └── styles.css
~~~

## Safety and privacy

This repository is public. Do not commit private photographs, private videos, private journal entries, secrets, API keys, .env files or Supabase service-role credentials. The planned backend uses Supabase Auth, Postgres RLS and Storage; implement and test privacy controls before adding personal content.

## Content

At this stage, starter public content is in src/content.js. It is temporary and should be replaced with accurate, owner-approved content as the archive becomes functional.
