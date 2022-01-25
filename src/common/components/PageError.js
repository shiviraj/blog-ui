import React from 'react'
import { styled } from '@mui/styles'
import { Box } from '@mui/material'

const Error = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh',
  color: theme.palette.error.main,
  fontSize: theme.spacing(4)
}))

const PageError = ({ message }) => <Error>{message}</Error>

export default PageError
