import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { Link } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay opaque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          {/* Panier */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-light-300 z-50 p-6 flex flex-col"
          >
            {/* En-tête */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-dark-800">Mon panier</h2>
              <button onClick={onClose} className="text-muted-400 hover:text-dark-800 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Liste des articles avec fond gris clair pour mieux voir */}
            {cart.items.length === 0 ? (
              <p className="text-dark-800 flex-1 flex items-center justify-center">Votre panier est vide.</p>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {cart.items.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={() => removeFromCart(item.id)}
                    onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                  />
                ))}
              </div>
            )}

            {/* Résumé */}
            <CartSummary />
            <Link
              to="/cart"
              onClick={onClose}
              className="block text-center bg-gold-400 text-white py-3 rounded-full font-semibold mt-4 hover:bg-gold-500 transition shadow-lg shadow-gold-400/25"
            >
              Voir le panier
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}