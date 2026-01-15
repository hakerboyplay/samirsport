import { useState, useEffect } from 'react';
import { Debt } from '@/types/debt';

const STORAGE_KEY = 'samir-sport-debts';

export const useDebts = () => {
  const [debts, setDebts] = useState<Debt[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(debts));
  }, [debts]);

  const addDebt = (debt: Omit<Debt, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDebt: Debt = {
      ...debt,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDebts((prev) => [newDebt, ...prev]);
  };

  const updateDebt = (id: string, updates: Partial<Omit<Debt, 'id' | 'createdAt'>>) => {
    setDebts((prev) =>
      prev.map((debt) =>
        debt.id === id
          ? { ...debt, ...updates, updatedAt: new Date().toISOString() }
          : debt
      )
    );
  };

  const deleteDebt = (id: string) => {
    setDebts((prev) => prev.filter((debt) => debt.id !== id));
  };

  const totalOwedToMe = debts
    .filter((d) => d.type === 'owed_to_me')
    .reduce((sum, d) => sum + d.amount, 0);

  const totalOwedByMe = debts
    .filter((d) => d.type === 'owed_by_me')
    .reduce((sum, d) => sum + d.amount, 0);

  return {
    debts,
    addDebt,
    updateDebt,
    deleteDebt,
    totalOwedToMe,
    totalOwedByMe,
    netBalance: totalOwedToMe - totalOwedByMe,
  };
};
