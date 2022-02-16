import { useRouter } from 'next/router'
import SideBar from '../posts/components/SideBar'
import PostDetails from './components/PostDetails'
import Loader from '../../common/components/Loader'
import { useEffect } from 'react'
import { Stack } from '@mui/material'
import useMedia from '../../hooks/useMedia'

const Post = (props) => {
  const { post, fetchPost } = props
  const router = useRouter()
  const media = useMedia()
  
  
  useEffect(() => {
    if (router.query && router.query.postUrl) {
      fetchPost(router.query.postUrl)
    }
  }, [router.query])
  
  if (!post.postId) {
    return <Loader />
  }
  
  return <Stack direction={media.md ? 'row' : 'column'} justifyContent={'space-evenly'}>
    <PostDetails {...props} />
    <SideBar />
  </Stack>
}

export default Post
