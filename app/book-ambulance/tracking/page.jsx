"use client"
import React, { useEffect, useState } from 'react';
import MapContainer from '@/components/MapContainer';
import { useSession } from 'next-auth/react';

const TrackingPage = () => {
  const [location, setLocation] = useState({ latitude: 0, latitude: 0 });
  const { data:session } = useSession();


  const updateLocation = async () => {
    const userId = session?.user?.id;
    const location = navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude: latitude, lng: latitude });
      }
    );

    const response = await fetch(`/api/users/${userId}/location`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location: location })
    });

  }

  useEffect(() => {
    
    
    const interval = setInterval(updateLocation, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>Ambulance Tracking</h1>
      <MapContainer lat={location.lat} lng={location.lng} />
    </div>
  );
};

export default TrackingPage;