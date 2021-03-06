import React, { useState } from 'react'
import { Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import API from '../../../../API'
import { sort } from '../utils/utils'
import { styled } from '@mui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories } from '../action'
import lodash from 'lodash'

const Form = styled('form')(({ theme }) => ({
  '&>*': {
    margin: theme.spacing(0.5, 0)
  }
}))

const Item = styled(MenuItem)(({ theme, level }) => ({
  paddingLeft: theme.spacing(level * 2 + 2)
}))

const CategoryButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.5, 2)
}))

const AddNewCategoryForm = ({ allCategories, setAllCategories }) => {
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.editPost)
  
  const [name, setName] = useState('')
  const [parentCategory, setParentCategory] = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault()
    API.categories.addNewCategory({ name, parentCategory: parentCategory || null })
      .then((category) => {
        dispatch(setCategories(lodash.uniqWith(categories.concat(category), lodash.isEqual)))
        return setAllCategories(sort([...allCategories, category]))
      })
  }
  
  return <Form onSubmit={handleSubmit}>
    <Divider />
    <TextField
      value={name}
      onChange={(event) => setName(event.target.value)}
      label={'Add New Category'}
      variant={'outlined'}
      size={'small'}
      required
      fullWidth />
    <FormControl size={'small'} fullWidth>
      <InputLabel>Parent Category</InputLabel>
      <Select
        value={parentCategory}
        onChange={(event) => setParentCategory(event.target.value)}
        label={'Parent Category'}>
        <MenuItem value={''}>--Parent Category--</MenuItem>
        {allCategories.map(({ level, categoryId, name: categoryName }) => <Item value={categoryId} level={level}
                                                                                key={categoryId}>
          {categoryName}
        </Item>)}
      </Select>
    </FormControl>
    <CategoryButton type={'submit'} variant={'outlined'} color={'primary'} size={'small'}>
      Add New Category
    </CategoryButton>
    <Divider />
  </Form>
}

export default AddNewCategoryForm
