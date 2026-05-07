import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type{ Product } from '../lib/types';
import RealEstateCard from '../components/productCards/RealEstateCard';
import VehicleCard from '../components/productCards/VehicleCard';
import TechProductCard from '../components/productCards/TechProductCard';
import SectionTitle from '../components/ui/SectionTitle';

const productCardMap: Record<string, React.ComponentType<{ product: Product }>> = {
  'real-estate': RealEstateCard,
  vehicle: VehicleCard,
  it: TechProductCard,
  electronics: TechProductCard,
};

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const query = supabase.from('products').select('*');
    if (category) query.eq('category', category);
    query.then(({ data, error }) => {
      if (!error && data) setProducts(data as Product[]);
      setLoading(false);
    });
  }, [category]);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionTitle>{category ? `Nos produits ${category}` : 'Tous nos produits'}</SectionTitle>
      {loading ? (
        <p className="text-center text-pro-400">Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {products.map((product) => {
            const Card = productCardMap[product.category] || TechProductCard;
            return <Card key={product.id} product={product} />;
          })}
        </div>
      )}
    </div>
  );
}