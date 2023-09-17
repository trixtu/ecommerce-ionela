import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { signIn, useSession } from 'next-auth/react'
import Nav from '@/components/Nav'
import { Button } from '@mui/material'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import Logo from './Logo'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false)
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className=" bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn('google')}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-bgGray min-h-screen">
      <div className="md:hidden flex items-center p-4">
        <Button
          variant="outlined"
          color={'inherit'}
          onClick={() => setShowNav(true)}
        >
          <Menu />
        </Button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>

      <div className=" flex">
        <Nav show={showNav} />
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
          {children}
        </div>
      </div>
    </div>
  )
}
