import React, { useState, useEffect } from 'react';
import AppSidebar from './AppSidebar';
import MobileHeader from './MobileHeader';
import BottomNavigation from './BottomNavigation';
import FloatingNavButton from './FloatingNavButton';
import ActivityForm from './ActivityForm';
import { useActivities } from '@/hooks/useActivities';
import { Activity } from '@/types/activity';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const { addActivity } = useActivities();
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleAddActivity = (activityData: Omit<Activity, 'id' | 'createdAt'>) => {
    addActivity(activityData);
    setShowActivityForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
      <main className="pt-14 pb-20 transition-all duration-300">
        {children}
      </main>
      <BottomNavigation />
      <FloatingNavButton onClick={() => setShowActivityForm(true)} />
      
      {showActivityForm && (
        <ActivityForm
          onSubmit={handleAddActivity}
          onClose={() => setShowActivityForm(false)}
          editActivity={null}
        />
      )}
    </div>
  );
};

export default Layout;
