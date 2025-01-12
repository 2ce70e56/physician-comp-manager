import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { UserNav } from './user-nav'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Providers', href: '/providers' },
  { name: 'Contracts', href: '/contracts' },
  { name: 'Analytics', href: '/analytics' },
  { name: 'Market Data', href: '/market-data' },
  { name: 'Reports', href: '/reports' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">CompManager</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground/80 ${pathname === item.href ? 'text-foreground' : 'text-foreground/60'}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </header>
  )
}