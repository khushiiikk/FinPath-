import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Shield, Users, Trophy, Coins, Star } from 'lucide-react';
import DoodleBackground from './DoodleBackground';

const Home = ({ setActiveTab, t }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="home-container" style={{ overflowX: 'hidden', position: 'relative' }}>
            {/* Hero Section */}
            <div className="hero-section" style={{ position: 'relative', zIndex: 1 }}>
                <DoodleBackground />
                <div className="hero-content" style={{ position: 'relative', zIndex: 10 }}>

                    {/* Text Content */}
                    <div className="hero-text" style={{
                        transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
                        transition: 'transform 0.1s ease-out'
                    }}>
                        <div className="badge-wrapper animate-slide-down">
                            <span className="badge">{t('badge_bharat')}</span>
                        </div>
                        <h1 className="hero-title animate-text-reveal">
                            {t('hero_title')}
                        </h1>
                        <p className="hero-desc animate-fade-in-up">
                            {t('hero_subtitle')}
                        </p>
                        <div className="cta-group animate-bounce-in">
                            <button
                                onClick={() => setActiveTab('expenses')}
                                className="primary-btn"
                            >
                                {t('cta_start')} <ArrowRight size={18} />
                            </button>
                            <button
                                onClick={() => setActiveTab('schemes')}
                                className="secondary-link"
                            >
                                {t('cta_explore')} →
                            </button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="hero-image-wrapper animate-float" style={{
                        transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                        transition: 'transform 0.1s ease-out'
                    }}>
                        <img
                            src="/hero-new.jpg"
                            alt="Financial Freedom"
                            className="hero-img"
                        />
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="features-grid">
                <div className="feature-card" onClick={() => setActiveTab('expenses')}>
                    <div className="icon-box">
                        <TrendingUp className="w-6 h-6 text-brand-dark" />
                    </div>
                    <h3 className="feature-title">{t('feature_track')}</h3>
                    <p className="feature-desc">{t('feature_track_desc')}</p>
                </div>

                <div className="feature-card" onClick={() => setActiveTab('schemes')}>
                    <div className="icon-box">
                        <Shield className="w-6 h-6 text-brand-dark" />
                    </div>
                    <h3 className="feature-title">{t('feature_schemes')}</h3>
                    <p className="feature-desc">{t('feature_schemes_desc')}</p>
                </div>

                <div className="feature-card" onClick={() => setActiveTab('calculator')}>
                    <div className="icon-box">
                        <Users className="w-6 h-6 text-brand-dark" />
                    </div>
                    <h3 className="feature-title">{t('feature_grow')}</h3>
                    <p className="feature-desc">{t('feature_grow_desc')}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
