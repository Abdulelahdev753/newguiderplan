import { existsSync } from "node:fs";
import compression from "compression";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { env } from "./config/env.ts";
import { errorHandler } from "./middleware/error-handler.ts";
import { notFound } from "./middleware/not-found.ts";
import { serveWeb } from "./middleware/serve-web.ts";
import { apiRouter } from "./routes/index.ts";
import { webhooksRouter } from "./routes/webhooks.routes.ts";

export function createApp(): Express {
  const app = express();

  app.disable("x-powered-by");
  // Rate limits count requests per visitor IP, which sits behind the proxy's own.
  app.set("trust proxy", env.trustProxy);

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          defaultSrc: ["'self'"],
          // The Next.js export starts itself from inline scripts.
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:"],
          fontSrc: ["'self'", "data:"],
          connectSrc: ["'self'"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          frameAncestors: ["'none'"],
          ...(env.isProduction ? { upgradeInsecureRequests: [] } : {}),
        },
      },
      // The download page's address carries the buyer's token; never pass it on.
      referrerPolicy: { policy: "no-referrer" },
    }),
  );

  // Pages, scripts and styles shrink to about a quarter of their size on the wire.
  app.use(compression());

  // Mounted ahead of express.json: the webhook verifies a signature over the raw body.
  app.use("/api/webhooks", webhooksRouter);

  app.use(express.json({ limit: "10kb" }));

  if (env.corsOrigins.length > 0) {
    app.use("/api", cors({ origin: env.corsOrigins }));
  }

  app.use("/api", apiRouter);
  app.use("/api", notFound);

  if (existsSync(env.webDistDir)) {
    app.use(serveWeb(env.webDistDir));
  } else if (env.isProduction) {
    console.warn(`Frontend build not found at ${env.webDistDir}; serving the API only.`);
  }

  app.use(errorHandler);

  return app;
}
