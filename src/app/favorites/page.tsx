import { createClient } from '@/utils/supabase/server'
import NoItems from "@/components/noItems";
import ListingCard from "@/components/listingCard";
import {redirect} from "next/navigation"

type MyType={
	id:string;
	home:{
		id:string;
		photo:string;
		price:number;
		country:string;
		description:string;
	}
}[]

async function getData(userId:string){
	const supabase = createClient();
	const { data: favorites, error } = await supabase
	  .from('favorites')
	  .select(`
	    id
	    ,home (
	      photo,
	      id,
	      price,
	      country,
	      description
	    )
	  `)
	  .eq('userId', userId)
	  .returns<MyType>()
	return favorites
}

export default async function Favorites(){
	const supabase = createClient();
	const { data:user, error } = await supabase.auth.getUser()
	if (error || !user?.user) {
	    redirect('/login')
	}
	const data=await getData(user?.user?.id)

	return(
		<section className="container mx-auto py-5 lg:px-10 mt-10">
			<h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>
			{data?.length === 0 ? (
		        <NoItems 
		        	title="hey you don't have any favorites"
          			description="Please add favorites to see them right here..."
		        />
		    ) : (
		        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
		          {data?.map(item => (
		            <ListingCard
		              key={item.home?.id as string}
		              description={item.home?.description as string}
		              imagePath={item.home?.photo as string}
		              location={item.home?.country as string}
		              price={item.home?.price as number}
		              userId={user?.user?.id}
		              favoriteId={item.id}
		              homeId={item.home?.id}
		              pathName="/favorites"
		            />
		    	  ))}
        		</div>
      		)}
		</section>
	)
}