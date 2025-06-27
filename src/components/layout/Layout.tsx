import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/' || location.pathname === '/landing';
  
  console.log('🏗️ Layout render - pathname:', location.pathname, 'isLandingPage:', isLandingPage);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation - cachée sur la landing page ou avec style différent */}
      {!isLandingPage && <Navigation />}
      
      {/* Contenu principal */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
