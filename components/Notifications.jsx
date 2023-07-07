import React, { useContext } from 'react';

import { SocketContext } from '../app/api/socket/context';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className="flex justify-around">
          <h1>{call.name} is calling:</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-4 py-2"
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
