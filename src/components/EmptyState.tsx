import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddClick }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <span className="text-5xl">🏃</span>
      </div>
      <h3 className="text-xl font-bold mb-2">{t.noActivities}</h3>
      <p className="text-muted-foreground mb-6">{t.addFirstActivity}</p>
      <button onClick={onAddClick} className="btn-sport flex items-center gap-2">
        <Plus className="w-5 h-5" />
        {t.addActivity}
      </button>
    </div>
  );
};

export default EmptyState;
