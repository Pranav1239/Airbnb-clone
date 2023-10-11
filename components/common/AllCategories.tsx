"use client"
import { categories } from "@/config/categories"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function AllCategories() {
  const [cat, setCat] = useState<string>("");
  const params = useSearchParams();
  useEffect(() => {
    if (params?.get("category")) {
      setCat(params?.get("category")!);
    }
  }, [params]);

  const router = useRouter()

  const HandleCategories = (name: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set("category", name)
    router.replace(`/${url.search}`)
  }
  return (
    <div className="flex justify-center items-center space-x-6 px-10 my-3 overflow-x-auto whitespace-nowrap scroll-smooth pb-4">
      {categories.map((item) => (
        <div
          className="flex justify-center opacity-70 hover:opacity-100 flex-col items-center cursor-pointer "
          key={item.name}
          onClick={() => HandleCategories(item.name)}
        >
          <Image src={item.icon} width={25} height={25} alt="icon" />
          <span
            className={`${cat == item.name ? "inline-block border-b-4 border-brand" : ""
              } text-sm`}
          >
            {item.name}
          </span>
        </div>
      ))}
    </div>
  )
}
