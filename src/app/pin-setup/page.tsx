'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SheetContainer, OTPInput, Button } from '@/components/ui';
import { notifyNavigation } from '@/lib/bridge';
import EyeButton from '@/components/ui/EyeButton';
import { routes } from '@/lib/routes';
import { PIN_LENGTH } from '@/lib/types';
import type { CardType } from '@/lib/types';

function PinSetupContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const cardType = (searchParams.get('type') as CardType) || 'debit';
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPinVisible, setIsPinVisible] = useState(false);
    const [isConfirmPinVisible, setIsConfirmPinVisible] = useState(false);

    useEffect(() => {
        notifyNavigation('pin-setup');
    }, []);

    const handleContinue = async () => {
        if (pin.length !== PIN_LENGTH) {
            setError('Please enter a 4-digit PIN');
            return;
        }

        if (confirmPin.length !== PIN_LENGTH) {
            setError('Please re-enter your PIN');
            return;
        }

        if (pin !== confirmPin) {
            setError('PINs do not match. Please try again.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        // Mockup: simulate delay then navigate
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push(routes.howToUseCard(cardType));
    };

    return (
        <div className="h-dvh flex flex-col">
            <SheetContainer>
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 p-6 py-10 px-5 text-center flex flex-col items-center justify-start gap-2 overflow-auto">
                        <h2 className="text-xl font-semibold text-text-primary m-0">
                            PIN Setup
                        </h2>
                        <p className="text-[13px] text-text-primary m-0">
                            Please setup your PIN for this Instacard
                        </p>

                        <div className="mt-4 w-full">
                            <p className="text-sm text-text-primary mb-2">Enter 4-digit PIN</p>
                            <div
                                className={`cursor-pointer flex items-center justify-center gap-3`}
                            >
                                <OTPInput
                                    value={pin}
                                    maxLength={PIN_LENGTH}
                                    onChange={setPin}
                                />
                                <EyeButton
                                    isVisible={isPinVisible}
                                    onToggle={setIsPinVisible}
                                    size="md"
                                />
                            </div>
                        </div>

                        <div className="mt-3 w-full">
                            <p className="text-sm text-text-primary mb-2">Re-Enter PIN</p>
                            <div
                                className={`cursor-pointer flex items-center justify-center gap-3`}
                            >
                                <OTPInput
                                    value={confirmPin}
                                    maxLength={PIN_LENGTH}
                                    onChange={setConfirmPin}
                                />
                                <EyeButton
                                    isVisible={isConfirmPinVisible}
                                    onToggle={setIsConfirmPinVisible}
                                    size="md"
                                />
                            </div>
                        </div>
                        <div className="my-1 min-h-[24px]">
                            {error && (
                                <p className="text-sm text-red-500">{error}</p>
                            )}
                        </div>

                    </div>
                    <div className="w-full flex flex-col items-center gap-3 pb-10 px-6">

                        <Button
                            fullWidth
                            onClick={handleContinue}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Setting up...' : 'Continue'}
                        </Button>
                    </div>
                </div>
            </SheetContainer>
        </div>
    );
}

export default function PinSetupPage() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <PinSetupContent />
        </Suspense>
    );
}
