import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Search, Wallet, TrendingUp, Calendar } from 'lucide-react';
import GeneralExpenseCard from '@/components/GeneralExpenseCard';
import GeneralExpenseForm from '@/components/GeneralExpenseForm';
import { useGeneralExpenses } from '@/hooks/useGeneralExpenses';
import { GeneralExpense } from '@/types/generalExpense';

const GeneralExpenses: React.FC = () => {
  const { language } = useLanguage();
  const { expenses, addExpense, updateExpense, deleteExpense, getTotal, getMonthlyTotal } = useGeneralExpenses();
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<GeneralExpense | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter(exp => 
        exp.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, searchQuery]);

  const handleSubmit = (expenseData: Omit<GeneralExpense, 'id' | 'createdAt'>) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, expenseData);
    } else {
      addExpense(expenseData);
    }
    handleCloseForm();
  };

  const handleEdit = (expense: GeneralExpense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  return (
    <div className="px-4 py-6 max-w-lg mx-auto animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card-sport p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'إجمالي المصاريف' : 'Total Expenses'}
              </p>
              <p className="text-xl font-bold text-foreground">
                {getTotal().toLocaleString()} {language === 'ar' ? 'دج' : 'DZD'}
              </p>
            </div>
          </div>
        </div>

        <div className="card-sport p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'هذا الشهر' : 'This Month'}
              </p>
              <p className="text-xl font-bold text-foreground">
                {getMonthlyTotal().toLocaleString()} {language === 'ar' ? 'دج' : 'DZD'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Add */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-10 pe-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-3 rounded-xl gradient-sport text-primary-foreground flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">
            {language === 'ar' ? 'إضافة' : 'Add'}
          </span>
        </button>
      </div>

      {/* Expenses List */}
      <div className="space-y-4">
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map(expense => (
            <GeneralExpenseCard
              key={expense.id}
              expense={expense}
              onDelete={deleteExpense}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Wallet className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {language === 'ar' ? 'لا توجد مصاريف' : 'No expenses'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'أضف مصروفك الأول' : 'Add your first expense'}
            </p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <GeneralExpenseForm
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          editExpense={editingExpense}
        />
      )}
    </div>
  );
};

export default GeneralExpenses;
