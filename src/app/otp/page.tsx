'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Header, SheetContainer, OTPInput, OTPKeypad, Button } from '@/components/ui';
import { InstacardColors } from '@/constants/colors';
import { notifyNavigation } from '@/lib/bridge';

const MAX_CODE_LENGTH = 6;

export default function OTPPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    notifyNavigation('otp-verification');
  }, []);

  const handleKeyPress = useCallback((key: string) => {
    if (key === 'del') {
      setCode((prev) => prev.slice(0, -1));
      return;
    }
    setCode((prev) => {
      if (prev.length >= MAX_CODE_LENGTH) {
        return prev;
      }
      return `${prev}${key}`;
    });
  }, []);

  const handleContinue = async () => {
    setIsVerifying(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    router.push('/success');
  };

  const handleBack = () => {
    router.back();
  };

  const handleResend = () => {
    setCode('');
    // TODO: Implement resend OTP API call
  };

  const isCodeComplete = code.length === MAX_CODE_LENGTH;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header title="Verify Phone" showBackButton onBack={handleBack} />

      <SheetContainer>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '24px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: InstacardColors.textPrimary,
                margin: 0,
              }}
            >
              Verify your Phone Number
            </h2>
            <p
              style={{
                fontSize: 13,
                color: InstacardColors.textSecondary,
                margin: 0,
              }}
            >
              We have sent you a 6-digit code to your number
            </p>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: InstacardColors.textPrimary,
                margin: 0,
              }}
            >
              +234 802-397-0955
            </p>
            <p
              style={{
                fontSize: 13,
                color: InstacardColors.textSecondary,
                margin: 0,
              }}
            >
              Please check your messages and enter it here
            </p>

            <div style={{ marginTop: 16, marginBottom: 20 }}>
              <OTPInput value={code} maxLength={MAX_CODE_LENGTH} />
            </div>

            <Button
              fullWidth
              onClick={handleContinue}
              disabled={!isCodeComplete || isVerifying}
            >
              {isVerifying ? 'Verifying...' : 'Continue'}
            </Button>

            <p
              style={{
                marginTop: 12,
                fontSize: 12,
                color: InstacardColors.textSecondary,
              }}
            >
              Didn&apos;t receive the Code?{' '}
              <button
                onClick={handleResend}
                style={{
                  background: 'none',
                  border: 'none',
                  color: InstacardColors.primary,
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 12,
                }}
              >
                Resend
              </button>
            </p>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <OTPKeypad onKeyPress={handleKeyPress} />
          </div>
        </div>
      </SheetContainer>
    </div>
  );
}
