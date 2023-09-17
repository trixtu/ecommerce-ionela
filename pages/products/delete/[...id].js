/* eslint-disable react/no-unescaped-entities */
import Layout from '@/components/Layout'
import { Button, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function DeleteProductPage() {
  const router = useRouter()
  const { id } = router.query
  const [productInfo, setProductInfo] = useState(null)

  useEffect(() => {
    if (!id) {
      return
    }

    axios.get('/api/products?id=' + id).then((response) => {
      setProductInfo(response.data)
    })
  }, [id])

  async function deleteProduct() {
    await axios.delete('/api/products?id=' + id)
    router.push('/products')
  }

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <Typography variant="h5">
          Do you really want to delete product <b>"{productInfo?.title}"</b>?
        </Typography>
        <div className="flex gap-2 mt-4">
          <Button variant="contained" color="error" onClick={deleteProduct}>
            Yes
          </Button>
          <Button
            onClick={() => router.push('/products')}
            variant="contained"
            color="primary"
          >
            No
          </Button>
        </div>
      </div>
    </Layout>
  )
}
