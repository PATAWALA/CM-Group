import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 opacity-90" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.span
            variants={fadeInUp}
            className="inline-block bg-navy-700/50 text-gold-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-navy-700"
          >
            Votre partenaire multisectoriel au Bénin
          </motion.span>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            De l’<span className="text-gold-400">immobilier</span> à la
            <br className="hidden sm:block" />
            <span className="text-gold-400"> technologie</span>, une seule
            <br className="hidden sm:block" />
            adresse d’excellence
          </motion.h1>

          <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-lg md:text-xl text-pro-400 mb-10">
            CM Group Sarl centralise tous vos besoins : terrains, véhicules, matériel BTP, équipements informatiques et électroménagers. Qualité, confiance et réactivité.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/catalog"
              className="group inline-flex items-center justify-center gap-2 bg-gold-400 text-navy-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold-500 transition-all hover:scale-105"
            >
              Voir le catalogue
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/c/22954099154"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-pro-400/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/5 transition-all"
            >
              Catalogue WhatsApp <ExternalLink size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}