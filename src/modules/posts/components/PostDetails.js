import PostTitle from './PostTitle'
import PostAuthor from './PostAuthor'
import PostContent from './PostContent'
import PostTags from './PostTags'
import PostCategories from './PostCategories'
import UserResponse from './UserResponse'
import AboutAuthor from './AboutAuthor'
import { Box, Divider } from '@mui/material'
import { styled } from '@mui/styles'
import { FlexContainer } from '../../../common/components/styled/FlexContainer'
import PostComments from './PostComments'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: theme.spacing(120)
}))

const PostDetails = ({ post, comments }) => {
  return <FlexContainer flexDirection={'column'} justifyContent={'center'}>
    <Container>
      <PostTitle title={post.title} />
      <PostCategories categories={post.categories} />
      <PostAuthor post={post} comments={comments} />
      <PostContent post={post} />
      <PostTags tags={post.tags} />
      <UserResponse post={post} comments={comments} />
      <Divider />
      <AboutAuthor post={post} />
      {post.commentsAllowed && <PostComments post={post} comments={comments} />}
    </Container>
  </FlexContainer>
}

export default PostDetails
