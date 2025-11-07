# Быстрый старт Barskhoromi Mini App

## 1️⃣ Установка зависимостей

```powershell
npm install
```

Эта команда установит все необходимые пакеты:
- React и React DOM
- TypeScript
- Vite
- Tailwind CSS
- Telegram Web Apps SDK
- UI компоненты (Radix UI, shadcn/ui)
- И другие зависимости

## 2️⃣ Разработка

### Запуск локального сервера

```powershell
npm run dev
```

Приложение откроется на `http://localhost:5173`

### Проверка ошибок

```powershell
npm run lint
```

## 3️⃣ Тестирование в Telegram

Для тестирования в Telegram нужен HTTPS. Используйте ngrok:

### Установка ngrok

1. Скачайте с https://ngrok.com/download
2. Или через npm: `npm install -g ngrok`

### Создание туннеля

```powershell
# Запустите dev-сервер
npm run dev

# В другом терминале создайте туннель
ngrok http 5173
```

Ngrok выдаст URL типа: `https://abc123.ngrok.io`

### Настройка Mini App в Telegram

1. Откройте [@BotFather](https://t.me/BotFather)
2. Если нет бота, создайте: `/newbot`
3. Создайте Mini App: `/newapp`
4. Выберите бота
5. Введите название приложения
6. Введите описание
7. Загрузите иконку (512x512 PNG)
8. Отправьте GIF/видео демонстрацию (необязательно)
9. **Важно**: Введите URL из ngrok: `https://abc123.ngrok.io`
10. Выберите короткое имя (short name) для вашего приложения

### Открытие Mini App

После настройки вы получите ссылку вида:
```
https://t.me/YourBot/YourAppName
```

## 4️⃣ Сборка для продакшена

```powershell
npm run build
```

Готовые файлы будут в папке `dist/`

### Предпросмотр продакшен-сборки

```powershell
npm run preview
```

## 5️⃣ Деплой

### Вариант A: Vercel (рекомендуется) ⭐

```powershell
# Установите Vercel CLI
npm install -g vercel

# Выполните деплой
vercel

# Для продакшен деплоя
vercel --prod
```

После деплоя вы получите постоянный HTTPS URL для вашего приложения.

### Вариант B: Netlify

```powershell
# Установите Netlify CLI
npm install -g netlify-cli

# Логин
netlify login

# Деплой
netlify deploy

# Продакшен деплой
netlify deploy --prod
```

### Вариант C: GitHub Pages

1. Добавьте в `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/repository-name/',
  // ... остальные настройки
});
```

2. Создайте GitHub Action (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 6️⃣ Обновление URL в BotFather

После деплоя обновите URL:

1. Откройте [@BotFather](https://t.me/BotFather)
2. `/myapps`
3. Выберите ваше приложение
4. "Edit Web App URL"
5. Введите новый продакшен URL

## 🔧 Полезные команды

```powershell
# Очистка кеша и node_modules
Remove-Item -Recurse -Force node_modules
Remove-Item -Path package-lock.json
npm install

# Обновление зависимостей
npm update

# Проверка устаревших пакетов
npm outdated

# Установка конкретной версии пакета
npm install package@version
```

## 🐛 Отладка

### Проверка Telegram WebApp в консоли

Откройте DevTools (F12) и введите:
```javascript
window.Telegram.WebApp
```

### Проверка переменных темы

```javascript
window.Telegram.WebApp.themeParams
```

### Логи инициализации

Все логи выводятся в консоль при запуске приложения.

## 📝 Структура после установки

```
Barskhoromi/
├── node_modules/        # Зависимости (создается после npm install)
├── dist/                # Продакшен сборка (создается после npm run build)
├── components/          # React компоненты
├── lib/                # Утилиты
├── styles/             # Стили
├── .vscode/            # Настройки VS Code
├── index.html          # HTML шаблон
├── main.tsx            # Точка входа
├── App.tsx             # Главный компонент
├── vite.config.ts      # Конфигурация Vite
├── tailwind.config.js  # Конфигурация Tailwind
├── tsconfig.json       # Конфигурация TypeScript
├── package.json        # Зависимости и скрипты
└── README.md           # Документация
```

## ⚡ Быстрый старт (TL;DR)

```powershell
# 1. Установка
npm install

# 2. Разработка
npm run dev

# 3. В другом терминале - туннель для Telegram
ngrok http 5173

# 4. Настройте Mini App в @BotFather с URL из ngrok

# 5. Откройте приложение в Telegram!
```

## 💡 Советы

1. **Разработка**: Используйте браузер для быстрой разработки UI
2. **Тестирование**: Регулярно проверяйте в реальном Telegram
3. **Деплой**: Используйте Vercel для простоты и бесплатного HTTPS
4. **Обновления**: Не забывайте обновлять URL в BotFather после деплоя
5. **Мобильный**: Основное тестирование проводите на мобильном устройстве

## 🆘 Проблемы?

### Ошибка: Cannot find module

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Ошибка при сборке

```powershell
npm run build -- --debug
```

### Не работает в Telegram

1. Проверьте HTTPS
2. Убедитесь, что URL обновлен в BotFather
3. Проверьте консоль в Telegram Desktop или через Web Inspector на iOS

### ngrok тормозит/не работает

Попробуйте альтернативы:
- [localhost.run](https://localhost.run/): `ssh -R 80:localhost:5173 nokey@localhost.run`
- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [Tailscale Funnel](https://tailscale.com/kb/1223/tailscale-funnel/)
