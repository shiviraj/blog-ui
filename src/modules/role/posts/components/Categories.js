import { makeStyles } from '@material-ui/styles'
import { Box, Checkbox, Collapse, FormControlLabel, Link } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import API from '../../../../API'
import Accordion from '../../../../common/components/Accordion'
import { sort } from '../utils/utils'
import AddNewCategoryForm from './AddNewCategoryForm'
import theme from '../../../../theme/theme'

const useStyles = makeStyles((theme) => ({
  option: {
    margin: theme.spacing(0.5, 0),
    padding: theme.spacing(0)
  }
}))

const Categories = ({ post, setPost }) => {
  const classes = useStyles()
  const [allCategories, setAllCategories] = useState(null)
  const [addNewCategory, setAddNewCategory] = useState(false)
  
  useEffect(() => {
    API.categories.getAllCategories()
      .then((categories) => setAllCategories(sort(categories)))
  }, [])
  
  const isCategoryIdMatched = (categoryId) => category => category.categoryId === categoryId
  const findCategory = (categoryId) => allCategories.find(isCategoryIdMatched(categoryId))
  
  const handleChange = (categoryId) => () => {
    const categories = isChecked(categoryId)
      ? post.categories.filter(category => category.categoryId !== categoryId)
      : post.categories.concat(findCategory(categoryId))
    setPost({ categories })
  }
  
  const isChecked = (categoryId) => {
    return !!post.categories.find((category) => category.categoryId === categoryId)
  }
  
  if (!allCategories) return <></>
  
  return <Accordion title={'Categories'}>
    <Box>
      {allCategories.map((category) =>
        <FormControlLabel
          key={category.categoryId}
          label={category.name}
          style={{ marginLeft: theme.spacing(category.level * 2) }}
          control={
            <Checkbox
              className={classes.option}
              size={'small'}
              onChange={handleChange(category.categoryId)}
              checked={isChecked(category.categoryId)} />
          }
        />
      )}
      <Collapse in={addNewCategory}>
        <AddNewCategoryForm
          post={post}
          setPost={setPost}
          allCategories={allCategories}
          setAllCategories={setAllCategories} />
      </Collapse>
      <Link style={{ cursor: 'pointer' }} onClick={() => setAddNewCategory(!addNewCategory)}>Add New Category</Link>
    </Box>
  </Accordion>
}

export default Categories
