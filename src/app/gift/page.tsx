'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, SheetContainer, RadioOption, Checkbox, Button } from '@/components/ui';
import { InstacardColors } from '@/constants/colors';
import { notifyNavigation } from '@/lib/bridge';

const GIFT_AMOUNTS = [
  { id: '2500', label: '₦2,500' },
  { id: '5000', label: '₦5,000' },
  { id: '10000', label: '₦10,000' },
  { id: '50000', label: '₦50,000' },
];

export default function AddGiftPage() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState(GIFT_AMOUNTS[1].id);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    notifyNavigation('add-gift');
  }, []);

  const handleNext = () => {
    router.push('/otp');
  };

  const handleBack = () => {
    router.back();
  };

  const isFormValid = recipientName.trim() && recipientEmail.trim() && acceptedTerms;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header title="Gift a Card" showBackButton onBack={handleBack} />

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
            Select gift card amount
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
            {GIFT_AMOUNTS.map((amount) => (
              <RadioOption
                key={amount.id}
                label={amount.label}
                selected={amount.id === selectedAmount}
                onSelect={() => setSelectedAmount(amount.id)}
              />
            ))}
          </div>

          <p
            style={{
              fontSize: 14,
              color: InstacardColors.textPrimary,
              marginBottom: 12,
            }}
          >
            Recipient Details
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            <input
              type="text"
              placeholder="Recipient Name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              style={{
                padding: '14px 16px',
                borderRadius: 14,
                border: `1px solid ${InstacardColors.border}`,
                fontSize: 15,
                color: InstacardColors.textPrimary,
                outline: 'none',
              }}
            />
            <input
              type="email"
              placeholder="Recipient Email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              style={{
                padding: '14px 16px',
                borderRadius: 14,
                border: `1px solid ${InstacardColors.border}`,
                fontSize: 15,
                color: InstacardColors.textPrimary,
                outline: 'none',
              }}
            />
          </div>

          <Checkbox
            label="I agree to the terms & conditions for gift cards"
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
          <Button fullWidth onClick={handleNext} disabled={!isFormValid}>
            Continue to Payment
          </Button>
        </div>
      </SheetContainer>
    </div>
  );
}
