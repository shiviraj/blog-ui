import { useState } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '../../../common/components/ToastWrapper'
import { Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Add } from '@mui/icons-material'

const AddNew = ({ addNew, type }) => {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  
  const handleAddNewPost = (event) => {
    event.preventDefault()
    setLoading(true)
    addNew()
      .then((data) => router.push(`/${router.query.role}/${type}s/edit/${data[`${type}Id`]}`))
      .catch(toast.error).then(() => setLoading(false))
  }
  
  return <Stack direction={'row'} justifyContent={'end'} mb={1}>
    <LoadingButton onClick={handleAddNewPost} loading={loading} variant={'contained'} color={'primary'}
                   endIcon={<Add />} loadingPosition={'end'} size={'small'}>
      Add New
    </LoadingButton>
  </Stack>
}

export default AddNew
