import { cp, mkdir, rm } from "node:fs/promises";

const staticFiles = [
  "index.html", "styles.css", "app.js", "languages.js", "content.js",
  "sw.js", "manifest.webmanifest", "favicon.svg", "favicon-32.png",
  "favicon-192.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png",
  "social-preview.png", "social-preview.svg", "robots.txt", "sitemap.xml"
];

await rm("dist", { recursive: true, force: true });
await mkdir("dist");
await Promise.all(staticFiles.map(file => cp(file, "dist/" + file)));
