import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '../../../common/components'
import API from '../../../api'
import Loader from '../../../common/components/Loader'
import dynamic from 'next/dynamic'
import { Box, Input, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const CustomEditor = dynamic(() => import('../../../common/components/Editor/Editor'), { ssr: false })

// eslint-disable-next-line max-lines-per-function,max-statements
const EditPage = () => {
  const router = useRouter()
  const toast = useToast()
  const [content, setContent] = useState(null)
  const [published, setPublished] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleTitleUpdate = event => {
    setContent({ ...content, title: event.target.value, published: false })
  }

  const handleUpdateContent = async instance => {
    const data = await instance.saver.save()
    setContent({ ...content, content: data, published: false })
  }

  const handlePublishOrUpdate = () => {
    setPublished(true)
    setContent({ ...content, published: true })
  }

  useEffect(() => {
    if (router.query && router.query.pageId) {
      API.pages
        .getPage(router.query.pageId)
        .then(data => {
          setPublished(data.published)
          setContent({ ...data, published: false })
        })
        .catch(error => toast.error(error))
    }
  }, [router.query])

  useEffect(() => {
    setSaving(true)
    if (content) {
      API.pages
        .updatePage(content)
        .catch(() => ({}))
        .then(() => setSaving(false))
    }
  }, [content])

  if (!content) {
    return <Loader />
  }

  return (
    <Box>
      <Box>
        <Typography>{saving ? 'Saving...' : 'Saved'}</Typography>
        <LoadingButton onClick={handlePublishOrUpdate} loading={saving} size={'small'}>
          {published ? 'Update' : 'Publish'}
        </LoadingButton>
      </Box>
      <Input
        onChange={handleTitleUpdate}
        defaultValue={content.title}
        placeholder={'Page' + ' Title'}
        disableUnderline
      />
      {CustomEditor && <CustomEditor id={content.pageId} data={content.content} handleChange={handleUpdateContent} />}
    </Box>
  )
}

export default EditPage
