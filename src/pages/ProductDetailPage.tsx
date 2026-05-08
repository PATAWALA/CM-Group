import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Product } from '../lib/types';
import { useCart } from '../context/CartContext';
import {
  ArrowLeft,
  MapPin,
  Ruler,
  Bed,
  Car,
  Gauge,
  Calendar,
  Fuel,
  Cog,
  ShieldCheck,
  Monitor,
  ShoppingBag,
  Package,
  ShoppingCart,
  CreditCard,
  Check,
  X,
  ZoomIn,
} from 'lucide-react';

const categoryLabels: Record<string, string> = {
  'real-estate': 'Immobilier',
  'vehicle': 'Véhicule',
  'it': 'IT & Réseaux',
  'electronics': 'Électronique & Électroménager',
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageOpen, setImageOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!supabase || !id) return;
    supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) setProduct(data as Product);
        setLoading(false);
      });
  }, [id]);

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Package size={48} className="text-muted-400 mb-4" />
        <p className="text-dark-800 text-lg font-medium">Produit introuvable</p>
        <Link to="/catalog" className="text-gold-500 hover:underline mt-2">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const { details } = product;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Retour */}
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-muted-400 hover:text-dark-800 mb-8 transition"
        >
          <ArrowLeft size={20} />
          Retour au catalogue
        </Link>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image avec bouton zoom et modal */}
          <div className="relative rounded-2xl overflow-hidden border border-light-300 bg-light-100 group">
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-[400px] object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
              onClick={() => setImageOpen(true)}
            />
            <button
              onClick={() => setImageOpen(true)}
              className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:bg-white transition"
              title="Voir en grand"
            >
              <ZoomIn size={18} className="text-dark-800" />
            </button>
          </div>

          {/* MODAL IMAGE PLEIN ÉCRAN */}
          {imageOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setImageOpen(false)}
            >
              <button
                onClick={() => setImageOpen(false)}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition"
              >
                <X size={24} className="text-white" />
              </button>
              <img
                src={product.image_url}
                alt={product.title}
                className="max-w-full max-h-[90vh] object-contain rounded-xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Infos principales */}
          <div>
            <span className="inline-block bg-light-200 text-dark-800 text-xs font-medium px-3 py-1 rounded-full mb-4">
              {categoryLabels[product.category]}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-dark-800 mb-4">{product.title}</h1>
            <p className="text-4xl font-extrabold text-gold-500 mb-6">
              {product.price.toLocaleString()} FCFA
            </p>
            <p className="text-muted-400 leading-relaxed mb-8">{product.description}</p>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => addToCart(product)}
                className="flex items-center justify-center gap-2 bg-white border-2 border-gold-400 text-gold-500 px-6 py-3.5 rounded-full font-semibold hover:bg-gold-400 hover:text-white transition-all"
              >
                <ShoppingCart size={20} />
                Ajouter au panier
              </button>
              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 bg-gold-400 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-gold-500 transition-all shadow-lg shadow-gold-400/25"
              >
                <CreditCard size={20} />
                Commander maintenant
              </button>
            </div>

            {/* Caractéristiques selon la catégorie */}
            <div className="bg-light-100 border border-light-300 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-dark-800 mb-4">Caractéristiques</h2>

              {/* Immobilier */}
              {product.category === 'real-estate' && (
                <div className="grid grid-cols-2 gap-4">
                  {details.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-gold-500" />
                      <span className="text-dark-800 text-sm">{details.location}</span>
                    </div>
                  )}
                  {details.surface && (
                    <div className="flex items-center gap-2">
                      <Ruler size={18} className="text-gold-500" />
                      <span className="text-dark-800 text-sm">{details.surface} m²</span>
                    </div>
                  )}
                  {details.rooms !== undefined && details.rooms > 0 && (
                    <div className="flex items-center gap-2">
                      <Bed size={18} className="text-gold-500" />
                      <span className="text-dark-800 text-sm">{details.rooms} chambre{details.rooms > 1 ? 's' : ''}</span>
                    </div>
                  )}
                  {details.type && (
                    <div className="flex items-center gap-2">
                      <Package size={18} className="text-gold-500" />
                      <span className="text-dark-800 text-sm capitalize">{details.type}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Véhicule */}
              {product.category === 'vehicle' && (
                <div className="grid grid-cols-2 gap-4">
                  {details.brand && details.model && (
                    <div className="flex items-center gap-2 col-span-2">
                      <Car size={18} className="text-gold-500" />
                      <span className="text-dark-800 text-sm">{details.brand} {details.model}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-gold-500" />
                    <span className="text-dark-800 text-sm">{details.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge size={18} className="text-gold-500" />
                    <span className="text-dark-800 text-sm">{details.mileage?.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel size={18} className="text-gold-500" />
                    <span className="text-dark-800 text-sm">{details.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cog size={18} className="text-gold-500" />
                    <span className="text-dark-800 text-sm">{details.transmission || 'Non spécifiée'}</span>
                  </div>
                  {details.type && (
                    <div className="flex items-center gap-2">
                      <Package size={18} className="text-gold-500" />
                      <span className="text-dark-800 text-sm capitalize">{details.type}</span>
                    </div>
                  )}
                  {details.never_crashed && (
                    <div className="flex items-center gap-2 col-span-2 mt-2">
                      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
                        <ShieldCheck size={18} className="text-green-600" />
                        <span className="text-green-700 text-sm font-medium">Véhicule jamais accidenté</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* IT */}
              {product.category === 'it' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Monitor size={18} className="text-gold-500" />
                    <span className="text-dark-800 text-sm">{details.brand_manufacturer}</span>
                  </div>
                  {details.specifications && (
                    <div className="bg-white border border-light-300 rounded-xl p-4">
                      <p className="text-sm text-dark-800">{details.specifications}</p>
                    </div>
                  )}
                  {details.warranty && (
                    <div className="flex items-center gap-2">
                      <Check size={18} className="text-green-500" />
                      <span className="text-dark-800 text-sm">Garantie : {details.warranty}</span>
                    </div>
                  )}
                  {details.type && (
                    <div className="flex items-center gap-2">
                      <Package size={18} className="text-gold-500" />
                      <span className="text-dark-800 text-sm capitalize">{details.type}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Électronique */}
              {product.category === 'electronics' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={18} className="text-gold-500" />
                    <span className="text-dark-800 text-sm">{details.brand_manufacturer}</span>
                  </div>
                  {details.specifications && (
                    <div className="bg-white border border-light-300 rounded-xl p-4">
                      <p className="text-sm text-dark-800">{details.specifications}</p>
                    </div>
                  )}
                  {details.warranty && (
                    <div className="flex items-center gap-2">
                      <Check size={18} className="text-green-500" />
                      <span className="text-dark-800 text-sm">Garantie : {details.warranty}</span>
                    </div>
                  )}
                  {details.type && (
                    <div className="flex items-center gap-2">
                      <Package size={18} className="text-gold-500" />
                      <span className="text-dark-800 text-sm capitalize">{details.type}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}