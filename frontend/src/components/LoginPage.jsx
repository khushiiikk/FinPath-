import React, { useState } from 'react';
import { ArrowRight, Lock, Phone, Sprout } from 'lucide-react';
import DoodleBackground from './DoodleBackground';

const LoginPage = ({ setActiveTab, setIsAuthenticated, setUser, t }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [village, setVillage] = useState('');
    const [userState, setUserState] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('phone'); // 'phone' or 'otp'
    const [loading, setLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const INDIAN_STATES = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    // Hardcoded OTP for demo
    const DEMO_OTP = '1234';

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        // Validation
        if (isSignup) {
            if (name.trim().length < 2) {
                alert('Please enter your name');
                return;
            }
            if (!age || age < 5 || age > 100) {
                alert('Please enter a valid age');
                return;
            }
            if (!village.trim()) {
                alert('Please enter your village');
                return;
            }
            if (!userState) {
                alert('Please select your state');
                return;
            }
        }
        if (phoneNumber.length === 10) {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                setLoading(false);
                setStep('otp');
            }, 1000);
        } else {
            alert('Please enter a valid 10-digit number');
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API verification
        setTimeout(() => {
            setLoading(false);
            if (otp === DEMO_OTP) {
                // Set User State based on mode
                const userProfile = {
                    name: isSignup ? name : 'User',
                    phone: phoneNumber,
                    age: isSignup ? age : '',
                    village: isSignup ? village : '',
                    state: isSignup ? userState : '',
                    role: 'member'
                };

                setUser(userProfile);
                setIsAuthenticated(true);
                alert(isSignup ? 'Account Created Successfully!' : 'Login Successful!');
                setActiveTab('home');
            } else {
                alert('Invalid OTP. Try 1234');
            }
        }, 1000);
    };

    return (
        <div className="login-container" style={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <DoodleBackground color="rgba(83, 118, 145, 0.2)" />

            <div className="login-card" style={{
                background: 'white',
                borderRadius: '24px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
                display: 'flex',
                overflow: 'hidden',
                maxWidth: '1000px',
                width: '90%',
                minHeight: '600px',
                zIndex: 10,
                animation: 'slideUp 0.8s ease-out'
            }}>

                {/* Left Side - Welcome */}
                <div className="login-intro" style={{
                    flex: 1.2,
                    background: 'var(--brand-dark)',
                    color: 'white',
                    padding: '4rem 3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Subtle design element */}
                    <div style={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-10%',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(233, 222, 203, 0.1) 0%, transparent 70%)',
                        borderRadius: '50%'
                    }}></div>

                    <div>
                        <div className="logo" style={{ marginBottom: '3rem', opacity: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    background: 'var(--brand-accent)',
                                    color: 'var(--brand-dark)',
                                    padding: '10px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                }}>
                                    <Sprout size={24} />
                                </div>
                                <span style={{
                                    fontFamily: 'var(--font-serif)',
                                    fontSize: '1.8rem',
                                    fontWeight: 700,
                                    letterSpacing: '-1px'
                                }}>FinPath</span>
                            </div>
                        </div>

                        <h2 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem', lineHeight: 1.2, whiteSpace: 'pre-line' }}>
                            {isSignup ? t('signup_title') : t('login_welcome')}
                        </h2>
                        <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.6, maxWidth: '90%' }}>
                            {isSignup
                                ? t('signup_subtitle')
                                : t('login_subtitle')}
                        </p>
                    </div>

                    <div className="testimonial" style={{
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(10px)',
                        padding: '1.8rem',
                        borderRadius: '20px',
                        marginTop: '2rem',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <p style={{ fontStyle: 'italic', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.5 }}>
                            {t('testimonial_text')}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '45px',
                                height: '45px',
                                background: 'var(--brand-light)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                color: 'var(--brand-dark)'
                            }}>L</div>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{t('testimonial_name')}</div>
                                <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{t('testimonial_desc')}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="login-form-wrapper" style={{
                    flex: 1,
                    padding: '4rem 3.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: 'white'
                }}>
                    <h3 style={{ fontSize: '2.2rem', color: 'var(--brand-dark)', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>
                        {step === 'otp' ? t('login_otp_verify') : (isSignup ? t('login_create_acc') : t('login_btn'))}
                    </h3>
                    <p style={{ color: '#666', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
                        {step === 'otp'
                            ? `${t('login_otp_sent')} ${phoneNumber} `
                            : (isSignup ? t('login_enter_details') : t('login_enter_mobile'))}
                    </p>

                    {step === 'phone' ? (
                        <form onSubmit={handlePhoneSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {isSignup && (
                                <>
                                    <div className="form-group">
                                        <label className="form-label">{t('label_fullname')}</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder={t('placeholder_name')}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <div className="form-group" style={{ flex: 1 }}>
                                            <label className="form-label">{t('label_age')}</label>
                                            <input
                                                type="number"
                                                className="form-input"
                                                placeholder={t('placeholder_age')}
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group" style={{ flex: 2 }}>
                                            <label className="form-label">{t('label_village')}</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder={t('placeholder_village')}
                                                value={village}
                                                onChange={(e) => setVillage(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">{t('label_state')}</label>
                                        <select
                                            className="form-input"
                                            value={userState}
                                            onChange={(e) => setUserState(e.target.value)}
                                            style={{ background: 'white' }}
                                        >
                                            <option value="">{t('select_state')}</option>
                                            {INDIAN_STATES.map(s => (
                                                <option key={s} value={s}>
                                                    {t(`state_${s.toLowerCase().replace(/ /g, '_')}`)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label className="form-label">{t('label_phone')}</label>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--brand-primary)' }} />
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="98765 43210"
                                        style={{ paddingLeft: '3.5rem' }}
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="primary-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                                {loading ? '...' : (isSignup ? t('signup_btn') : t('login_btn_continue'))} <ArrowRight size={18} />
                                {loading && <span className="loader"></span>}
                            </button>

                            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                <span style={{ color: '#666', fontSize: '0.95rem' }}>
                                    {isSignup ? t('login_already_have') : t('login_new_user')}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSignup(!isSignup);
                                        setStep('phone');
                                        setName('');
                                        setAge('');
                                        setVillage('');
                                        setUserState('');
                                        setPhoneNumber('');
                                    }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--brand-primary)',
                                        cursor: 'pointer',
                                        fontWeight: 700,
                                        marginLeft: '8px',
                                        fontSize: '0.95rem'
                                    }}>
                                    {isSignup ? t('login_btn') : t('login_create_acc')}
                                </button>
                            </div>

                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="form-group">
                                <label className="form-label">
                                    {t('login_otp_enter')} <span style={{ color: 'var(--brand-primary)', fontWeight: 'bold', marginLeft: '5px' }}>{t('login_otp_hint')}</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--brand-primary)' }} />
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="• • • •"
                                        style={{ paddingLeft: '3.5rem', letterSpacing: '0.8rem' }}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.slice(0, 4))}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="primary-btn" style={{ width: '100%', justifyContent: 'center' }}>
                                {loading ? '...' : (isSignup ? t('login_btn_complete') : t('login_btn'))} <ArrowRight size={18} />
                            </button>
                            <div style={{ textAlign: 'center' }}>
                                <button type="button" onClick={() => setStep('phone')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}>{t('login_change_num')}</button>
                            </div>

                        </form>
                    )}

                    <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#999', lineHeight: 1.4 }}>
                        {t('auth_legal_prefix')} {isSignup ? t('auth_legal_register') : t('auth_legal_login')} {t('auth_legal_agree')} <br />
                        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>{t('auth_terms')}</span> {t('auth_and')} <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>{t('auth_privacy')}</span>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
