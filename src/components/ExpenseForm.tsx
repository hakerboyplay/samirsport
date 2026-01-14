import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Expense, FoodCategory } from '@/types/expense';
import { X, Egg, Apple, Droplets, Wheat, IceCream, Nut } from 'lucide-react';

const categoryIcons: Record<FoodCategory, React.ElementType> = {
  eggs: Egg,
  raisins: Apple,
  almonds: Nut,
  water: Droplets,
  rice: Wheat,
  yogurt: IceCream,
  other: Apple,
};

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  onClose: () => void;
  editExpense?: Expense | null;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, onClose, editExpense }) => {
  const { t } = useLanguage();
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState<FoodCategory>('eggs');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (editExpense) {
      setName(editExpense.name);
      setCategory(editExpense.category);
      setPrice(editExpense.price.toString());
      setQuantity(editExpense.quantity.toString());
      setDate(editExpense.date);
    }
  }, [editExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      category,
      price: parseFloat(price) || 0,
      quantity: parseInt(quantity) || 1,
      date,
    });
    onClose();
  };

  const categoryOptions: { value: FoodCategory; label: string; icon: React.ElementType }[] = [
    { value: 'eggs', label: t.eggs, icon: categoryIcons.eggs },
    { value: 'raisins', label: t.raisins, icon: categoryIcons.raisins },
    { value: 'almonds', label: t.almonds, icon: categoryIcons.almonds },
    { value: 'water', label: t.water, icon: categoryIcons.water },
    { value: 'rice', label: t.rice, icon: categoryIcons.rice },
    { value: 'yogurt', label: t.yogurt, icon: categoryIcons.yogurt },
    { value: 'other', label: t.other, icon: categoryIcons.other },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            {editExpense ? t.edit : t.addExpense}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t.foodName}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-sport w-full"
              placeholder={t.foodNamePlaceholder}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t.category}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {categoryOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setCategory(opt.value)}
                    className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                      category === opt.value
                        ? 'bg-primary text-primary-foreground shadow-floating'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.price} ({t.currency})
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                step="1"
                className="input-sport w-full"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.quantity}
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                min="1"
                className="input-sport w-full"
                placeholder="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t.date}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="input-sport w-full"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              {t.cancel}
            </button>
            <button type="submit" className="btn-primary flex-1">
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
