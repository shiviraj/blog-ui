import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import TableData from './components/Table'
import { Box } from '@material-ui/core'
import API from '../../API'
import AddNew from './components/AddNew'
import usePagination from '../../hooks/usePagination'
import { formatDate } from '../../utils/utils'
import RawHTML from '../../common/components/RawHTML'
import ActionBar from './components/ActionBar'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(10)
  }
}))

const columns = [
  { id: 'postId', label: 'PostId' },
  { id: 'title', label: 'Title' },
  { id: 'author.username', label: 'Author' },
  { id: 'categories', label: 'Categories', format: (value) => value.map(it => it.name).join(', ') },
  { id: 'tags', label: 'Tags', format: (value) => value.map(it => it.name).join(', ') },
  { id: 'comments', label: 'Comments' },
  {
    id: 'postDate',
    label: 'Date',
    format: ({ published, publishedOn, createdAt }) => {
      const value = published ? `Published On:\n${formatDate(publishedOn)}` : `Created At:\n${formatDate(createdAt)}`
      return <RawHTML children={value} n2br={true} />
    }
  },
  { id: 'postId', label: 'Action', format: (value) => <RawHTML><ActionBar id={value} /></RawHTML> }
]

const Posts = () => {
  const classes = useStyles()
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
  
  return <Box className={classes.root}>
    <AddNew addNew={API.posts.addPost} type={'post'} />
    <TableData columns={columns} rows={posts} pagination={pagination} setPagination={setPagination} />
  </Box>
}

export default Posts
