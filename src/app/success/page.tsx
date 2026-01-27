'use client';

import { useEffect } from 'react';
import { Header, SheetContainer, Button } from '@/components/ui';
import { InstacardColors } from '@/constants/colors';
import { notifyNavigation, notifyCardAdded } from '@/lib/bridge';

export default function SuccessPage() {
  useEffect(() => {
    notifyNavigation('success');
  }, []);

  const handleDone = () => {
    // Notify SDK that card was added successfully
    notifyCardAdded({
      cardId: `card-${Date.now()}`,
      cardType: 'debit',
      lastFourDigits: '1234',
    });
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header title="Success" />

      <SheetContainer>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            textAlign: 'center',
          }}
        >
          {/* Success checkmark animation */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              backgroundColor: InstacardColors.success,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              animation: 'scaleIn 0.5s ease-out',
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke={InstacardColors.white}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: InstacardColors.textPrimary,
              margin: 0,
              marginBottom: 12,
            }}
          >
            Card Added Successfully!
          </h2>

          <p
            style={{
              fontSize: 15,
              color: InstacardColors.textSecondary,
              lineHeight: 1.5,
              margin: 0,
              maxWidth: 280,
            }}
          >
            Your new Debit Instacard has been issued and is ready to use.
          </p>

          {/* Card preview */}
          <div
            style={{
              marginTop: 32,
              width: '100%',
              maxWidth: 300,
              aspectRatio: '1.58',
              backgroundColor: InstacardColors.primary,
              borderRadius: 16,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 40px rgba(90, 17, 134, 0.3)',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 12,
                  color: 'rgba(255, 255, 255, 0.7)',
                  margin: 0,
                }}
              >
                INSTACARD
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: 18,
                  letterSpacing: 2,
                  color: InstacardColors.white,
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                **** **** **** 1234
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: 'rgba(255, 255, 255, 0.7)',
                  margin: 0,
                }}
              >
                DEBIT CARD
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '8px 16px 24px',
            paddingBottom: 'calc(env(safe-area-inset-bottom, 24px) + 24px)',
          }}
        >
          <Button fullWidth onClick={handleDone}>
            Done
          </Button>
        </div>

        <style jsx>{`
          @keyframes scaleIn {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </SheetContainer>
    </div>
  );
}
