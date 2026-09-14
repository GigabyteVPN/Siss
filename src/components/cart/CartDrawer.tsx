import { X, Minus, Plus, ShoppingBag, Trash2, Crown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { state, removeItem, updateQuantity, closeCart, totalPrice, totalItems, clearCart } = useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col glass-strong border-l border-white/10"
            style={{ background: 'rgba(10, 1, 24, 0.95)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-md opacity-50" />
                  <div className="relative w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Корзина</h2>
                  <p className="text-xs text-white/40">{totalItems} товаров</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 glass rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/50" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl" />
                    <div className="relative w-20 h-20 glass rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-white/20" />
                    </div>
                  </div>
                  <p className="text-white/60 font-bold">Корзина пуста</p>
                  <p className="text-white/30 text-sm mt-1">Добавьте что-нибудь из каталога!</p>
                </div>
              ) : (
                <AnimatePresence>
                  {state.items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="glass-card rounded-2xl p-4 group hover:border-purple-500/20 transition-all"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-white truncate">{item.product.name}</h3>
                          <p className="text-xs text-white/30 mt-0.5">{item.product.anime}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                              >
                                <Minus className="w-3 h-3 text-white/50" />
                              </button>
                              <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                              >
                                <Plus className="w-3 h-3 text-white/50" />
                              </button>
                            </div>
                            <span className="text-sm font-black gradient-text">
                              {(item.product.price * item.quantity).toLocaleString()} ₽
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="self-start p-1.5 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-white/5 p-6 space-y-4">
                {/* Free shipping indicator */}
                {totalPrice >= 5000 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <span className="text-sm">🚀</span>
                    <span className="text-xs font-bold text-green-400">Бесплатная доставка!</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-white/50 font-medium">Итого:</span>
                  <span className="text-2xl font-black gradient-text">{totalPrice.toLocaleString()} ₽</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="btn-premium w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-xl shadow-purple-500/20 flex items-center justify-center gap-2"
                >
                  <Crown className="w-4 h-4 text-yellow-300" />
                  Оформить заказ
                </motion.button>
                
                <button
                  onClick={clearCart}
                  className="w-full py-2.5 text-xs text-white/30 hover:text-red-400 font-bold transition-colors uppercase tracking-wider"
                >
                  Очистить корзину
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
