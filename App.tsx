
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { Country, UserSession } from './types';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Payment from './pages/Payment';
import CountrySelect from './pages/CountrySelect';
import Hub from './pages/Hub';
import Mines from './pages/Mines';
import Generator from './pages/Generator';
import AutoGenerator from './pages/AutoGenerator';
import PossibleGenerator from './pages/PossibleGenerator';

// Components
import BootScreen from './components/BootScreen';
import BottomNav from './components/BottomNav';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = sessionStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [session, setSession] = useState<UserSession>({
    isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true',
    email: sessionStorage.getItem('userEmail'),
    country: sessionStorage.getItem('selectedCountry') as Country | null,
  });

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 3000);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('userEmail', user.email || '');
        setSession(prev => ({ ...prev, isAuthenticated: true, email: user.email }));
      }
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  if (booting) return <BootScreen />;

  return (
    <HashRouter>
      <div className="min-h-screen relative pb-20 md:pb-0">
        <div className="scanline"></div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login setSession={setSession} />} />
          <Route path="/payment" element={<Payment />} />
          
          <Route path="/paises" element={
            <ProtectedRoute>
              <CountrySelect setSession={setSession} />
            </ProtectedRoute>
          } />
          
          <Route path="/hub" element={
            <ProtectedRoute>
              <Hub setSession={setSession} session={session} />
            </ProtectedRoute>
          } />

          <Route path="/mines" element={
            <ProtectedRoute>
              {/* Fix: Pass session prop to Mines component */}
              <Mines session={session} />
            </ProtectedRoute>
          } />

          <Route path="/generator" element={
            <ProtectedRoute>
              <Generator session={session} />
            </ProtectedRoute>
          } />

          <Route path="/auto" element={
            <ProtectedRoute>
              <AutoGenerator session={session} />
            </ProtectedRoute>
          } />

          <Route path="/possible" element={
            <ProtectedRoute>
              <PossibleGenerator session={session} />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <BottomNav session={session} />
      </div>
    </HashRouter>
  );
};

export default App;
