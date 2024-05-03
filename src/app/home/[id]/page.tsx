import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { useCountries } from "@/components/getCountries";
import {Separator} from "@/components/ui/separator";
import { FaUser } from "react-icons/fa";
import CategoryShowcase from "@/components/categoryShowcase"
import HomeMap from "@/components/homeMap"
import SelectCalender from "@/components/selectCalender"
import ReservationSubmitButton from "@/components/reservationSubmitButton"
import {createReservation} from "@/actions"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import {redirect} from "next/navigation"

async function getData(homeId:string){
	const supabase = createClient();

	const { data, error } = await supabase
	    .from("home")
	    .select("*,users(img,name),reservation(*)")
	    .eq("id",homeId);
	return data
}

export default async function HomeRoute({params}:{params:{id:string}}){
	const supabase = createClient();
	const { data:{user}, error } = await supabase.auth.getUser()
	const data=await getData(params.id)
	const {getCountryByValue}=useCountries()
	const country=getCountryByValue(data ? data[0]?.country as string : "")
	if(!data){
		redirect("/")
		return null
	}
	return(
		<div className="w-[75%] mx-auto mt-10 mb-12">
			<h1 className="font-medium text-2xl mb-5">{data[0]?.country}</h1>
			<div className="relative h-[550px]">
				<Image alt="Image of Home" src={`https://gmnzkansjbhcrjxgzfam.supabase.co/storage/v1/object/public/images/${data[0]?.photo}`} fill className="rounded-lg h-full object-cover w-full" />
			</div>
			<div className="flex justify-between gap-x-24 mt-8">
				<div className="w-2/3">
					<h3>{country?.flag}</h3>
					<div className="flex gap-x-2 text-muted-foreground">
						<span>{data[0]?.guests} Guests</span> * <span>{data[0]?.bedrooms} Bedrooms</span> * <span>{data[0]?.bathrooms} Bathrooms</span>
					</div>
					<div className="flex items-center mt-6">
						<div className="w-11 h-11 relative rounded-full overflow-hidden bg-gray-900 flex justify-center items-center">
							{data[0]?.users?.img ? (
					            <Image src={data[0]?.users?.img} alt="img" fill />
					        ) : (
					            <FaUser className="text-xl" />
					        ) }
				        </div>
						<div className="flex flex-col ml-4">
							<h3 className="font-medium">Hosted by jan</h3>
							<p>Host since 2015</p>
						</div>
					</div>
					<Separator className="my-7" />
					<CategoryShowcase categoryName={data[0]?.categoryName as string} />
					<Separator className="my-7" />
					<p className="text-muted-foreground">{data[0]?.description}</p>
					<Separator className="my-7" />
					<HomeMap locationValue={country?.value as string} />
				</div>
				<form action={createReservation}>
					<input type="hidden" name="homeId" value={params.id} />
					<input type="hidden" name="userId" value={user?.id} />
					<SelectCalender reservation={data[0]?.reservation?.filter((i:{userId:string})=>i.userId===user?.id)} />
					{user?.id ? (
						<ReservationSubmitButton />
					) : (
						<Button className="w-full" asChild>
							<Link href="/login">Make a Reservation</Link>
						</Button>
					)}
				</form>
			</div>
		</div>
	)
}