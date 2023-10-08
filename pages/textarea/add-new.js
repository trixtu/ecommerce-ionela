import Layout from '@/components/Layout'
import HtmleditorTiny from '@/components/htmlEditor/htmleditorTiny'
import { Button, Container, Input, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { Markup } from 'interweave'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ReactSortable } from 'react-sortablejs'
import Spinner from '@/components/Spinner'
import { Upload } from 'lucide-react'

const articleContent =
  "<p><b>Lorem ipsum dolor laboriosam.</b> </p><p>Facere debitis impedit doloremque eveniet eligendi reiciendis <u>ratione obcaecati repellendus</u> culpa? Blanditiis enim cum tenetur non rem, atque, earum quis, reprehenderit accusantium iure quas beatae.</p><p>Lorem ipsum dolor sit amet <a href='#testLink'>this is a link, click me</a> Sunt ducimus corrupti? Eveniet velit numquam deleniti, delectus  <ol><li>reiciendis ratione obcaecati</li><li>repellendus culpa? Blanditiis enim</li><li>cum tenetur non rem, atque, earum quis,</li></ol>reprehenderit accusantium iure quas beatae.</p>"

export default function AddNew() {
  const [text, setText] = useState('')
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [goToTextarea, setGoToTextarea] = useState(false)

  const router = useRouter()

  async function saveTextaria() {
    const data = { title, value, image }
    await axios.post('/api/textarea', data)
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
      <Container>
        <Typography variant="h5">Add new</Typography>

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
          name="title"
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value)
          }}
          placeholder="Title"
          className="mb-4 mt-2"
        />
        <HtmleditorTiny setText={setText} setValue={setValue} value={value} />
        <div className="flex gap-2 my-2">
          <Button variant="outlined" color="error" href="/textarea">
            Back
          </Button>
          <Button variant="contained" onClick={saveTextaria}>
            Save
          </Button>
        </div>
      </Container>
      <Markup content={value} />
    </Layout>
  )
}
