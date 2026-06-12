# CLAUDE.md — Fitt With T

Claude Code reads this automatically every session. It is the standing context and the rules for this project. Follow it throughout.

## Project
Production website for **Fitt With T** — a personal trainer in North London (Tommera). We are refactoring an approved single-file concept into a clean, component-based **React (Vite)** site, deployed on **Vercel**. The client owns the repo and domain.

## Brand
- Name: **Fitt With T**
- Palette: rose-gold `#b3705c` accent, grounded in warm espresso/charcoal + sand neutrals on a warm off-white. Premium and welcoming — broadened to appeal to everyone, not women-only.
- Fonts: Cormorant Garamond (display/serif) + Outfit (sans).
- Identity / creed: **Faith · Intention · Tenacity · Testimonials** — runs through the site.
- Buttons: softly rounded (~10px radius), light weight. NOT sharp, NOT full pills, NOT bold.
- All design values come from `src/styles/tokens.css` — the single source of truth.

## Pages
Home, About (Tommera's real story), Services (Face to Face / Online Coaching / Hybrid — NO prices shown), Results & testimonial, Contact, Book-a-Taster flow.

## Engineering standards (non-negotiable)
- Low complexity — one function/component, one job. Isolate branching.
- High cohesion, low coupling — each component owns ONE responsibility; share only via props.
- Use design tokens for every colour/space/type/radius value. NEVER hard-code a value that exists as a token.
- No dead code, no leftover placeholder/lorem text in client-facing pages.
- Keep it simple. No extra dependencies or frameworks unless I explicitly approve.

## Security standards (critical)
- NEVER hand-build booking, payments, or storage of personal/health data.
- The ~15-question intake form collects HEALTH DATA (special-category, UK GDPR). It is EMBEDDED from a certified provider (Acuity/Square/Calendly) — never a hand-rolled form writing to our own store.
- Validate every input. No secrets in the repo (env vars only). HTTPS. Keep dependencies minimal + current.

## Definition of Done (every component/story)
1. Does what its story says.
2. Low complexity — no function doing >1 thing / heavy branching.
3. High cohesion, low coupling — one responsibility, clean prop interface.
4. Uses design tokens; no hard-coded values; no placeholder text.
5. Responsive (mobile/tablet/desktop).
6. Accessible — WCAG AA contrast, visible focus states, semantic markup, keyboard-usable.
7. Inputs validated; sensitive data via a certified provider.
8. No secrets committed; dependencies sane.
9. Committed with a clear message; self-reviewed.

## Git workflow (non-negotiable)
- NEVER commit directly to `main`. `main` = live Vercel site.
- For every task, create a work branch: `build/[card-id]` (e.g. `build/b-04`).
- Push the branch — Vercel builds a private preview URL. Only merge to `main` when I explicitly say "make it live".
- Always confirm the current branch before committing.

## How to work with me
- One story/card at a time. Don't build ahead.
- ALWAYS show proposed file changes before applying them; I review before you write.
- After a change, we test on the dev server before committing.
- Commit per finished unit with a clear conventional message (e.g. `feat: build Nav component (B-03)`).
- Refactor FROM the approved concept (I'll provide it) — match its design, don't invent new ones.

## Boundaries
- The booking/intake provider account is set up and OWNED BY THE CLIENT (her data). I integrate the embed only; never create the account holding people's health info.
- The client owns the final repo and domain. Account/payment/domain setup is something the client authorises and performs.
