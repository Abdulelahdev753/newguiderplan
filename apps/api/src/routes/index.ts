import { Router } from "express";
import { checkoutRouter } from "./checkout.routes.ts";
import { downloadsRouter } from "./downloads.routes.ts";
import { healthRouter } from "./health.routes.ts";

export const apiRouter = Router();

// Answers carry order details and one-time links; nothing may keep a copy.
apiRouter.use((_req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

apiRouter.use("/health", healthRouter);
apiRouter.use("/checkout", checkoutRouter);
apiRouter.use("/downloads", downloadsRouter);
