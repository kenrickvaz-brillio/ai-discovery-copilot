import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{
            padding: '2rem',
            textAlign: 'center',
            borderTop: '1px solid var(--border)',
            color: 'var(--text-muted)',
            fontSize: '0.875rem'
        }}>
            <p>Frontend-only demo • Mock data • No uploads leave your browser</p>
            <p style={{ marginTop: '0.5rem' }}>© 2026 AI Discovery Copilot. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
