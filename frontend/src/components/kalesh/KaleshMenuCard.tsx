import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react'
import dynamic from 'next/dynamic'
const EditKalesh = dynamic(() => import("./EditKalesh"))
  
function KaleshMenuCard({kalesh, token}:{kalesh:KaleshType, token:string}) {

    const [open, setOpen] = useState(false)

  return (
    <>
        {open && <EditKalesh open={open} setOpen={setOpen} kalesh={kalesh} token={token}/>}
    <DropdownMenu>
    <DropdownMenuTrigger>
        <EllipsisVertical/>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setOpen(true)}>Edit</DropdownMenuItem>
        <DropdownMenuItem>Copy Link</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
    </>

  )
}

export default KaleshMenuCard