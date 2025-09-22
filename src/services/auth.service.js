import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "../config/database.js";
import logger from "../config/logger.js";
export const hashPassword = async (password) => {
	try {
		return await bcrypt.hash(password, 10);
	} catch (e) {
		logger.error("Error hashing the password", e);
		throw new Error("Error handling");
	}
};

export const createUser = async ({ name, email, password, role = "user" }) => {
	try {
		const existingUser = db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (existingUser.length > 0) throw new Error("User already exist");

		const password_hash = await hashPassword(password);

		const [newUser] = await db
			.insert(users)
			.values({ name, email, password: password_hash, role })
			.returning({
				id: users.id,
				email: users.email,
				password: users.password,
				role: users.role,
				created_at: users.created_at,
			});
	} catch (e) {
		logger.error("Error creating the user the user", e);
		throw new Error("Error handling");
	}
};
