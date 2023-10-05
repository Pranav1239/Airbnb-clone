import Image from "next/image"
import logo from "@/public/Images/logo.png"

function Logo() {
  return (
    <div>
        <Image
        src={logo}
        alt="Logo"
        width={120}
        height={40}
        />
    </div>
  )
}

export default Logo