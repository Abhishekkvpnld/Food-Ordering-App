import express from "express";
import { currentUser } from "../controller/userController";
import { jwtCheck } from "../middlewares/Auth";

const router = express.Router();

// api/user/
router.post("/create-user",jwtCheck,currentUser);

export default router;
