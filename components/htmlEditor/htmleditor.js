import React from 'react'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css' // Add css for snow theme

function HtmlEditor() {
  const { quill, quillRef } = useQuill()
  return (
    <div>
      <div style={{ width: '100%', height: '100vh' }}>
        <div ref={quillRef} />
      </div>
    </div>
  )
}

export default HtmlEditor
