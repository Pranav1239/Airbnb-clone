"use client"
import {
    AlertDialog,
    AlertDialogAction,
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
import Image from "next/image"
import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

function LoginBase() {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer">Login</li>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <div className="flex justify-between items-center">
                            <h1>Login</h1>
                            <AlertDialogCancel><AiOutlineClose /></AlertDialogCancel>
                        </div></AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="mt-4">
                            <form>
                                <h1 className="text-xl font-bold">Welcome to Airbnb</h1>
                                <div className="mt-5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input placeholder="Enter your email" id="email" />
                                    <span className="text-red-500"></span>
                                </div>
                                <div className="mt-5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input placeholder="Enter your password..." id="password" />
                                    <span className="text-red-500"></span>
                                </div>
                                <div className="mt-5">
                                    <Button className="bg-brand w-full">Continue</Button>
                                </div>
                                <div className="mt-5">
                                    <Button variant="outline" className="w-full">
                                        <Image
                                            src="/images/google.png"
                                            alt="google"
                                            width={25}
                                            height={25}
                                            className="mx-3"
                                        />
                                        Continue with Google
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        <Image
                                            src="/images/github.png"
                                            alt="github"
                                            width={25}
                                            height={25}
                                            className="mx-3"
                                        />
                                        Continue with Github
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default LoginBase