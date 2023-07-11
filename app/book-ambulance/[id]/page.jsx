"use client"
import { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import PlacesAutocomplete from 'react-google-autocomplete';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
Geocode.enableDebug();

const LocationPick = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();

  const userId = session?.user?.id;
  const driverId = params?.id;

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation({ lat: latitude, lng: longitude });
          reverseGeocode(latitude, longitude);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await Geocode.fromLatLng(latitude, longitude);
      const address = response.results[0].formatted_address;
      setAddress(address);
    } catch (error) {
      console.error('Error while reverse geocoding:', error);
    }
  };

  const handlePlaceSelect = (place) => {
    if (place && place.description) {
      Geocode.fromAddress(place.description)
        .then((response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setSelectedLocation({ lat, lng });
          setAddress(place.description);
        })
        .catch((error) => {
          console.error('Error while geocoding:', error);
        });
    }
  };

  const handleInputChange = (event) => {
    setAddress(event.target.value);
  };

  const handleLocationSave = async () => {
    if (selectedLocation) {
      setLoading(true);
  
      const locationRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
            address: address,
          },
          booking: driverId,
        }),
      };
  
      await fetch(`/api/users/${userId}/location`, locationRequestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('User location saved:', data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error while saving user location:', error);
          setLoading(false);
        });
  
      const bookingRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking:  userId,
        }),
      };
  
      await fetch(`/api/book/ambulance/${driverId}`, bookingRequestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('Booking saved:', data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error while saving booking:', error);
          setLoading(false);
        });

        router.push(`final/${userId}`);

    } else {
      console.error('No location selected.');
    }
  };
  
  

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Set Your Location</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <h3 className="text-lg font-semibold mb-2">Your Location:</h3>
            <p>{address}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Change Location:</h3>
            <PlacesAutocomplete
              value={address}
              onChange={handleInputChange}
              onSelect={handlePlaceSelect}
              apiKey={apiKey}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={handleLocationSave}
              className="black_btn"
            >
              Save And Book
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationPick;
