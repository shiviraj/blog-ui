import { Avatar, Box, Button, Collapse, Input, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/styles'
import { Save } from '@mui/icons-material'
import API from '../../../../API'
import { useToast } from '../../../../common/components/ToastWrapper'

const Container = styled(Box)(({ theme }) => ({
  minHeight: theme.spacing(3),
  padding: theme.spacing(1, 1.5),
  border: `1px solid ${theme.palette.divider}`,
  '&.disable': {
    padding: theme.spacing(0),
    border: `1px solid transparent`,
    minHeight: 0
  },
  borderRadius: theme.spacing(1),
  margin: theme.spacing(1, 2)
}))

const Summary = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  minHeight: theme.spacing(3)
}))

const EditableComment = styled(Collapse)(({ theme }) => ({
  margin: theme.spacing(-3.5, 0, 1, 0),
  padding: 0
}))

const CommentInput = (props) => {
  const { postId, placeholder, expand: defaultExpand, placeholderDisable = false, parentComment = null } = props
  const [expand, setExpand] = useState(defaultExpand || false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const toast = useToast()
  const user = useSelector(state => state.user)
  
  useEffect(() => setExpand(defaultExpand), [defaultExpand])
  
  const handleCancel = () => {
    setExpand(false)
    setLoading(false)
    setMessage('')
  }
  
  const handleAddComment = () => {
    setLoading(true)
    API.comments.addComment(postId, { message, userId: user.userId, parentComment })
      .then(() => {
        setMessage('')
        toast.success('You have made a successful comment, It will be visible on this post once it approved by Author!!')
      })
      .catch(() => toast.error('Something went wrong, Please try again!!'))
      .then(() => setLoading(false))
  }
  
  return <Container>
    <Collapse in={expand}>
      <Stack direction={'row'} spacing={1} alignItems={'center'} mb={2}>
        <Avatar src={user.profile} alt={user.username} />
        <Typography>{user.name}</Typography>
      </Stack>
    </Collapse>
    {(placeholderDisable && !expand) || <Summary onClick={() => setExpand(true)}>{message ? '' : placeholder}</Summary>}
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
  </Container>
}

export default CommentInput
