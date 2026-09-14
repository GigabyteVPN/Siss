import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Minus, Plus, Sparkles, Crown, Zap } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { useState } from 'react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const isLiked = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    showToast('success', 'Добавлено в корзину!', `${quantity} × ${product.name}`);
    onClose();
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product);
    showToast(
      added ? 'success' : 'info',
      added ? 'Добавлено в избранное ❤️' : 'Удалено из избранного',
      product.name
    );
  };

  // Fake gallery images
  const images = [product.image, product.image, product.image];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-4 md:inset-10 lg:inset-16 z-[70] flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-full max-w-6xl max-h-full overflow-y-auto glass-strong rounded-3xl border border-white/10 shadow-2xl pointer-events-auto">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>

              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image section */}
                <div className="relative p-6 lg:p-10 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                    {product.isNew && (
                      <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-black rounded-lg shadow-lg tracking-wider">
                        NEW
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-black rounded-lg shadow-lg tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        ХИТ
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black rounded-lg shadow-lg tracking-wider">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  {/* Main image */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden glass border border-white/10">
                    <motion.img
                      key={selectedImage}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      src={images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-3 mt-4">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === i
                            ? 'border-purple-500 shadow-lg shadow-purple-500/30'
                            : 'border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info section */}
                <div className="p-6 lg:p-10 space-y-6">
                  {/* Category */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">
                      {product.anime}
                    </span>
                    {product.isBestseller && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                        <Crown className="w-2.5 h-2.5 text-yellow-400" />
                        <span className="text-[9px] font-black text-yellow-400 tracking-wider">BESTSELLER</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight">
                    {product.name}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/10'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-white">{product.rating}</span>
                    <span className="text-sm text-white/40">• {product.reviews} отзывов</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 pt-2 border-t border-white/5">
                    <span className="text-4xl font-black gradient-text">
                      {product.price.toLocaleString()} ₽
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-white/30 line-through">
                        {product.originalPrice.toLocaleString()} ₽
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="px-2.5 py-1 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-black text-red-400">
                        Экономия {(product.originalPrice! - product.price).toLocaleString()} ₽
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-xs font-black text-white/50 uppercase tracking-[0.2em] mb-2">
                      Описание
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 glass rounded-lg text-xs font-medium text-white/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Quantity */}
                  <div>
                    <h3 className="text-xs font-black text-white/50 uppercase tracking-[0.2em] mb-3">
                      Количество
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center glass rounded-xl overflow-hidden">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-white/70" />
                        </button>
                        <span className="w-12 text-center font-bold text-white">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-white/70" />
                        </button>
                      </div>
                      <span className="text-sm text-white/40">
                        Итого: <span className="font-bold text-white">{(product.price * quantity).toLocaleString()} ₽</span>
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="btn-premium flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-xl shadow-purple-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {product.inStock ? 'В корзину' : 'Нет в наличии'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleToggleWishlist}
                      className={`w-14 h-14 glass rounded-xl flex items-center justify-center transition-all ${
                        isLiked ? 'bg-pink-500/20 border-pink-500/30' : 'hover:bg-white/10'
                      }`}
                    >
                      <Heart className={`w-5 h-5 transition-all ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-white/70'}`} />
                    </motion.button>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                    {[
                      { icon: Truck, label: 'Доставка', desc: '1-3 дня' },
                      { icon: Shield, label: 'Гарантия', desc: 'Оригинал' },
                      { icon: RotateCcw, label: 'Возврат', desc: '30 дней' },
                    ].map((feat, i) => (
                      <div key={i} className="text-center">
                        <feat.icon className="w-4 h-4 text-purple-400 mx-auto mb-1.5" />
                        <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">{feat.label}</p>
                        <p className="text-[10px] text-white/40">{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
