import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image"
import { redirect } from "next/navigation";
import { createClient } from '@/utils/supabase/server'
import SignoutButton from "./signoutButton"
import {createHomeWithId} from "@/actions"

export default async function UserNav() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  const { data: user, error:userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', data?.user?.id)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative overflow-hidden">
          {user && user[0]?.img ? (
            <Image src={user[0].img} fill alt="img" />
          ) : (
            <FaUser className="text-xl" />
          ) }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-bold" align="end">
        {user ? (
          <>
          <DropdownMenuItem>
            {user[0]?.name}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form action={createHomeWithId} className="w-full">
              <button type="submit" className="w-full text-start">
                your Home
              </button>
            </form>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="my-homes">My Listings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="favorites">My Favorites</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="reservation">My Reservation</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem><SignoutButton/></DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Link href="/login">Login/Register</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
