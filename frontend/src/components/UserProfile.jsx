import React, { useState, useRef } from 'react';
import { User, Phone, LogOut, Shield, Award, Camera, CheckCircle } from 'lucide-react';

const UserProfile = ({ user, onLogout, setUser, t }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const fileInputRef = useRef(null);

    if (!user) return null;

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser({ ...user, profilePhoto: reader.result });
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerUpload = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="page-card animate-fade-in" style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div
                    onClick={triggerUpload}
                    style={{
                        width: '120px',
                        height: '120px',
                        background: 'var(--brand-primary)',
                        borderRadius: '50%',
                        margin: '0 auto 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        boxShadow: '0 10px 25px rgba(49, 130, 206, 0.3)',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '4px solid white'
                    }}
                    className="profile-photo-container"
                >
                    {user.profilePhoto ? (
                        <img
                            src={user.profilePhoto}
                            alt="Profile"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        user.name ? user.name.charAt(0).toUpperCase() : 'U'
                    )}
                    <div className="photo-overlay" style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '35%',
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: '0.3s'
                    }}>
                        <Camera size={20} color="white" />
                    </div>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />

                {showSuccess && (
                    <div style={{
                        color: '#38a169',
                        fontSize: '0.9rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                    }}>
                        <CheckCircle size={16} /> {t('profile_photo_success')}
                    </div>
                )}

                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--brand-dark)' }}>
                    {user.name || 'User'}
                </h2>
                <p style={{ color: '#718096' }}>FinPath Member</p>
            </div>

            <div style={{ background: '#f7fafc', borderRadius: '15px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--brand-dark)', marginBottom: '1rem' }}>{t('profile_title')}</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                        <Phone size={20} color="var(--brand-primary)" />
                        <div>
                            <div style={{ fontSize: '0.85rem', color: '#718096' }}>{t('hero_track').split(' ')[0]} Number</div>
                            <div style={{ fontWeight: 600, color: '#2d3748' }}>{user.phone}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                        <User size={20} color="var(--brand-primary)" />
                        <div>
                            <div style={{ fontSize: '0.85rem', color: '#718096' }}>{t('profile_age')}</div>
                            <div style={{ fontWeight: 600, color: '#2d3748' }}>{user.age || 'N/A'}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                        <Shield size={20} color="var(--brand-primary)" />
                        <div>
                            <div style={{ fontSize: '0.85rem', color: '#718096' }}>{t('profile_village')}</div>
                            <div style={{ fontWeight: 600, color: '#2d3748' }}>{user.village || 'N/A'}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                        <Award size={20} color="var(--brand-primary)" />
                        <div>
                            <div style={{ fontSize: '0.85rem', color: '#718096' }}>{t('profile_state')}</div>
                            <div style={{ fontWeight: 600, color: '#2d3748' }}>
                                {user.state ? t(`state_${user.state.toLowerCase().replace(/ /g, '_')}`) : 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={onLogout}
                className="primary-btn"
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    background: '#e53e3e',
                    border: 'none',
                    marginTop: '1rem'
                }}
            >
                <LogOut size={18} /> {t('logout_btn')}
            </button>
        </div>
    );
};

export default UserProfile;
