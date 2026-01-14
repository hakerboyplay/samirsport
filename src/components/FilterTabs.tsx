import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export type FilterType = 'all' | 'today' | 'upcoming' | 'completed';

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  const { t } = useLanguage();

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: t.all },
    { value: 'today', label: t.today },
    { value: 'upcoming', label: t.upcoming },
    { value: 'completed', label: t.completed },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto py-2 px-1 -mx-1 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
            activeFilter === filter.value
              ? 'gradient-sport text-primary-foreground shadow-button'
              : 'bg-card hover:bg-muted'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
