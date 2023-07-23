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

