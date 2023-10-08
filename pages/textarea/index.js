import Layout from '@/components/Layout'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PenSquareIcon, Trash2 } from 'lucide-react'

export default function CineSuntPage() {
  const [textareas, setTextareas] = useState([])

  useEffect(() => {
    axios.get('/api/textarea').then((response) => {
      setTextareas(response.data)
    })
  }, [])

  return (
    <Layout>
      <Button variant="contained" href={'/textarea/add-new'} color="success">
        Add new
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-100 uppercase">
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {textareas.map((textarea) => (
              <TableRow key={textarea._id}>
                <TableCell>{textarea.title}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      href={`/textarea/edit/${textarea._id}`}
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
                      href={`/textarea/delete/${textarea._id}`}
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
    </Layout>
  )
}
