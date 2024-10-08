import Navbar from '@/components/base/Navbar'
import AddKalesh from '@/components/kalesh/AddKalesh'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { fetchkalesh } from '../fetch/kaleshfetch'
import KaleshCard from '@/components/kalesh/KaleshCard'

async function dashboard() {

  const session:CustomSession | null = await getServerSession(authOptions)
  const kaleshs:Array<KaleshType> | [] = await fetchkalesh(session?.user?.token!)

  console.log("The kalesh are", kaleshs);
  
  return (
    <div className='container'>
      <Navbar/>
      <div className='text-end mt-10'>
      <AddKalesh user={session?.user!}/>
      </div>
      <div className='flex space-x-5 space-y-4 items-center flex-wrap'>
        {kaleshs.length > 0 && kaleshs.map((item, index) => (
          <KaleshCard kalesh={item} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default dashboard