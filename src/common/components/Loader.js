import {makeStyles} from '@material-ui/styles'
import {Box, CircularProgress} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const Loader = () => {
  const classes = useStyles()
  return <Box className={classes.root}><CircularProgress color="primary"/></Box>
}

export default Loader
