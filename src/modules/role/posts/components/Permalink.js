import Accordion from '../../../../common/components/Accordion'
import { useEffect, useState } from 'react'
import { styled } from '@mui/styles'
import { Box, Link, TextField } from '@mui/material'

const PostLink = styled(Link)(({ theme }) => ({
  padding: theme.spacing(3, 0),
  margin: theme.spacing(3, 0),
  fontFamily: 'Roboto',
  textDecoration: 'none'
}))

const Permalink = ({ post, setPost }) => {
  const [url, setUrl] = useState(post.url)
  const baseUrl = window ? window.location.toString().split('/').slice(0, 3).join('/') : ''
  
  useEffect(() => setPost({ url }), [url])
  // TODO: if url is available if not show error and disable the publish button
  return <Accordion title={'Permalink'}>
    <TextField
      defaultValue={url}
      label={'Url slug'}
      onChange={(event) => setUrl(event.target.value)}
      variant={'outlined'}
      color={'primary'}
      size={'small'}
      InputLabelProps={{ shrink: true }}
      fullWidth
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
