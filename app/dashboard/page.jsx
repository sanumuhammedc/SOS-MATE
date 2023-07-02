'use client'
import DoctorDashboard from '@components/DoctorDashboard'
import DriverDashboard from '@components/DriverDashboard'
import UserDashboard from '@components/UserDashboard'
import AdminDashboard from '@components/AdminDashboard'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'



function dashboard() {

    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!session?.user) {
            router.push("/")
        }
    }, [session])


    return (
        session?.user ? (
            session.user.type === "user" &&  <UserDashboard /> ||
            session.user.type === "doctor" && <DoctorDashboard /> ||
            session.user.type === "driver" && <DriverDashboard /> ||
            session.user.type === "admin" && <AdminDashboard />
        ) :
            <>
                <h1 className="head_text text-left" >
                    <span className="blue_gradient" >Login to Access This page</span>
                </h1>
            </>
    )
}

export default dashboard