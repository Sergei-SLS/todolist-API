import { z } from "zod/v4"

export const loginSchema = z.object({
  email: z.email({ error: "Incorrect email address" }),
  password: z.string().min(3, "Password must be at least 3 characters long").nonempty("Password is required"),
  rememberMe: z.boolean(),
})

export type LoginInputs = z.infer<typeof loginSchema>
