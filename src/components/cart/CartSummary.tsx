import { useCart } from '../../context/CartContext';

export default function CartSummary() {
  const { cart } = useCart();
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  if (!count) return null;

  return (
    <div className="border-t border-navy-700 pt-4 mt-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-pro-400">{count} article{count > 1 ? 's' : ''}</span>
        <span className="text-pro-400">Total</span>
      </div>
      <p className="text-xl font-bold text-gold-400">{total.toLocaleString()} FCFA</p>
    </div>
  );
}