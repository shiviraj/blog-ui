import { makeStyles } from '@material-ui/styles'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import API from '../../../../API'
import { sort } from '../utils/utils'
import theme from '../../../../theme/theme'

const useStyles = makeStyles((theme) => ({
  root: {
    '&>*': {
      margin: theme.spacing(0.5, 0)
    }
  },
  button: {
    padding: theme.spacing(0.5, 2)
  }
}))

const AddNewCategoryForm = ({ post, setPost, allCategories, setAllCategories }) => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [parentCategory, setParentCategory] = useState('000')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    API.categories.addNewCategory({})
      .then((category) => {
        setPost({ category: post.categories.concat(category) })
        return setAllCategories(sort([...allCategories, category]))
      })
  }
  
  return <form className={classes.root} onSubmit={handleSubmit}>
    <TextField
      value={name}
      onChange={(e) => setName(e.target.value)}
      label={'Add New Category'}
      variant={'outlined'} size={'small'}
      required
      fullWidth />
    <FormControl variant={'outlined'} size={'small'} fullWidth>
      <InputLabel>Parent Category</InputLabel>
      <Select
        value={parentCategory}
        onChange={(e) => setParentCategory(e.target.value)}
        label={'Parent Category'}>
        <MenuItem value={'000'}>--Parent Category--</MenuItem>
        {allCategories.map(({ level, categoryId, name }) =>
          <MenuItem value={categoryId} style={{ paddingLeft: theme.spacing(level * 2 + 2) }}
                    key={categoryId}>{name}</MenuItem>)}
      </Select>
    </FormControl>
    <Button type={'submit'} className={classes.button} variant={'outlined'} color={'primary'} size={'small'}>
      Add New Category
    </Button>
  </form>
}

export default AddNewCategoryForm
