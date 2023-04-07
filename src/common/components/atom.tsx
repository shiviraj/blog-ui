import { styled } from '@mui/material'
import type { LinkProps } from 'next/link'
import NextLink from 'next/link'

export const Link = styled(NextLink)<LinkProps & { underlineonhover?: boolean }>(
  ({ color, underlineonhover = false }) => ({
    textDecoration: 'none',
    color: color ?? 'inherit',
    '&:hover': {
      textDecoration: underlineonhover ? 'underline' : 'none'
    }
  })
)
