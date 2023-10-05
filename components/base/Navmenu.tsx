import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FaBars } from "react-icons/fa"
import LoginBase from "../users/LoginBase"
import SigninBase from "../users/SigninBase"

function Navmenu() {
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <FaBars />
                </PopoverTrigger>
                <PopoverContent>
                    <div>
                        <LoginBase />
                        <SigninBase />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Navmenu