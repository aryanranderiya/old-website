#!/usr/bin/env node
/**
 * Static audit for the archived portfolio.
 *
 * Reports:
 *   - local references (href/src/url()/import) that do not resolve on disk
 *   - external http(s) references that would make the bundle depend on a CDN
 *
 * Usage: node scripts/check-archive.mjs [--strict]
 * Exits non-zero on missing local files, or on any external reference when
 * --strict is passed (used before deploying the self-contained bundle).
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs");
const strict = process.argv.includes("--strict");

const TAG_RE = /<[^>]+>/g;
const ATTR_RE = /\b(?:href|src|poster|action)\s*=\s*["']([^"']+)["']/gi;
const SRCSET_RE = /\bsrcset\s*=\s*["']([^"']+)["']/gi;
const CSS_URL_RE = /url\(\s*(?:["']?)([^"')]+)(?:["']?)\s*\)/gi;
const JS_IMPORT_RE = /(?:\bfrom\s*|\bimport\s+)["']([^"']+)["']/g;
const CANONICAL_HOST = "old.aryanranderiya.com";

const skipDirs = new Set(["node_modules", ".git"]);
const localRefs = new Map();
const externalRefs = new Map();

function addRef(ref, file, kind) {
  if (!ref || /^(?:#|mailto:|tel:|data:|javascript:|blob:)/i.test(ref)) return;
  if (ref.startsWith("//")) return;
  if (/^https?:/i.test(ref)) {
    const entry = externalRefs.get(ref) ?? { files: new Set(), count: 0 };
    entry.files.add(path.relative(root, file));
    entry.count += 1;
    externalRefs.set(ref, entry);
    return;
  }
  const clean = decodeURIComponent(ref.split(/[?#]/)[0]);
  if (!clean) return;
  // Site-root-relative paths start at docs/, everything else relative to the file.
  const resolved = clean.startsWith("/")
    ? path.join(docs, clean.slice(1))
    : path.resolve(path.dirname(file), clean);
  const entry = localRefs.get(resolved) ?? { files: new Set(), refs: new Set() };
  entry.files.add(path.relative(root, file));
  entry.refs.add(ref);
  localRefs.set(resolved, entry);
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (skipDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (![".html", ".css", ".js"].includes(ext)) continue;
    const text = await readFile(full, "utf8");
    if (ext === ".html") {
      for (const tag of text.match(TAG_RE) ?? []) {
        for (const match of tag.matchAll(ATTR_RE)) addRef(match[1].trim(), full, "html");
        for (const match of tag.matchAll(SRCSET_RE)) {
          for (const part of match[1].split(",")) addRef(part.trim().split(/\s+/)[0], full, "html");
        }
      }
      // Inline <style> blocks also contain url() references.
      for (const match of text.matchAll(CSS_URL_RE)) addRef(match[1].trim(), full, "css");
    } else if (ext === ".css") {
      for (const match of text.matchAll(CSS_URL_RE)) addRef(match[1].trim(), full, "css");
      for (const match of text.matchAll(/@import\s+["']([^"']+)["']/gi)) addRef(match[1].trim(), full, "css");
    } else if (ext === ".js") {
      for (const match of text.matchAll(JS_IMPORT_RE)) addRef(match[1].trim(), full, "js");
    }
  }
}

await walk(docs);

async function readable(file) {
  try {
    await readFile(file);
    return true;
  } catch {
    return false;
  }
}

const missing = [];
for (const [resolved, info] of [...localRefs.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  // Clean URLs: /SoftwareProjects and / are served from .html files.
  const candidates = [resolved, `${resolved}.html`, path.join(resolved, "index.html")];
  if (candidates.some((candidate) => candidate.endsWith("/index.html"))) candidates.push(resolved);
  let found = false;
  for (const candidate of candidates) {
    if (await readable(candidate)) {
      found = true;
      break;
    }
  }
  // Older font formats are fallbacks next to a woff2; browsers only fetch the
  // modern one, so don't report them as missing.
  if (!found && /\.(ttf|otf|woff)$/i.test(resolved)) {
    found = await readable(resolved.replace(/\.(ttf|otf|woff)$/i, ".woff2"));
  }
  if (!found) missing.push([resolved, info]);
}

const ignoredHosts = new Set([CANONICAL_HOST, "www." + CANONICAL_HOST]);
const external = [...externalRefs.entries()]
  .filter(([url]) => {
    try {
      return !ignoredHosts.has(new URL(url).host);
    } catch {
      return true;
    }
  })
  .sort((a, b) => b[1].count - a[1].count);

console.log(`Local references: ${localRefs.size}`);
console.log(`Missing local files: ${missing.length}`);
for (const [resolved, info] of missing) {
  console.log(`  MISSING  ${path.relative(docs, resolved)}`);
  console.log(`           refs: ${[...info.refs].join(", ")}`);
  console.log(`           used by: ${[...info.files].join(", ")}`);
}

console.log(`\nExternal references: ${external.length}`);
for (const [url, info] of external) {
  console.log(`  x${String(info.count).padEnd(3)} ${url}`);
  console.log(`        ${[...info.files].join(", ")}`);
}

if (missing.length > 0) process.exitCode = 1;
if (strict && external.length > 0) process.exitCode = 2;
