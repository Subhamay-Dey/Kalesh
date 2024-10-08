import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Env from "./env"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (img:string):string => {
  return `${Env.BACKEND_APP_URL}/images/${img}`
}