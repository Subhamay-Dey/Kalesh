import { Router } from "express";
import { ZodError } from "zod";
import { formatError, imageValidator, removeImage, uploadFile } from "../helper.js";
import { kaleshSchema } from "../validation/kaleshValidation.js";
import prisma from "../config/databse.js";
const router = Router();
router.get("/", async (req, res) => {
    try {
        const kalesh = await prisma.kalesh.findMany({ where: {
                user_id: req.user?.id,
            },
            orderBy: {
                id: "desc"
            } });
        return res.status(200).json({ message: "Kalesh fetched successfully!", data: kalesh });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong." });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const kalesh = await prisma.kalesh.findUnique({ where: {
                id: Number(id)
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
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const payload = kaleshSchema.parse(body);
        // Checking if image files exits
        if (req.files?.image) {
            const image = req.files.image;
            const validMessage = imageValidator(image.size, image.mimetype);
            if (validMessage) {
                return res.status(422).json({ errors: { image: validMessage } });
            }
            // Get old image exist
            const kalesh = await prisma.kalesh.findUnique({
                select: {
                    image: true,
                    id: true,
                },
                where: {
                    id: Number(id)
                }
            });
            if (kalesh) {
                removeImage(kalesh?.image);
            }
            payload.image = await uploadFile(image);
        }
        await prisma.kalesh.update({
            where: {
                id: Number(id)
            },
            data: {
                ...payload,
                expires_at: new Date(payload.expires_at),
            },
        });
        return res.json({ message: "kalesh updated successfully." });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid data", errors });
        }
        return res.status(500).json({ message: "Something went wrong, please try again!" });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const kalesh = await prisma.kalesh.findUnique({
            select: {
                image: true,
                id: true,
            },
            where: {
                id: Number(id)
            }
        });
        if (kalesh) {
            removeImage(kalesh?.image);
        }
        await prisma.kalesh.delete({ where: {
                id: Number(id)
            } });
        return res.status(200).json({ message: "Kalesh deleted successfully!", data: kalesh });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong." });
    }
});
export default router;
