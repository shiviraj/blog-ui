import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader from '../../../common/components/Loader'
import dynamic from 'next/dynamic'
import { Box, Divider, Input, Stack } from '@mui/material'
import { styled } from '@mui/styles'
import RightSideBar from './components/RightSideBar'

const CustomEditor = dynamic(() => import( '../../../common/components/CustomEditor'), { ssr: false })

const InputText = styled(Input)(({ theme }) => ({
  width: '100%',
  fontSize: theme.spacing(4),
  fontWeight: 'bolder'
}))

const Content = styled(Box)(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  fontSize: theme.spacing(2.2),
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  [theme.breakpoints.up('md')]: {
    width: theme.spacing(112),
    '& .ce-block__content,& .ce-toolbar__content': {
      maxWidth: '100%',
      textAlign: 'justify'
    },
    '& .ce-block__content .ce-paragraph': {
      textIndent: theme.spacing(4)
    }
  }
}))

const EditPost = ({ loader, post, fetchPost, savePost, setPost }) => {
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
  
  if (!post) {
    return <Loader />
  }
  
  return <Stack mt={3} direction={'row'} justifyContent={'space-between'}>
    <Stack justifyContent={'center'} style={{ width: '100%' }}>
      <Content>
        <InputText onChange={handleTitleUpdate} defaultValue={post.title} disableUnderline
                   multiline />
        {CustomEditor && <CustomEditor id={post.postId} data={post.content} handleChange={handleUpdateContent} />}
      </Content>
    </Stack>
    <Divider orientation={'vertical'} flexItem />
    <RightSideBar post={post} loader={loader} savePost={savePost} setPost={setPost} />
  </Stack>
}

export default EditPost
