import { Router } from "express";
import { startCheckout } from "../controllers/checkout.controller.ts";
import { limitRequests } from "../middleware/rate-limit.ts";

export const checkoutRouter = Router();

checkoutRouter.post("/", limitRequests(5, 10 * 60 * 1000), startCheckout);
