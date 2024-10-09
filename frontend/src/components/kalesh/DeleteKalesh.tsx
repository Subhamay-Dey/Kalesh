"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import axios from 'axios'
import { KALESH_URL } from '@/lib/apiEndPoints'
import { clearCache } from '@/actions/commonActions'

function DeleteKalesh({open, setOpen, id, token}:{open:boolean, setOpen: Dispatch<SetStateAction<boolean>>, id:number, token: string}) {

  const deleteKalesh = async () => {
    try {
        const {data} = await axios.delete(`${KALESH_URL}/${id}`, {
            headers: {
                Authorization: token
            }
        })
        if(data?.message) {
            clearCache("dashboard")
            toast.success(data.message)
        }
    } catch (error) {
        toast.error("Something went wrong!")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Ready to logout!</AlertDialogTitle>
        <AlertDialogDescription>
            This action will delete your kalesh from our database permanently!
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={deleteKalesh}>Yes, Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteKalesh