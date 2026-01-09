import React from 'react';
import { Link2, FileText, AlertCircle } from 'lucide-react';
import { Card, Badge } from '../common/UI';

interface TraceabilityPanelProps {
    item: any;
}

const TraceabilityPanel: React.FC<TraceabilityPanelProps> = ({ item }) => {
    if (!item) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                <Link2 size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                <p>Select an item from the brief to view its traceability and evidence.</p>
            </div>
        );
    }

    return (
        <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link2 size={20} />
                Traceability & Evidence
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
                        Confidence Score
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ flex: 1, height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${item.confidence}%`, height: '100%', background: item.confidence > 80 ? 'var(--success)' : 'var(--warning)' }} />
                        </div>
                        <span style={{ fontWeight: 700, color: item.confidence > 80 ? 'var(--success)' : 'var(--warning)' }}>{item.confidence}%</span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        {item.confidence > 80
                            ? "High confidence based on multiple consistent source documents."
                            : "Moderate confidence due to slight ambiguity in stakeholder transcripts."}
                    </p>
                </div>

                <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
                        Source Documents
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <Badge variant="info">RFP_MemberPortal</Badge>
                        <Badge variant="info">Stakeholder_Interview</Badge>
                    </div>
                </div>

                <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
                        Evidence Snippets
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <Card style={{ padding: '0.75rem', background: 'white', fontSize: '0.875rem', borderLeft: '3px solid var(--primary)' }}>
                            <p style={{ fontStyle: 'italic' }}>"{item.evidence}"</p>
                            <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600 }}>
                                <FileText size={12} />
                                Jump to source
                            </div>
                        </Card>
                    </div>
                </div>

                <div style={{ padding: '1rem', background: '#fff7ed', border: '1px solid #ffedd5', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9a3412', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        <AlertCircle size={16} />
                        Conflicts Detected
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: '#9a3412' }}>
                        Stakeholder David Miller mentioned "real-time only" while the RFP suggests "batch updates nightly".
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TraceabilityPanel;
