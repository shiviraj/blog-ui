import RawHTML from '../../../common/components/RawHTML'
import TableDetails from './components/TableDetails'
import React from 'react'
import { Box, Checkbox, FormControlLabel, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { FiberManualRecord, FormatQuote } from '@mui/icons-material'
import { styled } from '@mui/styles'
import { FlexContainer } from '../../../common/components/styled/FlexContainer'

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'justify',
  fontFamily: 'Epilogue-Medium',
  marginTop: theme.spacing(2),
  '&>p': {
    paddingBottom: theme.spacing(1),
    textIndent: theme.spacing(4)
  }
}))

const Delimiter = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  margin: theme.spacing(3, 1, 2, 1),
  fontSize: theme.spacing(5),
  fontWeight: 'bolder',
  letterSpacing: theme.spacing(4)
}))

const Image = styled(Box)(({ theme, stretched }) => ({
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

const PostContent = ({ post }) => {
  return <Root>
    {post.content.blocks.map(block => {
      switch (block.type) {
        case 'header':
          return <Typography variant={`h${(block.data.level + 1) % 7}`} key={block.id}>{block.data.text}</Typography>
        case 'paragraph':
          return <Typography variant={'body1'} key={block.id}>
            <RawHTML n2br>{block.data.text}</RawHTML>
          </Typography>
        case 'delimiter':
          return <Delimiter key={block.id}>***</Delimiter>
        case 'image':
          return <Image stretched={block.data.stretched}>
            <img src={block.data.file.url} alt={block.data.caption} loading='lazy' key={block.id} />
            {block.data.caption && <Caption>{block.data.caption}</Caption>}
          </Image>
        case 'quote':
          return <Quote key={block.id}>
            <FlexContainer justfyContent={block.data.alignment}>
              <FormatQuote style={{ transform: 'scaleX(-1)' }} />
              <Typography variant={'h6'}>{block.data.text}</Typography>
              <FormatQuote />
            </FlexContainer>
            {block.data.caption && <Caption>{block.data.caption}</Caption>}
          </Quote>
        case 'list':
          return <List key={block.id}>
            {block.data.items.map((item, i) =>
              <ListItem key={'l' + i} style={{ padding: 0 }}>
                <ListItemIcon style={{ transform: 'scale(0.6)' }}>
                  <FiberManualRecord fontSize={'small'} />
                </ListItemIcon>
                <ListItemText>{item}</ListItemText>
              </ListItem>)}
          </List>
        case 'table':
          return <TableDetails data={block.data} key={block.id} />
        case 'checklist':
          return <FlexContainer direction={'column'} key={block.id}>
            {block.data.items.map((item, id) =>
              <FormControlLabel key={id} control={<Checkbox />} label={item.text} />
            )}
          </FlexContainer>
        case 'raw':
          return <RawHTML key={block.id} n2br>{block.data.html}</RawHTML>
      }
    })}
  </Root>
}

export default PostContent
