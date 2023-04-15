import type { ChangeEvent } from 'react'
import React, { useEffect, useState } from 'react'
import { Stack, TextField } from '@mui/material'
import { useAuthorPost } from '../../../../context'
import api from '../../../../api'
import { Accordion, Link } from '../../../../common/components'
import { useForm } from '../../../../hooks'

const Permalink = (): JSX.Element => {
  const { post, updatePost } = useAuthorPost()
  const { values, onChange } = useForm({ url: post.url })
  const [error, setError] = useState('')
  const baseUrl = typeof window !== 'undefined' ? window.location.toString().split('/').slice(0, 3).join('/') : ''

  useEffect(() => {
    const regexp = /^[a-z][a-z0-9\\-]+$/i
    if (values.url && regexp.exec(values.url)) {
      api.posts
        .isUrlAvailable(post.postId, values.url.trim())
        .then(({ status }) => {
          const errorMessage: string = status ? '' : 'Url is not available!'
          setError(errorMessage)
          if (status) {
            updatePost('url', values.url.trim())
          }
        })
        .catch()
    } else {
      setError(values.url.trim().length < 2 ? 'Url is too small' : `No special char allowed, except than '${'-'}'`)
    }
  }, [values.url])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('url', event.target.value)
  }

  return (
    <Accordion title={'Permalink'}>
      <Stack spacing={0.5}>
        <TextField
          value={values.url}
          label={'Url slug'}
          onChange={handleChange}
          variant={'outlined'}
          color={'primary'}
          size={'small'}
          InputLabelProps={{ shrink: true }}
          fullWidth
          error={Boolean(error)}
          helperText={error}
          multiline
          required
        />
        <Link href={`${baseUrl}/author/posts/preview/${values.url}`} target={'_blank'} color={'primary'}>
          {`${baseUrl}/posts/${values.url}`}
        </Link>
      </Stack>
    </Accordion>
  )
}

export default Permalink
