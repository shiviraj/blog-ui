import { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Box } from '@material-ui/core'
import ButtonWithLoader from '../../../common/components/ButtonWithLoader'
import { useRouter } from 'next/router'
import { useToast } from '../../../common/components/ToastWrapper'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'end',
    marginBottom: theme.spacing(1)
  }
}))

const AddNew = ({ addNew, type }) => {
  const classes = useStyles()
  const router = useRouter()
  const toast = useToast()
  
  const [loading, setLoading] = useState(false)
  
  const handleAddNewPost = (e) => {
    e.preventDefault()
    setLoading(true)
    addNew()
      .then((data) => router.push(`/${router.query.role}/${type}s/edit/${data[`${type}Id`]}`))
      .catch(toast.error).then(() => setLoading(false))
  }
  
  return <Box className={classes.root}>
    <ButtonWithLoader onClick={handleAddNewPost} loading={loading} size={'small'}>
      Add New
    </ButtonWithLoader>
  </Box>
}

export default AddNew
