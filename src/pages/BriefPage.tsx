import React, { useState } from 'react';
import {
    FileText, Users, List, Shield, AlertTriangle,
    TrendingUp, HelpCircle, ArrowRight, Download,
    Share2, Copy, RotateCcw, ChevronDown, ChevronUp
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button, Card, Badge } from '../components/common/UI';
import TraceabilityPanel from '../components/discovery/TraceabilityPanel';
import OpportunitySizing from '../components/discovery/OpportunitySizing';

const SECTIONS = [
    { id: 'summary', label: 'Executive Summary', icon: FileText },
    { id: 'problems', label: 'Problem Statements', icon: AlertTriangle },
    { id: 'personas', label: 'Personas', icon: Users },
    { id: 'nfrs', label: 'Non-Functional Requirements', icon: Shield },
    { id: 'risks', label: 'Risks & Assumptions', icon: AlertTriangle },
    { id: 'sizing', label: 'Opportunity Sizing', icon: TrendingUp },
    { id: 'questions', label: 'Open Questions', icon: HelpCircle },
    { id: 'next-steps', label: 'Next Steps', icon: ArrowRight },
];

const BriefPage: React.FC = () => {
    const { generatedBrief, currentProjectName, resetWizard } = useStore();
    const [activeSection, setActiveSection] = useState('summary');
    const [selectedItem, setSelectedItem] = useState<any>(null);

    if (!generatedBrief) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>No brief generated yet.</h2>
                <Button onClick={() => window.location.href = '/wizard'} style={{ marginTop: '1rem' }}>
                    Start New Discovery
                </Button>
            </div>
        );
    }

    const handleExport = () => {
        window.print();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)' }}>
            {/* Top Bar */}
            <div style={{
                padding: '1rem 2rem',
                borderBottom: '1px solid var(--border)',
                background: 'var(--surface)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h2 style={{ fontSize: '1.25rem' }}>{currentProjectName}</h2>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Generated on {new Date().toLocaleString()}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Button variant="outline" size="sm" onClick={() => resetWizard()}>
                        <RotateCcw size={16} style={{ marginRight: '0.5rem' }} />
                        Regenerate
                    </Button>
                    <Button variant="outline" size="sm">
                        <Share2 size={16} style={{ marginRight: '0.5rem' }} />
                        Share
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleExport}>
                        <Download size={16} style={{ marginRight: '0.5rem' }} />
                        Export PDF
                    </Button>
                </div>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Left Nav */}
                <div style={{
                    width: '280px',
                    borderRight: '1px solid var(--border)',
                    background: 'var(--surface)',
                    padding: '1.5rem',
                    overflowY: 'auto'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {SECTIONS.map(section => {
                            const Icon = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: 'none',
                                        background: activeSection === section.id ? 'var(--primary-light)' : 'transparent',
                                        color: activeSection === section.id ? 'var(--primary)' : 'var(--text-muted)',
                                        fontWeight: activeSection === section.id ? 600 : 400,
                                        textAlign: 'left',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Icon size={18} />
                                    <span style={{ fontSize: '0.9375rem' }}>{section.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Panel */}
                <div style={{ flex: 1, padding: '3rem', overflowY: 'auto', background: 'white' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {activeSection === 'summary' && (
                            <section>
                                <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Executive Summary</h1>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {generatedBrief.executiveSummary.map((point: string, i: number) => (
                                        <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', borderLeft: '4px solid var(--primary)', background: 'var(--background)', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                                            <p style={{ fontSize: '1.125rem' }}>{point}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeSection === 'problems' && (
                            <section>
                                <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Problem Statements</h1>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {generatedBrief.problemStatements.map((ps: any) => (
                                        <Card key={ps.id} style={{ cursor: 'pointer', border: selectedItem?.id === ps.id ? '2px solid var(--primary)' : '1px solid var(--border)' }} onClick={() => setSelectedItem(ps)}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                <Badge variant="error">High Priority</Badge>
                                                <Badge variant="info">{ps.confidence}% Confidence</Badge>
                                            </div>
                                            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{ps.statement}</h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
                                                <div>
                                                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Impacts</span>
                                                    <strong>{ps.impacts}</strong>
                                                </div>
                                                <div>
                                                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Success Metric</span>
                                                    <strong>{ps.metric}</strong>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeSection === 'personas' && (
                            <section>
                                <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Personas</h1>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    {generatedBrief.personas.map((persona: any, i: number) => (
                                        <Card key={i}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                                    {persona.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 style={{ fontSize: '1.125rem' }}>{persona.name}</h3>
                                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{persona.role}</p>
                                                </div>
                                            </div>
                                            <div style={{ marginBottom: '1rem' }}>
                                                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.9375rem' }}>"{persona.quote}"</p>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                                                <div>
                                                    <strong>Goals:</strong> {persona.goals}
                                                </div>
                                                <div>
                                                    <strong>Pain Points:</strong> {persona.painPoints}
                                                </div>
                                                <div>
                                                    <strong>Tech Comfort:</strong> <Badge>{persona.techComfort}</Badge>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeSection === 'nfrs' && (
                            <section>
                                <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Non-Functional Requirements</h1>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                                            <th style={{ padding: '1rem' }}>Category</th>
                                            <th style={{ padding: '1rem' }}>Requirement</th>
                                            <th style={{ padding: '1rem' }}>Priority</th>
                                            <th style={{ padding: '1rem' }}>Rationale</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {generatedBrief.nfrs.map((nfr: any, i: number) => (
                                            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                                                <td style={{ padding: '1rem' }}><Badge variant="info">{nfr.category}</Badge></td>
                                                <td style={{ padding: '1rem', fontWeight: 500 }}>{nfr.requirement}</td>
                                                <td style={{ padding: '1rem' }}><Badge variant={nfr.priority === 'Must' ? 'error' : 'warning'}>{nfr.priority}</Badge></td>
                                                <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{nfr.rationale}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>
                        )}

                        {activeSection === 'sizing' && <OpportunitySizing data={generatedBrief.opportunitySizing} />}

                        {/* Add other sections as needed */}
                        {['risks', 'questions', 'next-steps'].includes(activeSection) && (
                            <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <p>This section is available in the full version of AI Discovery Copilot.</p>
                                <p style={{ fontSize: '0.875rem' }}>Demo limited to core discovery outputs.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Traceability */}
                <div style={{
                    width: '350px',
                    borderLeft: '1px solid var(--border)',
                    background: 'var(--background)',
                    padding: '1.5rem',
                    overflowY: 'auto'
                }}>
                    <TraceabilityPanel item={selectedItem} />
                </div>
            </div>
        </div>
    );
};

export default BriefPage;
