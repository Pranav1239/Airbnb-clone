import Navbar from '@/components/Header/Navbar'
import AllCategories from '@/components/common/AllCategories'
import HomeCard from '@/components/common/HomeCard';
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Toast from '@/components/base/Toast';

export default async function Home({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
  const supabase = createServerComponentClient({ cookies });
  const query = supabase
    .from("homes")
    .select("id ,image ,title ,country ,city ,price , users (metadata->name)");

  if (searchParams?.country) {
    query.ilike("country", `%${searchParams?.country}%`);
  }
  if (searchParams?.category) {
    query.contains("categories", [searchParams?.category]);
  }

  const { data: homes } = await query;
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
      {
        homes && homes.length < 1 && (
          <h1 className='font-bold text-brand text-center text-3xl'>No Airbnb Found</h1>
        )
      }
    </main>
  )
}
