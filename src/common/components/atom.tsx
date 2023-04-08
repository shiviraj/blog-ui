import type { ButtonProps } from '@mui/material'
import { Button as _Button, styled } from '@mui/material'
import type { LoadingButtonProps } from '@mui/lab'
import { LoadingButton as _LoadingButton } from '@mui/lab'
import type { LinkProps } from 'next/link'
import NextLink from 'next/link'

export const Link = styled(NextLink)<LinkProps & { underlineonhover?: 'true' | 'false' }>(
  ({ color, underlineonhover = 'false' }) => ({
    textDecoration: 'none',
    color: color ?? 'inherit',
    '&:hover': {
      textDecoration: underlineonhover === 'true' ? 'underline' : 'none'
    }
  })
)

export const Button = styled(_Button)<ButtonProps>(() => ({
  textTransform: 'none'
}))

export const LoadingButton = styled(_LoadingButton)<LoadingButtonProps>(() => ({
  textTransform: 'none'
}))
