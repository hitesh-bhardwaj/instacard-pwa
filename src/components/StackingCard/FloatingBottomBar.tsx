'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { Home, ScanLine, User } from 'lucide-react';
import Link from 'next/link';

interface FloatingBottomBarProps {
  mode: 'virtual' | 'universal';
  onHomePress?: () => void;
  onScanPress?: () => void;
  onAddPress?: () => void;
  onAddGiftPress?: () => void;
  onProfilePress?: () => void;
}

function hapticLight() {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(10);
  }
}

function hapticMedium() {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(20);
  }
}

export function FloatingBottomBar({
  mode,
  onHomePress,
  onScanPress,
  onAddPress,
  onAddGiftPress,
  onProfilePress,
}: FloatingBottomBarProps) {
  return (
    <div
      className="shrink-0 w-full z-30 bg-primary pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] relative"
      role="navigation"
      aria-label="Bottom actions"
    >
      <div className="flex items-end justify-between px-8">
        {/* Home */}
        <Link
          href="/"
          className="flex flex-col items-center gap-1 px-3"
          onClick={() => {
            hapticLight();
            onHomePress?.();
          }}
          aria-label="Home"
        >
          <Home className="w-5 h-5 text-white" />
          <span className="text-white text-xs">Home</span>
        </Link>

        {/* ScanPay */}
        <button
          type="button"
          className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 bottom-0 gap-1 px-3"
          onClick={() => {
            hapticMedium();
            onScanPress?.();
          }}
          aria-label="ScanPay"
        >
          <div className="h-20 w-20 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-lg">
            <ScanLine className="w-7 h-7 text-primary" />
          </div>
          <span className="text-white text-xs mt-1">ScanPay</span>
        </button>

        {/* Profile */}
        <button
          type="button"
          className="flex flex-col items-center gap-1 px-3"
          onClick={() => {
            hapticLight();
            onProfilePress?.();
          }}
          aria-label="Profile"
        >
          <User className="w-5 h-5 text-white" />
          <span className="text-white text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}

export default FloatingBottomBar;
