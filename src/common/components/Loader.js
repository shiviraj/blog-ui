import { Box, CircularProgress } from '@mui/material'
import { styled } from '@mui/styles'

const Container = styled(Box)(() => ({
  height: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

const Loader = () => <Container><CircularProgress color='primary' /></Container>

export default Loader
