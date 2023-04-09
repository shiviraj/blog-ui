import { Divider, Stack, styled, Typography } from '@mui/material'
import { usePostDetails } from '../../../context'
import React, { useEffect } from 'react'
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
  const comments = post.comments.filter(comment => !comment.parentId)

  useEffect(() => {
    post.comments
      .filter(comment => comment.parentId)
      .forEach(currentComment => {
        const parentComment = post.comments.find(comment => comment.commentId === currentComment.parentId)
        if (!parentComment) {
          return
        }
        const children = parentComment.child ? parentComment.child.concat(currentComment) : [currentComment]
        parentComment.child = children.unique()
      })
  }, [])

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
            <DisplayAllComments postId={post.postId} comments={comments} />
          </Container>
        </>
      )}
    </Stack>
  )
}

export default PostComments
