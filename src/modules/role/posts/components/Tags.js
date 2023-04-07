import React, { useState } from 'react'
import Accordion from '../../../../common/components/Accordion'
import API from '../../../../api'
import lodash from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { setTags } from '../action'
import { Box, Chip, MenuItem, Stack, TextField } from '@mui/material'
import { styled } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
  background: theme.palette.common.white,
  border: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(-0.5)
}))

// eslint-disable-next-line max-lines-per-function,max-statements
const Tags = () => {
  const [tagName, setTagName] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [sIndex, setSIndex] = useState(-1)
  const tags = useSelector((state) => state.editPost.tags)
  const dispatch = useDispatch()
  
  const handleDelete = (tagId) => () => {
    dispatch(setTags(tags.filter((tag) => tag.tagId !== tagId)))
  }
  
  const clearTagNameAndSuggestions = () => {
    setTagName('')
    setSuggestions([])
    setSIndex(-1)
  }
  
  const handleChange = (event) => {
    const name = event.target.value
    setTagName(name)
    if (name.trim()) {
      API.tags.getSearchOptions(name.trim())
        .then((options) => setSuggestions(options))
        .catch(() => ({}))
    } else {
      setSuggestions([])
    }
    setSIndex(-1)
  }
  
  const handleAdd = () => {
    if (sIndex === -1) {
      API.tags.addNewTag({ name: tagName.trim() })
        .then((tag) => dispatch(setTags(lodash.uniqWith(tags.concat(tag), lodash.isEqual))))
        .then(clearTagNameAndSuggestions)
    } else {
      const tagsToBeAdded = lodash.uniqWith(tags.concat(suggestions[sIndex]), lodash.isEqual)
      dispatch(setTags(tagsToBeAdded));
      (tagsToBeAdded.length >= 5) && clearTagNameAndSuggestions()
    }
  }
  
  const handleAddTag = (index) => {
    setSIndex(index)
    handleAdd()
  }
  
  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        setSIndex(Math.min(sIndex + 1, suggestions.length - 1))
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
  
  return <Accordion title={'Tags'}>
    <Stack direction={'row'} flexWrap={'wrap'} mb={1.5}>
      {tags.map(({ name, tagId }) => <Chip style={{ margin: 2 }} color={'primary'} size={'small'} key={tagId}
                                           label={name} onDelete={handleDelete(tagId)} />)}
    </Stack>
    <TextField
      value={tagName} disabled={tags.length >= 5}
      onChange={handleChange} onKeyDown={handleKeyDown}
      label={'Add New TagType'} variant={'outlined'} size={'small'}
      helperText={Boolean(suggestions.length) ? '' : 'Press Enter to add new tag'}
      required fullWidth />
    {Boolean(tags.length < 5 && suggestions.length) && <Container>
      {suggestions.map((tag, index) => <MenuItem key={tag.url} value={tag.tagId}
                                                 onClick={() => handleAddTag(index)} selected={index === sIndex}>
        {tag.name}
      </MenuItem>)}
    </Container>
    }
  </Accordion>
}

export default Tags
