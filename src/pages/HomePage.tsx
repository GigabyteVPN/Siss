import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, RotateCcw, Star, Sparkles, Zap, Gift } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const featuredProducts = products.filter(p => p.isBestseller).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm text-white/90 font-medium">Новая коллекция 2024</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                Мир аниме
                <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  у тебя дома
                </span>
              </h1>

              <p className="mt-6 text-lg text-white/70 max-w-lg mx-auto lg:mx-0">
                Коллекционные фигурки, плюшевые игрушки и аксессуары из ваших любимых аниме. Только оригинальная продукция с гарантией.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('catalog')}
                  className="px-8 py-4 bg-white text-purple-900 font-bold rounded-2xl shadow-2xl shadow-purple-900/50 hover:shadow-white/20 transition-all flex items-center justify-center gap-2"
                >
                  Перейти в каталог
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('new')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  Новинки
                </motion.button>
              </div>

              {/* Stats */}
              <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start">
                <div>
                  <p className="text-2xl font-black text-white">5000+</p>
                  <p className="text-sm text-white/50">Товаров</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div>
                  <p className="text-2xl font-black text-white">50K+</p>
                  <p className="text-sm text-white/50">Клиентов</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div>
                  <p className="text-2xl font-black text-white">4.9</p>
                  <p className="text-sm text-white/50">Рейтинг</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-3xl backdrop-blur-sm border border-white/10 rotate-3" />
                <div className="absolute inset-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl backdrop-blur-sm border border-white/10 -rotate-2" />
                <div className="absolute inset-8 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&h=600&fit=crop"
                    alt="Anime figures collection"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 px-4 py-2 bg-yellow-400 text-yellow-900 font-bold rounded-xl shadow-lg"
                >
                  ⭐ Хит продаж
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 px-4 py-2 bg-green-400 text-green-900 font-bold rounded-xl shadow-lg"
                >
                  🚀 Быстрая доставка
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Бесплатная доставка', desc: 'При заказе от 3000 ₽', color: 'from-blue-500 to-cyan-500' },
              { icon: Shield, title: 'Гарантия качества', desc: 'Только оригиналы', color: 'from-green-500 to-emerald-500' },
              { icon: RotateCcw, title: 'Возврат 14 дней', desc: 'Без лишних вопросов', color: 'from-orange-500 to-amber-500' },
              { icon: Gift, title: 'Подарочная упаковка', desc: 'Бесплатно к заказу', color: 'from-pink-500 to-rose-500' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-2"
              >
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-bold text-orange-500 uppercase tracking-wider">Хиты продаж</span>
              </motion.div>
              <h2 className="text-3xl font-black text-gray-900">Популярные товары</h2>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="hidden sm:flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
            >
              Смотреть все
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-2"
              >
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-bold text-purple-500 uppercase tracking-wider">Только что появились</span>
              </motion.div>
              <h2 className="text-3xl font-black text-gray-900">Новинки</h2>
            </div>
            <button
              onClick={() => onNavigate('new')}
              className="hidden sm:flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
            >
              Все новинки
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {newProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Подпишись на рассылку
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Получай уведомления о новинках, скидках и эксклюзивных предложениях первым!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Твой email"
                className="flex-1 px-5 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-3.5 bg-white text-purple-600 font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg">
                Подписаться
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900">Отзывы покупателей</h2>
            <p className="text-gray-500 mt-2">Что говорят наши клиенты</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Алексей К.', text: 'Заказывал фигурку Луффи — качество невероятное! Упаковка идеальная, доставили за 2 дня.', rating: 5 },
              { name: 'Мария С.', text: 'Плюшевый Тоторо просто чудесный! Дочка в восторге. Обязательно закажу ещё из Ghibli.', rating: 5 },
              { name: 'Дмитрий В.', text: 'Лучший магазин аниме товаров. Огромный выбор, адекватные цены и отличный сервис.', rating: 5 },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <p className="font-bold text-gray-900 text-sm">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
