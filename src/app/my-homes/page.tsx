import { createClient } from "@/utils/supabase/server";
import NoItems from "@/components/noItems";
import ListingCard from "@/components/listingCard";
import {redirect} from "next/navigation"

async function getData(userId:string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("home")
    .select("photo,id,price,description,country,favorites (*)")
    .match({
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      userId
    });

  return data;
}

export default async function MyHome(){
	const supabase = createClient();
	const { data:user, error } = await supabase.auth.getUser()
	if (error || !user?.user) {
	    redirect('/login')
	}
	const data=await getData(user?.user?.id)

	console.log(data)

	return(
		<section className="container mx-auto px-5 lg:px-10 mt-10">
			<h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
			{data?.length===0 ? (
				<NoItems 
		        	title="Your don't have any Homes listed"
          			description="Please list a home on jupiter so that you can see it right here"
		        />
			) : (
				<div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
		          {data?.map(item => (
		            <ListingCard
		              key={item.id}
		              description={item.description as string}
		              imagePath={item.photo as string}
		              location={item.country as string}
		              price={item.price as number}
		              userId={user?.user?.id}
		              favoriteId={(item.favorites.filter(i=>i.userId===user?.user?.id))[0]?.id}
		              homeId={item.id}
		              pathName="/my-homes"
		            />
		    	  ))}
        		</div>
			)}
		</section>
	)
}