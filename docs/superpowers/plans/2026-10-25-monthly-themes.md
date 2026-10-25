# Monthly Themes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The site picks one of 12 seasonal themes (palette, particles, copy) from the visitor's local month.

**Architecture:** A new `js/themes.js`, loaded synchronously in `<head>`, holds the 12-entry table, picks the month (`?month=N` overrides), writes CSS variables onto `<html>` and exposes `window.THEME`. `style.css` uses only variables / `color-mix()`; `main.js` reads `window.THEME` for particles, keepsake PNG and copy.

**Tech Stack:** Static HTML/CSS/JS, no build, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-25-monthly-themes-design.md`

## Global Constraints
- No build step, no new dependency.
- Layout and fonts unchanged across months.
- Chinese-only copy; code comments in English.
- `prefers-reduced-motion` still disables ambient canvas and click hearts.
- Month = visitor's local `new Date().getMonth() + 1`; `?month=N` (1–12) overrides; anything else ignored.

## Review Focus
- `?month=13`, `?month=abc`, `?month=0` → falls back to the current month, no error.
- Low contrast: `ink` on `paper` and `accentDeep` on `paper` must stay ≥ 4.5:1 in every month.
- Keepsake PNG must use the current month's colors, not the old hard-coded ones.
- `<meta name="theme-color">` must match the month's `bg`.
- Midnight month rollover while the page is open: not handled (reload picks it up) — acceptable.

---

### Task 1: Theme table + variables in CSS/HTML

**Files:**
- Create: `js/themes.js`
- Modify: `index.html` (load script in `<head>`, SVG gradient stops → CSS classes, footer theme slot)
- Modify: `css/style.css` (all hard-coded colors → vars)

**Interfaces:**
- Produces: `window.THEME = { month, name, particle: "heart"|"snow"|"petal"|"leaf", particleColors: string[] /* "r, g, b" */, mood, hero?: string, colors: { bg, paper, blush, peach, accent, accentDeep, gold, ink, inkSoft, inkFaint } }`.
- CSS vars set on `<html>`: `--cream, --paper, --blush, --peach, --rose, --rose-deep, --gold, --ink, --ink-soft, --ink-faint` (existing names, kept so CSS diff stays small); `data-month="N"` on `<html>`.

- [ ] Step 1: Write `js/themes.js` with the 12 entries from the spec table (names, particle, mood; `hero` for 1, 4, 8). Pick muted warm hexes; `ink` stays a warm dark brown family.
- [ ] Step 2: Replace every hard-coded color in `style.css` (outside `:root`) with a var or `color-mix(in srgb, var(--x) N%, transparent)`; shadows tinted from `--ink`.
- [ ] Step 3: SVG `stop-color="#..."` → `class` + CSS `stop-color: var(--x)`; `.heart-fill` likewise.
- [ ] Step 4: Verify: `grep -nE '#[0-9a-fA-F]{3,6}|rgba?\(' css/style.css` shows hits only inside `:root` / the noise data-URI; open `index.html?month=10` and `?month=4` — colors differ, no console errors.

### Task 2: main.js follows the theme

**Files:** Modify: `js/main.js`, `index.html` (footer slot `.js-theme-name`, `.js-theme-mood`)

**Interfaces:** Consumes `window.THEME` from Task 1.

- [ ] Step 1: Ambient: replace `colors` with `THEME.particleColors`; bokeh stays; accent particle by `THEME.particle` — `heart` rises (current), `snow`/`petal`/`leaf` fall with rotation for petal/leaf.
- [ ] Step 2: `exportCard()`: read colors from `THEME.colors` instead of literals.
- [ ] Step 3: Footer shows `本月 · {name}` and `mood`; if `THEME.hero`, replace `.hero-sub` text; update `meta[name=theme-color]` from `THEME.colors.bg` (in themes.js).
- [ ] Step 4: Verify in browser for all 12 `?month=N`: screenshot hero, particles move in the right direction, footer copy right, keepsake PNG colors match; check contrast ≥ 4.5 via JS for ink/paper and accentDeep/paper.
- [ ] Step 5: Update `docs/design.md` with a short "每月主题" section; commit.
