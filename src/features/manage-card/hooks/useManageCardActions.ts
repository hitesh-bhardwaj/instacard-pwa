'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { haptic } from '@/lib/useHaptics'
import { useCardWalletStore } from '@/store/useCardWalletStore'
import { routes } from '@/lib/routes'
import type { CardAction } from '../constants'

export function useManageCardActions() {
  const router = useRouter()
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const managingCardId = useCardWalletStore((s) => s.managingCardId)
  const removeCard = useCardWalletStore((s) => s.removeCard)

  const handleCardActionClick = (action: CardAction) => {
    if (action.text === 'Remove Card') {
      setShowRemoveModal(true)
    } else {
      router.push(action.route)
      haptic('heavy')
    }
  }

  const handleRemoveCard = () => {
    if (managingCardId) {
      removeCard(managingCardId)
      console.log('Card removed:', managingCardId)
    }
    setShowRemoveModal(false)
    router.push(routes.instacard)
  }

  return {
    showRemoveModal,
    setShowRemoveModal,
    handleCardActionClick,
    handleRemoveCard,
  }
}
