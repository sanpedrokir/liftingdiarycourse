'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

const links = [
  { href: '/', label: 'Log' },
  { href: '/history', label: 'History' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="max-w-2xl mx-auto px-4 flex items-center gap-6">
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
        <div className="ml-auto flex items-center gap-3 py-3">
          <Show when="signed-out">
            <SignInButton>
              <button className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="text-sm bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-3 py-1.5 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors">
                Sign up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  )
}
