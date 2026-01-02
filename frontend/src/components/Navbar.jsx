import React from 'react';
import { Layers, User, Globe } from 'lucide-react';
import { languages } from '../data/translations';

const Navbar = ({ activeTab, setActiveTab, user, language, setLanguage, t }) => {
    return (
        <div className="navbar-container">
            <nav className="navbar">

                {/* Logo Section */}
                <div className="logo" onClick={() => setActiveTab('home')}>
                    <img src="/logo-new.jpg" alt="FinPath Logo" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white' }} />
                    <span className="logo-text">FinPath</span>
                </div>

                {/* Center Links */}
                <div className="nav-links" style={{ display: 'flex', gap: '5px' }}>
                    {[
                        { id: 'home', label: t('nav_home') },
                        { id: 'track', label: t('nav_track') },
                        { id: 'schemes', label: t('nav_schemes') },
                        { id: 'chatbot', label: t('nav_chatbot') },
                        { id: 'calc', label: t('nav_calc') },
                        { id: 'about', label: t('nav_about') }
                    ].map((item) => {
                        const key = item.id;
                        const isActive = activeTab === key ||
                            (key === 'track' && activeTab === 'expenses') ||
                            (key === 'calc' && activeTab === 'calculator');
                        return (
                            <button
                                key={key}
                                onClick={() => setActiveTab(
                                    key === 'track' ? 'expenses' :
                                        key === 'calc' ? 'calculator' :
                                            key
                                )}
                                className={`nav-btn ${isActive ? 'active' : ''}`}
                            >
                                {item.label}
                            </button>
                        )
                    })}
                </div>

                {/* Right Actions */}
                <div className="nav-actions" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>

                    {/* Language Switcher */}
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Globe size={16} color="#bbb" style={{ marginRight: '5px' }} />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#cbd5e0',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                outline: 'none',
                                fontWeight: 500,
                                appearance: 'none', // Hide default arrow on some browsers
                                paddingRight: '1rem'
                            }}
                        >
                            {languages.map(lang => (
                                <option key={lang.code} value={lang.code} style={{ color: 'black' }}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>Hi, {user.name}</span>
                            <button
                                onClick={() => setActiveTab('profile')}
                                style={{
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    background: 'var(--brand-primary)',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: 'white'
                                }}
                            >
                                <User size={18} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setActiveTab('login')}
                            className="login-btn"
                        >
                            {t('login_btn')}
                        </button>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
