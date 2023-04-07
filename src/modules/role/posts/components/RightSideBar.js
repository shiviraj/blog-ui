import React from 'react'
import Categories from './Categories'
import PostControl from './PostControl'
import StatusAndVisibility from './StatusAndVisibility'
import Permalink from './Permalink'
import Tags from './Tags'
import Discussion from './Discussion'
import { styled } from '@mui/material'
import { Box } from '@mui/material'
import FeaturedImage from './FeaturedImage'

const Container = styled(Box)(({ theme }) => ({
  right: 0,
  float: 'right',
  width: theme.spacing(48),
  height: '100vh'
}))

const RightSideBar = () => <Container>
  <PostControl />
  <Box mt={6}>
    <StatusAndVisibility />
    <Permalink />
    <Categories />
    <Tags />
    <Discussion />
    <FeaturedImage />
  </Box>
</Container>

export default RightSideBar
