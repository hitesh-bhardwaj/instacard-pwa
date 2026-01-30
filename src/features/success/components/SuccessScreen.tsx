'use client';

import { useEffect } from 'react';
import { SheetContainer, Button } from '@/components/ui';
import { notifyNavigation, notifyCardAdded } from '@/lib/bridge';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SuccessScreen() {
  useEffect(() => {
    notifyNavigation('success');
  }, []);
  const router = useRouter();

  

  return (
    <div className="h-screen flex flex-col">
      {/* <Header title="Success" /> */}

      <SheetContainer>
        <div className="flex-1 flex flex-col items-start justify-center p-6 py-10 gap-10 text-center">
          {/* Success checkmark animation */}
          <div className="w-full flex  relative flex-col items-center justify-start animate-scale-in">
            <Image
              src={'/img/success.png'}
              alt="Success"
              width={200}
              height={200}
              className="w-[120px] h-auto absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
            />
            <div className="w-full bg-white/60 backdrop-blur-xl rounded-2xl border-text-secondary/20 space-y-4 py-6 z-5 relative border p-4  text-center mt-4">
              <p className="text-lg font-semibold text-text-primary">
                Payment was Successful!
              </p>
              <p className="text-sm text-text-secondary mt-2">
                We have successfully collected card issuance Fee of N XXXX for the Virtual
                Instacard you had requested to be issued.
              </p>
            </div>
          </div>

          {/* Card preview */}
          <div>
            <p className="text-[15px] pl-4 text-text-primary w-full text-left leading-normal m-0">
              Your Instacard is Ready for Activation.
            </p>
            <div className="mt-2 w-full  aspect-[1.58] rounded-2xl p-2flex flex-col justify-between ">
              <Image
                src={'/img/debitCard.png'}
                alt="Debit Card"
                width={1000}
                height={1000}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
        <div className="p-4 pb-[calc(env(safe-area-inset-bottom,24px)+24px)] pt-2">
          <Button fullWidth onClick={() => router.push('/pin-setup')}>
          Activate Now
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

