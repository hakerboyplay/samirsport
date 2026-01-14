export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface Wilaya {
  id: number;
  nameAr: string;
  nameEn: string;
  latitude: number;
  longitude: number;
}

export interface Dhikr {
  id: number;
  arabic: string;
  translation: string;
  category: 'morning' | 'evening' | 'sleep' | 'food' | 'travel' | 'general';
  count?: number;
}
