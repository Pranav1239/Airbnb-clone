import Navbar from '@/components/Header/Navbar'
import AllCategories from '@/components/common/AllCategories'
import HomeCard from '@/components/common/HomeCard';
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Toast from '@/components/base/Toast';

export default async function Home() {
  const supabase = createServerComponentClient({cookies});
  const {data : homes , error} = await supabase
    .from("homes")
    .select("id ,image ,title ,country ,city ,price , users (metadata->name)"); 
  return (
    <main>
      <Toast />
      <Navbar />
      <AllCategories />
      {homes && homes?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 px-10">
          {homes?.map((item) => (
            <HomeCard home={item} key={item.id} />
          ))}
        </div>
      )}

    </main>
  )
}
