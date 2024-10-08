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

import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios, { Axios, AxiosError } from 'axios';
import { KALESH_URL } from '@/lib/apiEndPoints';
import { CustomUser } from '@/app/api/auth/[...nextauth]/options';
import { toast } from 'sonner';

function AddKalesh({user}:{user:CustomUser}) {
    const [open, setOpen] = useState(false)
    const [kaleshdata, setKaleshData] = useState<KaleshFormType>({})
    const [date, setDate] = React.useState<Date | null | undefined>(new Date())
    const [image, setImage] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<KaleshFormErrorType>({})

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if(file) {
        setImage(file)
      }
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
      event.preventDefault()

      try {
        setLoading(true)
        const formData = new FormData()
        formData.append("title", kaleshdata?.title ?? "")
        formData.append("description", kaleshdata?.description ?? "")
        formData.append("expires_at", date?.toISOString() ?? "")
        if(image) {
          formData.append("image", image)
        }

        const {data} = await axios.post(KALESH_URL, formData, {
          headers: {
            Authorization: user.token
          }
        })
        setLoading(false)
        if(data?.message) {
          setKaleshData({})
          setDate(null)
          setImage(null)
          toast.success("Kalesh added successfully!")
          setOpen(false)
        }
        
      } catch (error) {
        setLoading(false)
        if(error instanceof AxiosError) {
          if(error.response?.status == 422) {
            setErrors(error.response?.data?.session)
          }
        } else {
          toast.error("Something went wrong. please try again!")
        }
      }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger asChild>
        <Button>Add Kalesh</Button>
    </DialogTrigger>
    <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
        <DialogTitle>Create Kalesh</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
            <div className='mt-4'>
                <Label htmlFor='title'>Title</Label>
                <Input 
                  id='title' 
                  placeholder='Enter your title here...' 
                  value={kaleshdata?.title ?? ""} 
                  onChange={(e) => setKaleshData({...kaleshdata, title:e.target.value})}
                />
                <span className='text-red-500'>{errors?.title}</span>
            </div>
            <div className='mt-4'>
                <Label htmlFor='description'>Description</Label>
                <Textarea 
                  id='description' 
                  placeholder='Enter your description here...' 
                  value={kaleshdata?.description ?? ""} 
                  onChange={(e) => setKaleshData({...kaleshdata, description:e.target.value})}
                />
                <span className='text-red-500'>{errors?.description}</span>
            </div>
            <div className='mt-4'>
                <Label htmlFor='image'>Image</Label>
                <Input 
                  id='image' 
                  type='file' 
                  placeholder='Enter your title here...' 
                  onChange={handleImageChange}
                />
                <span className='text-red-500'>{errors?.image}</span>
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
                      {date ? date.toDateString() : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                    <Select
                      onValueChange={(value) =>
                        setDate(addDays(new Date(), parseInt(value)))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="0">Today</SelectItem>
                        <SelectItem value="1">Tomorrow</SelectItem>
                        <SelectItem value="3">In 3 days</SelectItem>
                        <SelectItem value="7">In a week</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="rounded-md border">
                      <Calendar mode="single" selected={date ?? new Date()} onSelect={setDate} initialFocus />
                    </div>
                  </PopoverContent>
                </Popover>
                <span className='text-red-500'>{errors?.expires_at}</span>
            </div>
            <div className='mt-6'>
              <Button className='w-full' disabled={loading}>{loading ? "Processing" : "Submit"}</Button>
            </div>
        </form>
    </DialogContent>
    </Dialog>

  )
}

export default AddKalesh