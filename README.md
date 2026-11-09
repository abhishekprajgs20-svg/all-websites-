# ToolVault — HTML Tool Library

A responsive, dark professional dashboard for hosting and opening your standalone HTML tools. It is a static site and can be deployed on **both Vercel and Render** from the same GitHub repository.

## Add or update a tool

1. Open the repository's `public/tools/` folder.
2. Upload your `.html` file there. Keep the filename exactly as you want it displayed/identified (spaces and brackets are supported).
3. Commit and push to GitHub.
4. Vercel/Render rebuilds the catalogue automatically. The new tool appears on the website after deployment.

The website reads the HTML page title for the display name when available. Its original filename is retained and is also used in the tool URL. You do **not** need to edit `index.html` or manually register a new tool.

Example:

```text
public/
  index.html
  tools.json          # generated during build; do not edit manually
  tools/
    Quiz Maker(2).html
    My New Tool.html
```

## Deploy on Vercel

1. Push this repository to GitHub.
2. In Vercel choose **Add New → Project** and import the repository.
3. Framework preset: **Other**.
4. Build command: `npm run build`.
5. Output directory: `public`.
6. Deploy. (The included `vercel.json` already defines these settings.)

## Deploy on Render

1. In Render choose **New → Static Site** and connect the same GitHub repository.
2. Build command: `npm install && npm run build`.
3. Publish directory: `public`.
4. Create Static Site. (The included `render.yaml` also describes the service.)

## Run locally

Requires Node.js 18+; no third-party npm packages are needed.

```bash
npm run build
npm start
```

Open `http://localhost:3000`.

## Notes

- This is a static file library, not a cloud upload panel. Add HTML files through GitHub in `public/tools/`; deployments publish them as website assets.
- Existing tool pages run as their own HTML documents inside the preview frame. Use **Open in new tab** if a tool needs a full browser tab, popup permissions, or behaves better outside the preview.
- The uploaded HTML tools may load their own third-party CDNs or request browser permissions. Those behaviours belong to each individual tool.
- Do not upload private files, secrets, API keys, or confidential information into a public GitHub repository.
