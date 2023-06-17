import { Box, Stack, styled, Typography } from '@mui/material'
import React from 'react'
import { Link, RawHTML } from '../../../common/components'
import PostAuthor from '../../post/components/PostAuthor'
import type { PostSummaryType } from '../../../api/dto'

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.common.white,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  }
}))

type PostViewProps = { post: PostSummaryType }
const PostView = ({ post }: PostViewProps): JSX.Element => (
  <Container>
    <Link href={`/posts/${post.url}`}>
      <Typography variant={'h4'}>{post.title}</Typography>
    </Link>
    <Stack mt={1} mb={1}>
      <PostAuthor
        author={post.author}
        lastUpdateOn={post.lastUpdateOn}
        commentsAllowed={post.commentsAllowed}
        commentsCount={post.comments}
        icon
      />
    </Stack>
    <Stack direction={'row'} spacing={2}>
      <div>
        <RawHTML n2br>{post.summary}</RawHTML>
        <Link href={`/posts/${post.url}`} underlineonhover={'true'} color={'primary'}>
          {'  '}
          Read More
        </Link>
      </div>
    </Stack>
  </Container>
)

export default PostView
