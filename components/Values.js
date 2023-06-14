import React from "react";

const Values = () => {
  return (
    <div className="container mx-auto py-20">
      <p className="text-base lg:text-xl font-medium text-gray-500 text-center">
        WHY CHOOSE US
      </p>
      <p className=" text-3xl lg:text-5xl font-semibold text-gray-500 text-center mt-3">
        Our Features
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16 py-20">
        <div className="flex flex-col gap-5 items-center">
          <img src="/assets/v1.svg" alt="v1" />
          <p className="text-2xl font-semibold">Call Doctors</p>
          <p className="text-gray-500 text-center">
          Real-time video calls between users and doctors, providing immediate medical assistance and first aid during emergency situations, all within the convinience of their own location.          </p>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <img src="/assets/v2.svg" alt="v1" />
          <p className="text-2xl font-semibold">Book Ambulance</p>
          <p className="text-gray-500 text-center">
          SOSMate includes an ambulance and fire force booking feature as well that allows users to quickly and easily request an ambulance during medical emergencies.
          </p>
        </div> <div className="flex flex-col gap-5 items-center">
          <img src="/assets/v3.svg" alt="v1" />
          <p className="text-2xl font-semibold">Medical Records</p>
          <p className="text-gray-500 text-center">
          We provide a secure medical records storage feature, allowing users to store and access their medical records online for easy retrieval and sharing with healthcare providers when needed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Values;
