import { Avatar, Box, Stack, styled, Typography } from '@mui/material'
import { Comment, DateRange, Person } from '@mui/icons-material'
import { Link } from '../../../common/components'
import type { AuthorType } from '../../../api/dto'
import { formatDateTime } from '../../../utils/utils'
import { useMedia, useScroll } from '../../../hooks'
import { Integer } from '../../../utils/extensions'

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
type PostAuthorProps = {
  author: AuthorType
  icon?: boolean
  lastUpdateOn: string
  commentsAllowed: boolean
  commentsCount: number
}

const PostAuthor = (props: PostAuthorProps): JSX.Element => {
  const { author, lastUpdateOn, commentsCount, commentsAllowed, icon = false } = props
  const media = useMedia()
  // const { scroll } = useScroll('#comment')
  const { scroll } = useScroll()
  return (
    <Stack
      direction={media.md ? 'row' : 'column'}
      flexWrap={'wrap'}
      justifyContent={media.md ? 'start' : 'space-between'}
      alignItems={media.md ? 'center' : 'start'}
    >
      <Link href={`/authors/${author.authorId}`} underlineonhover={'true'}>
        <Container>
          {icon ? <Person /> : <Avatar src={author.profile} alt={author.name} />}
          <Typography variant={'subtitle1'} color={'primary'}>
            {author.displayName}
          </Typography>
        </Container>
      </Link>
      <Container>
        <DateRange />
        <Typography>{formatDateTime(lastUpdateOn)}</Typography>
      </Container>
      {commentsAllowed && media.md && commentsCount.isGreaterThanZero() && (
        <Container onClick={scroll} style={{ cursor: 'pointer' }}>
          <Comment />
          <Typography>
            {commentsCount} {commentsCount.isGreaterThan(Integer.ONE) ? 'comments' : 'comment'}
          </Typography>
        </Container>
      )}
    </Stack>
  )
}

export default PostAuthor
