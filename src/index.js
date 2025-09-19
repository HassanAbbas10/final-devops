import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

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
