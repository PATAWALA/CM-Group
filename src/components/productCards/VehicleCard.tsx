import {  Gauge, Calendar, ShieldCheck } from 'lucide-react';
import AddToCartButton from '../ui/AddToCartButton';
import type{ Product } from '../../lib/types';

export default function VehicleCard({ product }: { product: Product }) {
  const { details } = product;
  return (
    <div className="bg-white border border-light-300 rounded-2xl overflow-hidden hover:border-gold-400/40 transition duration-300 hover:shadow-lg">
      <img src={product.image_url} alt={product.title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-dark-800">{product.title}</h3>
        <p className="text-muted-400 text-sm">
          {details.brand} {details.model} · {details.year}
        </p>
        <div className="flex justify-between text-sm text-muted-400 mt-3 mb-4">
          <div className="flex items-center gap-1"><Gauge size={16} /> {details.mileage?.toLocaleString()} km</div>
          <div className="flex items-center gap-1"><Calendar size={16} /> {details.year}</div>
        </div>
        {/* Badge jamais accidenté */}
        {details.never_crashed && (
          <div className="flex items-center gap-1 text-green-600 text-xs font-medium mb-3 bg-green-50 border border-green-200 rounded-full px-3 py-1 w-fit">
            <ShieldCheck size={14} />
            Jamais accidenté
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-gold-500 font-bold">{product.price.toLocaleString()} FCFA</span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}