import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/debt';

const STORAGE_KEY = 'samir-sport-profile';

const defaultProfile: UserProfile = {
  name: '',
  phone: '',
  address: '',
  facebook: '',
  instagram: '',
  twitter: '',
  email: '',
};

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  return {
    profile,
    updateProfile,
  };
};
