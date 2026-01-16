import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { NavLink, useLocation } from 'react-router-dom';
import { Footprints, Receipt, Clock, BookOpen, Moon, Sun, Globe, X, BookMarked, Wallet, CircleDot } from 'lucide-react';

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen, onClose, isDark, onToggleTheme }) => {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Footprints, labelAr: 'الأنشطة', labelEn: 'Activities' },
    { path: '/debts', icon: BookMarked, labelAr: 'الكناش', labelEn: 'Debts' },
    { path: '/expenses', icon: Receipt, labelAr: 'فاتورة الأكل الصحي', labelEn: 'Food Expenses' },
    { path: '/general-expenses', icon: Wallet, labelAr: 'المصاريف', labelEn: 'Expenses' },
    { path: '/prayer', icon: Clock, labelAr: 'الصلاة', labelEn: 'Prayer' },
    { path: '/quran', icon: BookOpen, labelAr: 'القرآن', labelEn: 'Quran' },
    { path: '/tasbeeh', icon: CircleDot, labelAr: 'عداد التسبيحات', labelEn: 'Tasbeeh Counter' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-full w-72 bg-card border-e border-border z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="gradient-sport text-primary-foreground p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
              <Footprints className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">{t.appName}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-foreground/20 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">
                {language === 'ar' ? item.labelAr : item.labelEn}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Settings */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border space-y-2">
          <button
            onClick={onToggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-muted transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="font-medium">
              {isDark ? (language === 'ar' ? 'الوضع الفاتح' : 'Light Mode') : (language === 'ar' ? 'الوضع الداكن' : 'Dark Mode')}
            </span>
          </button>
          <button
            onClick={toggleLanguage}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-muted transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span className="font-medium">
              {language === 'ar' ? 'English' : 'العربية'}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
