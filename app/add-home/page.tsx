import AddHome from "@/components/AddHome";
import Navbar from "@/components/Header/Navbar";
import { generateRandomNumber } from "@/lib/utils";
import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddHome1 from "../../assets/home_img.jpeg"
import AddHome2 from "../../assets/home_img1.jpeg"
export default async function page() {
    const supabaseUser = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabaseUser.auth.getSession();

    if (!session) {
        redirect("/");
    }
    return (
        <>
            <Navbar />
            <div className="container overflow-hidden">
                <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
                    <div>
                        <h1 className="text-brand font-bold text-7xl cursor-default">Airbnb it</h1>
                        <h1 className="text-black font-semibold text-3xl mb-3 cursor-default">
                            You could earn
                        </h1>
                        <div className="flex space-x-4 mb-4 items-center">
                            <h1 className="font-extrabold text-2xl">9999</h1>
                            <strong className="text-3xl"> /per night</strong>
                        </div>
                        <div className="flex flex-row gap-4">
                        <Image
                                src={AddHome1}
                                width={200}
                                height={200}
                                alt="home"
                                className="rounded-2xl object-cover"
                            />
                            <Image
                                src={AddHome2}
                                width={205}
                                height={205}
                                alt="home"
                                className="rounded-2xl object-cover"
                            />
                        </div>
                    </div>
                    <div className="">
                        <AddHome />
                    </div>
                </div>
            </div>
        </>
    )
}
