import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WizardPage from './pages/WizardPage';
import BriefPage from './pages/BriefPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import DemoControls from './components/layout/DemoControls';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/wizard" element={<WizardPage />} />
            <Route path="/brief" element={<BriefPage />} />
          </Routes>
        </main>
        <Footer />
        <DemoControls />
      </div>
    </Router>
  );
};

export default App;
