import express, { urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./config/logger.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express(urlencoded({ extended: true })));
app.use(
	morgan("combined", {
		stream: { write: (message) => logger.info(message.trim()) },
	}),
);

const PORT = 3000;

app.get("/", (req, res) => {
	res.json({
		message: "Hello from the devops",
		success: true,
	});
});

app.listen(PORT, () => {
	console.log(`App is listening on the http://localhost:${PORT}`);
});
