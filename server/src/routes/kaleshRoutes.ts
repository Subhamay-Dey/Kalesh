import {Router, Request, Response} from "express"
import { ZodError } from "zod";
import { formatError } from "../helper.js";
import { kaleshSchema } from "../validation/kaleshValidation.js";

const router = Router()

router.post("/", async (req: Request, res: Response) => {
    try {
        const body = req.body
        const payload = kaleshSchema.parse(body)
    } catch (error) {
        if(error instanceof ZodError) {
            const errors = formatError(error)
            return res.status(422).json({message: "Invalid data", errors});
        }
        return res.status(500).json({message: "Something went wrong, please try again!"})
    }
})

export default router