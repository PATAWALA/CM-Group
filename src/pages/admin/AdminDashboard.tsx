import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Product } from '../../lib/types';
import { Link, useLocation } from 'react-router-dom';
import { Plus, Edit, Trash2, Package, Search, Users, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/admin/Sidebar';
import StatsCards from '../../components/admin/StatsCards';

interface Admin {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'admins'>('products');
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Détecter le changement d'URL pour mettre à jour l'onglet
  useEffect(() => {
    if (location.pathname === '/admin/admins') {
      setActiveTab('admins');
    } else {
      setActiveTab('products');
    }
  }, [location.pathname]);

  const fetchProducts = async () => {
    if (!supabase) return;
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data as Product[]);
    setLoading(false);
  };

  const fetchAdmins = async () => {
    if (!supabase) return;
    const { data } = await supabase.from('admins').select('*').order('created_at', { ascending: false });
    if (data) setAdmins(data as Admin[]);
  };

  useEffect(() => {
    fetchProducts();
    fetchAdmins();
  }, []);

  const deleteProduct = async (id: number) => {
    if (!supabase || !confirm('Supprimer ce bien définitivement ?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  const deleteAdmin = async (id: string) => {
    if (!supabase || !confirm('Supprimer cet administrateur ?')) return;
    await supabase.from('admins').delete().eq('id', id);
    fetchAdmins();
  };

  const addAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!supabase) return;

    const { error: signUpError } = await supabase.auth.signUp({
      email: newAdminEmail,
      password: newAdminPassword,
      options: { data: { full_name: newAdminName } },
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess(`✅ Admin "${newAdminName}" ajouté avec succès !`);
    setNewAdminEmail('');
    setNewAdminName('');
    setNewAdminPassword('');
    setShowAddAdmin(false);
    fetchAdmins();
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory ? p.category === filterCategory : true;
    return matchSearch && matchCategory;
  });

  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentProducts = products.filter((p) => p.created_at && new Date(p.created_at) > thirtyDaysAgo).length;

  const categoryLabels: Record<string, string> = {
    'real-estate': 'Immobilier',
    'vehicle': 'Véhicule',
    'it': 'IT & Réseaux',
    'electronics': 'Électronique',
  };

  return (
    <div className="min-h-screen bg-light-100">
      <Sidebar />
      <div className="lg:pl-72">
        <div className="pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-dark-800">Dashboard</h1>
              <p className="text-muted-400 text-sm mt-1">Bienvenue, {user?.email}</p>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              {activeTab === 'products' && (
                <Link
                  to="/admin/add"
                  className="flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-white px-5 py-3 rounded-full font-semibold text-sm transition shadow-lg shadow-gold-400/25"
                >
                  <Plus size={18} /> Ajouter un bien
                </Link>
              )}
              {activeTab === 'admins' && (
                <button
                  onClick={() => setShowAddAdmin(!showAddAdmin)}
                  className="flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-white px-5 py-3 rounded-full font-semibold text-sm transition shadow-lg shadow-gold-400/25"
                >
                  <UserPlus size={18} /> Ajouter un admin
                </button>
              )}
            </div>
          </div>

          <StatsCards
            totalProducts={products.length}
            totalValue={totalValue}
            recentProducts={recentProducts}
            totalAdmins={admins.length}
          />

          <div className="flex gap-6 mt-10 mb-6 border-b border-light-300">
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-3 px-2 font-semibold text-sm transition border-b-2 ${
                activeTab === 'products'
                  ? 'border-gold-400 text-gold-500'
                  : 'border-transparent text-muted-400 hover:text-dark-800'
              }`}
            >
              <Package size={16} className="inline mr-2" />
              Biens ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`pb-3 px-2 font-semibold text-sm transition border-b-2 ${
                activeTab === 'admins'
                  ? 'border-gold-400 text-gold-500'
                  : 'border-transparent text-muted-400 hover:text-dark-800'
              }`}
            >
              <Users size={16} className="inline mr-2" />
              Administrateurs ({admins.length})
            </button>
          </div>

          {/* FORMULAIRE AJOUT ADMIN */}
          {showAddAdmin && activeTab === 'admins' && (
            <div className="bg-white border border-light-300 rounded-2xl p-6 mb-8 shadow-sm">
              <h2 className="text-lg font-bold text-dark-800 mb-4">Ajouter un administrateur</h2>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">{error}</div>
              )}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 rounded-lg px-4 py-3 mb-4 text-sm">{success}</div>
              )}
              <form onSubmit={addAdmin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-800 mb-1">Nom complet</label>
                  <input
                    type="text"
                    value={newAdminName}
                    onChange={(e) => setNewAdminName(e.target.value)}
                    required
                    placeholder="Jean Dupont"
                    className="w-full bg-light-100 border border-light-300 rounded-lg px-4 py-3 text-dark-800 focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-800 mb-1">Email</label>
                  <input
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    required
                    placeholder="jean@cmgroup.bj"
                    className="w-full bg-light-100 border border-light-300 rounded-lg px-4 py-3 text-dark-800 focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-800 mb-1">Mot de passe</label>
                  <input
                    type="password"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    required
                    placeholder="Minimum 6 caractères"
                    className="w-full bg-light-100 border border-light-300 rounded-lg px-4 py-3 text-dark-800 focus:outline-none focus:border-gold-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold-400 hover:bg-gold-500 text-white py-3 rounded-full font-semibold transition"
                >
                  Créer le compte admin
                </button>
              </form>
            </div>
          )}

          {/* TABLE BIENS */}
          {activeTab === 'products' && (
            <>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher un bien..."
                    className="w-full bg-white border border-light-300 rounded-xl pl-11 pr-4 py-3 text-dark-800 focus:outline-none focus:border-gold-400 transition"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-white border border-light-300 rounded-xl px-4 py-3 text-dark-800 focus:outline-none focus:border-gold-400 transition"
                >
                  <option value="">Toutes les catégories</option>
                  <option value="real-estate">Immobilier</option>
                  <option value="vehicle">Véhicule</option>
                  <option value="it">IT & Réseaux</option>
                  <option value="electronics">Électronique</option>
                </select>
              </div>

              {loading ? (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold-400 mx-auto"></div>
                  <p className="text-muted-400 mt-4">Chargement...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white border border-light-300 rounded-2xl">
                  <Package size={48} className="mx-auto text-muted-400 mb-4" />
                  <p className="text-muted-400">Aucun bien trouvé.</p>
                </div>
              ) : (
                <div className="bg-white border border-light-300 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-light-200">
                        <tr>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-dark-800 uppercase tracking-wider">Image</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-dark-800 uppercase tracking-wider">Titre</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-dark-800 uppercase tracking-wider hidden md:table-cell">Catégorie</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-dark-800 uppercase tracking-wider">Prix</th>
                          <th className="text-right px-6 py-4 text-xs font-semibold text-dark-800 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-light-300">
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-light-50 transition-colors">
                            <td className="px-6 py-4">
                              <img src={product.image_url} alt={product.title} className="w-14 h-14 object-cover rounded-xl border border-light-300" />
                            </td>
                            <td className="px-6 py-4">
                              <p className="font-semibold text-dark-800">{product.title}</p>
                              <p className="text-muted-400 text-xs mt-0.5 line-clamp-1">{product.description}</p>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                              <span className="bg-light-200 text-dark-800 text-xs font-medium px-3 py-1 rounded-full">
                                {categoryLabels[product.category] || product.category}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-gold-500 font-bold text-sm">{product.price.toLocaleString()} FCFA</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Link to={`/admin/edit/${product.id}`} className="p-2.5 rounded-xl hover:bg-light-200 text-dark-800 transition" title="Modifier">
                                  <Edit size={16} />
                                </Link>
                                <button onClick={() => deleteProduct(product.id)} className="p-2.5 rounded-xl hover:bg-red-50 text-red-500 transition" title="Supprimer">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TABLE ADMINS */}
          {activeTab === 'admins' && (
            <div className="bg-white border border-light-300 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-light-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-dark-800 uppercase tracking-wider">Admin</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-dark-800 uppercase tracking-wider hidden md:table-cell">Email</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-dark-800 uppercase tracking-wider hidden lg:table-cell">Ajouté le</th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-dark-800 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light-300">
                    {admins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-light-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-dark-800 font-bold text-sm shadow-sm">
                              {admin.full_name?.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <div>
                              <p className="font-semibold text-dark-800">{admin.full_name}</p>
                              <p className="text-xs text-gold-500">Admin</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-400 hidden md:table-cell">{admin.email}</td>
                        <td className="px-6 py-4 text-muted-400 text-sm hidden lg:table-cell">
                          {new Date(admin.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {admin.id !== user?.id && (
                            <button onClick={() => deleteAdmin(admin.id)} className="p-2.5 rounded-xl hover:bg-red-50 text-red-500 transition" title="Supprimer">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}