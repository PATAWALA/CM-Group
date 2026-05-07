import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type{ Product, Category } from '../lib/types';
import RealEstateCard from '../components/productCards/RealEstateCard';
import VehicleCard from '../components/productCards/VehicleCard';
import ITProductCard from '../components/productCards/ITProductCard';
import TechProductCard from '../components/productCards/ElectronicCard';
import SectionTitle from '../components/ui/SectionTitle';

const productCardMap: Record<string, React.ComponentType<{ product: Product }>> = {
  'real-estate': RealEstateCard,
  vehicle: VehicleCard,
  it: ITProductCard,
  electronics: TechProductCard,
};

const categories: { value: string; label: string }[] = [
  { value: '', label: 'Tout' },
  { value: 'real-estate', label: 'Immobilier' },
  { value: 'vehicle', label: 'Véhicules' },
  { value: 'it', label: 'IT & Réseaux' },
  { value: 'electronics', label: 'Électronique' },
];

const subFilters: Record<string, { value: string; label: string }[]> = {
  'real-estate': [
    { value: '', label: 'Tous' },
    { value: 'villa', label: 'Villa' },
    { value: 'terrain', label: 'Terrain' },
    { value: 'duplex', label: 'Duplex' },
  ],
  vehicle: [
    { value: '', label: 'Tous' },
    { value: 'berline', label: 'Berline' },
    { value: '4x4', label: '4x4' },
    { value: 'camion', label: 'Camion' },
  ],
  it: [
    { value: '', label: 'Tous' },
    { value: 'serveur', label: 'Serveur' },
    { value: 'switch', label: 'Switch' },
    { value: 'ordinateur', label: 'Ordinateur' },
  ],
  electronics: [
    { value: '', label: 'Tous' },
    { value: 'tv', label: 'TV' },
    { value: 'climatiseur', label: 'Climatiseur' },
    { value: 'refrigerateur', label: 'Réfrigérateur' },
  ],
};

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = (searchParams.get('category') as Category) || '';
  const subType = searchParams.get('type') || '';

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

  const filteredProducts = useMemo(() => {
    if (!subType) return products;
    return products.filter(
      (p) => p.details?.type === subType
    );
  }, [products, subType]);

  const currentSubFilters = subFilters[category] || [];

  const handleCategoryChange = (newCategory: string) => {
    setSearchParams(newCategory ? { category: newCategory } : {});
  };

  const handleSubFilterChange = (newType: string) => {
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (newType) params.type = newType;
    setSearchParams(params);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <SectionTitle>
        {category ? `Nos produits ${categories.find(c => c.value === category)?.label}` : 'Tous nos produits'}
      </SectionTitle>

      {/* Filtres de catégories */}
      <div className="flex flex-wrap justify-center gap-3 mt-8 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
              category === cat.value
                ? 'bg-gold-400 text-white border-gold-400'
                : 'border-light-300 text-muted-400 hover:border-gold-400/50 hover:text-gold-500'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sous‑filtres */}
      {currentSubFilters.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {currentSubFilters.map((sub) => (
            <button
              key={sub.value}
              onClick={() => handleSubFilterChange(sub.value)}
              className={`px-4 py-1.5 rounded-full text-xs border transition-colors ${
                subType === sub.value
                  ? 'bg-gold-400/20 border-gold-400 text-gold-500'
                  : 'border-light-300 text-muted-400 hover:border-gold-400/30 hover:text-dark-800'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <p className="text-center text-muted-400">Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredProducts.map((product) => {
            const Card = productCardMap[product.category] || TechProductCard;
            return <Card key={product.id} product={product} />;
          })}
        </div>
      )}
    </div>
  );
}