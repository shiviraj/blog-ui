import React, { useEffect, useState } from 'react'
import { Divider, Stack } from '@mui/material'
import useMedia from '../../hooks/useMedia'
import { Posts, SideBar } from './components'
import API from '../../API'
import { Loader, PageError } from '../../common/components'

type AllPostsProps = { page: number; totalPosts: number }

const AllPosts = ({ page, totalPosts }: AllPostsProps): JSX.Element => {
  const media = useMedia()

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    API.posts
      .getPosts(page)
      .then(setPosts)
      .catch()
      .then(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (posts.isEmpty()) {
    return <PageError message={'No Post Found!!'} />
  }

  return (
    <Stack direction={media.lg ? 'column' : 'row'} spacing={2} justifyContent={'center'}>
      <Posts posts={posts} page={page} count={totalPosts} />
      <Divider />
      <Stack mt={1}>
        <SideBar />
      </Stack>
    </Stack>
  )
}

export default AllPosts
