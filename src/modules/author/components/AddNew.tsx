import { Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Add } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useToast } from '../../../common/components'
import { useState } from 'react'
import { PostGateway } from '../../../api'

const AddNew = (): JSX.Element => {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleAddNewPost = () => {
    setLoading(true)
    PostGateway.addNew()
      .then(authorPost => router.push(`/author/posts/edit/${authorPost.postId}`))
      .catch(() => {
        toast.error('Failed to add new post')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Stack direction={'row'}>
      <LoadingButton
        onClick={handleAddNewPost}
        loading={loading}
        variant={'contained'}
        color={'primary'}
        endIcon={<Add />}
        loadingPosition={'end'}
      >
        Add New
      </LoadingButton>
    </Stack>
  )
}

export default AddNew
