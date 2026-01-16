import { useState, useEffect } from 'react';
import { GeneralExpense } from '@/types/generalExpense';

const STORAGE_KEY = 'samir-sport-general-expenses';

export const useGeneralExpenses = () => {
  const [expenses, setExpenses] = useState<GeneralExpense[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<GeneralExpense, 'id' | 'createdAt'>) => {
    const newExpense: GeneralExpense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const updateExpense = (id: string, updates: Partial<Omit<GeneralExpense, 'id' | 'createdAt'>>) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp))
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const getTotal = () => {
    return expenses.reduce((sum, exp) => sum + exp.price, 0);
  };

  const getMonthlyTotal = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return expenses
      .filter((exp) => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
      })
      .reduce((sum, exp) => sum + exp.price, 0);
  };

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotal,
    getMonthlyTotal,
  };
};
