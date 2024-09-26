"use client"
import React, { Dispatch, SetStateAction } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import {signOut} from "next-auth/react"

function LogoutModel({open, setOpen}:{open:boolean, setOpen: Dispatch<SetStateAction<boolean>>}) {

  const logoutUser = () => {
    signOut({
      callbackUrl: "/login",
      redirect:true,
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Ready to logout?</AlertDialogTitle>
        <AlertDialogDescription>
            This action will delete your current session and you have to login again.
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={logoutUser}>Yes, Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  )
}

export default LogoutModel