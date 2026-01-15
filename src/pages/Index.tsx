import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useActivities } from '@/hooks/useActivities';
import { Activity } from '@/types/activity';
import ActivityCard from '@/components/ActivityCard';
import ActivityForm from '@/components/ActivityForm';
import FilterTabs, { FilterType } from '@/components/FilterTabs';
import EmptyState from '@/components/EmptyState';
import HeroSection from '@/components/HeroSection';
import ActivityStats from '@/components/ActivityStats';
import { isToday, isFuture } from 'date-fns';
import { Search, BarChart3 } from 'lucide-react';

const Index: React.FC = () => {
  const { t, language } = useLanguage();
  const { activities, addActivity, updateActivity, deleteActivity, toggleComplete } = useActivities();
  
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showStats, setShowStats] = useState(false);

  const filteredActivities = useMemo(() => {
    let filtered = activities;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query)
      );
    }

    switch (activeFilter) {
      case 'today':
        filtered = filtered.filter((a) => isToday(new Date(a.date)));
        break;
      case 'upcoming':
        filtered = filtered.filter((a) => isFuture(new Date(a.date)));
        break;
      case 'completed':
        filtered = filtered.filter((a) => a.completed);
        break;
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }, [activities, activeFilter, searchQuery]);

  const handleSubmit = (activityData: Omit<Activity, 'id' | 'createdAt'>) => {
    if (editingActivity) {
      updateActivity(editingActivity.id, activityData);
    } else {
      addActivity(activityData);
    }
    setEditingActivity(null);
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingActivity(null);
  };

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <HeroSection />

      <div className="container">
        {/* Stats Toggle */}
        <button
          onClick={() => setShowStats(!showStats)}
          className="flex items-center gap-2 mb-4 px-4 py-2 bg-card rounded-xl border border-border hover:border-primary/50 transition-all"
        >
          <BarChart3 className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">
            {language === 'ar' ? (showStats ? 'إخفاء الإحصائيات' : 'عرض الإحصائيات') : (showStats ? 'Hide Stats' : 'Show Stats')}
          </span>
        </button>

        {/* Activity Statistics */}
        {showStats && <ActivityStats activities={activities} />}
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
            className="input-sport w-full ps-12"
          />
        </div>

        {/* Filter Tabs */}
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Activities List */}
        <div className="mt-4 space-y-4">
          {filteredActivities.length === 0 ? (
            <EmptyState onAddClick={() => setShowForm(true)} />
          ) : (
            filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onToggleComplete={toggleComplete}
                onDelete={deleteActivity}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>
      </div>

      {/* Activity Form Modal */}
      {showForm && (
        <ActivityForm
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          editActivity={editingActivity}
        />
      )}
    </div>
  );
};

export default Index;
