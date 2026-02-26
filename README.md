# Android Developer Portfolio (GitHub Pages)

This project is now optimized for static hosting on `https://dinakarank.github.io/`.

## What this supports
- React + Bootstrap responsive portfolio
- Resume download (`/resume.pdf`)
- Dark mode toggle
- Auto-fetch GitHub repositories at runtime from GitHub API
- Newly added GitHub repos appear automatically on next page load
- Android-related repositories are highlighted first
- SEO basics (`meta`, `robots.txt`, `sitemap.xml`)

## Stack
- Frontend: React + Vite + Bootstrap
- Hosting: GitHub Pages via GitHub Actions

## Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Environment
Use `frontend/.env`:
```bash
VITE_GITHUB_USERNAME=Dinakaran-k
VITE_GA_MEASUREMENT_ID=
```

## Deploy to `https://dinakarank.github.io/`
1. Create a repo named exactly `dinakarank.github.io`.
2. Push this code to the `main` branch.
3. In GitHub repo settings:
   - `Settings > Pages > Build and deployment`.
   - Source = `GitHub Actions`.
4. (Optional) Add repo secrets:
   - `VITE_GITHUB_USERNAME`
   - `VITE_GA_MEASUREMENT_ID`
5. Push to `main`; workflow `.github/workflows/deploy-pages.yml` deploys automatically.

## Notes
- GitHub API is called client-side, so repos are live and auto-updating.
- Anonymous GitHub API has rate limits (usually 60 requests/hour per IP).
- Contact form uses `mailto:` to work without backend.

## If you use a project repo (not `dinakarank.github.io`)
Set `base` in `frontend/vite.config.js` to `/<repo-name>/`.
