import { makeStyles } from '@material-ui/styles'
import { Box } from '@material-ui/core'
import React from 'react'
import Categories from './Categories'
import PostControl from './PostControl'
import StatusAndVisibility from './StatusAndVisibility'
import Permalink from './Permalink'
import Tags from './Tags'
import Discussion from './Discussion'

const useStyles = makeStyles((theme) => ({
  root: {
    right: 0,
    width: theme.spacing(48),
    height: '100vh'
  },
  container: {
    marginTop: theme.spacing(6)
  }
}))


const RightSideBar = ({ loader, post, savePost, setPost }) => {
  const classes = useStyles()
  
  return <Box className={classes.root}>
    <PostControl loader={loader} savePost={savePost} post={post} />
    <Box className={classes.container}>
      <StatusAndVisibility post={post} />
      <Permalink post={post} setPost={setPost} />
      <Categories post={post} setPost={setPost} />
      <Tags post={post} setPost={setPost} />
      <Discussion post={post} setPost={setPost} />
    </Box>
  </Box>
}

export default RightSideBar
