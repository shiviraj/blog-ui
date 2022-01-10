import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Box, Divider, Input } from '@material-ui/core'
import { useRouter } from 'next/router'
import Loader from '../../../common/components/Loader'
import dynamic from 'next/dynamic'
import RightSideBar from './components/RightSideBar'

const CustomEditor = dynamic(() => import( '../../../common/components/CustomEditor'), { ssr: false })

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(3)
  },
  content: {
    width: '100%',
    justifyContent: 'center'
  },
  title: {
    fontSize: theme.spacing(4),
    padding: '0 20%'
  }
}))


const EditPost = ({ loader, post, fetchPost, savePost, setPost }) => {
  const classes = useStyles()
  const router = useRouter()
  
  const handleTitleUpdate = (event) => {
    setPost({ title: event.target.value })
  }
  
  const handleUpdateContent = async (instance) => {
    const data = await instance.saver.save()
    savePost({ ...post, content: data })
  }
  
  useEffect(() => {
    if (router.query && router.query.postId) {
      fetchPost(router.query.postId)
    }
  }, [router.query])
  
  if (!post) return <Loader />
  
  return <Box className={classes.root}>
    <Box className={classes.content}>
      <Input onChange={handleTitleUpdate} className={classes.title} defaultValue={post.title} disableUnderline />
      {CustomEditor && <CustomEditor id={post.postId} data={post.content} handleChange={handleUpdateContent} />}
    </Box>
    <Divider orientation={'vertical'} flexItem />
    <RightSideBar post={post} loader={loader} savePost={savePost} setPost={setPost} />
  </Box>
}

export default EditPost
