import {Router, Request, Response} from "express"
import { date, ZodError } from "zod";
import { formatError, imageValidator, uploadFile } from "../helper.js";
import { kaleshSchema } from "../validation/kaleshValidation.js";
import { UploadedFile } from "express-fileupload";
import prisma from "../config/databse.js";

const router = Router()

router.post("/", async (req: Request, res: Response) => {
    try {

        const body = req.body
        const payload = kaleshSchema.parse(body)

        // Checking if image files exits
        if(req.files?.image) {
            const image = req.files.image as UploadedFile
            const validMessage = imageValidator(image.size, image.mimetype)
            if(validMessage) {
                return res.status(422).json({errors: {image: validMessage}})
            }
            payload.image = await uploadFile(image)
        } else {
            return res.status(422).json({errors: {image: "Image feild is required."}})
        }

        await prisma.kalesh.create({
            data:{
                ...payload,
                user_id: req.user?.id!,
                expires_at: new Date(payload.expires_at),
                image: payload.image!
            },
        })
        return res.json({message: "kalesh created successfully."})

    } catch (error) {
        if(error instanceof ZodError) {
            const errors = formatError(error)
            return res.status(422).json({message: "Invalid data", errors});
        }
        return res.status(500).json({message: "Something went wrong, please try again!"})
    }
})

export default router   