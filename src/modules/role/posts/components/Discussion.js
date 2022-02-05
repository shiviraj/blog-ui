import React from 'react'
import Accordion from '../../../../common/components/Accordion'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setEditPost } from '../action'

const Discussion = () => {
  const dispatch = useDispatch()
  const { post } = useSelector((state) => state.editPost)
  
  const handleCheckbox = (event) => dispatch(setEditPost({ ...post, commentsAllowed: event.target.checked }))
  
  return <Accordion title={'Discussion'}>
    <FormControlLabel
      control={<Checkbox checked={post.commentsAllowed} color={'primary'} onChange={handleCheckbox} />}
      label='Allow Comments' />
  </Accordion>
}

export default Discussion
