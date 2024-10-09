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

function KaleshCard({kalesh}:{kalesh:KaleshType}) {
  return (
    <Card>
    <CardHeader className='flex justify-between items-center flex-row'>
        <CardTitle>{kalesh.title}</CardTitle>
        <KaleshMenuCard kalesh={kalesh}/>
    </CardHeader>
    <CardContent className='h-[300px]'>
        {kalesh?.image && <Image
        
            src={getImageUrl(kalesh.image)}
            width={500}
            height={500}
            alt={kalesh.title}
            className='rounded-md w-full h-[220px]'
        
        />}
        <p>{kalesh.description}</p>
        <p>
            <strong>Expires At:</strong>
            {new Date(kalesh.expire_at).toDateString()}
        </p>
    </CardContent>
    <CardFooter>
        <Button>Items</Button>
    </CardFooter>
    </Card>

  )
}

export default KaleshCard