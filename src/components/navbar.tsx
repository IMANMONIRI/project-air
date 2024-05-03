import Link from "next/link"
import ModeToggle from "@/components/modeToggle"
import UserNav from "@/components/userNav"
import SearchModalComponent from "./searchModalComponent"

export default function Navbar(){
  return(
    <nav className="w-full border-b">
      <div className="flex justify-between items-center mx-auto px-5 lg:px-10 py-5">
        <Link href="/" className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          JUPITER
        </Link>
        <SearchModalComponent />
        <div className="flex justify-center items-center gap-x-2">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </nav>
  )
}