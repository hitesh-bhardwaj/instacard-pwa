'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, SheetContainer, RadioOption, Checkbox, Button } from '@/components/ui';
import { InstacardColors } from '@/constants/colors';
import { notifyNavigation } from '@/lib/bridge';

const LOAD_AMOUNTS = [
  { id: '1000', label: '₦1,000' },
  { id: '5000', label: '₦5,000' },
  { id: '10000', label: '₦10,000' },
  { id: '25000', label: '₦25,000' },
];

export default function AddPrepaidPage() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState(LOAD_AMOUNTS[1].id);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    notifyNavigation('add-prepaid');
  }, []);

  const handleNext = () => {
    router.push('/otp');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header title="Add Prepaid Card" showBackButton onBack={handleBack} />

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
            Select initial load amount for your Prepaid Instacard
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
            {LOAD_AMOUNTS.map((amount) => (
              <RadioOption
                key={amount.id}
                label={amount.label}
                selected={amount.id === selectedAmount}
                onSelect={() => setSelectedAmount(amount.id)}
              />
            ))}
          </div>

          <Checkbox
            label="I agree to the terms & conditions for prepaid cards"
            checked={acceptedTerms}
            onChange={setAcceptedTerms}
          />
        </div>

        <div
          style={{
            padding: '8px 16px 24px',
            paddingBottom: 'calc(env(safe-area-inset-bottom, 24px) + 24px)',
          }}
        >
          <Button fullWidth onClick={handleNext} disabled={!acceptedTerms}>
            Continue to Payment
          </Button>
        </div>
      </SheetContainer>
    </div>
  );
}
