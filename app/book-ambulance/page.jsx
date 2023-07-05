"use client"
import UserCard from '@components/UserCard'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'


const BookAmbulance = () => {

  const [drivers, setDrivers] = useState([]);
  const { data: session } = useSession()

  const fetchDrivers = async () => {
    const response = await fetch("api/book/ambulance");
    const data = await response.json();
    console.log(data);

    setDrivers(data);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    session?.user ?
      <>
        <h2 className="text-lg font-semibold blue_gradient mb-4">Available Ambulance Drivers</h2>
        {drivers.length > 0 ? (
          <div className='w-full flex justify-around flex-wrap'>
            {drivers.map((driver) => (
              <UserCard key={driver._id} image={driver.image} name={driver.name} username={driver.username} phone={driver.phone} email={driver.email} action={"Book Now"} link={`tel:${driver.phone}`} />
            ))}
          </div>
        )
          : (
            <>
              <p className="text-gray-900 mb-4 text-center">None of the Ambulance Drivers are online Please contact them through phone call</p>
              <div className='w-full flex justify-around flex-wrap'>
                {drivers.map((driver) => (
                  <UserCard key={driver._id} image={driver.image} name={driver.name} username={driver.username} phone={driver.phone} email={driver.email} action={"Call Now"} link={`tel:${driver.phone}`} />
                ))}
              </div>
            </>
          )}
      </> :
      
        <h1 className="head_text text-left" >
          <span className="blue_gradient" >Login to Access This page</span>
        </h1>
  )
}

export default BookAmbulance