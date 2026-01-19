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
   
   **重要**: 首次部署前，需要先创建 Cloudflare Pages 项目：
   ```bash
   # 1. 确保已安装并登录 Wrangler
   npm install -g wrangler
   wrangler login
   
   # 2. 创建 Pages 项目（仅首次需要）
   npm run pages:create
   # 或者直接运行：
   # wrangler pages project create yomemo-doc --production-branch=main
   
   # 3. 构建并部署
   npm run deploy
   # 或者分步执行：
   # npm run build
   # wrangler pages deploy dist --project-name=yomemo-doc
   ```
   Then add custom domain `docs.yomemo.ai` in Cloudflare Pages settings
   
   **注意**: 如果遇到 "Project not found" 错误，说明项目还未创建，请先执行步骤 2。

3. **Via GitHub Actions** (自动部署，推荐用于 CI/CD):
   
   已配置 GitHub Actions 工作流，每次推送到 `main` 分支会自动部署。
   
   **设置步骤**:
   1. 获取 Cloudflare API Token:
      - 访问 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
      - 点击 "Create Token" → 使用 "Edit Cloudflare Workers" 模板
      - 或者创建自定义 token，需要以下权限：
        - Account: Cloudflare Pages:Edit
        - Zone: Zone:Read (如果需要自定义域名)
   2. 获取 Account ID:
      - 在 Cloudflare Dashboard 右侧边栏可以看到 Account ID
   3. 配置 GitHub Secrets:
      - 进入 GitHub 仓库 → Settings → Secrets and variables → Actions
      - 添加以下 Secrets:
        - `CLOUDFLARE_API_TOKEN`: 你的 Cloudflare API Token
        - `CLOUDFLARE_ACCOUNT_ID`: 你的 Cloudflare Account ID
   4. 推送代码到 `main` 分支，GitHub Actions 会自动触发部署
   
   **工作流文件**: `.github/workflows/deploy.yml`
   
   **注意**: 
   - 首次部署前，需要先在 Cloudflare Pages 创建项目 `yomemo-doc`
   - 可以通过 Dashboard 或运行 `wrangler pages project create yomemo-doc` 创建

For more details, see the [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/).

## 👀 Want to learn more?

Check out [Starlight's docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).
