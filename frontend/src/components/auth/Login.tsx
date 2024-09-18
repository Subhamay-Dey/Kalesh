import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import SubmitButton from '../common/SubmitButton'

function Login() {
  return (
    <form>
    <div className='mt-4'>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='email' name='email' placeholder='Enter your email'/>
    </div>
    <div className='mt-4'>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' type='password' name='password' placeholder='Enter your password'/>
    </div>
    <div className='text-right font-bold'>
        <Link href={"/forget-password"}>Forget Password?</Link>
    </div>
    <div className='mt-4'>
        <SubmitButton/>
    </div>
</form>
  )
}

export default Login