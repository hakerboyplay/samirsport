import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, Footprints, Sparkles } from 'lucide-react';
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
      case '/general-expenses':
        return language === 'ar' ? 'المصاريف' : 'Expenses';
      case '/prayer':
        return t.prayerTimes;
      case '/quran':
        return language === 'ar' ? 'القرآن الكريم' : 'Holy Quran';
      case '/profile':
        return language === 'ar' ? 'حسابي' : 'My Profile';
      case '/debts':
        return language === 'ar' ? 'الكناش' : 'Debts Book';
      case '/tasbeeh':
        return language === 'ar' ? 'عداد التسبيحات' : 'Tasbeeh Counter';
      default:
        return t.activities;
    }
  };

  return (
    <header className="gradient-sport text-primary-foreground py-3 px-4 shadow-floating fixed top-[env(safe-area-inset-top)] left-0 right-0 z-30">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-primary-foreground/20 rounded-xl transition-all duration-300 hover:scale-105"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-9 h-9 bg-primary-foreground/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Footprints className="w-5 h-5" />
            </div>
            <Sparkles className="w-3 h-3 absolute -top-1 -end-1 text-yellow-300 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold leading-tight tracking-wide">{t.appName}</h1>
            <p className="text-[10px] opacity-70 leading-none">{getPageTitle()}</p>
          </div>
        </div>

        <div className="w-9" />
      </div>
    </header>
  );
};

export default MobileHeader;
