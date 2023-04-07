import Accordion from '../../../../common/components/Accordion'
import { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { Box, Link, TextField } from '@mui/material'
import API from '../../../../api'
import { useDispatch, useSelector } from 'react-redux'
import { setEditPost } from '../action'

const PostLink = styled(Link)(({ theme }) => ({
  padding: theme.spacing(3, 0),
  margin: theme.spacing(3, 0),
  fontFamily: 'Roboto',
  textDecoration: 'none'
}))

const Permalink = () => {
  const dispatch = useDispatch()
  const { post } = useSelector((state) => state.editPost)
  
  const [url, setUrl] = useState(post.url)
  const [error, setError] = useState('')
  const baseUrl = window ? window.location.toString().split('/').slice(0, 3).join('/') : ''
  
  useEffect(() => {
    dispatch(setEditPost({ ...post, url }))
    // eslint-disable-next-line require-unicode-regexp,prefer-named-capture-group
    const regexp = /^[a-z][a-z0-9\\-]+$/i
    if (url && regexp.exec(url)) {
      API.posts.isUrlAvailable(post.postId, url)
        .then((isUrlAvailable) => {
          const errorMessage = isUrlAvailable ? '' : 'Url is not available!'
          setError(errorMessage)
        })
    } else {
      setError(url.length < 2 ? 'Url is too small' : 'No special char allowed, except than \'-\'')
    }
  }, [url])
  
  return <Accordion title={'Permalink'}>
    <TextField
      defaultValue={`post ${url}`}
      label={'Url slug'}
      onChange={(event) => setUrl(event.target.value)}
      variant={'outlined'}
      color={'primary'}
      size={'small'}
      InputLabelProps={{ shrink: true }}
      fullWidth
      error={error}
      helperText={error}
      multiline
      required />
    <Box pt={1}>
      <PostLink href={`/posts/${post.url}`}>
        {`${baseUrl}/posts/${url}`}
      </PostLink>
    </Box>
  </Accordion>
}

export default Permalink
