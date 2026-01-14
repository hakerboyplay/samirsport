import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useExpenses } from '@/hooks/useExpenses';
import { Expense, FoodCategory } from '@/types/expense';
import Header from '@/components/Header';
import ExpenseCard from '@/components/ExpenseCard';
import ExpenseForm from '@/components/ExpenseForm';
import FloatingAddButton from '@/components/FloatingAddButton';
import { Receipt, TrendingUp, Calendar, Search } from 'lucide-react';

const Expenses: React.FC = () => {
  const { t } = useLanguage();
  const { expenses, addExpense, deleteExpense, updateExpense, getTotal, getMonthlyTotal } = useExpenses();
  
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');

  const categories: { value: FoodCategory | 'all'; label: string }[] = [
    { value: 'all', label: t.all },
    { value: 'eggs', label: t.eggs },
    { value: 'raisins', label: t.raisins },
    { value: 'almonds', label: t.almonds },
    { value: 'water', label: t.water },
    { value: 'rice', label: t.rice },
    { value: 'yogurt', label: t.yogurt },
    { value: 'other', label: t.other },
  ];

  const filteredExpenses = useMemo(() => {
    let filtered = expenses;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((e) => e.name.toLowerCase().includes(query));
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((e) => e.category === selectedCategory);
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, searchQuery, selectedCategory]);

  const handleSubmit = (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, expenseData);
    } else {
      addExpense(expenseData);
    }
    setEditingExpense(null);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <main className="container py-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="card-sport p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/20 text-primary">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t.totalExpenses}</p>
                <p className="font-bold text-lg">{getTotal().toLocaleString()} {t.currency}</p>
              </div>
            </div>
          </div>
          <div className="card-sport p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent/20 text-accent-foreground">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t.thisMonth}</p>
                <p className="font-bold text-lg">{getMonthlyTotal().toLocaleString()} {t.currency}</p>
              </div>
            </div>
          </div>
        </div>

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

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Expenses List */}
        <div className="space-y-4">
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                <Receipt className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t.noExpenses}</h3>
              <p className="text-muted-foreground mb-4">{t.addFirstExpense}</p>
              <button onClick={() => setShowForm(true)} className="btn-primary">
                {t.addExpense}
              </button>
            </div>
          ) : (
            filteredExpenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                onDelete={deleteExpense}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>
      </main>

      {/* Floating Add Button */}
      {expenses.length > 0 && (
        <FloatingAddButton onClick={() => setShowForm(true)} />
      )}

      {/* Expense Form Modal */}
      {showForm && (
        <ExpenseForm
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          editExpense={editingExpense}
        />
      )}
    </div>
  );
};

export default Expenses;
