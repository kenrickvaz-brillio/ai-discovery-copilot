import React, { useState } from 'react';
import { Play, MessageSquare, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button, Card } from '../common/UI';

const DemoControls: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const { loadSampleProject } = useStore();

    const handleAutoFill = () => {
        loadSampleProject();
        setIsOpen(false);
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        boxShadow: 'var(--shadow-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <Play size={24} />
                </button>
            ) : (
                <Card style={{ width: '320px', padding: '1.5rem', boxShadow: 'var(--shadow-lg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1rem' }}>Demo Controls</h3>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={18} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <Button variant="primary" style={{ width: '100%' }} onClick={handleAutoFill}>
                            <Play size={16} style={{ marginRight: '0.5rem' }} />
                            Auto-fill Sample Data
                        </Button>
                        <Button variant="outline" style={{ width: '100%' }} onClick={() => setShowNotes(!showNotes)}>
                            <MessageSquare size={16} style={{ marginRight: '0.5rem' }} />
                            {showNotes ? 'Hide' : 'Show'} Presenter Notes
                        </Button>
                    </div>

                    {showNotes && (
                        <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem' }}>
                            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li>Start by showing the messy source docs.</li>
                                <li>Highlight the "Messiness Slider" impact.</li>
                                <li>Run the generation and talk through the steps.</li>
                                <li>Show how the brief traces back to evidence.</li>
                                <li>Use the sliders to show ROI potential.</li>
                            </ul>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
};

export default DemoControls;
