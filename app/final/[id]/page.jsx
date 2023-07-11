"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import UserCard from "@components/UserCard"
import { useRouter, useParams } from "next/navigation"


const Final = () => {

    const { data: session } = useSession()
    const [driver, setDriver] = useState({})
    const [booking, setBooking] = useState(null);
    const router = useRouter();
    const params = useParams();


    const fetchDriver = async () => {
        let id = params.id
        let response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        let data = await response.json()
        if(data.booking === null){
            router.push('/dashboard')
            return
        }
        
        response = await fetch(`http://localhost:3000/api/users/${data.booking}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        data = await response.json()
        setDriver(data)
    }

    const markAsCompleted = async () => {
        const userId = params.id;
        const response = await fetch(`/api/book/ambulance/${userId}/booking`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setBooking(data);
        router.push('/dashboard');
      };

    useEffect(() => {
        const interval = setInterval(fetchDriver, 2000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            <h1 className="text-center">
                Ambulance Booking Success
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center">Ambulance is on the way to Your location</span>
            </h1>
            
            {driver && <button className="black_btn mt-4" onClick={markAsCompleted} >Cancel Booking</button>}
            <br />
            <h1 className="head_text text-left" >
                <span className="blue_gradient" >Ambulance Driver Details</span>
            </h1>

            {driver && <div className='w-full flex justify-around flex-wrap mt-10'>
                <UserCard image={driver.image} name={driver.name} username={driver.username} phone={driver.phone} email={driver.email} action={"Call Now"} link={`tel:${driver.phone}`} />
            </div>}

        </>
    )
}

export default Final