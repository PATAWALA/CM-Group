import { MapPin, Bed, Ruler } from 'lucide-react';
import AddToCartButton from '../ui/AddToCartButton';
import type { Product } from '../../lib/types';

export default function RealEstateCard({ product }: { product: Product }) {
  const { details } = product;
  return (
    <div className="bg-white border border-light-300 rounded-2xl overflow-hidden hover:border-gold-400/40 transition-all duration-300 hover:shadow-lg">
      <img src={product.image_url} alt={product.title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-dark-800">{product.title}</h3>
        {details.location && (
          <div className="flex items-center gap-2 text-muted-400 text-sm mb-3">
            <MapPin size={16} className="text-gold-500" />
            <span>{details.location}</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-muted-400 mb-4">
          {details.surface && (
            <div className="flex items-center gap-1"><Ruler size={16} /> {details.surface} m²</div>
          )}
          {details.rooms && (
            <div className="flex items-center gap-1"><Bed size={16} /> {details.rooms} ch.</div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gold-500 font-bold text-lg">{product.price.toLocaleString()} FCFA</span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}