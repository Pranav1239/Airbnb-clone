import Logo from "./Logo"
import { AiOutlineSearch } from "react-icons/ai"
import Navmenu from "./Navmenu"
import MobileNav from "./MobileNav"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function  Navbar() {
    const supabase = createServerComponentClient({ cookies });
    const session = await supabase.auth.getSession();
    return (
        <div className="flex justify-between items-center px-10">
            <div className="hidden md:block">
                <Logo />
            </div>
            <div className="w-full md:w-auto">
            <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm">Anywhere</span>
                <span>|</span>
                <span className="text-sm">Anyweek</span>
                <span>|</span>
                <span className="text-gray-400 text-sm">Add guest</span>
                <span className="text-2xl text-white bg-brand rounded-full p-2"> 
                <AiOutlineSearch  />
                </span>
            </div>
            <MobileNav />
            </div>
            <div className="hidden md:flex flex-row items-center">
                <h1 >Add home</h1>
                <div className="mx-2">
                <Navmenu session={session.data?.session}  />
                </div>
            </div>
        </div>
    )
}

export default Navbar