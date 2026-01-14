import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Footprints, Receipt } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const isExpensesPage = location.pathname === '/expenses';

  return (
    <header className="gradient-sport text-primary-foreground py-6 px-4 rounded-b-3xl shadow-floating">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-foreground/20 rounded-2xl flex items-center justify-center">
            <Footprints className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t.appName}</h1>
            <p className="text-sm opacity-80">{isExpensesPage ? t.expenses : t.activities}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Link
            to={isExpensesPage ? '/' : '/expenses'}
            className="flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors px-4 py-2 rounded-xl"
          >
            {isExpensesPage ? (
              <Footprints className="w-5 h-5" />
            ) : (
              <Receipt className="w-5 h-5" />
            )}
            <span className="font-semibold text-sm">
              {isExpensesPage ? t.activities : t.expenses}
            </span>
          </Link>
          
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors px-4 py-2 rounded-xl"
          >
            <Globe className="w-5 h-5" />
            <span className="font-semibold">{language === 'ar' ? 'EN' : 'عربي'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
