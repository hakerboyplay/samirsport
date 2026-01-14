import React, { useState } from 'react';
import { Dhikr } from '@/types/prayer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, RotateCcw } from 'lucide-react';

interface DhikrCardProps {
  dhikr: Dhikr;
}

const DhikrCard: React.FC<DhikrCardProps> = ({ dhikr }) => {
  const { language } = useLanguage();
  const [currentCount, setCurrentCount] = useState(0);
  const targetCount = dhikr.count || 1;

  const handleClick = () => {
    if (currentCount < targetCount) {
      setCurrentCount((prev) => prev + 1);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentCount(0);
  };

  const isCompleted = currentCount >= targetCount;
  const progress = (currentCount / targetCount) * 100;

  return (
    <div
      onClick={handleClick}
      className={`relative p-4 rounded-xl border transition-all cursor-pointer overflow-hidden ${
        isCompleted
          ? 'bg-green-500/10 border-green-500/30'
          : 'bg-card border-border hover:border-primary/50'
      }`}
    >
      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-primary/30 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />

      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-lg leading-relaxed text-foreground font-arabic">
          {dhikr.arabic}
        </p>
        {isCompleted ? (
          <button
            onClick={handleReset}
            className="p-2 rounded-full bg-green-500/20 text-green-600 hover:bg-green-500/30 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
            <span className="font-bold text-primary">{currentCount}</span>
            <span>/</span>
            <span>{targetCount}</span>
          </div>
        )}
      </div>

      {language === 'en' && (
        <p className="text-sm text-muted-foreground mt-2">{dhikr.translation}</p>
      )}

      {isCompleted && (
        <div className="absolute top-2 end-2">
          <Check className="w-5 h-5 text-green-600" />
        </div>
      )}
    </div>
  );
};

export default DhikrCard;
