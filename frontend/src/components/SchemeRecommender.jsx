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

    const getRecommendations = () => {
        setLoading(true);
        // Simulate API call or simple local logic
        setTimeout(() => {
            const recs = schemesData.filter(scheme => {
                let matches = true;
                // Age check
                if (profile.age) {
                    const ageVal = parseInt(profile.age);
                    if (ageVal < scheme.minAge || ageVal > scheme.maxAge) matches = false;
                }

                // Gender check
                if (scheme.gender && scheme.gender !== profile.gender) matches = false;

                // Occupation check
                if (!scheme.eligibility.includes("all") && !scheme.eligibility.includes(profile.occupation)) {
                    matches = false;
                }
                return matches;
            });

            // Allow one general scheme if none match?
            if (recs.length === 0) {
                recs.push({
                    name: "Jan Dhan Yojana",
                    benefit: "Zero balance savings account with insurance.",
                    eligibility: "All citizens."
                })
            }

            setRecommendations(recs);
            setLoading(false);
        }, 800);
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
                Enter your details to find government schemes tailored for you.
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
                        name="occupation"
                        value={profile.occupation}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option value="farmer">Farmer</option>
                        <option value="shopkeeper">Shopkeeper</option>
                        <option value="artisan">Artisan/Weaver</option>
                        <option value="laborer">Daily Laborer</option>
                        <option value="homemaker">Homemaker</option>
                    </select>
                </div>
            </div>

            <button
                onClick={getRecommendations}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '1.1rem', padding: '1rem' }}
            >
                {loading ? "Searching..." : "Find Schemes"}
            </button>

            {recommendations.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                    <h3 className="page-subtitle" style={{ marginBottom: '1rem', fontWeight: 700 }}>Recommended for You:</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recommendations.map((scheme, idx) => (
                            <div key={idx} style={{
                                background: 'rgba(83, 118, 145, 0.05)',
                                padding: '1.5rem',
                                borderRadius: '15px',
                                border: '1px solid rgba(83, 118, 145, 0.1)',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <h4 style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    color: 'var(--brand-dark)',
                                    marginBottom: '0.5rem'
                                }}>{scheme.name}</h4>
                                <p style={{ color: '#555', marginBottom: '0.8rem', lineHeight: 1.5 }}>{scheme.benefit}</p>
                                <a href="#" style={{
                                    color: 'var(--brand-primary)',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}>
                                    Learn More <ArrowRight size={16} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchemeRecommender;
