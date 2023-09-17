/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Upload } from 'lucide-react'
import Spinner from './Spinner'
import { ReactSortable } from 'react-sortablejs'
export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  sale: existingSale,
  images: existingImages,
  category: existingCategory,
  properties,
}) {
  const [title, setTitle] = useState(existingTitle || '')
  const [description, setDescription] = useState(existingDescription || '')
  const [price, setPrice] = useState(existingPrice || '')
  const [sale, setSale] = useState(existingSale || '')
  const [category, setCategory] = useState(existingCategory || '')
  const [productProperties, setProductProperties] = useState(properties || {})
  const [images, setImages] = useState(existingImages || [])
  const [goToProducts, setGoToProducts] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [categories, setCategories] = useState([])

  const router = useRouter()

  useEffect(() => {
    axios.get('/api/categories').then((result) => {
      setCategories(result.data)
    })
  }, [])

  async function saveProduct(ev) {
    const data = {
      title,
      description,
      price,
      sale,
      images,
      category,
      properties: productProperties,
    }
    ev.preventDefault()
    if (_id) {
      //update
      await axios.put('/api/products', { ...data, _id })
    } else {
      //create
      await axios.post('/api/products', data)
    }
    setGoToProducts(true)
  }

  if (goToProducts) {
    router.push('/products')
  }

  async function uploadImages(ev) {
    const files = ev.target?.files
    if (files?.length > 0) {
      setIsUploading(true)
      const data = new FormData()
      for (const file of files) {
        data.append('file', file)
      }
      const res = await axios.post('/api/upload', data)
      console.log(res.data)

      setImages((oldImages) => {
        return [...oldImages, ...res.data]
      })
      setIsUploading(false)
    }
  }

  function updateImagesOrder(images) {
    setImages(images)
  }

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev }
      newProductProps[propName] = value
      return newProductProps
    })
  }

  const propertiesToFill = []

  if (categories?.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category)
    propertiesToFill.push(...catInfo.properties)
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      )
      propertiesToFill.push(...parentCat.properties)
      catInfo = parentCat
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex flex-col">
        <label>Category</label>
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value={'Uncategorized'}>Uncategorized</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
        {propertiesToFill?.length > 0 &&
          propertiesToFill.map((p, index) => (
            <div className="" key={index}>
              <div>{p.name[0].toUpperCase() + p.name.substring(1)}</div>
              <select
                value={productProperties[p.name]}
                onChange={(ev) => setProductProp(p.name, ev.target.value)}
              >
                {p.values.map((v, index) => (
                  <option key={index} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          ))}
      </div>
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-1"
        >
          {!!images?.length &&
            images.map((link, index) => (
              <div
                className="h-24 bg-white p-2 shadow-sm rounded-md border border-gray-200"
                key={index}
              >
                <img
                  src={link}
                  alt="image"
                  className="rounded-md overflow-hidden"
                />
              </div>
            ))}
        </ReactSortable>

        {isUploading && (
          <div className="h-24 flex items-center justify-center border p-1 rounded-md">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 border flex text-gray-500 text-sm rounded-md items-center justify-center bg-white cursor-pointer shadow-md border-gray-200">
          <Upload />
          <span>Upload</span>
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <div className="">
          <label>Price (in USD)</label>
          <input
            type="number"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Sale</label>
          <input
            type="number"
            placeholder="sale"
            value={sale}
            onChange={(e) => setSale(e.target.value)}
          />
        </div>
      </div>
      <button className="btn-primary" type="submit">
        Save
      </button>
    </form>
  )
}
