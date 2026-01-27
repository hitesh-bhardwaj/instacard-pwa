'use client';

import { InstacardColors } from '@/constants/colors';

interface RadioOptionProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  accessibilityLabel?: string;
}

export function RadioOption({ label, selected, onSelect, accessibilityLabel }: RadioOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={accessibilityLabel || label}
      onClick={onSelect}
      className="btn-press"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        borderRadius: 14,
        border: `1px solid ${selected ? InstacardColors.primary : InstacardColors.border}`,
        backgroundColor: InstacardColors.white,
        cursor: 'pointer',
        transition: 'border-color 0.2s ease',
      }}
    >
      <span
        style={{
          fontSize: 15,
          color: InstacardColors.textPrimary,
        }}
      >
        {label}
      </span>
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: `2px solid ${selected ? InstacardColors.primary : InstacardColors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.2s ease',
        }}
      >
        {selected && (
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: InstacardColors.primary,
            }}
          />
        )}
      </span>
    </button>
  );
}
