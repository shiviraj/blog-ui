import { Avatar, Box, Button, Collapse, Input, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/styles'
import { Save } from '@mui/icons-material'
import API from '../../../API'
import { setComments } from '../action'

const Summary = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  minHeight: theme.spacing(3)
}))

const EditableComment = styled(Collapse)(({ theme }) => ({
  margin: theme.spacing(-3.5, 0, 1, 0),
  padding: 0
}))

const CommentInput = ({ postId, comments }) => {
  const [expand, setExpand] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const user = useSelector(state => state.user)
  
  const handleCancel = () => {
    setExpand(false)
    setLoading(false)
    setMessage('')
  }
  
  const handleAddComment = (e) => {
    setLoading(true)
    API.posts.addComment(postId, { message, userId: user.userId })
      .then((comment) => setComments([comment, ...comments]))
      .catch()
      .then(() => setLoading(false))
  }
  
  return <Box boxShadow={2} mt={1} p={1} pl={2} style={{ minHeight: 24 }}>
    <Collapse in={expand}>
      <Stack direction={'row'} spacing={1} alignItems={'center'} mb={2}>
        <Avatar src={user.profile} alt={user.username} />
        <Typography>{user.name}</Typography>
      </Stack>
    </Collapse>
    <Summary onClick={() => setExpand(true)}>{message ? '' : 'What are your thoughts?'}</Summary>
    <EditableComment in={expand}>
      <Input value={message} onChange={e => setMessage(e.target.value)} disableUnderline fullWidth multiline />
    </EditableComment>
    <Collapse in={expand}>
      <Stack direction={'row'} spacing={1}>
        <Button onClick={handleCancel} size={'small'}>Cancel</Button>
        <LoadingButton color='primary' onClick={handleAddComment} loading={loading} loadingPosition='end'
                       endIcon={<Save />} size={'small'} variant='contained' disabled={!message}>
          Comment
        </LoadingButton>
      </Stack>
    </Collapse>
  </Box>
}

export default CommentInput
