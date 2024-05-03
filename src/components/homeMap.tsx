import {Skeleton} from "@/components/ui/skeleton"
import dynamic from "next/dynamic"

export default function HomeMap({locationValue}:{locationValue:string}){
	const LazyMap=dynamic(()=>import("@/components/map"),{
		ssr:false,
		loading:()=><Skeleton className="h-[50vh] w-full" />
	})

	return <LazyMap locationValue={locationValue} />
}