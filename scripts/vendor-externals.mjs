#!/usr/bin/env node
/**
 * Downloads every third-party runtime the archived portfolio needs and writes
 * it into docs/packages, docs/media/icons and docs/css.
 *
 * The archive is a fixed snapshot: this script is here so the vendored files
 * can be reproduced, not because the site needs a build step.
 *
 * Usage: node scripts/vendor-externals.mjs
 */

import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs");
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const downloads = [
  // --- JS runtimes -------------------------------------------------------
  {
    url: "https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js",
    to: "packages/gsap.min.js",
  },
  {
    url: "https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/ScrollTrigger.min.js",
    to: "packages/ScrollTrigger.min.js",
  },
  {
    url: "https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/ScrollToPlugin.min.js",
    to: "packages/ScrollToPlugin.min.js",
  },
  {
    url: "https://cdn.jsdelivr.net/npm/lenis@1.0.45/dist/lenis.min.js",
    to: "packages/lenis.min.js",
  },
  {
    url: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
    to: "packages/bootstrap.bundle.min.js",
  },
  {
    url: "https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js",
    to: "packages/tsparticles.confetti.bundle.min.js",
  },
  {
    url: "https://cdn.jsdelivr.net/npm/marked@12.0.2/lib/marked.esm.js",
    to: "packages/marked.esm.js",
  },
  {
    url: "https://web3forms.com/client/script.js",
    to: "packages/web3forms-client.js",
  },

  // --- Font Awesome Free 6.7.2 ------------------------------------------
  {
    url: "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/css/all.min.css",
    to: "packages/fontawesome/css/all.min.css",
  },
  {
    url: "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/webfonts/fa-solid-900.woff2",
    to: "packages/fontawesome/webfonts/fa-solid-900.woff2",
  },
  {
    url: "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/webfonts/fa-regular-400.woff2",
    to: "packages/fontawesome/webfonts/fa-regular-400.woff2",
  },
  {
    url: "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/webfonts/fa-brands-400.woff2",
    to: "packages/fontawesome/webfonts/fa-brands-400.woff2",
  },
  {
    url: "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/webfonts/fa-v4compatibility.woff2",
    to: "packages/fontawesome/webfonts/fa-v4compatibility.woff2",
  },

  // --- Emoji / flags used as inline artwork ------------------------------
  {
    url: "https://em-content.zobj.net/source/apple/391/flag-united-kingdom_1f1ec-1f1e7.png",
    to: "media/icons/flags/flag-united-kingdom.png",
  },
  {
    url: "https://em-content.zobj.net/source/apple/391/flag-india_1f1ee-1f1f3.png",
    to: "media/icons/flags/flag-india.png",
  },
];

const deviconIcons = [
  "python/python-original",
  "java/java-original",
  "android/android-plain",
  "androidstudio/androidstudio-original",
  "mongodb/mongodb-original",
  "mongodb/mongodb-plain-wordmark",
  "express/express-original",
  "express/express-original-wordmark",
  "react/react-original",
  "react/react-original-wordmark",
  "nodejs/nodejs-original",
  "nodejs/nodejs-original-wordmark",
  "firebase/firebase-original",
  "firebase/firebase-original-wordmark",
  "html5/html5-original-wordmark",
  "css3/css3-original-wordmark",
  "git/git-original",
  "git/git-plain-wordmark",
  "javascript/javascript-plain",
  "mysql/mysql-original-wordmark",
  "linux/linux-original",
  "vercel/vercel-original",
  "vercel/vercel-original-wordmark",
  "ubuntu/ubuntu-original",
  "vscode/vscode-original",
  "jetbrains/jetbrains-original",
  "nextjs/nextjs-original",
  "amazonwebservices/amazonwebservices-original-wordmark",
  "tailwindcss/tailwindcss-original-wordmark",
  "sqlite/sqlite-original-wordmark",
  "fastapi/fastapi-original",
  "typescript/typescript-original",
  "vitejs/vitejs-original",
  "php/php-original",
  "denojs/denojs-original-wordmark",
  "redis/redis-original-wordmark",
  "postman/postman-original",
  "flask/flask-original",
  "github/github-original",
];

function target(rel) {
  return path.join(docs, rel);
}

async function alreadyThere(file) {
  try {
    const info = await stat(file);
    return info.size > 0;
  } catch {
    return false;
  }
}

async function download(url, rel, { headers = {}, force = false } = {}) {
  const file = target(rel);
  if (!force && (await alreadyThere(file))) return "cached";
  const response = await fetch(url, { headers: { "User-Agent": UA, ...headers } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  const body = Buffer.from(await response.arrayBuffer());
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, body);
  return `${body.length} bytes`;
}

for (const { url, to } of downloads) {
  console.log(`download ${to}`);
  await download(url, to);
}

for (const icon of deviconIcons) {
  const rel = `media/icons/devicon/${icon.replace("/", "-")}.svg`;
  const url = `https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/${icon}.svg`;
  console.log(`download ${rel}`);
  await download(url, rel);
}

// Material Symbols Rounded is a variable font. Ask Google Fonts for the
// stylesheet with a modern UA so it returns woff2, then keep both the CSS and
// the font locally under the same family name the markup already uses.
const materialQuery =
  "family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
const materialCssUrl = `https://fonts.googleapis.com/css2?${materialQuery}&display=block`;
const materialCss = await fetch(materialCssUrl, { headers: { "User-Agent": UA } }).then((r) => {
  if (!r.ok) throw new Error(`Google Fonts CSS: ${r.status}`);
  return r.text();
});
const materialFontUrl = materialCss.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/)?.[1];
if (!materialFontUrl) throw new Error("Could not find the Material Symbols woff2 URL");
console.log("download .cache/material-symbols-rounded.woff2");
const materialFont = await fetch(materialFontUrl, { headers: { "User-Agent": UA } }).then((r) => {
  if (!r.ok) throw new Error(`Material Symbols font: ${r.status}`);
  return r.arrayBuffer();
});
await mkdir(path.join(root, ".cache"), { recursive: true });
await writeFile(path.join(root, ".cache/material-symbols-rounded.woff2"), Buffer.from(materialFont));
await writeFile(
  path.join(docs, "css", "materialSymbolsRounded.css"),
  `/* Material Symbols Rounded (variable: opsz, wght, FILL, GRAD) — self-hosted. */
@font-face {
  font-family: "Material Symbols Rounded";
  font-style: normal;
  font-weight: 100 700;
  font-display: block;
  src: url("../media/fonts/material-symbols-rounded.subset.woff2") format("woff2");
}

.material-symbols-rounded {
  font-family: "Material Symbols Rounded";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}
`,
);

// Inter is referenced by the footer comment as a fallback; keep a local copy
// so uncommenting it never reintroduces a network dependency.
const interCss = await fetch(
  "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  { headers: { "User-Agent": UA } },
).then((r) => r.text());
const interFontUrl = interCss.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/)?.[1];
if (interFontUrl) {
  console.log("download media/fonts/inter.woff2");
  await download(interFontUrl, "media/fonts/inter.woff2", { force: true });
  await writeFile(
    path.join(docs, "css", "inter.css"),
    `/* Inter (variable) — self-hosted. */
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("../media/fonts/inter.woff2") format("woff2");
}
`,
  );
}

console.log("done");
