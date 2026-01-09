import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '1rem 2rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'between',
            alignItems: 'center'
        }}>
            <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Sparkles size={20} />
                </div>
                <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    AI Discovery Copilot
                </Link>
            </div>

            <nav style={{ display: 'flex', gap: '1.5rem', marginLeft: 'auto' }}>
                <Link to="/" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Projects</Link>
                <Link to="/wizard" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>New Discovery</Link>
            </nav>
        </header>
    );
};

export default Header;
