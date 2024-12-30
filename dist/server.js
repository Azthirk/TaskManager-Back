"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options_1 = __importDefault(require("./swagger/options"));
// Load the environment variables
dotenv_1.default.config();
// Create an Express instance
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT, 10) || 3000;
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017')
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.log("Error connecting to the database", err));
// Middleware to allow requests from other domains (CORS)
app.use((0, cors_1.default)());
// Middleware to parse the request body as JSON
app.use(express_1.default.json());
// Use the defined routes
app.use('/api', routes_1.default);
// Use SwaggerUi
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(options_1.default));
// Start the server
app.listen(port, () => {
    console.log(`Server running on ${process.env.MONGO_URI}`);
});
