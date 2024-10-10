"use client"
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserAvatar from '../common/UserAvatar'
import LogoutModel from '../auth/LogoutModel'

function Navbar() {

  const [open, setOpen] = useState(false)

  return (
    <>
        <LogoutModel open={open} setOpen={setOpen}/>
        <nav className='flex justify-between items-center h-14 p-2 w-full'>
            <h1 className='text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text'>Kalesh</h1>
            <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer font-semibold'>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)} className='cursor-pointer font-semibold'>Logout</DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer font-semibold'>Team</DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer font-semibold'>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    </>
  )
}

export default Navbar