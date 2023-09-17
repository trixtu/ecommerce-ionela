import { mongooseConnect } from '@/lib/mongoose'
import { Order } from '@/models/Order'

export default async function handle(req, res) {
  await mongooseConnect()
  if (req.method === 'GET') {
    res.json(await Order.find().sort({ createdAt: -1 }))
  }
}
