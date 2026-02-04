'use client'
import ManageDebitCardScreen from '@/features/manage-card/components/ManageDebitCardScreen'
import CardPinAuth from '@/features/card-detail/components/CardPinAuth'
import React, { useState } from 'react'

const CORRECT_PIN = '0000'

export default function page() {
  const [isVerified, setIsVerified] = useState(false)

  if (!isVerified) {
    return (
      <CardPinAuth
        title="Enter PIN to Manage this Debit Card"
        cardImageSrc="/img/debitmockup.png"
        maskedNumber="0000 0000 0000 0000"
        correctPin={CORRECT_PIN}
        onVerified={() => setIsVerified(true)}
      />
    )
  }

  return <ManageDebitCardScreen />
}





