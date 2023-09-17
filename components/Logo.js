import { Store } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <Link href={'/'} className="flex  gap-1">
      <Store size={20} />
      <span>Ecommerce Admin</span>
    </Link>
  )
}
