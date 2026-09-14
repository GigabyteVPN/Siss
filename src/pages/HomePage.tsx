import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, RotateCcw, Star, Sparkles, Zap, Gift, Crown, Gem } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const featuredProducts = products.filter(p => p.isBestseller).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-float-slow" />
          <div className="absolute bottom-20 right-[10%] w-[600px] h-[600px] bg-pink-600/15 rounded-full blur-[140px] animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[160px]" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-32 right-20 w-20 h-20 border border-purple-500/20 rounded-full animate-rotate-slow hidden lg:block" />
        <div className="absolute bottom-32 left-20 w-32 h-32 border border-pink-500/20 rounded-2xl rotate-45 animate-float hidden lg:block" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse-glow" />
        <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-white/70 font-medium tracking-wide">
                  НОВАЯ КОЛЛЕКЦИЯ 2024 УЖЕ В ПРОДАЖЕ
                </span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight">
                <span className="text-white">Мир</span>
                <br />
                <span className="gradient-text">аниме</span>
                <br />
                <span className="text-white">у тебя</span>
                <br />
                <span className="relative inline-block">
                  <span className="gradient-text">дома</span>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                </span>
              </h1>

              <p className="mt-8 text-lg text-white/50 max-w-md leading-relaxed">
                Эксклюзивные коллекционные фигурки, лимитированные серии и редкие аксессуары из лучших аниме со всего мира.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('catalog')}
                  className="btn-premium group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl shadow-purple-500/30 flex items-center justify-center gap-3"
                >
                  <span>Открыть каталог</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('new')}
                  className="btn-premium px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <Gem className="w-4 h-4 text-purple-400" />
                  <span>Премиум коллекция</span>
                </motion.button>
              </div>

              {/* Stats */}
              <div className="mt-14 flex items-center gap-10">
                {[
                  { value: '5K+', label: 'Товаров' },
                  { value: '50K+', label: 'Клиентов' },
                  { value: '4.9', label: 'Рейтинг' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <p className="text-2xl font-black gradient-text">{stat.value}</p>
                    <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full aspect-square">
                {/* Background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-[3rem] blur-2xl animate-pulse-glow" />
                <div className="absolute inset-4 glass rounded-[2.5rem] animate-rotate-slow" style={{ animationDuration: '30s' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-[2.5rem]" />
                </div>
                
                {/* Main image */}
                <div className="absolute inset-8 rounded-[2rem] overflow-hidden glass border border-white/10 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&h=600&fit=crop"
                    alt="Premium anime collection"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-2 -right-2 glass-strong rounded-2xl px-4 py-3 shadow-2xl"
                >
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-xs font-black text-white">Premium</p>
                      <p className="text-[10px] text-white/50">Quality</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  className="absolute -bottom-2 -left-2 glass-strong rounded-2xl px-4 py-3 shadow-2xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-white">50K+</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-6 border-y border-white/5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex items-center gap-8 px-4">
              {['NARUTO', 'ONE PIECE', 'DEMON SLAYER', 'ATTACK ON TITAN', 'SPY x FAMILY', 'JUJUTSU KAISEN', 'MY HERO ACADEMIA', 'EVANGELION', 'GHIBLI', 'POKÉMON'].map((anime, i) => (
                <span key={i} className="flex items-center gap-8">
                  <span className="text-2xl font-black text-white/10 tracking-wider">{anime}</span>
                  <Sparkles className="w-4 h-4 text-purple-500/30" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Truck, title: 'Бесплатная доставка', desc: 'При заказе от 5000 ₽', color: 'from-blue-500 to-cyan-500' },
              { icon: Shield, title: '100% Оригинал', desc: 'Гарантия подлинности', color: 'from-green-500 to-emerald-500' },
              { icon: RotateCcw, title: 'Возврат 30 дней', desc: 'Без вопросов', color: 'from-orange-500 to-amber-500' },
              { icon: Gift, title: 'Premium упаковка', desc: 'Бесплатно к заказу', color: 'from-pink-500 to-rose-500' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card rounded-2xl p-6 group cursor-default hover:border-purple-500/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-white/40">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-3"
              >
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-black text-orange-400 uppercase tracking-[0.2em]">Хиты продаж</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-black text-white"
              >
                Популярные <span className="gradient-text">товары</span>
              </motion.h2>
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onClick={() => onNavigate('catalog')}
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white glass px-5 py-2.5 rounded-xl transition-colors"
            >
              Все товары
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Banner */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative glass-card rounded-3xl overflow-hidden p-10 lg:p-16"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
            
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-6">
                  <Crown className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-400 tracking-wide">LIMITED EDITION</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                  Эксклюзивная коллекция
                  <span className="block gradient-text-gold">Premium Edition</span>
                </h2>
                <p className="text-white/50 leading-relaxed mb-8">
                  Лимитированные фигурки ручной работы от лучших японских мастеров. Каждая piece — произведение искусства, созданное в единственном экземпляре.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('catalog')}
                  className="btn-premium px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-2xl shadow-xl shadow-yellow-500/20 flex items-center gap-2"
                >
                  <Gem className="w-4 h-4" />
                  Смотреть коллекцию
                </motion.button>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl blur-xl" />
                  <div className="absolute inset-4 glass rounded-2xl overflow-hidden border border-yellow-500/20">
                    <img
                      src="https://images.unsplash.com/photo-1601850494422-3cf178d3d0b6?w=500&h=500&fit=crop"
                      alt="Premium collection"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-3"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-black text-purple-400 uppercase tracking-[0.2em]">Только что появились</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-black text-white"
              >
                Свежие <span className="gradient-text">новинки</span>
              </motion.h2>
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onClick={() => onNavigate('new')}
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white glass px-5 py-2.5 rounded-xl transition-colors"
            >
              Все новинки
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative glass-card rounded-3xl p-10 lg:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-purple-500/20 rounded-full blur-[100px]" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white/70 tracking-wide">EXCLUSIVE ACCESS</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                Будь первым, кто узнает
              </h2>
              <p className="text-white/50 max-w-lg mx-auto mb-8">
                Подпишись на рассылку и получай ранний доступ к лимитированным коллекциям и эксклюзивным скидкам.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Твой email"
                  className="flex-1 px-5 py-3.5 glass rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-premium px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-xl shadow-purple-500/20"
                >
                  Подписаться
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-white mb-3">
                Отзывы <span className="gradient-text">клиентов</span>
              </h2>
              <p className="text-white/40">Более 50 000 довольных коллекционеров</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Алексей К.', text: 'Заказывал фигурку Луффи Гир 5 — качество невероятное! Каждая деталь проработана. Доставка за 2 дня в идеальной упаковке.', rating: 5, avatar: '🧑' },
              { name: 'Мария С.', text: 'Плюшевый Тоторо из Ghibli — просто чудо! Дочка не расстаётся с ним. Качество материалов на высшем уровне, мягкий и приятный.', rating: 5, avatar: '👩' },
              { name: 'Дмитрий В.', text: 'Лучший магазин аниме товаров в России. Огромный выбор, адекватные цены и сервис мирового уровня. Рекомендую всем отаку!', rating: 5, avatar: '🧔' },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl p-6 group hover:border-purple-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 glass rounded-full flex items-center justify-center text-lg">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{review.name}</p>
                    <p className="text-[10px] text-white/30">Проверенный покупатель</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
