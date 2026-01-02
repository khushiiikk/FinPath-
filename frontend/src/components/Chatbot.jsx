import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, ArrowRight, DollarSign, Calculator, FileText, Info } from 'lucide-react';

const Chatbot = ({ setActiveTab, t }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: t('bot_greeting'),
            sender: 'bot',
            type: 'menu' // Special type to show options
        }
    ]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleOptionClick = (option) => {
        // User "says" the option
        const userMessage = { id: Date.now(), text: option.label, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        // Bot responds and redirects
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: `${t('bot_redirect')} ${option.label}...`,
                sender: 'bot'
            };
            setMessages(prev => [...prev, botResponse]);

            // Actual Navigation
            setTimeout(() => {
                setActiveTab(option.target);
            }, 1000);

        }, 500);
    };

    const menuOptions = [
        { label: t('bot_menu_track'), target: "expenses", icon: <DollarSign size={18} />, color: "#48bb78" },
        { label: t('bot_menu_schemes'), target: "schemes", icon: <FileText size={18} />, color: "#4299e1" },
        { label: t('bot_menu_calc'), target: "calculator", icon: <Calculator size={18} />, color: "#ed8936" },
        { label: t('bot_menu_about'), target: "about", icon: <Info size={18} />, color: "#9f7aea" },
    ];

    return (
        <div className="page-card animate-fade-in" style={{
            height: '80vh',
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'transparent',
            boxShadow: 'none',
            border: 'none'
        }}>

            {/* Phone Container */}
            <div style={{
                width: '100%',
                maxWidth: '400px',
                height: '100%',
                maxHeight: '750px',
                background: '#fff',
                borderRadius: '40px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                border: '8px solid #2d3748',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative'
            }}>

                {/* Notch / Header */}
                <div style={{
                    padding: '1.5rem',
                    background: 'var(--brand-dark)',
                    color: 'white',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px',
                        border: '3px solid var(--brand-primary)',
                        overflow: 'hidden'
                    }}>
                        <img src="/finbot-icon.jpg" alt="Bot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>{t('bot_name')}</h2>
                    <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Sparkles size={12} /> {t('bot_status')}
                    </p>
                </div>

                {/* Chat Area with Doodles Background */}
                <div style={{
                    flexGrow: 1,
                    padding: '1.5rem',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    backgroundColor: '#f7fafc',
                    // Doodle Pattern (CSS Dot Pattern)
                    backgroundImage: 'radial-gradient(#cbd5e0 1.5px, transparent 1.5px)',
                    backgroundSize: '20px 20px'
                }}>
                    {messages.map((msg) => (
                        <div key={msg.id} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        }}>
                            {/* Message Bubble */}
                            <div style={{
                                maxWidth: '85%',
                                padding: '12px 16px',
                                borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                background: msg.sender === 'user' ? 'var(--brand-primary)' : 'white',
                                color: msg.sender === 'user' ? 'white' : '#2d3748',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                fontSize: '0.95rem',
                                lineHeight: '1.4',
                                marginBottom: '5px'
                            }}>
                                {msg.text}
                            </div>

                            {/* Render Options Menu for Bot Menu Messages */}
                            {msg.sender === 'bot' && msg.type === 'menu' && (
                                <div className="animate-slide-up" style={{
                                    marginTop: '10px',
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px'
                                }}>
                                    {menuOptions.map(option => (
                                        <button
                                            key={option.target}
                                            onClick={() => handleOptionClick(option)}
                                            style={{
                                                padding: '12px 15px',
                                                background: 'white',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                cursor: 'pointer',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                                transition: 'all 0.2s',
                                                color: '#2d3748',
                                                fontWeight: 500,
                                                fontSize: '0.95rem',
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.borderColor = option.color;
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.borderColor = '#e2e8f0';
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{
                                                    padding: '8px',
                                                    background: `${option.color}20`,
                                                    borderRadius: '8px',
                                                    color: option.color
                                                }}>
                                                    {option.icon}
                                                </div>
                                                {option.label}
                                            </div>
                                            <ArrowRight size={16} color="#cbd5e0" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Decorative Bottom Bar (Phone indicator) */}
                <div style={{
                    height: '20px',
                    background: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{ width: '40%', height: '5px', background: '#e2e8f0', borderRadius: '10px' }}></div>
                </div>

            </div>
        </div>
    );
};

export default Chatbot;
