"use client"
import UserCard from '@components/UserCard'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const BookDoctor = () => {

  const [doctors, setDoctor] = useState([]);
  const [onlineDoctors, setOnlineDoctors] = useState([]);
  const { data: session } = useSession()
  const router = useRouter()

  const fetchDoctors = async () => {
    const response1 = await fetch("api/book/doctor");
    const data1 = await response1.json();
    setDoctor(data1);

    const response = await fetch("api/book/doctor/online");
    const data = await response.json();
    setOnlineDoctors(data);
  };

  console.log(session?.user);

  useEffect(() => {
    fetchDoctors();
    const interval = setInterval(fetchDoctors, 10000);

    return ()=>{
      clearInterval(interval)
    }
  }, []);

  return (
    
    session?.user ?
      <>
        <h2 className="text-lg font-semibold blue_gradient mb-4">Doctors Available Online</h2>
        {onlineDoctors.length > 0 ? (
          <div className='w-full flex justify-around flex-wrap'>
            {onlineDoctors.map((doctor) => (
              <UserCard key={doctor._id} image={doctor.image} name={doctor.name} username={doctor.username} phone={doctor.phone} email={doctor.email} action={"Book Now"} link={`/call-doctor/${doctor._id}`} />
            ))}
          </div>
        )
          : (
            <>
              <p className="text-gray-900 mb-4 text-center">None of the Doctors are online Please contact them through phone call</p>
              <div className='w-full flex justify-around flex-wrap'>
                {doctors.map((doctor) => (
                  <UserCard key={doctor._id} image={doctor.image} name={doctor.name} username={doctor.username} phone={doctor.phone} email={doctor.email} action={"Call Now"} link={`tel:${doctor.phone}`} />
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

export default BookDoctor