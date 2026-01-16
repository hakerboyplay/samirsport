import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { RotateCcw, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

const tasbeehTypes = [
  { ar: 'سبحان الله', en: 'SubhanAllah', target: 33 },
  { ar: 'الحمد لله', en: 'Alhamdulillah', target: 33 },
  { ar: 'الله أكبر', en: 'Allahu Akbar', target: 34 },
  { ar: 'لا إله إلا الله', en: 'La ilaha illallah', target: 100 },
  { ar: 'أستغفر الله', en: 'Astaghfirullah', target: 100 },
  { ar: 'لا حول ولا قوة إلا بالله', en: 'La hawla wa la quwwata illa billah', target: 100 },
];

const STORAGE_KEY = 'samir-sport-tasbeeh';

const Tasbeeh: React.FC = () => {
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

  return (
    <div className="page-enter space-y-6">
      {/* Tasbeeh Selector */}
      <div className="bg-card rounded-2xl p-4 shadow-card">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tasbeehTypes.map((type, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                setCount(0);
              }}
              className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors font-medium ${
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

      {/* Counter Card */}
      <div className="bg-card rounded-2xl p-6 shadow-card flex flex-col items-center">
        {/* Current Tasbeeh */}
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {language === 'ar' ? currentTasbeeh.ar : currentTasbeeh.en}
        </h3>
        <p className="text-muted-foreground text-sm mb-6">
          {language === 'ar' ? `الهدف: ${currentTasbeeh.target}` : `Target: ${currentTasbeeh.target}`}
        </p>

        {/* Progress Circle */}
        <div className="relative mb-6">
          <svg className="w-52 h-52 transform -rotate-90">
            <circle
              cx="104"
              cy="104"
              r="96"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted"
            />
            <circle
              cx="104"
              cy="104"
              r="96"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={603}
              strokeDashoffset={603 - (603 * Math.min(progress, 100)) / 100}
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
        <div className="flex items-center gap-6 mb-6">
          <button
            onClick={handleDecrement}
            className="w-14 h-14 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <Minus className="w-6 h-6 text-muted-foreground" />
          </button>
          <button
            onClick={handleIncrement}
            className="w-28 h-28 rounded-full gradient-sport text-primary-foreground flex items-center justify-center shadow-button hover:opacity-90 transition-opacity active:scale-95"
          >
            <Plus className="w-12 h-12" />
          </button>
          <button
            onClick={handleReset}
            className="w-14 h-14 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <RotateCcw className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Total Counter */}
      <div className="bg-card rounded-2xl p-4 shadow-card flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">
            {language === 'ar' ? 'إجمالي التسبيحات' : 'Total Count'}
          </p>
          <p className="text-3xl font-bold text-foreground">{totalCount.toLocaleString()}</p>
        </div>
        <button
          onClick={handleResetAll}
          className="px-4 py-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium"
        >
          {language === 'ar' ? 'مسح الكل' : 'Reset All'}
        </button>
      </div>
    </div>
  );
};

export default Tasbeeh;
