'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Log' },
  { href: '/history', label: 'History' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="max-w-2xl mx-auto px-4 flex gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
              pathname === href
                ? 'border-zinc-900 dark:border-zinc-50 text-zinc-900 dark:text-zinc-50'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
