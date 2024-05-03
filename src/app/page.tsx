import FilterItems from "@/components/filterItems";
import { createClient } from "@/utils/supabase/server";
import ListingCard from "@/components/listingCard";
import SkeletonCard from "@/components/skeletonCard";
import NoItems from "@/components/noItems";
import { Suspense } from 'react';

async function getData({
  searchParams,
}: {
  searchParams?: { 
    filter?: string ;
    country?: string ;
    guest?: string ;
    room?: string ;
    bathroom?: string ;
  };
}) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("home")
    .select("photo,id,price,description,country,guests,bathrooms,bedrooms,favorites (*),categoryName")
    .match({
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    });
  let newData=searchParams?.filter ? data?.filter(item=>item?.categoryName==searchParams.filter) : data
  newData=searchParams?.country ? data?.filter(item=>item?.country==searchParams.country) : newData
  newData=searchParams?.guest ? data?.filter(item=>item?.guests==searchParams.guest) : newData
  newData=searchParams?.room ? data?.filter(item=>item?.bedrooms==searchParams.room) : newData
  newData=searchParams?.bathroom ? data?.filter(item=>item?.bathrooms==searchParams.bathroom) : newData
  return newData;
}

async function ShowItems({
  searchParams
}: {
  searchParams?: { 
    filter?: string ;
    country?: string ;
    guest?: string ;
    room?: string ;
    bathroom?: string ;
  };
}) {
  const supabase = createClient();
  const { data:{user}, error:err } = await supabase.auth.getUser()
  
  const data = await getData({ searchParams });
  return (
    <>
      {data?.length === 0 ? (
        <NoItems
          description="Please check a other category or create your own listing!"
          title="Sorry no listing found for this category..."
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
              userId={user?.id}
              favoriteId={(item.favorites.filter(i=>i.userId===user?.id))[0]?.id}
              homeId={item.id}
              pathName="/"
            />
          ))}
        </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

export default function Home({
  searchParams
}: {
  searchParams?: { 
    filter?: string ;
    country?: string ;
    guest?: string ;
    room?: string ;
    bathroom?: string ;
  };
}) {
  return (
    <>
      <div className="container mx-auto px-5 lg:px-10">
        <FilterItems />
        <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
