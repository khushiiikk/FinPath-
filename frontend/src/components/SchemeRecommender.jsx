import React, { useState } from 'react';
import { Layers, ArrowRight, User } from 'lucide-react';

const SchemeRecommender = () => {
    const [profile, setProfile] = useState({
        age: '',
        gender: 'female',
        occupation: 'farmer',
        income: ''
    });

    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    const schemesData = [
        {
            name: "PM Mudra Yojana",
            benefit: "Loans up to ₹10 Lakhs for small businesses.",
            eligibility: ["shopkeeper", "artisan", "weaver", "micro-entrepreneur", "farmer"],
            minAge: 18,
            maxAge: 65
        },
        {
            name: "Atal Pension Yojana",
            benefit: "Guaranteed pension of ₹1000-₹5000/month after 60.",
            eligibility: ["all"],
            minAge: 18,
            maxAge: 40
        },
        {
            name: "Mahila Samman Savings Certificate",
            benefit: "7.5% interest rate for 2 years tenure.",
            eligibility: ["all"],
            gender: "female",
            minAge: 0,
            maxAge: 100
        },
        {
            name: "PM Kisan Samman Nidhi",
            benefit: "₹6000 per year income support.",
            eligibility: ["farmer"],
            minAge: 18,
            maxAge: 100
        }
    ];

    const [showOtherOccupation, setShowOtherOccupation] = useState(false);
    const [expandedScheme, setExpandedScheme] = useState(null);

    const toggleDetails = (id) => {
        setExpandedScheme(expandedScheme === id ? null : id);
    };

    const handleOccupationChange = (e) => {
        const val = e.target.value;
        if (val === 'other') {
            setShowOtherOccupation(true);
            setProfile({ ...profile, occupation: '' });
        } else {
            setShowOtherOccupation(false);
            setProfile({ ...profile, occupation: val });
        }
    };

    const getRecommendations = async () => {
        setLoading(true);

        try {
            // Note: Ideally, this connects to the backend /api/recommend endpoint
            // For now, we are simulating the behavior with the updated detailed data locally 
            // to ensure meaningful demo results without needing the python server running perfectly immediately.
            // In a real scenario, uncomment the fetch call.

            const response = await fetch('http://localhost:8000/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    age: parseInt(profile.age) || 25,
                    gender: profile.gender,
                    occupation: profile.occupation || "Unemployed",
                    income: parseInt(profile.income) || 0
                })
            });

            if (response.ok) {
                const data = await response.json();
                setRecommendations(data.recommendations);
            } else {
                // Fallback simulation if backend is offline
                console.warn("Backend offline, using simulation");
                setRecommendations([
                    {
                        id: 1,
                        name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
                        benefit: "Zero balance account, RuPay card with ₹2L accident cover.",
                        matchScore: 95,
                        details: "Pradhan Mantri Jan Dhan Yojana (PMJDY) aims to ensure comprehensive financial inclusion. Offers: (1) Basic Savings Bank Deposit (BSBD) account. (2) Free RuPay debit card with accident insurance cover of Rs. 2 lakh. (3) Overdraft upto Rs. 10,000."
                    },
                    {
                        id: 2,
                        name: "Atal Pension Yojana (APY)",
                        benefit: "Guaranteed pension of ₹1000-₹5000/month after age 60.",
                        matchScore: 88,
                        details: "The Government launched APY to encourage workers in unorganized sector to save for retirement. Provides a defined pension of Rs. 1000 to Rs. 5000 per month at age 60, depending on contributions. Minimum age 18, maximum 40."
                    }
                ]);
            }

        } catch (error) {
            console.error("Error fetching recommendations", error);
            // Fallback
            setRecommendations([
                {
                    id: 1,
                    name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
                    benefit: "Zero balance account, RuPay card with ₹2L accident cover.",
                    matchScore: 95,
                    details: "Provides universal access to banking facilities with at least one basic banking account for every household, financial literacy, access to credit, insurance and pension facility."
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    return (
        <div className="page-card animate-fade-in">
            <h2 className="page-title" style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Layers size={28} color="var(--brand-primary)" /> Scheme Recommender
            </h2>
            <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
                Enter your details to generate a <strong>Detailed Scheme Report</strong> tailored for you.
            </p>

            <div className="scheme-form-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <div className="form-group">
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={profile.age}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g. 35"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Income (Annual)</label>
                    <input
                        type="number"
                        name="income"
                        value={profile.income}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g. 50000"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Occupation</label>
                    <select
                        onChange={handleOccupationChange}
                        className="form-input"
                        defaultValue="farmer"
                    >
                        <option value="farmer">Farmer</option>
                        <option value="shopkeeper">Shopkeeper</option>
                        <option value="laborer">Daily Laborer</option>
                        <option value="student">Student</option>
                        <option value="homemaker">Homemaker</option>
                        <option value="other">Other (Type below)</option>
                    </select>
                    {showOtherOccupation && (
                        <input
                            type="text"
                            name="occupation"
                            value={profile.occupation}
                            onChange={handleChange}
                            className="form-input animate-fade-in"
                            placeholder="Type your occupation..."
                            style={{ mt: '10px' }}
                            autoFocus
                        />
                    )}
                </div>
            </div>

            <button
                onClick={getRecommendations}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '1.1rem', padding: '1rem' }}
            >
                {loading ? "Analyzing Profile..." : "Generate Report"}
            </button>

            {recommendations.length > 0 && (
                <div style={{ marginTop: '3rem' }}>
                    <h3 className="page-subtitle" style={{ marginBottom: '1.5rem', fontWeight: 700, borderBottom: '2px solid #edf2f7', paddingBottom: '10px' }}>
                        Recommended Schemes ({recommendations.length})
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {recommendations.map((scheme, idx) => (
                            <div key={idx} className="animate-slide-up" style={{
                                background: 'white',
                                padding: '1.5rem',
                                borderRadius: '15px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                                position: 'relative',
                                animationDelay: `${idx * 0.1}s`
                            }}>
                                {/* Match Tag */}
                                <div style={{
                                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                                    background: scheme.matchScore > 80 ? '#C6F6D5' : '#EBF8FF', // Green or Blue
                                    color: scheme.matchScore > 80 ? '#22543D' : '#2B6CB0',
                                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600
                                }}>
                                    {scheme.matchScore ? `${scheme.matchScore}% Match` : 'Recommended'}
                                </div>

                                <h4 style={{
                                    fontSize: '1.3rem', fontWeight: 700, color: 'var(--brand-dark)', marginBottom: '0.5rem', paddingRight: '100px'
                                }}>{scheme.name}</h4>

                                <p style={{ color: '#4a5568', marginBottom: '1rem', lineHeight: 1.6 }}>{scheme.benefit}</p>

                                {/* Toggle Details */}
                                <button
                                    onClick={() => toggleDetails(scheme.id || idx)}
                                    style={{
                                        background: 'none', border: 'none', color: 'var(--brand-primary)',
                                        fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', padding: 0,
                                        display: 'flex', alignItems: 'center', gap: '5px'
                                    }}
                                >
                                    {expandedScheme === (scheme.id || idx) ? "Hide Details" : "View Detailed Report"} <ArrowRight size={16} />
                                </button>

                                {/* Expanded Details Section */}
                                {expandedScheme === (scheme.id || idx) && (
                                    <div className="animate-fade-in" style={{
                                        marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed #cbd5e0',
                                        color: '#2d3748', lineHeight: '1.7', fontSize: '0.95rem'
                                    }}>
                                        <strong>Scheme Details:</strong><br />
                                        {scheme.text || scheme.details || "Detailed information not available for this scheme."}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchemeRecommender;
