import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react'
  

function KaleshMenuCard({kalesh}:{kalesh:KaleshType}) {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger>
        <EllipsisVertical/>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Copy Link</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default KaleshMenuCard