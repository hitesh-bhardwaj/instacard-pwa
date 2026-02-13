'use client'

import CardPinAuth from '@/features/card-detail/components/CardPinAuth'
import ManageGiftCardScreen from '@/features/manage-card/components/ManageGiftCardScreen'
import React, { useState } from 'react'
import { CARD_CONFIG } from '@/lib/card-config'

export default function ManageGiftPage() {
  const [isVerified, setIsVerified] = useState(false)

  if (!isVerified) {
    return (
      <CardPinAuth
        title="Enter PIN to Manage this Gift Card"
        cardImageSrc={CARD_CONFIG.gift.mockupImage}
        maskedNumber="0000 0000 0000 0000"
        onVerified={() => setIsVerified(true)}
      />
    )
  }

  return <ManageGiftCardScreen />
}
