export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-light-200 text-gold-500 px-3 py-1 rounded-full text-sm font-medium border border-light-300">
      {children}
    </span>
  );
}