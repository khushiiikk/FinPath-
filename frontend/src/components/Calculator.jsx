import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const FinancialCalculator = () => {
    const [monthlyInvestment, setMonthlyInvestment] = useState(500);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(12); // Assuming 12% for mutual funds/SIP
    const [data, setData] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [investedAmount, setInvestedAmount] = useState(0);

    useEffect(() => {
        calculateGrowth();
    }, [monthlyInvestment, years, rate]);

    const calculateGrowth = () => {
        let currentAmount = 0;
        let invested = 0;
        const newData = [];

        const monthlyRate = rate / 12 / 100;
        const totalMonths = years * 12;

        for (let i = 1; i <= totalMonths; i++) {
            currentAmount += monthlyInvestment;
            currentAmount *= (1 + monthlyRate);
            invested += monthlyInvestment;

            if (i % 12 === 0) {
                newData.push({
                    year: i / 12,
                    value: Math.round(currentAmount),
                    invested: invested
                });
            }
        }

        setData(newData);
        setTotalValue(Math.round(currentAmount));
        setInvestedAmount(invested);
    };

    // Metaphor logic
    const getTreeStage = () => {
        if (totalValue < 50000) return "🌱 Sapling";
        if (totalValue < 200000) return "🌿 Small Plant";
        if (totalValue < 1000000) return "🌳 Strong Tree";
        return "🍎 Fruit Bearing Tree";
    };

    return (
        <div className="page-card animate-fade-in" style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--brand-dark)' }}>
                <Calculator size={22} color="var(--brand-primary)" /> SIP Calculator
            </h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
                See how small savings grow over time.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Left Side: Inputs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Monthly Investment Slider */}
                    <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '12px' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                            <span>Monthly Investment</span>
                            <span style={{ color: 'var(--brand-primary)' }}>₹{monthlyInvestment.toLocaleString('en-IN')}</span>
                        </label>
                        <input
                            type="range"
                            min="100"
                            max="10000"
                            step="100"
                            value={monthlyInvestment}
                            onChange={(e) => setMonthlyInvestment(parseInt(e.target.value))}
                            style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--brand-primary)', height: '4px' }}
                        />
                    </div>

                    {/* Duration Slider */}
                    <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '12px' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                            <span>Duration</span>
                            <span style={{ color: 'var(--brand-primary)' }}>{years} Years</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            step="1"
                            value={years}
                            onChange={(e) => setYears(parseInt(e.target.value))}
                            style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--brand-primary)', height: '4px' }}
                        />
                    </div>

                    {/* Interest Rate Slider */}
                    <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '12px' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                            <span>Expected Return</span>
                            <span style={{ color: 'var(--brand-primary)' }}>{rate}%</span>
                        </label>
                        <input
                            type="range"
                            min="5"
                            max="20"
                            step="0.5"
                            value={rate}
                            onChange={(e) => setRate(parseFloat(e.target.value))}
                            style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--brand-primary)', height: '4px' }}
                        />
                    </div>

                    <div style={{
                        marginTop: 'auto',
                        padding: '1rem',
                        background: '#ebf8ff',
                        borderRadius: '12px',
                        border: '1px solid #bee3f8',
                        color: '#2c5282',
                        fontSize: '0.85rem'
                    }}>
                        <strong>💡 Insight:</strong> Starting with just ₹{monthlyInvestment}/mo can grow significantly due to compounding!
                    </div>
                </div>

                {/* Right Side: Insights & Chart */}
                <div>
                    <div style={{
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}>
                        {/* Summary Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '0.8rem', background: '#f7fafc', borderRadius: '10px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '4px' }}>Invested Amount</div>
                                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#2d3748' }}>₹{investedAmount.toLocaleString('en-IN')}</div>
                            </div>
                            <div style={{ padding: '0.8rem', background: '#f0fff4', borderRadius: '10px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#276749', marginBottom: '4px' }}>Est. Returns</div>
                                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#48bb78' }}>+₹{(totalValue - investedAmount).toLocaleString('en-IN')}</div>
                            </div>
                        </div>

                        {/* Total Value Big Display */}
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem', padding: '1rem', background: 'var(--brand-dark)', borderRadius: '12px', color: 'white' }}>
                            <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '5px' }}>Total Value after {years} Years</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800 }}>₹{totalValue.toLocaleString('en-IN')}</div>
                            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '2px 10px', borderRadius: '12px' }}>
                                {getTreeStage()}
                            </div>
                        </div>

                        {/* Mini Chart */}
                        <div style={{ height: '180px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#537691" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#537691" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="year" hide />
                                    <Tooltip
                                        contentStyle={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: 'none', fontSize: '12px' }}
                                        formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, '']}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#213448" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialCalculator;
