import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="gradient-sport text-primary-foreground py-6 px-4 rounded-b-3xl shadow-floating">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-foreground/20 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">🏃</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t.appName}</h1>
            <p className="text-sm opacity-80">{t.activities}</p>
          </div>
        </div>
        
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors px-4 py-2 rounded-xl"
        >
          <Globe className="w-5 h-5" />
          <span className="font-semibold">{language === 'ar' ? 'EN' : 'عربي'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
