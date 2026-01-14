import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PrayerTimeCardProps {
  name: string;
  time: string;
  isNext?: boolean;
}

const PrayerTimeCard: React.FC<PrayerTimeCardProps> = ({ name, time, isNext }) => {
  const { t } = useLanguage();

  const prayerNames: Record<string, { ar: string; en: string }> = {
    Fajr: { ar: 'الفجر', en: 'Fajr' },
    Sunrise: { ar: 'الشروق', en: 'Sunrise' },
    Dhuhr: { ar: 'الظهر', en: 'Dhuhr' },
    Asr: { ar: 'العصر', en: 'Asr' },
    Maghrib: { ar: 'المغرب', en: 'Maghrib' },
    Isha: { ar: 'العشاء', en: 'Isha' },
  };

  const { language } = useLanguage();
  const displayName = prayerNames[name]?.[language] || name;

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl transition-all ${
        isNext
          ? 'bg-primary text-primary-foreground shadow-lg scale-105'
          : 'bg-card border border-border'
      }`}
    >
      <span className={`font-semibold ${isNext ? '' : 'text-foreground'}`}>
        {displayName}
      </span>
      <span className={`text-lg font-bold ${isNext ? '' : 'text-primary'}`}>
        {time}
      </span>
    </div>
  );
};

export default PrayerTimeCard;
