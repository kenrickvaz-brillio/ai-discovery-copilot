import React from 'react';
import { useStore } from '../../store/useStore';

const INDUSTRIES = ['Healthcare', 'Insurance', 'Retail', 'Telecom', 'Banking'];
const PRODUCT_TYPES = ['Member portal', 'Mobile app', 'Internal tool', 'Data platform'];
const TIMELINES = ['8 weeks', '12 weeks', '16 weeks'];
const CONSTRAINTS = [
    'Must reuse existing systems',
    'Zero downtime migration',
    'Accessibility AA required',
    'Cloud-first'
];
const OUTPUT_FORMATS = [
    'Discovery Brief',
    'Persona cards',
    'NFR matrix',
    'Risk register',
    'Opportunity sizing summary'
];
const AI_TONES = ['Executive', 'Product', 'Engineering'];

const ConfigSection: React.FC = () => {
    const {
        industry, setIndustry,
        productType, setProductType,
        timeline, setTimeline,
        constraints, toggleConstraint,
        outputFormats, toggleOutputFormat,
        aiTone, setAiTone
    } = useStore();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Industry</label>
                    <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                    >
                        {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                </div>
                <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Product Type</label>
                    <select
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                    >
                        {PRODUCT_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
            </div>

            <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Target Timeline</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {TIMELINES.map(t => (
                        <button
                            key={t}
                            onClick={() => setTimeline(t)}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: `1px solid ${timeline === t ? 'var(--primary)' : 'var(--border)'}`,
                                background: timeline === t ? 'var(--primary-light)' : 'var(--surface)',
                                color: timeline === t ? 'var(--primary)' : 'var(--text-main)',
                                fontWeight: timeline === t ? 600 : 400
                            }}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '1rem' }}>Team Constraints</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {CONSTRAINTS.map(c => (
                        <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={constraints.includes(c)}
                                onChange={() => toggleConstraint(c)}
                                style={{ width: '18px', height: '18px' }}
                            />
                            <span style={{ fontSize: '0.9375rem' }}>{c}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '1rem' }}>Output Formats</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {OUTPUT_FORMATS.map(f => (
                        <button
                            key={f}
                            onClick={() => toggleOutputFormat(f)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                border: `1px solid ${outputFormats.includes(f) ? 'var(--primary)' : 'var(--border)'}`,
                                background: outputFormats.includes(f) ? 'var(--primary)' : 'var(--surface)',
                                color: outputFormats.includes(f) ? 'white' : 'var(--text-muted)',
                                fontSize: '0.875rem',
                                fontWeight: 500
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>AI Tone</label>
                <select
                    value={aiTone}
                    onChange={(e) => setAiTone(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                >
                    {AI_TONES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
        </div>
    );
};

export default ConfigSection;
