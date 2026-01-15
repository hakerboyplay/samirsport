import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Compass, Navigation } from 'lucide-react';

interface QiblaCompassProps {
  latitude: number;
  longitude: number;
}

const QiblaCompass: React.FC<QiblaCompassProps> = ({ latitude, longitude }) => {
  const { language } = useLanguage();
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Kaaba coordinates
  const kaabaLat = 21.4225;
  const kaabaLng = 39.8262;

  // Calculate Qibla direction
  const calculateQiblaDirection = () => {
    const lat1 = (latitude * Math.PI) / 180;
    const lat2 = (kaabaLat * Math.PI) / 180;
    const dLng = ((kaabaLng - longitude) * Math.PI) / 180;

    const y = Math.sin(dLng);
    const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(dLng);
    
    let qibla = (Math.atan2(y, x) * 180) / Math.PI;
    if (qibla < 0) qibla += 360;
    
    return qibla;
  };

  const qiblaDirection = calculateQiblaDirection();

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setDeviceHeading(event.alpha);
        setPermissionGranted(true);
      }
    };

    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (error) {
          console.log('Orientation permission denied');
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const needleRotation = deviceHeading !== null 
    ? qiblaDirection - deviceHeading 
    : qiblaDirection;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <Compass className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-lg">
          {language === 'ar' ? 'اتجاه القبلة' : 'Qibla Direction'}
        </h3>
      </div>

      <div className="relative w-48 h-48 mx-auto">
        {/* Compass background */}
        <div className="absolute inset-0 rounded-full border-4 border-border bg-muted/30">
          {/* Cardinal directions */}
          <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-foreground">
            {language === 'ar' ? 'ش' : 'N'}
          </span>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-muted-foreground">
            {language === 'ar' ? 'ج' : 'S'}
          </span>
          <span className="absolute top-1/2 left-2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
            {language === 'ar' ? 'غ' : 'W'}
          </span>
          <span className="absolute top-1/2 right-2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
            {language === 'ar' ? 'ق' : 'E'}
          </span>
        </div>

        {/* Qibla needle */}
        <div 
          className="absolute inset-4 transition-transform duration-300"
          style={{ transform: `rotate(${needleRotation}deg)` }}
        >
          <div className="relative w-full h-full">
            <Navigation className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 text-primary fill-primary" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary" />
          </div>
        </div>

        {/* Kaaba icon in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-secondary rounded flex items-center justify-center">
          <span className="text-secondary-foreground text-xs font-bold">🕋</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          {language === 'ar' ? 'الاتجاه:' : 'Direction:'} {Math.round(qiblaDirection)}°
        </p>
        {!permissionGranted && deviceHeading === null && (
          <p className="text-xs text-muted-foreground mt-2">
            {language === 'ar' 
              ? 'قم بتحريك الجهاز لتفعيل البوصلة' 
              : 'Move your device to activate compass'}
          </p>
        )}
      </div>
    </div>
  );
};

export default QiblaCompass;
