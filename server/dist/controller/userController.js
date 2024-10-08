"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCurrentUser = exports.currentUser = exports.getCurrentUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const currentUser = yield userModel_1.default.findOne({ _id: userId });
        if (!currentUser)
            throw new Error("User not found...🤦");
        res.status(200).json({
            success: true,
            error: false,
            data: currentUser,
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            success: false,
            message: error.message,
        });
    }
});
exports.getCurrentUser = getCurrentUser;
const currentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { auth0Id } = req.body;
        if (!auth0Id) {
            throw new Error("Auth is required...🤦‍♂️");
        }
        const existingUser = yield userModel_1.default.findOne({ auth0Id });
        if (!existingUser) {
            const newUser = new userModel_1.default(req.body);
            yield newUser.save();
            res.status(200).json({
                error: false,
                success: true,
                data: newUser,
                message: "User found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: true,
            success: false,
            message: error.message,
        });
    }
});
exports.currentUser = currentUser;
const updateCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, addressLine1, city, country } = req.body;
        const user = yield userModel_1.default.findById(req === null || req === void 0 ? void 0 : req.userId);
        if (!user)
            throw new Error("User not found...🤦‍♂️");
        user.name = name;
        user.city = city;
        user.addressLine1 = addressLine1;
        user.country = country;
        yield user.save();
        res.status(200).json({
            success: true,
            error: false,
            message: "User profile updated...✅",
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            success: false,
            message: error.message,
        });
    }
});
exports.updateCurrentUser = updateCurrentUser;
