import React from 'react'
import Link from 'next/link'
import {
  Archive,
  Blinds,
  Cog,
  Home,
  List,
  LogOut,
  Store,
  Users,
} from 'lucide-react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import Logo from './Logo'
import { Projector } from 'lucide-react'

export default function Nav({ show }) {
  const router = useRouter()
  const { pathname } = router

  async function logout() {
    await router.push('/')
    await signOut()
  }

  const inactiveLink = 'flex gap-1 p-1 rounded-sm items-center'
  const activeLink = inactiveLink + ' bg-highlight text-black'

  return (
    <aside
      className={
        (show ? 'left-0' : '-left-full') +
        ' top-0 text-gray-500 p-4 fixed w-full bg-bgGray h-full md:static md:w-auto transition-all z-50'
      }
    >
      <div className="mr-4 mb-4">
        <Logo />
      </div>
      <nav className="flex flex-col gap-2 ">
        <Link
          className={pathname === '/' ? activeLink : inactiveLink}
          href={'/'}
        >
          <Home size={20} />
          Daschboard
        </Link>
        <Link
          className={pathname.includes('/slider') ? activeLink : inactiveLink}
          href={'/slider'}
        >
          <Projector />
          Slider
        </Link>
        <Link
          className={pathname.includes('/products') ? activeLink : inactiveLink}
          href={'/products'}
        >
          <Archive size={20} />
          Products
        </Link>
        <Link
          className={
            pathname.includes('/categories') ? activeLink : inactiveLink
          }
          href={'/categories'}
        >
          <List size={20} />
          Categories
        </Link>
        <Link
          className={pathname.includes('/orders') ? activeLink : inactiveLink}
          href={'/orders'}
        >
          <Blinds size={20} />
          Orders
        </Link>
        <Link
          className={pathname.includes('/admins') ? activeLink : inactiveLink}
          href={'/admins'}
        >
          <Users size={20} />
          Admins
        </Link>
        <Link
          className={pathname.includes('/settings') ? activeLink : inactiveLink}
          href={'/settings'}
        >
          <Cog size={20} />
          Settings
        </Link>
        <button onClick={logout} className={inactiveLink}>
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  )
}
