import React from 'react'
import Accordion from '../../../../common/components/Accordion'
import { Checkbox, FormControlLabel } from '@mui/material'

const Discussion = ({ post, setPost }) => {
  const handleCheckbox = (event) => {
    setPost({ commentsAllowed: event.target.checked })
  }
  
  return <Accordion title={'Discussion'}>
    <FormControlLabel
      control={<Checkbox checked={post.commentsAllowed} color={'primary'} onChange={handleCheckbox} />}
      label='Allow Comments' />
  </Accordion>
}

export default Discussion
