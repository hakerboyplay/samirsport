import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PrayerTimeCard from '@/components/PrayerTimeCard';
import DhikrCard from '@/components/DhikrCard';
import { useGeolocation } from '@/hooks/useGeolocation';
import { usePrayerTimesGPS } from '@/hooks/usePrayerTimesGPS';
import { adhkar } from '@/data/adhkar';
import { MapPin, Clock, BookOpen, Loader2, Navigation, RefreshCw } from 'lucide-react';

type DhikrCategory = 'all' | 'morning' | 'evening' | 'sleep' | 'food' | 'travel' | 'general';

const Prayer: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'prayer' | 'adhkar'>('prayer');
  const [dhikrCategory, setDhikrCategory] = useState<DhikrCategory>('all');

  const { latitude, longitude, loading: geoLoading, error: geoError, requestLocation } = useGeolocation();
  const { prayerTimes, loading: prayerLoading, error: prayerError, locationName } = usePrayerTimesGPS(latitude, longitude);

  const loading = geoLoading || prayerLoading;

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
    return 'Fajr';
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
    <div className="container py-4">
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
          {/* Location Info */}
          <div className="mb-4 p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'موقعك الحالي' : 'Your Location'}
                  </p>
                  {latitude && longitude ? (
                    <p className="font-semibold text-foreground">
                      {locationName || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`}
                    </p>
                  ) : geoError ? (
                    <p className="text-destructive text-sm">{geoError}</p>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      {language === 'ar' ? 'جاري تحديد الموقع...' : 'Getting location...'}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={requestLocation}
                disabled={geoLoading}
                className="p-2 bg-primary/10 rounded-xl text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${geoLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Prayer Times */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : prayerError ? (
            <div className="text-center py-12 text-destructive">
              <p>{prayerError}</p>
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
    </div>
  );
};

export default Prayer;
