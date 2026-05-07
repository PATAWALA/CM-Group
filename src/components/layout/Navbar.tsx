import { useState } from 'react';
import { Menu, X, ShoppingCart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartDrawer from '../cart/CartDrawer';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-50 bg-navy-900/90 backdrop-blur-md border-b border-navy-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold-400 rounded-lg flex items-center justify-center">
              <span className="text-navy-900 font-bold text-sm">CM</span>
            </div>
            <span className="text-xl font-semibold text-white">CM Group</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/catalog" className="text-pro-400 hover:text-gold-400">Catalogue</Link>
            <Link to="/cart" className="text-pro-400 hover:text-gold-400">Panier</Link>
            <a
              href="https://wa.me/c/22954099154"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gold-400 text-navy-900 px-4 py-2 rounded-full font-medium text-sm hover:bg-gold-500"
            >
              WhatsApp <ExternalLink size={14} />
            </a>
            <button onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart className="text-pro-400 hover:text-gold-400" size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-400 text-navy-900 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-pro-400">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-800 border-t border-navy-700 px-4 pt-2 pb-4 space-y-3">
          <Link to="/catalog" onClick={() => setMobileMenuOpen(false)} className="block text-pro-400 py-2">Catalogue</Link>
          <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="block text-pro-400 py-2">Panier</Link>
          <a href="https://wa.me/c/22954099154" target="_blank" rel="noopener noreferrer" className="block text-gold-400 py-2">
            Catalogue WhatsApp
          </a>
        </div>
      )}

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}