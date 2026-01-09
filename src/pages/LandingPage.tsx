import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FolderOpen, Clock, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button, Card, Badge } from '../components/common/UI';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { projects, resetWizard, loadSampleProject } = useStore();

    const handleNewDiscovery = () => {
        resetWizard();
        navigate('/wizard');
    };

    const handleOpenSample = () => {
        loadSampleProject();
        navigate('/brief');
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1.5rem', background: 'linear-gradient(to right, var(--primary), #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    AI Discovery Copilot
                </h1>
                <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
                    Transform messy stakeholder transcripts, RFPs, and emails into structured, professional discovery briefs in minutes.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
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

            {/* Recent Projects */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Recent Projects</h2>
                    <Button variant="ghost" size="sm">View All</Button>
                </div>

                {projects.length === 0 ? (
                    <Card style={{ textAlign: 'center', padding: '4rem', background: 'var(--surface)', border: '2px dashed var(--border)' }}>
                        <div style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                            <Clock size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                            <p>No recent projects found. Start a new discovery to begin.</p>
                        </div>
                        <Button variant="outline" onClick={handleNewDiscovery}>Create Your First Project</Button>
                    </Card>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {projects.map((project) => (
                            <Card key={project.id} style={{ cursor: 'pointer' }} onClick={() => navigate('/brief')}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                                        <FileText size={24} />
                                    </div>
                                    <Badge variant={project.status === 'Generated' ? 'success' : 'info'}>
                                        {project.status}
                                    </Badge>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{project.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                                    {project.industry || 'Unknown'} • {project.productType || 'Unknown'}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <Clock size={14} />
                                        {new Date(project.updatedAt || project.timestamp).toLocaleDateString()}
                                    </span>
                                    <span>{project.fileCount || 0} files analyzed</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
