
import React, { useState } from 'react';
import { ArrowRight, Lock, Phone } from 'lucide-react';

const LoginPage = ({ setActiveTab, setIsAuthenticated }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('phone'); // 'phone' or 'otp'
    const [loading, setLoading] = useState(false);

    // Hardcoded OTP for demo
    const DEMO_OTP = '1234';

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
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
                setIsAuthenticated(true); // Grant access
                alert('Login Successful!');
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
                        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>
                            Welcome to your <br /> Financial Freedom
                        </h2>
                        <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
                            Join thousands of women in rural India who are taking control of their financial future.
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
                        {step === 'phone' ? 'Get Started' : 'Verify Mobile'}
                    </h3>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>
                        {step === 'phone' ? 'Enter your mobile number to continue' : `OTP sent to + 91 ${phoneNumber} `}
                    </p>

                    {step === 'phone' ? (
                        <form onSubmit={handlePhoneSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="input-group">
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#444' }}>Mobile Number</label>
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
                                {loading ? 'Sending OTP...' : 'Continue'} <ArrowRight size={18} />
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="input-group">
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#444' }}>Enter OTP</label>
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
                                {loading ? 'Verifying...' : 'Login'} <ArrowRight size={18} />
                            </button>
                            <div style={{ textAlign: 'center' }}>
                                <button type="button" onClick={() => setStep('phone')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}>Change Number</button>
                            </div>
                        </form>
                    )}

                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: '#999' }}>
                        By logging in, you agree to our Terms & Privacy Policy.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
