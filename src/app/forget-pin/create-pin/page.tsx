'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SheetContainer, OTPInput, Button } from '@/components/ui';
import { notifyNavigation, notifyUserCancelled } from '@/lib/bridge';
import EyeButton from '@/components/ui/EyeButton';
import Image from 'next/image';
import { PIN_LENGTH } from '@/lib/types';
import type { CardType } from '@/lib/types';

function PinSetupContent() {
    const searchParams = useSearchParams();
    const cardType = (searchParams.get('type') as CardType) || 'debit';
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPinVisible, setIsPinVisible] = useState(false);
    const [isConfirmPinVisible, setIsConfirmPinVisible] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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

        // Mockup: simulate delay then show success
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setShowSuccessPopup(true);
    };

    const handlePopupClose = () => {
        setShowSuccessPopup(false);
        notifyUserCancelled();
    };

    if (showSuccessPopup) {
        return (
            <div className="h-screen flex flex-col">
                <SheetContainer>
                    <div className="flex-1 flex flex-col items-start h-full justify-center p-6 py-10 gap-10 text-center">
                        {/* Success checkmark animation */}
                        <div className="w-full flex  relative flex-col items-center justify-start animate-scale-in">
                            <Image
                                src={'/img/success.png'}
                                alt="Success"
                                width={200}
                                height={200}
                                className="w-[120px] h-auto  object-contain"
                            />
                        </div>
                        <div className="w-full bg-white/60 backdrop-blur-xl rounded-2xl border-text-secondary/20 space-y-4 py-6 z-5 relative border p-4  text-center mt-4">
                            <p className="text-lg font-semibold text-text-primary">
                                PIN Updated Successfully!
                            </p>
                            <p className="text-sm text-text-secondary mt-2">
                                Your card PIN has been successfully updated.
                            </p>
                        </div>


                    </div>
                    <div className="p-4 pb-[calc(env(safe-area-inset-bottom,24px)+24px)] pt-2">
                        <Button fullWidth onClick={handlePopupClose}>
                            Back to Home
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
          .animate-scale-in {
            animation: scaleIn 0.5s ease-out;
          }
        `}</style>
                </SheetContainer>
            </div>
        );
    }

    return (
        <div className="h-dvh flex flex-col">
            <SheetContainer>
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 p-6 py-10 px-5 text-center flex flex-col items-center justify-start gap-2 overflow-auto">
                        <h2 className="text-xl font-medium text-text-primary m-0">
                          Create New PIN
                        </h2>
                        <p className="text-[13px] text-text-primary m-0">
                            Please setup your PIN for this Instacard
                        </p>

                        <div className="mt-4 w-full">
                            <p className="text-sm text-text-primary mb-2">Enter New PIN</p>
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
                            <p className="text-sm text-text-primary mb-2">Confirm New PIN</p>
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

export default function page() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <PinSetupContent />
        </Suspense>
    );
}
