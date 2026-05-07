import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Car, Monitor, ShoppingBag } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const services = [
  { label: 'Immobilier', icon: Home, category: 'real-estate', color: 'from-gold-400 to-yellow-500', desc: 'Parcelles, villas, location et vente.' },
  { label: 'Automobile & BTP', icon: Car, category: 'vehicle', color: 'from-blue-500 to-cyan-400', desc: 'Véhicules et engins de chantier.' },
  { label: 'IT & Réseaux', icon: Monitor, category: 'it', color: 'from-purple-500 to-indigo-400', desc: 'Serveurs, réseaux, sécurité informatique.' },
  { label: 'Électronique & Électroménager', icon: ShoppingBag, category: 'electronics', color: 'from-emerald-500 to-teal-400', desc: 'TV, climatiseurs, high-tech.' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-light-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Nos pôles d’expertise</SectionTitle>
        <p className="text-muted-400 text-center max-w-xl mx-auto mb-16">
          Quatre secteurs stratégiques pour répondre à tous vos projets.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s) => (
            <motion.div
              key={s.category}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Link
                to={`/catalog?category=${s.category}`}
                className="block bg-white border border-light-300 rounded-2xl p-6 hover:border-gold-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold-400/5 h-full"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 text-white`}>
                  <s.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dark-800">{s.label}</h3>
                <p className="text-muted-400 text-sm leading-relaxed">{s.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}