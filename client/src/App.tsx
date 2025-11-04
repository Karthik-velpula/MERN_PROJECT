import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DecorationPage from './pages/services/DecorationPage';
import PhotographyPage from './pages/services/PhotographyPage';
import CateringPage from './pages/services/CateringPage';
import EntertainmentPage from './pages/services/EntertainmentPage';
import MakeupPage from './pages/services/MakeupPage';
import Cart from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/services/decoration" 
                element={
                  <ProtectedRoute>
                    <DecorationPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/services/photography" 
                element={
                  <ProtectedRoute>
                    <PhotographyPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/services/catering" 
                element={
                  <ProtectedRoute>
                    <CateringPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/services/entertainment" 
                element={
                  <ProtectedRoute>
                    <EntertainmentPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/services/makeup" 
                element={
                  <ProtectedRoute>
                    <MakeupPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/cart" 
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;