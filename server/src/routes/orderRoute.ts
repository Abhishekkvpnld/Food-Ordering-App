import express from "express";
import { createCheckoutSession, stripeWebhookHandler } from "../controller/orderController";
import { jwtCheck, jwtParse } from "../middlewares/Auth";

const router = express.Router();

router.post("/checkout/create-checkout-session",jwtCheck,jwtParse,createCheckoutSession);

//Stripe webhook
router.post("/checkout/webhook",stripeWebhookHandler);

export default router;