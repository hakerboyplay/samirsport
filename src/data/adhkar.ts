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
  {
    id: 3,
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ',
    translation: 'O Allah, I seek refuge in You from anxiety and grief, and I seek refuge in You from weakness and laziness.',
    category: 'morning',
    count: 3
  },
  {
    id: 4,
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    translation: 'O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection.',
    category: 'morning',
    count: 1
  },
  {
    id: 5,
    arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي',
    translation: 'O Allah, grant my body health, O Allah, grant my hearing health, O Allah, grant my sight health.',
    category: 'morning',
    count: 3
  },
  // أذكار المساء
  {
    id: 6,
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    translation: 'We have entered the evening and with it all the dominion which belongs to Allah. Praise be to Allah. None has the right to be worshipped but Allah alone.',
    category: 'evening',
    count: 1
  },
  {
    id: 7,
    arabic: 'اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ',
    translation: 'O Allah, whatever blessing has been received by me or anyone of Your creation, is from You alone.',
    category: 'evening',
    count: 1
  },
  {
    id: 8,
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    translation: 'I seek refuge in the Perfect Words of Allah from the evil of what He has created.',
    category: 'evening',
    count: 3
  },
  // أذكار النوم
  {
    id: 9,
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    translation: 'In Your name, O Allah, I die and I live.',
    category: 'sleep',
    count: 1
  },
  {
    id: 10,
    arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    translation: 'O Allah, protect me from Your punishment on the Day You resurrect Your servants.',
    category: 'sleep',
    count: 3
  },
  {
    id: 11,
    arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
    translation: 'O Allah, in Your name I die and I live.',
    category: 'sleep',
    count: 1
  },
  {
    id: 12,
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَكَفَانَا وَآوَانَا',
    translation: 'Praise be to Allah Who has fed us, given us drink, sufficed us, and sheltered us.',
    category: 'sleep',
    count: 1
  },
  // أذكار الطعام
  {
    id: 13,
    arabic: 'بِسْمِ اللَّهِ',
    translation: 'In the name of Allah.',
    category: 'food',
    count: 1
  },
  {
    id: 14,
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    translation: 'Praise be to Allah Who has fed me this and provided me with it without any power or might from myself.',
    category: 'food',
    count: 1
  },
  {
    id: 15,
    arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَأَطْعِمْنَا خَيْرًا مِنْهُ',
    translation: 'O Allah, bless us in it and feed us with something better than it.',
    category: 'food',
    count: 1
  },
  // أذكار السفر
  {
    id: 16,
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    translation: 'Glory to Him Who has subjected this to us, and we could never have it (by our efforts). And verily, to Our Lord we indeed are to return.',
    category: 'travel',
    count: 1
  },
  {
    id: 17,
    arabic: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى',
    translation: 'O Allah, we ask You on this our journey for goodness and piety, and for works that are pleasing to You.',
    category: 'travel',
    count: 1
  },
  {
    id: 18,
    arabic: 'اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ',
    translation: 'O Allah, make this journey easy for us, and make its distance easy for us.',
    category: 'travel',
    count: 1
  },
  // أذكار عامة
  {
    id: 19,
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    translation: 'Glory be to Allah and His is the praise.',
    category: 'general',
    count: 100
  },
  {
    id: 20,
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    translation: 'None has the right to be worshipped but Allah alone, Who has no partner. His is the dominion and His is the praise, and He is Able to do all things.',
    category: 'general',
    count: 100
  },
  {
    id: 21,
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    translation: 'I seek Allah\'s forgiveness and turn to Him in repentance.',
    category: 'general',
    count: 100
  },
  {
    id: 22,
    arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
    translation: 'O Allah, send blessings and peace upon our Prophet Muhammad.',
    category: 'general',
    count: 10
  },
  {
    id: 23,
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    translation: 'There is no might nor power except with Allah.',
    category: 'general',
    count: 10
  },
  {
    id: 24,
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    translation: 'Allah is Sufficient for us, and He is the Best Disposer of affairs.',
    category: 'general',
    count: 7
  },
  {
    id: 25,
    arabic: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ',
    translation: 'Glory be to Allah, praise be to Allah, there is no god but Allah, and Allah is the Greatest.',
    category: 'general',
    count: 33
  },
  {
    id: 26,
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    translation: 'Our Lord, give us in this world that which is good and in the Hereafter that which is good, and save us from the torment of the Fire.',
    category: 'general',
    count: 7
  },
  {
    id: 27,
    arabic: 'اللَّهُمَّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    translation: 'O Allah, forgive me and my parents and the believers on the Day of Reckoning.',
    category: 'general',
    count: 3
  },
  {
    id: 28,
    arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    translation: 'O Allah, help me remember You, thank You, and worship You well.',
    category: 'general',
    count: 3
  },
  {
    id: 29,
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ',
    translation: 'O Allah, I ask You for Paradise and seek refuge in You from the Fire.',
    category: 'general',
    count: 3
  },
  {
    id: 30,
    arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ',
    translation: 'O Ever Living, O Self-Subsisting and Supporter of all, by Your mercy I seek assistance.',
    category: 'general',
    count: 3
  },
  // أدعية متنوعة
  {
    id: 31,
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    translation: 'My Lord, expand for me my breast and ease my task for me.',
    category: 'general',
    count: 3
  },
  {
    id: 32,
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    translation: 'My Lord, increase me in knowledge.',
    category: 'general',
    count: 7
  },
  {
    id: 33,
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ وَتَحَوُّلِ عَافِيَتِكَ وَفُجَاءَةِ نِقْمَتِكَ وَجَمِيعِ سَخَطِكَ',
    translation: 'O Allah, I seek refuge in You from the decline of Your blessings, the passing of Your safety, the suddenness of Your punishment, and all Your displeasure.',
    category: 'general',
    count: 3
  },
  {
    id: 34,
    arabic: 'اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي',
    translation: 'O Allah, correct for me my religion which is the safeguard of my affairs, and correct for me my worldly affairs in which is my livelihood.',
    category: 'general',
    count: 3
  },
  {
    id: 35,
    arabic: 'اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي',
    translation: 'O Allah, guide me and keep me on the straight path.',
    category: 'general',
    count: 7
  },
];
