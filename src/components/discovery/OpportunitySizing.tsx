import React, { useState } from 'react';
import { TrendingUp, Clock, DollarSign, Users } from 'lucide-react';
import { Card, Badge } from '../common/UI';

interface OpportunitySizingProps {
    data: any;
}

const OpportunitySizing: React.FC<OpportunitySizingProps> = ({ data }) => {
    const [members, setMembers] = useState(50000);
    const [callsPerMonth, setCallsPerMonth] = useState(15000);
    const [costPerCall, setCostPerCall] = useState(12);
    const [deflectionRate, setDeflectionRate] = useState(25);

    const monthlySavings = (callsPerMonth * (deflectionRate / 100)) * costPerCall;
    const annualSavings = monthlySavings * 12;

    return (
        <section>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Opportunity Sizing</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Projected impact based on current call center volume and member portal engagement.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem' }}>Assumptions</h3>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Total Members</label>
                            <span style={{ fontWeight: 700 }}>{members.toLocaleString()}</span>
                        </div>
                        <input
                            type="range" min="10000" max="500000" step="5000"
                            value={members} onChange={(e) => setMembers(parseInt(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Calls per Month</label>
                            <span style={{ fontWeight: 700 }}>{callsPerMonth.toLocaleString()}</span>
                        </div>
                        <input
                            type="range" min="1000" max="100000" step="1000"
                            value={callsPerMonth} onChange={(e) => setCallsPerMonth(parseInt(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Cost per Call ($)</label>
                            <span style={{ fontWeight: 700 }}>${costPerCall}</span>
                        </div>
                        <input
                            type="range" min="5" max="50" step="1"
                            value={costPerCall} onChange={(e) => setCostPerCall(parseInt(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Target Deflection Rate (%)</label>
                            <span style={{ fontWeight: 700 }}>{deflectionRate}%</span>
                        </div>
                        <input
                            type="range" min="5" max="60" step="1"
                            value={deflectionRate} onChange={(e) => setDeflectionRate(parseInt(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Card style={{ background: 'var(--primary)', color: 'white', textAlign: 'center', padding: '2rem' }}>
                        <p style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>Estimated Annual Savings</p>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'white' }}>${annualSavings.toLocaleString()}</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                            <Badge variant="success" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>ROI: 4.2x</Badge>
                            <Badge variant="success" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>Payback: 5 months</Badge>
                        </div>
                    </Card>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Card style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                                <Clock size={18} />
                                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Time Saved</span>
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>1,200 hrs/mo</div>
                        </Card>
                        <Card style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginBottom: '0.5rem' }}>
                                <Users size={18} />
                                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Member NPS</span>
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>+15 pts</div>
                        </Card>
                    </div>
                </div>
            </div>

            <div style={{ padding: '2rem', background: 'var(--background)', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Sizing Models</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'white', borderRadius: 'var(--radius-md)' }}>
                        <div>
                            <strong>Conservative Model</strong>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>10% deflection, $8 cost per call</p>
                        </div>
                        <div style={{ fontWeight: 700 }}>$144,000 / yr</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--primary)', color: 'white', borderRadius: 'var(--radius-md)' }}>
                        <div>
                            <strong>Base Model (Recommended)</strong>
                            <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>25% deflection, $12 cost per call</p>
                        </div>
                        <div style={{ fontWeight: 700 }}>${annualSavings.toLocaleString()} / yr</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'white', borderRadius: 'var(--radius-md)' }}>
                        <div>
                            <strong>Aggressive Model</strong>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>40% deflection, $15 cost per call</p>
                        </div>
                        <div style={{ fontWeight: 700 }}>$1,080,000 / yr</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OpportunitySizing;
