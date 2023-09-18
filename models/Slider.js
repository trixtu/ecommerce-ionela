import { model, models, Schema } from 'mongoose'

const SliderSchema = new Schema({
  title: { type: String, required: true },
  image: [{ type: String }],
})

export const Slider = models?.Slider || model('Slider', SliderSchema)
