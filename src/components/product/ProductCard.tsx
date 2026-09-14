import { Star, ShoppingCart, Heart, Eye, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface ProductCardProps {
  product: Product;
  index: number;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, index, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product);
    showToast('success', 'Добавлено в корзину!', product.name);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const added = toggleWishlist(product);
    showToast(
      added ? 'success' : 'info',
      added ? 'Добавлено в избранное ❤️' : 'Удалено из избранного',
      product.name
    );
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  const isLiked = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const rotateX = isHovered ? (mousePos.y - 0.5) * -8 : 0;
  const rotateY = isHovered ? (mousePos.x - 0.5) * 8 : 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.3s ease-out',
      }}
      className="group relative card-3d cursor-pointer"
    >
      {/* Glow effect on hover */}
      <div
        className="absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(168, 85, 247, 0.3), transparent 50%)`,
        }}
      />

      <div className="relative glass-card rounded-2xl overflow-hidden h-full">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/20 to-indigo-900/40" />
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Shimmer overlay */}
          <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNew && (
              <span className="px-2.5 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-black rounded-lg shadow-lg tracking-wider">
                NEW
              </span>
            )}
            {product.isBestseller && (
              <span className="px-2.5 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-black rounded-lg shadow-lg tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                ХИТ
              </span>
            )}
            {discount > 0 && (
              <span className="px-2.5 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-black rounded-lg shadow-lg tracking-wider">
                -{discount}%
              </span>
            )}
          </div>

          {/* Like button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 w-9 h-9 glass rounded-full flex items-center justify-center z-10 hover:bg-white/20 transition-colors"
          >
            <Heart
              className={`w-4 h-4 transition-all ${
                isLiked ? 'fill-pink-500 text-pink-500 scale-110' : 'text-white/70'
              }`}
            />
          </motion.button>

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-4">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleQuickView}
              className="px-4 py-2 glass-strong rounded-xl text-xs font-bold text-white hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <Eye className="w-3.5 h-3.5" />
              Быстрый просмотр
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Category */}
          <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">{product.anime}</p>

          {/* Name */}
          <h3 className="font-bold text-white text-sm leading-tight line-clamp-2 group-hover:text-purple-200 transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/10'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-white/40 font-medium">{product.rating}</span>
            <span className="text-[10px] text-white/30">({product.reviews})</span>
          </div>

          {/* Price & Action */}
          <div className="flex items-end justify-between pt-2 border-t border-white/5">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-white">{product.price.toLocaleString()}</span>
                <span className="text-xs text-white/50">₽</span>
              </div>
              {product.originalPrice && (
                <span className="text-xs text-white/30 line-through">
                  {product.originalPrice.toLocaleString()} ₽
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`relative group/btn ${
                !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className={`absolute inset-0 rounded-xl blur-md transition-opacity ${
                'bg-gradient-to-r from-purple-500 to-pink-500 opacity-40 group-hover/btn:opacity-70'
              }`} />
              <div className={`relative p-3 rounded-xl transition-all ${
                product.inStock
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                  : 'bg-white/10'
              }`}>
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
            </motion.button>
          </div>

          {!product.inStock && (
            <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Нет в наличии</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
