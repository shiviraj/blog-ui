import { Box, Stack, Typography } from '@mui/material'
import { Comment, Reply, ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material'
import { styled } from '@mui/styles'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(4),
  cursor: 'pointer',
  '&>*': {
    display: 'flex',
    marginRight: theme.spacing(1)
  },
  '&:hover': {
    transform: 'scale(1.1)'
  }
}))

const CommentResponse = ({ likes, dislikes, comments, setExpand }) => {
  return <Stack direction={'row'} justifyContent={'space-between'}>
    <Stack direction={'row'} mt={1} mb={1}>
      <Container>
        <ThumbUpOutlined />
        <Typography variant={'body1'}>{likes.length}</Typography>
      </Container>
      <Container>
        <ThumbDownOutlined />
        <Typography variant={'body1'}>{dislikes.length}</Typography>
      </Container>
      <Container>
        <Comment />
        <Typography variant={'body1'}>{comments.length} {comments.length > 1 ? 'replies' : 'reply'}</Typography>
      </Container>
    </Stack>
    <Container onClick={() => setExpand()}>
      <Reply />
      <Typography variant={'body1'}>Reply</Typography>
    </Container>
  </Stack>
}

export default CommentResponse
