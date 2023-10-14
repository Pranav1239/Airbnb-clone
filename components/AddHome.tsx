"use client"
import { countries } from "@/config/countries";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { HTMLInputTypeAttribute, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { categories } from "@/config/categories";
import { AddHomeSchema, AddHomeType } from "@/validations/addhomeSchema";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { generateRandomNumber } from "@/lib/utils";
import Env from "@/config/Env";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useRouter } from "next/navigation";

export default  function AddHome() {

    const supabase = createClientComponentClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<AddHomeType>({
        resolver: yupResolver(AddHomeSchema),
    })
    const router = useRouter();
    const [description, setDescription] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [loading , setLoading] = useState<boolean>(false)
    const [maincategories, setMainategories] = useState<Array<string> | []>([])

    useEffect(() => {
        setValue("description", description);
        setValue("categories", maincategories);
    }, [description, maincategories])


    const ImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImage(file);
            setValue("image", file);
        }
    }
    const onSubmit = async (payload: AddHomeType) => {
        setLoading(true);
        const user = await supabase.auth.getUser();
        const uniquePath = Date.now() + "_" + generateRandomNumber();
        const { data: imgData, error: imgErr } = await supabase.storage
        .from(Env.S3_BUCKET)
        .upload(uniquePath, image!);
        if (imgErr) {
            toast.error(imgErr.message, { theme: "colored" });
            setLoading(false);
            return;
          }
          const { error: homeErr } = await supabase.from("homes").insert({
            user_id: user.data.user?.id,
            country: payload.country,
            state: payload.state,
            city: payload.city,
            title: payload.title,
            price: payload.price,
            description: payload.description,
            categories: maincategories,
            image: imgData?.path,
          });
      
          if (homeErr) {
            toast.error(homeErr.message, { theme: "colored" });
            setLoading(false);
            return;
          }
      
          router.push("/dashboard?success=Home added successfully!");
    }
    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="mt-5 mx-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter the title here"
                        {...register("title")}
                    />
                    <span className="text-red-500">{errors.title?.message}</span>
                </div>
                <div className="mt-5 mx-2">
                    <Label htmlFor="country">Countries</Label>
                    <br />
                    <select
                        {...register("country")}
                        id="country" className="block py-2.5 px-0  text-sm text-gray-500 bg-transparent border-2 border-gray-200">
                        <option value=""> -- Select Counrties --</option>
                        {
                            countries.map((item) => <option value={item.value}>{item.label}</option>)
                        }
                    </select>
                    <span className="text-red-500">{errors.country?.message}</span>
                </div>
                <div className="mt-5 mx-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="Enter the State here..."
                        {...register("state")}
                    />
                    <span className="text-red-500">{errors.state?.message}</span>
                </div>
                <div className="mt-5 mx-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter the city here..."
                        {...register("city")}
                    />
                    <span className="text-red-500">{errors.city?.message}</span>
                </div>
                <div className="mt-5 mx-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" placeholder="Enter the Price here"
                        {...register("price")}
                    />
                    <span className="text-red-500">{errors.price?.message}</span>
                </div>
                <div className="mt-5 mx-2">
                    <Label htmlFor="image">Image</Label>
                    <Input id="image" type="file" onChange={ImageChange} />
                    <span className="text-red-500">{errors.image?.message}</span>
                </div>
            </div>
            <div className="mt-5 mx-2">
                <ReactQuill theme="snow"
                    value={description}
                    onChange={setDescription}

                />
                <span className="text-red-500">{errors.description?.message}</span>
            </div>
            <div className="mt-2 mx-2">
                <Label htmlFor="categories">Categories</Label>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((item) => (
            <div className="items-top flex space-x-2" key={item.name}>
              <input
                type="checkbox"
                checked={(maincategories as string[]).includes(item.name)}
                id={item.name}
                value={item.name}
                className="bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
                onChange={(event) => {
                  if (event.target.checked) {
                    setMainategories([...maincategories, item.name]);
                  } else {
                    const filterCategories = maincategories.filter(
                      (item) => item !== event.target.value
                    );
                    setMainategories(filterCategories);
                  }
                }}
              />
              <label htmlFor={item.name} className="text-sm font-medium ">
                {item.name}
              </label>
            </div>
          ))}
        </div>
                <span className="text-red-500">{errors.categories?.message}</span>
            </div>
            <Button className="bg-red-500 w-full mt-2" disabled={loading}>
                {loading ? "Processing..." : "Submit"}
                </Button>
        </form>
        </div>  
    )
}
