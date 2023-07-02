"use client"
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";


const MyProfile = () => {

    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!session?.user) {
            router.push("/")
        }
    }, [session])



    return (
        session?.user ?
            <Profile
                desc="Welcome to your personalised profile page"
            />
            :
            <>
                <h1 className="head_text text-left" >
                    <span className="blue_gradient" >Login to Access This page</span>
                </h1>
            </>
    )
}
export default MyProfile
