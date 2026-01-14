import { useState, useEffect } from 'react';
import { Expense } from '@/types/expense';

const STORAGE_KEY = 'samir-sport-expenses';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const updateExpense = (id: string, updates: Partial<Omit<Expense, 'id' | 'createdAt'>>) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp))
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const getTotalByCategory = (category: string) => {
    return expenses
      .filter((exp) => exp.category === category)
      .reduce((sum, exp) => sum + exp.price * exp.quantity, 0);
  };

  const getTotal = () => {
    return expenses.reduce((sum, exp) => sum + exp.price * exp.quantity, 0);
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
      .reduce((sum, exp) => sum + exp.price * exp.quantity, 0);
  };

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotalByCategory,
    getTotal,
    getMonthlyTotal,
  };
};
