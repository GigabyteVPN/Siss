import { Sparkles, Github, Twitter, Instagram, Heart, Crown } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-md opacity-50" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <span className="text-xl font-black gradient-text">AniMarket</span>
                <p className="text-[10px] text-white/30 tracking-widest uppercase">Premium Collection</p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Лучший маркетплейс аниме игрушек. Оригинальная продукция из Японии, быстрая доставка по всей России.
            </p>
            <div className="flex gap-2">
              {[Github, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center hover:bg-white/10 hover:border-purple-500/30 transition-all group"
                >
                  <Icon className="w-4 h-4 text-white/40 group-hover:text-purple-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-purple-400 mb-5">Каталог</h3>
            <ul className="space-y-3">
              {['Фигурки', 'Плюшевые игрушки', 'Аксессуары', 'Конструкторы', 'Лимитированные'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-purple-400 mb-5">Покупателям</h3>
            <ul className="space-y-3">
              {['Доставка', 'Оплата', 'Возврат', 'FAQ', 'Контакты'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-purple-400 mb-5">Контакты</h3>
            <ul className="space-y-3 text-white/40 text-sm">
              <li className="flex items-center gap-2">📍 Москва, ул. Анимешная 42</li>
              <li className="flex items-center gap-2">📞 +7 (999) 123-45-67</li>
              <li className="flex items-center gap-2">✉️ hello@animarket.ru</li>
              <li className="flex items-center gap-2">🕐 Пн-Пт: 10:00 — 20:00</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © 2024 AniMarket. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-white/30 text-xs flex items-center gap-1">
              Сделано с <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> для отаку
            </p>
            <div className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full">
              <Crown className="w-3 h-3 text-yellow-400" />
              <span className="text-[10px] font-bold text-yellow-400 tracking-wider">PREMIUM</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
