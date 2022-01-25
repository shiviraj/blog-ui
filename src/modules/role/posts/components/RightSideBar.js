import React from 'react'
import Categories from './Categories'
import PostControl from './PostControl'
import StatusAndVisibility from './StatusAndVisibility'
import Permalink from './Permalink'
import Tags from './Tags'
import Discussion from './Discussion'
import { styled } from '@mui/styles'
import { Box } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
  right: 0,
  float: 'right',
  width: theme.spacing(48),
  height: '100vh'
}))

const RightSideBar = ({ loader, post, savePost, setPost }) => <Container>
  <PostControl loader={loader} savePost={savePost} post={post} />
  <Box mt={6}>
    <StatusAndVisibility post={post} />
    <Permalink post={post} setPost={setPost} />
    <Categories post={post} setPost={setPost} />
    <Tags post={post} setPost={setPost} />
    <Discussion post={post} setPost={setPost} />
  </Box>
</Container>

export default RightSideBar
