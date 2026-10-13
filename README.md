# NVIDIA: From Founder-Powered to System-Powered

**Team 11 · Duke Fuqua · Foundations of Management & Organizations (MGMT 544F&K), Fall 2026**

A fully responsive, accessible, static website based on Team 11's original NVIDIA presentation. Its color palette, compressed headlines, angled green-line motifs, white/cards, green accents, and restrained layout follow the design language of the supplied presentation.

## What the syllabus calls for

The Management 544F&K syllabus (pp. 5–6) defines the **team case analysis website** as the second team deliverable, worth **10%**, due **October 16, 2026**. It should communicate the same organizational analysis and consulting recommendations as the class presentation, for an audience that did **not** attend the presentation. At least two course concepts, supporting evidence, an assessment of strengths and weaknesses, and specific, actionable recommendations are required. A **separate detailed rubric exists on Canvas**, and was not supplied with the project.

## Deploy on Vercel

There are **no runtime dependencies** and no API keys. The project is a static HTML/CSS/JavaScript site.

**Option 1 — Deploy via Vercel dashboard**
1. Create a GitHub repository and upload everything in this directory (excluding any local `dist/` folder, if present).
2. Visit [vercel.com/new](https://vercel.com/new) and import that repository.
3. In Project Settings, select **Other** as the framework. Set **Build Command** to `npm run build` and **Output Directory** to `dist`.
4. Deploy. You will receive a live `*.vercel.app` URL.

**Option 2 — Vercel CLI**
```sh
npm install -g vercel
vercel login
vercel --prod
```

When prompted, use the `dist` directory as the output and `npm run build` as the build command (if Vercel does not detect them automatically).

## Local preview

From the project root:
```sh
npm run dev
```
Then open `http://localhost:3000` in a browser.

To produce the deployment output:
```sh
npm run build
npm run preview
```

## Project files
- `index.html`: every section, evidence link, educational content, and semantic markup.
- `styles.css`: responsive design, visual system, diagrams, print styles, and accessibility.
- `script.js`: keyboard-accessible recommendation tabs, active section navigation, mobile menu, scroll progress, reveal animations.
- `assets/team-11-presentation.pdf`: original team slides, available under “View original presentation.”
- `assets/favicon.svg`: site icon.
- `vercel.json`: security-related HTTP headers and URL configuration.
- `scripts/build.mjs`: dependency-free build script, placing deployable files in `dist/`.

## Editorial and academic review before submission
- **Match the Canvas rubric.** The syllabus refers to a separate website rubric that has not been provided.
- **Verify external source links and claims.** Web copy reuses and adapts the team's own slide material, with source links from the appendix. This site does **not** assert any independent verification of underlying claims.
- **Honor Code / AI use.** The syllabus restricts use of LLMs to complete written assignments. This site is a technical presentation of the team's already-authored slide content, but Team 11 must verify that this use is permitted for the graded website, review every statement, and make any required original edits independently.
- **Obtain team approval.** Check exact project framing and team names, and validate that all content represents the team's own views before submitting.
- **Sources and licensing.** NVIDIA is a registered mark of NVIDIA Corporation. The site is an independent student analysis, not an official or endorsed website.

## Colors inspired by slides
- Warm off-white: `#e8e9df` (sampled from the original presentation)
- Forest green: `#174c29`
- Accent green: `#76b900`
- Charcoal: `#464a43`
