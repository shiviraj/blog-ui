import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import api from '../../../api'
import type { AuthorPostType } from '../../../api/dto'
import { Loader } from '../../../common/components'
import { AddNew, TableData } from '../../../modules/author/components'
import { ActionBar } from '../../../modules/author/posts/components'

const columns: Array<{ id: string; label: string }> = [
  { id: 'postId', label: 'PostId' },
  { id: 'title', label: 'Title' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'postStatus', label: 'Status' },
  { id: 'visibility', label: 'Visibility' }
]

const Post: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<AuthorPostType[]>([])

  useEffect(() => {
    api.posts
      .getAllMyPosts()
      .then(posts => {
        setPosts(posts)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <Stack spacing={2}>
      <AddNew />
      <TableData columns={columns} rows={posts} Action={{ id: 'postId', Component: ActionBar }} />
    </Stack>
  )
}

export default Post
