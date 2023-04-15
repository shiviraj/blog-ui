import React from 'react'
import Accordion from '../../../../common/components/Accordion'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useAuthorPost } from '../../../../context'

const Discussion = (): JSX.Element => {
  const { post, updatePost } = useAuthorPost()

  const handleCheckbox = (event: unknown, checked: boolean) => {
    updatePost('commentsAllowed', checked)
  }

  return (
    <Accordion title={'Discussion'}>
      <FormControlLabel
        control={<Checkbox checked={post.commentsAllowed} color={'primary'} onChange={handleCheckbox} />}
        label="Allow Comments"
      />
    </Accordion>
  )
}

export default Discussion
