import { formatDateTime } from '../../../utils/utils'
import { Avatar, Box, Typography } from '@mui/material'
import { Comment, DateRange } from '@mui/icons-material'
import { FlexContainer } from '../../../common/components/styled/FlexContainer'
import { styled } from '@mui/styles'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(8),
  '&>*': {
    marginRight: theme.spacing(1)
  }
}))

const PostAuthor = ({ post, comments }) => {
  return <FlexContainer m={[1, 0]} alignItems={'center'}>
    <Container>
      <Avatar src={post.author.profile} />
      <Typography>{post.author.name}</Typography>
    </Container>
    <Container>
      <DateRange />
      <Typography>{formatDateTime(post.postDate.lastUpdateOn)}</Typography>
    </Container>
    {post.commentsAllowed && <Container>
      <Comment />
      <Typography>{comments.length} {comments.length > 1 ? 'comments' : 'comment'}</Typography>
    </Container>}
  </FlexContainer>
}

export default PostAuthor
