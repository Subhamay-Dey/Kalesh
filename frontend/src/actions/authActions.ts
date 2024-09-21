"use server"
import { CHECK_CREDENTIALS_URL, FORGET_PASSWORD_URL, REGISTER_URL, RESET_PASSWORD_URL } from "@/lib/apiEndPoints"
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

export async function loginAction(prevState: any, formdata: FormData) {

    console.log("The form data is", formdata);

    try {
        const {data} = await axios.post(CHECK_CREDENTIALS_URL, {
            email: formdata.get("email"),
            password: formdata.get("password"),
        })
        
        return {
            status: 200,
            message: data?.message ?? "Logging you in.",
            errors: {},
            data: {
                email: formdata.get("email"),
                password: formdata.get("password"),
            }
        }

    } catch (error) {

        if(error instanceof AxiosError) {
            if(error.response?.status === 422) {
                return {
                    status: 422,
                    message: error.response?.data?.message,
                    errors: error.response?.data?.errors,
                    data: {}
                }
            }
        }

        return {
            status: 500,
            message: "Something went wrong, please try again!",
            errors: {},
            data: {}
        }
    
    }
}

export async function ForgetPasswordAction(prevState: any, formdata: FormData) {

    console.log("The form data is", formdata);

    try {
        const {data} = await axios.post(FORGET_PASSWORD_URL, {
            email: formdata.get("email"),
        })
        
        return {
            status: 200,
            message: data?.message ?? "We have emailed you the password reset link.",
            errors: {},
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

export async function resetPasswordAction(prevState: any, formdata: FormData) {

    console.log("The form data is", formdata);

    try {
        const {data} = await axios.post(RESET_PASSWORD_URL, {
            email: formdata.get("email"),
            password: formdata.get("password"),
            confirm_password: formdata.get("confirm_password"),
            token: formdata.get("token")
        })
        
        return {
            status: 200,
            message: data?.message ?? "Password reset succesfully. please login now!",
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