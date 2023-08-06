import type { ChangeEvent } from 'react'
import React from 'react'
import { Box, Divider, Input, Stack, styled } from '@mui/material'
import { useAuthorPost } from '../../../context'
import type { OutputData } from '@editorjs/editorjs'
import { Categories, Discussion, FeaturedImage, Permalink, PostControl, StatusAndVisibility, Tags } from './components'
import dynamic from 'next/dynamic'

const CustomEditor = dynamic(() => import('../../../common/components/Editor/Editor'), { ssr: false })

const EditPostContainer = styled(Stack)(({ theme }) => ({
  margin: theme.spacing(-2),
  marginLeft: theme.spacing(2),
  maxHeight: '100vh',
  overflow: 'hidden',
  flexDirection: 'row',
  width: '100%'
}))

const InputText = styled(Input)(({ theme }) => ({
  width: '100%',
  fontSize: theme.spacing(4),
  fontWeight: 'bolder'
}))

const Content = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(4),
  overflow: 'auto',
  fontSize: theme.spacing(2.2),
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  '& .ce-block__content,& .ce-toolbar__content': {
    maxWidth: '100%',
    textAlign: 'justify'
  }
}))

const Container = styled(Box)(({ theme }) => ({
  width: theme.spacing(48),
  overflow: 'auto'
}))

const EditPost = (): JSX.Element => {
  const { post, updatePost } = useAuthorPost()

  const handleTitleUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    updatePost('title', event.target.value)
  }

  const handleUpdateContent = (value: OutputData) => {
    updatePost('content', value)
  }

  return (
    <EditPostContainer>
      <Content>
        <InputText
          onChange={handleTitleUpdate}
          defaultValue={post.title}
          disableUnderline
          multiline
          placeholder={'Add New Post...'}
        />
        <CustomEditor data={post.content} onChange={handleUpdateContent} holder={'edit-post-container'} />
      </Content>
      <Divider orientation={'vertical'} flexItem />
      <Container>
        <PostControl />
        <StatusAndVisibility />
        <Permalink />
        <Categories />
        <Tags />
        <Discussion />
        <FeaturedImage />
      </Container>
    </EditPostContainer>
  )
}

export default EditPost
