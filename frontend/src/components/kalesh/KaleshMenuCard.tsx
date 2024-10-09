import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react'
import dynamic from 'next/dynamic'
import DeleteKalesh from './DeleteKalesh'
const EditKalesh = dynamic(() => import("./EditKalesh"))
  
function KaleshMenuCard({kalesh, token}:{kalesh:KaleshType, token:string}) {

    const [open, setOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
        {open && <EditKalesh open={open} setOpen={setOpen} kalesh={kalesh} token={token}/>}
        {deleteOpen && <DeleteKalesh open={deleteOpen} setOpen={setDeleteOpen} id={kalesh.id} token={token}/>}
    <DropdownMenu>
    <DropdownMenuTrigger>
        <EllipsisVertical/>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setOpen(true)}>Edit</DropdownMenuItem>
        <DropdownMenuItem>Copy Link</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDeleteOpen(true)}>Delete</DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
    </>

  )
}

export default KaleshMenuCard