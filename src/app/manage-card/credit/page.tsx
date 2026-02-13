'use client'

import CardPinAuth from '@/features/card-detail/components/CardPinAuth'
import ManageCreditCardScreen from '@/features/manage-card/components/ManageCreditCardScreen'
import React, { useState } from 'react'
import { CARD_CONFIG } from '@/lib/card-config'

export default function ManageCreditPage() {
  const [isVerified, setIsVerified] = useState(false)

  if (!isVerified) {
    return (
      <CardPinAuth
        title="Enter PIN to Manage this Credit Card"
        cardImageSrc={CARD_CONFIG.credit.mockupImage}
        maskedNumber="0000 0000 0000 0000"
        onVerified={() => setIsVerified(true)}
      />
    )
  }

  return <ManageCreditCardScreen />
}
