import Logo from "./Logo"
import { AiOutlineSearch } from "react-icons/ai"
import Navmenu from "./Navmenu"

function Navbar() {
    return (
        <div className="flex justify-between items-center px-10">
            <div>
                <Logo />
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-sm">Anywhere</span>
                <span>|</span>
                <span className="text-sm">Anyweek</span>
                <span>|</span>
                <span className="text-gray-400 text-sm">Add guest</span>
                <span className="text-2xl text-white bg-brand rounded-full p-2"> 
                <AiOutlineSearch  />
                </span>
            </div>
            <div className="flex flex-row items-center">
                <h1 >Add home</h1>
                <div className="mx-2">
                <Navmenu />
                </div>
            </div>
        </div>
    )
}

export default Navbar