import React from 'react';

const DoodleBackground = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.2 // (Increased from 0.08) Make it more visible
        }}>
            {/* Squiggle 1 */}
            <svg style={{ position: 'absolute', top: '10%', left: '5%', width: '150px' }} viewBox="0 0 100 100" fill="none" stroke="var(--brand-dark)" strokeWidth="2">
                <path d="M10,50 Q25,25 40,50 T70,50 T100,50" />
            </svg>

            {/* Circle Scribble */}
            <svg style={{ position: 'absolute', top: '20%', right: '10%', width: '120px' }} viewBox="0 0 100 100" fill="none" stroke="var(--brand-primary)" strokeWidth="2">
                <path d="M50,10 A40,40 0 1,1 49,10" strokeDasharray="5,5" />
            </svg>

            {/* Triangle Scribble */}
            <svg style={{ position: 'absolute', bottom: '15%', left: '15%', width: '100px' }} viewBox="0 0 100 100" fill="none" stroke="var(--brand-accent)" strokeWidth="2">
                <path d="M50,10 L90,90 L10,90 Z" strokeLinejoin="round" />
            </svg>

            {/* Crosses */}
            <div style={{ position: 'absolute', top: '40%', left: '40%', fontSize: '40px', color: 'var(--brand-dark)', transform: 'rotate(20deg)' }}>+</div>
            <div style={{ position: 'absolute', top: '70%', right: '30%', fontSize: '30px', color: 'var(--brand-primary)', transform: 'rotate(-45deg)' }}>x</div>

            {/* Zigzag */}
            <svg style={{ position: 'absolute', top: '15%', left: '50%', width: '200px' }} viewBox="0 0 200 50" fill="none" stroke="var(--brand-dark)" strokeWidth="2">
                <path d="M0,25 L10,0 L20,50 L30,0 L40,50 L50,25" />
            </svg>

            {/* Random Dots */}
            <div style={{ position: 'absolute', top: '60%', left: '10%', width: '10px', height: '10px', background: 'var(--brand-dark)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '30%', right: '5%', width: '15px', height: '15px', background: 'var(--brand-accent)', borderRadius: '50%' }}></div>
        </div>
    );
};

export default DoodleBackground;
