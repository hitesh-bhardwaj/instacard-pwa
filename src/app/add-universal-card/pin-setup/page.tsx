'use client'

import { useRouter } from 'next/navigation'
import PinSetupForm from '@/features/pin/components/PinSetupForm'
import { routes } from '@/lib/routes'
import { useCardWalletStore } from '@/store/useCardWalletStore'
import type { CardType } from '@/lib/types'

export default function UniversalPinSetupPage() {
  const router = useRouter()
  const setPendingPin = useCardWalletStore((s) => s.setPendingPin)

  const handleSubmit = async (pin: string, _cardType: CardType) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setPendingPin(pin)
    router.push(routes.addUniversalSuccess)
  }

  return (
    <PinSetupForm
      title="PIN Setup"
      subtitle="Please setup your PIN for your Universal Card"
      pinLabel="Enter 4-digit PIN"
      confirmPinLabel="Re-Enter PIN"
      onSubmit={handleSubmit}
    />
  )
}
