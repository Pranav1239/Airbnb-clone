import Logo from "../Header/Logo";
import Navmenu from "../Header/Navmenu";
import { Input } from "../ui/input";
import Link from "next/link";

export default function SearchSheetNav({ session, searchInputCallback }:
    {
        session: any,
        searchInputCallback : (value : string) => void
    }
) {
    return (
        <div className="flex justify-between items-center">
            <div className="hidden md:block">
                <Logo />
            </div>
            <div className="w-full md:w-[45%] flex justify-center items-center ">
                <Input
                    placeholder="Search by country.."
                    className="w-full"
                    onChange={(e)=> searchInputCallback(e.target.value)}
                />
            </div>
            <div className="hidden md:flex flex-row items-center">
                <Link href={"/add-home"} className="p-2 border-2 rounded-full">
                    <h1 >Add home</h1>
                </Link>
            </div>
        </div>
    )
}
