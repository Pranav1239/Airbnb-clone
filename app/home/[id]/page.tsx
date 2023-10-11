import Navbar from "@/components/Header/Navbar";
import { ImageUrl } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import Image from "next/image";

export default async function page({ params }: { params: { id: number } }) {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase
        .from('homes')
        .select("* , users(metadata->name)")
        .eq("id", params.id)
    const home: HomesType | null = data?.[0]
    return (
        <div className="mb-10">
            <Navbar />
            <div className="container mt-10">
                <div>
                    <h1 className="text-3xl font-extrabold">{home?.title}</h1>
                    <p className="font-bold"> {home?.country} <span className="text-gray-700">city : </span><span className="text-brand">{home?.city}</span></p>
                </div>
                <div className="mt-5 flex justify-center items-center ">
                    <Image
                        src={ImageUrl(home?.image)}
                        alt="Image"
                        width={300}
                        height={300}
                        className="w-full object-cover object-center"
                        unoptimized
                    />
                </div>
                <div className="mt-6">
                    <h1 className="text-3xl">
                        <span className="font-extrabold">Posted by </span>
                        <span className="capitalize font-bold text-brand">{home?.users?.name}</span>
                    </h1>
                </div>
                <div className="mt-4">
                    <h1 className="font-extrabold text-2xl mb-3">Description :</h1>
                    <div
                    dangerouslySetInnerHTML={{__html : home?.description}}
                    >

                    </div>
                </div>
            </div>
        </div>
    )
}
