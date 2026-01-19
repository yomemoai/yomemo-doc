# Starlight Starter Kit: Basics

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

```
npm create astro@latest -- --template starlight
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro + Starlight project, you'll see the following folders and files:

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

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Deployment

This project is configured to deploy to Cloudflare Pages. See the deployment section below for instructions.

### Quick Deploy to Cloudflare Pages

1. **Via Cloudflare Dashboard** (Recommended):
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Workers & Pages → Create application → Pages → Connect to Git
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Build output directory: `dist`
     - **Deploy command**: **留空**（不要设置任何值，Cloudflare Pages 会自动部署）
   - Save and Deploy
   - After deployment, add custom domain `docs.yomemo.ai` in project settings
   
   **重要**: 如果遇到部署错误，请检查 Settings → Builds & deployments → Deploy command 是否为空

2. **Via Wrangler CLI**:
   ```bash
   npm run build
   wrangler pages deploy dist --project-name=yomemo-doc
   ```
   Then add custom domain `docs.yomemo.ai` in Cloudflare Pages settings

3. **Via GitHub Actions**:
   - Configure GitHub Secrets: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
   - Push to `main` branch to trigger automatic deployment

For more details, see the [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/).

## 👀 Want to learn more?

Check out [Starlight's docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).
