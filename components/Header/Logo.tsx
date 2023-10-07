import Image from "next/image"
import logo from "@/public/Images/logo.png"
import logosm from "@/public/Images/logo-sm.png"

function Logo() {
  return (
    <div>
      <Image
        src={logo}
        width={120}
        height={120}
        alt="logo"
        className="lg:block hidden"
      />
      <Image
        src={logosm}
        width={90}
        height={90}
        alt="logo"
        className="lg:hidden"
      />
    </div>
  )
}

export default Logo