import * as React from 'react'
import { useState } from 'react'
import { Box, Collapse, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { ExpandLess, ExpandMore } from '@material-ui/icons'


const useStyles = makeStyles((theme) => ({
  accordion: {
    padding: theme.spacing(0.5, 1),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[50]
  },
  accordionSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0.5, 0),
    alignItems: 'center',
    transition: `border 0s .3s`
  },
  accordionDetails: {
    padding: theme.spacing(0.5, 0)
  }
}))

const Accordion = ({ children, title, expanded = true }) => {
  const [expand, setExpand] = useState(expanded)
  const classes = useStyles()
  
  return <Box className={classes.accordion} boxShadow={2}>
    <Box onClick={() => setExpand(!expand)} className={classes.accordionSummary}>
      <Typography variant={'h6'}>{title}</Typography>
      <IconButton size={'small'}>{expand ? <ExpandLess /> : <ExpandMore />}</IconButton>
    </Box>
    <Collapse in={expand} className={classes.accordionDetails}>
      {children}
    </Collapse>
  </Box>
}

export default Accordion
