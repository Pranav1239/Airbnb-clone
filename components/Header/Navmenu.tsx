import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FaBars } from "react-icons/fa"
import LoginBase from "../users/LoginBase"
import SigninBase from "../users/SigninBase"
import Link from "next/link"
import SignOut from "../common/SignOut"

function Navmenu({ session }: { session: object | null }) {
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <FaBars />
                </PopoverTrigger>
                <PopoverContent>
                    <div>
                        {session ? (
                            <>
                                <Link href="/dashboard">
                                    <li  className="hover:bg-gray-200 rounded-md p-2 list-none cursor-pointer">
                                        Dashboard
                                    </li>
                                </Link>
                                <Link href="/add-home">
                                    <li  className="hover:bg-gray-200 rounded-md p-2 list-none cursor-pointer">
                                        Add Home
                                    </li>
                                </Link>
                                <SignOut />
                            </>
                        ) : (
                            <>
                                <LoginBase />
                                <SigninBase />
                            </>
                        )}

                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Navmenu