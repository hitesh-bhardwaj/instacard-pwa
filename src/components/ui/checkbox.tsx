'use client';

import { haptic } from '@/lib/useHaptics';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  accessibilityLabel?: string;
}

export function Checkbox({ label, checked, onChange, accessibilityLabel }: CheckboxProps) {
  const handleChange = () => {
    haptic('light');
    onChange(!checked);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={accessibilityLabel || label}
      onClick={handleChange}
      className="btn-press flex items-start gap-[10px] bg-transparent border-none p-0 cursor-pointer text-left"
    >
      <span
        className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-[2px] transition-all duration-200 ease-in-out ${
          checked ? 'border-primary bg-primary' : 'border-border bg-transparent'
        }`}
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
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="text-[13px] text-text-secondary leading-[1.4]">
        {label}
      </span>
    </button>
  );
}
