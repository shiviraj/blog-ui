import Loader from '../../../common/components/Loader'
import { useEffect, useState } from 'react'
import { Pagination, Stack } from '@mui/material'
import SideBar from '../../../modules/post/components/SideBar'
import PageError from '../../../common/components/PageError'
import { useRouter } from 'next/router'
import API from '../../../API'
import PostView from '../../../modules/posts/components/PostView'

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
          {/*{index !== posts.length - 1 && <Divider />}*/}
        </div>)}
      </Stack>
      <Pagination />
    </Stack>
    <SideBar />
  </Stack>
}

export default AllPosts
