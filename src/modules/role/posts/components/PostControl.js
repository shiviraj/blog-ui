import { Box, Button, Typography } from '@material-ui/core'
import ButtonWithLoader from '../../../../common/components/ButtonWithLoader'
import { makeStyles } from '@material-ui/styles'
import { useToast } from '../../../../common/components/ToastWrapper'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    display: 'flex',
    width: theme.spacing(36.6),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottom: `2px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(1, 2),
    zIndex: 1,
    background: theme.palette.common.white
  }
}))

const PostControl = ({ loader, savePost, post }) => {
  const classes = useStyles()
  const toast = useToast()
  
  const handlePublishOrUpdate = () => {
    savePost(post, 'PUBLISH')
      .then((data) => toast.success(data.message))
      .catch((data) => {
        console.log(data)
        toast.error(data.message)
      })
  }
  
  return <Box className={classes.root}>
    <Typography>{loader ? 'Saving...' : 'Saved'}</Typography>
    <Button variant={'outlined'} size={'small'}>Preview</Button>
    <ButtonWithLoader onClick={handlePublishOrUpdate} loading={loader} size={'small'}>
      {post.postStatus === 'PUBLISH' ? 'Update' : 'Publish'}
    </ButtonWithLoader>
  </Box>
}

export default PostControl
