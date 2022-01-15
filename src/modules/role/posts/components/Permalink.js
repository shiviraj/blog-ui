import { Box, Link, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Accordion from '../../../../common/components/Accordion'
import { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
  link: {
    padding: theme.spacing(3, 0),
    margin: theme.spacing(3, 0),
    textDecoration: 'none'
  }
}))

const Permalink = ({ post, setPost }) => {
  const classes = useStyles()
  const [url, setUrl] = useState(post.url)
  const baseUrl = window ? window.location.toString().split('/').slice(0, 3).join('/') : ''
  
  useEffect(() => setPost({ url }), [url])
  // TODO: if url is available if not show error and disable the publish button
  return <Accordion title={'Permalink'}>
    <TextField
      defaultValue={url}
      label={'Url slug'}
      onChange={(e) => setUrl(e.target.value)}
      variant={'outlined'}
      color={'primary'}
      size={'small'}
      InputLabelProps={{ shrink: true }}
      fullWidth
      required />
    <Box pt={1}>
      <Link href={`/posts/${post.url}`} className={classes.link}>
        {`${baseUrl}/posts/${url}`}
      </Link>
    </Box>
  </Accordion>
}

export default Permalink
