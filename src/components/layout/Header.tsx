import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Sparkles, Crown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const { toggleCart, totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Главная', page: 'home' },
    { name: 'Каталог', page: 'catalog' },
    { name: 'Новинки', page: 'new' },
    { name: 'О нас', page: 'about' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-strong shadow-2xl shadow-purple-950/50'
          : 'bg-transparent'
      }`}
    >
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2">
          <Crown className="w-3.5 h-3.5 text-yellow-400" />
          <p className="text-xs text-white/70 font-medium tracking-wide">
            БЕСПЛАТНАЯ ДОСТАВКА ПРИ ЗАКАЗЕ ОТ 5000 ₽ • ЭКСКЛЮЗИВНЫЕ КОЛЛЕКЦИИ • ГАРАНТИЯ ОРИГИНАЛЬНОСТИ
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigate('home')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <span className="text-xl font-black gradient-text tracking-tight">
                AniMarket
              </span>
              <p className="text-[10px] text-white/40 -mt-1 tracking-widest uppercase">Premium Collection</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  currentPage === link.page
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {currentPage === link.page && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 rounded-xl border border-white/10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
            <div className="relative w-full group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-white/40 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Найти аниме игрушку..."
                  className="w-full pl-11 pr-4 py-2.5 glass rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleCart}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-xl">
                <ShoppingCart className="w-5 h-5" />
              </div>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-lg"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 glass rounded-xl text-white/70 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-2">
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="w-full pl-11 pr-4 py-3 glass rounded-xl text-sm text-white placeholder-white/30 focus:outline-none"
                />
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => { onNavigate(link.page); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                    currentPage === link.page
                      ? 'bg-white/10 text-white border border-white/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
