import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuranSurahs, useSurahDetail } from '@/hooks/useQuran';
import { Loader2, ArrowRight, ArrowLeft, BookOpen, Bookmark, BookmarkCheck } from 'lucide-react';
import QuranSearch from '@/components/QuranSearch';

interface ReadingPosition {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
}

const Quran: React.FC = () => {
  const { language } = useLanguage();
  const { surahs, loading: surahsLoading, error: surahsError } = useQuranSurahs();
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const { surah, loading: surahLoading, error: surahError } = useSurahDetail(selectedSurah);
  const [readingPosition, setReadingPosition] = useState<ReadingPosition | null>(() => {
    const saved = localStorage.getItem('quran-reading-position');
    return saved ? JSON.parse(saved) : null;
  });

  const BackIcon = language === 'ar' ? ArrowRight : ArrowLeft;

  const saveReadingPosition = (surahNumber: number, surahName: string, ayahNumber: number) => {
    const position = { surahNumber, surahName, ayahNumber };
    setReadingPosition(position);
    localStorage.setItem('quran-reading-position', JSON.stringify(position));
  };

  const resumeReading = () => {
    if (readingPosition) {
      setSelectedSurah(readingPosition.surahNumber);
    }
  };

  // Scroll to saved ayah when surah loads
  useEffect(() => {
    if (surah && readingPosition && surah.number === readingPosition.surahNumber) {
      setTimeout(() => {
        const ayahElement = document.getElementById(`ayah-${readingPosition.ayahNumber}`);
        if (ayahElement) {
          ayahElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [surah, readingPosition]);

  // Verse end symbol (۞) in unicode
  const getAyahNumber = (num: number) => {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num)
      .split('')
      .map((digit) => arabicNumerals[parseInt(digit)])
      .join('');
  };

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
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 mb-4 text-center relative overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-2 w-16 h-16 border-2 border-current rounded-full" />
            <div className="absolute bottom-2 right-2 w-24 h-24 border-2 border-current rounded-full" />
          </div>
          
          <div className="relative">
            <h2 className="text-4xl font-bold mb-2 font-quran">{surah.name}</h2>
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
        </div>

        {/* Bismillah */}
        {surah.number !== 1 && surah.number !== 9 && (
          <div className="text-center py-6 mb-4">
            <p className="text-3xl font-quran text-primary">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </p>
            <div className="flex justify-center mt-2">
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>
          </div>
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
            <div className="text-center leading-[3] font-quran text-foreground">
              {surah.ayahs.map((ayah, index) => {
                // Remove Bismillah from first ayah if it's included (except for Al-Fatiha)
                let ayahText = ayah.text;
                if (index === 0 && surah.number !== 1 && surah.number !== 9) {
                  // Remove various forms of Bismillah from the beginning
                  ayahText = ayahText
                    .replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ\s*/, '')
                    .replace(/^بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ\s*/, '')
                    .replace(/^بسم الله الرحمن الرحيم\s*/, '')
                    .replace(/^۞?\s*/, '')
                    .trim();
                }
                
                return (
                  <span 
                    key={ayah.number} 
                    id={`ayah-${ayah.numberInSurah}`}
                    className={`inline ${
                      readingPosition?.surahNumber === surah.number && 
                      readingPosition?.ayahNumber === ayah.numberInSurah 
                        ? 'bg-primary/10 rounded px-1' 
                        : ''
                    }`}
                    onClick={() => saveReadingPosition(surah.number, surah.name, ayah.numberInSurah)}
                  >
                    {ayahText}
                    <span className="inline-flex items-center justify-center mx-1 text-primary text-sm align-middle cursor-pointer hover:scale-110 transition-transform">
                      ﴿{getAyahNumber(ayah.numberInSurah)}﴾
                    </span>
                  </span>
                );
              })}
            </div>
            
            {/* Reading Position Indicator */}
            <div className="mt-6 pt-4 border-t border-border text-center">
              <p className="text-muted-foreground text-sm">
                {language === 'ar' ? 'اضغط على رقم الآية لحفظ موضع القراءة' : 'Tap on verse number to save reading position'}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center shadow-floating">
            <BookOpen className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground font-quran">
              {language === 'ar' ? 'القرآن الكريم' : 'Holy Quran'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? '١١٤ سورة' : '114 Surahs'}
            </p>
          </div>
        </div>
        <QuranSearch onSelectAyah={(surahNum, ayahNum) => {
          setSelectedSurah(surahNum);
          setTimeout(() => {
            const el = document.getElementById(`ayah-${ayahNum}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 500);
        }} />
      </div>

      {/* Resume Reading Card */}
      {readingPosition && (
        <button
          onClick={resumeReading}
          className="w-full bg-gradient-to-r from-emerald-500/10 to-primary/10 border border-emerald-500/30 rounded-2xl p-4 mb-4 flex items-center gap-4 hover:border-primary/50 transition-all"
        >
          <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
            <BookmarkCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="text-start flex-1">
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'متابعة القراءة' : 'Resume Reading'}
            </p>
            <p className="font-semibold text-foreground">
              {readingPosition.surahName} - {language === 'ar' ? 'الآية' : 'Ayah'} {readingPosition.ayahNumber}
            </p>
          </div>
          <ArrowLeft className={`w-5 h-5 text-muted-foreground ${language === 'ar' ? 'rotate-180' : ''}`} />
        </button>
      )}

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
              className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all text-start group"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {surah.number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {surah.englishName}
                  </h3>
                  <span className="text-xl font-quran text-primary shrink-0">
                    {surah.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{surah.englishNameTranslation}</span>
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
