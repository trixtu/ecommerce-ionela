import { mongooseConnect } from '@/lib/mongoose'
import { Textarea } from '@/models/Textarea'
import { isAdminRequest } from './auth/[...nextauth]'

export default async function handle(req, res) {
  await mongooseConnect()
  await isAdminRequest(req, res)
  const { method } = req

  if (method === 'POST') {
    const { title, value, image } = req.body
    const textareaDoc = await Textarea.create({ title, value, image })
    res.json(textareaDoc)
  }

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Textarea.findOne({ _id: req.query.id }))
    } else {
      res.json(await Textarea.find())
    }
  }

  if (method === 'PUT') {
    const { _id, title, value, image } = req.body
    await Textarea.updateOne({ _id }, { title, value, image })
    res.json(true)
  }
}
