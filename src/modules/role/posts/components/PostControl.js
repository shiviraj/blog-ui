import { Box, Button, Link, Typography } from '@mui/material'
import { useToast } from '../../../../common/components/ToastWrapper'
import { LoadingButton } from '@mui/lab'
import { styled } from '@mui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from '../action'

const Container = styled(Box)(({ theme }) => ({
  position: 'fixed',
  display: 'flex',
  width: theme.spacing(36),
  alignItems: 'center',
  justifyContent: 'space-evenly',
  borderBottom: `2px solid ${theme.palette.grey[300]}`,
  padding: theme.spacing(1),
  zIndex: 10,
  background: theme.palette.common.white
}))

const PostControl = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const { post, loader } = useSelector((state) => state.editPost)
  
  
  const handlePublishOrUpdate = () => {
    updatePost(dispatch, post, 'PUBLISH')
      .then((data) => toast.success(data.message))
      .catch((data) => toast.error(data.message))
  }
  
  return <Container>
    <Typography>{loader ? 'Saving...' : 'Saved'}</Typography>
    <Button href={`/posts/${post.url}`} component={Link} variant={'outlined'} size={'small'}>Preview</Button>
    <LoadingButton onClick={handlePublishOrUpdate} variant={'contained'} loading={loader} size={'small'}>
      {post.postStatus === 'PUBLISH' ? 'Update' : 'Publish'}
    </LoadingButton>
  </Container>
}

export default PostControl
