import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading,
    className = '',
    ...props
}) => {
    const variantClass = `btn-${variant}`;
    const sizeClass = `btn-${size}`;

    return (
        <button
            className={`btn ${variantClass} ${sizeClass} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? <span className="loader-sm mr-2"></span> : null}
            {children}
        </button>
    );
};

export const Card: React.FC<{
    children: React.ReactNode,
    className?: string,
    style?: React.CSSProperties,
    onClick?: () => void
}> = ({ children, className = '', style, onClick }) => (
    <div className={`card ${className}`} style={style} onClick={onClick}>
        {children}
    </div>
);

export const Badge: React.FC<{
    children: React.ReactNode,
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info',
    style?: React.CSSProperties
}> = ({ children, variant = 'default', style }) => (
    <span className={`badge badge-${variant}`} style={style}>
        {children}
    </span>
);
