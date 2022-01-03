import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[300],
    width: '100%',
    color: theme.palette.primary.main,
    textAlign: 'center'
  },
  title: {}
}))

const TitleBar = ({ title }) => {
  const classes = useStyles()
  return <Box className={classes.root} boxShadow={2}>
    <Typography className={classes.title} variant={'h4'}>{title}</Typography>
  </Box>
}

export default TitleBar
