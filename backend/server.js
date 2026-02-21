import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import apiV1 from "./routes/routes.index.js";
import { connectDB } from "./configs/mongodb.js";
import { swaggerSpec } from "./configs/swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({origin: "*"}));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Primetrade.ai Assessment" });
});

app.get("/api-docs-json", (req, res) => {
res.json(swaggerSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", apiV1);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on PORT: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    });