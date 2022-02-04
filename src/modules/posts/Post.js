import { useRouter } from 'next/router'
import SideBar from './components/SideBar'
import PostDetails from './components/PostDetails'
import Loader from '../../common/components/Loader'
import { useEffect } from 'react'
import { Stack } from '@mui/material'

const Post = (props) => {
  const { post, fetchPost } = props
  const router = useRouter()
  
  useEffect(() => {
    if (router.query && router.query.postUrl) {
      fetchPost(router.query.postUrl)
    }
  }, [router.query])
  
  if (!post.postId) {
    return <Loader />
  }
  
  return <Stack direction={'row'} justifyContent={'space-between'}>
    <PostDetails {...props} />
    <SideBar />
  </Stack>
}

export default Post
