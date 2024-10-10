"use client"
import React from 'react'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image'
import { getImageUrl } from '@/lib/utils'
import { Button } from '../ui/button'
import KaleshMenuCard from './KaleshMenuCard'

function KaleshCard({kalesh, token}:{kalesh:KaleshType, token:string}) {
  return (
    <Card>
    <CardHeader className='flex justify-between items-center flex-row'>
        <CardTitle>{kalesh.title}</CardTitle>
        <KaleshMenuCard kalesh={kalesh} token={token}/>
    </CardHeader>
    <CardContent className='h-[300px]'>
        {kalesh?.image && <Image
        
            src={getImageUrl(kalesh.image)}
            width={500}
            height={500}
            alt={kalesh.title}
            className='rounded-md w-full h-[220px]'
        
        />}
        <p className='mt-6 font-semibold'>{kalesh.description}</p>
        <p>
            {/* <strong>Expires At:</strong>
            {new Date(kalesh.expire_at).toDateString()} */}
        </p>
    </CardContent>
    <CardFooter>
        <Button>Items</Button>
    </CardFooter>
    </Card>

  )
}

export default KaleshCard