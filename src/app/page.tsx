'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, SheetContainer, RadioOption, Button } from '@/components/ui';
import { InstacardColors } from '@/constants/colors';
import { useAuth } from '@/lib/auth-context';
import { notifyNavigation } from '@/lib/bridge';

const CARD_TYPES = [
  { id: 'debit', label: 'Debit Card' },
  { id: 'credit', label: 'Credit Card' },
  { id: 'prepaid', label: 'Pre-Paid Card' },
  { id: 'gift', label: 'Gift A Card' },
] as const;

type CardType = (typeof CARD_TYPES)[number]['id'];

export default function SelectCardTypePage() {
  const router = useRouter();
  const { config, isLoading, isAuthenticated, error } = useAuth();
  const [selectedType, setSelectedType] = useState<CardType>('debit');

  useEffect(() => {
    notifyNavigation('select-card-type');
  }, []);

  // Pre-select card type if provided by SDK
  useEffect(() => {
    if (config?.cardType) {
      setSelectedType(config.cardType);
    }
  }, [config?.cardType]);

  const handleNext = () => {
    router.push(`/add-${selectedType}`);
  };

  if (isLoading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: InstacardColors.primary,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: `3px solid ${InstacardColors.primaryLight}`,
            borderTopColor: InstacardColors.white,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (error || !isAuthenticated) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: InstacardColors.primary,
          padding: 24,
          textAlign: 'center',
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke={InstacardColors.error}
            strokeWidth="2"
          />
          <path
            d="M12 8V12M12 16H12.01"
            stroke={InstacardColors.error}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <h2
          style={{
            color: InstacardColors.white,
            marginTop: 16,
            fontSize: 20,
          }}
        >
          Authentication Error
        </h2>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            marginTop: 8,
            fontSize: 14,
          }}
        >
          {error || 'Unable to authenticate. Please try again.'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header title="Add Instacard" />

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
            Select the type of Instacard you would like to be issued
          </p>

          <div
            role="radiogroup"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {CARD_TYPES.map((option) => (
              <RadioOption
                key={option.id}
                label={option.label}
                selected={option.id === selectedType}
                onSelect={() => setSelectedType(option.id)}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            padding: '8px 16px 24px',
            paddingBottom: 'calc(env(safe-area-inset-bottom, 24px) + 24px)',
          }}
        >
          <Button fullWidth onClick={handleNext}>
            Next
          </Button>
        </div>
      </SheetContainer>
    </div>
  );
}
