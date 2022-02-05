import { useRouter } from 'next/router'
import Loader from '../../common/components/Loader'
import { useEffect } from 'react'
import { Stack } from '@mui/material'
import SideBar from '../../modules/post/components/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPost, setLoader } from '../../modules/post/action'
import PostDetails from '../../modules/post/components/PostDetails'

const Post = () => {
  const dispatch = useDispatch()
  const { loader, post } = useSelector((state) => state.post)
  const router = useRouter()
  
  useEffect(() => {
    if (router.query && router.query.postUrl) {
      fetchPost(dispatch, router.query.postUrl).then(() => dispatch(setLoader(false)))
    }
  }, [router.query])
  
  if (loader || !post.postId) {
    return <Loader />
  }
  
  return <Stack direction={'row'} justifyContent={'space-between'}>
    <PostDetails />
    <SideBar />
  </Stack>
}

export default Post
