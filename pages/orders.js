import Layout from '@/components/Layout'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
} from '@mui/material'
import axios from 'axios'
import { CheckIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { AlertCircle } from 'lucide-react'

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get('/api/orders').then((response) => {
      setOrders(response.data)
    })
  }, [])

  return (
    <Layout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead className="bg-gray-100 uppercase">
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Products</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 &&
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="w-20">
                    <div className="">
                      {order.paid ? (
                        <div className="bg-lime-600 p-2 text-white rounded-sm flex items-center justify-center gap-1">
                          <Check size={20} />
                          <span className="">Yes</span>
                        </div>
                      ) : (
                        <div className="bg-red-500 p-2 text-white rounded-sm flex items-center justify-center gap-1">
                          <AlertCircle size={20} />
                          <span>No</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {order.name}
                    {order.email} <br />
                    {order.city}
                    {order.postalCode}
                    {order.country} <br />
                    {order.address}
                  </TableCell>
                  <TableCell>
                    {order.line_items.map((product, index) => (
                      <div key={index}>
                        {product.price_data.product_data.name} x
                        {product.quantity}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  )
}
