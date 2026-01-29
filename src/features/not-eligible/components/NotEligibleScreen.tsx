'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, SheetContainer, Button } from '@/components/ui';
import { notifyNavigation } from '@/lib/bridge';

export default function NotEligibleScreen() {
  const router = useRouter();

  useEffect(() => {
    notifyNavigation('not-eligible');
  }, []);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="h-screen flex flex-col">
      <Header title="Not Eligible" showBackButton onBack={handleBack} />

      <SheetContainer>
        <div className="flex-1 flex items-center justify-center overflow-auto py-10 p-6">
          <div className="p-2 text-sm bg-white space-y-6  text-center text-text-primary rounded-2xl mb-6">
            <p className="font-medium">
              Dear Customer, you are not eligible for the Credit Card product at this time,
              Kindly call our contact center on{' '}
              <span className="font-semibold">012712003-7</span> for details
            </p>
          </div>
        </div>

        <div className="p-4 pb-[calc(env(safe-area-inset-bottom,24px)+24px)] pt-2">
          <Button fullWidth onClick={handleBack}>
            Go Back
          </Button>
        </div>
      </SheetContainer>
    </div>
  );
}

