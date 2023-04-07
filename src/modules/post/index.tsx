import type { StackProps } from '@mui/material'
import { Divider, Stack, styled, Typography } from '@mui/material'
import React from 'react'
import { usePostDetails } from '../../context'
import PostAuthor from './components/PostAuthor'
import PostCategories from './components/PostCategories'
import PostTags from './components/PostTags'
import AboutAuthor from './components/AboutAuthor'
import PostContent from './components/PostContent'

const MainContainer = styled(Stack)<StackProps>(({ theme }) => ({
  background: theme.palette.common.white,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '70%'
  }
}))

const Container = styled(Stack)<StackProps>(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  }
}))

const PostDetails = (): JSX.Element => {
  const { post } = usePostDetails()

  return (
    <MainContainer>
      <Container spacing={1}>
        <Typography variant={'h4'}>{post.title}</Typography>
        <PostCategories categories={post.categories} />
        <PostAuthor
          author={post.author}
          commentsCount={post.comments.length}
          commentsAllowed={post.commentsAllowed}
          lastUpdateOn={post.lastUpdateOn}
        />
        <PostContent content={post.content} />
        <PostTags tags={post.tags} />
        {/*<UserResponse />*/}
        <Divider />
        <AboutAuthor author={post.author} />
        <Divider />
        {/*{post.commentsAllowed && <PostComments postId={post.postId} comments={post.comments} />}*/}
      </Container>
    </MainContainer>
  )
}

export default PostDetails
