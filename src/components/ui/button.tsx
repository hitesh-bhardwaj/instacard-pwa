'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { InstacardColors } from '@/constants/colors';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, disabled, children, style, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 28,
      fontWeight: 500,
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'transform 0.1s ease, opacity 0.1s ease',
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.6 : 1,
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: InstacardColors.primary,
        color: InstacardColors.textOnPrimary,
      },
      secondary: {
        backgroundColor: InstacardColors.lightGray,
        color: InstacardColors.textPrimary,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: InstacardColors.primary,
      },
    };

    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: {
        padding: '10px 20px',
        fontSize: 10,
      },
      md: {
        padding: '16px 24px',
        fontSize: 14,
      },
      lg: {
        padding: '18px 32px',
        fontSize: 17,
      },
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className="btn-press"
        style={{
          ...baseStyles,
          ...variantStyles[variant],
          ...sizeStyles[size],
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
