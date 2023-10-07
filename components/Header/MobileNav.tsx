import { AiOutlineSearch } from "react-icons/ai"
import { FaBars } from "react-icons/fa"
export default function MobileNav() {
  return (
    <div className="m-3 md:hidden">
      <div className="flex justify-between items-center border rounded-3xl px-3 py-1 space-x-10 ">
        <div className="flex items-center space-x-4">
          <AiOutlineSearch height={20} width={20} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Anywhere</span>
            <span className="text-xs">Any week . Add guest</span>
          </div>
        </div>
        <FaBars className="text-right" />
      </div>
    </div>
  )
}
