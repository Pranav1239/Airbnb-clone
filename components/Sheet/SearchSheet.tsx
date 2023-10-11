"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AiOutlineSearch } from "react-icons/ai";
import MobileNav from "../Header/MobileNav";
import SearchSheetNav from "./SearchSheetNav";
import Datepicker from "./Datepicker";
import { Button } from "../ui/button";
import { useState } from "react";
import { useEffect } from "react";
import { addDays, format, differenceInDays, parse } from 'date-fns'
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchSheet({ session }: { session: any }) {
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter();
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        },
    ])
    const params = useSearchParams();

    const handleDateChange = (data: any) => {
        setDate([data?.selection])
    }

    const [search, setSearch] = useState<string>("")


    const [searchParams, setSearchParams] = useState({
        country: "",
        days: "",
    })

    useEffect(() => {
        const difference = differenceInDays(
            parse(params?.get("endDate")!, "dd-MM-y", new Date()),
            parse(params?.get("startDate")!, "dd-MM-y", new Date())
        );

        if (difference) {
            setSearchParams({
                ...searchParams,
                country: params?.get("country") ? params?.get("country")! : "",
                days : `${difference} days`
            });
        }

    }, [params])


    const handleSubmit = () => {
        const startDate = format(date[0].startDate, "dd-MM-y");
        const endDate = format(date[0].endDate, "dd-MM-y");
        router.replace(`${window.location.origin}?country=${search}&startDate=${startDate}&endDate=${endDate}`)
        setOpen(() => false)
    }

    return (
        <div>
            <Sheet open={open}>
                <SheetTrigger asChild>
                    <div className="w-full md:w-auto" onClick={() => setOpen(true)}>
                        <div className="hidden md:flex cursor-pointer items-center space-x-2">
                            <span className="text-sm ">
                            {searchParams.country != "" ? searchParams.country : "Any where"}
                            </span>
                            <span>|</span>
                            <span className="text-sm cursor-pointer">
                            {searchParams.days != "" ? searchParams.days : "Any week"}
                            </span>
                            <span>|</span>
                            <span className="text-gray-400 text-sm">Add guest</span>
                            <span className="text-2xl text-white bg-brand rounded-full p-2">
                                <AiOutlineSearch />
                            </span>
                        </div>
                        <MobileNav />
                    </div>
                </SheetTrigger>
                <SheetContent side={"top"}>
                    <SheetHeader>
                        <SheetTitle asChild>
                            <SearchSheetNav
                                session={session}
                                searchInputCallback={setSearch}
                            /></SheetTitle>
                        <SheetDescription>
                            <div className="flex flex-col justify-center items-center">
                                <div>
                                    <Datepicker state={date} dateCallback={handleDateChange} />
                                </div>
                                <div className="flex w-1/3 justify-between items-center mt-5">
                                    <Button className="bg-brand"
                                        onClick={handleSubmit}
                                    >
                                        Search
                                    </Button>
                                    <Button variant="outline" onClick={() => setOpen(false)}>
                                        Close
                                    </Button>
                                </div>
                            </div>

                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

        </div>
    )
}
