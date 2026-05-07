
import AddToCartButton from '../ui/AddToCartButton';
import type{ Product } from '../../lib/types';

export default function TechProductCard({ product }: { product: Product }) {
  const { details } = product;
  return (
    <div className="bg-white border border-light-300 rounded-2xl overflow-hidden hover:border-gold-400/40 transition duration-300 hover:shadow-lg">
      <img src={product.image_url} alt={product.title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-dark-800">{product.title}</h3>
        <p className="text-muted-400 text-sm mb-2">{details.brand_manufacturer}</p>
        {details.specifications && (
          <p className="text-muted-400 text-xs line-clamp-2 mb-3">{details.specifications}</p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-gold-500 font-bold">{product.price.toLocaleString()} FCFA</span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}