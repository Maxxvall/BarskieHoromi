import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Shield, RefreshCw, Copy, Check } from 'lucide-react';
import { getTelegramUserData } from '../lib/telegram-api';
import { toast } from 'sonner';

interface AdminPageProps {
  onBack: () => void;
}

export function AdminPage({ onBack }: AdminPageProps) {
  const [currentPromoCode, setCurrentPromoCode] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSecretSectionVisible, setIsSecretSectionVisible] = useState<boolean>(true);
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const userData = getTelegramUserData();

  // Загрузка текущего промокода
  const loadPromoCode = async () => {
    try {
      const response = await fetch('/api/promo-code');
      const data = await response.json();
      setCurrentPromoCode(data.promoCode);
    } catch (error) {
      console.error('Error loading promo code:', error);
      toast.error('Ошибка загрузки промокода');
    }
  };

  // Генерация нового промокода
  const generateNewPromoCode = async () => {
    if (!userData?.id) {
      toast.error('Ошибка авторизации');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/promo-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userData.id }),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentPromoCode(data.promoCode);
        toast.success('Новый промокод сгенерирован');
      } else {
        toast.error(data.error || 'Ошибка генерации промокода');
      }
    } catch (error) {
      console.error('Error generating promo code:', error);
      toast.error('Ошибка генерации промокода');
    } finally {
      setLoading(false);
    }
  };

  // Копирование промокода в буфер обмена
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentPromoCode);
      setCopied(true);
      toast.success('Промокод скопирован');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Ошибка копирования');
    }
  };

  // Загрузка состояния видимости секретного раздела
  const loadSecretSectionVisibility = async () => {
    try {
      const response = await fetch('/api/secret-section-visibility');
      const data = await response.json();
      setIsSecretSectionVisible(data.isVisible);
    } catch (error) {
      console.error('Error loading secret section visibility:', error);
    }
  };

  // Переключение видимости секретного раздела
  const toggleSecretSectionVisibility = async () => {
    if (!userData?.id) {
      toast.error('Ошибка авторизации');
      return;
    }

    setLoadingVisibility(true);
    try {
      const response = await fetch('/api/secret-section-visibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userData.id }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSecretSectionVisible(data.isVisible);
        toast.success(data.message);
      } else {
        toast.error(data.error || 'Ошибка изменения видимости');
      }
    } catch (error) {
      console.error('Error toggling secret section visibility:', error);
      toast.error('Ошибка изменения видимости');
    } finally {
      setLoadingVisibility(false);
    }
  };

  useEffect(() => {
    loadPromoCode();
    loadSecretSectionVisibility();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <Header title="Админ панель" onBack={onBack} />

      <div className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Заголовок */}
          <div className="text-center">
            <div className="w-16 h-16 bg-[#0088cc]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-[#0088cc]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Админ панель</h2>
          </div>

          {/* Управление промокодом */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Промокод для секретного магазина
            </h3>

            <div className="space-y-4">
              {/* Текущий промокод */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Текущий промокод
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-mono text-lg text-center">
                    {currentPromoCode || 'Загрузка...'}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    disabled={!currentPromoCode}
                  >
                    {copied ? (
                      <Check size={20} className="text-green-600" />
                    ) : (
                      <Copy size={20} className="text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Кнопка генерации */}
              <button
                onClick={generateNewPromoCode}
                disabled={loading}
                className="w-full bg-[#0088cc] hover:bg-[#0077aa] disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                <span>{loading ? 'Генерация...' : 'Сгенерировать новый промокод'}</span>
              </button>

              <p className="text-sm text-gray-600 text-center">
                Новый промокод генерируется ежедневно для доступа к алкогольному разделу
              </p>
            </div>
          </div>

          {/* Управление видимостью секретного раздела */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Видимость секретного раздела</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Секретный раздел в магазине</p>
                  <p className="text-xs text-gray-500">
                    {isSecretSectionVisible ? 'Виден всем пользователям' : 'Скрыт от пользователей'}
                  </p>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    isSecretSectionVisible ? 'bg-[#0088cc]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      isSecretSectionVisible ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </div>
              </div>

              <button
                onClick={toggleSecretSectionVisibility}
                disabled={loadingVisibility}
                className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>
                  {loadingVisibility
                    ? 'Изменение...'
                    : isSecretSectionVisible
                    ? 'Скрыть раздел'
                    : 'Показать раздел'}
                </span>
              </button>

              <p className="text-sm text-gray-600 text-center">
                Управление видимостью блока "Секретный раздел" в магазине
              </p>
            </div>
          </div>

          {/* Заглушка для будущих функций */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 text-center">
              Другие функции админ панели находятся в разработке
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
