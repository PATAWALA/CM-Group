import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Product} from '../../lib/types';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Package } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';

const categoryLabels: Record<string, string> = {
  'real-estate': 'Immobilier',
  'vehicle': 'Véhicules',
  'it': 'IT & Réseaux',
  'electronics': 'Électronique',
};

const categoryIcons: Record<string, string> = {
  'real-estate': '🏠',
  'vehicle': '🚗',
  'it': '🖥️',
  'electronics': '📺',
};

export default function CategoryProducts() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    if (!supabase || !category) return;
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    if (data) setProducts(data as Product[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const deleteProduct = async (id: number) => {
    if (!supabase || !confirm('Supprimer ce bien définitivement ?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  const totalValue = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen bg-light-100">
      <Sidebar />
      <div className="lg:pl-72">
        <div className="pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <Link
                to="/admin"
                className="flex items-center gap-2 text-muted-400 hover:text-dark-800 mb-2 transition"
              >
                <ArrowLeft size={18} /> Retour au dashboard
              </Link>
              <h1 className="text-3xl font-bold text-dark-800">
                {categoryIcons[category || '']} {categoryLabels[category || ''] || category}
              </h1>
              <div className="flex gap-4 mt-2 text-sm text-muted-400">
                <span>{products.length} bien{products.length > 1 ? 's' : ''}</span>
                <span>•</span>
                <span className="text-gold-500 font-medium">Valeur : {totalValue.toLocaleString()} FCFA</span>
              </div>
            </div>
            <Link
              to="/admin/add"
              className="flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-500 text-white px-5 py-3 rounded-full font-semibold text-sm transition shadow-lg shadow-gold-400/25 w-fit"
            >
              + Ajouter un bien
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold-400 mx-auto"></div>
              <p className="text-muted-400 mt-4">Chargement...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white border border-light-300 rounded-2xl">
              <Package size={48} className="mx-auto text-muted-400 mb-4" />
              <p className="text-muted-400">Aucun bien dans cette catégorie.</p>
              <Link
                to="/admin/add"
                className="inline-flex items-center gap-2 text-gold-500 hover:underline mt-4 font-medium"
              >
                Ajouter le premier bien →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-light-300 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/admin/edit/${product.id}`}
                        className="p-2 bg-white rounded-xl shadow-lg hover:bg-light-200 text-dark-800 transition"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 bg-white rounded-xl shadow-lg hover:bg-red-50 text-red-500 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-dark-800 mb-1 line-clamp-1">{product.title}</h3>
                    <p className="text-muted-400 text-xs mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gold-500 font-bold text-lg">
                        {product.price.toLocaleString()} FCFA
                      </span>
                      <span className="bg-light-200 text-dark-800 text-xs px-3 py-1 rounded-full">
                        {product.details?.type || 'Standard'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}