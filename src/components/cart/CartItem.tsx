import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../lib/types';

export default function CartItemComponent({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
}) {
  return (
    <div className="flex gap-4 items-center bg-white border border-light-200 rounded-xl p-3 shadow-sm">
      <img src={item.image_url} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-dark-800 truncate">{item.title}</h4>
        <p className="text-gold-500 text-sm font-medium">{item.price.toLocaleString()} FCFA</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="p-1.5 rounded-lg hover:bg-light-100 disabled:opacity-30 text-dark-800 transition"
        >
          <Minus size={16} />
        </button>
        <span className="w-5 text-center font-medium text-dark-800">{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.quantity + 1)} className="p-1.5 rounded-lg hover:bg-light-100 text-dark-800 transition">
          <Plus size={16} />
        </button>
      </div>
      <button onClick={onRemove} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition">
        <Trash2 size={16} />
      </button>
    </div>
  );
}