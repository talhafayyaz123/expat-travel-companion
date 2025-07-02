import { z } from "zod";

const SignupSchema = z
  .object({
    firstName: z.string().min(1, { message: "Please enter your first name" }),
    lastName: z.string().min(1, { message: "Please enter your last name" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Enter a valid email" }),
    promoCode: z.string().optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // This targets the `confirm_password` field
  });

// Type inference from schema
export type RegistrationFormData = z.infer<typeof SignupSchema>;
export default SignupSchema;
