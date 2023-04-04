import React from 'react'
import { Box, styled } from '@mui/material'

const Error = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh',
  textAlign: 'center',
  color: theme.palette.error.main,
  fontSize: theme.spacing(4)
}))

type PageErrorProps = { message?: string }

const PageError = ({ message }: PageErrorProps): JSX.Element => {
  return <Error>{message ?? 'Something went wrong!!'}</Error>
}

export default PageError
