import { Router } from "express";
import { downloadFile, downloadStatus } from "../controllers/downloads.controller.ts";
import { limitRequests } from "../middleware/rate-limit.ts";

export const downloadsRouter = Router();

// The token travels in the body, so it never lands in an access log.
downloadsRouter.post("/status", limitRequests(30, 60 * 1000), downloadStatus);
downloadsRouter.post("/file", limitRequests(10, 60 * 1000), downloadFile);
