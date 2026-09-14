import { motion } from 'framer-motion';
import { Heart, Sparkles, Users, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm text-white/90 font-medium">О нашем магазине</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Мы создаём мост между
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Японией и твоим сердцем
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              AniMarket — это больше, чем магазин. Это сообщество единомышленников, объединённых любовью к японской культуре и аниме.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-900">Наши ценности</h2>
            <p className="text-gray-500 mt-2">Что делает нас особенными</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Страсть', desc: 'Мы сами фанаты аниме и знаем, что ценят коллекционеры', color: 'from-pink-500 to-rose-500' },
              { icon: Award, title: 'Качество', desc: 'Работаем только с проверенными производителями и лицензиями', color: 'from-purple-500 to-indigo-500' },
              { icon: Users, title: 'Сообщество', desc: '50 000+ довольных клиентов и растущее комьюнити', color: 'from-blue-500 to-cyan-500' },
              { icon: Sparkles, title: 'Уникальность', desc: 'Эксклюзивные товары, которых нет в других магазинах', color: 'from-orange-500 to-amber-500' },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 border border-transparent hover:border-purple-100"
              >
                <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center shadow-lg mb-4`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-900">Наша команда</h2>
            <p className="text-gray-500 mt-2">Люди, которые делают AniMarket лучшим</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Юки Танака', role: 'Основатель и CEO', emoji: '👩‍💼' },
              { name: 'Алексей Петров', role: 'Менеджер по закупкам', emoji: '🧑‍💻' },
              { name: 'Сакура Мизуки', role: 'Дизайнер и куратор', emoji: '👩‍🎨' },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-4xl mb-4">
                  {member.emoji}
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                <p className="text-purple-500 text-sm font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '5000+', label: 'Товаров в каталоге' },
              { value: '50K+', label: 'Довольных клиентов' },
              { value: '4.9', label: 'Средний рейтинг' },
              { value: '3 года', label: 'На рынке' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-3xl sm:text-4xl font-black text-white">{stat.value}</p>
                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
