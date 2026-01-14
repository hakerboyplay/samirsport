import { useState, useEffect } from 'react';
import { Surah, SurahDetail } from '@/types/quran';

export const useQuranSurahs = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        if (!response.ok) throw new Error('Failed to fetch surahs');
        const data = await response.json();
        setSurahs(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  return { surahs, loading, error };
};

export const useSurahDetail = (surahNumber: number | null) => {
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!surahNumber) return;

    const fetchSurah = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNumber}`
        );
        if (!response.ok) throw new Error('Failed to fetch surah');
        const data = await response.json();
        setSurah(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [surahNumber]);

  return { surah, loading, error };
};
