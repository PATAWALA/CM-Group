import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function CheckoutPage() {
  const { cart } = useCart();
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.items.length === 0) {
    return (
      <div className="pt-24 text-center">
        <p className="text-pro-400">Votre panier est vide. <Link to="/catalog" className="text-gold-400 underline">Retour au catalogue</Link></p>
      </div>
    );
  }

  const message = `Bonjour CM Group, je souhaite commander :%0A${cart.items.map(i => `- ${i.title} x${i.quantity} : ${(i.price*i.quantity).toLocaleString()} FCFA`).join('%0A')}%0ATotal : ${total.toLocaleString()} FCFA`;

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <Link to="/cart" className="flex items-center gap-2 text-pro-400 hover:text-white mb-8">
        <ArrowLeft size={20} /> Retour au panier
      </Link>

      <h1 className="text-3xl font-bold mb-8">Finaliser votre commande</h1>

      <div className="bg-navy-800 border border-navy-700 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Récapitulatif</h2>
        {cart.items.map(item => (
          <div key={item.id} className="flex justify-between py-2 border-b border-navy-700 last:border-0">
            <span>{item.title} <span className="text-pro-400">x{item.quantity}</span></span>
            <span>{(item.price * item.quantity).toLocaleString()} FCFA</span>
          </div>
        ))}
        <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-navy-700">
          <span>Total</span>
          <span className="text-gold-400">{total.toLocaleString()} FCFA</span>
        </div>
      </div>

      <p className="text-pro-400 mb-6 text-center">
        Pour confirmer votre commande, contactez-nous via WhatsApp. Notre équipe vous répondra immédiatement.
      </p>

      <a
        href={`https://wa.me/22954099154?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-lg font-semibold px-8 py-5 rounded-full transition-all hover:scale-105 shadow-xl"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967... (le même SVG WhatsApp)"/>
        </svg>
        Commander via WhatsApp
        <ExternalLink size={18} />
      </a>
    </div>
  );
}