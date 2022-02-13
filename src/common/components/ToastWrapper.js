import React, { createRef } from 'react'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

const Toast = styled(SnackbarProvider)(({ theme }) => ({
  width: theme.spacing(48)
}))

const useToast = () => {
  const { enqueueSnackbar } = useSnackbar()
  
  const warning = (message) => {
    enqueueSnackbar(message, { variant: 'warning' })
  }
  
  const info = (message) => {
    enqueueSnackbar(message, { variant: 'info' })
  }
  
  const error = (err) => {
    const message = typeof err === 'object' ? `${err.message}` : err
    enqueueSnackbar(message, { variant: 'error' })
  }
  
  const success = (message) => {
    enqueueSnackbar(message, { variant: 'success' })
  }
  
  return { warning, info, error, success }
}

const ToastWrapper = ({ children }) => {
  const toastRef = createRef()
  const onClickDismiss = (key) => () => {
    toastRef.current.closeSnackbar(key)
  }
  
  return <Toast maxSnack={5} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} autoHideDuration={10000}
                ref={toastRef} aria-multiline={true}
                action={(key) => <IconButton onClick={onClickDismiss(key)}><Close /></IconButton>}
  >
    {children}
  </Toast>
}

export { useToast }
export default ToastWrapper
