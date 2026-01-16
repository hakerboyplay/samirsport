import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, RotateCcw, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TasbeehCounterProps {
  isOpen: boolean;
  onClose: () => void;
}

const tasbeehTypes = [
  { ar: 'سبحان الله', en: 'SubhanAllah', target: 33 },
  { ar: 'الحمد لله', en: 'Alhamdulillah', target: 33 },
  { ar: 'الله أكبر', en: 'Allahu Akbar', target: 34 },
  { ar: 'لا إله إلا الله', en: 'La ilaha illallah', target: 100 },
  { ar: 'أستغفر الله', en: 'Astaghfirullah', target: 100 },
  { ar: 'لا حول ولا قوة إلا بالله', en: 'La hawla wa la quwwata illa billah', target: 100 },
];

const STORAGE_KEY = 'samir-sport-tasbeeh';

const TasbeehCounter: React.FC<TasbeehCounterProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      setTotalCount(data.totalCount || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ totalCount }));
  }, [totalCount]);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    setTotalCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
      setTotalCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleResetAll = () => {
    setCount(0);
    setTotalCount(0);
  };

  const currentTasbeeh = tasbeehTypes[selectedIndex];
  const progress = (count / currentTasbeeh.target) * 100;
  const isComplete = count >= currentTasbeeh.target;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-card rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="gradient-sport text-primary-foreground p-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {language === 'ar' ? 'عداد التسبيحات' : 'Tasbeeh Counter'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary-foreground/20 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tasbeeh Selector */}
          <div className="p-4 border-b border-border">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {tasbeehTypes.map((type, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedIndex(index);
                    setCount(0);
                  }}
                  className={`px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
                    selectedIndex === index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {language === 'ar' ? type.ar : type.en}
                </button>
              ))}
            </div>
          </div>

          {/* Counter */}
          <div className="p-6 flex flex-col items-center">
            {/* Current Tasbeeh */}
            <h3 className="text-2xl font-bold text-foreground mb-2 font-arabic">
              {language === 'ar' ? currentTasbeeh.ar : currentTasbeeh.en}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              {language === 'ar' ? `الهدف: ${currentTasbeeh.target}` : `Target: ${currentTasbeeh.target}`}
            </p>

            {/* Progress Circle */}
            <div className="relative mb-6">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={553}
                  strokeDashoffset={553 - (553 * Math.min(progress, 100)) / 100}
                  className={isComplete ? 'text-green-500' : 'text-primary'}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  key={count}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className={`text-5xl font-bold ${isComplete ? 'text-green-500' : 'text-foreground'}`}
                >
                  {count}
                </motion.span>
                <span className="text-muted-foreground text-sm">
                  / {currentTasbeeh.target}
                </span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleDecrement}
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <Minus className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={handleIncrement}
                className="w-24 h-24 rounded-full gradient-sport text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity active:scale-95"
              >
                <Plus className="w-10 h-10" />
              </button>
              <button
                onClick={handleReset}
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <RotateCcw className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Total Counter */}
            <div className="w-full bg-muted rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  {language === 'ar' ? 'إجمالي التسبيحات' : 'Total Count'}
                </p>
                <p className="text-2xl font-bold text-foreground">{totalCount.toLocaleString()}</p>
              </div>
              <button
                onClick={handleResetAll}
                className="px-4 py-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm"
              >
                {language === 'ar' ? 'مسح الكل' : 'Reset All'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TasbeehCounter;
