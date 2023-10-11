import Logo from "./Logo"
import Navmenu from "./Navmenu"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import SearchSheet from "../Sheet/SearchSheet";

async function  Navbar() {
    const supabase = createServerComponentClient({ cookies });
    const session = await supabase.auth.getSession();
    return (
        <div className="flex justify-between items-center px-10">
            <div className="hidden md:block">
                <Link href={"/"}>                    
                <Logo />
                </Link>
            </div>
            <SearchSheet session={session} />
            <div className="hidden md:flex flex-row items-center">
                <Link href={"/add-home"} className="p-2 border-2 rounded-full">
                <h1 >Add home</h1>
                </Link>
                <div className="mx-2 p-2 border-2 rounded-full">
                <Navmenu session={session.data?.session}  />
                </div>
            </div>
        </div>
    )
}

export default Navbar