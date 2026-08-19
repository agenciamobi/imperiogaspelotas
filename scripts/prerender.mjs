import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const serverDir = path.join(distDir, "server");
const serverEntry = path.join(serverDir, "entry-server.js");
const clientTemplatePath = path.join(distDir, "index.html");

const template = await readFile(clientTemplatePath, "utf8");
const { getSeo, prerenderRoutes, render } = await import(pathToFileURL(serverEntry).href);

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function replaceTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

function applySeo(html, seo) {
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const canonical = escapeHtml(seo.canonical);
  const ogType = escapeHtml(seo.ogType);

  let output = html;
  output = replaceTag(output, /<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  output = replaceTag(
    output,
    /<meta\s+name="description"[\s\S]*?>/i,
    `<meta name="description" content="${description}" />`,
  );
  output = replaceTag(
    output,
    /<link\s+rel="canonical"[\s\S]*?>/i,
    `<link rel="canonical" href="${canonical}" />`,
  );
  output = replaceTag(
    output,
    /<meta\s+property="og:type"[\s\S]*?>/i,
    `<meta property="og:type" content="${ogType}" />`,
  );
  output = replaceTag(
    output,
    /<meta\s+property="og:url"[\s\S]*?>/i,
    `<meta property="og:url" content="${canonical}" />`,
  );
  output = replaceTag(
    output,
    /<meta\s+property="og:title"[\s\S]*?>/i,
    `<meta property="og:title" content="${title}" />`,
  );
  output = replaceTag(
    output,
    /<meta\s+property="og:description"[\s\S]*?>/i,
    `<meta property="og:description" content="${description}" />`,
  );
  output = replaceTag(
    output,
    /<meta\s+name="twitter:title"[\s\S]*?>/i,
    `<meta name="twitter:title" content="${title}" />`,
  );
  output = replaceTag(
    output,
    /<meta\s+name="twitter:description"[\s\S]*?>/i,
    `<meta name="twitter:description" content="${description}" />`,
  );

  return output;
}

for (const route of prerenderRoutes) {
  const appHtml = render(route);
  const seo = getSeo(route);
  let html = applySeo(template, seo);
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const targetDir = route === "/" ? distDir : path.join(distDir, route.replace(/^\//, ""));
  await mkdir(targetDir, { recursive: true });
  await writeFile(path.join(targetDir, "index.html"), html, "utf8");
}

await rm(serverDir, { recursive: true, force: true });
console.log(`[prerender] generated ${prerenderRoutes.length} public routes`);
