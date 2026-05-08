import { motion } from 'framer-motion';
import { Phone, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-20 bg-dark-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-gold-400 font-semibold tracking-wide uppercase">
            Un projet, une question ?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
            Discutons ensemble de votre projet
          </h2>
          <p className="text-muted-300 max-w-2xl mx-auto mb-10">
            Nos équipes sont à votre écoute pour vous conseiller et vous accompagner dans vos démarches.
          </p>

          {/* Bouton principal : Nous contacter */}
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-500 text-dark-800 text-lg font-semibold px-10 py-5 rounded-full transition-all hover:scale-105 shadow-2xl"
          >
            <Phone size={20} />
            Nous contacter
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="text-muted-300 text-sm mt-6">
            Ou appelez-nous directement au{' '}
            <a href="tel:+22954099154" className="text-gold-400 hover:underline">
              +229 54 09 91 54
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}