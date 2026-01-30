'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SheetContainer, RadioOption, Button } from '@/components/ui';
import { InstacardColors } from '@/constants/colors';
import { useAuth } from '@/lib/auth-context';
import { notifyNavigation } from '@/lib/bridge';
import { haptic } from '@/lib/useHaptics';

const CARD_TYPES = [
  { id: 'debit', label: 'Debit Card', icon: '/svg/debitcard.svg' },
  { id: 'credit', label: 'Credit Card', icon: '/svg/creditcard.svg' },
  { id: 'prepaid', label: 'Pre-Paid Card', icon: '/svg/prepaidcard.svg' },
  { id: 'gift', label: 'Gift A Card', icon: '/svg/giftcard.svg' },
] as const;

type CardType = (typeof CARD_TYPES)[number]['id'];

export default function SelectCardTypeScreen() {
  const router = useRouter();
  const { config, isLoading, isAuthenticated, error } = useAuth();


  const initialSelectedType: CardType =
    config?.cardType && CARD_TYPES.some((t) => t.id === config.cardType)
      ? (config.cardType as CardType)
      : 'debit';

  const [selectedType, setSelectedType] = useState<CardType>(initialSelectedType);

  useEffect(() => {
    notifyNavigation('select-card-type');
  }, []);

  const handleNext = () => {
    router.push(`/${selectedType}`);
    haptic('medium');
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
      {/* <Header showCross={false}  title="Add Instacard" />  */}

      <SheetContainer>
        <div className="flex-1 overflow-auto p-6 py-10">
          <p
            className="text-[4vw] leading-[1.4] mb-[5vw]"
            style={{ color: InstacardColors.textPrimary }}
          >
            Select the type of Instacard you would like to be issued
          </p>

          <div role="radiogroup" className="flex flex-col gap-[3vw]">
            {CARD_TYPES.map((option) => (
              <RadioOption
                icon={option.icon}
                key={option.id}
                label={option.label}
                selected={option.id === selectedType}
                onSelect={() => {
                  setSelectedType(option.id)
                }}
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

