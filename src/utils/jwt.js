import jwt from "jsonwebtoken";

import logger from "../config/logger.js";

const JWT_SECRET = process.env.JWT_SECRET || "Welcome to Abyss";
const JWT_EXPIRES_IN = "1d";

export const jwt_token = {
	sign: (payload) => {
		try {
			return jwt.sign(payload, JWT_SECRET, {
				algorithm: "RS512",
				expiresIn: JWT_EXPIRES_IN,
			});
		} catch (error) {
			logger("Error while signing the JWT Token", error);
			throw new Error("Error while signing the JWT Token", error);
		}
	},

	verify: (token) => {
		try {
			return jwt.verify(token, JWT_SECRET);
		} catch (error) {
			logger("Error while verifying the JWT Token", error);
			throw new Error("Error while veerifying the JWT Token", error);
		}
	},
};
