import { motion } from 'framer-motion';

export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-center mb-4 text-dark-800"
    >
      {children}
    </motion.h2>
  );
}