import { Dhikr } from '@/types/prayer';

export const adhkar: Dhikr[] = [
  // أذكار الصباح
  {
    id: 1,
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    translation: 'We have entered a new day and with it all the dominion which belongs to Allah. Praise be to Allah. None has the right to be worshipped but Allah alone, Who has no partner.',
    category: 'morning',
    count: 1
  },
  {
    id: 2,
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
    translation: 'O Allah, I ask You for pardon and well-being in this life and the next.',
    category: 'morning',
    count: 3
  },
  // أذكار المساء
  {
    id: 3,
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    translation: 'We have entered the evening and with it all the dominion which belongs to Allah. Praise be to Allah. None has the right to be worshipped but Allah alone.',
    category: 'evening',
    count: 1
  },
  // أذكار النوم
  {
    id: 4,
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    translation: 'In Your name, O Allah, I die and I live.',
    category: 'sleep',
    count: 1
  },
  {
    id: 5,
    arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    translation: 'O Allah, protect me from Your punishment on the Day You resurrect Your servants.',
    category: 'sleep',
    count: 3
  },
  // أذكار الطعام
  {
    id: 6,
    arabic: 'بِسْمِ اللَّهِ',
    translation: 'In the name of Allah.',
    category: 'food',
    count: 1
  },
  {
    id: 7,
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    translation: 'Praise be to Allah Who has fed me this and provided me with it without any power or might from myself.',
    category: 'food',
    count: 1
  },
  // أذكار السفر
  {
    id: 8,
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    translation: 'Glory to Him Who has subjected this to us, and we could never have it (by our efforts). And verily, to Our Lord we indeed are to return.',
    category: 'travel',
    count: 1
  },
  // أذكار عامة
  {
    id: 9,
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    translation: 'Glory be to Allah and His is the praise.',
    category: 'general',
    count: 100
  },
  {
    id: 10,
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    translation: 'None has the right to be worshipped but Allah alone, Who has no partner. His is the dominion and His is the praise, and He is Able to do all things.',
    category: 'general',
    count: 100
  },
  {
    id: 11,
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    translation: 'I seek Allah\'s forgiveness and turn to Him in repentance.',
    category: 'general',
    count: 100
  },
  {
    id: 12,
    arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
    translation: 'O Allah, send blessings and peace upon our Prophet Muhammad.',
    category: 'general',
    count: 10
  },
  {
    id: 13,
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    translation: 'There is no might nor power except with Allah.',
    category: 'general',
    count: 10
  },
  {
    id: 14,
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    translation: 'Allah is Sufficient for us, and He is the Best Disposer of affairs.',
    category: 'general',
    count: 7
  },
];
