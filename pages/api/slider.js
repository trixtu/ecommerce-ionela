import { mongooseConnect } from '@/lib/mongoose'
import { isAdminRequest } from './auth/[...nextauth]'
import { Slider } from '@/models/Slider'

export default async function handle(req, res) {
  const { method } = req
  await mongooseConnect()
  await isAdminRequest(req, res)

  if (method === 'GET') {
    res.json(await Slider.find())
  }

  if (method === 'POST') {
    const { title, image } = req.body
    const sliderDoc = await Slider.create({
      title,
      image,
    })
    res.json(sliderDoc)
  }

  if (method === 'PUT') {
    const { title, image, _id } = req.body
    const sliderDoc = await Slider.updateOne(
      { _id },
      {
        title,
        image,
      }
    )
    res.json(sliderDoc)
  }

  if (method === 'DELETE') {
    const { _id } = req.query
    await Slider.deleteOne({ _id })
    res.json(true)
  }
}
