import React, { useContext } from 'react';
import { SocketContext } from './context';
import { useSession } from 'next-auth/react'

const Sidebar = ({ children }) => {
  const { callAccepted, setName, callEnded, leaveCall, callUser, onlineDoctors } = useContext(SocketContext);
  const { data: session } = useSession();

  const sessionName = session?.user.name;
  console.log(sessionName);

  setName(sessionName); // Set the name value to the sessionName

  return (
    <>
      <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto my-10">
        <div className="p-4 border-2 border-black">
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4">
              <h6 className="text-lg font-medium mb-2 uppercase">Account Info</h6> {/* Add uppercase class for capital letters */}
              <h5 className="text-lg font-bold">{sessionName}</h5> {/* Add font-bold class for bold text */}
            </div>
          </div>
          <div>
            {onlineDoctors.map((doctor, index) => (
              <div key={index} className="flex items-center justify-between">
                <h6 className="text-lg font-medium">
                  {index + 1}. Doctor {doctor.name} is available to call
                </h6>

                {callAccepted && !callEnded ? (
                  <button
                    type="button"
                    className="bg-black hover:bg-red-600 text-white font-medium rounded px-4 py-2"
                    onClick={leaveCall}
                  >
                    Hang Up
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-black hover:bg-gray-700 text-white font-medium rounded px-4 py-2"
                    onClick={() => callUser(doctor.socketId)}
                  >
                    Call
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Sidebar;
