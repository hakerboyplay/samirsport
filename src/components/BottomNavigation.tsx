import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, Clock, BookOpen, User, Plus } from 'lucide-react';

interface BottomNavigationProps {
  onAddClick?: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ onAddClick }) => {
  const { language } = useLanguage();

  const navItems = [
    { path: '/prayer', icon: Clock, labelAr: 'الصلاة', labelEn: 'Prayer' },
    { path: '/quran', icon: BookOpen, labelAr: 'القرآن', labelEn: 'Quran' },
    { path: '/', icon: Home, labelAr: 'الرئيسية', labelEn: 'Home', isCenter: true },
    { path: '/profile', icon: User, labelAr: 'حسابي', labelEn: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-40 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {/* Prayer */}
        <NavLink
          to="/prayer"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300 ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10' : ''}`}>
                <Clock className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
                {language === 'ar' ? 'الصلاة' : 'Prayer'}
              </span>
            </>
          )}
        </NavLink>

        {/* Quran */}
        <NavLink
          to="/quran"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300 ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10' : ''}`}>
                <BookOpen className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
                {language === 'ar' ? 'القرآن' : 'Quran'}
              </span>
            </>
          )}
        </NavLink>

        {/* Add Button - Center */}
        <button
          onClick={onAddClick}
          className="relative -top-4 w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-floating text-primary-foreground hover:scale-110 transition-transform duration-300"
        >
          <Plus className="w-7 h-7" />
        </button>

        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300 ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10' : ''}`}>
                <Home className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
                {language === 'ar' ? 'الرئيسية' : 'Home'}
              </span>
            </>
          )}
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300 ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10' : ''}`}>
                <User className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
                {language === 'ar' ? 'حسابي' : 'Profile'}
              </span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavigation;
