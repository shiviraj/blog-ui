import { makeStyles } from '@material-ui/styles'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { Delete, Edit, Publish } from '@material-ui/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    '&>*': {
      margin: theme.spacing(0, 0.2)
    }
  }
}))

const ActionBar = ({ id }) => {
  const classes = useStyles()
  const router = useRouter()
  const path = router.asPath
  
  return <Box className={classes.root}>
    <Tooltip title='Edit'>
      <Link href={`${path}/edit/${id}`}>
        <IconButton aria-label='edit' size='small' color={'error'}>
          <Edit fontSize='inherit' color={'inherit'} />
        </IconButton>
      </Link>
    </Tooltip>
    <Tooltip title='Publish'>
      <IconButton aria-label='publish' size='small'>
        <Publish fontSize='inherit' />
      </IconButton>
    </Tooltip>
    <Tooltip title='Delete'>
      <IconButton aria-label='delete' size='small'>
        <Delete fontSize='inherit' />
      </IconButton>
    </Tooltip>
  </Box>
}

export default ActionBar
