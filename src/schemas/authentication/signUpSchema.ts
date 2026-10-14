import { z } from "zod";

export const signUpSchema = z
    .object({
        full_name: z
            .string()
            .min(1, "Full name is required")
            .max(
                55,
                "Full name is too long, you can use just your first and last name.",
            ),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Please enter a valid email address"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^0-9A-Za-z]).{8,32}$/,
                {
                    message:
                        "Password must be 8-32 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
                },
            ),
        confirm_password: z.string().min(1, "Please confirm your password"),
        user_name: z
            .string()
            .min(1, "Please a valid username is required")
            .max(55, "User name is too long."),
        institution_id: z.number("Please select your school").optional(),
        bio: z.string().min(1, "Please provide a valid bio").optional(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"],
    });

export type SignUpFormData = z.infer<typeof signUpSchema>;
