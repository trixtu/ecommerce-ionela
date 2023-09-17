import clientPromise from '@/lib/mongoDb'
import { mongooseConnect } from '@/lib/mongoose'
import { Admin } from '@/models/Admin'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const adminEmails = 'trixtu12@gmail.com'

async function isAdminEmail(email) {
  mongooseConnect()
  return !!(await Admin.findOne({ email }))
  //return adminEmails
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token, user }) => {
      if (await isAdminEmail(session?.user?.email)) {
        return session
      } else {
        return false
      }
    },
  },
}

export default NextAuth(authOptions)

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!(await isAdminEmail(session?.user?.email))) {
    res.status(401)
    res.end()
    throw 'not an admin'
  }
}
