'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SheetContainer, OTPInput, OTPKeypad, Button } from '@/components/ui';
import { notifyNavigation } from '@/lib/bridge';

const PIN_LENGTH = 4;

type CardType = 'debit' | 'credit' | 'prepaid' | 'gift';

export default function PinSetupPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const cardType = (searchParams.get('type') as CardType) || 'debit';
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [activeField, setActiveField] = useState<'pin' | 'confirm'>('pin');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        notifyNavigation('pin-setup');
    }, []);

    const handleKeyPress = useCallback((key: string) => {
        const currentValue = activeField === 'pin' ? pin : confirmPin;
        const setValue = activeField === 'pin' ? setPin : setConfirmPin;

        // Clear error when user starts typing
        if (error) {
            setError(null);
        }

        if (key === 'del') {
            setValue((prev) => prev.slice(0, -1));
            return;
        }

        if (currentValue.length >= PIN_LENGTH) {
            // Auto-switch to confirm field when pin is complete
            if (activeField === 'pin') {
                setActiveField('confirm');
                setConfirmPin(key);
            }
            return;
        }

        setValue((prev) => `${prev}${key}`);
    }, [activeField, pin, confirmPin, error]);

    const handleContinue = async () => {
        // Validate PIN is entered
        if (pin.length !== PIN_LENGTH) {
            setError('Please enter a 4-digit PIN');
            return;
        }

        // Validate confirm PIN is entered
        if (confirmPin.length !== PIN_LENGTH) {
            setError('Please re-enter your PIN');
            return;
        }

        // Validate PINs match
        if (pin !== confirmPin) {
            setError('PINs do not match. Please try again.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            router.push(`/how-to-use-card?type=${cardType}`);
        } catch (err) {
            setError('Failed to set up PIN. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-screen flex flex-col">
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
                                onClick={() => setActiveField('pin')}
                                className={`cursor-pointer ${activeField === 'pin' ? 'opacity-100' : 'opacity-60'}`}
                            >
                                <OTPInput value={pin} maxLength={PIN_LENGTH} />
                            </div>
                        </div>

                        <div className="mt-3 w-full">
                            <p className="text-sm text-text-primary mb-2">Re-Enter PIN</p>
                            <div
                                onClick={() => setActiveField('confirm')}
                                className={`cursor-pointer ${activeField === 'confirm' ? 'opacity-100' : 'opacity-60'}`}
                            >
                                <OTPInput value={confirmPin} maxLength={PIN_LENGTH} />
                            </div>
                        </div>
                        <div className="my-1 min-h-[24px]">
                            {error && (
                                <p className="text-sm text-red-500">{error}</p>
                            )}
                        </div>

                        <Button
                            className="mt-4"
                            fullWidth
                            onClick={handleContinue}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Setting up...' : 'Continue'}
                        </Button>
                    </div>

                    <div className="w-full p-4 pb-[calc(env(safe-area-inset-bottom,16px)+16px)]">
                        <OTPKeypad onKeyPress={handleKeyPress} />
                    </div>
                </div>
            </SheetContainer>
        </div>
    );
}
