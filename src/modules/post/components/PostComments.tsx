import { Divider, Stack, styled, Typography } from '@mui/material'
import { usePostDetails } from '../../../context'
import React from 'react'
import CommentInput from './components/CommentInput'
import DisplayAllComments from './components/DisplayAllComments'

const Container = styled(Stack)(({ theme }) => ({
  background: theme.palette.common.white,
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  }
}))

const PostComments = (): JSX.Element => {
  const { post } = usePostDetails()
  return (
    <Stack id={'comment'}>
      <Container>
        <Typography variant={'h5'}>
          {post.comments.length > 1 ? 'Comments' : 'Comment'} ({post.comments.length})
        </Typography>
        <CommentInput postId={post.postId} placeholder={'What are your thoughts?'} />
      </Container>
      {post.comments.isNotEmpty() && (
        <>
          <Divider />
          <Container>
            <DisplayAllComments postId={post.postId} comments={post.comments} />
          </Container>
        </>
      )}
    </Stack>
  )
}

export default PostComments
