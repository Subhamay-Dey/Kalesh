import ForgetPassword from '@/components/auth/ForgetPassword'
import Link from 'next/link'
import React from 'react'

function forgetPassword() {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='w-[550px] bg-white rounded-xl px-10 py-5 shadow-md'>
            <h1 className='text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text text-center'>Kalesh</h1>
            <h1 className='text-3xl font-bold mt-4'>Forget Password ?</h1>
            <p className='my-4 text-md'>Don't worry it happens. Just enter your email below and we will send you the password reset link.</p>
                <ForgetPassword/>
            <p className='text-center mt-3'>
                Remembered your password, Back to Login?{""}
                <strong>
                    <Link href={"/login"}>Login</Link>
                </strong>
            </p>
        </div>
    </div>
  )
}

export default forgetPassword