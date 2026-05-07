import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Send } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto bg-white min-h-screen">
      <SectionTitle>Nous contacter</SectionTitle>

      <div className="mt-10 grid gap-8">
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-light-100 border border-light-300 rounded-xl p-4">
            <Phone className="text-gold-500 mx-auto mb-2" size={20} />
            <p className="text-sm font-medium text-dark-800">+229 54 09 91 54</p>
          </div>
          <div className="bg-light-100 border border-light-300 rounded-xl p-4">
            <MapPin className="text-gold-500 mx-auto mb-2" size={20} />
            <p className="text-sm font-medium text-dark-800">Cotonou, Bénin</p>
          </div>
          <div className="bg-light-100 border border-light-300 rounded-xl p-4">
            <Mail className="text-gold-500 mx-auto mb-2" size={20} />
            <p className="text-sm font-medium text-dark-800">contact@cmgroup.bj</p>
          </div>
        </div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-6 text-center"
          >
            Message envoyé avec succès ! Nous vous répondrons rapidement.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-light-100 border border-light-300 rounded-xl p-6 space-y-4">
            <input type="text" placeholder="Votre nom" required className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800" />
            <input type="email" placeholder="Votre email" required className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800" />
            <textarea placeholder="Votre message" rows={4} required className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800" />
            <button type="submit" className="w-full bg-gold-400 hover:bg-gold-500 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition">
              <Send size={16} /> Envoyer
            </button>
          </form>
        )}
      </div>
    </div>
  );
}