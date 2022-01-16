import { Box, Stack, Typography } from '@mui/material'
import { Comment, ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material'
import { styled } from '@mui/styles'

const Container = styled(Box)(({ theme }) => ({
  // margin: theme.spacing(2, 0),
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(4),
  '&>*': {
    display: 'flex',
    marginRight: theme.spacing(1)
  }
}))

const UserResponse = ({ likes, dislikes, comments }) => {
  
  // TODO user liked or not
  // TODO if user clicks on like or dislike it should be login first
  
  return <Stack direction={'row'} mt={1} mb={1}>
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
      <Typography variant={'body1'}>{comments.length}</Typography>
    </Container>
  </Stack>
}

export default UserResponse
