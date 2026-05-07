import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../lib/types';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => addToCart(product)}
      className="flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-navy-900 px-4 py-2 rounded-full text-sm font-medium transition-colors"
    >
      <ShoppingCart size={16} />
      Ajouter
    </button>
  );
}