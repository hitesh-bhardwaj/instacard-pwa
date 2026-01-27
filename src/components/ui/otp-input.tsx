'use client';

import { useMemo } from 'react';
import { InstacardColors } from '@/constants/colors';

interface OTPInputProps {
  value: string;
  maxLength: number;
}

export function OTPInput({ value, maxLength }: OTPInputProps) {
  const digits = useMemo(() => {
    return Array.from({ length: maxLength }, (_, index) => value[index] || '');
  }, [value, maxLength]);

  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
      }}
      aria-label={`Verification code: ${value.length} of ${maxLength} digits entered`}
    >
      {digits.map((digit, index) => (
        <div
          key={index}
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            border: `1px solid ${digit ? InstacardColors.primary : InstacardColors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            color: InstacardColors.textPrimary,
            transition: 'border-color 0.2s ease',
          }}
        >
          {digit}
        </div>
      ))}
    </div>
  );
}
