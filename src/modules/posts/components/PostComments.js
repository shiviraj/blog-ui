import { Box, Divider, Typography } from '@mui/material'
import CommentInput from './components/CommentInput'
import DisplayAllComments from './components/DisplayAllComments'
import { styled } from '@mui/styles'

const Container = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  margin: theme.spacing(1, 0),
  borderRadius: theme.spacing(1),
  '&:hover': {
    boxShadow: theme.shadows[2]
  }
}))

const PostComments = ({ comments, post }) => {
  return <Container id={'comment'}>
    <Typography variant={'h5'} pl={2} pt={1}>
      {comments.length > 1 ? 'Comments' : 'Comment'} ({comments.length})
    </Typography>
    <CommentInput postId={post.postId} placeholder={'What are your thoughts?'} />
    <Divider />
    <DisplayAllComments postId={post.postId} comments={comments} />
  </Container>
}

export default PostComments
