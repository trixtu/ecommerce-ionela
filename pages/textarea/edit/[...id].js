import Layout from '@/components/Layout'
import Spinner from '@/components/Spinner'
import HtmleditorTiny from '@/components/htmlEditor/htmleditorTiny'
import { Button } from '@mui/material'
import axios from 'axios'
import { Upload } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

export default function EditTextareaPage() {
  const [textareaInfo, settextareaInfo] = useState(null)
  const [goToTextarea, setGoToTextarea] = useState(false)
  const [image, setImage] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [value, setValue] = useState('')
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get('/api/textarea?id=' + id).then((response) => {
      settextareaInfo(response.data)
      setValue(response.data.value)
      setTitle(response.data.title)
      setImage(response.data.image)
    })
  }, [id])

  async function handleUpdate() {
    const _id = id?.toString()
    const data = {
      _id,
      title,
      value,
      image,
    }
    await axios.put('/api/textarea', data)

    setGoToTextarea(true)
  }

  if (goToTextarea) {
    router.push('/textarea')
  }

  function updateImagesOrder(image) {
    setImage(image)
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

      setImage(res.data)
      setIsUploading(false)
    }
  }

  return (
    <Layout>
      <h1>
        Edit textarea <b>{textareaInfo?.title}</b>
      </h1>

      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable
          list={image}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-1"
        >
          {!!image?.length &&
            image.map((link, index) => (
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

      <input
        className="my-4"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <HtmleditorTiny setText={setText} setValue={setValue} value={value} />
      <div className="flex gap-4 mt-4">
        <Button variant="contained" color="error" href="/textarea">
          Back
        </Button>
        <Button variant="contained" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </Layout>
  )
}
