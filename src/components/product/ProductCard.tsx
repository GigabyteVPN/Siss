import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-purple-100/50 hover:border-purple-200 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded-lg shadow-sm">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-bold rounded-lg shadow-sm">
              ХИТ
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* Like button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </button>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-sm font-semibold text-gray-700 hover:bg-white transition-colors flex items-center gap-2 shadow-lg">
            <Eye className="w-4 h-4" />
            Быстрый просмотр
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2.5">
        {/* Category */}
        <p className="text-xs font-medium text-purple-500 uppercase tracking-wider">{product.anime}</p>

        {/* Name */}
        <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-purple-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price & Action */}
        <div className="flex items-end justify-between pt-1">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-gray-900">{product.price.toLocaleString()} ₽</span>
            </div>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {product.originalPrice.toLocaleString()} ₽
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`p-2.5 rounded-xl transition-all ${
              isAdded
                ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                : product.inStock
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-200 hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Stock status */}
        {!product.inStock && (
          <p className="text-xs text-red-500 font-medium">Нет в наличии</p>
        )}
      </div>
    </motion.div>
  );
}
