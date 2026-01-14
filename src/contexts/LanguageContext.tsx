import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface Translations {
  appName: string;
  activities: string;
  addActivity: string;
  today: string;
  upcoming: string;
  completed: string;
  share: string;
  delete: string;
  edit: string;
  save: string;
  cancel: string;
  title: string;
  description: string;
  date: string;
  noActivities: string;
  addFirstActivity: string;
  markComplete: string;
  markIncomplete: string;
  shareWith: string;
  activityShared: string;
  running: string;
  training: string;
  rest: string;
  competition: string;
  other: string;
  type: string;
  search: string;
  all: string;
  // Expense translations
  expenses: string;
  addExpense: string;
  eggs: string;
  raisins: string;
  almonds: string;
  water: string;
  rice: string;
  yogurt: string;
  currency: string;
  totalExpenses: string;
  thisMonth: string;
  noExpenses: string;
  addFirstExpense: string;
  foodName: string;
  foodNamePlaceholder: string;
  category: string;
  price: string;
  quantity: string;
}

const translations: Record<Language, Translations> = {
  ar: {
    appName: 'سمير سبورت',
    activities: 'الأنشطة',
    addActivity: 'إضافة نشاط',
    today: 'اليوم',
    upcoming: 'القادم',
    completed: 'مكتمل',
    share: 'مشاركة',
    delete: 'حذف',
    edit: 'تعديل',
    save: 'حفظ',
    cancel: 'إلغاء',
    title: 'العنوان',
    description: 'الوصف',
    date: 'التاريخ',
    noActivities: 'لا توجد أنشطة',
    addFirstActivity: 'أضف نشاطك الأول',
    markComplete: 'تحديد كمكتمل',
    markIncomplete: 'إلغاء الإكمال',
    shareWith: 'مشاركة مع الأصدقاء',
    activityShared: 'تم نسخ النشاط للمشاركة!',
    running: 'جري',
    training: 'تدريب',
    rest: 'راحة',
    competition: 'منافسة',
    other: 'أخرى',
    type: 'النوع',
    search: 'بحث...',
    all: 'الكل',
    // Expense translations
    expenses: 'فاتورة الأكل الصحي',
    addExpense: 'إضافة مصروف',
    eggs: 'البيض',
    raisins: 'الزبيب',
    almonds: 'اللوز',
    water: 'الماء',
    rice: 'الأرز',
    yogurt: 'الياغورت',
    currency: 'دج',
    totalExpenses: 'إجمالي المصاريف',
    thisMonth: 'هذا الشهر',
    noExpenses: 'لا توجد مصاريف',
    addFirstExpense: 'أضف مصروفك الأول',
    foodName: 'اسم الطعام',
    foodNamePlaceholder: 'مثال: بيض بلدي',
    category: 'الفئة',
    price: 'السعر',
    quantity: 'الكمية',
  },
  en: {
    appName: 'Samir Sport',
    activities: 'Activities',
    addActivity: 'Add Activity',
    today: 'Today',
    upcoming: 'Upcoming',
    completed: 'Completed',
    share: 'Share',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    title: 'Title',
    description: 'Description',
    date: 'Date',
    noActivities: 'No activities',
    addFirstActivity: 'Add your first activity',
    markComplete: 'Mark as complete',
    markIncomplete: 'Mark as incomplete',
    shareWith: 'Share with friends',
    activityShared: 'Activity copied for sharing!',
    running: 'Running',
    training: 'Training',
    rest: 'Rest',
    competition: 'Competition',
    other: 'Other',
    type: 'Type',
    search: 'Search...',
    all: 'All',
    // Expense translations
    expenses: 'Healthy Food Expenses',
    addExpense: 'Add Expense',
    eggs: 'Eggs',
    raisins: 'Raisins',
    almonds: 'Almonds',
    water: 'Water',
    rice: 'Rice',
    yogurt: 'Yogurt',
    currency: 'DZD',
    totalExpenses: 'Total Expenses',
    thisMonth: 'This Month',
    noExpenses: 'No expenses',
    addFirstExpense: 'Add your first expense',
    foodName: 'Food Name',
    foodNamePlaceholder: 'e.g., Organic Eggs',
    category: 'Category',
    price: 'Price',
    quantity: 'Quantity',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    dir: language === 'ar' ? 'rtl' : 'ltr',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
