export type FoodCategory = 'eggs' | 'raisins' | 'almonds' | 'water' | 'rice' | 'yogurt' | 'other';

export interface Expense {
  id: string;
  category: FoodCategory;
  name: string;
  price: number;
  quantity: number;
  date: string;
  createdAt: string;
}
