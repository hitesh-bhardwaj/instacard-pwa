'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, SheetContainer, Checkbox, Button } from '@/components/ui';
import { InstacardColors } from '@/constants/colors';
import { notifyNavigation } from '@/lib/bridge';

const TERMS = [
  'You agree to the Instacard Credit Card Terms of Service',
  'You authorize a credit check for card approval',
  'You understand the interest rates and fees associated',
  'You agree to receive notifications about your card activity',
  'You confirm that you are eligible for a credit card',
] as const;

export default function AddCreditPage() {
  const router = useRouter();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    notifyNavigation('add-credit');
  }, []);

  const handleNext = () => {
    router.push('/otp');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header title="Add Credit Card" showBackButton onBack={handleBack} />

      <SheetContainer>
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: 16,
          }}
        >
          <p
            style={{
              fontSize: 16,
              color: InstacardColors.textPrimary,
              lineHeight: 1.4,
              marginBottom: 24,
            }}
          >
            Apply for a Credit Instacard
          </p>

          <div
            style={{
              padding: 16,
              backgroundColor: InstacardColors.lightGray,
              borderRadius: 12,
              marginBottom: 24,
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: InstacardColors.textSecondary,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Credit cards are subject to approval. You will be notified of your application status within 24-48 hours.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p
              style={{
                fontSize: 14,
                color: InstacardColors.textPrimary,
              }}
            >
              Please agree to Terms & Conditions
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {TERMS.map((term, index) => (
                <p
                  key={index}
                  style={{
                    fontSize: 13,
                    color: InstacardColors.textSecondary,
                    margin: 0,
                  }}
                >
                  - {term}
                </p>
              ))}
            </div>

            <Checkbox
              label="I agree to the above terms & conditions. Please process my application"
              checked={acceptedTerms}
              onChange={setAcceptedTerms}
            />
          </div>
        </div>

        <div
          style={{
            padding: '8px 16px 24px',
            paddingBottom: 'calc(env(safe-area-inset-bottom, 24px) + 24px)',
          }}
        >
          <Button fullWidth onClick={handleNext} disabled={!acceptedTerms}>
            Apply Now
          </Button>
        </div>
      </SheetContainer>
    </div>
  );
}
