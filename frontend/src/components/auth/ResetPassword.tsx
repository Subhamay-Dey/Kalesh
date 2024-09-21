"use client"

import React, { useEffect } from 'react'
import { registerAction } from '@/actions/authActions'
import SubmitButton from '@/components/common/SubmitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useFormState } from 'react-dom'
import { toast } from 'sonner'

function ResetPassword() {

    const initstate = {
        status: 0,
        message: "",
        errors: {},
    }

    const [state, formAction] = useFormState(registerAction, initstate)

    useEffect(() => {
        if (state.status === 500 ) {
            toast.error(state.message)
        } else if(state.status == 200) {
            toast.success(state.message)
        }
    })

  return (
    <form action={formAction}>
        <div className='mt-4'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' name='email' placeholder='Enter your email' readOnly/>
            <span className='text-red-500'>{state.errors?.email}</span>
        </div>
        <div className='mt-4'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' name='password' placeholder='Enter your password'/>
            <span className='text-red-500'>{state.errors?.password}</span>
        </div>
        <div className='mt-4'>
            <Label htmlFor='cpassword'>Confirm Password</Label>
            <Input id='cpassword' type='password' name='confirm_password' placeholder='Confirm your password'/>
            <span className='text-red-500'>{state.errors?.confirm_password}</span>
        </div>
        <div className='mt-4'>
            <SubmitButton/>
        </div>
    </form>
  )
}

export default ResetPassword