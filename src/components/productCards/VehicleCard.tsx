import { Car, Gauge, Calendar } from 'lucide-react';
import AddToCartButton from '../ui/AddToCartButton';
import type { Product } from '../../lib/types';

export default function VehicleCard({ product }: { product: Product }) {
  const { details } = product;
  return (
    <div className="bg-navy-800 border border-navy-700 rounded-2xl overflow-hidden hover:border-gold-400/30 transition duration-300">
      <img src={product.image_url} alt={product.title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-pro-400 text-sm">
          {details.brand} {details.model} · {details.year}
        </p>
        <div className="flex justify-between text-sm text-pro-400 mt-3 mb-4">
          <div className="flex items-center gap-1"><Gauge size={16} /> {details.mileage?.toLocaleString()} km</div>
          <div className="flex items-center gap-1"><Calendar size={16} /> {details.year}</div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gold-400 font-bold">{product.price.toLocaleString()} FCFA</span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}