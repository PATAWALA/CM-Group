import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-white min-h-screen">
      {/* En‑tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <Link to="/catalog" className="flex items-center gap-2 text-muted-400 hover:text-dark-800 transition">
          <ArrowLeft size={20} />
          <span className="font-medium">Retour au catalogue</span>
        </Link>
        {count > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition self-end sm:self-auto"
          >
            <Trash2 size={16} />
            Vider le panier
          </button>
        )}
      </div>

      <h1 className="text-3xl font-bold text-dark-800 mb-2">Mon panier</h1>
      <p className="text-muted-400 mb-8">
        {count === 0 ? 'Votre panier est vide.' : `${count} article${count > 1 ? 's' : ''} dans votre panier`}
      </p>

      {count === 0 ? (
        <div className="text-center py-16 border border-light-300 rounded-2xl bg-light-50">
          <ShoppingBag size={48} className="mx-auto text-muted-400 mb-4" />
          <p className="text-dark-800 text-lg font-medium mb-2">Votre panier est vide</p>
          <p className="text-muted-400 mb-6">Découvrez nos biens et ajoutez-les à votre panier.</p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Parcourir le catalogue
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Liste des articles */}
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-light-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-lg shrink-0"
              />
              {/* Infos */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-dark-800 truncate">{item.title}</h4>
                <p className="text-gold-500 font-medium text-sm mt-1">
                  Prix unitaire : {item.price.toLocaleString()} FCFA
                </p>
                {/* Quantité sur mobile : au‑dessus du prix total */}
                <div className="flex items-center gap-3 mt-3 sm:mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-1.5 rounded-lg hover:bg-light-100 disabled:opacity-30 text-dark-800 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium text-dark-800">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 rounded-lg hover:bg-light-100 text-dark-800 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              {/* Prix total + suppression */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-3 sm:gap-1">
                <span className="text-lg font-bold text-dark-800">
                  {(item.price * item.quantity).toLocaleString()} FCFA
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  <span className="hidden sm:inline">Retirer</span>
                </button>
              </div>
            </div>
          ))}

          {/* Résumé */}
          <div className="bg-white border border-light-300 rounded-2xl p-6 mt-8 shadow-sm">
            <div className="flex justify-between text-lg mb-2">
              <span className="text-dark-800">Sous‑total ({count} article{count > 1 ? 's' : ''})</span>
              <span className="font-bold text-dark-800">{total.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-lg mb-4">
              <span className="text-dark-800">Livraison</span>
              <span className="text-muted-400">À convenir</span>
            </div>
            <hr className="border-light-300 mb-4" />
            <div className="flex justify-between text-2xl font-bold mb-6">
              <span className="text-dark-800">Total</span>
              <span className="text-gold-500">{total.toLocaleString()} FCFA</span>
            </div>
            <Link
              to="/checkout"
              className="block text-center bg-gold-400 hover:bg-gold-500 text-white py-4 rounded-full font-bold text-lg transition shadow-lg shadow-gold-400/25"
            >
              Passer commande
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}