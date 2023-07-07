"use client"
import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';


const SocketContext = createContext();


const createSocket = () => {
  return io('http://localhost:5000', {
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 10,
  });
};


const getStoredSocketId = () => {
  return localStorage.getItem('socketId');
};

const storeSocketId = (socketId) => {
  localStorage.setItem('socketId', socketId);
};

const clearStoredSocketId = () => {
  localStorage.removeItem('socketId');
};


const ContextProvider = ({ children, session }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState(getStoredSocketId());
  const [soc , setSocket] = useState(null);
  const[onlineDoctors, setOnlineDoctors]= useState([])

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  let socket = useRef(null);

 

  

  useEffect(() => {

    socket.current = createSocket();
    setSocket(socket.current);
       
    socket.current.on('me', (id) => {
      setMe(id);
      storeSocketId(id);
    });

    socket.current.on('callUser', ({ from, name: callerRecName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerRecName, signal });
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((currentStream) => {
      setStream(currentStream);
      myVideo.current.srcObject = currentStream;
    })
    .catch((error) => {
      console.error('Error accessing media devices', error);
    });

    socket.current.on("getOnlineDoctors", (res) => {
      setOnlineDoctors(res);
      console.log(res);
    })
  
        
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
        clearStoredSocketId();
      }
    };

  }, [socket]);

useEffect(() => {

  if (session) {
    let namePrint;
    if (session.user.type === 'doctor') {
      namePrint = session.user.name;
      socket.current.emit("addDoctor",namePrint);
      console.log('passed');
    }
    console.log(namePrint);
  } else {
    console.log('No session data');
  } 

},[session]);
  

/*   useEffect(()=>{
    if (socket == null) return;
    if (session?.user.type === 'doctor')
    { 
      doctor = session?.user;
      socket.emit("addDoctor",doctor);
      console.log("passed");
    }
    
    namePrint = session?.user;
    console.log(namePrint);
    console.log("not doctor");

  },[soc]);
 */

// const socket = io('https://warm-wildwood-81069.herokuapp.com');


  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.current.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal); // receives signal from caller (call.signal) and sends it to remote peer.

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.current.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.current.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal); // receives the signal data from the remote peer and sends to the caller peer to establish webrtc connection.
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };


  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      onlineDoctors,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
