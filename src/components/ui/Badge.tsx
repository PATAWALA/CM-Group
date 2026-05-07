export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-navy-700/50 text-gold-400 px-3 py-1 rounded-full text-sm font-medium border border-navy-700">
      {children}
    </span>
  );
}