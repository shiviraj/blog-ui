import type { PropsWithChildren } from 'react'
import React, { createRef } from 'react'
import type { SnackbarKey } from 'notistack'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

const Toast = styled(SnackbarProvider)(({ theme }) => ({
  width: theme.spacing(48)
}))

type ToastFnType = (message: string) => void

type ToastReturnType = {
  warning: ToastFnType
  info: ToastFnType
  success: ToastFnType
  error: (err: string | Error) => void
}
const useToast = (): ToastReturnType => {
  const { enqueueSnackbar } = useSnackbar()

  const warning = (message: string) => {
    enqueueSnackbar(message, { variant: 'warning' })
  }

  const info = (message: string) => {
    enqueueSnackbar(message, { variant: 'info' })
  }

  const error = (err: string | Error) => {
    const message = typeof err === 'object' ? `${err.message}` : err
    enqueueSnackbar(message, { variant: 'error' })
  }

  const success = (message: string) => {
    enqueueSnackbar(message, { variant: 'success' })
  }

  return { warning, info, error, success }
}

const ToastWrapper = ({ children }: PropsWithChildren): JSX.Element => {
  const toastRef = createRef<SnackbarProvider>()
  const onClickDismiss = (key: SnackbarKey) => () => {
    toastRef.current?.closeSnackbar(key)
  }

  return (
    <Toast
      maxSnack={5}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={10000}
      ref={toastRef}
      aria-multiline={true}
      action={(key: SnackbarKey) => (
        <IconButton onClick={onClickDismiss(key)}>
          <Close />
        </IconButton>
      )}
    >
      {children}
    </Toast>
  )
}

export { useToast }
export default ToastWrapper
