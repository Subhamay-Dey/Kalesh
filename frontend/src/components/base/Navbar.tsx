"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserAvatar from '../common/UserAvatar'
  

function Navbar() {
  return (
    <nav className='flex justify-between items-center h-14 p-2 w-full'>
        <h1 className='text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text'>Kalesh</h1>
        <DropdownMenu>
        <DropdownMenuTrigger>
            <UserAvatar/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>

    </nav>
  )
}

export default Navbar