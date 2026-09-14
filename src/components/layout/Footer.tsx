import { Sparkles, Github, Twitter, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black">AniMarket</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Лучший маркетплейс аниме игрушек в России. Оригинальная продукция, быстрая доставка, гарантия качества.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-purple-400 mb-4">Каталог</h3>
            <ul className="space-y-2.5">
              {['Фигурки', 'Плюшевые игрушки', 'Аксессуары', 'Конструкторы', 'Лимитированные'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-purple-400 mb-4">Покупателям</h3>
            <ul className="space-y-2.5">
              {['Доставка', 'Оплата', 'Возврат', 'FAQ', 'Контакты'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-purple-400 mb-4">Контакты</h3>
            <ul className="space-y-2.5 text-gray-400 text-sm">
              <li>📍 Москва, ул. Анимешная 42</li>
              <li>📞 +7 (999) 123-45-67</li>
              <li>✉️ hello@animarket.ru</li>
              <li>🕐 Пн-Пт: 10:00 — 20:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 AniMarket. Все права защищены.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Сделано с <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> для отаку
          </p>
        </div>
      </div>
    </footer>
  );
}
