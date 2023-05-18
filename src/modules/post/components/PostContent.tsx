import RawHTML from '../../../common/components/RawHTML'
import React from 'react'
import type { BoxProps } from '@mui/material'
import {
  Box,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Typography
} from '@mui/material'
import { FiberManualRecord, FormatQuote } from '@mui/icons-material'
import type { PostContentType } from '../../../api/dto'

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'justify',
  fontFamily: 'Epilogue-Medium',
  marginTop: theme.spacing(2),
  '&>p': {
    paddingBottom: theme.spacing(1)
    // textIndent: index.spacing(4)
  }
}))

const Delimiter = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  margin: theme.spacing(3, 1, 2, 1),
  fontSize: theme.spacing(5),
  fontWeight: 'bolder',
  letterSpacing: theme.spacing(4)
}))

const Image = styled(Box)<BoxProps & { stretched: boolean }>(({ stretched }) => ({
  alignSelf: 'center',
  alignItems: 'center',
  width: stretched ? '100%' : '50%',
  '&>*': {
    width: '100%'
  }
}))

const Caption = styled(Typography)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(0.5, 1)
}))

const Quote = styled(Typography)(({ theme }) => ({
  borderLeft: `4px solid ${theme.palette.common.black}`,
  padding: theme.spacing(0.5, 1),
  margin: theme.spacing(1)
}))

const getVariant = (level: 1 | 2 | 3 | 4 | 5 | 6): 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' => `h${level}`

const PostContent = ({ content }: { content: PostContentType }): JSX.Element => {
  return (
    <Root>
      {/* eslint-disable-next-line complexity */}
      {content.blocks.map(block => {
        switch (block.type) {
          case 'header':
            return (
              <Typography variant={getVariant(block.data.level)} key={block.id}>
                {block.data.text}
              </Typography>
            )
          case 'paragraph':
            return (
              <Typography variant={'body1'} key={block.id}>
                <RawHTML n2br>{block.data.text}</RawHTML>
              </Typography>
            )
          case 'delimiter':
            return <Delimiter key={block.id}>***</Delimiter>
          case 'simpleImage':
            return (
              <Image stretched={block.data.stretched} key={block.id}>
                <img
                  src={block.data.url}
                  alt={block.data.caption}
                  loading="lazy"
                  width={block.data.stretched ? '100%' : 'auto'}
                />
                {block.data.caption && <Caption textAlign={'center'}>{block.data.caption}</Caption>}
              </Image>
            )
          case 'quote':
            return (
              <Quote key={block.id}>
                <Stack>
                  <FormatQuote style={{ transform: 'scaleX(-1)' }} />
                  <Typography variant={'h6'}>{block.data.text}</Typography>
                  <FormatQuote />
                </Stack>
                {block.data.caption && <Caption>{block.data.caption}</Caption>}
              </Quote>
            )
          case 'list':
            return (
              <List key={block.id}>
                {block.data.items.map((item, index) => (
                  <ListItem key={`list-item-${index}`} style={{ padding: 0 }}>
                    <ListItemIcon style={{ transform: 'scale(0.6)' }}>
                      <FiberManualRecord fontSize={'small'} />
                    </ListItemIcon>
                    <ListItemText>{item}</ListItemText>
                  </ListItem>
                ))}
              </List>
            )
          case 'table':
            return <div key={block.id}></div>
          // return <TableDetails data={block.data} key={block.id} />
          case 'checklist':
            return (
              <Stack key={block.id}>
                {block.data.items.map((item, id) => (
                  <FormControlLabel key={`list${id}`} control={<Checkbox />} label={item.text} />
                ))}
              </Stack>
            )
          case 'raw':
            return (
              <RawHTML key={block.id} n2br>
                {block.data.html}
              </RawHTML>
            )
        }
        return <div key={block.id}></div>
      })}
    </Root>
  )
}

export default PostContent
