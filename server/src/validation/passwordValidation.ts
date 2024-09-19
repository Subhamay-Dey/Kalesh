import { z } from "zod"

export const forgetPasswordSchema = z.object({
    email: z
        .string({message: "Email is required."})
        .email({message: "Email must be the correct one."})
})