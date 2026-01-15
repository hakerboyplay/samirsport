import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingNavButtonProps {
  onClick: () => void;
}

const FloatingNavButton: React.FC<FloatingNavButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 gradient-sport rounded-full shadow-floating flex items-center justify-center text-primary-foreground hover:scale-110 active:scale-95 transition-transform z-[60] ring-4 ring-background"
    >
      <Plus className="w-7 h-7" />
    </button>
  );
};

export default FloatingNavButton;
