import { Package, DollarSign, TrendingUp, Users } from 'lucide-react';

interface StatsCardsProps {
  totalProducts: number;
  totalValue: number;
  recentProducts: number;
  totalAdmins: number;
}

export default function StatsCards({ totalProducts, totalValue, recentProducts, totalAdmins }: StatsCardsProps) {
  const stats = [
    {
      label: 'Total des biens',
      value: totalProducts,
      icon: Package,
      color: 'from-gold-400 to-yellow-500',
      bg: 'bg-gold-400/10',
    },
    {
      label: 'Valeur du stock',
      value: `${(totalValue / 1000000).toFixed(1)}M FCFA`,
      icon: DollarSign,
      color: 'from-emerald-400 to-green-500',
      bg: 'bg-emerald-400/10',
    },
    {
      label: 'Ajouts récents',
      value: recentProducts,
      subtext: '30 derniers jours',
      icon: TrendingUp,
      color: 'from-blue-400 to-cyan-500',
      bg: 'bg-blue-400/10',
    },
    {
      label: 'Administrateurs',
      value: totalAdmins,
      icon: Users,
      color: 'from-purple-400 to-indigo-500',
      bg: 'bg-purple-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-light-300 rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <stat.icon size={22} className="text-white" />
            </div>
          </div>
          <p className="text-muted-400 text-sm font-medium">{stat.label}</p>
          <p className="text-2xl font-bold text-dark-800 mt-1">{stat.value}</p>
          {stat.subtext && (
            <p className="text-xs text-muted-400 mt-1">{stat.subtext}</p>
          )}
        </div>
      ))}
    </div>
  );
}