import React, { useState, useEffect } from 'react';
import { Activity, ActivityType } from '@/types/activity';
import { useLanguage } from '@/contexts/LanguageContext';
import { X } from 'lucide-react';

interface ActivityFormProps {
  onSubmit: (activity: Omit<Activity, 'id' | 'createdAt'>) => void;
  onClose: () => void;
  editActivity?: Activity | null;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onSubmit, onClose, editActivity }) => {
  const { t } = useLanguage();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<ActivityType>('running');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (editActivity) {
      setTitle(editActivity.title);
      setDescription(editActivity.description);
      setDate(editActivity.date);
      setType(editActivity.type);
      setCompleted(editActivity.completed);
    }
  }, [editActivity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      date,
      type,
      completed,
    });

    onClose();
  };

  const typeOptions: { value: ActivityType; label: string; icon: string }[] = [
    { value: 'running', label: t.running, icon: '🏃' },
    { value: 'training', label: t.training, icon: '💪' },
    { value: 'rest', label: t.rest, icon: '😴' },
    { value: 'competition', label: t.competition, icon: '🏆' },
    { value: 'other', label: t.other, icon: '📝' },
  ];

  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
      <div className="bg-card w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 animate-slide-up shadow-floating max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {editActivity ? t.edit : t.addActivity}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t.title}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-sport w-full"
              placeholder={t.title}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t.description}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-sport w-full min-h-[100px] resize-none"
              placeholder={t.description}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t.date}</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-sport w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t.type}</label>
            <div className="grid grid-cols-3 gap-2">
              {typeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setType(option.value)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    type === option.value
                      ? 'gradient-sport text-primary-foreground shadow-button'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <span className="text-xl block mb-1">{option.icon}</span>
                  <span className="text-xs font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-xl bg-muted hover:bg-muted/80 transition-colors font-semibold"
            >
              {t.cancel}
            </button>
            <button type="submit" className="flex-1 btn-sport">
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;
