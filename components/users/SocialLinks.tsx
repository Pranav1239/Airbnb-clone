import Image from "next/image";
import { Button } from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogo } from "../../assets/google.png"
import { GithubLogo } from "../../assets/github.png"

export default function SocialLinks() {
    const supabase = createClientComponentClient();
    const githubLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        });
        if (error) {
            toast.error(error.message, { theme: "colored" });
        }
    }

    const googleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        });
        if (error) {
            toast.error(error.message, { theme: "colored" });
        }
    }
    return (
        <div className="mt-5">
            <Button variant="outline" className="w-full" onClick={googleLogin}>
                <Image
                    src={GoogleLogo}
                    alt="google"
                    width={25}
                    height={25}
                    className="mx-3"
                />
                Continue with Google
            </Button>
            <Button variant="outline" className="w-full" onClick={githubLogin}>
            <Image
                    src={GithubLogo}
                    alt="github"
                    width={25}
                    height={25}
                    className="mx-3"
                />
                Continue with Github
            </Button>
        </div>
    )
}
