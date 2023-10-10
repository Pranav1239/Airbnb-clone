import { ImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function HomeCard({ home }: { home: any }) {
    return (
        <Link href={`/home/${home.id}`}>
            <div>
                <Image
                    src={ImageUrl(home.image)}
                    width={100}
                    height={100}
                    alt="Image"
                    className="w-full h-[300px] rounded-xl object-cover object-center"
                    unoptimized
                />
                <p className="font-extrabold">{home.title}</p>
                <p className="font-normal">
                    {home.city}, {home.country}
                </p>
                <p>${home.price}</p>
            </div>
        </Link>
    )
}
