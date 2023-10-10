import Navbar from "@/components/Header/Navbar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ImageUrl } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import Image from "next/image";
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiOutlineEye } from 'react-icons/ai';
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import DeleteHome from "@/components/DeleteHome";
import Link from "next/link";



export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();
  const { data, error } = await supabase.from("homes").select("id , image , title , city , country , state , price , created_at")
    .eq("user_id", user.data.user?.id)
  return (
    <div>
      <Navbar />
      <div className="container mt-7">
        <Table>
          <TableCaption>Your Dashboard</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data && data.map((item) => (
                <TableRow>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <Image
                      src={ImageUrl(item.image)}
                      width={40}
                      height={40}
                      className="rounded-full shadow-md"
                      alt="Image"
                    />
                  </TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell className="flex flex-row gap-4">
                    <DeleteHome id={item.id} />
                    <div>
                      <Link href={`home/${item.id}`}>
                        <Button size={"icon"} className="bg-green-500 hover:bg-green-700">

                          <AiOutlineEye size={25} />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
