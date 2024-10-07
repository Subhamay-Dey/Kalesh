"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from "@/components/ui/textarea"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function AddKalesh() {
    const [open, setOpen] = useState(false)
    const [kaleshdata, setKaleshData] = useState<KaleshFormType>({})
    const [date, setDate] = React.useState<Date | undefined>(new Date())
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
                <Input 
                  id='title' 
                  placeholder='Enter your title here...' 
                  value={kaleshdata?.title ?? ""} 
                  onChange={(e) => setKaleshData({...kaleshdata, title:e.target.value})}
                />
            </div>
            <div className='mt-4'>
                <Label htmlFor='description'>Description</Label>
                <Textarea 
                  id='description' 
                  placeholder='Enter your description here...' 
                  value={kaleshdata?.description ?? ""} 
                  onChange={(e) => setKaleshData({...kaleshdata, description:e.target.value})}
                />
            </div>
            <div className='mt-4'>
                <Label htmlFor='image'>Image</Label>
                <Input 
                  id='image' 
                  type='file' 
                  placeholder='Enter your title here...' 
                />
            </div>

            <div className='mt-4'>
                <Label htmlFor='expireAt' className='block'>Expires At</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full mt-2 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
            </div>
            <div className='mt-6'>
              <Button className='w-full'>Submit</Button>
            </div>
        </form>
    </DialogContent>
    </Dialog>

  )
}

export default AddKalesh