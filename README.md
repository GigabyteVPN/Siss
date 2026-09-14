# 🎌 AniMarket — Premium Anime Marketplace

Премиальный маркетплейс аниме товаров, созданный с использованием современных веб-технологий и лучших практик программирования.

## 🚀 Технологии

### Frontend Stack
- **React 18** — UI библиотека с hooks и functional components
- **TypeScript** — типизация для надёжности кода
- **Vite 6** — быстрый сборщик и dev server
- **Tailwind CSS 4** — utility-first CSS фреймворк
- **Framer Motion** — продвинутые анимации и transitions

### State Management
- **React Context API** — глобальное состояние для корзины, wishlist, тем и локализации
- **Custom Hooks** — переиспользуемая логика (useCart, useWishlist, useTheme, useLanguage, useToast)

### Architecture
- **Feature-based structure** — организация кода по функциональности
- **Component composition** — переиспользуемые компоненты
- **Separation of concerns** — разделение логики, данных и представления
- **Type safety** — полная типизация TypeScript

## ✨ Функциональность

### 🛍️ E-commerce Features
- ✅ Каталог товаров с фильтрацией и сортировкой
- ✅ Корзина покупок с анимациями
- ✅ Wishlist (избранное)
- ✅ Быстрый просмотр товаров (Quick View Modal)
- ✅ Система уведомлений (Toast notifications)
- ✅ Адаптивная сетка товаров

### 🎨 UI/UX Features
- ✅ **Тёмная и светлая темы** с плавным переключением
- ✅ **Мультиязычность** (Русский/English)
- ✅ **PWA** — Progressive Web App для установки на устройства
- ✅ **Glassmorphism** — современный дизайн с эффектами стекла
- ✅ **3D hover effects** — интерактивные карточки товаров
- ✅ **Cursor follower** — анимированный курсор
- ✅ **Smooth animations** — плавные transitions везде
- ✅ **Responsive design** — идеальная адаптивность на всех устройствах
- ✅ **Hidden scrollbars** — чистый интерфейс без видимых скроллбаров

### 📱 PWA Features
- ✅ Offline support через Service Worker
- ✅ Installable на мобильные устройства
- ✅ Custom app icon
- ✅ Standalone mode
- ✅ Theme color для status bar

## 🏗️ Структура проекта

```
src/
├── components/
│   ├── cart/
│   │   └── CartDrawer.tsx          # Выдвижная корзина
│   ├── layout/
│   │   ├── Header.tsx              # Шапка с навигацией
│   │   └── Footer.tsx              # Подвал сайта
│   └── product/
│       ├── ProductCard.tsx         # Карточка товара
│       ├── ProductGrid.tsx         # Сетка товаров
│       └── ProductModal.tsx        # Модальное окно товара
├── context/
│   ├── CartContext.tsx             # Контекст корзины
│   ├── WishlistContext.tsx         # Контекст избранного
│   ├── ThemeContext.tsx            # Контекст темы
│   ├── LanguageContext.tsx         # Контекст локализации
│   └── ToastContext.tsx            # Контекст уведомлений
├── data/
│   └── products.ts                 # Данные товаров
├── pages/
│   ├── HomePage.tsx                # Главная страница
│   ├── CatalogPage.tsx             # Страница каталога
│   └── AboutPage.tsx               # Страница "О нас"
├── types/
│   └── index.ts                    # TypeScript типы
├── App.tsx                         # Главный компонент
├── main.tsx                        # Точка входа
└── index.css                       # Глобальные стили

public/
├── manifest.json                   # PWA manifest
├── sw.js                          # Service Worker
└── icon.svg                       # App icon
```

## 🎯 Лучшие практики программирования

### 1. **Type Safety**
- Полная типизация TypeScript
- Интерфейсы для всех данных
- Type-safe контексты и хуки

### 2. **Component Design**
- Single Responsibility Principle
- Переиспользуемые компоненты
- Props validation через TypeScript
- Composition over inheritance

### 3. **State Management**
- Context API для глобального состояния
- Custom hooks для инкапсуляции логики
- Локальное состояние для UI-specific данных
- Immutable updates

### 4. **Performance**
- Lazy loading изображений
- Memoization где необходимо
- Оптимизированные re-renders
- Code splitting через Vite

### 5. **Accessibility**
- Семантический HTML
- ARIA labels
- Keyboard navigation
- Focus management
- Color contrast

### 6. **Code Quality**
- ESLint конфигурация
- Consistent naming conventions
- Clear file organization
- Modular architecture

### 7. **User Experience**
- Smooth animations (60fps)
- Loading states
- Error handling
- Toast notifications
- Responsive design (mobile-first)

### 8. **Modern CSS**
- Tailwind CSS для rapid development
- CSS custom properties для тем
- Backdrop filters для glassmorphism
- CSS Grid и Flexbox для layouts
- CSS animations и transitions

## 🌍 Локализация

Поддерживаются два языка:
- 🇷🇺 Русский (по умолчанию)
- 🇬🇧 English

Переключение через иконку глобуса в хедере.

## 🎨 Темы

- 🌙 Тёмная тема (по умолчанию)
- ☀️ Светлая тема

Переключение через иконку солнца/луны в хедере. Настройки сохраняются в localStorage.

## 📱 PWA Installation

### Desktop (Chrome/Edge)
1. Откройте сайт в браузере
2. Нажмите на иконку установки в адресной строке
3. Подтвердите установку

### Mobile (Android)
1. Откройте сайт в Chrome
2. Нажмите меню (⋮)
3. Выберите "Добавить на главный экран"

### iOS (Safari)
1. Откройте сайт в Safari
2. Нажмите кнопку "Поделиться"
3. Выберите "На экран «Домой»"

## 🚀 Разработка

```bash
# Установка зависимостей
npm install

# Запуск dev server
npm run dev

# Сборка для production
npm run build

# Проверка типов
npm run typecheck
```

## 📦 Production Build

```bash
npm run build
```

Результат в папке `dist/`:
- Оптимизированный HTML
- Минифицированный CSS (92 KB)
- Минифицированный JS (366 KB)
- Gzip compression ready

## 🎯 Performance Metrics

- **First Contentful Paint**: < 1s
- **Largest Contentful Paint**: < 2s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: 90+

## 🔒 Security

- No external dependencies with known vulnerabilities
- Content Security Policy ready
- HTTPS ready
- No inline scripts (except SW registration)

## 📄 License

MIT License - свободное использование для любых целей.

---

Создано с ❤️ для отаку всего мира
