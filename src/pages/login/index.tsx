import type { NextPage } from 'next'
import { Stack, styled, TextField, Typography } from '@mui/material'
import { useForm } from '../../hooks'
import { Button } from '../../common/components'
import { useSite } from '../../context'
import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import api from '../../api'
import { setStorage, StorageKeys } from '../../utils'
import type { ServerError } from '../../api/dto/Errors'
import { useRouter } from 'next/router'

const FormContainer = styled('form')(({ theme }) => ({
  margin: theme.spacing(4, 'auto'),
  background: theme.palette.common.white,
  padding: theme.spacing(4),
  width: theme.spacing(60),
  '&>*': {
    margin: theme.spacing(1.5)
  }
}))

const Login: NextPage = () => {
  const site = useSite()
  const router = useRouter()
  const [error, setError] = useState('')
  const { values, onChange, handleSubmit } = useForm({ email: '', password: '' })

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

  const onSubmit = () => {
    setError('')
    api.authors
      .login(values)
      .then(token => {
        setStorage(StorageKeys.AUTH, token)
        return router.push('/author')
      })
      .catch((error: ServerError) => {
        setError(error.errorMessage)
      })
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant={'h5'}>{site.title} Login</Typography>
        {error && (
          <Typography variant={'body1'} color={'error'}>
            {error}
          </Typography>
        )}
        <TextField
          type={'email'}
          value={values.email}
          onChange={handleChange('email')}
          label="Email"
          variant="outlined"
          required
        />
        <TextField
          type={'password'}
          value={values.password}
          onChange={handleChange('password')}
          label="Password"
          variant="outlined"
          required
        />
        <Button type={'submit'} variant={'contained'} size={'large'}>
          Login
        </Button>
      </Stack>
    </FormContainer>
  )
}

export default Login
