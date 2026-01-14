import { useState, useEffect } from 'react';
import { Activity } from '@/types/activity';

const STORAGE_KEY = 'samir-sport-activities';

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  }, [activities]);

  const addActivity = (activity: Omit<Activity, 'id' | 'createdAt'>) => {
    const newActivity: Activity = {
      ...activity,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const updateActivity = (id: string, updates: Partial<Omit<Activity, 'id' | 'createdAt'>>) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, ...updates } : activity
      )
    );
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
  };

  const toggleComplete = (id: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, completed: !activity.completed } : activity
      )
    );
  };

  return {
    activities,
    addActivity,
    updateActivity,
    deleteActivity,
    toggleComplete,
  };
};
