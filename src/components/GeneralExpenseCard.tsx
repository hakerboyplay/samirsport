import React from 'react';
import { GeneralExpense } from '@/types/generalExpense';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trash2, Edit, Receipt } from 'lucide-react';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

interface GeneralExpenseCardProps {
  expense: GeneralExpense;
  onDelete: (id: string) => void;
  onEdit: (expense: GeneralExpense) => void;
}

const GeneralExpenseCard: React.FC<GeneralExpenseCardProps> = ({ expense, onDelete, onEdit }) => {
  const { language } = useLanguage();

  const formattedDate = format(new Date(expense.date), 'dd MMM yyyy', {
    locale: language === 'ar' ? ar : enUS,
  });

  return (
    <div className="card-sport p-4 animate-slide-up">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-primary/20 text-primary">
          <Receipt className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-foreground">{expense.type}</h3>
              <p className="text-sm text-muted-foreground mt-1">{formattedDate}</p>
            </div>
            <div className="text-end">
              <p className="font-bold text-primary text-lg">
                {expense.price.toLocaleString()} {language === 'ar' ? 'دج' : 'DZD'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4 pt-3 border-t border-border">
        <button
          onClick={() => onEdit(expense)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          <Edit className="w-4 h-4" />
          <span className="text-sm">{language === 'ar' ? 'تعديل' : 'Edit'}</span>
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm">{language === 'ar' ? 'حذف' : 'Delete'}</span>
        </button>
      </div>
    </div>
  );
};

export default GeneralExpenseCard;
