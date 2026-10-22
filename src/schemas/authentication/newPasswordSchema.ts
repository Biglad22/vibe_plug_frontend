import z from "zod";
import { OTPSchema } from "../generics";

export const newPasswordSchema = z.object({
    email: z.email("Please enter a valid email address"),
    token: OTPSchema,
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^0-9A-Za-z]).{8,32}$/, {
            message:
                "Password must be 8-32 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
        }),
    confirm_password: z.string().min(1, "Please confirm your password"),
});
