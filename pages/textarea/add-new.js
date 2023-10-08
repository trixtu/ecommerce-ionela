import Layout from '@/components/Layout'
import HtmleditorTiny from '@/components/htmlEditor/htmleditorTiny'
import { Button, Container, Input, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { Markup } from 'interweave'
import axios from 'axios'
import { useRouter } from 'next/router'

const articleContent =
  "<p><b>Lorem ipsum dolor laboriosam.</b> </p><p>Facere debitis impedit doloremque eveniet eligendi reiciendis <u>ratione obcaecati repellendus</u> culpa? Blanditiis enim cum tenetur non rem, atque, earum quis, reprehenderit accusantium iure quas beatae.</p><p>Lorem ipsum dolor sit amet <a href='#testLink'>this is a link, click me</a> Sunt ducimus corrupti? Eveniet velit numquam deleniti, delectus  <ol><li>reiciendis ratione obcaecati</li><li>repellendus culpa? Blanditiis enim</li><li>cum tenetur non rem, atque, earum quis,</li></ol>reprehenderit accusantium iure quas beatae.</p>"

export default function AddNew() {
  const [text, setText] = useState('')
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')
  const [goToTextarea, setGoToTextarea] = useState(false)

  const router = useRouter()

  async function saveTextaria() {
    const data = { title, value }
    await axios.post('/api/textarea', data)
  }

  if (goToTextarea) {
    router.push('/textarea')
  }

  return (
    <Layout>
      <Container>
        <Typography variant="h5">Add new</Typography>

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
        <Button variant="contained" onClick={saveTextaria}>
          Save
        </Button>
      </Container>
      <Markup content={value} />
    </Layout>
  )
}
