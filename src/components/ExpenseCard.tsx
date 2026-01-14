import React from 'react';
import { Expense, FoodCategory } from '@/types/expense';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trash2, Edit, Egg, Apple, Droplets, Wheat, IceCream, Nut } from 'lucide-react';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

const categoryIcons: Record<FoodCategory, React.ElementType> = {
  eggs: Egg,
  raisins: Apple,
  almonds: Nut,
  water: Droplets,
  rice: Wheat,
  yogurt: IceCream,
  other: Apple,
};

const categoryColors: Record<FoodCategory, string> = {
  eggs: 'bg-amber-500/20 text-amber-600',
  raisins: 'bg-purple-500/20 text-purple-600',
  almonds: 'bg-orange-500/20 text-orange-600',
  water: 'bg-blue-500/20 text-blue-600',
  rice: 'bg-yellow-500/20 text-yellow-600',
  yogurt: 'bg-pink-500/20 text-pink-600',
  other: 'bg-gray-500/20 text-gray-600',
};

interface ExpenseCardProps {
  expense: Expense;
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onDelete, onEdit }) => {
  const { language, t } = useLanguage();
  const Icon = categoryIcons[expense.category];
  const colorClass = categoryColors[expense.category];

  const categoryLabels: Record<FoodCategory, string> = {
    eggs: t.eggs,
    raisins: t.raisins,
    almonds: t.almonds,
    water: t.water,
    rice: t.rice,
    yogurt: t.yogurt,
    other: t.other,
  };

  const formattedDate = format(new Date(expense.date), 'dd MMM yyyy', {
    locale: language === 'ar' ? ar : enUS,
  });

  const total = expense.price * expense.quantity;

  return (
    <div className="card-sport p-4 animate-slide-up">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-foreground">{expense.name}</h3>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${colorClass} mt-1`}>
                {categoryLabels[expense.category]}
              </span>
            </div>
            <div className="text-end">
              <p className="font-bold text-primary">{total.toLocaleString()} {t.currency}</p>
              <p className="text-xs text-muted-foreground">
                {expense.quantity} × {expense.price.toLocaleString()}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-2">{formattedDate}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-4 pt-3 border-t border-border">
        <button
          onClick={() => onEdit(expense)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          <Edit className="w-4 h-4" />
          <span className="text-sm">{t.edit}</span>
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm">{t.delete}</span>
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
