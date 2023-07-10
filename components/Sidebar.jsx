import React, { useState, useContext } from 'react';
import { SocketContext } from '../app/api/socket/context';

const Sidebar = ({ children , session }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, onlineDoctors } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  const handleCopyClick = (e) => {
    
    navigator.clipboard.writeText(me)
      .then(() => {
        console.log('Copied to clipboard:', me);
      })
      .catch((error) => {
        console.error('Failed to copy to clipboard:', error);
      });
  };

  return (
    <>
      <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto my-10">
        <div className="p-4 border-2 border-black">
          <form className="flex flex-col gap-4" noValidate autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4">
                <h6 className="text-lg font-medium mb-2">Account Info</h6>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-4 py-2 w-full"
                  onClick={handleCopyClick}
                >
                  Copy Your ID
                </button>
              
              </div>
              <div className="p-4">
                <h6 className="text-lg font-medium mb-2">Make a Call</h6>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                  placeholder="ID to call"
                />
                {callAccepted && !callEnded ? (
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white font-medium rounded px-4 py-2 w-full"
                    onClick={leaveCall}
                  >
                    Hang Up
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-4 py-2 w-full"
                    onClick={() => callUser(idToCall)}
                  >
                    Call
                  </button>
                )}
              </div>
            </div>
          </form>
          <div>
            {onlineDoctors.map((doctor, index) => {
              // Check if the doctor is the current user
              if (session && session.user && session.user.type === 'doctor' && session.user.name === doctor.name) {
                return null; // Skip rendering for the current user
              }

              return (
                <h6 key={index} className="text-lg font-medium">
                  {index + 1}. Doctor {doctor.name} with ID: {doctor.socketId} is available to call
                </h6>
              );
            })}
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Sidebar;
