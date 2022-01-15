import { Box, Divider, Typography } from '@mui/material'
import CommentInput from './CommentInput'

const PostComments = ({ comments, post }) => {
  return <Box mt={1}>
    <Divider />
    <Typography variant={'h5'}>{comments.length > 1 ? 'Comments' : 'Comment'} ({comments.length})</Typography>
    <CommentInput postId={post.postId} comments={comments} />
  </Box>
}

export default PostComments
