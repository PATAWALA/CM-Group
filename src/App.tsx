import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/admin/AdminLayout';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import CategoryProducts from './pages/admin/CategoryProducts';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/admin/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddEditProduct from './pages/admin/AddEditProduct';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
        <ScrollToTop/>
          <Routes>
            {/* Routes publiques avec Navbar et Footer */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <main className="flex-1">
                    <HomePage />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/catalog"
              element={
                <>
                  <Navbar />
                  <main className="flex-1">
                    <CatalogPage />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/product/:id"
              element={
                <>
                  <Navbar />
                  <main className="flex-1">
                    <ProductDetailPage />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <>
                  <Navbar />
                  <main className="flex-1">
                    <CartPage />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/checkout"
              element={
                <>
                  <Navbar />
                  <main className="flex-1">
                    <CheckoutPage />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Navbar />
                  <main className="flex-1">
                    <ContactPage />
                  </main>
                  <Footer />
                </>
              }
            />

            {/* Route login admin (publique, sans Navbar ni Footer) */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* Routes admin protégées */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="admins" element={<AdminDashboard />} />
              <Route path="add" element={<AddEditProduct />} />
              <Route path="category/:category" element={<CategoryProducts />} />
              <Route path="edit/:id" element={<AddEditProduct />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}