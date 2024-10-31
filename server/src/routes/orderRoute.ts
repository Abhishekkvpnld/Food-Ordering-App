import express from "express";
import { createCheckoutSession } from "../controller/orderController";
import { jwtCheck, jwtParse } from "../middlewares/Auth";

const router = express.Router();

router.post("/checkout/create-checkout-session",jwtCheck,jwtParse,createCheckoutSession);

export default router;