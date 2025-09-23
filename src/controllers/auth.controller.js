import logger from "../config/logger.js";
import { createUser } from "../services/auth.service.js";
import { cookies } from "../utils/cookies.js";
import { formValidationErrors } from "../utils/format.js";
import { jwt_token } from "../utils/jwt.js";
import { signUpSchema } from "../validations/auth.validations.js";

export const signup = async (req, res, next) => {
	try {
		const ValidationResult = signUpSchema.safeParse(req.body);

		if (!ValidationResult.success) {
			return res.status(400).json({
				error: "Validation failed",
				details: formValidationErrors(ValidationResult.error),
			});
		}

		const { name, email, password, role } = ValidationResult.data;

		const user = await createUser({ name, email, password, role });

		console.log(user);

		const token = jwt_token.sign({
			id: user.id,
			email: user.email,
			role: user.role,
		});

		cookies.set(res, "token", token);

		logger.info(`User has been created Successfully ${name}`);

		res.status(201).json({
			message: "User Registered",
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (e) {
		logger.error(`Signup error \n \n ${e}`);

		if (e.message === "User with this email already exists") {
			return res.status(409).json({
				error: "Email already exist",
			});
		}

		next(e);
	}
};
