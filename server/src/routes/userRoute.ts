import express from "express";
import { currentUser, updateCurrentUser } from "../controller/userController";
import { jwtCheck, jwtParse } from "../middlewares/Auth";
import { validateUserRequest } from "../middlewares/validation";

const router = express.Router();

// api/user/
router.post("/create-user", jwtCheck, currentUser);
router.put(
  "/update-user",
  jwtCheck,
  jwtParse,
  validateUserRequest,
  updateCurrentUser
);

export default router;
