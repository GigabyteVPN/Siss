import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, LayoutGrid, X, Sparkles } from 'lucide-react';
import { products, categories } from '../data/products';
import { Product } from '../types';
import ProductGrid from '../components/product/ProductGrid';
import ProductModal from '../components/product/ProductModal';

interface CatalogPageProps {
  filterNew?: boolean;
}

export default function CatalogPage({ filterNew }: CatalogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (filterNew) {
      filtered = filtered.filter(p => p.isNew);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    return filtered;
  }, [selectedCategory, sortBy, priceRange, filterNew]);

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <div className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-black text-purple-400 uppercase tracking-[0.2em]">
                {filterNew ? 'Новые поступления' : 'Полная коллекция'}
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white">
              {filterNew ? (
                <>Свежие <span className="gradient-text">новинки</span></>
              ) : (
                <>Каталог <span className="gradient-text">товаров</span></>
              )}
            </h1>
            <p className="text-white/40 mt-4 max-w-lg text-lg">
              {filterNew
                ? 'Самые свежие поступления из Японии и не только'
                : 'Найди идеальную аниме игрушку для своей коллекции'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                showFilters
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                  : 'glass text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Фильтры
            </motion.button>
            <span className="text-sm text-white/30 font-medium">
              {filteredProducts.length} товаров
            </span>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-3 glass rounded-xl text-sm font-medium text-white/70 focus:outline-none focus:border-purple-500/50 appearance-none cursor-pointer"
            >
              <option value="popular" className="bg-gray-900">По популярности</option>
              <option value="price-asc" className="bg-gray-900">Сначала дешёвые</option>
              <option value="price-desc" className="bg-gray-900">Сначала дорогие</option>
              <option value="rating" className="bg-gray-900">По рейтингу</option>
              <option value="newest" className="bg-gray-900">Сначала новые</option>
            </select>

            <div className="hidden sm:flex items-center gap-1 glass rounded-xl p-1">
              <button className="p-2 rounded-lg bg-white/10 text-white">
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg text-white/40 hover:text-white transition-colors">
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                  : 'glass text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white">Параметры поиска</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/50" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
                  Цена от: <span className="text-purple-400">{priceRange[0].toLocaleString()} ₽</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={15000}
                  step={500}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
                  Цена до: <span className="text-pink-400">{priceRange[1].toLocaleString()} ₽</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={15000}
                  step={500}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 15000]);
                    setSortBy('popular');
                  }}
                  className="px-5 py-3 glass text-white/70 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors"
                >
                  Сбросить всё
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products */}
        <ProductGrid products={filteredProducts} onQuickView={handleQuickView} />
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
