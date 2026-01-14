import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import PrayerTimeCard from '@/components/PrayerTimeCard';
import DhikrCard from '@/components/DhikrCard';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { wilayas } from '@/data/wilayas';
import { adhkar } from '@/data/adhkar';
import { Wilaya } from '@/types/prayer';
import { MapPin, Clock, BookOpen, Loader2 } from 'lucide-react';

type DhikrCategory = 'all' | 'morning' | 'evening' | 'sleep' | 'food' | 'travel' | 'general';

const Prayer: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedWilaya, setSelectedWilaya] = useState<Wilaya | null>(() => {
    const saved = localStorage.getItem('selectedWilaya');
    return saved ? JSON.parse(saved) : wilayas[15]; // Default to Algiers
  });
  const [activeTab, setActiveTab] = useState<'prayer' | 'adhkar'>('prayer');
  const [dhikrCategory, setDhikrCategory] = useState<DhikrCategory>('all');

  const { prayerTimes, loading, error } = usePrayerTimes(selectedWilaya);

  useEffect(() => {
    if (selectedWilaya) {
      localStorage.setItem('selectedWilaya', JSON.stringify(selectedWilaya));
    }
  }, [selectedWilaya]);

  const getNextPrayer = () => {
    if (!prayerTimes) return null;
    
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;
    
    for (const prayer of prayers) {
      const [hours, minutes] = prayerTimes[prayer].split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      if (prayerTime > currentTime) {
        return prayer;
      }
    }
    return 'Fajr'; // Next day
  };

  const nextPrayer = getNextPrayer();

  const filteredAdhkar = useMemo(() => {
    if (dhikrCategory === 'all') return adhkar;
    return adhkar.filter((d) => d.category === dhikrCategory);
  }, [dhikrCategory]);

  const categoryLabels: Record<DhikrCategory, { ar: string; en: string }> = {
    all: { ar: 'الكل', en: 'All' },
    morning: { ar: 'الصباح', en: 'Morning' },
    evening: { ar: 'المساء', en: 'Evening' },
    sleep: { ar: 'النوم', en: 'Sleep' },
    food: { ar: 'الطعام', en: 'Food' },
    travel: { ar: 'السفر', en: 'Travel' },
    general: { ar: 'عامة', en: 'General' },
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <main className="container py-4">
        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('prayer')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'prayer'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>{language === 'ar' ? 'المواقيت' : 'Prayer Times'}</span>
          </button>
          <button
            onClick={() => setActiveTab('adhkar')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'adhkar'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>{language === 'ar' ? 'الأذكار' : 'Adhkar'}</span>
          </button>
        </div>

        {activeTab === 'prayer' && (
          <>
            {/* Wilaya Selector */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                {language === 'ar' ? 'اختر الولاية' : 'Select Wilaya'}
              </label>
              <select
                value={selectedWilaya?.id || ''}
                onChange={(e) => {
                  const wilaya = wilayas.find((w) => w.id === Number(e.target.value));
                  setSelectedWilaya(wilaya || null);
                }}
                className="w-full p-3 bg-card border border-border rounded-xl text-foreground"
              >
                {wilayas.map((wilaya) => (
                  <option key={wilaya.id} value={wilaya.id}>
                    {wilaya.id}. {language === 'ar' ? wilaya.nameAr : wilaya.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Prayer Times */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-destructive">
                <p>{error}</p>
              </div>
            ) : prayerTimes ? (
              <div className="space-y-3">
                {(['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map((prayer) => (
                  <PrayerTimeCard
                    key={prayer}
                    name={prayer}
                    time={prayerTimes[prayer]}
                    isNext={prayer === nextPrayer}
                  />
                ))}
              </div>
            ) : null}
          </>
        )}

        {activeTab === 'adhkar' && (
          <>
            {/* Category Filter */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
              {(Object.keys(categoryLabels) as DhikrCategory[]).map((category) => (
                <button
                  key={category}
                  onClick={() => setDhikrCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                    dhikrCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {categoryLabels[category][language]}
                </button>
              ))}
            </div>

            {/* Adhkar List */}
            <div className="space-y-3">
              {filteredAdhkar.map((dhikr) => (
                <DhikrCard key={dhikr.id} dhikr={dhikr} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Prayer;
