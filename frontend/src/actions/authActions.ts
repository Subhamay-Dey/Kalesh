"use server"
import { REGISTER_URL } from "@/lib/apiEndPoints"
import axios, { AxiosError } from "axios"

export async function registerAction(prevState: any, formdata: FormData) {

    console.log("The form data is", formdata);

    try {
        const {data} = await axios.post(REGISTER_URL, {
            name: formdata.get("name"),
            email: formdata.get("email"),
            password: formdata.get("password"),
            confirm_password: formdata.get("confirm_password"),
        })
        
        return {
            status: 200,
            message: data?.message ?? "Account created successfully! Please check your email.",
            errors: {}
        }

    } catch (error) {

        if(error instanceof AxiosError) {
            if(error.response?.status === 422) {
                return {
                    status: 422,
                    message: error.response?.data?.message,
                    errors: error.response?.data?.errors,
                }
            }
        }

        return {
            status: 500,
            message: "Something went wrong, please try again!",
            errors: {},
        }
    
    }
}