import React, { useEffect } from 'react';
import { Terminal, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button, Card } from '../common/UI';

const GenerateSection: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const {
        isGenerating,
        startGeneration,
        generationProgress,
        generationStep,
        generationLogs,
        generatedBrief
    } = useStore();

    useEffect(() => {
        if (generatedBrief && !isGenerating) {
            onComplete();
        }
    }, [generatedBrief, isGenerating, onComplete]);

    const steps = [
        "Ingesting documents",
        "Cleaning & de-duplicating",
        "Extracting entities",
        "Drafting problem statements",
        "Building personas",
        "Deriving NFRs",
        "Risks & assumptions",
        "Opportunity sizing",
        "Formatting brief"
    ];

    return (
        <div style={{ textAlign: 'center' }}>
            {!isGenerating && !generatedBrief ? (
                <div style={{ padding: '4rem 0' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'var(--primary-light)',
                        color: 'var(--primary)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem'
                    }}>
                        <Zap size={48} />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Generate</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
                        We'll analyze your {useStore.getState().files.filter(f => f.included).length} source documents and apply your configuration to build a structured Discovery Brief.
                    </p>
                    <div style={{ marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', textAlign: 'left' }}>Simulate Issue</label>
                        <select
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--surface)' }}
                            onChange={(e) => {
                                if (e.target.value !== 'None') {
                                    console.log(`Simulating issue: ${e.target.value}`);
                                }
                            }}
                        >
                            <option value="None">None</option>
                            <option value="Low confidence due to conflicting inputs">Low confidence due to conflicting inputs</option>
                            <option value="Missing transcript section">Missing transcript section</option>
                            <option value="Ambiguous scope">Ambiguous scope</option>
                        </select>
                    </div>
                    <Button size="lg" onClick={startGeneration} style={{ padding: '0.8rem 3rem' }}>
                        Generate Discovery Brief
                    </Button>
                    <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        Estimated time: ~60 seconds
                    </p>
                </div>
            ) : (
                <div style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{steps[generationStep]}</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Step {generationStep + 1} of {steps.length}</p>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                                {Math.round(generationProgress)}%
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '12px', background: 'var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                            <div
                                style={{
                                    width: `${generationProgress}%`,
                                    height: '100%',
                                    background: 'linear-gradient(to right, var(--primary), #7c3aed)',
                                    transition: 'width 0.5s ease-out'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                        <Card style={{ background: '#0f172a', color: '#94a3b8', fontFamily: 'monospace', padding: '1.5rem', height: '300px', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', marginBottom: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>
                                <Terminal size={16} />
                                <span>EXTRACTION_LOGS</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {generationLogs.map((log, i) => (
                                    <div key={i} style={{ fontSize: '0.875rem' }}>
                                        <span style={{ color: '#64748b' }}>[{new Date().toLocaleTimeString()}]</span> {log}
                                    </div>
                                ))}
                                {isGenerating && <div className="typing-indicator" style={{ color: '#38bdf8' }}>_</div>}
                            </div>
                        </Card>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Card style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                                    <ShieldCheck size={18} color="var(--success)" />
                                    Traceability Meter
                                </div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>88%</div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Statements with citations</p>
                            </Card>

                            <Card style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                                    <AlertTriangle size={18} color="var(--warning)" />
                                    Conflicts Detected
                                </div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{generationStep > 3 ? '2' : '0'}</div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Flagged for review</p>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerateSection;
