"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from "@/components/ui/textarea"

function AddKalesh() {
    const [open, setOpen] = useState(false)
    const [kaleshdata, setKaleshData] = useState<KaleshFormType>({})
  return (
    <Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger asChild>
        <Button>Add Kalesh</Button>
    </DialogTrigger>
    <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
        <DialogTitle>Create Kalesh</DialogTitle>
        </DialogHeader>
        <form>
            <div className='mt-4'>
                <Label htmlFor='title'>Title</Label>
                <Input id='title' placeholder='Enter your title here...' value={kaleshdata?.title ?? ""} onChange={(e) => setKaleshData({...kaleshdata, title:e.target.value})}/>
            </div>
            <div className='mt-4'>
                <Label htmlFor='description'>Description</Label>
                <Textarea id='description' placeholder='Enter your description here...' value={kaleshdata?.description ?? ""} onChange={(e) => setKaleshData({...kaleshdata, description:e.target.value})}/>
            </div>
        </form>
    </DialogContent>
    </Dialog>

  )
}

export default AddKalesh