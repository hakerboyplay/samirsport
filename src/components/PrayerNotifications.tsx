import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bell, BellOff, Volume2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface PrayerTime {
  name: string;
  time: string;
  nameAr: string;
}

interface PrayerNotificationsProps {
  prayerTimes: PrayerTime[];
}

const PrayerNotifications: React.FC<PrayerNotificationsProps> = ({ prayerTimes }) => {
  const { language } = useLanguage();
  const [enabledPrayers, setEnabledPrayers] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('prayer_notifications');
    return saved ? JSON.parse(saved) : {};
  });
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('prayer_notifications', JSON.stringify(enabledPrayers));
  }, [enabledPrayers]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        toast.success(language === 'ar' ? 'تم تفعيل الإشعارات' : 'Notifications enabled');
      }
    }
  };

  const togglePrayer = (prayerName: string) => {
    setEnabledPrayers(prev => ({
      ...prev,
      [prayerName]: !prev[prayerName]
    }));
  };

  useEffect(() => {
    if (notificationPermission !== 'granted') return;

    const checkPrayerTimes = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      prayerTimes.forEach(prayer => {
        if (enabledPrayers[prayer.name] && prayer.time === currentTime) {
          new Notification(
            language === 'ar' ? `🕌 حان وقت صلاة ${prayer.nameAr}` : `🕌 Time for ${prayer.name} prayer`,
            {
              body: language === 'ar' 
                ? 'حي على الصلاة، حي على الفلاح' 
                : 'Come to prayer, come to success',
              icon: '/favicon.ico',
              tag: prayer.name,
            }
          );
        }
      });
    };

    const interval = setInterval(checkPrayerTimes, 60000);
    return () => clearInterval(interval);
  }, [prayerTimes, enabledPrayers, notificationPermission, language]);

  const enabledCount = Object.values(enabledPrayers).filter(Boolean).length;

  return (
    <div className="bg-card rounded-2xl p-4 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          {enabledCount > 0 ? (
            <Bell className="w-5 h-5 text-primary" />
          ) : (
            <BellOff className="w-5 h-5 text-muted-foreground" />
          )}
          {language === 'ar' ? 'إشعارات الصلاة' : 'Prayer Notifications'}
        </h3>
        {notificationPermission !== 'granted' && (
          <Button size="sm" variant="outline" onClick={requestNotificationPermission}>
            {language === 'ar' ? 'تفعيل' : 'Enable'}
          </Button>
        )}
      </div>

      {notificationPermission === 'granted' ? (
        <div className="space-y-2">
          {prayerTimes.map((prayer) => (
            <div
              key={prayer.name}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Volume2 className={`w-4 h-4 ${enabledPrayers[prayer.name] ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="font-medium text-sm">
                  {language === 'ar' ? prayer.nameAr : prayer.name}
                </span>
                <span className="text-xs text-muted-foreground">{prayer.time}</span>
              </div>
              <Switch
                checked={enabledPrayers[prayer.name] || false}
                onCheckedChange={() => togglePrayer(prayer.name)}
              />
            </div>
          ))}
        </div>
      ) : notificationPermission === 'denied' ? (
        <p className="text-sm text-muted-foreground text-center py-2">
          {language === 'ar' 
            ? 'الإشعارات محظورة. يرجى تفعيلها من إعدادات المتصفح' 
            : 'Notifications blocked. Enable in browser settings'}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-2">
          {language === 'ar' 
            ? 'اضغط على "تفعيل" للحصول على إشعارات أوقات الصلاة' 
            : 'Click "Enable" to get prayer time notifications'}
        </p>
      )}
    </div>
  );
};

export default PrayerNotifications;
