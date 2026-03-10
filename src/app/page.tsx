'use client'

import Link from 'next/link'
import { routes } from '@/lib/routes'

export default function HomePage() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-background px-6">
      <Link
        href={routes.instacard}
        className="bg-primary text-white text-base font-medium px-8 py-4 rounded-full transition-transform active:scale-95"
      >
        Go to Instacard
      </Link>
    </div>
  )
}
