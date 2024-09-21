"use client"

import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SubmitButton from '../common/SubmitButton'
import { useFormState } from 'react-dom'
import { ForgetPasswordAction } from '@/actions/authActions'
import { toast } from 'sonner'

function ForgetPassword() {

    const initstate = {
        status: 0,
        message: "",
        errors: {},
    }

    const [state, formAction] = useFormState(ForgetPasswordAction, initstate)

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
        <Input id='email' type='email' name='email' placeholder='Enter your email'/>
        <span className='text-red-500'>{state.errors?.email}</span>
    </div>
    <div className='mt-4'>
        <SubmitButton/>
    </div>
    </form>
  )
}

export default ForgetPassword