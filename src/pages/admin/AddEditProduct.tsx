import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import type { Product, Category } from '../../lib/types';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

// ========== LISTES DE SÉLECTION ==========
const categories: { value: Category; label: string }[] = [
  { value: 'real-estate', label: 'Immobilier' },
  { value: 'vehicle', label: 'Véhicule' },
  { value: 'it', label: 'IT & Réseaux' },
  { value: 'electronics', label: 'Électronique & Électroménager' },
];

// Marques de véhicules (les plus courantes au Bénin)
const carBrands = [
  'Toyota', 'Mercedes', 'BMW', 'Audi', 'Honda', 'Hyundai', 'Kia', 'Nissan',
  'Mitsubishi', 'Ford', 'Chevrolet', 'Volkswagen', 'Peugeot', 'Renault',
  'Suzuki', 'Mazda', 'Lexus', 'Land Rover', 'Jeep', 'Sinotruk', 'Howo',
  'Foton', 'Autre',
];

// Marques IT
const itBrands = [
  'Dell', 'HP', 'Lenovo', 'Cisco', 'Huawei', 'Netgear', 'TP-Link',
  'Asus', 'Acer', 'IBM', 'Intel', 'AMD', 'Kingston', 'Seagate',
  'Western Digital', 'Synology', 'Ubiquiti', 'MikroTik', 'Fortinet',
  'Autre',
];

// Marques électronique / électroménager
const electronicBrands = [
  'Samsung', 'LG', 'Sony', 'Panasonic', 'Philips', 'Toshiba', 'Midea',
  'Hisense', 'TCL', 'Sharp', 'Whirlpool', 'Bosch', 'Siemens', 'Electrolux',
  'Haier', 'Beko', 'Candy', 'Hoover', 'Rowenta', 'Moulinex', 'Autre',
];

// Types immobilier
const realEstateTypes = [
  'Villa', 'Duplex', 'Appartement', 'Terrain', 'Immeuble', 'Local commercial',
  'Studio', 'Loft', 'Penthouse',
];

// Types véhicules
const vehicleTypes = [
  'Berline', '4x4 / SUV', 'Pick-up', 'Camion', 'Minibus', 'Bus', 'Moto',
  'Tricycle', 'Engin de chantier', 'Tracteur', 'Remorque',
];

// Types IT
const itTypes = [
  'Serveur', 'Switch', 'Routeur', 'Ordinateur de bureau', 'PC Portable',
  'Onduleur', 'Imprimante', 'Scanner', 'Caméra de surveillance',
  'Point d\'accès WiFi', 'Disque dur externe', 'NAS', 'Logiciel',
];

// Types électronique
const electronicTypes = [
  'TV', 'Climatiseur', 'Réfrigérateur', 'Congélateur', 'Machine à laver',
  'Cuisinière', 'Four', 'Micro-ondes', 'Ventilateur', 'Mixeur',
  'Cafetière', 'Fer à repasser', 'Aspirateur', 'Téléphone', 'Tablette',
];

// Transmissions véhicules
const transmissions = [
  'Manuelle', 'Automatique', 'CVT', 'Semi-automatique',
];

// Carburants
const fuels = [
  'Essence', 'Diesel', 'Hybride', 'Électrique', 'GPL',
];

// ========== COMPOSANT ==========
export default function AddEditProduct() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category>('real-estate');
  const { register, handleSubmit, setValue} = useForm<Product>({
    defaultValues: { currency: 'FCFA', details: {} },
  });

  useEffect(() => {
    if (id && supabase) {
      supabase.from('products').select('*').eq('id', id).single().then(({ data }) => {
        if (data) {
          const product = data as Product;
          Object.entries(product).forEach(([key, value]) => setValue(key as keyof Product, value));
          if (product.details.never_crashed === undefined && product.details.never_crashed === undefined) {
            setValue('details.never_crashed', false);
          }
          setSelectedCategory(product.category);
        }
      });
    }
  }, [id]);

  const onSubmit = async (formData: Product) => {
    if (!supabase) return;

    // Nettoyage des champs vides
    const cleanedDetails: Record<string, unknown> = {};
    if (formData.details) {
      Object.entries(formData.details).forEach(([key, value]) => {
        if (value !== '' && value !== undefined && value !== null) {
          cleanedDetails[key] = value;
        }
      });
    }
    const payload = { ...formData, details: cleanedDetails };

    if (isEditing) {
      await supabase.from('products').update(payload).eq('id', id);
    } else {
      await supabase.from('products').insert(payload);
    }
    navigate('/admin');
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto bg-white min-h-screen">
      <Link to="/admin" className="flex items-center gap-2 text-muted-400 hover:text-dark-800 mb-6">
        <ArrowLeft size={20} /> Retour au dashboard
      </Link>
      <h1 className="text-3xl font-bold text-dark-800 mb-8">
        {isEditing ? '✏️ Modifier le bien' : '➕ Ajouter un bien'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ===== ÉTAPE 1 : CATÉGORIE ===== */}
        <div className="bg-light-100 border border-light-300 rounded-xl p-5">
          <h2 className="font-bold text-dark-800 mb-4">📂 Catégorie du bien</h2>
          <select
            {...register('category')}
            onChange={(e) => setSelectedCategory(e.target.value as Category)}
            className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800 font-medium"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* ===== ÉTAPE 2 : INFORMATIONS GÉNÉRALES ===== */}
        <div className="bg-light-100 border border-light-300 rounded-xl p-5 space-y-4">
          <h2 className="font-bold text-dark-800">📋 Informations générales</h2>

          <div>
            <label className="block text-sm font-medium text-dark-800 mb-1">Titre du bien *</label>
            <input
              {...register('title', { required: true })}
              placeholder="Ex: Villa moderne avec piscine"
              className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-800 mb-1">Prix (FCFA) *</label>
            <input
              type="number"
              {...register('price', { required: true })}
              placeholder="Ex: 45000000"
              className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-800 mb-1">URL de l'image *</label>
            <input
              {...register('image_url', { required: true })}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-800 mb-1">Description</label>
            <textarea
              rows={3}
              {...register('description')}
              placeholder="Décrivez le bien en quelques phrases..."
              className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800"
            />
          </div>
        </div>

        {/* ===== IMMOBILIER ===== */}
        {selectedCategory === 'real-estate' && (
          <div className="bg-light-100 border border-light-300 rounded-xl p-5 space-y-4">
            <h2 className="font-bold text-dark-800">🏠 Détails immobiliers</h2>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Type de bien</label>
              <select {...register('details.type')} className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800">
                {realEstateTypes.map((t) => (
                  <option key={t} value={t.toLowerCase()}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Localisation</label>
              <input {...register('details.location')} placeholder="Ex: Cotonou, Quartier Résidentiel" className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-800 mb-1">Surface (m²)</label>
                <input type="number" {...register('details.surface')} placeholder="250" className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-800 mb-1">Nombre de pièces</label>
                <input type="number" {...register('details.rooms')} placeholder="5" className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800" />
              </div>
            </div>
          </div>
        )}

        {/* ===== VÉHICULE ===== */}
        {selectedCategory === 'vehicle' && (
          <div className="bg-light-100 border border-light-300 rounded-xl p-5 space-y-4">
            <h2 className="font-bold text-dark-800">🚗 Détails du véhicule</h2>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Type de véhicule</label>
              <select {...register('details.type')} className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800">
                {vehicleTypes.map((t) => (
                  <option key={t} value={t.toLowerCase()}>{t}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-800 mb-1">Marque</label>
                <select {...register('details.brand')} className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800">
                  <option value="">Sélectionner</option>
                  {carBrands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-800 mb-1">Modèle</label>
                <input {...register('details.model')} placeholder="Ex: Hilux, Classe C..." className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-800 mb-1">Année</label>
                <input type="number" {...register('details.year')} placeholder="2022" className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-800 mb-1">Kilométrage</label>
                <input type="number" {...register('details.mileage')} placeholder="35000" className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-800 mb-1">Carburant</label>
                <select {...register('details.fuel')} className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800">
                  <option value="">Sélectionner</option>
                  {fuels.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Transmission</label>
              <select {...register('details.transmission')} className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800">
                <option value="">Sélectionner</option>
                {transmissions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Case "Jamais accidenté" */}
            <div className="flex items-center gap-3 bg-white border border-light-300 rounded-lg p-4">
              <input
                type="checkbox"
                {...register('details.never_crashed')}
                className="w-5 h-5 accent-gold-400 rounded"
              />
              <label className="text-sm font-medium text-dark-800">
                ✅ Véhicule jamais accidenté
              </label>
            </div>
          </div>
        )}

        {/* ===== IT ===== */}
        {selectedCategory === 'it' && (
          <div className="bg-light-100 border border-light-300 rounded-xl p-5 space-y-4">
            <h2 className="font-bold text-dark-800">🖥️ Détails informatiques</h2>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Type d'équipement</label>
              <select {...register('details.type')} className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800">
                {itTypes.map((t) => (
                  <option key={t} value={t.toLowerCase()}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Marque</label>
              <select {...register('details.brand_manufacturer')} className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800">
                <option value="">Sélectionner</option>
                {itBrands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Spécifications techniques</label>
              <textarea rows={2} {...register('details.specifications')} placeholder="Ex: Intel Xeon, 16Go RAM, 2x 1To HDD" className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800" />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Garantie</label>
              <select {...register('details.warranty')} className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800">
                <option value="">Sélectionner</option>
                <option value="6 mois">6 mois</option>
                <option value="1 an">1 an</option>
                <option value="2 ans">2 ans</option>
                <option value="3 ans">3 ans</option>
                <option value="5 ans">5 ans</option>
                <option value="Garantie à vie">Garantie à vie</option>
              </select>
            </div>
          </div>
        )}

        {/* ===== ÉLECTRONIQUE ===== */}
        {selectedCategory === 'electronics' && (
          <div className="bg-light-100 border border-light-300 rounded-xl p-5 space-y-4">
            <h2 className="font-bold text-dark-800">📺 Détails électronique / électroménager</h2>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Type d'appareil</label>
              <select {...register('details.type')} className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800">
                {electronicTypes.map((t) => (
                  <option key={t} value={t.toLowerCase()}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Marque</label>
              <select {...register('details.brand_manufacturer')} className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800">
                <option value="">Sélectionner</option>
                {electronicBrands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Spécifications</label>
              <textarea rows={2} {...register('details.specifications')} placeholder="Ex: 55 pouces, QLED, Smart TV, 4K" className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800" />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Garantie</label>
              <select {...register('details.warranty')} className="w-full bg-white border border-light-300 rounded-lg px-4 py-3 text-dark-800">
                <option value="">Sélectionner</option>
                <option value="6 mois">6 mois</option>
                <option value="1 an">1 an</option>
                <option value="2 ans">2 ans</option>
                <option value="3 ans">3 ans</option>
                <option value="5 ans">5 ans</option>
              </select>
            </div>
          </div>
        )}

        {/* ===== BOUTON DE SOUMISSION ===== */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-500 text-white w-full py-4 rounded-full font-semibold text-lg transition shadow-lg shadow-gold-400/25"
        >
          <Save size={20} />
          {isEditing ? '💾 Modifier le bien' : '✅ Publier le bien'}
        </button>
      </form>
    </div>
  );
}