import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart, Mail, MapPin, Phone, User } from 'lucide-react';

const Footer = ({ t }) => {
    return (
        <footer style={{
            background: 'var(--brand-dark)',
            color: 'white',
            paddingTop: '4rem',
            paddingBottom: '2rem',
            marginTop: 'auto'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '3rem'
            }}>
                {/* Brand Column */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                        <img src="/logo-new.jpg" alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }} />
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 700 }}>FinPath</h3>
                    </div>
                    <p style={{ color: '#a0aec0', lineHeight: 1.6, marginBottom: '2rem' }}>
                        {t('footer_brand_desc')}
                    </p>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                            <a key={i} href="#" style={{
                                color: 'white',
                                background: 'rgba(255,255,255,0.1)',
                                padding: '8px',
                                borderRadius: '50%',
                                display: 'flex',
                                transition: 'all 0.3s'
                            }} className="hover:bg-brand-primary">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--brand-accent)' }}>{t('footer_links')}</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { key: 'nav_home', label: t('nav_home') },
                            { key: 'nav_track', label: t('nav_track') },
                            { key: 'nav_schemes', label: t('nav_schemes') },
                            { key: 'nav_calc', label: t('nav_calc') },
                            { key: 'login_btn', label: t('login_btn') }
                        ].map((item) => (
                            <li key={item.key}>
                                <a href="#" style={{ color: '#cbd5e0', textDecoration: 'none', transition: 'color 0.2s' }}
                                    className="hover:text-white">
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--brand-accent)' }}>{t('footer_contact')}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '15px', color: '#cbd5e0' }}>
                            <User size={20} color="var(--brand-primary)" />
                            <span>{t('contact_name')}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', color: '#cbd5e0' }}>
                            <Mail size={20} color="var(--brand-primary)" />
                            <span>k.khushikumari.mail@gmail.com</span>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', color: '#cbd5e0' }}>
                            <MapPin size={20} color="var(--brand-primary)" />
                            <span>{t('contact_location')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                borderTop: '1px solid rgba(255,255,255,0.1)',
                marginTop: '4rem',
                paddingTop: '2rem',
                textAlign: 'center',
                color: '#718096',
                fontSize: '0.9rem'
            }}>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                    &copy; 2026 FinPath. {t('footer_made_with')} <Heart size={14} color="#e53e3e" fill="#e53e3e" /> {t('footer_for_bharat')}.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
