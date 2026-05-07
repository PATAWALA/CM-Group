import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Product } from '../../lib/types';
import RealEstateCard from '../productCards/RealEstateCard';
import VehicleCard from '../productCards/VehicleCard';
import ITProductCard from '../productCards/ITProductCard';
import TechProductCard from '../productCards/ElectronicCard';
import SectionTitle from '../ui/SectionTitle';
import { Link } from 'react-router-dom';

const productCardMap: Record<string, React.ComponentType<{ product: Product }>> = {
  'real-estate': RealEstateCard,
  vehicle: VehicleCard,
  it: ITProductCard,
  electronics: TechProductCard,
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    // Récupérer 6 produits récents ou aléatoires
    supabase
      .from('products')
      .select('*')
      .limit(6)
      .then(({ data, error }) => {
        if (!error && data) setProducts(data as Product[]);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 bg-light-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Découvrez nos biens</SectionTitle>
        {loading ? (
          <p className="text-center text-muted-400">Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {products.map((product) => {
              const Card = productCardMap[product.category] || TechProductCard;
              return <Card key={product.id} product={product} />;
            })}
          </div>
        )}
        <div className="text-center mt-10">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-white border border-light-300 text-dark-800 px-8 py-4 rounded-full font-semibold hover:bg-light-200 transition-all"
          >
            Voir tous nos biens
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}