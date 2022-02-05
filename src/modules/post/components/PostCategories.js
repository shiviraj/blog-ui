import { FlexContainer } from '../../../common/components/styled/FlexContainer'
import { Box, Link, Typography } from '@mui/material'
import { styled } from '@mui/styles'

const Category = styled(Box)(({ theme }) => ({
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

const PostCategories = ({ categories }) => {
  return <FlexContainer>
    {categories.map((category, index) =>
      <Category key={category.id + index} variant={'contained'} size={'small'} color={'primary'}>
        <Link underline={'none'} href={`/categories/${category.url}`}>
          <Typography variant={'button'}> {category.name}</Typography>
        </Link>
      </Category>)
    }
  </FlexContainer>
}

export default PostCategories
