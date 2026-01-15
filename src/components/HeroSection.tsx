import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { adhkar } from '@/data/adhkar';
import { Dhikr } from '@/types/prayer';

const sportsBackgrounds = [
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
  'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80',
  'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&q=80',
  'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
];

const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [currentDhikr, setCurrentDhikr] = useState<Dhikr | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % sportsBackgrounds.length);
    }, 10000);
    return () => clearInterval(bgTimer);
  }, []);

  useEffect(() => {
    const randomDhikr = () => {
      const randomIndex = Math.floor(Math.random() * adhkar.length);
      setCurrentDhikr(adhkar[randomIndex]);
    };
    randomDhikr();
    const dhikrTimer = setInterval(randomDhikr, 15000);
    return () => clearInterval(dhikrTimer);
  }, []);

  const locale = language === 'ar' ? ar : enUS;
  const timeString = format(currentTime, 'HH:mm:ss', { locale });
  const dateString = format(currentTime, 'EEEE, d MMMM yyyy', { locale });

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return language === 'ar' ? 'صباح الخير' : 'Good Morning';
    if (hour < 18) return language === 'ar' ? 'مساء الخير' : 'Good Afternoon';
    return language === 'ar' ? 'مساء الخير' : 'Good Evening';
  };

  return (
    <div className="relative overflow-hidden rounded-3xl mx-4 mb-4 h-64 shadow-floating">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${sportsBackgrounds[backgroundIndex]})` }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-5">
        {/* Top - Greeting */}
        <div>
          <p className="text-white/80 text-sm font-medium">{getGreeting()}</p>
        </div>
        
        {/* Center - Time & Date */}
        <div className="text-center">
          <h1 className="text-white text-5xl font-bold tracking-tight mb-1 font-mono">
            {timeString}
          </h1>
          <p className="text-white/80 text-sm">{dateString}</p>
        </div>
        
        {/* Bottom - Dhikr */}
        {currentDhikr && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
            <p className="text-white text-center text-base leading-relaxed line-clamp-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
              {currentDhikr.arabic}
            </p>
          </div>
        )}
      </div>

      {/* Background Dots Pattern */}
      <div className="absolute top-4 end-4 opacity-30">
        <div className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
