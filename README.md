# YoMemo Docs

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Documentation site for [YoMemo](https://yomemo.ai), built with Astro + Starlight.

## Project Structure

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   └── docs/
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Starlight serves `.md` and `.mdx` files from `src/content/docs/`. Each file is exposed as a route based on its file name.

Images go in `src/assets/` and can be embedded in Markdown. Static assets (e.g. favicons) go in `public/`.

## Commands

| Command                   | Action                                          |
| :------------------------ | :---------------------------------------------- |
| `npm install`             | Install dependencies                            |
| `npm run dev`             | Start local dev server at `localhost:4321`      |
| `npm run build`           | Build production site to `./dist/`              |
| `npm run preview`         | Preview the build locally                       |
| `npm run deploy`          | Build and deploy to Cloudflare Pages            |
| `npm run astro ...`       | Run Astro CLI (e.g. `astro add`, `astro check`) |
| `npm run astro -- --help` | Astro CLI help                                  |

## Deployment

This project deploys to **Cloudflare Pages**.

### Option 1: Cloudflare Dashboard (recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Workers & Pages → Create application → Pages → **Connect to Git**
3. Select this repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Deploy command**: **Leave empty** (Cloudflare Pages runs the build automatically)
5. Save and Deploy
6. In project settings, add custom domain `docs.yomemo.ai`

**Important:** If the deploy fails, check Settings → Builds & deployments → Deploy command and ensure it is empty.

### Option 2: Wrangler CLI

**Important:** Create the Cloudflare Pages project first (one-time):

```bash
# 1. Install dependencies and log in (wrangler is a devDependency)
npm install
npx wrangler login

# 2. Create the Pages project (one-time only)
npm run pages:create
# or: npx wrangler pages project create yomemo-doc --production-branch=main

# 3. Build and deploy
npm run deploy
# or step by step:
# npm run build
# npx wrangler pages deploy dist --project-name=yomemo-doc
```

Then add custom domain `docs.yomemo.ai` in Cloudflare Pages project settings.

**Note:** If you see "Project not found", create the project first (step 2).

### Option 3: GitHub Actions (CI/CD)

A GitHub Actions workflow is set up to deploy on every push to `main`.

**Setup:**

1. **Cloudflare API Token**
   - Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Create Token → use "Edit Cloudflare Workers" template, or create a custom token with:
     - Account: Cloudflare Pages: Edit
     - Zone: Zone: Read (if using a custom domain)
2. **Account ID**
   - Find it in the right sidebar of the Cloudflare Dashboard
3. **GitHub Secrets**
   - Repo → Settings → Secrets and variables → Actions
   - Add:
     - `CLOUDFLARE_API_TOKEN`: your Cloudflare API token
     - `CLOUDFLARE_ACCOUNT_ID`: your Cloudflare account ID
4. Push to `main`; the workflow will run and deploy.

Workflow file: `.github/workflows/deploy.yml`

**Note:** The first deploy requires the Pages project `yomemo-doc` to exist. Create it via the Dashboard or:

```bash
npx wrangler pages project create yomemo-doc --production-branch=main
```

For more, see [Cloudflare Pages docs](https://developers.cloudflare.com/pages/).

## Learn more

- [Starlight](https://starlight.astro.build/)
- [Astro](https://docs.astro.build)
