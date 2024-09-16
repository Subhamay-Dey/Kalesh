import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function Hero() {
  return (
    <>
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <div>
                <Image 
                    src={"/banner.svg"}
                    width={500}
                    height={500}
                    alt='baner img'
                />
            </div>
            <div className='text-center mt-4'>
                <h1 className='text-6xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text'>Kalesh</h1>
            </div>
            <p className='text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-2'>Discover the better choice together</p>

            <Link href={"/login"}>
                <Button className='mt-4'>Start free</Button>
            </Link>
        </div>
    </>
  )
}

export default Hero