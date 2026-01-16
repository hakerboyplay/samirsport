import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 start-10 w-32 h-32 border-4 border-white rounded-full" />
            <div className="absolute bottom-20 end-10 w-24 h-24 border-4 border-white rounded-full" />
            <div className="absolute top-1/3 end-1/4 w-16 h-16 border-4 border-white rounded-full" />
          </div>

          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2 
            }}
            className="relative mb-8"
          >
            <div className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
              <svg 
                viewBox="0 0 100 100" 
                className="w-20 h-20 text-orange-500"
                fill="currentColor"
              >
                {/* Running figure */}
                <circle cx="65" cy="20" r="10" />
                <path d="M45 35 L60 50 L75 35 L70 40 L60 55 L50 40 Z" />
                <path d="M55 55 L45 75 L35 75 L50 55" />
                <path d="M60 55 L75 80 L65 80 L55 60" />
                <path d="M40 45 L25 55 L30 60 L45 50" />
                <path d="M70 45 L85 40 L80 35 L65 42" />
              </svg>
            </div>
            
            {/* Pulse Effect */}
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5,
                ease: "easeOut"
              }}
              className="absolute inset-0 bg-white rounded-3xl"
            />
          </motion.div>

          {/* App Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-2 font-arabic">
              سمير 27
            </h1>
            <p className="text-white/80 text-lg font-arabic">
              Samir 27
            </p>
          </motion.div>

          {/* Loading Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-20"
          >
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: i * 0.2
                  }}
                  className="w-3 h-3 bg-white rounded-full"
                />
              ))}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 text-white/60 text-sm font-arabic"
          >
            تتبع أنشطتك الرياضية
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
