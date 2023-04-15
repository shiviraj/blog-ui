import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'
import { Box, Collapse, IconButton, styled, Typography } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[50]
}))

const Summary = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0.5, 0),
  alignItems: 'center',
  transition: 'border 0s .3s'
}))

const Details = styled(Collapse)(({ theme }) => ({
  padding: theme.spacing(0.5, 0)
}))

type AccordionProps = { title: string; expanded?: boolean }
const Accordion = ({ children, title, expanded = true }: PropsWithChildren<AccordionProps>): JSX.Element => {
  const [expand, setExpand] = useState(expanded)

  const handleToggleExpand = () => {
    setExpand(!expand)
  }

  return (
    <Container boxShadow={2}>
      <Summary onClick={handleToggleExpand}>
        <Typography variant={'h6'}>{title}</Typography>
        <IconButton size={'small'}>{expand ? <ExpandLess /> : <ExpandMore />}</IconButton>
      </Summary>
      <Details in={expand}>{children}</Details>
    </Container>
  )
}

export default Accordion
