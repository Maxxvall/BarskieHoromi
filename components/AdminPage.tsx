import { Header } from './Header';
import { Shield } from 'lucide-react';

interface AdminPageProps {
  onBack: () => void;
}

export function AdminPage({ onBack }: AdminPageProps) {
  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <Header title="Админ панель" onBack={onBack} />

      <div className="px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="w-16 h-16 bg-[#0088cc]/10 rounded-full flex items-center justify-center mb-4">
            <Shield size={32} className="text-[#0088cc]" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Админ панель</h2>
          <p className="text-gray-600 mb-6">Функционал админ панели находится в разработке</p>
          <div className="bg-gray-50 rounded-lg p-4 w-full max-w-sm">
            <p className="text-sm text-gray-500">
              Здесь будут инструменты для управления контентом, заказами и настройками.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
