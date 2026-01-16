import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    loading: true,
    error: null,
  });

  const requestLocation = () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setState({
        latitude: null,
        longitude: null,
        loading: false,
        error: 'Geolocation is not supported by your browser',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
          error: null,
        });
        // Save to localStorage
        localStorage.setItem(
          'userLocation',
          JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setState({
          latitude: null,
          longitude: null,
          loading: false,
          error: errorMessage,
        });
      },
      {
        enableHighAccuracy: false, // Use faster, less accurate location first
        timeout: 30000, // Increase timeout to 30 seconds
        maximumAge: 600000, // 10 minutes cache
      }
    );
  };

  useEffect(() => {
    // Try to load from localStorage first
    const saved = localStorage.getItem('userLocation');
    if (saved) {
      try {
        const { latitude, longitude } = JSON.parse(saved);
        if (latitude && longitude) {
          setState({
            latitude,
            longitude,
            loading: false,
            error: null,
          });
          // Don't auto-request if we have saved location - let user refresh manually
          return;
        }
      } catch (e) {
        console.log('Failed to parse saved location');
      }
    }
    // Only request if no saved location
    requestLocation();
  }, []);

  return { ...state, requestLocation };
};
