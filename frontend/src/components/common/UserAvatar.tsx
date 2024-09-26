"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function UserAvatar() {
  return (

        <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>SD</AvatarFallback>
        </Avatar>

  )
}

export default UserAvatar