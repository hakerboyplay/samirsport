export type ActivityType = 'running' | 'training' | 'rest' | 'competition' | 'other';

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  type: ActivityType;
  completed: boolean;
  createdAt: string;
}
