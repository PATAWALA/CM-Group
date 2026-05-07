import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type{ Product } from '../lib/types';
import AddToCartButton from '../components/ui/AddToCartButton';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!supabase || !id) return;
    supabase.from('products').select('*').eq('id', id).single().then(({ data }) => {
      if (data) setProduct(data);
    });
  }, [id]);

  if (!product) return <div className="pt-24 text-center text-dark-800">Chargement...</div>;

  return (
    <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto bg-white">
      <img src={product.image_url} alt={product.title} className="w-full max-h-96 object-cover rounded-xl mb-8" />
      <h1 className="text-3xl font-bold mb-4 text-dark-800">{product.title}</h1>
      <p className="text-gold-500 text-2xl font-bold mb-6">{product.price.toLocaleString()} FCFA</p>
      <p className="text-muted-400 mb-8">{product.description}</p>
      <div className="flex gap-4">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}