import Image from "next/image"

import { FaMoon } from "react-icons/fa";
import { FaUmbrellaBeach } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import { TbBrandGoogleHome } from "react-icons/tb";
import { FaSunPlantWilt } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";

export default function CategoryShowcase({categoryName}:{categoryName:string}){
	const items = [
    {
      id: 0,
      name: "beach",
      description: "This Property is close to the Beach",
      title: "Beach",
      icon: FaUmbrellaBeach
    },
    {
      id: 1,
      name: "trending",
      description: "This Property is close to the Beach",
      title: "Trending",
      icon: BsFire
    },
    {
      id: 2,
      name: "beachfront",
      description: "This Property is close to the Beach",
      title: "Beachfront",
      icon: TbBrandGoogleHome
    },
    {
      id: 3,
      name: "earthhome",
      description: "This Property is close to the Beach",
      title: "Earthhome",
      icon: FaSunPlantWilt
    },
    {
      id: 4,
      name: "luxe",
      description: "This Property is close to the Beach",
      title: "Luxe",
      icon: IoFastFoodOutline
    },
    {
      id: 5,
      name: "amazingview",
      description: "This Property is close to the Beach",
      title: "Amazingview",
      icon: FaMoon
    },
    {
      id: 6,
      name: "design",
      description: "This Property is close to the Beach",
      title: "Design",
      icon: FaMoon
    },
    {
      id: 7,
      name: "pool",
      description: "This Property is close to the Beach",
      title: "Pool",
      icon: FaMoon
    },
    {
      id: 8,
      name: "tinyhome",
      description: "This Property is close to the Beach",
      title: "Tinyhome",
      icon: FaMoon
    },
    {
      id: 9,
      name: "historichome",
      description: "This Property is close to the Beach",
      title: "Historichome",
      icon: FaMoon
    },
    {
      id: 10,
      name: "countryside",
      description: "This Property is close to the Beach",
      title: "Countryside",
      icon: FaMoon
    },
    {
      id: 11,
      name: "wow!",
      description: "This Property is close to the Beach",
      title: "WOW!",
      icon: FaMoon
    },
    {
      id: 12,
      name: "surfing",
      description: "This Property is close to the Beach",
      title: "Surfing",
      icon: FaMoon
    }
  ];
	const category=items.find((item)=>item.name===categoryName)
	return(
		<div className="flex items-center">
      {category && <category.icon className="w-44 h-44" />}
			<div className="flex flex-col ml-4">
				<h3 className="font-medium">{category?.title}</h3>
				<p className="text-sm text-muted-foreground">{category?.description}</p>
			</div>
		</div>
	)
}