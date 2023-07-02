'use client'
import DashBoardCard from '@components/DashBoardCard'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const datas = [
    {
        header: "Call Doctor",
        img: "./assets/images/doctor.svg",
        button: "Call Now",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, reprehenderit."
    },
    {
        header: "Book Ambulance",
        img: "./assets/images/ambulance.svg",
        button: "Book Now",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, reprehenderit."
    },
    {
        header: "Call Fire Force",
        img: "./assets/images/fire.svg",
        button: "Call Now",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, reprehenderit."
    },
    {
        header: "Medical Records",
        img: "./assets/images/upload.svg",
        button: "View Now",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, reprehenderit."
    }

]

function dashboard() {

    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!session?.user) {
            router.push("/")
        }
    }, [session])

    return (
        session?.user ? (<div>
            <div className="bg-white py-4 sm:py-2">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-20 mb-12">
                    <div className="flex flex-wrap justify-around items-center p-5  rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0">
                        {datas.map((data) => (
                            <DashBoardCard header={data.header} button={data.button} img={data.img} description={data.description} key={data.header} />
                        ))}
                    </div>
                </div>
            </div>

        </div >
        ) :
            <>
                <h1 className="head_text text-left" >
                    <span className="blue_gradient" >Login to Access This page</span>
                </h1>
            </>
    )
}

export default dashboard