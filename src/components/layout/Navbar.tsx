import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartDrawer from '../cart/CartDrawer';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-light-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo avec image + texte */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo.jpg"
              alt="CM Group Logo"
              className="h-10 w-10 rounded-lg object-cover border border-light-300 group-hover:border-gold-400 transition-colors"
            />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-dark-800 leading-tight tracking-tight">
                CM <span className="text-gold-500">Group</span>
              </span>
              <span className="text-[10px] text-muted-400 font-medium tracking-widest uppercase leading-none">
                Sarl
              </span>
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-dark-800 hover:text-gold-500 transition-colors font-medium">
              Accueil
            </Link>
            <Link to="/catalog" className="text-dark-800 hover:text-gold-500 transition-colors font-medium">
              Nos biens
            </Link>
            <Link to="/contact" className="text-dark-800 hover:text-gold-500 transition-colors font-medium">
              Contact
            </Link>

            {/* Panier avec fond or */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-gold-400 text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-gold-500 transition-all shadow-sm"
            >
              <ShoppingCart size={16} />
              <span>Mon panier</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-dark-800 text-gold-400 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile : panier + burger */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Bouton panier mobile avec badge */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-dark-800 hover:text-gold-500 transition-colors"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
            {/* Burger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-dark-800">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-light-300 px-4 pt-2 pb-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-dark-800 py-2 font-medium hover:text-gold-500 transition-colors"
          >
            Accueil
          </Link>
          <Link
            to="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-dark-800 py-2 font-medium hover:text-gold-500 transition-colors"
          >
            Nos biens
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-dark-800 py-2 font-medium hover:text-gold-500 transition-colors"
          >
            Contact
          </Link>
          {/* Bouton panier mobile dans le menu déroulant (optionnel) */}
          <button
            onClick={() => { setCartOpen(true); setMobileMenuOpen(false); }}
            className="flex items-center justify-center gap-2 bg-gold-400 text-white px-4 py-3 rounded-full font-medium text-sm w-full hover:bg-gold-500 transition-colors"
          >
            <ShoppingCart size={16} />
            <span>Mon panier ({itemCount})</span>
          </button>
        </div>
      )}

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}