import React, { useContext } from 'react';
import { SocketContext } from './context';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className="flex justify-around">
          <h1 className="mr-4 mt-1 text-lg font-bold">{call.name} is calling:</h1> {/* Add a margin-right to create space */}
          <button
            type="button"
            className="bg-black text-white font-medium rounded px-4 py-2"
            onClick={answerCall}
          >
            Answer
          </button>
        </div>
      )}
    </>
  );
};

export default Notifications;
