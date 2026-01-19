// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mdx from "@astrojs/mdx";
import mermaid from "astro-mermaid";

// https://astro.build/config
export default defineConfig({
  // Static site output (default for Starlight)
  output: 'static',
  integrations: [
    starlight({
      title: "Memo Docs",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/yomemoai/yomemo-doc",
        },
      ],
      sidebar: [
        {
          label: "Docs",
          items: [
            { label: "Getting Started", slug: "guides/getting-started" },
            { label: "How It Works", slug: "guides/how-it-works" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      customCss: ["./src/assets/card-grid.css"],
    }),
    mdx(),
    mermaid(),
  ],
});
