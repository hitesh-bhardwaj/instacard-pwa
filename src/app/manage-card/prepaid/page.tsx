'use client'
import CardPinAuth from '@/features/card-detail/components/CardPinAuth'
import ManagePrepaidCardScreen from '@/features/manage-card/components/ManagePrepaidCardScreen'
import React, { useState } from 'react'

const CORRECT_PIN = '0000'

export default function page() {
  const [isVerified, setIsVerified] = useState(false)

  if (!isVerified) {
    return (
      <CardPinAuth
        title="Enter PIN to Manage this Prepaid Card"
        cardImageSrc="/img/prepaid.png"
        maskedNumber="0000 0000 0000 0000"
        correctPin={CORRECT_PIN}
        onVerified={() => setIsVerified(true)}
      />
    )
  }

  return <ManagePrepaidCardScreen />
}





