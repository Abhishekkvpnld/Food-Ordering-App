import express from "express";
import { createCheckoutSession, getOrderDetails, stripeWebhookHandler } from "../controller/orderController";
import { jwtCheck, jwtParse } from "../middlewares/Auth";

const router = express.Router();

router.post("/checkout/create-checkout-session",jwtCheck,jwtParse,createCheckoutSession);

//Stripe webhook
router.post("/checkout/webhook",stripeWebhookHandler);

router.get("/all-orders",jwtCheck,jwtParse,getOrderDetails);

export default router; 