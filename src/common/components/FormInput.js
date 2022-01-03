import React from 'react'
import {makeStyles, TextField} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.8, 0),
      padding: theme.spacing(0, 0),
      width: '100%'
    }
  }
}))

const FormInput = ({onChange, label, value, fieldKey, ...props}) => {
  const classes = useStyles()

  const handleChange = (event) => onChange(fieldKey, event.target.value)

  return (
    <div className={classes.root}>
      <TextField label={label} value={value} onChange={handleChange} data-testid={fieldKey} name={fieldKey}
                 variant='outlined' size='small'{...props} />
    </div>
  )
}

export default FormInput
