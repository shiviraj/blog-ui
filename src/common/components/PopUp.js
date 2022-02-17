import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Button, IconButton, Modal, Typography } from '@mui/material'
import Link from 'next/link'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import { openPopUp } from '../../modules/home/action'
import { Close } from '@mui/icons-material'

const BasicModal = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: theme.spacing(60),
  background: theme.palette.common.white,
  boxShadow: theme.spacing(2),
  padding: theme.spacing(1),
  border: `2px solid ${theme.palette.common.black}`,
  borderRadius: theme.spacing(1),
  '&>*': {
    margin: theme.spacing(0.5)
  },
  [theme.breakpoints.down('sm')]: {
    width: '85%'
  }
}))

const Icon = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  margin: theme.spacing(-2.4),
  background: theme.palette.common.white,
  border: `2px solid ${theme.palette.common.black}`,
  '&:hover': {
    background: theme.palette.grey[100]
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(-2.4)
  }
}))

const usePopUp = () => {
  const dispatch = useDispatch()
  
  const onOpen = (message) => dispatch(openPopUp(message))
  const onClose = (message) => dispatch(openPopUp(message, false))
  
  return { onOpen, onClose }
}

const PopUpWrapper = ({ children }) => {
  const [url, setUrl] = useState('')
  const { open, message } = useSelector((state) => state.site.popUp)
  const { onClose } = usePopUp()
  
  useEffect(() => {
    const url = window ? window.location.toString() : ''
    setUrl(url)
  }, [])
  
  return <React.Fragment>
    {children}
    <Modal open={open} onClose={onClose}>
      <BasicModal>
        <Typography variant={'h5'}>Create an account to {message}</Typography>
        <Link href={`/login?url=${url}`}>
          <Button variant={'contained'} onClick={onClose}>Sign Up</Button>
        </Link>
        <Typography onClick={onClose}>
          Already have an account? <Link href={`/login?url=${url}`}>Log In</Link>
        </Typography>
        <Icon color={'error'} onClick={onClose}>
          <Close color={'error'} />
        </Icon>
      </BasicModal>
    </Modal>
  </React.Fragment>
}

export { usePopUp }
export default PopUpWrapper
