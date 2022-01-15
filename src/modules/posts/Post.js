import { useRouter } from 'next/router'
import SideBar from './components/SideBar'
import PostDetails from './components/PostDetails'
import Loader from '../../common/components/Loader'
import { useEffect } from 'react'
import { FlexContainer } from '../../common/components/styled/FlexContainer'

const Post = (props) => {
  const { post, fetchPost, fetchComments } = props
  const router = useRouter()
  
  useEffect(() => {
    if (router.query && router.query.postUrl) fetchPost(router.query.postUrl)
  }, [router.query])
  
  useEffect(() => {
    if (post.commentsAllowed) fetchComments(post.postId)
  }, [post.postId])
  
  if (!post.postId) return <Loader />
  
  return <FlexContainer justifyContent={'space-between'}>
    <PostDetails {...props} />
    <SideBar />
  </FlexContainer>
}

export default Post
