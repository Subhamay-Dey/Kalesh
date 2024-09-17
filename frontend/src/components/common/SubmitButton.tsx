"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'

function SubmitButton() {

    const {pending} = useFormStatus()

  return (
    <Button className="w-full" disabled={pending}>
        {pending ? "Processing..." : "Submit"}
    </Button>
  )
}

export default SubmitButton