import { categories } from "@/config/categories"
import Image from "next/image"

export default function AllCategories() {
    return (
        <div className="flex flex-row  items-center space-x-8 whitespace-nowrap px-8   overflow-x-auto pb-4 my-3">
            {categories.map((item) =>
                <div className="flex items-center flex-col">
                    <Image
                        src={item.icon}
                        alt="icon"
                        width={20}
                        height={20}
                    />
                    <span className="text-sm">{item.name}</span>
                </div>
            )
            }
        </div>
    )
}
