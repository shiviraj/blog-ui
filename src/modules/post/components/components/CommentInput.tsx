import { Box, Collapse, Input, Stack, styled, Typography } from '@mui/material'
import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import { Save } from '@mui/icons-material'
import { Button, LoadingButton, useToast } from '../../../../common/components'
import { useForm } from '../../../../hooks'
import api from '../../../../api'

const Container = styled(Box)(({ theme }) => ({
  minHeight: theme.spacing(3),
  padding: theme.spacing(1, 1.5),
  border: `1px solid ${theme.palette.divider}`,
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

type CommentInputType = {
  postId: string
  placeholder: string
  expand?: boolean
  placeholderDisable?: boolean
  parentComment?: string
}

const CommentInput = (props: CommentInputType): JSX.Element => {
  const { postId, placeholder, expand: defaultExpand = false } = props
  const [expand, setExpand] = useState<boolean>(defaultExpand)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const { values, onChange, onClear, handleSubmit } = useForm({ name: '', email: '', message: '' })

  useEffect(() => {
    setExpand(defaultExpand)
  }, [defaultExpand])

  const handleCancel = () => {
    onClear()
    setLoading(false)
    setExpand(false)
  }

  const onSubmit = (comment: typeof values) => {
    api.comments
      .addComment(postId, { user: { name: comment.name, email: comment.email }, message: comment.message })
      .then(({ status }) => {
        if (status) {
          toast.success(
            'You have made a successful comment, It will be visible on this post once it approved by AuthorType!!'
          )
          onClear()
        } else {
          toast.error('Something went wrong, please try again!')
        }
      })
      .catch(() => {
        toast.error('Something went wrong, please try again!')
      })
  }

  const handleOpen = () => {
    setExpand(true)
  }

  return (
    <Container>
      <Summary onClick={handleOpen}>{expand ? '' : placeholder}</Summary>
      <EditableComment in={expand}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder={expand ? 'Name*' : ''}
            required
            value={values.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChange('name', event.target.value)
            }}
            disableUnderline
            fullWidth
          />
          <Input
            placeholder={expand ? 'Email*' : ''}
            type={'email'}
            required
            value={values.email}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChange('email', event.target.value)
            }}
            disableUnderline
            fullWidth
          />
          <Input
            required
            placeholder={placeholder}
            value={values.message}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChange('message', event.target.value)
            }}
            disableUnderline
            fullWidth
            multiline
          />
          <Stack direction={'row'} spacing={1}>
            <Button onClick={handleCancel} size={'small'} color={'error'}>
              Cancel
            </Button>
            <LoadingButton
              type={'submit'}
              color="primary"
              loading={loading}
              loadingPosition="end"
              endIcon={<Save />}
              size={'small'}
              variant="contained"
              disabled={Object.values(values).some((value: string) => !value.trim())}
            >
              Comment
            </LoadingButton>
          </Stack>
        </form>
      </EditableComment>
    </Container>
  )
}

export default CommentInput
