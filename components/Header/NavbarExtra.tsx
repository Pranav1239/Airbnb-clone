"use client"
import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function NavbarExtra() {
    const HandleError = () => {
        toast.error("Please login to access", { theme: "colored" });
    }
    return (
        <div>
            <div
                onClick={HandleError}
                className="p-2 border-2 cursor-pointer text-sm rounded-full">
                <h1>Add Home</h1>
            </div>
        </div>
    )
}
