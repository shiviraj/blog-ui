import { Box, Divider, styled, Typography } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  margin: theme.spacing(1, 0),
  borderRadius: theme.spacing(1),
  '&:hover': {
    boxShadow: theme.shadows[2]
  }
}))

type PostCommentsType = { comments: unknown[]; postId: string }
const PostComments = ({ comments }: PostCommentsType): JSX.Element => {
  return (
    <Container id={'comment'}>
      <Typography variant={'h5'} pl={2} pt={1}>
        {comments.length > 1 ? 'Comments' : 'Comment'} ({comments.length})
      </Typography>
      {/*<CommentInput postId={postId} placeholder={'What are your thoughts?'} />*/}
      <Divider />
      {/*<DisplayAllComments postId={postId} comments={comments} />*/}
    </Container>
  )
}

export default PostComments
