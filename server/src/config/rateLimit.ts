import {rateLimit} from "express-rate-limit"

export const appLimitter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutes
	limit: 100, 
	standardHeaders: 'draft-7',
	legacyHeaders: false,
})

export const authLimitter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutes
	limit: 20,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
})