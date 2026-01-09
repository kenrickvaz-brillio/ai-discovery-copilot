import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FolderOpen, Clock, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button, Card, Badge } from '../components/common/UI';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { projects, loadSampleProject, resetWizard } = useStore();

    const handleNewDiscovery = () => {
        resetWizard();
        navigate('/wizard');
    };

    const handleOpenSample = () => {
        loadSampleProject();
        navigate('/wizard');
    };

    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, #2563eb, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    From messy inputs to structured clarity.
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Simulate an AI-powered discovery workflow that ingests messy inputs and outputs a structured Discovery Brief in seconds.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Button size="lg" onClick={handleNewDiscovery}>
                        <Plus size={20} style={{ marginRight: '0.5rem' }} />
                        New Discovery
                    </Button>
                    <Button variant="outline" size="lg" onClick={handleOpenSample}>
                        <FolderOpen size={20} style={{ marginRight: '0.5rem' }} />
                        Open Sample Project
                    </Button>
                </div>
            </div>

            <div>
                <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={24} />
                    Recent Projects
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {projects.map((project) => (
                        <Card key={project.id} className="project-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                                    <FileText size={24} />
                                </div>
                                <Badge variant={project.status === 'Generated' ? 'success' : 'default'}>
                                    {project.status}
                                </Badge>
                            </div>
                            <h3 style={{ marginBottom: '0.5rem' }}>{project.name}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                                Last updated: {project.timestamp}
                            </p>
                            <Button variant="outline" style={{ width: '100%' }} onClick={() => navigate(project.status === 'Generated' ? '/brief' : '/wizard')}>
                                Open Project
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
