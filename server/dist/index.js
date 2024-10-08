"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = __importDefault(require("./config/database"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
// Routes
app.use("/api/user", userRoute_1.default);
app.get("/", (req, res) => {
    res.send("Server running...🚀🚀");
});
// Server
const PORT = process.env.PORT || 4000;
(0, database_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT} 🚀🚀`);
    });
});
