'use client';

import { InstacardColors } from '@/constants/colors';
import { notifyUserCancelled } from '@/lib/bridge';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function Header({ title = 'Instacard', showBackButton = false, onBack }: HeaderProps) {
  // Close button (X) - always closes the WebView and returns to native app
  const handleClose = () => {
    notifyUserCancelled();
  };

  // Back button (arrow) - navigates back within the PWA
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        paddingTop: 'calc(env(safe-area-inset-top, 12px) + 12px)',
        backgroundColor: InstacardColors.primary,
      }}
    >
      {showBackButton ? (
        <button
          onClick={handleBack}
          aria-label="Go back"
          className="btn-press"
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke={InstacardColors.textOnPrimary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : (
        <div style={{ width: 40 }} />
      )}

      <h1
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: InstacardColors.textOnPrimary,
          margin: 0,
        }}
      >
        {title}
      </h1>

      <button
        onClick={handleClose}
        aria-label="Close"
        className="btn-press"
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke={InstacardColors.textOnPrimary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </header>
  );
}
