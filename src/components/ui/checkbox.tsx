'use client';

import { InstacardColors } from '@/constants/colors';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  accessibilityLabel?: string;
}

export function Checkbox({ label, checked, onChange, accessibilityLabel }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={accessibilityLabel || label}
      onClick={() => onChange(!checked)}
      className="btn-press"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          border: `2px solid ${checked ? InstacardColors.primary : InstacardColors.border}`,
          backgroundColor: checked ? InstacardColors.primary : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
          transition: 'all 0.2s ease',
        }}
      >
        {checked && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke={InstacardColors.white}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        style={{
          fontSize: 13,
          color: InstacardColors.textSecondary,
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </button>
  );
}
