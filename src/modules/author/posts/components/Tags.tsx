import type { ChangeEvent, KeyboardEventHandler } from 'react'
import React, { useEffect, useState } from 'react'
import Accordion from '../../../../common/components/Accordion'
import { Box, Chip, MenuItem, Stack, styled, TextField } from '@mui/material'
import { useAuthorPost } from '../../../../context'
import type { TagType } from '../../../../api/dto'
import api from '../../../../api'
import { useForm } from '../../../../hooks'
import { useToast } from '../../../../common/components'

const Container = styled(Box)(({ theme }) => ({
  background: theme.palette.common.white,
  border: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(-0.5)
}))

// eslint-disable-next-line max-statements
const Tags = (): JSX.Element => {
  const toast = useToast()
  const [suggestions, setSuggestions] = useState<TagType[]>([])
  const [sIndex, setSIndex] = useState(-1)
  const { post, updatePost } = useAuthorPost()
  const [tags, setTags] = useState<TagType[]>([])
  const { values, onChange } = useForm({ name: '' })

  useEffect(() => {
    api.tags.getAllTags().then(setTags).catch()
  }, [])
  const handleDelete = (tagId: string) => () => {
    updatePost(
      'tags',
      post.tags.filter(tag => tag !== tagId)
    )
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tagName: string = event.target.value

    const getSuggestions = (): TagType[] => {
      return tags.filter(
        tag => !post.tags.includes(tag.tagId) && tag.name.toLowerCase().includes(tagName.toLowerCase().trim())
      )
    }

    if (tagName.trim()) {
      setSuggestions(getSuggestions())
    } else {
      setSuggestions([])
    }
    setSIndex(-1)
    onChange('name', tagName)
  }

  const handleAdd = () => {
    if (sIndex === -1) {
      api.tags
        .addNewTag(values.name.trim())
        .then(tag => {
          setTags([...tags, tag])
          updatePost('tags', post.tags.concat(tag.tagId))
          onChange('name', '')
        })
        .catch(() => {
          toast.error('Failed to add new Tag')
        })
    } else {
      updatePost('tags', post.tags.concat(suggestions[sIndex].tagId))
    }
  }

  const handleAddTag = (index: number) => () => {
    setSIndex(index)
    handleAdd()
  }

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
    switch (event.key) {
      case 'ArrowDown':
        setSIndex(Math.min(sIndex + 1, suggestions.lastIndex()))
        break
      case 'ArrowUp':
        setSIndex(Math.max(sIndex - 1, 0))
        break
      case 'Enter':
        handleAdd()
        break
      default:
    }
  }

  const findLabel = (tagId: string): string => tags.find(tag => tag.tagId === tagId)?.name ?? ''

  return (
    <Accordion title={'Tags'}>
      <Stack direction={'row'} flexWrap={'wrap'} mb={1.5}>
        {post.tags.map(tagId => (
          <Chip
            style={{ margin: 2 }}
            color={'primary'}
            size={'small'}
            key={tagId}
            label={findLabel(tagId)}
            onDelete={handleDelete(tagId)}
          />
        ))}
      </Stack>
      <TextField
        value={values.name}
        disabled={post.tags.length >= 5}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        label={'Add New Tag'}
        variant={'outlined'}
        size={'small'}
        helperText={suggestions.isEmpty() ? 'Press Enter to add new tag' : ''}
        required
        fullWidth
      />
      {Boolean(post.tags.length < 5 && suggestions.isNotEmpty()) && (
        <Container>
          {suggestions.map((tag, index) => (
            <MenuItem key={tag.tagId} value={tag.tagId} onClick={handleAddTag(index)} selected={index === sIndex}>
              {tag.name}
            </MenuItem>
          ))}
        </Container>
      )}
    </Accordion>
  )
}

export default Tags
