"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignOut() {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const Logout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        toast.success("successfully logout", { theme: "colored" });
    }
    return (
        <AlertDialog>
            <ToastContainer />
            <AlertDialogTrigger asChild>
                <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                    SignOut
                </li>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Click this button to log out of your account. This will end your current session and you will be returned to the home page.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={Logout} className="bg-brand">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
