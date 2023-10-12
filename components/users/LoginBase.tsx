"use client"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { loginSchema , LoginType } from "@/validations/authSchema"
import SocialLinks from "./SocialLinks"

function LoginBase() {
    const supabase = createClientComponentClient();
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginType>({
        resolver: yupResolver(loginSchema),
      });
    

    const onSubmit = async (payload: LoginType) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: payload.email,
          password: payload.password,
        });
    
        if (error) {
          toast.error(error.message, { theme: "colored" });
        } else if (data.user) {
          setOpen(false);
          router.refresh();
          toast.success("Logged in successfully!", { theme: "colored" });
        }
      };
    return (
            <AlertDialog open={open}>
                <AlertDialogTrigger asChild>
                    <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer"
                      onClick={() => setOpen(true)}
                     >Login</li>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            <div className="flex justify-between items-center">
                                <h1>Login</h1>
                                <AiOutlineClose onClick={() => setOpen(false)} className="cursor-pointer" />
                            </div></AlertDialogTitle>
                        <AlertDialogDescription asChild>
                            <div className="mt-4">

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h1 className="text-xl font-bold">Welcome to Airbnb</h1>
                                    <div className="mt-5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            placeholder="Enter your email"
                                            id="email"
                                            type="email"
                                            {...register("email")}
                                        />
                                        <span className="text-red-500" typeof="">
                                            {errors.email?.message}
                                        </span>
                                    </div>
                                    <div className="mt-5">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            placeholder="Enter your password..."
                                            id="password"
                                            type="password"
                                            {...register("password")}
                                        />
                                        <span className="text-red-500">
                                            {errors.password?.message}
                                        </span>
                                    </div>
                                    <div className="mt-5">
                                        <Button
                                            className="bg-brand w-full"
                                            disabled={loading}
                                            type="submit"
                                            >
                                            
                                            {loading ? "Processing..." : "Continue"}
                                        </Button>
                                    </div>
                                </form>
                                <SocialLinks />
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
    )
}

export default LoginBase