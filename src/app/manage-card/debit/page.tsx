'use client'

import ManageDebitCardScreen from '@/features/manage-card/components/ManageDebitCardScreen'
import CardPinAuth from '@/features/card-detail/components/CardPinAuth'
import React, { useState } from 'react'
import { CARD_CONFIG } from '@/lib/card-config'

export default function ManageDebitPage() {
  const [isVerified, setIsVerified] = useState(false)

  if (!isVerified) {
    return (
      <CardPinAuth
        title="Enter PIN to Manage this Debit Card"
        cardImageSrc={CARD_CONFIG.debit.mockupImage}
        maskedNumber="0000 0000 0000 0000"
        onVerified={() => setIsVerified(true)}
      />
    )
  }

  return <ManageDebitCardScreen />
}
