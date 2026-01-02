import React from 'react';
import { Layers } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
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
                    {['Home', 'Track', 'Schemes', 'Chatbot', 'Calc'].map((item) => {
                        const key = item.toLowerCase();
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
                                {item}
                            </button>
                        )
                    })}
                </div>

                {/* Right Actions */}
                <div className="nav-actions" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <button className="lang-btn" style={{
                        background: 'none',
                        border: 'none',
                        color: '#bbb',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}>
                        English
                    </button>
                    <button
                        onClick={() => setActiveTab('login')}
                        className="login-btn"
                    >
                        Log in
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
