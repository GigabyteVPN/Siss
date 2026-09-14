import { motion } from 'framer-motion';
import { Heart, Sparkles, Users, Award, Crown, Gem, Star, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen relative">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-20 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[140px]" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-16 h-16 border border-purple-500/20 rounded-full animate-rotate-slow hidden lg:block" />
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-pink-500/20 rounded-2xl rotate-45 animate-float hidden lg:block" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-bold text-white/70 tracking-wide">О НАШЕМ МАГАЗИНЕ</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.95]">
              <span className="text-white">Мы создаём мост</span>
              <br />
              <span className="text-white">между </span>
              <span className="gradient-text">Японией</span>
              <br />
              <span className="text-white">и твоим </span>
              <span className="gradient-text">сердцем</span>
            </h1>
            <p className="mt-8 text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
              AniMarket — это больше, чем магазин. Это сообщество единомышленников, объединённых любовью к японской культуре и искусству аниме.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Gem className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-black text-purple-400 uppercase tracking-[0.2em]">Наши ценности</span>
              </div>
              <h2 className="text-4xl font-black text-white">
                Что делает нас <span className="gradient-text">особенными</span>
              </h2>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Страсть', desc: 'Мы сами фанаты аниме и знаем, что ценят настоящие коллекционеры', color: 'from-pink-500 to-rose-500' },
              { icon: Award, title: 'Качество', desc: 'Работаем только с проверенными производителями и лицензиями', color: 'from-purple-500 to-indigo-500' },
              { icon: Users, title: 'Сообщество', desc: '50 000+ довольных клиентов и растущее комьюнити отаку', color: 'from-blue-500 to-cyan-500' },
              { icon: Sparkles, title: 'Уникальность', desc: 'Эксклюзивные товары, которых нет в других магазинах России', color: 'from-orange-500 to-amber-500' },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card rounded-2xl p-8 group hover:border-purple-500/20 transition-all duration-500"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-white text-xl mb-3">{value.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-black text-yellow-400 uppercase tracking-[0.2em]">Наша история</span>
              </div>
              <h2 className="text-4xl font-black text-white mb-6">
                От маленькой мечты до <span className="gradient-text">крупнейшего</span> маркетплейса
              </h2>
              <div className="space-y-4 text-white/50 leading-relaxed">
                <p>
                  Всё началось в 2021 году, когда основатель Юки Танака, переехав из Токио в Москву, поняла — в России нет места, где можно найти настоящие японские аниме-товары.
                </p>
                <p>
                  Сегодня AniMarket — это команда из 30 человек, прямые контракты с 50+ японскими производителями и более 50 000 довольных клиентов по всей России и СНГ.
                </p>
                <p>
                  Мы не просто продаём игрушки — мы доставляем частичку Японии в каждый дом.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
                <div className="absolute inset-0 glass-card rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=750&fit=crop"
                    alt="Our story"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118] via-transparent to-transparent" />
                </div>
                
                {/* Floating stat */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 glass-strong rounded-2xl px-5 py-4 shadow-2xl"
                >
                  <p className="text-2xl font-black gradient-text">3+</p>
                  <p className="text-xs text-white/50">Года на рынке</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-white mb-3">
                Наша <span className="gradient-text">команда</span>
              </h2>
              <p className="text-white/40">Люди, которые делают AniMarket лучшим</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Юки Танака', role: 'Основатель и CEO', emoji: '👩‍💼', desc: 'Переехала из Токио, чтобы доставить магию аниме в Россию' },
              { name: 'Алексей Петров', role: 'Менеджер по закупкам', emoji: '🧑‍💻', desc: '10 лет опыта в импорте товаров из Японии' },
              { name: 'Сакура Мизуки', role: 'Дизайнер и куратор', emoji: '👩‍🎨', desc: 'Создаёт уникальные эксклюзивные коллекции' },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl p-8 text-center group hover:border-purple-500/20 transition-all duration-300"
              >
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative w-24 h-24 glass rounded-full flex items-center justify-center text-4xl">
                    {member.emoji}
                  </div>
                </div>
                <h3 className="font-black text-white text-xl mb-1">{member.name}</h3>
                <p className="text-purple-400 text-sm font-bold mb-3">{member.role}</p>
                <p className="text-white/40 text-sm">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative glass-card rounded-3xl p-10 lg:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
            
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
              {[
                { value: '5000+', label: 'Товаров в каталоге', icon: Gem },
                { value: '50K+', label: 'Довольных клиентов', icon: Users },
                { value: '4.9', label: 'Средний рейтинг', icon: Star },
                { value: '3 года', label: 'На рынке', icon: Crown },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-3" />
                  <p className="text-3xl sm:text-4xl font-black gradient-text">{stat.value}</p>
                  <p className="text-white/40 text-sm mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
