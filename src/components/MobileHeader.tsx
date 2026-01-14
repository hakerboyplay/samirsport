import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, Footprints } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
  const { t, language } = useLanguage();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/expenses':
        return t.expenses;
      case '/prayer':
        return t.prayerTimes;
      case '/quran':
        return language === 'ar' ? 'القرآن الكريم' : 'Holy Quran';
      default:
        return t.activities;
    }
  };

  return (
    <header className="gradient-sport text-primary-foreground py-4 px-4 shadow-floating sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-primary-foreground/20 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
            <Footprints className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold">{t.appName}</h1>
        </div>

        <div className="w-10" /> {/* Spacer for centering */}
      </div>
      <p className="text-center text-sm opacity-80 mt-1">{getPageTitle()}</p>
    </header>
  );
};

export default MobileHeader;
