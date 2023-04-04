import {Box, Link, Stack, styled, Typography} from '@mui/material'
import PostAuthor from '../../post/components/PostAuthor'
import RawHTML from '../../../common/components/RawHTML'

const Container = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: theme.spacing(1),
  margin: theme.spacing(2, 0),
  padding: theme.spacing(1.5),
  '&:hover': {
    boxShadow: theme.shadows[4]
  }
}))

const Image = styled('img')(({ theme }) => ({
  height: theme.spacing(24),
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`
}))

const PostView = ({ post }) => <Container>
  <Link href={`/posts/${post.url}`} color={'inherit'} underline={'none'}>
    <Typography variant={'h4'}>{post.title}</Typography>
  </Link>
  <Stack mt={1} mb={1}>
    <PostAuthor post={post} author={post.author} comments={post.comments} icon />
  </Stack>
  <Stack direction={'row'} spacing={2}>
    {post.featuredImage && <Image src={post.featuredImage} />}
    <div>
      <RawHTML n2br>{post.content}</RawHTML>
      <Link href={`/posts/${post.url}`} underline={'none'}> Read More...</Link>
    </div>
  </Stack>
</Container>

export default PostView
