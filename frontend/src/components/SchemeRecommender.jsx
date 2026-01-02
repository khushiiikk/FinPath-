import React, { useState } from 'react';
import { Layers, ArrowRight, User } from 'lucide-react';

const SchemeRecommender = ({ t }) => {
    const [profile, setProfile] = useState({
        age: '',
        gender: 'female',
        occupation: 'farmer',
        income: ''
    });

    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

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
                console.warn("Backend offline, using simulation");
                setRecommendations([
                    {
                        id: 1,
                        keys: {
                            name: "data_pmjdy_name",
                            launched: "data_pmjdy_launched",
                            category: "data_pmjdy_category",
                            about: "data_pmjdy_about",
                            target: "data_pmjdy_target",
                            benefits: "data_pmjdy_benefits",
                            documents: "data_pmjdy_docs",
                            features: "data_pmjdy_features"
                        },
                        min_age: 18,
                        matchScore: 95
                    },
                    {
                        id: 2,
                        keys: {
                            name: "data_pmsby_name",
                            launched: "data_pmsby_launched",
                            category: "data_pmsby_category",
                            about: "data_pmsby_about",
                            target: "data_pmsby_target",
                            benefits: "data_pmsby_benefits",
                            documents: "data_pmsby_docs",
                            features: "data_pmsby_features"
                        },
                        min_age: 18,
                        matchScore: 92
                    },
                    {
                        id: 3,
                        keys: {
                            name: "data_pmjjby_name",
                            launched: "data_pmjjby_launched",
                            category: "data_pmjjby_category",
                            about: "data_pmjjby_about",
                            target: "data_pmjjby_target",
                            benefits: "data_pmjjby_benefits",
                            documents: "data_pmjjby_docs",
                            features: "data_pmjjby_features"
                        },
                        min_age: 18,
                        matchScore: 90
                    },
                    {
                        id: 4,
                        keys: {
                            name: "data_apy_name",
                            launched: "data_apy_launched",
                            category: "data_apy_category",
                            about: "data_apy_about",
                            target: "data_apy_target",
                            benefits: "data_apy_benefits",
                            documents: "data_apy_docs",
                            features: "data_apy_features"
                        },
                        min_age: 18,
                        matchScore: 88
                    },
                    {
                        id: 5,
                        keys: {
                            name: "data_pmmy_name",
                            launched: "data_pmmy_launched",
                            category: "data_pmmy_category",
                            about: "data_pmmy_about",
                            target: "data_pmmy_target",
                            benefits: "data_pmmy_benefits",
                            documents: "data_pmmy_docs",
                            features: "data_pmmy_features"
                        },
                        min_age: 18,
                        matchScore: 85
                    },
                    {
                        id: 6,
                        keys: {
                            name: "data_supi_name",
                            launched: "data_supi_launched",
                            category: "data_supi_category",
                            about: "data_supi_about",
                            target: "data_supi_target",
                            benefits: "data_supi_benefits",
                            documents: "data_supi_docs",
                            features: "data_supi_features"
                        },
                        min_age: 18,
                        matchScore: 82
                    }
                ]);
            }

        } catch (error) {
            console.error("Error fetching recommendations", error);
            setRecommendations([
                {
                    id: 1,
                    name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
                    launched: "28 August 2014",
                    category: "Financial Inclusion / Banking Access",
                    about: "Provides universal access to banking facilities with a basic savings account, insurance and pension facility.",
                    target: "Unbanked adults (18+ years)",
                    benefits: "Zero balance account, ₹2 lakh accident insurance cover.",
                    documents: "Aadhaar Card, Passport photo",
                    features: "No minimum balance, Financial literacy programs",
                    matchScore: 95
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
                <Layers size={28} color="var(--brand-primary)" /> {t('scheme_title')}
            </h2>
            <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
                {t('scheme_subtitle')}
            </p>

            <div className="scheme-form-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <div className="form-group">
                    <label className="form-label">{t('scheme_label_age')}</label>
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
                    <label className="form-label">{t('scheme_label_income')}</label>
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
                    <label className="form-label">{t('scheme_label_gender')}</label>
                    <select
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option value="female">{t('scheme_gender_female')}</option>
                        <option value="male">{t('scheme_gender_male')}</option>
                        <option value="other">{t('scheme_gender_other')}</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">{t('scheme_label_occupation')}</label>
                    <select
                        onChange={handleOccupationChange}
                        className="form-input"
                        defaultValue="farmer"
                    >
                        <option value="farmer">{t('scheme_occ_farmer')}</option>
                        <option value="shopkeeper">{t('scheme_occ_shopkeeper')}</option>
                        <option value="laborer">{t('scheme_occ_laborer')}</option>
                        <option value="student">{t('scheme_occ_student')}</option>
                        <option value="homemaker">{t('scheme_occ_homemaker')}</option>
                        <option value="other">{t('scheme_occ_other')}</option>
                    </select>
                    {showOtherOccupation && (
                        <input
                            type="text"
                            name="occupation"
                            value={profile.occupation}
                            onChange={handleChange}
                            className="form-input animate-fade-in"
                            placeholder="Type your occupation..."
                            style={{ marginTop: '10px' }}
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
                {loading ? t('scheme_btn_generating') : t('scheme_btn_generate')}
            </button>

            {recommendations.length > 0 && (
                <div style={{ marginTop: '3rem' }}>
                    <h3 className="page-subtitle" style={{ marginBottom: '1.5rem', fontWeight: 700, borderBottom: '2px solid #edf2f7', paddingBottom: '10px' }}>
                        {t('scheme_rec_title')} ({recommendations.length})
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
                                    {scheme.matchScore ? `${scheme.matchScore}% ${t('scheme_match')}` : t('scheme_match')}
                                </div>

                                <h4 style={{
                                    fontSize: '1.3rem', fontWeight: 700, color: 'var(--brand-dark)', marginBottom: '0.5rem', paddingRight: '100px'
                                }}>{scheme.keys ? t(scheme.keys.name) : scheme.name}</h4>

                                <p style={{ color: '#4a5568', marginBottom: '1rem', lineHeight: 1.6 }}>
                                    {scheme.keys ? t(scheme.keys.about) : (scheme.benefits || scheme.about)}
                                </p>

                                {/* Toggle Details */}
                                <button
                                    onClick={() => toggleDetails(scheme.id || idx)}
                                    style={{
                                        background: 'none', border: 'none', color: 'var(--brand-primary)',
                                        fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', padding: 0,
                                        display: 'flex', alignItems: 'center', gap: '5px'
                                    }}
                                >
                                    {expandedScheme === (scheme.id || idx) ? t('scheme_hide_details') : t('scheme_view_details')} <ArrowRight size={16} />
                                </button>

                                {/* Expanded Details Section */}
                                {expandedScheme === (scheme.id || idx) && (
                                    <div className="animate-fade-in" style={{
                                        marginTop: '1.5rem',
                                        paddingTop: '1.5rem',
                                        borderTop: '1px dashed #cbd5e0',
                                        color: '#2d3748',
                                        fontSize: '0.95rem'
                                    }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ background: '#f7fafc', padding: '0.8rem', borderRadius: '10px' }}>
                                                <div style={{ fontSize: '0.85rem', color: '#718096' }}>{t('scheme_launched')}</div>
                                                <div style={{ fontWeight: 600, color: '#2d3748' }}>{scheme.keys ? t(scheme.keys.launched) : scheme.launched}</div>
                                            </div>
                                            <div style={{ background: '#f7fafc', padding: '1rem', borderRadius: '12px' }}>
                                                <div style={{ fontSize: '0.85rem', color: '#718096' }}>{t('scheme_category')}</div>
                                                <div style={{ fontWeight: 600, color: '#2d3748' }}>{scheme.keys ? t(scheme.keys.category) : scheme.category}</div>
                                            </div>
                                            <div style={{ background: '#f7fafc', padding: '0.8rem', borderRadius: '10px' }}>
                                                <div style={{ fontSize: '0.75rem', color: '#718096', textTransform: 'uppercase', fontWeight: 700 }}>{t('scheme_age_limit')}</div>
                                                <div style={{ fontWeight: 600, color: 'var(--brand-dark)' }}>
                                                    {scheme.min_age || 18}+ {t('calc_years')}
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(57, 106, 140, 0.05)', borderRadius: '12px', borderLeft: '4px solid var(--brand-primary)' }}>
                                            <h5 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brand-dark)' }}>
                                                <Layers size={16} /> {t('scheme_about_title')}
                                            </h5>
                                            <p style={{ lineHeight: 1.6, color: '#4a5568' }}>{scheme.keys ? t(scheme.keys.about) : scheme.about}</p>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <h5 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brand-dark)' }}>
                                                <User size={16} /> {t('scheme_target_title')}
                                            </h5>
                                            <p style={{ lineHeight: 1.6, color: '#4a5568' }}>{scheme.keys ? t(scheme.keys.target) : scheme.target}</p>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <h5 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brand-dark)' }}>
                                                <ArrowRight size={16} /> {t('scheme_benefits_title')}
                                            </h5>
                                            <p style={{ lineHeight: 1.6, color: '#4a5568' }}>{scheme.keys ? t(scheme.keys.benefits) : scheme.benefits}</p>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <h5 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brand-dark)' }}>
                                                <Layers size={16} /> {t('scheme_documents_title')}
                                            </h5>
                                            <p style={{ lineHeight: 1.6, color: '#4a5568' }}>{scheme.keys ? t(scheme.keys.documents) : scheme.documents}</p>
                                        </div>

                                        <div style={{ marginBottom: '0.5rem' }}>
                                            <h5 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brand-dark)' }}>
                                                <ArrowRight size={16} /> {t('scheme_features_title')}
                                            </h5>
                                            <p style={{ lineHeight: 1.6, color: '#4a5568' }}>{scheme.keys ? t(scheme.keys.features) : scheme.features}</p>
                                        </div>
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
