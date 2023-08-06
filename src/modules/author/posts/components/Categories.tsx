import { Box, Checkbox, Collapse, FormControlLabel, Stack, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Accordion, Link } from '../../../../common/components'
import { sort } from '../utils'
import AddNewCategoryForm from './AddNewCategoryForm'
import { useAuthorPost } from '../../../../context'
import { CategoryGateway } from '../../../../api'
import type { CategoryType } from '../../../../api/dto'
import theme from '../../../../theme'

const CheckboxOption = styled(Checkbox)(({ theme: themes }) => ({
  margin: themes.spacing(0.5, 0),
  padding: themes.spacing(0)
}))

const Categories = (): JSX.Element => {
  const { post, updatePost } = useAuthorPost()

  const [allCategories, setAllCategories] = useState<Array<CategoryType & { level?: number }>>([])
  const [addNewCategory, setAddNewCategory] = useState(false)

  useEffect(() => {
    CategoryGateway.getAllCategories().then(allRegisteredCategories => {
      setAllCategories(sort(allRegisteredCategories))
    })
  }, [])

  const isChecked = (categoryId: string) => post.categories.some(category => category === categoryId)

  const handleChange = (categoryId: string) => () => {
    const categoriesToAdded = isChecked(categoryId)
      ? post.categories.filter(category => category !== categoryId)
      : post.categories.concat(categoryId)
    updatePost('categories', categoriesToAdded)
  }

  return (
    <Accordion title={'Categories'}>
      <Box>
        <Stack>
          {allCategories.map(({ name, level, categoryId }) => (
            <FormControlLabel
              key={categoryId}
              label={name}
              style={{ marginLeft: theme.spacing(level ? level * 2 : 0) }}
              control={<CheckboxOption onChange={handleChange(categoryId)} checked={isChecked(categoryId)} />}
            />
          ))}
        </Stack>
        <Collapse in={addNewCategory}>
          <AddNewCategoryForm allCategories={allCategories} setAllCategories={setAllCategories} />
        </Collapse>
        <Link
          href={'#'}
          color={'primary'}
          onClick={() => {
            setAddNewCategory(!addNewCategory)
          }}
        >
          {addNewCategory ? 'Remove New Category' : 'Add New Category'}
        </Link>
      </Box>
    </Accordion>
  )
}

export default Categories
