import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, FileUp, Settings, Zap, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/common/UI';
import InputSection from '../components/discovery/InputSection';
import ConfigSection from '../components/discovery/ConfigSection';
import GenerateSection from '../components/discovery/GenerateSection';

const STEPS = [
    { id: 'inputs', label: 'Inputs', icon: FileUp },
    { id: 'configure', label: 'Configure', icon: Settings },
    { id: 'generate', label: 'Generate', icon: Zap },
    { id: 'review', label: 'Review & Export', icon: CheckCircle },
];

const WizardPage: React.FC = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const { isGenerating, generatedBrief } = useStore();
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentStepIndex < STEPS.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            navigate('/brief');
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };


    return (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 70px)' }}>
            {/* Sidebar Stepper */}
            <div style={{
                width: '280px',
                borderRight: '1px solid var(--border)',
                padding: '2rem',
                background: 'var(--surface)'
            }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>New Discovery</h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Follow the steps to generate your brief.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStepIndex;
                        const isCompleted = index < currentStepIndex || (index === 3 && generatedBrief);

                        return (
                            <div
                                key={step.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    background: isActive ? 'var(--primary-light)' : 'transparent',
                                    color: isActive ? 'var(--primary)' : isCompleted ? 'var(--success)' : 'var(--text-muted)',
                                    fontWeight: isActive ? 600 : 400,
                                    cursor: isGenerating ? 'not-allowed' : 'pointer'
                                }}
                                onClick={() => !isGenerating && setCurrentStepIndex(index)}
                            >
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    border: `2px solid ${isActive ? 'var(--primary)' : isCompleted ? 'var(--success)' : 'var(--border)'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {isCompleted ? <CheckCircle size={16} /> : <Icon size={16} />}
                                </div>
                                <span>{step.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {currentStepIndex === 0 && <InputSection />}
                    {currentStepIndex === 1 && <ConfigSection />}
                    {currentStepIndex === 2 && <GenerateSection onComplete={() => setCurrentStepIndex(3)} />}
                    {currentStepIndex === 3 && (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'var(--success)',
                                color: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 2rem'
                            }}>
                                <CheckCircle size={40} />
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Discovery Brief Ready!</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                We've synthesized your inputs into a structured brief. You can now review, edit, and export it.
                            </p>
                            <Button size="lg" onClick={() => navigate('/brief')}>
                                View Discovery Brief
                            </Button>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    {currentStepIndex < 2 && (
                        <div style={{
                            marginTop: '3rem',
                            paddingTop: '2rem',
                            borderTop: '1px solid var(--border)',
                            display: 'flex',
                            justifyContent: 'between',
                            alignItems: 'center'
                        }}>
                            <Button variant="ghost" onClick={handleBack} disabled={currentStepIndex === 0 || isGenerating}>
                                <ChevronLeft size={20} />
                                Back
                            </Button>
                            <Button onClick={handleNext} disabled={isGenerating} style={{ marginLeft: 'auto' }}>
                                Next
                                <ChevronRight size={20} />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WizardPage;
