import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import api from '../../../api'
import type { AuthorPostType } from '../../../api/dto'
import { Loader } from '../../../common/components'
import { usePagination } from '../../../hooks'
import TableData from '../../../modules/author/components/TableData'
import AddNew from '../../../modules/author/components/AddNew'

const columns: Array<{ id: string; label: string }> = [
  { id: 'postId', label: 'PostId' },
  { id: 'title', label: 'Title' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'postStatus', label: 'Status' },
  { id: 'visibility', label: 'Visibility' }
]

const Post: NextPage = () => {
  const { pagination, setPagination, setTotalCount } = usePagination(1)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<AuthorPostType[]>([])

  useEffect(() => {
    api.posts
      .getAllMyPosts()
      .then(posts => {
        setPosts(posts)
        setTotalCount(posts.length)
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
      <TableData columns={columns} rows={posts} pagination={pagination} setPagination={setPagination} />
    </Stack>
  )
}

export default Post
