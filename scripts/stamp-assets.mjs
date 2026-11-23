#!/usr/bin/env node
/**
 * Add a content version query to local CSS/JS URLs so a deploy is picked up
 * immediately even when a browser still has an older copy cached.
 *
 * Usage: node scripts/stamp-assets.mjs 20261124b
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs");
const version = process.argv[2] || new Date().toISOString().slice(0, 10).replaceAll("-", "");

const htmlAsset = /(\b(?:href|src)=")((?:\.\/)?(?:css|js)\/[^"?#]+\.(?:css|js))(\?v=[^"]*)?(")/g;
const jsImport = /(\bfrom\s*|\bimport\s*\(\s*)(["'])((?:\.{1,2}\/)[^"'?#]+\.js)(?:\?v=[^"']*)?\2/g;

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "packages") continue;
      await walk(full);
    } else if (/\.(html|js)$/.test(entry.name)) {
      const text = await readFile(full, "utf8");
      const updated =
        entry.name.endsWith(".html")
          ? text.replace(htmlAsset, (_m, before, url, _old, after) => `${before}${url}?v=${version}${after}`)
          : text.replace(jsImport, (_m, before, quote, spec) => `${before}${quote}${spec}?v=${version}${quote}`);
      if (updated !== text) {
        await writeFile(full, updated, "utf8");
        console.log(`stamped ${path.relative(docs, full)}`);
      }
    }
  }
}

await walk(docs);
