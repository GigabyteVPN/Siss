import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    // Header
    home: 'Главная',
    catalog: 'Каталог',
    new: 'Новинки',
    about: 'О нас',
    search: 'Найти аниме игрушку...',
    
    // Hero
    heroSubtitle: 'НОВАЯ КОЛЛЕКЦИЯ 2024 УЖЕ В ПРОДАЖЕ',
    heroTitle1: 'Мир',
    heroTitle2: 'аниме',
    heroTitle3: 'у тебя',
    heroTitle4: 'дома',
    heroDesc: 'Эксклюзивные коллекционные фигурки, лимитированные серии и редкие аксессуары из лучших аниме со всего мира.',
    openCatalog: 'Открыть каталог',
    premiumCollection: 'Премиум коллекция',
    
    // Stats
    products: 'Товаров',
    customers: 'Клиентов',
    rating: 'Рейтинг',
    
    // Features
    freeShipping: 'Бесплатная доставка',
    freeShippingDesc: 'При заказе от 5000 ₽',
    original: '100% Оригинал',
    originalDesc: 'Гарантия подлинности',
    return: 'Возврат 30 дней',
    returnDesc: 'Без вопросов',
    premiumPack: 'Premium упаковка',
    premiumPackDesc: 'Бесплатно к заказу',
    
    // Sections
    bestsellers: 'Хиты продаж',
    popularProducts: 'Популярные товары',
    newArrivals: 'Свежие новинки',
    freshArrivals: 'Только что появились',
    viewAll: 'Все товары',
    allNew: 'Все новинки',
    
    // Premium Banner
    limitedEdition: 'LIMITED EDITION',
    exclusiveCollection: 'Эксклюзивная коллекция',
    premiumEdition: 'Premium Edition',
    premiumDesc: 'Лимитированные фигурки ручной работы от лучших японских мастеров. Каждая piece — произведение искусства, созданное в единственном экземпляре.',
    viewCollection: 'Смотреть коллекцию',
    
    // Newsletter
    exclusiveAccess: 'EXCLUSIVE ACCESS',
    beFirst: 'Будь первым, кто узнает',
    newsletterDesc: 'Подпишись на рассылку и получай ранний доступ к лимитированным коллекциям и эксклюзивным скидкам.',
    yourEmail: 'Твой email',
    subscribe: 'Подписаться',
    
    // Reviews
    customerReviews: 'Отзывы клиентов',
    reviewsDesc: 'Более 50 000 довольных коллекционеров',
    verifiedBuyer: 'Проверенный покупатель',
    
    // Brands
    officialPartner: 'Официальный партнёр ведущих брендов',
    
    // How it works
    simpleAs123: 'Просто как 1-2-3',
    howItWorks: 'Как это работает',
    choose: 'Выбери',
    chooseDesc: 'Найди идеальную фигурку или игрушку в нашем каталоге из 5000+ товаров',
    order: 'Закажи',
    orderDesc: 'Оформи заказ за 1 минуту. Оплата картой, СБП или при получении',
    receive: 'Получи',
    receiveDesc: 'Быстрая доставка 1-3 дня по России. Premium упаковка в подарок',
    
    // Why choose us
    advantages: 'Преимущества',
    whyChooseUs: 'Почему выбирают нас',
    originalProducts: 'Оригинальная продукция',
    daysDelivery: 'Дня доставки',
    daysReturn: 'Дней на возврат',
    support: 'Поддержка клиентов',
    
    // FAQ
    faq: 'Частые вопросы',
    faqTitle: 'Ответы на вопросы',
    
    // Footer
    footerBrand: 'Premium Collection',
    footerDesc: 'Лучший маркетплейс аниме игрушек. Оригинальная продукция из Японии, быстрая доставка по всей России.',
    catalogSection: 'Каталог',
    figures: 'Фигурки',
    plush: 'Плюшевые игрушки',
    accessories: 'Аксессуары',
    construction: 'Конструкторы',
    limited: 'Лимитированные',
    forBuyers: 'Покупателям',
    delivery: 'Доставка',
    payment: 'Оплата',
    returns: 'Возврат',
    contacts: 'Контакты',
    madeWith: 'Сделано с',
    forOtaku: 'для отаку',
    
    // Cart
    cart: 'Корзина',
    items: 'товаров',
    emptyCart: 'Корзина пуста',
    emptyCartDesc: 'Добавьте что-нибудь из каталога!',
    total: 'Итого',
    checkout: 'Оформить заказ',
    clearCart: 'Очистить корзину',
    freeDelivery: 'Бесплатная доставка!',
    
    // Product
    quickView: 'Быстрый просмотр',
    hit: 'ХИТ',
    discount: 'Скидка',
    noStock: 'Нет в наличии',
    addToCart: 'В корзину',
    description: 'Описание',
    quantity: 'Количество',
    warranty: 'Гарантия',
    
    // Toast
    addedToCart: 'Добавлено в корзину!',
    addedToWishlist: 'Добавлено в избранное ❤️',
    removedFromWishlist: 'Удалено из избранного',
    
    // Theme
    darkTheme: 'Тёмная тема',
    lightTheme: 'Светлая тема',
  },
  en: {
    // Header
    home: 'Home',
    catalog: 'Catalog',
    new: 'New',
    about: 'About',
    search: 'Search anime toys...',
    
    // Hero
    heroSubtitle: 'NEW 2024 COLLECTION NOW AVAILABLE',
    heroTitle1: 'The world of',
    heroTitle2: 'anime',
    heroTitle3: 'at your',
    heroTitle4: 'home',
    heroDesc: 'Exclusive collectible figures, limited editions and rare accessories from the best anime worldwide.',
    openCatalog: 'Open Catalog',
    premiumCollection: 'Premium Collection',
    
    // Stats
    products: 'Products',
    customers: 'Customers',
    rating: 'Rating',
    
    // Features
    freeShipping: 'Free Shipping',
    freeShippingDesc: 'On orders over $50',
    original: '100% Original',
    originalDesc: 'Authenticity guaranteed',
    return: '30 Day Returns',
    returnDesc: 'No questions asked',
    premiumPack: 'Premium Packaging',
    premiumPackDesc: 'Free with order',
    
    // Sections
    bestsellers: 'Bestsellers',
    popularProducts: 'Popular Products',
    newArrivals: 'Fresh Arrivals',
    freshArrivals: 'Just arrived',
    viewAll: 'View All',
    allNew: 'All New',
    
    // Premium Banner
    limitedEdition: 'LIMITED EDITION',
    exclusiveCollection: 'Exclusive Collection',
    premiumEdition: 'Premium Edition',
    premiumDesc: 'Limited edition handcrafted figures from the best Japanese artisans. Each piece is a work of art, created in a single copy.',
    viewCollection: 'View Collection',
    
    // Newsletter
    exclusiveAccess: 'EXCLUSIVE ACCESS',
    beFirst: 'Be the first to know',
    newsletterDesc: 'Subscribe to our newsletter and get early access to limited collections and exclusive discounts.',
    yourEmail: 'Your email',
    subscribe: 'Subscribe',
    
    // Reviews
    customerReviews: 'Customer Reviews',
    reviewsDesc: 'Over 50,000 satisfied collectors',
    verifiedBuyer: 'Verified Buyer',
    
    // Brands
    officialPartner: 'Official partner of leading brands',
    
    // How it works
    simpleAs123: 'Simple as 1-2-3',
    howItWorks: 'How it works',
    choose: 'Choose',
    chooseDesc: 'Find the perfect figure or toy in our catalog of 5000+ products',
    order: 'Order',
    orderDesc: 'Place your order in 1 minute. Pay by card, SBP or on delivery',
    receive: 'Receive',
    receiveDesc: 'Fast delivery 1-3 days. Premium packaging as a gift',
    
    // Why choose us
    advantages: 'Advantages',
    whyChooseUs: 'Why choose us',
    originalProducts: 'Original products',
    daysDelivery: 'Days delivery',
    daysReturn: 'Days for return',
    support: 'Customer support',
    
    // FAQ
    faq: 'FAQ',
    faqTitle: 'Answers to questions',
    
    // Footer
    footerBrand: 'Premium Collection',
    footerDesc: 'The best anime toy marketplace. Original products from Japan, fast delivery across Russia.',
    catalogSection: 'Catalog',
    figures: 'Figures',
    plush: 'Plush Toys',
    accessories: 'Accessories',
    construction: 'Construction Sets',
    limited: 'Limited Editions',
    forBuyers: 'For Buyers',
    delivery: 'Delivery',
    payment: 'Payment',
    returns: 'Returns',
    contacts: 'Contacts',
    madeWith: 'Made with',
    forOtaku: 'for otaku',
    
    // Cart
    cart: 'Cart',
    items: 'items',
    emptyCart: 'Cart is empty',
    emptyCartDesc: 'Add something from the catalog!',
    total: 'Total',
    checkout: 'Checkout',
    clearCart: 'Clear cart',
    freeDelivery: 'Free delivery!',
    
    // Product
    quickView: 'Quick View',
    hit: 'HIT',
    discount: 'Discount',
    noStock: 'Out of stock',
    addToCart: 'Add to Cart',
    description: 'Description',
    quantity: 'Quantity',
    warranty: 'Warranty',
    
    // Toast
    addedToCart: 'Added to cart!',
    addedToWishlist: 'Added to wishlist ❤️',
    removedFromWishlist: 'Removed from wishlist',
    
    // Theme
    darkTheme: 'Dark theme',
    lightTheme: 'Light theme',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved) return saved;
      return 'ru';
    }
    return 'ru';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const langTranslations = translations[language] as Record<string, string>;
    return langTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
