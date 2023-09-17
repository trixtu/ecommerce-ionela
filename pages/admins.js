import Layout from '@/components/Layout'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Admins() {
  const [email, setEmail] = useState('')
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  function fetchData() {
    axios.get('/api/admins').then((response) => {
      setAdmins(response.data)
    })
  }

  function addAdmin() {
    axios.post('/api/admins', { email }).then((response) => {
      alert('created')
    })
  }
  return (
    <Layout>
      <h1>Admins</h1>
      <h2>Add new Admin</h2>
      <form onSubmit={addAdmin}>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="admin email"
            className="mb-0"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <Button type="submit" variant="contained" size="small">
            Save
          </Button>
        </div>
      </form>
      <h2>Existing Admins</h2>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead className="bg-gray-100 uppercase">
            <TableRow>
              <TableCell>Admin Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.length > 0 &&
              admins.map((admin) => (
                <TableRow key={admin._id}>
                  <TableCell>{admin.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  )
}
