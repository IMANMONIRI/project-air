import ListingCard from "@/components/listingCard"
import NoItems from "@/components/noItems"
import { createClient } from "@/utils/supabase/server";
import {redirect} from "next/navigation"

type MyType={
	home:{
		id:string;
		country:string;
		photo:string;
		description:string;
		price:number;
		favorites:{
			id:string;
			homeId:string;
			userId:string;
			created_at:string;
		}[]
	}
}[]

async function getData(userId:string){
	const supabase = createClient();

	const { data, error } = await supabase
	    .from("reservation")
	    .select("home(id,country,photo,description,price,favorites(*))")
	    .returns<MyType>()
	return data
}

export default async function Reservations(){
	const supabase = createClient();
	const { data:{user}, error } = await supabase.auth.getUser()
	if (error || !user) {
	    redirect('/login')
	}
	const data=await getData(user?.id)
	return(
		<section className="container mx-auto px-5 lg:px-10 mt-10">
			<h2 className="text-3xl font-semibold tracking-tight">Your Reservations</h2>
			{data?.length===0 ? (
				<NoItems
					title="Hey you dont have any Reservations"
					description="Please add reservations to see it right here..."
				/>
			) : (
				<div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
					{data?.map((item)=>(
						<ListingCard
							key={item?.home?.id}
							description={item?.home?.description as string}
							location={item?.home?.country as string}
							pathName="/reservations"
							homeId={item?.home?.id as string}
							imagePath={item?.home?.photo as string}
							price={item?.home?.price}
							userId={user?.id}
							favoriteId={item?.home?.favorites.find(favorite=>favorite?.userId===user?.id)?.id as string}
						/>
					))}
				</div>
			)
		}
		</section>
	)
}