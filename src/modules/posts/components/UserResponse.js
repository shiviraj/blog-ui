import { Box, Typography } from '@mui/material'
import { Comment, ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material'
import { FlexContainer } from '../../../common/components/styled/FlexContainer'
import { styled } from '@mui/styles'

const Container = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(4),
  '&>*': {
    display: 'flex',
    marginRight: theme.spacing(1)
  }
}))

const UserResponse = ({ post, comments }) => {
  
  // TODO user liked or not
  // TODO if user clicks on like or dislike it should be login first
  
  return <FlexContainer>
    <Container>
      <ThumbUpOutlined />
      <Typography variant={'body1'}>{post.likes}</Typography>
    </Container>
    <Container>
      <ThumbDownOutlined />
      <Typography variant={'body1'}>{post.disLikes}</Typography>
    </Container>
    {post.commentsAllowed && <Container>
      <Comment />
      <Typography variant={'body1'}>{comments.length}</Typography>
    </Container>}
  </FlexContainer>
}

export default UserResponse
