import { Router, Request, Response } from "express";
import prisma from "../config/databse.js";
import { authLimitter } from "../config/rateLimit.js";
import { ZodError } from "zod";
import { checkTimeDiff, formatError, renderEmailEjs } from "../helper.js";
import { forgetPasswordSchema, resetPasswordSchema } from "../validation/passwordValidation.js";
import bcrypt from "bcrypt";
import {v4 as uuid4} from "uuid";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";

const router = Router()

router.post("/forget-password", authLimitter, async (req:Request, res: Response) => {
    try {
        
        const body = req.body
        const payload = forgetPasswordSchema.parse(body)

        // Checking user existence of the email.

        let user = await prisma.user.findUnique({where:{email:payload.email}})

        if(!user || user == null) {
            return res.status(422).json({message: "Invalid data", errors:{
                email: "No user found with this email."
            }});
        }

        const salt = await bcrypt.genSalt(10)
        const token = await bcrypt.hash(uuid4(), salt)

        await prisma.user.update({
            data:{
                password_reset_token: token,
                token_send_at: new Date().toISOString()
            },
            where:{
                email:payload.email
            },
        })

        const url = `${process.env.CLIENT_APP_URL}/reset-password?email=${payload.email}&token=${token}`

        const html = await renderEmailEjs("forget-password", {url: url})
        await emailQueue.add(emailQueueName, {
            to: payload.email,
            subject: "Reset your password",
            body: html
        })

        return res.json({message: "Password reset link sent successfully! please checkyour email."})

    } catch (error) {
        if(error instanceof ZodError) {
            const errors = formatError(error)
            return res.status(422).json({message: "Invalid data", errors});
        }
        return res.status(500).json({message: "Something went wrong, please try again!"})
    }
})

router.post("/reset-password", async (req: Request, res: Response) => {
     try {
        
        const body = req.body
        const payload = resetPasswordSchema.parse(body)

        let user = await prisma.user.findUnique({where:{email: payload.email}})

        if(!user || user == null) {
            return res.status(422).json({message: "Invalid data", errors:{
                email: "LInk is not correct make sure you copied correct link."
            }})
        }

        if(user.password_reset_token != payload.token) {
            return res.status(422).json({
                message:"Invalid Data",
                error: {
                    token: "Token is not correct, copy it from the url, check your email!"
                }
            })
        }

        // Check 2 hour timeframe difference

        const hoursDiff = checkTimeDiff(user.token_send_at!)

        if(hoursDiff > 2) {
            return res.status(422).json({
                message: "Invalid Data",
                errors: {
                    email: "Password rest token has expired, Please go over the process again!"
                }
            })
        }

        // Update password with the new password

        const salt = await bcrypt.genSalt(10)
        const newPass = await bcrypt.hash(payload.password, salt)

        await prisma.user.update({data:{
            password: newPass,
            password_reset_token: null,
            token_send_at: null,
        }, where:{
            email: payload.email,
        }})

        return res.json({message: "Password rest sucessfully done, Please try to login now!"})

     } catch (error) {
        if(error instanceof ZodError) {
            const errors = formatError(error)
            return res.status(422).json({message: "Invalid data", errors});
        }
        return res.status(500).json({message: "Something went wrong, please try again!"})
     }
})

export default router