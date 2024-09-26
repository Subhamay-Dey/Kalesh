import { Router } from "express";
import { ZodError } from "zod";
import { formatError, imageValidator, uploadFile } from "../helper.js";
import { kaleshSchema } from "../validation/kaleshValidation.js";
import prisma from "../config/databse.js";
const router = Router();
router.get("/", async (req, res) => {
    try {
        const kalesh = await prisma.kalesh.findMany({ where: {
                user_id: req.user?.id,
            } });
        return res.status(200).json({ message: "Kalesh fetched successfully!", data: kalesh });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong." });
    }
});
router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const payload = kaleshSchema.parse(body);
        // Checking if image files exits
        if (req.files?.image) {
            const image = req.files.image;
            const validMessage = imageValidator(image.size, image.mimetype);
            if (validMessage) {
                return res.status(422).json({ errors: { image: validMessage } });
            }
            payload.image = await uploadFile(image);
        }
        else {
            return res.status(422).json({ errors: { image: "Image feild is required." } });
        }
        await prisma.kalesh.create({
            data: {
                ...payload,
                user_id: req.user?.id,
                expires_at: new Date(payload.expires_at),
                image: payload.image
            },
        });
        return res.json({ message: "kalesh created successfully." });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid data", errors });
        }
        return res.status(500).json({ message: "Something went wrong, please try again!" });
    }
});
export default router;
