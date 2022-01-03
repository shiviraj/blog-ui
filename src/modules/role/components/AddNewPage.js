import { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Box } from '@material-ui/core'
import ButtonWithLoader from '../../../common/components/ButtonWithLoader'
import API from '../../../API'
import { useRouter } from 'next/router'
import { useToast } from '../../../common/components/ToastWrapper'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'end',
    marginBottom: theme.spacing(1)
  }
}))

const AddNewPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const toast = useToast()
  
  const [loading, setLoading] = useState(false)
  
  const handleAddNewPage = (e) => {
    e.preventDefault()
    setLoading(true)
    API.pages.addPage()
      .then(({ pageId }) => router.push(`/${router.query.role}/pages/edit/${pageId}`))
      .catch(toast.error).then(() => setLoading(false))
  }
  
  return <Box className={classes.root}>
    <ButtonWithLoader onClick={handleAddNewPage} loading={loading} size={'small'}>
      Add New
    </ButtonWithLoader>
  </Box>
}

export default AddNewPage
