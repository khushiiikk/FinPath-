import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, DollarSign, Tag, Clock, Trash2, PlusCircle, Volume2, Keyboard } from 'lucide-react';

const ExpenseTracker = ({ t }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [mode, setMode] = useState('voice'); // 'voice' or 'manual'
    const [manualInput, setManualInput] = useState('');

    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = useRef(SpeechRecognition ? new SpeechRecognition() : null);

    useEffect(() => {
        if (recognition.current) {
            recognition.current.continuous = false;
            recognition.current.lang = 'en-IN';
            recognition.current.interimResults = false;

            recognition.current.onresult = (event) => {
                const text = event.results[0][0].transcript;
                setTranscript(text);
                setIsListening(false);
                processExpense(text);
            };

            recognition.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognition.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const toggleListening = () => {
        if (!recognition.current) {
            alert("Your browser does not support voice recognition.");
            return;
        }
        if (isListening) {
            recognition.current.stop();
        } else {
            setIsListening(true);
            recognition.current.start();
            setTranscript('');
        }
    };

    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // ... (rest of code)

    const processExpense = async (text) => {
        setIsAnalyzing(true);

        try {
            // Call Backend NLP Engine
            const response = await fetch('http://127.0.0.1:8000/api/parse-expense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) throw new Error('NLP Backend Error');

            const data = await response.json();

            // Backend returns: { amount: 500, category: "Food", description: "Pizza" }
            if (data.amount > 0) {
                addExpense(data.amount, data.description, data.category);
                setTranscript(`Processed: ₹${data.amount} for ${data.description}`);
            } else {
                // If amount not found, ask manual input
                setManualInput(text);
                setMode('manual');
                setTranscript('Could not detect amount. Please edit manually.');
            }

        } catch (error) {
            console.error("NLP Error, falling back to basic regex:", error);

            // Fallback: Client-side Regex (Old Logic)
            const amountMatch = text.match(/(\d+)/);
            const amount = amountMatch ? parseFloat(amountMatch[0]) : 0;
            let description = text.replace(amount, "").replace(/rupees|rs|spent|on/gi, "").trim();
            if (amount > 0) {
                addExpense(amount, description || "General", "Voice Entry (Offline)");
            } else {
                setManualInput(text);
                setMode('manual');
            }
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        processExpense(manualInput);
        setManualInput('');
    };

    const addExpense = (amount, description, category) => {
        const newExpense = {
            id: Date.now(),
            amount,
            description,
            category,
            date: new Date().toLocaleDateString()
        };
        setExpenses(prev => [newExpense, ...prev]);
    };

    const deleteExpense = (id) => {
        setExpenses(prev => prev.filter(e => e.id !== id));
    };

    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="page-card animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="page-header">
                <h2 className="page-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                    <DollarSign size={32} className="text-brand-primary" />
                    {t('exp_title')}
                </h2>
                <p className="page-subtitle">{t('exp_subtitle')}</p>
            </div>

            {/* Total Balance Card */}
            <div style={{
                background: 'linear-gradient(135deg, var(--brand-dark), var(--brand-primary))',
                borderRadius: '20px',
                padding: '2rem',
                color: 'white',
                marginBottom: '2.5rem',
                boxShadow: '0 10px 30px rgba(33, 52, 72, 0.25)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h3 style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('exp_total_spent')}</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
                        ₹{totalSpent.toLocaleString('en-IN')}
                    </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '50%' }}>
                    <DollarSign size={32} color="white" />
                </div>
            </div>

            {/* Input Method Toggles */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                <button
                    onClick={() => setMode('voice')}
                    style={{
                        padding: '0.8rem 1.5rem',
                        borderRadius: '30px',
                        border: 'none',
                        background: mode === 'voice' ? 'var(--brand-primary)' : '#f0f4f8',
                        color: mode === 'voice' ? 'white' : 'var(--brand-dark)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s'
                    }}
                >
                    <Volume2 size={18} /> {t('exp_mode_voice')}
                </button>
                <button
                    onClick={() => setMode('manual')}
                    style={{
                        padding: '0.8rem 1.5rem',
                        borderRadius: '30px',
                        border: 'none',
                        background: mode === 'manual' ? 'var(--brand-primary)' : '#f0f4f8',
                        color: mode === 'manual' ? 'white' : 'var(--brand-dark)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s'
                    }}
                >
                    <Keyboard size={18} /> {t('exp_mode_manual')}
                </button>
            </div>

            {/* Input Sections */}
            <div style={{ minHeight: '150px', marginBottom: '3rem' }}>
                {mode === 'voice' ? (
                    <div className="voice-tracker-container animate-slide-up" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <button
                            onClick={toggleListening}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                border: 'none',
                                background: isListening ? '#ef4444' : 'var(--brand-primary)',
                                color: 'white',
                                cursor: 'pointer',
                                boxShadow: isListening ? '0 0 0 15px rgba(239, 68, 68, 0.2)' : '0 10px 20px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s',
                                transform: isListening ? 'scale(1.1)' : 'scale(1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {isListening ? <MicOff size={32} /> : <Mic size={32} />}
                        </button>

                        <p style={{ marginTop: '1.5rem', fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>
                            {isListening ? t('exp_listening') : t('exp_tap_mic')}
                        </p>

                        {transcript && (
                            <div style={{ marginTop: '1rem', color: 'var(--brand-primary)', fontStyle: 'italic' }}>
                                "{transcript}"
                            </div>
                        )}
                    </div>
                ) : (
                    <form onSubmit={handleManualSubmit} className="animate-slide-up" style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                value={manualInput}
                                onChange={(e) => setManualInput(e.target.value)}
                                placeholder={t('exp_placeholder')}
                                className="form-input"
                                style={{ paddingRight: '50px' }}
                                autoFocus
                            />
                            <button
                                type="submit"
                                style={{
                                    position: 'absolute',
                                    right: '5px',
                                    top: '5px',
                                    bottom: '5px',
                                    width: '40px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: 'var(--brand-primary)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.5rem', textAlign: 'center' }}>
                            {t('exp_format_hint')}
                        </p>
                    </form>
                )}
            </div>

            {/* Recent Expenses List */}
            <div>
                <h3 className="page-subtitle" style={{ textAlign: 'left', marginBottom: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={20} /> {t('exp_recent')}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {expenses.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem',
                            background: '#f8f9fa',
                            borderRadius: '16px',
                            color: '#999',
                            border: '2px dashed #e2e8f0'
                        }}>
                            <p>{t('exp_no_data')}</p>
                        </div>
                    ) : (
                        expenses.map((exp) => (
                            <div key={exp.id} className="animate-fade-in" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem 1.5rem',
                                background: 'white',
                                borderRadius: '16px',
                                border: '1px solid #edf2f7',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                                transition: 'transform 0.2s',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        background: '#f0f4f8',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--brand-primary)'
                                    }}>
                                        <Tag size={18} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#2d3748', fontSize: '1.05rem' }}>{exp.description}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#a0aec0' }}>{exp.date} • {exp.category}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontWeight: 700, color: '#e53e3e', fontSize: '1.1rem' }}>- ₹{exp.amount.toLocaleString('en-IN')}</span>
                                    <button
                                        onClick={() => deleteExpense(exp.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#cbd5e0',
                                            cursor: 'pointer',
                                            padding: '5px'
                                        }}
                                        className="hover:text-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExpenseTracker;

