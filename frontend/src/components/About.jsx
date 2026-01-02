
import React from 'react';
import { Heart, Globe, Zap, Code, Mail, Linkedin, ArrowRight, Lightbulb } from 'lucide-react';

const About = ({ t }) => {
    return (
        <div className="page-card animate-fade-in" style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0',
            overflow: 'hidden',
            background: '#f8f9fa',
            boxShadow: 'none',
            border: 'none',
            backgroundImage: 'radial-gradient(#cbd5e0 1px, transparent 1px)',
            backgroundSize: '25px 25px'
        }}>

            {/* 1. Hero / One-Liner Mission */}
            <div style={{
                minHeight: '280px', // Reduced height
                background: 'linear-gradient(135deg, #1a202c, #2d3748)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2.5rem 1.5rem', // Reduced padding
                borderRadius: '0 0 50px 50px',
                position: 'relative',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
                {/* Doodles */}
                <Globe size={180} className="floating-doodle" style={{ top: '-20px', left: '-50px', animationDelay: '0s' }} />
                <Zap size={120} className="floating-doodle" style={{ bottom: '10px', right: '-20px', animationDelay: '1s' }} />
                <Code size={80} className="floating-doodle" style={{ top: '20px', right: '15%', animationDelay: '2s' }} />
                <Heart size={60} className="floating-doodle" style={{ bottom: '30px', left: '15%', animationDelay: '3s' }} />
                <Lightbulb size={50} className="floating-doodle" style={{ top: '40%', left: '5%', animationDelay: '1.5s' }} />

                <div className="animate-slide-up" style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '6px 16px',
                    borderRadius: '30px',
                    marginBottom: '1rem',
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <Heart size={14} fill="#fc8181" color="#fc8181" /> {t('about_badge_purpose')}
                </div>

                <h1 className="animate-slide-up" style={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    marginBottom: '1rem',
                    lineHeight: '1.1',
                    background: 'linear-gradient(to right, #fff, #a0aec0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animationDelay: '0.1s'
                }}>
                    {t('about_hero_title')}
                </h1>

                <p className="animate-slide-up" style={{
                    maxWidth: '700px',
                    fontSize: '1.15rem',
                    color: '#cbd5e0',
                    lineHeight: '1.6',
                    animationDelay: '0.2s'
                }}>
                    {t('about_hero_desc')}
                </p>
            </div>

            {/* 2. The Story "Why I Made This" */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', padding: '4rem 2rem' }}>

                {/* Left: The Narrative */}
                <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--brand-dark)' }}>
                        The Story Behind <span style={{ color: 'var(--brand-primary)' }}>FinPath</span>
                    </h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4a5568', marginBottom: '1.5rem' }}>
                        Finance is often wrapped in jargon that makes it inaccessible to millions. While working on technology solutions, I realized that true empowerment comes not just from earning money, but from knowing how to grow it.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4a5568', marginBottom: '2rem' }}>
                        I created <strong>FinPath</strong> with a simple mission: to help anyone—regardless of language or background—understand their financial potential. Access to government schemes and smart investments shouldn't be a privilege; it should be a right.
                    </p>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ borderLeft: '3px solid var(--brand-primary)', paddingLeft: '15px' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-dark)' }}>8+</div>
                            <div style={{ fontSize: '0.9rem', color: '#718096' }}>Languages Supported</div>
                        </div>
                        <div style={{ borderLeft: '3px solid #ed8936', paddingLeft: '15px' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-dark)' }}>AI</div>
                            <div style={{ fontSize: '0.9rem', color: '#718096' }}>Powered Guidance</div>
                        </div>
                    </div>
                </div>

                {/* Right: The Creator Profile Card (Creative) */}
                <div className="animate-slide-up" style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '2rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    position: 'relative',
                    animationDelay: '0.3s',
                    textAlign: 'center'
                }}>
                    <div style={{ position: 'absolute', top: '-10px', right: '30px', background: '#F6E05E', color: '#744210', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
                        CREATOR
                    </div>

                    {/* Profile Image */}
                    <div style={{
                        width: '180px', // Zoomed
                        height: '180px', // Zoomed
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '0 auto 1.5rem auto',
                        border: '5px solid white',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                    }}>
                        <img src="/khushi.jpg" alt="Khushi Kumari" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Khushi Kumari</h3>
                    <p style={{ color: 'var(--brand-primary)', fontWeight: 500, marginBottom: '1.5rem' }}>AI and ML Engineer</p>

                    <p style={{ color: '#718096', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                        Final year Computer Science student at <strong>Dronacharya College of Engineering</strong>.
                        I am passionate about building intelligent systems that solve real world problems and bridge the digital divide.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <SocialButton href="https://www.linkedin.com/in/khushikumari28" text="LinkedIn" icon={<Linkedin size={16} />} color="#0077b5" />
                        <SocialButton href="mailto:k.khushikumari.mail@gmail.com" text="Email Me" icon={<Mail size={16} />} color="#EA4335" />
                    </div>
                </div>
            </div>

            {/* 3. "Under the Hood" - Professional Tech Showcase */}
            <div style={{ background: 'white', padding: '4rem 2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '3rem', color: 'var(--brand-dark)' }}>
                    Professional Engineering
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <TechCard
                        icon={<Code size={32} color="#4299e1" />}
                        title="Modern Frontend"
                        desc="Built with React for a seamless, diverse user experience across devices."
                    />
                    <TechCard
                        icon={<Zap size={32} color="#ecc94b" />} // Changed to Zap or Brain for AI
                        title="Intelligent Backend"
                        desc="FastAPI driven Python engine handling NLP and real-time data processing."
                    />
                    <TechCard
                        icon={<Lightbulb size={32} color="#48bb78" />}
                        title="Machine Learning"
                        desc="Vector Space Models and Cosine Similarity for personalized scheme recommendations."
                    />
                </div>
            </div>

            {/* 4. Footer Quote */}
            <div style={{ padding: '3rem', textAlign: 'center', color: '#718096', fontStyle: 'italic' }}>
                "Technology is best when it brings people together."
            </div>

        </div>
    );
};

// --- Helper Components ---

const SocialButton = ({ href, text, icon, color }) => (
    <a href={href} target="_blank" rel="noreferrer" style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px',
        borderRadius: '12px',
        background: color + '26', // ~15% opacity (hex 26 is ~15%)
        color: color,
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '0.9rem',
        transition: 'all 0.2s'
    }}
        onMouseOver={(e) => e.currentTarget.style.background = color + '40'} // ~25% opacity
        onMouseOut={(e) => e.currentTarget.style.background = color + '26'}
    >
        {icon} {text}
    </a>
);

const TechCard = ({ icon, title, desc }) => (
    <div style={{
        padding: '2rem',
        borderRadius: '20px',
        background: '#f7fafc',
        border: '1px solid #edf2f7',
        textAlign: 'left',
        transition: 'transform 0.3s'
    }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
        <div style={{ marginBottom: '1.5rem' }}>{icon}</div>
        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#2d3748' }}>{title}</h4>
        <p style={{ color: '#718096', lineHeight: '1.6' }}>{desc}</p>
    </div>
);

export default About;
