import express, { Router } from "express";
import { streamWebhook } from "../controllers/webhooks.controller.ts";
import { limitRequests } from "../middleware/rate-limit.ts";

export const webhooksRouter = Router();

// The signature is computed over the exact bytes sent, so this route must see the body
// before any JSON parser does.
webhooksRouter.post(
  "/stream",
  limitRequests(120, 60 * 1000),
  express.raw({ type: () => true, limit: "100kb" }),
  streamWebhook,
);
