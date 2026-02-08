// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mdx from "@astrojs/mdx";
import mermaid from "astro-mermaid";

// https://astro.build/config
export default defineConfig({
  // Static site output (default for Starlight)
  output: "static",
  // Site URL for canonical URLs and sitemap generation
  site: "https://docs.yomemo.ai",
  integrations: [
    starlight({
      title: "YoMemo",
      logo: {
        src: "./src/assets/logo.svg",
        alt: "YoMemo",
        replacesTitle: false,
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/yomemoai",
        },
      ],
      sidebar: [
        {
          label: "YomMemo.ai",
          link: "https://yomemo.ai",
        },
        {
          label: "Guides",
          items: [
            { label: "Getting Started", slug: "guides/getting-started" },
            { label: "Key Pairs (Public & Private)", slug: "guides/key-pairs" },
            { label: "Managing Memories", slug: "guides/managing-memories" },
            {
              label: "Memory Classification & Insights",
              slug: "guides/memory-classification-and-insights",
            },
            { label: "Use Cases", slug: "guides/use-cases" },
            { label: "How It Works", slug: "guides/how-it-works" },
          ],
        },
        {
          label: "Scenarios",
          autogenerate: { directory: "scenarios" },
        },
        {
          label: "Integrations",
          autogenerate: { directory: "integrations" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
        {
          label: "API",
          autogenerate: { directory: "api" },
        },
        {
          label: "Features",
          autogenerate: { directory: "features" },
        },
      ],
      head: [
        {
          tag: "script",
          attrs: {
            async: true,
            src: "https://www.googletagmanager.com/gtag/js?id=G-Z3ZYVK1R5Z",
          },
        },
        {
          tag: "script",
          content: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z3ZYVK1R5Z');
          `,
        },
        {
          tag: "script",
          content: `
            document.addEventListener('DOMContentLoaded', function() {
              const siteTitle = document.querySelector('.site-title');
              if (siteTitle && !siteTitle.getAttribute('href')) {
                siteTitle.setAttribute('href', 'https://yomemo.ai');
                siteTitle.addEventListener('click', function(e) {
                  e.preventDefault();
                  window.location.href = 'https://yomemo.ai';
                });
              }
            });
          `,
        },
      ],

      customCss: ["./src/assets/card-grid.css"],
    }),
    mdx(),
    mermaid(),
  ],
});
