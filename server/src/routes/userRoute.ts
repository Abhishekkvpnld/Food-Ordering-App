import express from "express";
import { currentUser } from "../controller/userController";

const router = express.Router();

// api/user/
router.post("/create-user",currentUser);

export default router;
