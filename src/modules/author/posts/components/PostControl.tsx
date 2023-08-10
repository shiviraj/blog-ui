import { Box, Button, Link, styled, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useAuthorPost } from '../../../../context'
import { useToast } from '../../../../common/components'
import { PostGateway } from '../../../../api'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  borderBottom: `2px solid ${theme.palette.grey[300]}`,
  padding: theme.spacing(1),
  zIndex: 10,
  background: theme.palette.common.white
}))

const PostControl = (): JSX.Element => {
  const toast = useToast()
  const { post, loader } = useAuthorPost()
  const status = post.postStatus === 'PUBLISH' ? 'Update' : 'Publish'

  const handlePublishOrUpdate = () => {
    PostGateway.publish(post.postId)
      .then(() => {
        toast.success(`Successfully ${status.replace('e', '')}ed post`)
      })
      .catch(() => {
        toast.error(`Failed to ${status} post`)
      })
  }

  return (
    <Container>
      <Typography>{loader ? 'Saving...' : 'Saved'}</Typography>
      <Button href={`/posts/${post.url}`} component={Link} variant={'outlined'} size={'small'}>
        Preview
      </Button>
      <LoadingButton onClick={handlePublishOrUpdate} variant={'contained'} loading={loader} size={'small'}>
        {post.postStatus === 'PUBLISH' ? 'Update' : 'Publish'}
      </LoadingButton>
    </Container>
  )
}

export default PostControl
