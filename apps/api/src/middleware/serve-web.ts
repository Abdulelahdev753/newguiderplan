import { existsSync } from "node:fs";
import path from "node:path";
import express, { Router } from "express";

const DAY = 24 * 60 * 60;

/** How long a browser may keep a file, by where it lives in the export. */
function cacheControl(relativePath: string): string {
  // Next names these files after their contents, so a given name never changes.
  if (relativePath.startsWith("_next/static/")) return `public, max-age=${365 * DAY}, immutable`;
  if (relativePath.startsWith("flags/")) return `public, max-age=${30 * DAY}`;
  if (relativePath.startsWith("images/")) return `public, max-age=${DAY}`;
  // Pages and everything else are re-checked on each visit, so a deploy shows at once.
  return "no-cache";
}

/** Serves the Next.js static export, falling back to its 404 page. */
export function serveWeb(dir: string): Router {
  const router = Router();

  // Next exports /en as en.html next to an en/ folder of page data. Left alone, the
  // folder wins and the page is never found, so point such requests at the file.
  router.use((req, _res, next) => {
    const isPage = (req.method === "GET" || req.method === "HEAD") && !path.extname(req.path);
    if (isPage && req.path !== "/") {
      const page = `${req.path.replace(/\/+$/, "")}.html`;
      const file = path.join(dir, page);
      if (file.startsWith(dir + path.sep) && existsSync(file)) {
        req.url = page + req.url.slice(req.path.length);
      }
    }
    next();
  });

  // `extensions` maps /about to about.html, which is how Next exports routes.
  router.use(
    express.static(dir, {
      extensions: ["html"],
      setHeaders(res, filePath) {
        const relativePath = path.relative(dir, filePath).split(path.sep).join("/");
        res.setHeader("Cache-Control", cacheControl(relativePath));
      },
    }),
  );

  router.use((_req, res) => {
    res.status(404).sendFile(path.join(dir, "404.html"));
  });

  return router;
}
