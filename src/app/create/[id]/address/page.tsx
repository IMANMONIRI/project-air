"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem
} from "@/components/ui/select";
import {Skeleton} from "@/components/ui/skeleton"
import { useCountries } from "@/components/getCountries";
import dynamic from "next/dynamic";
import CreationBottomBar from "@/components/creationBottomBar";
import {useState} from "react"
import {createLocation} from "@/actions";

export default function Address({ params }: { params: { id: string } }) {
  const { getAllCountries } = useCountries();
  const [locationValue,setLocationValue]=useState("")
  const LazyMap = dynamic(() => import("@/components/map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />
  });
  return (
    <>
      <div className="w-full container md:w-4/5 lg:w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>
      <form action={createLocation}>
      <input type="hidden" name="homeId" value={params.id} />
      <input type="hidden" name="countryValue" value={locationValue} />
        <div className="w-full container md:w-4/5 lg:w-3/5 mx-auto mt-10 mb-36">
          <div className="mb-5">
            <Select required onValueChange={(value)=>setLocationValue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Contries</SelectLabel>
                  {getAllCountries().map(item => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label} / {item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap locationValue={locationValue}/>
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
}
