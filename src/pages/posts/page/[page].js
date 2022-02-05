import Loader from '../../../common/components/Loader'
import { useEffect, useState } from 'react'
import { Box, Stack } from '@mui/material'
import PageError from '../../../common/components/PageError'
import { useRouter } from 'next/router'
import API from '../../../API'
import PostView from '../../../modules/posts/components/PostView'
import { Pagination } from '@mui/lab'
import SideBar from '../../../modules/posts/components/SideBar'
import { styled } from '@mui/styles'

const PostDivider = styled('div')(({ theme }) => ({
  border: `1px dashed ${theme.palette.grey[500]}`
}))

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: theme.spacing(108)
}))

const AllPosts = () => {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loader, setLoader] = useState(true)
  const [page, setPage] = useState(null)
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (router.query && router.query.page) {
      const page = +router.query.page
      setPage(page)
      API.posts.getPostsCount().then((count) => setCount(Math.ceil(count / 10)))
      API.posts.getPosts(page).then(setPosts).catch().then(setLoader)
    }
  }, [router.query])
  
  const handleChange = (_, page) => router.push(`/posts/page/${page}`).then()
  
  if (loader) {
    return <Loader />
  }
  
  if (posts.length === 0) {
    return <PageError message={'No post found!!'} />
  }
  
  return <Stack direction={'row'} spacing={4} justifyContent={'center'}>
    <Container>
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
    <Stack mt={1}>
      <SideBar />
    </Stack>
  </Stack>
}

export default AllPosts
