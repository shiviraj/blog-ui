import { useMediaQuery } from '@mui/material'
import theme from '../theme'

const useMedia = (): { lg: boolean; sm: boolean; md: boolean; xl: boolean } => {
  const sm = useMediaQuery(theme.breakpoints.up('xs'))
  const md = useMediaQuery(theme.breakpoints.up('sm'))
  const lg = useMediaQuery(theme.breakpoints.up('md'))
  const xl = useMediaQuery(theme.breakpoints.up('lg'))
  return { sm, md, lg, xl }
}

export default useMedia
