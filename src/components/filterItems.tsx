"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FaMoon } from "react-icons/fa";
import { FaUmbrellaBeach } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import { TbBrandGoogleHome } from "react-icons/tb";
import { FaSunPlantWilt } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";

export default function FilterItems() {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();
  console.log(search)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

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
  ];

  return (
    <div className="flex justify-center items-center gap-x-5 lg:gap-x-10 my-5 py-3 lg:py-5 px-5 lg:px-10 w-full overflow-x-scroll no-scrollbar">
      {items.map(item => (
        <Link
          key={item.id}
          href={search===item.name ? pathname : pathname + "?" + createQueryString("filter", item.name)}
          className={`flex flex-col gap-y-2 lg:gap-y-3 items-center justify-end transition-all duration-300 ${
            search === item.name ? "text-cyan-500" : "text-gray-200" 
          }`}
        >
          <item.icon className={`w-6 h-6 transition-all duration-300 ${search === item.name ? "scale-125 text-cyan-500" : "dark:text-gray-200 text-gray-900"}`} />
          <p className="text-xs font-medium">{item.title}</p>
        </Link>
      ))}
    </div>
  );
}
