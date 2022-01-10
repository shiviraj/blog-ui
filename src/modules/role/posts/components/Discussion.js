import React from 'react'
import Accordion from '../../../../common/components/Accordion'
import { Checkbox, FormControlLabel } from '@material-ui/core'

const Discussion = ({ post, setPost }) => {
  const handleCheckbox = (e) => {
    setPost({ commentsAllowed: e.target.checked })
  }
  
  return <Accordion title={'Discussion'}>
    <FormControlLabel
      control={<Checkbox checked={post.commentsAllowed} onChange={handleCheckbox} />}
      label='Allow Comments' />
  </Accordion>
}

export default Discussion
