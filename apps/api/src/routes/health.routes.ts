import { Router } from "express";
import { healthCheck } from "../controllers/health.controller.ts";

export const healthRouter = Router();

healthRouter.get("/", healthCheck);
