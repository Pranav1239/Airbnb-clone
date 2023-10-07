import { categories } from "@/config/categories"
import Image from "next/image"

export default function AllCategories() {
    return (
        <div className="flex justify-center items-center space-x-6 px-10 my-3 overflow-x-auto whitespace-nowrap scroll-smooth pb-4">
            {/* {categories.map((item) =>
                <div className="flex items-center flex-col">
                    <Image
                        src={item.icon}
                        alt="icon"
                        width={25} height={25}

                    />
                    <span className="text-sm">{item.name}</span>
                </div>
            )
            } */}
                  {categories.map((item) => (
        <div
          className="flex justify-center flex-col items-center cursor-pointer "
        >
          <Image src={item.icon} width={25} height={25} alt="icon" />
          <span
            className="text-sm"
          >
            {item.name}
          </span>
        </div>
      ))}
        </div>
    )
}
