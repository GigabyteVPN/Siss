import { Product } from '../../types';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export default function ProductGrid({ products, onQuickView }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl" />
          <div className="relative w-24 h-24 glass rounded-full flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
        </div>
        <h3 className="text-xl font-black text-white mb-2">Ничего не найдено</h3>
        <p className="text-white/40">Попробуйте изменить параметры поиска или фильтры</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} onQuickView={onQuickView} />
      ))}
    </div>
  );
}
