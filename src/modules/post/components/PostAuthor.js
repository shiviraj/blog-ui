import { formatDateTime } from '../../../utils/utils'
import {Avatar, Box, Link, Stack, styled, Typography} from '@mui/material'
import { Comment, DateRange, Person } from '@mui/icons-material'
import useMedia from '../../../hooks/useMedia'
import useScroll from '../../../hooks/useScroll'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
  marginRight: theme.spacing(8),
  '&>*': {
    marginRight: theme.spacing(1)
  },
  [theme.breakpoints.down('sm')]: {
    marginRight: theme.spacing(2)
  }
}))

const PostAuthor = ({ post, author, comments, icon }) => {
  const media = useMedia()
  const { scroll } = useScroll('#comment')
  return <Stack direction={'row'} spacing={1} alignItems={'center'}>
    <Link href={`/users/${author.userId}`} underline={'none'} color={'inherit'}>
      <Container>
        {icon ? <Person /> : <Avatar src={author.profile} alt={author.name} />}
        <Typography>{author.username}</Typography>
      </Container>
    </Link>
    <Container>
      <DateRange />
      <Typography>{formatDateTime(post.lastUpdatedAt)}</Typography>
    </Container>
    {post.commentsAllowed && !media.sm &&
    <Container onClick={scroll} style={{ cursor: 'pointer' }}>
      <Comment />
      <Typography>{comments.length} {comments.length > 1 ? 'comments' : 'comment'}</Typography>
    </Container>}
  </Stack>
}

export default PostAuthor
