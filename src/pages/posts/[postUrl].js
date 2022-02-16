import { useRouter } from 'next/router'
import Loader from '../../common/components/Loader'
import { useEffect } from 'react'
import { Divider, Stack } from '@mui/material'
import SideBar from '../../modules/posts/components/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPost, setLoader } from '../../modules/post/action'
import PostDetails from '../../modules/post/components/PostDetails'
import { styled } from '@mui/styles'
import useMedia from '../../hooks/useMedia'

const Container = styled(Stack)(({ theme }) => ({
  background: theme.palette.grey[100]
}))

const Post = () => {
  const dispatch = useDispatch()
  const { loader, post } = useSelector((state) => state.post)
  const router = useRouter()
  const media = useMedia()
  
  useEffect(() => {
    if (router.query && router.query.postUrl) {
      fetchPost(dispatch, router.query.postUrl).then(() => dispatch(setLoader(false)))
    }
  }, [router.query])
  
  if (loader || !post.postId) {
    return <Loader />
  }
  
  return <Container direction={media.lg ? 'column' : 'row'} spacing={2} justifyContent={'center'}>
    <PostDetails />
    <Divider />
    <SideBar />
  </Container>
}

export default Post
