"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {revalidatePath} from "next/cache"

export async function createHomeWithId() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("home")
    .select("*")
    .eq("userId", user?.id);
  if (!data?.length) {
    const { data, error } = await supabase
      .from("home")
      .insert([{ userId: user?.id }])
      .select();
    if (!error) {
      return redirect(`/create/${data[data?.length - 1]?.id}/structure`);
    }
  } else if (
    !data[data.length - 1].addedCategory &&
    !data[data.length - 1].addedDescription &&
    !data[data.length - 1].addedLocation
  ) {
    return redirect(`/create/${data[data?.length - 1]?.id}/structure`);
  } else if (
    data[data.length - 1].addedCategory &&
    !data[data.length - 1].addedDescription
  ) {
    return redirect(`/create/${data[data?.length - 1]?.id}/description`);
  } else if (
    data[data.length - 1].addedCategory &&
    data[data.length - 1].addedDescription &&
    !data[data.length - 1].addedLocation
  ) {
    return redirect(`/create/${data[data?.length - 1]?.id}/address`);
  } else if (
    data[data.length - 1].addedCategory &&
    data[data.length - 1].addedDescription &&
    data[data.length - 1].addedLocation
  ) {
    const { data, error } = await supabase
      .from("home")
      .insert([{ userId: user?.id }])
      .select();
    if (!error) {
      return redirect(`/create/${data[data?.length - 1]?.id}/structure`);
    }
  }
}

export async function createCategory(formData: FormData) {
  const supabase = createClient();

  const categoryName = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;

  const { data, error } = await supabase
    .from("home")
    .update({ categoryName, addedCategory: true })
    .eq("id", homeId)
    .select();
  if (!error) {
    return redirect(`/create/${homeId}/description`);
  }
}

export async function createDescription(formData: FormData) {
  const supabase = createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFile = formData.get("image") as File;
  const homeId = formData.get("homeId") as string;
  const guestNumber = formData.get("guest") as string;
  const roomNumber = formData.get("room") as string;
  const bathroomNumber = formData.get("bathroom") as string;

  const { data: imageData, error: err } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png"
    });

  const { data, error } = await supabase
    .from("home")
    .update({
      title,
      description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: bathroomNumber,
      guests: guestNumber,
      photo: imageData?.path,
      addedDescription: true
    })
    .eq("id", homeId)
    .select();

  if (!error) {
    return redirect(`/create/${homeId}/address`);
  }
}

export async function createLocation(formData: FormData) {
  const supabase = createClient();

  const homeId = formData.get("homeId") as string;
  const countryValue = formData.get("countryValue") as string;
  const { data, error } = await supabase
    .from("home")
    .update({
      country: countryValue,
      addedLocation: true
    })
    .eq("id", homeId)
    .select();

  if (!error) {
    return redirect(`/`);
  }
}

export async function addToFavorite(formData:FormData){
  const supabase = createClient();

  const homeId=formData.get("homeId") as string;
  const userId=formData.get("userId") as string;
  const pathName=formData.get("pathName") as string;
  const { data, error } = await supabase
    .from('favorites')
    .insert([
      { userId, homeId },
    ])
    .select()

  if (!error) {
    revalidatePath(pathName)
  }
}

export async function deleteFromFavorite(formData:FormData){
  const supabase = createClient();

  const favoriteId=formData.get("favoriteId") as string;
  const pathName=formData.get("pathName") as string;
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq("id", favoriteId)
  if (!error) {
    revalidatePath(pathName)
  }
}

export async function createReservation(formData:FormData){
  const supabase = createClient();
  
  const userId=formData.get("userId") as string;
  const homeId=formData.get("homeId") as string;
  const startDate=formData.get("startDate") as string;
  const endDate=formData.get("endDate") as string;


  const { data, error } = await supabase
    .from('reservation')
    .insert([{ userId,homeId,endDate,startDate }])
    .select()

  if (!error) {
    return redirect(`/`);
  }
}