import Loader from '../../../common/components/Loader'
import { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import PageError from '../../../common/components/PageError'
import { useRouter } from 'next/router'
import API from '../../../API'
import PostView from '../../../modules/posts/components/PostView'
import { Pagination } from '@mui/lab'
import SideBar from '../../../modules/post/components/SideBar'
import { styled } from '@mui/styles'

const Divider = styled('div')(({ theme }) => ({
  border: `1px dashed ${theme.palette.grey[500]}`,
  margin: theme.spacing(0, 2)
}))


const AllPosts = () => {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loader, setLoader] = useState(true)
  
  useEffect(() => {
    if (router.query && router.query.page) {
      API.posts.getPosts(router.query.page).then(setPosts).catch().then(setLoader)
    }
  }, [router.query])
  
  if (loader) {
    return <Loader />
  }
  
  if (posts.length === 0) {
    return <PageError message={'No post found!!'} />
  }
  
  return <Stack direction={'row'} justifyContent={'space-between'}>
    <Stack>
      <Stack>
        {posts.map((post, index) => <div key={post.postId}>
          <PostView post={post} />
          {index !== posts.length - 1 && <Divider />}
        </div>)}
      </Stack>
      <Pagination />
    </Stack>
    <SideBar />
  </Stack>
}

export default AllPosts
