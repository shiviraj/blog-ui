import type { ChangeEvent } from 'react'
import React from 'react'
import type { MenuItemProps, SelectChangeEvent } from '@mui/material'
import { Divider, FormControl, InputLabel, MenuItem, Select, Stack, styled, TextField } from '@mui/material'
import { useAuthorPost } from '../../../../context'
import type { CategoryType } from '../../../../api/dto'
import { useForm } from '../../../../hooks'
import api from '../../../../api'
import { sort } from '../utils'
import { Button, useToast } from '../../../../common/components'

const Item = styled(MenuItem)<MenuItemProps & { level?: number }>(({ theme, level }) => ({
  paddingLeft: theme.spacing(level ? level * 4 : 2)
}))

type AddNewCategoryFormProps = {
  allCategories: Array<CategoryType & { level?: number }>
  setAllCategories: (categories: CategoryType[]) => void
}
const AddNewCategoryForm = ({ allCategories, setAllCategories }: AddNewCategoryFormProps): JSX.Element => {
  const { updatePost, post } = useAuthorPost()
  const toast = useToast()

  const { values, onChange, handleSubmit } = useForm({ name: '', parentCategory: '' })

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
      onChange(keyName, event.target.value)
    }
  }
  const onSubmit = (formValues: typeof values) => {
    api.categories
      .addNewCategory(formValues)
      .then(category => {
        updatePost('categories', post.categories.concat(category.categoryId))
        setAllCategories(sort([...allCategories, category]))
      })
      .catch(() => {
        toast.error('Failed to add new Category')
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <Divider />
        <TextField
          value={values.name}
          onChange={handleChange('name')}
          label={'Add New CategoryType'}
          variant={'outlined'}
          size={'small'}
          required
          fullWidth
        />
        <FormControl size={'small'} fullWidth>
          <InputLabel>Parent Category</InputLabel>
          <Select value={values.parentCategory} onChange={handleChange('parentCategory')} label={'Parent Category'}>
            <MenuItem value={''}>--Parent Category--</MenuItem>
            {allCategories.map(({ level, categoryId, name: categoryName }) => (
              <Item value={categoryId} level={level} key={categoryId}>
                {categoryName}
              </Item>
            ))}
          </Select>
        </FormControl>
        <Button type={'submit'} variant={'outlined'} color={'primary'} size={'small'}>
          Add New Category
        </Button>
        <Divider />
      </Stack>
    </form>
  )
}

export default AddNewCategoryForm
