import { styled } from '@mui/styles'
import { Box } from '@mui/material'

const FlexContainer = styled(Box)(({ theme, ...props }) => ({
  display: 'flex',
  justifyContent: props.justifyContent || 'start',
  flexDirection: props.direction || 'row',
  alignItems: props.alignItems || 'start',
  width: '100%',
  margin: theme.spacing(...(props.m || []))
}))

export { FlexContainer }
