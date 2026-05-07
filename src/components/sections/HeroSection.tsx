import { motion } from 'framer-motion';
import { ChevronRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />
      {/* Dégradé latéral */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-800/95 via-dark-800/60 to-dark-800/5" />

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Badge */}
          <span className="inline-block bg-white/10 backdrop-blur-sm text-gold-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gold-400/20">
            CM Group Sarl – Bénin
          </span>

          {/* Titre */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            De l'immobilier
            <br />
            à l'informatique,
            <br />
            <span className="text-gold-400">une seule adresse</span>
            <br />
            d'excellence.
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-200 mb-8 max-w-lg leading-relaxed">
            Terrains, véhicules, équipements informatiques, électroménagers.
            CM Group centralise vos besoins avec confiance et réactivité.
          </p>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/catalog"
              className="group inline-flex items-center justify-center gap-2 bg-gold-400 text-dark-800 px-8 py-4 rounded-full font-semibold text-base hover:bg-gold-500 transition-all hover:scale-105 shadow-lg shadow-gold-400/25"
            >
              Voir nos biens
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              <Phone size={18} />
              Nous contacter
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}