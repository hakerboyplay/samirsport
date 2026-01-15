import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Activity } from '@/types/activity';
import { BarChart3, TrendingUp, Target, Calendar } from 'lucide-react';
import { format, isThisWeek, isThisMonth, startOfWeek, endOfWeek } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

interface ActivityStatsProps {
  activities: Activity[];
}

const ActivityStats: React.FC<ActivityStatsProps> = ({ activities }) => {
  const { language } = useLanguage();
  const locale = language === 'ar' ? ar : enUS;

  const stats = useMemo(() => {
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 6 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 6 });

    const thisWeekActivities = activities.filter(a => {
      const date = new Date(a.date);
      return date >= weekStart && date <= weekEnd;
    });

    const thisMonthActivities = activities.filter(a => 
      isThisMonth(new Date(a.date))
    );

    const completedThisWeek = thisWeekActivities.filter(a => a.completed).length;
    const completedThisMonth = thisMonthActivities.filter(a => a.completed).length;

    const typeBreakdown = activities.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topType = Object.entries(typeBreakdown).sort((a, b) => b[1] - a[1])[0];

    

    const completionRate = activities.length > 0 
      ? Math.round((activities.filter(a => a.completed).length / activities.length) * 100)
      : 0;

    return {
      totalActivities: activities.length,
      completedTotal: activities.filter(a => a.completed).length,
      thisWeekTotal: thisWeekActivities.length,
      completedThisWeek,
      thisMonthTotal: thisMonthActivities.length,
      completedThisMonth,
      topType: topType ? { name: topType[0], count: topType[1] } : null,
      completionRate,
    };
  }, [activities]);

  const typeNames: Record<string, { ar: string; en: string }> = {
    running: { ar: 'جري', en: 'Running' },
    training: { ar: 'تدريب', en: 'Training' },
    rest: { ar: 'راحة', en: 'Rest' },
    competition: { ar: 'مسابقة', en: 'Competition' },
    other: { ar: 'أخرى', en: 'Other' },
  };

  const statCards = [
    {
      icon: BarChart3,
      label: language === 'ar' ? 'إجمالي الأنشطة' : 'Total Activities',
      value: stats.totalActivities,
      subValue: `${stats.completedTotal} ${language === 'ar' ? 'مكتمل' : 'completed'}`,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Calendar,
      label: language === 'ar' ? 'هذا الأسبوع' : 'This Week',
      value: stats.thisWeekTotal,
      subValue: `${stats.completedThisWeek} ${language === 'ar' ? 'مكتمل' : 'completed'}`,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: TrendingUp,
      label: language === 'ar' ? 'هذا الشهر' : 'This Month',
      value: stats.thisMonthTotal,
      subValue: `${stats.completedThisMonth} ${language === 'ar' ? 'مكتمل' : 'completed'}`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Target,
      label: language === 'ar' ? 'نسبة الإنجاز' : 'Completion Rate',
      value: `${stats.completionRate}%`,
      subValue: stats.topType 
        ? `${language === 'ar' ? 'الأكثر:' : 'Top:'} ${typeNames[stats.topType.name]?.[language] || stats.topType.name}`
        : '',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-2xl p-4 shadow-card animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center mb-2`}>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
          {stat.subValue && (
            <p className="text-xs text-muted-foreground mt-1">{stat.subValue}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivityStats;
