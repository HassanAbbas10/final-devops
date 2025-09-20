import cookieParser from "cookie-parser";
import cors from "cors";
import express, { urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./config/logger.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express(urlencoded({ extended: true })));
app.use(
	morgan("combined", {
		stream: { write: (msg) => logger.info(msg.trim()) },
	}),
);

const PORT = 3000;

app.get("/", (_req, res) => {
	res.json({
		message: "Hello from the Abyss",
		success: true,
	});
});

app.use("/api/auth", authRoutes);

app.get("/health", (_req, res) => {
	res.status(200).json({
		success: true,
		timestamp: new Date().toDateString(),
		uptime: process.uptime().toLocaleString().concat(" seconds"),
	});
});

app.listen(PORT, () => {
	console.log(`App is listening on the http://localhost:${PORT}`);
});
