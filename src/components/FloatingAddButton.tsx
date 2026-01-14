import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingAddButtonProps {
  onClick: () => void;
}

const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 gradient-sport rounded-full shadow-floating flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform animate-pulse-glow z-40"
    >
      <Plus className="w-8 h-8" />
    </button>
  );
};

export default FloatingAddButton;
