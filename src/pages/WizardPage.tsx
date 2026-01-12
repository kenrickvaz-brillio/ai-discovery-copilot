import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText, Settings, Zap, CheckCircle,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/common/UI';
import InputSection from '../components/discovery/InputSection';
import ConfigSection from '../components/discovery/ConfigSection';
import GenerateSection from '../components/discovery/GenerateSection';

const STEPS = [
    { id: 'inputs', label: 'Inputs', icon: FileText, description: 'Source documents' },
    { id: 'configure', label: 'Configure', icon: Settings, description: 'AI parameters' },
    { id: 'generate', label: 'Generate', icon: Zap, description: 'Synthesis' },
    { id: 'review', label: 'Review & Export', icon: CheckCircle, description: 'Final brief' },
];

import '../styles/WizardPage.css';

const WizardPage: React.FC = () => {
    const navigate = useNavigate();
    const { currentStepIndex, setStepIndex, generatedBrief } = useStore();
    const [isCompleted, setIsCompleted] = useState(false);

    const handleNext = () => {
        if (currentStepIndex < STEPS.length - 1) {
            setStepIndex(currentStepIndex + 1);
        } else {
            navigate('/brief');
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setStepIndex(currentStepIndex - 1);
        }
    };

    return (
        <div className="wizard-container">
            {/* Sidebar Stepper */}
            <div className="wizard-sidebar">
                <div className="wizard-sidebar-content">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStepIndex;
                        const isPast = index < currentStepIndex;

                        return (
                            <div key={step.id} className="step-item">
                                <div
                                    className="step-icon-container"
                                    style={{
                                        background: isActive ? 'var(--primary)' : isPast ? 'var(--success-light)' : 'var(--background)',
                                        color: isActive ? 'white' : isPast ? 'var(--success)' : 'var(--text-muted)',
                                        border: isActive ? 'none' : '1px solid var(--border)',
                                    }}
                                >
                                    {isPast ? <CheckCircle size={20} /> : <Icon size={20} />}
                                </div>
                                <div>
                                    <div
                                        className="step-label"
                                        style={{ color: isActive ? 'var(--text-main)' : 'var(--text-muted)' }}
                                    >
                                        {step.label}
                                    </div>
                                    <div className="step-description">{step.description}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="wizard-main">
                <div className="wizard-content">
                    {currentStepIndex === 0 && <InputSection />}
                    {currentStepIndex === 1 && <ConfigSection />}
                    {currentStepIndex === 2 && <GenerateSection onComplete={() => setIsCompleted(true)} />}
                    {currentStepIndex === 3 && (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <div style={{
                                maxWidth: '1000px',
                                width: '80px',
                                height: '80px',
                                background: 'var(--success-light)',
                                color: 'var(--success)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 2rem'
                            }}>
                                <CheckCircle size={40} />
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Discovery Complete!</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your structured Discovery Brief is ready for review.</p>
                            <Button size="lg" onClick={() => navigate('/brief')}>View Discovery Brief</Button>
                        </div>
                    )}
                </div>

                {/* Footer Navigation */}
                <div className="wizard-footer">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={currentStepIndex === 0 || currentStepIndex === 2}
                    >
                        <ChevronLeft size={20} style={{ marginRight: '0.5rem' }} />
                        Back
                    </Button>

                    {currentStepIndex !== 2 && currentStepIndex !== 3 && (
                        <Button
                            variant="primary"
                            onClick={handleNext}
                            disabled={currentStepIndex === 2 && !generatedBrief}
                        >
                            Next
                            <ChevronRight size={20} style={{ marginLeft: '0.5rem' }} />
                        </Button>
                    )}

                    {currentStepIndex === 2 && isCompleted && (
                        <Button variant="primary" onClick={handleNext}>
                            View Discovery Brief
                            <ChevronRight size={20} style={{ marginLeft: '0.5rem' }} />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WizardPage;
