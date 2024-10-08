import Navbar from '@/components/base/Navbar'
import AddKalesh from '@/components/kalesh/AddKalesh'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

async function dashboard() {

  const session:CustomSession | null = await getServerSession(authOptions)

  return (
    <div className='container'>
      <Navbar/>
      <div className='text-end mt-10'>
      <AddKalesh user={session?.user!}/>
      </div>
    </div>
  )
}

export default dashboard