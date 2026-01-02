import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ExpenseTracker from './components/ExpenseTracker';
import SchemeRecommender from './components/SchemeRecommender';
import FinancialCalculator from './components/Calculator';
import Chatbot from './components/Chatbot';
import LoginPage from './components/LoginPage';

import Footer from './components/Footer';
import FloatingBot from './components/FloatingBot';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Intercept tab changes to enforce auth
  const handleTabChange = (tab) => {
    if (tab === 'home' || tab === 'login') {
      setActiveTab(tab);
    } else if (isAuthenticated) {
      setActiveTab(tab);
    } else {
      // User is not logged in, redirect to login
      setActiveTab('login');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={handleTabChange} />;
      case 'login':
        return <LoginPage setActiveTab={handleTabChange} setIsAuthenticated={setIsAuthenticated} />;
      case 'expenses':
        return <ExpenseTracker />;
      case 'schemes':
        return <SchemeRecommender />;
      case 'chatbot':
        return <Chatbot />;
      case 'calculator':
        return <FinancialCalculator />;
      default:
        return <Home setActiveTab={handleTabChange} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', background: '#f8f9fa' }}>
      {/* Hide Navbar on Login page for cleaner look */}
      {activeTab !== 'login' && <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />}

      <main style={{ flexGrow: 1 }}>
        {activeTab === 'home' || activeTab === 'login' ? renderContent() : (
          <div className="page-container">
            {renderContent()}
          </div>
        )}
      </main>

      {/* Floating Chatbot (Visible everywhere except Login and Chatbot page) */}
      {activeTab !== 'login' && activeTab !== 'chatbot' && (
        <FloatingBot onClick={() => handleTabChange('chatbot')} />
      )}

      {/* Footer */}
      {activeTab !== 'login' && <Footer />}
    </div>
  );
}

export default App;
