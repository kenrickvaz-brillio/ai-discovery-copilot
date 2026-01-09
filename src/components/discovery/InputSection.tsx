import React, { useState } from 'react';
import { FileText, Eye, UploadCloud, Info } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Card, Button } from '../common/UI';

const InputSection: React.FC = () => {
    const { files, toggleFile, messiness, setMessiness, sensitivity, setSensitivity, currentProjectName, setProjectName } = useStore();
    const [previewFile, setPreviewFile] = useState<any>(null);

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Project Name</label>
                <input
                    type="text"
                    value={currentProjectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem' }}>Source Documents</h3>
                    <Button variant="outline" size="sm">
                        <UploadCloud size={16} style={{ marginRight: '0.5rem' }} />
                        Add Files
                    </Button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {files.map((file) => (
                        <div
                            key={file.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-md)',
                                opacity: file.included ? 1 : 0.6
                            }}
                        >
                            <div style={{
                                background: 'var(--primary-light)',
                                color: 'var(--primary)',
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-sm)'
                            }}>
                                <FileText size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{file.name}.{file.extension}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {file.type} • {file.size} • Added by {file.addedBy}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Button variant="ghost" size="sm" onClick={() => setPreviewFile(file)}>
                                    <Eye size={16} />
                                </Button>
                                <input
                                    type="checkbox"
                                    checked={file.included}
                                    onChange={() => toggleFile(file.id)}
                                    style={{ width: '18px', height: '18px' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '1rem' }}>
                        Messiness Slider
                        <div title="Adjusts how chaotic the input data is (typos, contradictions, etc.)">
                            <Info size={14} color="var(--text-muted)" />
                        </div>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="2"
                        step="1"
                        value={messiness === 'low' ? 0 : messiness === 'medium' ? 1 : 2}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setMessiness(val === 0 ? 'low' : val === 1 ? 'medium' : 'high');
                        }}
                        style={{ width: '100%', marginBottom: '0.5rem' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '1rem' }}>Data Sensitivity</label>
                    <select
                        value={sensitivity}
                        onChange={(e) => setSensitivity(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)',
                            background: 'var(--surface)'
                        }}
                    >
                        <option value="Public">Public</option>
                        <option value="Internal">Internal</option>
                        <option value="Confidential">Confidential</option>
                        <option value="Regulated">Regulated</option>
                    </select>
                </div>
            </div>

            {previewFile && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }}>
                    <Card style={{ maxWidth: '800px', width: '100%', maxHeight: '80vh', overflowY: 'auto', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3>Preview: {previewFile.name}.{previewFile.extension}</h3>
                            <Button variant="ghost" onClick={() => setPreviewFile(null)}>Close</Button>
                        </div>
                        <pre style={{
                            whiteSpace: 'pre-wrap',
                            background: 'var(--background)',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.875rem',
                            lineHeight: 1.6
                        }}>
                            {previewFile.content}
                        </pre>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default InputSection;
