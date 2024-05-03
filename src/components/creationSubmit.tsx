"use client"

import { Button } from "@/components/ui/button";
import {useState} from "react"

export default function CreationSubmit(){
  const [pending,setPending]=useState(false)
  return(
    <>
      {pending ? (
        <Button className="text-white" disabled size="lg">
          Please Wait ...
        </Button>
      ) : (
        <Button className="text-white" type="submit" size="lg">
          Next
        </Button>
      )}
    </>
  )
}