import { Box, Checkbox, Collapse, FormControlLabel, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import API from '../../../../API'
import Accordion from '../../../../common/components/Accordion'
import { sort } from '../utils/utils'
import AddNewCategoryForm from './AddNewCategoryForm'
import { styled } from '@mui/styles'
import theme from '../../../../theme/theme'

const CheckboxOption = styled(Checkbox)(({ theme: themes }) => ({
  margin: themes.spacing(0.5, 0),
  padding: themes.spacing(0)
}))

const Categories = ({ post, setPost }) => {
  const [allCategories, setAllCategories] = useState([])
  const [addNewCategory, setAddNewCategory] = useState(false)
  
  useEffect(() => {
    API.categories.getAllCategories()
      .then((categories) => setAllCategories(sort(categories)))
  }, [])
  
  const isCategoryIdMatched = (categoryId) => (category) => category === categoryId
  const findCategory = (categoryId) => allCategories.find(isCategoryIdMatched(categoryId))
  const isChecked = (categoryId) => Boolean(post.categories.find((category) => category === categoryId))
  
  const handleChange = (categoryId) => () => {
    const categories = isChecked(categoryId)
      ? post.categories.filter((category) => category !== categoryId)
      : post.categories.concat(findCategory(categoryId))
    setPost({ categories })
  }
  
  return <Accordion title={'Categories'}>
    <Box>
      {allCategories.map((category) => <FormControlLabel
        key={category.categoryId}
        label={category.name}
        style={{ marginLeft: theme.spacing(category.level * 2) }}
        control={
          <CheckboxOption
            size={'small'}
            onChange={handleChange(category.categoryId)}
            checked={isChecked(category.categoryId)} />
        }
      />)}
      <Collapse in={addNewCategory}>
        <AddNewCategoryForm
          post={post}
          setPost={setPost}
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
