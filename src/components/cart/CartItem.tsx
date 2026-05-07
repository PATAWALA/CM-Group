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
    <div className="flex gap-4 items-center bg-navy-900 rounded-lg p-3">
      <img src={item.image_url} alt={item.title} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <h4 className="font-medium text-sm">{item.title}</h4>
        <p className="text-gold-400 text-sm">{item.price.toLocaleString()} FCFA</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="p-1 rounded-full hover:bg-navy-700 disabled:opacity-30"
        >
          <Minus size={16} />
        </button>
        <span className="w-6 text-center">{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.quantity + 1)} className="p-1 rounded-full hover:bg-navy-700">
          <Plus size={16} />
        </button>
      </div>
      <button onClick={onRemove} className="text-red-400 hover:text-red-300">
        <Trash2 size={16} />
      </button>
    </div>
  );
}