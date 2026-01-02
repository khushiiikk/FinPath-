import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Namaste! I am FinBot, your personal financial advisor. Ask me about government schemes, savings, or loans.", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI delay
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: "I am currently running in demo mode. Once connected to the backend/OpenAI, I will be able to answer specific questions about schemes and your finances! For now, try asking about 'PM Kisan' or 'Atal Pension Yojana'.",
                sender: 'bot'
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="page-card animate-fade-in" style={{ height: '80vh', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{
                padding: '1.5rem',
                background: 'var(--brand-dark)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{
                    width: '45px',
                    height: '45px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    <img src="/finbot-icon.jpg" alt="Bot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.2rem' }}>FinBot AI</h2>
                    <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Sparkles size={12} /> Always active
                    </p>
                </div>
            </div>

            {/* Messages Area */}
            <div style={{
                flexGrow: 1,
                padding: '2rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                background: '#f8f9fa'
            }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{
                        display: 'flex',
                        justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}>
                        <div style={{
                            maxWidth: '70%',
                            padding: '1rem 1.5rem',
                            borderRadius: msg.sender === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                            background: msg.sender === 'user' ? 'var(--brand-primary)' : 'white',
                            color: msg.sender === 'user' ? 'white' : '#2d3748',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                            fontSize: '0.95rem',
                            lineHeight: '1.5'
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{
                            padding: '1rem 1.5rem',
                            borderRadius: '20px 20px 20px 5px',
                            background: 'white',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                        }}>
                            <span className="typing-dot">.</span><span className="typing-dot">.</span><span className="typing-dot">.</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{
                padding: '1.5rem',
                background: 'white',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                gap: '10px'
            }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about schemes, loans, or savings..."
                    style={{
                        flexGrow: 1,
                        padding: '12px 20px',
                        borderRadius: '30px',
                        border: '1px solid #e2e8f0',
                        outline: 'none',
                        fontSize: '1rem',
                        transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--brand-primary)'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
                <button
                    onClick={handleSend}
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'var(--brand-primary)',
                        color: 'white',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
