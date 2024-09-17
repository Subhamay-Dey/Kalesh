import { z } from "zod";
export const registerSchema = z.object({
    name: z.string({ message: "Name is required" }).min(3, { message: "Username must be at least." }),
    email: z.string({ message: "Email is required" }).email({ message: "Please give a valid email." }),
    password: z.string({ message: "Password is required" }).min(6, { message: "Password must be 6 characters long" }),
    confirm_password: z.string({ message: "Confirm Password is required" }).min(6, { message: "Confirm Password must be 6 characters long" })
}).refine((data) => data.password === data.confirm_password, { message: "Confirm Password not matched", path: ["confirm_password"] });
