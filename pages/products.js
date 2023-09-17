import Layout from '@/components/Layout'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import axios from 'axios'
import { PenSquareIcon, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function ProductsPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/api/products').then((response) => {
      setProducts(response.data)
    })
  }, [])

  return (
    <Layout>
      <Button variant="contained" href={'/products/new'} color="success">
        Add new Product
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead className="bg-gray-100 uppercase">
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{product.title}</TableCell>
                <TableCell>{product?.category?.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      href={`/products/edit/${product._id}`}
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
                      href={`/products/delete/${product._id}`}
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
