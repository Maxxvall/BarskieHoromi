import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export function Header({ title, onBack }: HeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-elevation-1 [@supportsnot(backdrop-filter:blur(1px))]:bg-white/90">
      <div className="flex items-center h-14 px-4">
        {onBack && (
          <button
            onClick={onBack}
            className="mr-3 p-2 -ml-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
            aria-label="Назад"
          >
            <ArrowLeft size={24} color="#0088cc" />
          </button>
        )}
        <h1 className="text-[20px] font-light tracking-tight text-[#000000]">{title}</h1>
      </div>
    </div>
  );
}
