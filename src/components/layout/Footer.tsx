import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gold-400 rounded-lg flex items-center justify-center">
                <span className="text-dark-800 font-bold text-sm">CM</span>
              </div>
              <span className="text-xl font-semibold text-white">CM Group Sarl</span>
            </Link>
            <p className="text-muted-300 text-sm leading-relaxed">
              Votre partenaire de confiance pour l’immobilier, l’automobile, les réseaux informatiques et l’électroménager au Bénin.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalog" className="text-muted-300 hover:text-gold-400">Catalogue</Link></li>
              <li><Link to="/cart" className="text-muted-300 hover:text-gold-400">Panier</Link></li>
              <li><a href="https://wa.me/c/22954099154" target="_blank" rel="noopener noreferrer" className="text-muted-300 hover:text-gold-400">Catalogue WhatsApp</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Coordonnées</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-300">
                <MapPin size={16} className="mt-0.5 text-gold-400 shrink-0" />
                <span>Bénin, Cotonou – Quartier résidentiel</span>
              </li>
              <li className="flex items-center gap-2 text-muted-300">
                <Phone size={16} className="text-gold-400 shrink-0" />
                <a href="tel:+22954099154" className="hover:text-gold-400">+229 54 09 91 54</a>
              </li>
              <li className="flex items-center gap-2 text-muted-300">
                <Mail size={16} className="text-gold-400 shrink-0" />
                <a href="mailto:contact@cmgroup.bj" className="hover:text-gold-400">contact@cmgroup.bj</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-300 text-sm">© {new Date().getFullYear()} CM Group Sarl. Tous droits réservés.</p>
          <p className="text-muted-300 text-sm">Conçu pour le marché béninois</p>
        </div>
      </div>
    </footer>
  );
}