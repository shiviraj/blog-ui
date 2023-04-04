import { Box, Checkbox, Collapse, FormControlLabel, Link, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import API from '../../../../API'
import Accordion from '../../../../common/components/Accordion'
import { sort } from '../utils/utils'
import AddNewCategoryForm from './AddNewCategoryForm'
import { styled } from '@mui/styles'
import index from '../../../../theme'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories } from '../action'

const CheckboxOption = styled(Checkbox)(({ theme: themes }) => ({
  margin: themes.spacing(0.5, 0),
  padding: themes.spacing(0)
}))

const Categories = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.editPost)
  
  const [allCategories, setAllCategories] = useState([])
  const [addNewCategory, setAddNewCategory] = useState(false)
  
  useEffect(() => {
    API.categories.getAllCategories()
      .then((allRegisteredCategories) => setAllCategories(sort(allRegisteredCategories)))
  }, [])
  
  const isCategoryIdMatched = (categoryId) => (category) => category.categoryId === categoryId
  const findCategory = (categoryId) => allCategories.find(isCategoryIdMatched(categoryId))
  const isChecked = (categoryId) => Boolean(categories.find((category) => category.categoryId === categoryId))
  
  const handleChange = (categoryId) => () => {
    const categoriesToAdded = isChecked(categoryId)
      ? categories.filter((category) => category.categoryId !== categoryId)
      : categories.concat(findCategory(categoryId)).filter((it) => it)
    dispatch(setCategories(categoriesToAdded))
  }
  
  return <Accordion title={'Categories'}>
    <Box>
      <Stack>
        {allCategories.map(({ name, level, categoryId }) => <FormControlLabel
          key={categoryId}
          label={name}
          style={{ marginLeft: index.spacing(level * 2) }}
          control={
            <CheckboxOption
              size={'small'}
              onChange={handleChange(categoryId)}
              checked={Boolean(categories.find((cat) => cat.categoryId === categoryId))} />
          }
        />)}
      </Stack>
      <Collapse in={addNewCategory}>
        <AddNewCategoryForm
          allCategories={allCategories}
          setAllCategories={setAllCategories} />
      </Collapse>
      <Link style={{ cursor: 'pointer', fontFamily: 'Roboto' }} onClick={() => setAddNewCategory(!addNewCategory)}>
        Add New Category
      </Link>
    </Box>
  </Accordion>
}

export default Categories
