import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, X, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SearchResult {
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
  numberInSurah: number;
  text: string;
}

interface QuranSearchProps {
  onSelectAyah: (surahNumber: number, ayahNumber: number) => void;
}

const QuranSearch: React.FC<QuranSearchProps> = ({ onSelectAyah }) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async () => {
    if (!query.trim() || query.length < 3) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/ar`
      );
      const data = await response.json();
      
      if (data.code === 200 && data.data.matches) {
        setResults(data.data.matches.slice(0, 20));
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getArabicNumber = (num: number): string => {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
      </Button>

      {isOpen && (
        <div className="absolute top-12 end-0 w-80 bg-card rounded-2xl shadow-floating border border-border z-50 overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder={language === 'ar' ? 'ابحث في القرآن...' : 'Search Quran...'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                autoFocus
              />
              <Button onClick={handleSearch} disabled={isLoading} size="icon">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="max-h-80">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                {language === 'ar' ? 'جاري البحث...' : 'Searching...'}
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-border">
                {results.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onSelectAyah(result.surah.number, result.numberInSurah);
                      setIsOpen(false);
                      setQuery('');
                      setResults([]);
                    }}
                    className="w-full p-3 text-start hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {result.surah.name} - {language === 'ar' ? 'الآية' : 'Ayah'} {getArabicNumber(result.numberInSurah)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2 font-quran leading-loose">
                      {result.text}
                    </p>
                  </button>
                ))}
              </div>
            ) : query.length >= 3 && !isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm">
                {language === 'ar' 
                  ? 'أدخل 3 أحرف على الأقل للبحث' 
                  : 'Enter at least 3 characters to search'}
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default QuranSearch;
