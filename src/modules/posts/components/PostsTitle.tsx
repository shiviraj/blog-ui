import { Stack, styled, Typography } from '@mui/material'
import React from 'react'
import { useMedia } from '../../../hooks'

const Container = styled(Stack)(({ theme }) => ({
  background: theme.palette.common.white,
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  }
}))

const PostsTitle = ({ title }: { title: string }): JSX.Element => {
  const media = useMedia()
  return (
    <Container spacing={media.md ? 3 : 1.5}>
      <Typography variant={'h4'}>{title}</Typography>
    </Container>
  )
}

export default PostsTitle
