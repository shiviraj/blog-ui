import PostTitle from './PostTitle'
import PostAuthor from './PostAuthor'
import PostContent from './PostContent'
import PostTags from './PostTags'
import PostCategories from './PostCategories'
import UserResponse from './UserResponse'
import AboutAuthor from './AboutAuthor'
import { Box, Divider, Stack } from '@mui/material'
import { styled } from '@mui/styles'
import PostComments from './PostComments'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: theme.spacing(120)
}))

const PostDetails = ({ post, author, categories, tags, comments }) => {
  return <Stack width={'100%'} justifyContent={'center'} flexDirection={'column'}>
    <Container>
      <PostTitle title={post.title} />
      <PostCategories categories={categories} />
      <PostAuthor post={post} comments={comments} author={author} />
      <PostContent post={post} />
      <PostTags tags={tags} />
      <UserResponse likes={post.likes} dislikes={post.disLikes} comments={comments} />
      <Divider />
      <AboutAuthor author={author} />
      <Divider />
      {post.commentsAllowed && <PostComments post={post} comments={comments} />}
    </Container>
  </Stack>
}

export default PostDetails
