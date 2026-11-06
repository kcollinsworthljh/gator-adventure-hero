# Gator Adventures — Hero Discovery

A browser-based student hero creator for Gator Adventures. This repository contains only the static website files needed to run the current prototype.

## Included

- `index.html` — website entry point
- `style.css` — layout and styling
- `app.js` — 12-question hero discovery questionnaire, scoring, recommendations, and JSON export
- `.nojekyll` — instructs GitHub Pages to serve the static files directly

## Run locally

Open `index.html` in a browser. No install or backend is needed for this prototype.

## Publish on GitHub Pages (free public repository)

1. Create a **public** repository named `gator-adventures-hero` on the GitHub account you choose to use.
2. Upload the contents of this folder to the repository root. **Do not upload only the ZIP**; extract it first.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**; select `main` and `/ (root)` and save.
5. Once GitHub publishes it, open `https://YOUR-USERNAME.github.io/gator-adventures-hero/` and test the questionnaire.
6. In Google Sites, go to **Create Your Hero → Insert → Embed → By URL** and paste the published URL. If embedding is restricted, use a button linking directly to the published page instead.

## School access and privacy

- Test on a school-managed student device. GitHub Pages is not guaranteed to be permitted by district filtering; request allowlisting from IT if blocked.
- This prototype does not send responses to a server or save a student account. Its JSON export downloads a character file to the local device.
- Do not enter real student names or other personally identifiable information when testing; do not commit exported student character files to the public repository.
- A public repository makes its source code publicly visible. Keep private game engines, credentials, and proprietary StudyBuddy/Scaffold code in separate private repositories.

## Next development milestones

Add a student-friendly character save/continue flow, game engine integration, and accessibility testing before classroom rollout.
