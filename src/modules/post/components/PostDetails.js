import { Box, Divider, Stack, Typography } from '@mui/material'
import { styled } from '@mui/styles'
import { useSelector } from 'react-redux'
import PostCategories from './PostCategories'
import PostAuthor from './PostAuthor'
import PostContent from './PostContent'
import PostTags from './PostTags'
import UserResponse from './UserResponse'
import AboutAuthor from './AboutAuthor'
import PostComments from './PostComments'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: theme.spacing(108),
  marginTop: theme.spacing(2)
}))

const PostDetails = () => {
  const { post, author, categories, tags, comments } = useSelector((state) => state.post)
  
  return <Stack justifyContent={'center'} flexDirection={'column'}>
    <Container>
      <Typography variant={'h4'}>{post.title}</Typography>
      <PostCategories categories={categories} />
      <PostAuthor post={post} comments={comments} author={author} />
      <PostContent post={post} />
      <PostTags tags={tags} />
      <UserResponse post={post} comments={comments} />
      <Divider />
      <AboutAuthor author={author} />
      <Divider />
      {post.commentsAllowed && <PostComments post={post} comments={comments} />}
    </Container>
  </Stack>
}

export default PostDetails
