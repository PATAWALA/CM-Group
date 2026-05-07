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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-navy-800 border-l border-navy-700 z-50 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Mon panier</h2>
              <button onClick={onClose} className="text-pro-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {cart.items.length === 0 ? (
              <p className="text-pro-400 flex-1 flex items-center justify-center">Votre panier est vide.</p>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4">
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

            <CartSummary />
            <Link
              to="/cart"
              onClick={onClose}
              className="block text-center bg-gold-400 text-navy-900 py-3 rounded-full font-semibold mt-4 hover:bg-gold-500 transition"
            >
              Voir le panier
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}