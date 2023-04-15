import React, { useState } from 'react'
import { Accordion } from '../../../../common/components'
import { formatDateTime } from '../../../../utils'
import { Button, Dialog, DialogTitle, Divider, List, MenuItem, Stack, Typography } from '@mui/material'
import { useAuthorPost } from '../../../../context'
import type { Visibility } from '../../../../api/dto'

const StatusAndVisibility = (): JSX.Element => {
  const { post, updatePost } = useAuthorPost()
  const [open, setOpen] = useState(false)

  const handleUpdateVisibility = (visibility: Visibility) => () => {
    updatePost('visibility', visibility)
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Accordion title={'Status & Visibility'}>
      <Stack spacing={1}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Typography>Visibility : </Typography>
          <Button size={'small'} variant={'outlined'} onClick={handleOpen}>
            {post.visibility}
          </Button>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Typography>Post Status : </Typography>
          <Typography>{post.postStatus}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Typography>Created At : </Typography>
          <Typography>{formatDateTime(post.createdAt)}</Typography>
        </Stack>
      </Stack>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Post Visibility</DialogTitle>
        <Divider />
        <List>
          <MenuItem onClick={handleUpdateVisibility('PUBLIC')}>Public</MenuItem>
          <MenuItem onClick={handleUpdateVisibility('PRIVATE')}>Private</MenuItem>
        </List>
      </Dialog>
    </Accordion>
  )
}

export default StatusAndVisibility
