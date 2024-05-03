import { FaHeart } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function DeleteFromFavoriteButton() {
  return (
    <Button variant="outline" size="icon" className="bg-primary-foreground/50" type="submit" >
      <FaHeart className="w-4 h-4 text-cyan-400" />
    </Button>
  )
}