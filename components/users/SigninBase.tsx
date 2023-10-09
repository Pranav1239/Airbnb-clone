"use client"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
    AlertDialog,
    AlertDialogCancel,
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
import { RegisterType, registerSchema } from "@/validations/authSchema"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import SocialLinks from "./SocialLinks"


function SigninBase() {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterType>({
        resolver: yupResolver(registerSchema),
    })

    const onSubmit = async (payload: RegisterType) => {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email: payload.email,
            password: payload.password,
            options: {
                data: {
                    name: payload.name,
                }
            }
        });
        setLoading(false);
        if (error) {
            toast.error(error.message, { theme: "colored" });
        } else if (data.user) {
            await supabase.auth.signInWithPassword({
                email: payload.email,
                password: payload.password,
            });
            setOpen(false);
            router.refresh();
            toast.success('login successful', { theme: "colored" });
        }
    }

    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
                <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer"
                    onClick={() => setOpen(true)}

                >Sign in</li>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <div className="flex justify-between items-center">
                            <h1>Sign in</h1>
                            <AiOutlineClose onClick={() => setOpen(false)} />
                        </div></AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div className="mt-4">
                        <ToastContainer />
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h1 className="text-xl font-bold">Welcome to Airbnb</h1>
                                <div className="mt-5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        placeholder="Enter your name"
                                        id="name"
                                        {...register("name")}
                                    />
                                    <span className="text-red-500">{errors.name?.message}</span>
                                </div>
                                <div className="mt-5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        placeholder="Enter your email"
                                        id="email"
                                        {...register("email")}
                                    />
                                    <span className="text-red-500">{errors.email?.message}</span>
                                </div>
                                <div className="mt-5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        placeholder="Enter your password..."
                                        id="password"
                                        {...register("password")}
                                    />
                                    <span className="text-red-500">{errors.password?.message}</span>
                                </div>
                                <div className="mt-5">
                                    <Label htmlFor="cpassword">Confirm Password</Label>
                                    <Input
                                        placeholder="Confirm your password..."
                                        id="cpassword"
                                        {...register("password_confirmation")}
                                    />
                                    <span className="text-red-500">{errors.password_confirmation?.message}</span>
                                </div>
                                <div className="mt-5">
                                    <Button 
                                    className="bg-brand w-full" 
                                    disabled={loading}>
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

export default SigninBase;