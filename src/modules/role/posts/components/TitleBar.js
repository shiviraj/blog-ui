import {Box, styled, Typography} from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  width: '100%',
  color: theme.palette.primary.main,
  textAlign: 'center'
}))

const TitleBar = ({ title }) => <Container boxShadow={2}>
  <Typography variant={'h4'}>{title}</Typography>
</Container>

export default TitleBar
