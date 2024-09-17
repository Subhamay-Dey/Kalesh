import {Router, Request, Response} from "express";
import { registerSchema } from "../validation/authValidation.js";
import { ZodError } from "zod";
import { formatError } from "../helper.js";
import prisma from "../config/databse.js";
import bcrypt from "bcrypt";

const router = Router();

// Register route

router.post("/register", async (req:Request, res:Response) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);

        let user = await prisma.user.findUnique({where: {
            email: payload.email
        }})
        if(user) {
            return res.status(422).json({
                errors:{
                    email:"Email already taken, please use another one."
                },
            })
        }

        // Encypt the password
        const salt = await bcrypt.genSalt(10)
        payload.password = await bcrypt.hash(payload.password, salt)

        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password,
            }
        })
        return res.json({message: "User created successfully"})

    } catch (error) {
        if(error instanceof ZodError) {
            const errors = formatError(error)
            return res.status(422).json({message: "Invalid data", errors});
        }
        return res.status(500).json({message: "Something went wrong, please try again!"})
    }
})

export default router;