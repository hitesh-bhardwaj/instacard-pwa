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
          className="w-[42px] h-[42px] rounded-lg border border-text-primary flex items-center justify-center text-md leading-none font-semibold text-text-primary"
        >
          {digit}
        </div>
      ))}
    </div>
  );
}
