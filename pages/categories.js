import Layout from '@/components/Layout'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import { PenSquareIcon, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { withSwal } from 'react-sweetalert2'

function Categories({ swal }) {
  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [parentCategory, setParentCategory] = useState('')
  const [editedCategory, setEditedCategory] = useState(null)
  const [properties, setProperties] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  function fetchCategories() {
    axios.get('/api/categories').then((response) => {
      setCategories(response.data)
    })
  }

  async function saveCategory(ev) {
    ev.preventDefault()
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(','),
      })),
    }
    if (editedCategory) {
      data._id = editedCategory._id
      await axios.put('/api/categories', data)
    } else {
      await axios.post('/api/categories', data)
    }

    setName('')
    setParentCategory('')
    setEditedCategory(null)
    setProperties([])
    fetchCategories()
  }

  function editCategory(category) {
    setEditedCategory(category)
    setName(category?.name)
    setParentCategory(category.parent || '')
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(','),
      }))
    )
  }

  function goBack() {
    setName('')
    setParentCategory('')
    setEditedCategory(null)
    setProperties([])
    fetchCategories()
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: 'Are you sure?',
        text: `Do you want to delete ${category?.name}?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes,Delete!',
        confirmButtonColor: '#d55',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const _id = category._id
          await axios.delete(`/api/categories?_id=${_id}`)
          fetchCategories()
        }
      })
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: '', values: '' }]
    })
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev]
      properties[index].name = newName
      return properties
    })
  }
  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev]
      properties[index].values = newValues
      return properties
    })
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove
      })
    })
  }

  return (
    <Layout>
      <Typography variant="h5" color={'Highlight'}>
        Categories
      </Typography>
      <form onSubmit={saveCategory}>
        <div className="lg:flex gap-4">
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="filled-basic"
            label={
              editedCategory
                ? `Edit Category ${editedCategory.name}`
                : 'Create New Category'
            }
            variant="filled"
            sx={{ m: 1, width: '100%' }}
            size="small"
          />
          <FormControl
            variant="filled"
            sx={{ m: 1, minWidth: 350 }}
            size="small"
          >
            <InputLabel id="parentCategoryLabel">Category Parent</InputLabel>
            <Select
              labelId="parentCategoryLabel"
              id="parentCategory"
              value={parentCategory}
              onChange={(ev) => setParentCategory(ev.target.value)}
            >
              <MenuItem value={''}>No parent category</MenuItem>
              {categories.length > 0 &&
                categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div className="mb-4 ">
          <label className="block">Properties</label>
          <Button
            style={{ marginBottom: '10px' }}
            type="button"
            variant="contained"
            color="warning"
            size="small"
            onClick={addProperty}
          >
            Add new property
          </Button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className="flex gap-1 mb-2">
                <input
                  type="text"
                  placeholder="property name (example: color)"
                  className="mb-0"
                  value={property.name}
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="values, comma separated"
                  className="mb-0"
                  value={property.values}
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                />
                <Button
                  className="bg-red-500"
                  variant="contained"
                  color="error"
                  onClick={() => removeProperty(index)}
                  type="button"
                >
                  <Trash2 size={20} />
                </Button>
              </div>
            ))}
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="contained">
            Save
          </Button>
          {editedCategory && (
            <Button
              variant="contained"
              color="error"
              onClick={goBack}
              type="button"
            >
              Back
            </Button>
          )}
        </div>
      </form>
      {!editedCategory && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Parent</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.length > 0 &&
                categories.map((category) => (
                  <TableRow
                    key={category._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category?.parent?.name}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => editCategory(category)}
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
                          onClick={() => deleteCategory(category)}
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

export default withSwal(({ swal }, ref) => <Categories swal={swal} />)
