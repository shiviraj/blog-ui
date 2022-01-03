import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Box, Input, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useToast } from '../../../common/components/ToastWrapper'
import API from '../../../API'
import Loader from '../../../common/components/Loader'
import dynamic from 'next/dynamic'
import ButtonWithLoader from '../../../common/components/ButtonWithLoader'

const CustomEditor = dynamic(() => import( '../../../common/components/CustomEditor'), { ssr: false })

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(10)
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '&>*': {
      marginLeft: theme.spacing(1)
    }
  },
  title: {
    fontSize: theme.spacing(4),
    borderBottom: 'none'
  }
}))


const EditPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const toast = useToast()
  const [content, setContent] = useState(null)
  const [saving, setSaving] = useState(false)
  
  const handleTitleUpdate = (event) => {
    setContent({ ...content, title: event.target.value })
  }
  
  const handleUpdateContent = async (instance) => {
    const data = await instance.saver.save()
    setContent({ ...content, content: data })
  }
  
  useEffect(() => {
    if (router.query && router.query.pageId) {
      API.pages.getPage(router.query.pageId)
        .then(setContent)
        .catch((error) => toast.error(error))
    }
  }, [router.query])
  
  useEffect(() => {
    setSaving(true)
    if (content) {
      API.pages.updatePage(content).catch(() => ({}))
        .then(() => setSaving(false))
    }
  }, [content])
  
  if (!content) return <Loader />
  
  return <Box className={classes.root}>
    <Box className={classes.actionBar}>
      <Typography>{saving ? 'Saving...' : 'Saved'}</Typography>
      <ButtonWithLoader loading={saving} size={'small'}>{content.published ? 'Update' : 'Publish'}</ButtonWithLoader>
    </Box>
    <Input onChange={handleTitleUpdate} className={classes.title}
           defaultValue={content.title} placeholder={'Page' +
    ' Title'} disableUnderline />
    {CustomEditor && <CustomEditor data={content.content} handleChange={handleUpdateContent} />}
  </Box>
}

export default EditPage
