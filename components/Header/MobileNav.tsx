import { differenceInDays, parse } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai"
import { FaBars } from "react-icons/fa"
export default async function MobileNav() {

  const [searchParams, setSearchParams] = useState({
    country: "",
    days: "",
  })

  const params = useSearchParams();

  useEffect(() => {
    const difference = differenceInDays(
      parse(params?.get("endDate")!, "dd-MM-y", new Date()),
      parse(params?.get("startDate")!, "dd-MM-y", new Date())
    );

    if (difference) {
      setSearchParams({
        ...searchParams,
        country: params?.get("country") ? params?.get("country")! : "",
        days: `${difference} days`
      });
    }

  }, [params])
  return (
    <div className="m-3 md:hidden">
      <div className="flex justify-between items-center border rounded-3xl px-3 py-1 space-x-10 ">
        <div className="flex items-center space-x-4">
          <AiOutlineSearch height={20} width={20} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {searchParams.country != "" ? searchParams.country : "Any where"}
            </span>
            <span className="text-xs">
              {searchParams.days != "" ? searchParams.days : "Any week"}
            </span>
          </div>
        </div>
        <FaBars className="text-right" />
      </div>
      <div>
      </div>

    </div>
  )
}
