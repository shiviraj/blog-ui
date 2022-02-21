import Loader from '../../../common/components/Loader'
import { useEffect, useState } from 'react'
import { Divider, Stack } from '@mui/material'
import PageError from '../../../common/components/PageError'
import { useRouter } from 'next/router'
import API from '../../../API'
import SideBar from '../../../modules/posts/components/SideBar'
import useMedia from '../../../hooks/useMedia'
import Posts from '../../../modules/posts/components/Posts'


const AllPosts = () => {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loader, setLoader] = useState(true)
  const [page, setPage] = useState(null)
  const [count, setCount] = useState(0)
  const media = useMedia()
  
  useEffect(() => {
    if (router.query.page) {
      const currentPage = Number(router.query.page)
      setPage(currentPage)
      API.posts.getPostsCount().then((postCount) => setCount(Math.ceil(postCount / 10)))
      API.posts.getPosts(currentPage).then(setPosts).catch().then(() => setLoader(false))
    }
  }, [router.query.page])
  
  if (loader) {
    return <Loader />
  }
  
  if (posts.length === 0) {
    return <PageError message={'No post found!!'} />
  }
  
  return <Stack direction={media.lg ? 'column' : 'row'} spacing={2} justifyContent={'center'}>
    <Posts posts={posts} page={page} count={count} />
    <Divider />
    <Stack mt={1}>
      <SideBar />
    </Stack>
  </Stack>
}

export default AllPosts
