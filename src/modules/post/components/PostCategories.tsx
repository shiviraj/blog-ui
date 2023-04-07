import type { BoxProps } from '@mui/material'
import { Box, Stack, styled, Typography } from '@mui/material'
import type { CategoryType } from '../../../api/dto'
import React from 'react'
import { Link } from '../../../common/components'

const Category = styled(Box)<BoxProps>(({ theme }) => ({
  marginRight: theme.spacing(2),
  '&>*': {
    padding: theme.spacing(0.5, 1),
    background: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  '&>*:hover': {
    background: theme.palette.primary.dark
  }
}))

type PostCategoriesProps = { categories: CategoryType[] }

const PostCategories = ({ categories }: PostCategoriesProps): JSX.Element => {
  return (
    <Stack direction={'row'} spacing={2}>
      {categories.map(category => (
        <Category key={category.categoryId} color={'primary'}>
          <Link href={`/categories/${category.url}`}>
            <Typography variant={'button'}> {category.name}</Typography>
          </Link>
        </Category>
      ))}
    </Stack>
  )
}

export default PostCategories
