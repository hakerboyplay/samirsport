import { useState, useEffect } from 'react';
import { PrayerTimes } from '@/types/prayer';

export const usePrayerTimesGPS = (latitude: number | null, longitude: number | null) => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);

  useEffect(() => {
    if (latitude === null || longitude === null) return;

    const fetchPrayerTimes = async () => {
      setLoading(true);
      setError(null);

      try {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=19`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }

        const data = await response.json();
        const timings = data.data.timings;
        const meta = data.data.meta;

        setPrayerTimes({
          Fajr: timings.Fajr,
          Sunrise: timings.Sunrise,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha,
        });

        // Try to get location name from timezone or use coordinates
        if (meta.timezone) {
          const parts = meta.timezone.split('/');
          setLocationName(parts[parts.length - 1].replace(/_/g, ' '));
        }
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
