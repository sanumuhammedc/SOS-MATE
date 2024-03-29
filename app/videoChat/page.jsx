"use client"
import React from 'react';
import { ContextProvider } from '@components/context';
import VideoPlayer from '../../components/VideoPlayer';
import Sidebar from '../../components/Sidebar';
import Notifications from '../../components/Notifications';
import { useSession } from 'next-auth/react';

const VideoChat = () => {
  const { data: session } = useSession();

  return (
    <ContextProvider session={session}>
      <div className="flex flex-col items-center">
        <div className="rounded-lg m-8 border-2 border-black w-600px md:w-90%">
          <h2 className="text-3xl font-bold text-center p-4">Video Chat</h2>
        </div>
        <VideoPlayer />
        {session && session.user && session.user.type === 'doctor' ? (
          <Notifications />
        ) : (
          <Sidebar>
            <Notifications />
          </Sidebar>
        )}
      </div>
    </ContextProvider>
  );
};

export default VideoChat;

