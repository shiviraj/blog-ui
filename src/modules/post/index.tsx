import type { StackProps } from '@mui/material'
import { Stack, styled, Typography } from '@mui/material'
import React from 'react'
import { usePostDetails } from '../../context'
import PostAuthor from './components/PostAuthor'
import PostCategories from './components/PostCategories'
import PostTags from './components/PostTags'
import AboutAuthor from './components/AboutAuthor'
import PostContent from './components/PostContent'
import UserResponse from './components/UserResponse'
import PostComments from './components/PostComments'
import { useMedia } from '../../hooks'

const MainContainer = styled(Stack)<StackProps>(({ theme }) => ({
  width: '100%',
  background: theme.palette.grey[100],
  [theme.breakpoints.up('md')]: {
    width: '70%'
  }
}))

const Container = styled(Stack)<StackProps>(({ theme }) => ({
  background: theme.palette.common.white,
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  }
}))

const PostDetails = (): JSX.Element => {
  const { post } = usePostDetails()
  const media = useMedia()

  return (
    <MainContainer spacing={media.md ? 3 : 1.5}>
      <Container spacing={1}>
        <Typography variant={'h4'}>{post.title}</Typography>
        <PostCategories categories={post.categories} />
        <PostAuthor
          author={post.author}
          commentsCount={post.comments.length}
          commentsAllowed={post.commentsAllowed}
          lastUpdateOn={post.lastUpdateOn}
          visibleIfZeroComment
        />
        <PostContent content={post.content} />
        <PostTags tags={post.tags} />
        <UserResponse />
      </Container>
      <Container>
        <AboutAuthor author={post.author} />
      </Container>
      {post.commentsAllowed && <PostComments />}
    </MainContainer>
  )
}

export default PostDetails
