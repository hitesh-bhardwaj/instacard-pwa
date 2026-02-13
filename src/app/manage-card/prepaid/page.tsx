'use client'

import CardPinAuth from '@/features/card-detail/components/CardPinAuth'
import ManagePrepaidCardScreen from '@/features/manage-card/components/ManagePrepaidCardScreen'
import React, { useState } from 'react'
import { CARD_CONFIG } from '@/lib/card-config'

export default function ManagePrepaidPage() {
  const [isVerified, setIsVerified] = useState(false)

  if (!isVerified) {
    return (
      <CardPinAuth
        title="Enter PIN to Manage this Prepaid Card"
        cardImageSrc={CARD_CONFIG.prepaid.mockupImage}
        maskedNumber="0000 0000 0000 0000"
        onVerified={() => setIsVerified(true)}
      />
    )
  }

  return <ManagePrepaidCardScreen />
}
