import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, User, Clock, BookOpen } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const { language } = useLanguage();

  const navItems = [
    { path: '/prayer', icon: Clock, labelAr: 'الصلاة', labelEn: 'Prayer' },
    { path: '/', icon: Home, labelAr: 'الرئيسية', labelEn: 'Home' },
    { path: '/quran', icon: BookOpen, labelAr: 'القرآن', labelEn: 'Quran' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-4 max-w-md mx-auto">
        {navItems.map((item, index) => (
          <React.Fragment key={item.path}>
            {index === 1 && (
              <div className="w-16" /> 
            )}
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">
                {language === 'ar' ? item.labelAr : item.labelEn}
              </span>
            </NavLink>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
