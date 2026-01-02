
import React, { useState } from 'react';
import { ArrowRight, Lock, Phone } from 'lucide-react';

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
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
            <div className="login-card" style={{
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                display: 'flex',
                overflow: 'hidden',
                maxWidth: '900px',
                width: '95%',
                minHeight: '500px'
            }}>

                {/* Left Side - Welcome */}
                <div className="login-intro" style={{
                    flex: 1,
                    background: 'var(--brand-dark)',
                    color: 'white',
                    padding: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            width: 'fit-content',
                            padding: '0.5rem 1rem',
                            borderRadius: '50px',
                            marginBottom: '2rem'
                        }}>FinPath</div>
                        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem', whiteSpace: 'pre-line' }}>
                            {isSignup ? 'Start Your Journey' : t('login_welcome')}
                        </h2>
                        <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
                            {isSignup
                                ? "Create an account to track your wealth, find schemes, and plan your future."
                                : t('login_subtitle')}
                        </p>
                    </div>

                    <div className="testimonial" style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '1.5rem',
                        borderRadius: '15px',
                        marginTop: '2rem'
                    }}>
                        <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                            "I saved ₹5000 in just 3 months using FinPath scheme recommendations."
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', background: '#ccc', borderRadius: '50%' }}></div>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>Lakshmi Devi</div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>SME Owner, Bihar</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="login-form-wrapper" style={{
                    flex: 1,
                    padding: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--brand-dark)', marginBottom: '0.5rem' }}>
                        {step === 'otp' ? t('login_otp_verify') : (isSignup ? 'Create Account' : t('login_btn'))}
                    </h3>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>
                        {step === 'otp'
                            ? `${t('login_otp_sent')} ${phoneNumber}`
                            : (isSignup ? t('login_enter_details') : t('login_enter_mobile'))}
                    </p>

                    {step === 'phone' ? (
                        <form onSubmit={handlePhoneSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* Name Input (Only for Signup) */}
                            {isSignup && (
                                <>
                                    <div className="input-group">
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#444' }}>{t('label_fullname')}</label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type="text"
                                                placeholder={t('placeholder_name')}
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <div className="input-group" style={{ flex: 1 }}>
                                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#444' }}>{t('label_age')}</label>
                                            <input
                                                type="number"
                                                placeholder={t('placeholder_age')}
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }}
                                            />
                                        </div>
                                        <div className="input-group" style={{ flex: 2 }}>
                                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#444' }}>{t('label_village')}</label>
                                            <input
                                                type="text"
                                                placeholder={t('placeholder_village')}
                                                value={village}
                                                onChange={(e) => setVillage(e.target.value)}
                                                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#444' }}>{t('label_state')}</label>
                                        <select
                                            value={userState}
                                            onChange={(e) => setUserState(e.target.value)}
                                            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', background: 'white' }}
                                        >
                                            <option value="">{t('select_state')}</option>
                                            {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </>
                            )}

                            <div className="input-group">
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#444' }}>{t('hero_track').split(' ')[0]} Number</label>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                    <input
                                        type="text"
                                        placeholder="98765 43210"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem 1rem 0.8rem 3rem',
                                            borderRadius: '10px',
                                            border: '1px solid #ddd',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="primary-btn" style={{ width: '100%', justifyContent: 'center' }}>
                                {loading ? 'Sending OTP...' : (isSignup ? t('signup_btn') : t('login_btn_continue'))} <ArrowRight size={18} />
                            </button>

                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <span style={{ color: '#666', fontSize: '0.9rem' }}>
                                    {isSignup ? "Already have an account?" : t('login_new_user')}
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
                                        fontWeight: 600,
                                        marginLeft: '5px'
                                    }}>
                                    {isSignup ? t('login_btn') : t('login_create_acc')}
                                </button>
                            </div>

                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="input-group">
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#444' }}>
                                    Enter OTP <span style={{ color: 'var(--brand-primary)', fontWeight: 'bold', marginLeft: '5px' }}>(Tip: Use 1234)</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                    <input
                                        type="text"
                                        placeholder="• • • •"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.slice(0, 4))}
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem 1rem 0.8rem 3rem',
                                            borderRadius: '10px',
                                            border: '1px solid #ddd',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            letterSpacing: '0.5rem'
                                        }}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="primary-btn" style={{ width: '100%', justifyContent: 'center' }}>
                                {loading ? 'Verifying...' : (isSignup ? 'Complete Registration' : t('login_btn'))} <ArrowRight size={18} />
                            </button>
                            <div style={{ textAlign: 'center' }}>
                                <button type="button" onClick={() => setStep('phone')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}>Change Number</button>
                            </div>

                        </form>
                    )}

                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: '#999' }}>
                        By {isSignup ? 'registering' : 'logging in'}, you agree to our Terms & Privacy Policy.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
