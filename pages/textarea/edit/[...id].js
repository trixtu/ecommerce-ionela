import Layout from '@/components/Layout'
import HtmleditorTiny from '@/components/htmlEditor/htmleditorTiny'
import { Button } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function EditTextareaPage() {
  const [textareaInfo, settextareaInfo] = useState(null)
  const [goToTextarea, setGoToTextarea] = useState(false)
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
    })
  }, [id])

  async function handleUpdate() {
    const _id = id?.toString()
    const data = {
      _id,
      title,
      value,
    }
    await axios.put('/api/textarea', data)

    setGoToTextarea(true)
  }

  if (goToTextarea) {
    router.push('/textarea')
  }

  return (
    <Layout>
      <h1>
        Edit textarea <b>{textareaInfo?.title}</b>
      </h1>

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
