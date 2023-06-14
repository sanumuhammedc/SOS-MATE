import React from 'react'

const Navbar = () => {
  return (
    <div className=''>
        <div className="flex flex-col lg:flex-row justify-center  lg:justify-between items-center gap-5">
            <img width={90} height={90} src="/assets/logo.png" alt="logo" />
            <div className="flex flex-col lg:flex-row justify-center  lg:justify-between items-center gap-5">
                <a href="">hello!</a>
                <a href="">Home</a> 
                <a href="">Ambulance</a>
                <a href="">Doctor</a>
                <a href="">Support</a>
            </div>
            <button className='btn bg-white text-[#7270dd] border-none hover:bg-[#7270dd] hover:text-white capitalize rounded-full'>
                LogOut
            </button>
        </div>
    </div>
  )
}

export default Navbar