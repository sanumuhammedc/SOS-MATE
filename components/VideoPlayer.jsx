import React, { useContext, useRef, useEffect } from 'react';
import { SocketContext } from '../app/api/socket/context';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  const videoRef = useRef();

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stream && (
        <div className="p-2 border-2 border-black">
          <h5 className="mb-2">{name || 'Name'}</h5>
          <video playsInline ref={videoRef} autoPlay className="w-550 sm:w-300" />
        </div>
      )}
      {callAccepted && !callEnded && (
        <div className="p-2 border-2 border-black">
          <h5 className="mb-2">{call.name || 'Name'}</h5>
          <video playsInline ref={userVideo} autoPlay className="w-550 sm:w-300" />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;