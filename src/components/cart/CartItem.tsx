import { Minus, Plus, Trash2 } from 'lucide-react';
import type{ CartItem } from '../../lib/types';

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
    <div className="flex gap-4 items-center bg-light-100 rounded-lg p-3 border border-light-300">
      <img src={item.image_url} alt={item.title} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <h4 className="font-medium text-sm text-dark-800">{item.title}</h4>
        <p className="text-gold-500 text-sm">{item.price.toLocaleString()} FCFA</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="p-1 rounded-full hover:bg-light-200 disabled:opacity-30 text-dark-800"
        >
          <Minus size={16} />
        </button>
        <span className="w-6 text-center text-dark-800">{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.quantity + 1)} className="p-1 rounded-full hover:bg-light-200 text-dark-800">
          <Plus size={16} />
        </button>
      </div>
      <button onClick={onRemove} className="text-red-500 hover:text-red-600">
        <Trash2 size={16} />
      </button>
    </div>
  );
}