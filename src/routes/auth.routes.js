import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";

const router = Router();

router.post("/sign-up", signup);

router.post("/sign-in", (_req, res) => {
	res.send("POST api/auth/sign-in response");
});

router.post("/sign-out", (_req, res) => {
	res.send("POST api/auth/sign-out response");
});

export default router;
