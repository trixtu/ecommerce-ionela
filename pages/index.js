/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img
            className="w-6 h-6"
            src={session?.user?.image}
            width={200}
            height={200}
            alt="img"
          />
          <span className=" px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  )
}
