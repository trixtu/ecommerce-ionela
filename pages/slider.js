/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import Spinner from '@/components/Spinner'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { PenSquareIcon, Trash2, Upload } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import categories from './categories'
import { withSwal } from 'react-sweetalert2'

function SliderPage({ swal }) {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [editedSlider, setEditedSlider] = useState(null)
  const [sliders, setSliders] = useState([])

  useEffect(() => {
    fetchSlider()
  }, [])

  function fetchSlider() {
    axios.get('/api/slider').then((res) => {
      setSliders(res.data)
    })
  }

  console.log(sliders)
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

  function updateImagesOrder(image) {
    setImage(image)
  }

  async function saveSlider(ev) {
    ev.preventDefault()
    const data = {
      title,
      image,
    }
    if (editedSlider) {
      data._id = editedSlider._id
      await axios.put('/api/slider', data)
    } else {
      await axios.post('/api/slider', data)
    }

    setTitle('')
    setImage('')
    setEditedSlider(null)
    fetchSlider()
  }

  function editSlider(slider) {
    setEditedSlider(slider)
    setTitle(slider?.title)
    setImage([slider?.image[0]])
  }

  function deleteSlider(slider) {
    swal
      .fire({
        title: 'Are you sure?',
        text: `Do you want to delete ${slider?.title}?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes,Delete!',
        confirmButtonColor: '#d55',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const _id = slider._id
          await axios.delete(`/api/slider?_id=${_id}`)
          fetchSlider()
        }
      })
  }

  return (
    <Layout>
      <Typography variant="h5" color={'Highlight'}>
        Sliders
      </Typography>
      <form onSubmit={saveSlider}>
        <div className="lg:flex gap-4">
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="filled-basic"
            label={editedSlider ? `Edit Slider` : 'Create New Slider'}
            variant="filled"
            sx={{ m: 1, width: '100%' }}
            size="small"
          />
        </div>
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
        <button className="btn-primary" type="submit">
          Save
        </button>
      </form>
      {!editedSlider && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Image</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sliders.length > 0 &&
                sliders.map((slider) => (
                  <TableRow
                    key={slider._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{slider.title}</TableCell>
                    <TableCell>
                      <img
                        src={slider.image[0]}
                        width={120}
                        alt={slider.title}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => editSlider(slider)}
                          variant="contained"
                          className="gap-1"
                        >
                          <PenSquareIcon size={15} />
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          className="gap-1"
                          onClick={() => deleteSlider(slider)}
                        >
                          <Trash2 size={15} />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Layout>
  )
}

export default withSwal(({ swal }, ref) => <SliderPage swal={swal} />)
