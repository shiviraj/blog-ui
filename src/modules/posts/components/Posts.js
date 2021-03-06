import PostView from './PostView'
import { Box, Pagination, Stack } from '@mui/material'
import { styled } from '@mui/styles'
import { useRouter } from 'next/router'

const PostDivider = styled('div')(({ theme }) => ({
  border: `1px dashed ${theme.palette.grey[500]}`
}))

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: theme.spacing(104),
  [theme.breakpoints.down('md')]: {
    width: '98%'
  }
}))

const Posts = ({ posts, page, count }) => {
  const router = useRouter()
  const handleChange = (_, page) => router.push(`/posts/page/${page}`).then()
  return <Container>
    {posts.map((post, index) => <div key={post.postId}>
      <PostView post={post} />
      {index !== posts.length - 1 && <PostDivider />}
    </div>)}
    <Stack alignSelf={'center'} mb={2}>
      {count > 1 &&
      <Pagination color={'primary'} page={page || 0} onChange={handleChange} count={count} showFirstButton
                  showLastButton />}
    </Stack>
  </Container>
}

export default Posts
