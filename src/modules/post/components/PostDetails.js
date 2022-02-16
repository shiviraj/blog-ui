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
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.grey[500]}`,
  [theme.breakpoints.down('lg')]: {
    borderRadius: theme.spacing(1),
    width: '94%'
  },
  [theme.breakpoints.down('sm')]: {
    width: '96%',
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.5)
  }
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
