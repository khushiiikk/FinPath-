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
import About from './components/About';
import UserProfile from './components/UserProfile';
import { translations } from './data/translations';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en');

  // Translation Helper
  const t = (key) => translations[language][key] || translations['en'][key] || key;

  // Intercept tab changes to enforce auth
  const handleTabChange = (tab) => {
    if (tab === 'home' || tab === 'login' || tab === 'about') {
      setActiveTab(tab);
    } else if (isAuthenticated) {
      setActiveTab(tab);
    } else {
      // User is not logged in, redirect to login
      setActiveTab('login');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActiveTab('login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={handleTabChange} t={t} />;
      case 'login':
        return <LoginPage setActiveTab={handleTabChange} setIsAuthenticated={setIsAuthenticated} setUser={setUser} t={t} />;
      case 'expenses':
        return <ExpenseTracker t={t} />;
      case 'schemes':
        return <SchemeRecommender t={t} />;
      case 'chatbot':
        return <Chatbot setActiveTab={handleTabChange} user={user} t={t} />;
      case 'calculator':
        return <FinancialCalculator t={t} />;
      case 'about':
        return <About t={t} />;
      case 'profile':
        return <UserProfile user={user} onLogout={handleLogout} setUser={setUser} t={t} language={language} />;
      default:
        return <Home setActiveTab={handleTabChange} t={t} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', background: '#f8f9fa' }}>
      {/* Hide Navbar on Login page for cleaner look */}
      {activeTab !== 'login' && <Navbar activeTab={activeTab} setActiveTab={handleTabChange} user={user} language={language} setLanguage={setLanguage} t={t} />}

      <main style={{ flexGrow: 1 }}>
        {activeTab === 'home' || activeTab === 'login' || activeTab === 'about' ? renderContent() : (
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
      {activeTab !== 'login' && <Footer t={t} />}
    </div>
  );
}

export default App;
