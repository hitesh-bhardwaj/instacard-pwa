'use client'
import CardPinAuth from '@/features/card-detail/components/CardPinAuth'
import ManageCreditCardScreen from '@/features/manage-card/components/ManageCreditCardScreen'
import React, { useState } from 'react'

const CORRECT_PIN = '0000'

export default function page() {
  const [isVerified, setIsVerified] = useState(false)

  if (!isVerified) {
    return (
      <CardPinAuth
        title="Enter PIN to Manage this Credit Card"
        cardImageSrc="/img/creditmockup.png"
        maskedNumber="0000 0000 0000 0000"
        correctPin={CORRECT_PIN}
        onVerified={() => setIsVerified(true)}
      />
    )
  }

  return <ManageCreditCardScreen />
}





