import { useState, useEffect } from 'react';
import { PrayerTimes } from '@/types/prayer';

export const usePrayerTimesGPS = (latitude: number | null, longitude: number | null) => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);

  useEffect(() => {
    if (latitude === null || longitude === null) return;

    const fetchLocationName = async () => {
      try {
        // Use OpenStreetMap Nominatim for reverse geocoding (free, no API key needed)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ar`
        );
        
        if (response.ok) {
          const data = await response.json();
          // Try to get city/town/village name
          const address = data.address;
          const cityName = address.city || address.town || address.village || address.municipality || address.county || address.state;
          if (cityName) {
            setLocationName(cityName);
            return;
          }
        }
      } catch (err) {
        console.log('Reverse geocoding failed, using timezone fallback');
      }
    };

    const fetchPrayerTimes = async () => {
      setLoading(true);
      setError(null);

      try {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        // Fetch location name in parallel
        fetchLocationName();

        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=19`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }

        const data = await response.json();
        const timings = data.data.timings;

        setPrayerTimes({
          Fajr: timings.Fajr,
          Sunrise: timings.Sunrise,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [latitude, longitude]);

  return { prayerTimes, loading, error, locationName };
};
