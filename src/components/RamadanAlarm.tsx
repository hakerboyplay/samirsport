import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bell, BellOff, Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface RamadanAlarmProps {
  fajrTime: string;
  maghribTime: string;
}

interface AlarmSettings {
  suhoorEnabled: boolean;
  suhoorMinutesBefore: number;
  iftarEnabled: boolean;
  iftarMinutesBefore: number;
}

const RamadanAlarm: React.FC<RamadanAlarmProps> = ({ fajrTime, maghribTime }) => {
  const { language } = useLanguage();
  const [settings, setSettings] = useState<AlarmSettings>(() => {
    const saved = localStorage.getItem('ramadan_alarms');
    return saved ? JSON.parse(saved) : {
      suhoorEnabled: false,
      suhoorMinutesBefore: 30,
      iftarEnabled: false,
      iftarMinutesBefore: 10,
    };
  });
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ramadan_alarms', JSON.stringify(settings));
  }, [settings]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        toast.success(language === 'ar' ? 'تم تفعيل الإشعارات' : 'Notifications enabled');
      }
    }
  };

  const parseTime = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const formatAlarmTime = (prayerTime: string, minutesBefore: number): string => {
    const time = parseTime(prayerTime);
    time.setMinutes(time.getMinutes() - minutesBefore);
    return time.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  useEffect(() => {
    if (notificationPermission !== 'granted') return;

    const checkAlarms = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      if (settings.suhoorEnabled && fajrTime) {
        const [fajrHours, fajrMinutes] = fajrTime.split(':').map(Number);
        const suhoorAlarmTime = fajrHours * 60 + fajrMinutes - settings.suhoorMinutesBefore;
        
        if (currentTime === suhoorAlarmTime) {
          new Notification(language === 'ar' ? '🌙 وقت السحور' : '🌙 Suhoor Time', {
            body: language === 'ar' 
              ? `باقي ${settings.suhoorMinutesBefore} دقيقة على أذان الفجر` 
              : `${settings.suhoorMinutesBefore} minutes until Fajr`,
            icon: '/favicon.ico',
          });
        }
      }

      if (settings.iftarEnabled && maghribTime) {
        const [maghribHours, maghribMinutes] = maghribTime.split(':').map(Number);
        const iftarAlarmTime = maghribHours * 60 + maghribMinutes - settings.iftarMinutesBefore;
        
        if (currentTime === iftarAlarmTime) {
          new Notification(language === 'ar' ? '🌅 قريبًا وقت الإفطار' : '🌅 Iftar Coming Soon', {
            body: language === 'ar' 
              ? `باقي ${settings.iftarMinutesBefore} دقيقة على أذان المغرب` 
              : `${settings.iftarMinutesBefore} minutes until Maghrib`,
            icon: '/favicon.ico',
          });
        }
      }
    };

    const interval = setInterval(checkAlarms, 60000);
    return () => clearInterval(interval);
  }, [settings, fajrTime, maghribTime, notificationPermission, language]);

  return (
    <div className="bg-card rounded-2xl p-4 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          {language === 'ar' ? 'منبه رمضان' : 'Ramadan Alarm'}
        </h3>
        {notificationPermission !== 'granted' && (
          <Button size="sm" variant="outline" onClick={requestNotificationPermission}>
            {language === 'ar' ? 'تفعيل الإشعارات' : 'Enable'}
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Suhoor Alarm */}
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
              <Moon className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <p className="font-medium text-sm">
                {language === 'ar' ? 'منبه السحور' : 'Suhoor Alarm'}
              </p>
              <p className="text-xs text-muted-foreground">
                {fajrTime && settings.suhoorEnabled 
                  ? formatAlarmTime(fajrTime, settings.suhoorMinutesBefore)
                  : language === 'ar' ? 'غير مفعل' : 'Disabled'}
              </p>
            </div>
          </div>
          <Switch
            checked={settings.suhoorEnabled}
            onCheckedChange={(checked) => 
              setSettings(prev => ({ ...prev, suhoorEnabled: checked }))
            }
          />
        </div>

        {/* Iftar Alarm */}
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
              <Sun className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="font-medium text-sm">
                {language === 'ar' ? 'منبه الإفطار' : 'Iftar Alarm'}
              </p>
              <p className="text-xs text-muted-foreground">
                {maghribTime && settings.iftarEnabled 
                  ? formatAlarmTime(maghribTime, settings.iftarMinutesBefore)
                  : language === 'ar' ? 'غير مفعل' : 'Disabled'}
              </p>
            </div>
          </div>
          <Switch
            checked={settings.iftarEnabled}
            onCheckedChange={(checked) => 
              setSettings(prev => ({ ...prev, iftarEnabled: checked }))
            }
          />
        </div>

        {notificationPermission === 'denied' && (
          <p className="text-xs text-destructive text-center">
            {language === 'ar' 
              ? 'الإشعارات محظورة. يرجى تفعيلها من إعدادات المتصفح' 
              : 'Notifications blocked. Please enable in browser settings'}
          </p>
        )}
      </div>
    </div>
  );
};

export default RamadanAlarm;
