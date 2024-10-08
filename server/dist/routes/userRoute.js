"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const Auth_1 = require("../middlewares/Auth");
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
// api/user/
router.get("/get-user", Auth_1.jwtCheck, Auth_1.jwtParse, userController_1.getCurrentUser);
router.post("/create-user", Auth_1.jwtCheck, userController_1.currentUser);
router.put("/update-user", Auth_1.jwtCheck, Auth_1.jwtParse, validation_1.validateUserRequest, userController_1.updateCurrentUser);
exports.default = router;
