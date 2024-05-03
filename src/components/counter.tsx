"use client"

import {Button} from "@/components/ui/button"
import {useState} from "react"
import { FaPlus, FaMinus} from "react-icons/fa";

export default function Counter({name}:{name:string}){
  const [amount,setAmount]=useState(0)
  
  function increase(){
    setAmount(p=>p+1)
  }
  function decrease(){
    if(amount>0){
      setAmount(p=>p-1)
    }
  }
  return (
    <div className="flex justify-center items-center gap-x-4">
      <input type="hidden" name={name} value={amount} />
      <Button variant="outline" size="icon" type="button" onClick={decrease}>
        <FaMinus className="h-4 w-4 text-primary" />
      </Button>
      <p className="font-medium text-lg">{amount}</p>
      <Button variant="outline" size="icon" type="button" onClick={increase}>
        <FaPlus className="h-4 w-4 text-primary" />
      </Button>
    </div>
  )
}