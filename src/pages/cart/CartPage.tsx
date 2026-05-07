import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import SectionTitle from '../../components/ui/SectionTitle';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <Link to="/catalog" className="flex items-center gap-2 text-muted-400 hover:text-dark-800">
          <ArrowLeft size={20} /> Retour au catalogue
        </Link>
        {count > 0 && (
          <button onClick={clearCart} className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1">
            <Trash2 size={16} /> Vider le panier
          </button>
        )}
      </div>

      <SectionTitle>Votre panier</SectionTitle>

      {count === 0 ? (
        <p className="text-center text-muted-400 mt-10">
          Votre panier est vide. <Link to="/catalog" className="text-gold-500 underline">Parcourir le catalogue</Link>
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="bg-white border border-light-300 rounded-xl p-4 flex gap-4 items-center">
              <img src={item.image_url} alt={item.title} className="w-24 h-24 object-cover rounded-lg shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-dark-800">{item.title}</h4>
                <p className="text-gold-500 font-medium">{item.price.toLocaleString()} FCFA</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-1 rounded-full hover:bg-light-200 disabled:opacity-30 text-dark-800"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center text-dark-800">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full hover:bg-light-200 text-dark-800">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-dark-800">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600 text-sm mt-1">Retirer</button>
              </div>
            </div>
          ))}

          <div className="bg-light-100 border border-light-300 rounded-xl p-6 mt-6">
            <div className="flex justify-between text-lg mb-2">
              <span className="text-dark-800">Sous-total ({count} article{count > 1 ? 's' : ''})</span>
              <span className="font-bold text-dark-800">{total.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-lg mb-4">
              <span className="text-dark-800">Livraison</span>
              <span className="text-muted-400">À convenir</span>
            </div>
            <hr className="border-light-300 mb-4" />
            <div className="flex justify-between text-2xl font-bold">
              <span className="text-dark-800">Total</span>
              <span className="text-gold-500">{total.toLocaleString()} FCFA</span>
            </div>
            <Link
              to="/checkout"
              className="block text-center bg-gold-400 text-white py-4 rounded-full font-bold text-lg mt-6 hover:bg-gold-500 transition"
            >
              Passer commande
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}