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
const restaurantRoute_1 = __importDefault(require("./routes/restaurantRoute"));
const allRestaurantRoute_1 = __importDefault(require("./routes/allRestaurantRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const cloudinary_1 = require("cloudinary");
dotenv_1.default.config();
const app = (0, express_1.default)();
// cloudinary setup
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Middleware
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/api/order/checkout/webhook", express_1.default.raw({ type: "*/*" }));
app.use(express_1.default.json());
// Routes
app.use("/api/user", userRoute_1.default);
app.use("/api/restaurant", restaurantRoute_1.default);
app.use("/api/allRestaurant", allRestaurantRoute_1.default);
app.use("/api/order", orderRoute_1.default);
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
