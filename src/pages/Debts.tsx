import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDebts } from '@/hooks/useDebts';
import { Debt } from '@/types/debt';
import { 
  Plus, Trash2, Edit2, Phone, ArrowUpCircle, ArrowDownCircle, 
  BookOpen, X, Save, TrendingUp, TrendingDown, Scale 
} from 'lucide-react';

const Debts: React.FC = () => {
  const { language } = useLanguage();
  const { debts, addDebt, updateDebt, deleteDebt, totalOwedToMe, totalOwedByMe, netBalance } = useDebts();
  const [showForm, setShowForm] = useState(false);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [filter, setFilter] = useState<'all' | 'owed_to_me' | 'owed_by_me'>('all');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    amount: '',
    type: 'owed_to_me' as 'owed_to_me' | 'owed_by_me',
    notes: '',
  });

  const resetForm = () => {
    setFormData({ name: '', phone: '', amount: '', type: 'owed_to_me', notes: '' });
    setEditingDebt(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.amount) return;

    if (editingDebt) {
      updateDebt(editingDebt.id, {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        amount: parseFloat(formData.amount),
        type: formData.type,
        notes: formData.notes.trim(),
      });
    } else {
      addDebt({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        amount: parseFloat(formData.amount),
        type: formData.type,
        notes: formData.notes.trim(),
      });
    }
    resetForm();
  };

  const handleEdit = (debt: Debt) => {
    setEditingDebt(debt);
    setFormData({
      name: debt.name,
      phone: debt.phone || '',
      amount: debt.amount.toString(),
      type: debt.type,
      notes: debt.notes || '',
    });
    setShowForm(true);
  };

  const filteredDebts = debts.filter((d) => filter === 'all' || d.type === filter);

  return (
    <div className="container pb-8 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-accent/10 rounded-2xl p-4 text-center border border-accent/20">
          <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
          <p className="text-xs text-muted-foreground mb-1">
            {language === 'ar' ? 'لي عندهم' : 'Owed to me'}
          </p>
          <p className="text-lg font-bold text-accent">{totalOwedToMe.toLocaleString()}</p>
        </div>
        <div className="bg-destructive/10 rounded-2xl p-4 text-center border border-destructive/20">
          <TrendingDown className="w-6 h-6 text-destructive mx-auto mb-2" />
          <p className="text-xs text-muted-foreground mb-1">
            {language === 'ar' ? 'عليّ لهم' : 'I owe'}
          </p>
          <p className="text-lg font-bold text-destructive">{totalOwedByMe.toLocaleString()}</p>
        </div>
        <div className={`rounded-2xl p-4 text-center border ${netBalance >= 0 ? 'bg-accent/10 border-accent/20' : 'bg-destructive/10 border-destructive/20'}`}>
          <Scale className={`w-6 h-6 mx-auto mb-2 ${netBalance >= 0 ? 'text-accent' : 'text-destructive'}`} />
          <p className="text-xs text-muted-foreground mb-1">
            {language === 'ar' ? 'الرصيد' : 'Balance'}
          </p>
          <p className={`text-lg font-bold ${netBalance >= 0 ? 'text-accent' : 'text-destructive'}`}>
            {netBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {[
          { key: 'all', labelAr: 'الكل', labelEn: 'All' },
          { key: 'owed_to_me', labelAr: 'لي عندهم', labelEn: 'Owed to me' },
          { key: 'owed_by_me', labelAr: 'عليّ لهم', labelEn: 'I owe' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as typeof filter)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              filter === tab.key
                ? 'gradient-sport text-primary-foreground shadow-button'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {language === 'ar' ? tab.labelAr : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowForm(true)}
        className="w-full btn-sport flex items-center justify-center gap-2 mb-6"
      >
        <Plus className="w-5 h-5" />
        {language === 'ar' ? 'إضافة سجل جديد' : 'Add New Record'}
      </button>

      {/* Debts List */}
      <div className="space-y-3">
        {filteredDebts.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-2xl shadow-card">
            <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === 'ar' ? 'لا توجد سجلات' : 'No records'}
            </p>
          </div>
        ) : (
          filteredDebts.map((debt) => (
            <div
              key={debt.id}
              className="activity-card flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3 flex-1">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    debt.type === 'owed_to_me' ? 'bg-accent/20' : 'bg-destructive/20'
                  }`}
                >
                  {debt.type === 'owed_to_me' ? (
                    <ArrowDownCircle className="w-5 h-5 text-accent" />
                  ) : (
                    <ArrowUpCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{debt.name}</h3>
                  {debt.phone && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {debt.phone}
                    </p>
                  )}
                  {debt.notes && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{debt.notes}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className={`font-bold text-lg ${debt.type === 'owed_to_me' ? 'text-accent' : 'text-destructive'}`}>
                  {debt.amount.toLocaleString()} {language === 'ar' ? 'دج' : 'DZD'}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(debt)}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteDebt(debt.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end animate-fade-in">
          <div className="bg-card w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editingDebt
                  ? (language === 'ar' ? 'تعديل السجل' : 'Edit Record')
                  : (language === 'ar' ? 'سجل جديد' : 'New Record')}
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-muted rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ar' ? 'الاسم' : 'Name'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className="input-sport w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ar' ? 'رقم الهاتف (اختياري)' : 'Phone (optional)'}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  className="input-sport w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ar' ? 'المبلغ (دج)' : 'Amount (DZD)'}
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData((p) => ({ ...p, amount: e.target.value }))}
                  className="input-sport w-full"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ar' ? 'النوع' : 'Type'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, type: 'owed_to_me' }))}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.type === 'owed_to_me'
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    <ArrowDownCircle className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">{language === 'ar' ? 'لي عنده' : 'Owes me'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, type: 'owed_by_me' }))}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.type === 'owed_by_me'
                        ? 'border-destructive bg-destructive/10 text-destructive'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    <ArrowUpCircle className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">{language === 'ar' ? 'أنا عليه' : 'I owe'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ar' ? 'ملاحظات (اختياري)' : 'Notes (optional)'}
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                  className="input-sport w-full resize-none"
                  rows={3}
                />
              </div>

              <button type="submit" className="w-full btn-sport flex items-center justify-center gap-2">
                <Save className="w-5 h-5" />
                {editingDebt
                  ? (language === 'ar' ? 'تحديث' : 'Update')
                  : (language === 'ar' ? 'حفظ' : 'Save')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Debts;
