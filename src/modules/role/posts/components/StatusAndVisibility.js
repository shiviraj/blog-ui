import React, { useState } from 'react'
import Accordion from '../../../../common/components/Accordion'
import { formatDateTime } from '../../../../utils/utils'
import { Button, Dialog, DialogTitle, List, MenuItem, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setEditPost } from '../action'

const StatusAndVisibility = () => {
  const dispatch = useDispatch()
  const { post } = useSelector((state) => state.editPost)
  const [open, setOpen] = useState(false)
  
  const handleUpdateVisibility = (visibility) => () => {
    dispatch(setEditPost({ ...post, visibility }))
    setOpen(false)
  }
  
  return <Accordion title={'Status & Visibility'}>
    <Stack spacing={1}>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Typography>Visibility : </Typography>
        <Button size={'small'} variant={'outlined'} onClick={() => setOpen(true)}>{post.visibility}</Button>
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
    
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Post Visibility</DialogTitle>
      <List style={{ pt: 0, mt: 0 }}>
        <MenuItem onClick={handleUpdateVisibility('PUBLIC')}>Public</MenuItem>
        <MenuItem onClick={handleUpdateVisibility('PRIVATE')}>Private</MenuItem>
      </List>
    </Dialog>
  
  </Accordion>
}


export default StatusAndVisibility
