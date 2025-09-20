import { Router } from "express";

const router = Router();

router.post("/sign-up", (_req, res) => {
	res.send("POST api/auth/sign-up response");
});

router.post("/sign-in", (_req, res) => {
	res.send("POST api/auth/sign-in response");
});

router.post("/sign-out", (_req, res) => {
	res.send("POST api/auth/sign-out response");
});

export default router;
