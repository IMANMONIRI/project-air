"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { FaUmbrellaBeach } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import { TbBrandGoogleHome } from "react-icons/tb";
import { FaSunPlantWilt } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";

export default function SelectedCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 m-10 w-full container md:w-4/5 lg:w-3/5 mx-auto">
      <input type="hidden" name="categoryName" value={selectedCategory as string} />
      {items.map(item => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={selectedCategory === item.name ? "border-primary" : ""}
            onClick={() => setSelectedCategory(item.name)}
          >
            <CardHeader>
              <item.icon className="w-8 h-8" />
              <h3 className="font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
