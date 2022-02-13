import { formatDateTime } from '../../../utils/utils'
import { Avatar, Box, Link, Stack, Typography } from '@mui/material'
import { Comment, DateRange, Person } from '@mui/icons-material'
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

const PostAuthor = ({ post, author, comments, icon }) => {
  return <Stack direction={'row'} spacing={1} alignItems={'center'}>
    <Container>
      {icon ? <Person /> : <Avatar src={author.profile} alt={author.name} />}
      <Typography>{author.name}</Typography>
    </Container>
    <Container>
      <DateRange />
      <Typography>{formatDateTime(post.lastUpdatedAt)}</Typography>
    </Container>
    {post.commentsAllowed && <Container component={Link} href={'#comment'}>
      <Comment />
      <Typography>{comments.length} {comments.length > 1 ? 'comments' : 'comment'}</Typography>
    </Container>}
  </Stack>
}

export default PostAuthor
