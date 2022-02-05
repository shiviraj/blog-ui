import React, { useEffect, useState } from 'react'
import TableData from './components/Table'
import API from '../../API'
import AddNew from './components/AddNew'
import usePagination from '../../hooks/usePagination'
import { formatDate } from '../../utils/utils'
import RawHTML from '../../common/components/RawHTML'
import ActionBar from './components/ActionBar'
import { Stack } from '@mui/material'

const columns = [
  { id: 'postId', label: 'PostId' },
  { id: 'title', label: 'Title' },
  { id: 'author.username', label: 'Author' },
  { id: 'categories', label: 'Categories', format: (value) => value.map(it => it.name).join(', ') },
  { id: 'tags', label: 'Tags', format: (value) => value.map(it => it.name).join(', ') },
  { id: 'comments', label: 'Comments' },
  {
    id: 'createdAt',
    label: 'Date',
    format: (date) => <RawHTML children={`Created At:\n${formatDate(date)}`} n2br={true} />
  },
  { id: 'postId', label: 'Action', format: (value) => <ActionBar id={value} /> }
]

const Posts = () => {
  const { pagination, setPagination, setTotalPages } = usePagination(1)
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    API.posts.getMyPostsCount()
      .then(setTotalPages)
  }, [])
  
  useEffect(() => {
    API.posts.getAllMyPosts(pagination.page, pagination.rowsPerPage)
      .then(setPosts)
  }, [pagination.page, pagination.rowsPerPage])
  
  return <Stack m={2} mb={10}>
    <AddNew addNew={API.posts.addPost} type={'post'} />
    <TableData columns={columns} rows={posts} pagination={pagination} setPagination={setPagination} />
  </Stack>
}

export default Posts
