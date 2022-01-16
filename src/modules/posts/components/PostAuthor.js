import { formatDateTime } from '../../../utils/utils'
import { Avatar, Box, Link, Typography } from '@mui/material'
import { Comment, DateRange } from '@mui/icons-material'
import { FlexContainer } from '../../../common/components/styled/FlexContainer'
import { styled } from '@mui/styles'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
  marginRight: theme.spacing(8),
  '&>*': {
    marginRight: theme.spacing(1)
  }
}))

const PostAuthor = ({ post, author, comments }) => {
  return <FlexContainer m={[1, 0]} alignItems={'center'}>
    <Container>
      <Avatar src={author.profile} alt={author.name} />
      <Typography>{author.name}</Typography>
    </Container>
    <Container>
      <DateRange />
      <Typography>{formatDateTime(post.postDate.lastUpdateOn)}</Typography>
    </Container>
    {post.commentsAllowed && <Container component={Link} href={'#comment'}>
      <Comment />
      <Typography>{comments.length} {comments.length > 1 ? 'comments' : 'comment'}</Typography>
    </Container>}
  </FlexContainer>
}

export default PostAuthor
