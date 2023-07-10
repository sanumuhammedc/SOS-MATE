"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import UserCard from '@components/UserCard'
import { useRouter } from "next/navigation"

const DriverDashboard = () => {

  const { data: session } = useSession();
  const [booking, setBooking] = useState(null);
  const router = useRouter();

  const driverId = session?.user?.id;

  const fetchBooking = async () => {
    const response = await fetch(`api/book/ambulance/${driverId}/booking`);
    const data = await response.json();
    setBooking(data);
  };

  useEffect(() => {

    const toggleOffline = async () => {
      const id = session?.user?.id;
      const response = await fetch(`/api/online/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
    };
    toggleOffline()

    const interval = setInterval(fetchBooking, 1000);

    return () => {
      const toggleOnline = async () => {
        const id = session?.user?.id;
        const response = await fetch(`/api/online/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
      };
      toggleOnline()
      clearInterval(interval);
    }
  }, [])

  const markAsCompleted = async () => {
    const response = await fetch(`/api/book/ambulance/${driverId}/booking`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setBooking(data);
  };

  // `https://www.google.com/maps/search/?api=1&query=${booking.location.latitude},${booking.location.longitude}`

  return (
    <>
      {session?.user ?
        <>
          <h2 className="text-lg font-semibold blue_gradient mb-4">Your Bookings</h2>
          
          {booking ? (
            <>
            <button className="black_btn" onClick={markAsCompleted} >Mark as Completed</button>
            <br />
            <div className='w-full flex justify-around flex-wrap'>
              <UserCard key={booking._id} image={booking.image} name={booking.name} 
              username={booking.username} email={booking.email} action={"Navigate"} 
              link={`https://www.google.com/maps/search/?api=1&query=${booking.location.latitude},${booking.location.longitude}`} 
              target={"_blank"}
              />
            </div>
            </>

          ) : (
            <p className="text-gray-900 mb-4 text-center">You have no bookings</p>
          )}
        </> :
        <h1 className="head_text text-left" >
          <span className="blue_gradient" >Login to Access This page</span>
        </h1>
      }
    </>
  )
}

export default DriverDashboard