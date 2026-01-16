import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Receipt } from 'lucide-react';
import { GeneralExpense } from '@/types/generalExpense';

interface GeneralExpenseFormProps {
  onSubmit: (expense: Omit<GeneralExpense, 'id' | 'createdAt'>) => void;
  onClose: () => void;
  editExpense?: GeneralExpense | null;
}

const GeneralExpenseForm: React.FC<GeneralExpenseFormProps> = ({ onSubmit, onClose, editExpense }) => {
  const { language } = useLanguage();
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (editExpense) {
      setType(editExpense.type);
      setPrice(editExpense.price.toString());
      setDate(editExpense.date);
    }
  }, [editExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type.trim() || !price) return;

    onSubmit({
      type: type.trim(),
      price: parseFloat(price),
      date,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-card w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="gradient-sport text-primary-foreground p-4 flex items-center justify-between sm:rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold">
              {editExpense
                ? (language === 'ar' ? 'تعديل المصروف' : 'Edit Expense')
                : (language === 'ar' ? 'إضافة مصروف' : 'Add Expense')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-foreground/20 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {language === 'ar' ? 'نوع المصروف' : 'Expense Type'}
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder={language === 'ar' ? 'مثال: فاتورة الكهرباء، بنزين...' : 'e.g., Electricity bill, Gas...'}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {language === 'ar' ? 'الثمن (دج)' : 'Price (DZD)'}
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              min="0"
              step="1"
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {language === 'ar' ? 'التاريخ' : 'Date'}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-muted text-foreground hover:bg-muted/80 transition-colors"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl gradient-sport text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {language === 'ar' ? 'حفظ' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneralExpenseForm;
