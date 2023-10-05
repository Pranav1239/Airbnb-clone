import Navbar from '@/components/base/Navbar'
import AllCategories from '@/components/common/AllCategories'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <Navbar />
      <AllCategories />
    </main>
  )
}
