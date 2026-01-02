import React from 'react';
import { Bot } from 'lucide-react';

const FloatingBot = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            className="floating-bot hover-scale"
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 1000,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
            }}
        >
            {/* Speech Bubble */}
            <div style={{
                background: 'white',
                padding: '8px 16px',
                borderRadius: '20px 20px 0 20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                marginBottom: '10px',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#2d3748',
                whiteSpace: 'nowrap',
                animation: 'float 3s ease-in-out infinite'
            }}>
                Ask FinBot! 🤖
            </div>

            {/* Robot Circle */}
            <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4F46E5, #3730A3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(79, 70, 229, 0.4)',
                border: '3px solid white',
                transition: 'transform 0.2s',
                overflow: 'hidden'
            }}>
                <img src="/finbot-icon.jpg" alt="FinBot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
        </div>
    );
};

export default FloatingBot;
