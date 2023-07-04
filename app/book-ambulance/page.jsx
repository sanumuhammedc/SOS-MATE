"use client"
import UserCard from '@components/UserCard'
import { useState, useEffect } from 'react'

const BookAmbulance = () => {

  const [drivers, setDrivers] = useState([]);

  const fetchDrivers = async () => {
    const response = await fetch("api/book/ambulance");
    const data = await response.json();

    setDrivers(data);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <>
      <h2 className="text-lg font-semibold blue_gradient mb-4">Available Ambulance Drivers</h2>
      {drivers.length > 0 ? (
        <div className='w-full flex justify-around flex-wrap'>
          {drivers.map((driver) => (
            <UserCard key={driver.id} image={driver.image} name={driver.name} username={driver.username} email={driver.email} action={"Book Now"} />
          ))}
        </div>
      )
       : (
        <>
        <p className="text-gray-900 mb-4">None of the Ambulance Drivers are online Please contact them through phone call</p> 
        <div className='w-full flex justify-around flex-wrap'>
          {drivers.map((driver) => (
            <UserCard key={driver.id} image={driver.image} name={driver.name} username={driver.username} email={driver.email} action={"Call Now"} />
          ))}
        </div>
        </>
      )}
      
    </> 
  )
}

export default BookAmbulance