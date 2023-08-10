import { Box, Checkbox, Collapse, FormControlLabel, Input, Stack, styled, Typography } from '@mui/material'
import type { ChangeEvent } from 'react'
import React, { useEffect, useState } from 'react'
import { Save } from '@mui/icons-material'
import { Button, LoadingButton, useToast } from '../../../../common/components'
import { useForm } from '../../../../hooks'
import { CommentGateway } from '../../../../api'
import { getStorage, getVisitorId, setStorage, StorageKeys } from '../../../../utils'

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
  parentComment?: string
  handleCancel?: () => void
}

const CommentInput = (props: CommentInputType): JSX.Element => {
  const { postId, placeholder, expand: defaultExpand = false, handleCancel, parentComment } = props
  const [expand, setExpand] = useState<boolean>(defaultExpand)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const [user, setUser] = useState<{ name: string; email: string; userId: string } | null>(null)
  const [consent, setConsent] = useState(false)

  const { values, onChange, onClear, handleSubmit } = useForm({ name: '', email: '', message: '' })

  const fillUserDetails = () => {
    const user = getStorage<{ name: string; email: string; userId: string }>(StorageKeys.VISITOR)
    if (user !== null) {
      onChange('email', user.email)
      onChange('name', user.name)
      setUser(user)
    }
  }

  useEffect(() => {
    fillUserDetails()
  }, [])

  const handleOpen = () => {
    setExpand(true)
    fillUserDetails()
  }

  const onCancel = () => {
    onClear()
    setLoading(false)
    setExpand(false)
    if (handleCancel) {
      handleCancel()
    }
  }

  const onSubmit = (comment: typeof values) => {
    setLoading(true)
    getVisitorId().then((userId: string) => {
      if (consent) {
        setStorage(StorageKeys.VISITOR, { name: comment.name, email: comment.email, userId })
      }
      return CommentGateway.addComment(postId, {
        user: { name: comment.name, email: comment.email, userId },
        message: comment.message,
        parentId: parentComment
      })
        .then(() => {
          toast.success('You have made a successful comment, It will be visible on this post once it approved')
          onCancel()
        })
        .catch(() => {
          toast.error('Something went wrong, please try again!')
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }

  const handleChange = <K extends keyof typeof values>(key: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(key, event.target.value)
    }
  }

  return (
    <Container>
      <Summary onClick={handleOpen}>{expand ? '' : placeholder}</Summary>
      <EditableComment in={expand}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder={expand ? 'Name*' : ''}
            value={values.name}
            onChange={handleChange('name')}
            disableUnderline
            required
            fullWidth
          />
          <Input
            placeholder={expand ? 'Email*' : ''}
            type={'email'}
            value={values.email}
            onChange={handleChange('email')}
            required
            disableUnderline
            fullWidth
          />
          <Input
            placeholder={placeholder}
            value={values.message}
            onChange={handleChange('message')}
            disableUnderline
            required
            fullWidth
            multiline
          />
          {(user === null || user.name !== values.name || user.email !== values.email) && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={consent}
                  onClick={() => {
                    setConsent(!consent)
                  }}
                />
              }
              label="Save my name and email in this browser for the next time I comment."
            />
          )}
          <Stack direction={'row'} spacing={1}>
            <Button variant={'outlined'} onClick={onCancel} size={'small'} color={'error'}>
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
