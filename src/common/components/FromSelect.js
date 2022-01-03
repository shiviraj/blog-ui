import React from 'react'
import {FormControl, InputLabel, makeStyles, MenuItem, Select} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.8, 0),
      padding: theme.spacing(0, 0),
      width: '100%'
    }
  }
}))

const FormSelect = ({onChange, label, value, options, fieldKey, ...props}) => {
  const classes = useStyles()

  const handleChange = (event) => {
    onChange(fieldKey, event.target.value)
  }

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" size="small" {...props}>
        <InputLabel id={label} {...props}>{label}</InputLabel>
        <Select
          labelId={label}
          value={value}
          label={label}
          onChange={handleChange}
          {...props}
        >
          {options.map((option) => <MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  )
}

export default FormSelect
