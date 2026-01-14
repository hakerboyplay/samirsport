import React from 'react';
import { Activity, ActivityType } from '@/types/activity';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, Share2, Trash2, Edit, Calendar, Clock } from 'lucide-react';
import { format, isToday, isFuture, isPast } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { toast } from 'sonner';

interface ActivityCardProps {
  activity: Activity;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (activity: Activity) => void;
}

const typeIcons: Record<ActivityType, string> = {
  running: '🏃',
  training: '💪',
  rest: '😴',
  competition: '🏆',
  other: '📝',
};

const typeColors: Record<ActivityType, string> = {
  running: 'bg-primary/10 text-primary',
  training: 'bg-accent/10 text-accent',
  rest: 'bg-blue-500/10 text-blue-600',
  competition: 'bg-yellow-500/10 text-yellow-600',
  other: 'bg-muted text-muted-foreground',
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? ar : enUS;
  
  const activityDate = new Date(activity.date);
  const dateLabel = isToday(activityDate)
    ? t.today
    : format(activityDate, 'dd MMM yyyy', { locale });

  const getTypeLabel = (type: ActivityType) => {
    const labels: Record<ActivityType, string> = {
      running: t.running,
      training: t.training,
      rest: t.rest,
      competition: t.competition,
      other: t.other,
    };
    return labels[type];
  };

  const handleShare = async () => {
    const shareText = `${activity.title}\n${activity.description}\n📅 ${dateLabel}\n\n${t.appName}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: activity.title,
          text: shareText,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success(t.activityShared);
    }
  };

  const isUpcoming = isFuture(activityDate);
  const isPastActivity = isPast(activityDate) && !isToday(activityDate);

  return (
    <div
      className={`activity-card animate-slide-up ${
        activity.completed ? 'opacity-70' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(activity.id)}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
            activity.completed
              ? 'gradient-sport text-primary-foreground'
              : 'bg-muted hover:bg-primary/20'
          }`}
        >
          {activity.completed ? (
            <Check className="w-5 h-5" />
          ) : (
            <span className="text-xl">{typeIcons[activity.type]}</span>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3
              className={`font-bold text-lg ${
                activity.completed ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {activity.title}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-lg font-medium ${typeColors[activity.type]}`}>
              {getTypeLabel(activity.type)}
            </span>
          </div>

          {activity.description && (
            <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
              {activity.description}
            </p>
          )}

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {dateLabel}
            </span>
            {isUpcoming && (
              <span className="flex items-center gap-1 text-primary font-medium">
                <Clock className="w-3 h-3" />
                {t.upcoming}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
        >
          <Share2 className="w-4 h-4" />
          {t.share}
        </button>
        <button
          onClick={() => onEdit(activity)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
        >
          <Edit className="w-4 h-4" />
          {t.edit}
        </button>
        <button
          onClick={() => onDelete(activity.id)}
          className="flex items-center justify-center p-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
