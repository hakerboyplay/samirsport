import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, Clock, BookOpen, User, BookMarked } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const { language } = useLanguage();

  const navItems = [
    { path: '/debts', icon: BookMarked, labelAr: 'الكناش', labelEn: 'Debts' },
    { path: '/prayer', icon: Clock, labelAr: 'الصلاة', labelEn: 'Prayer' },
    { path: '/', icon: Home, labelAr: 'الرئيسية', labelEn: 'Home', isCenter: true },
    { path: '/quran', icon: BookOpen, labelAr: 'القرآن', labelEn: 'Quran' },
    { path: '/profile', icon: User, labelAr: 'حسابي', labelEn: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-40 safe-area-inset-bottom">
      <div className="flex items-center justify-between h-16 px-2 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300 flex-1 ${
                item.isCenter
                  ? isActive
                    ? 'text-primary scale-110'
                    : 'text-muted-foreground hover:text-primary hover:scale-105'
                  : isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                  isActive ? 'bg-primary/10' : ''
                }`}>
                  <item.icon className={`w-5 h-5 transition-transform duration-300 ${
                    isActive ? 'scale-110' : ''
                  }`} />
                </div>
                <span className={`text-[10px] font-medium transition-all duration-300 ${
                  isActive ? 'font-bold' : ''
                }`}>
                  {language === 'ar' ? item.labelAr : item.labelEn}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
