import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuranSurahs, useSurahDetail } from '@/hooks/useQuran';
import { Loader2, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';

const Quran: React.FC = () => {
  const { language } = useLanguage();
  const { surahs, loading: surahsLoading, error: surahsError } = useQuranSurahs();
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const { surah, loading: surahLoading, error: surahError } = useSurahDetail(selectedSurah);

  const BackIcon = language === 'ar' ? ArrowRight : ArrowLeft;

  if (selectedSurah && surah) {
    return (
      <div className="container py-4">
        {/* Back Button */}
        <button
          onClick={() => setSelectedSurah(null)}
          className="flex items-center gap-2 text-primary mb-4 hover:opacity-80 transition-opacity"
        >
          <BackIcon className="w-5 h-5" />
          <span>{language === 'ar' ? 'العودة للسور' : 'Back to Surahs'}</span>
        </button>

        {/* Surah Header */}
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 mb-4 text-center">
          <h2 className="text-3xl font-bold mb-2">{surah.name}</h2>
          <p className="text-lg opacity-90">{surah.englishName}</p>
          <p className="text-sm opacity-75 mt-1">
            {surah.englishNameTranslation} • {surah.numberOfAyahs} {language === 'ar' ? 'آية' : 'verses'}
          </p>
          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${
            surah.revelationType === 'Meccan' ? 'bg-amber-500/20' : 'bg-emerald-500/20'
          }`}>
            {surah.revelationType === 'Meccan' ? (language === 'ar' ? 'مكية' : 'Meccan') : (language === 'ar' ? 'مدنية' : 'Medinan')}
          </span>
        </div>

        {/* Bismillah */}
        {surah.number !== 1 && surah.number !== 9 && (
          <p className="text-center text-2xl font-arabic text-primary mb-6">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        )}

        {/* Ayahs */}
        {surahLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : surahError ? (
          <div className="text-center py-12 text-destructive">
            <p>{surahError}</p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl p-6 border border-border">
            <p className="text-xl leading-loose font-arabic text-foreground text-center">
              {surah.ayahs.map((ayah, index) => (
                <span key={ayah.number}>
                  {ayah.text}{' '}
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm mx-1">
                    {ayah.numberInSurah}
                  </span>
                  {' '}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          {language === 'ar' ? 'القرآن الكريم' : 'Holy Quran'}
        </h2>
        <p className="text-muted-foreground">
          {language === 'ar' ? '114 سورة' : '114 Surahs'}
        </p>
      </div>

      {/* Surahs List */}
      {surahsLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : surahsError ? (
        <div className="text-center py-12 text-destructive">
          <p>{surahsError}</p>
        </div>
      ) : (
        <div className="grid gap-2">
          {surahs.map((surah) => (
            <button
              key={surah.number}
              onClick={() => setSelectedSurah(surah.number)}
              className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all text-start"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold shrink-0">
                {surah.number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {surah.name}
                  </h3>
                  <span className="text-lg font-arabic text-primary shrink-0">
                    {surah.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{surah.englishName}</span>
                  <span>•</span>
                  <span>{surah.numberOfAyahs} {language === 'ar' ? 'آية' : 'verses'}</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    surah.revelationType === 'Meccan' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'
                  }`}>
                    {surah.revelationType === 'Meccan' ? (language === 'ar' ? 'مكية' : 'Meccan') : (language === 'ar' ? 'مدنية' : 'Medinan')}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quran;
