import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

function HtmleditorTiny({ setText, setValue, value }) {
  return (
    <>
      <Editor
        apiKey="3fvn4e1z86svgmv1moxx0o9aj2ycuctrbqpqgdjy05kx8bp2"
        value={value}
        onInit={(evt, editor) => {
          setText(editor.getContent({ format: 'text' }))
        }}
        onEditorChange={(newValue, editor) => {
          setValue(newValue)
          setText(editor.getContent({ format: 'text' }))
        }}
        init={{
          selector: 'textarea',
          plugins:
            'mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
        }}
      />
    </>
  )
}

export default HtmleditorTiny
