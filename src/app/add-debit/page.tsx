'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, SheetContainer, RadioOption, Checkbox, Button } from '@/components/ui';
import { InstacardColors } from '@/constants/colors';
import { notifyNavigation } from '@/lib/bridge';

const ACCOUNT_OPTIONS = ['0123456789', '0987654321', '0918273645'];

const TERMS = [
  'You agree to the Instacard Terms of Service',
  'You authorize linking this bank account to your Instacard',
  'You understand that transactions will be debited from the linked account',
  'You agree to receive notifications about your card activity',
  'You confirm that you are the authorized account holder',
];

export default function AddDebitPage() {
  const router = useRouter();
  const [selectedAccount, setSelectedAccount] = useState(ACCOUNT_OPTIONS[0]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    notifyNavigation('add-debit');
  }, []);

  const handleNext = () => {
    router.push('/otp');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header title="Add Debit Card" showBackButton onBack={handleBack} />

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
              marginBottom: 16,
            }}
          >
            Select the Bank Account you want to link with this Debit Instacard
          </p>

          <div
            role="radiogroup"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginBottom: 24,
            }}
          >
            {ACCOUNT_OPTIONS.map((account) => (
              <RadioOption
                key={account}
                label={account}
                selected={account === selectedAccount}
                onSelect={() => setSelectedAccount(account)}
                accessibilityLabel={`Bank account ${account}`}
              />
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p
              style={{
                fontSize: 14,
                color: InstacardColors.textPrimary,
              }}
            >
              Please agree to Terms & Conditions for getting this Instacard issued
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
              label="I agree the above terms & conditions. Please issue this Instacard"
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
            Next
          </Button>
        </div>
      </SheetContainer>
    </div>
  );
}
