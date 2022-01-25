import React, { useState } from 'react'
import Accordion from '../../../../common/components/Accordion'
import API from '../../../../API'
import lodash from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { setTags } from '../action'
import { Chip, Stack, TextField } from '@mui/material'

const Tags = ({ post, setPost }) => {
  const [tagName, setTagName] = useState('')
  const tags = useSelector((state) => state.editPost.tags)
  const dispatch = useDispatch()
  
  const handleDelete = (tagId) => () => {
    dispatch(setTags(post.tags.filter((tag) => tag.tagId !== tagId)))
  }
  // TODO: While adding a new tag there should be some suggestions for tag
  const handleKeyUp = (event) => {
    if (event.key === 'Enter' && tagName.trim()) {
      API.tags.addNewTag({ name: tagName })
        .then((tag) => setPost({ tags: lodash.uniqWith(post.tags.concat(tag), lodash.isEqual) }))
        .then(() => setTagName(''))
    }
  }
  
  return <Accordion title={'Tags'}>
    <Stack direction={'row'} spacing={1} mb={1}>
      {
        tags.map(({ name, tagId }) => <Chip color={'primary'} size={'small'} key={tagId} label={name}
                                            onDelete={handleDelete(tagId)} />)
      }
    </Stack>
    <TextField
      value={tagName}
      disabled={tags.length >= 5}
      onChange={(event) => setTagName(event.target.value)}
      onKeyPress={handleKeyUp}
      label={'Add New Tag'}
      variant={'outlined'} size={'small'}
      helperText={'Press Enter to add new tag'}
      required
      fullWidth />
  </Accordion>
}

export default Tags
