import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import Accordion from '../../../../common/components/Accordion'
import { Box, Chip, TextField } from '@material-ui/core'
import API from '../../../../API'
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&>*': {
      margin: theme.spacing(0, 1, 1, 0)
    }
  }
}))

const Tags = ({ post, setPost }) => {
  const classes = useStyles()
  const [tagName, setTagName] = useState('')
  
  const handleDelete = tagId => () => {
    const tags = post.tags.filter(tag => tag.tagId !== tagId)
    setPost({ tags })
  }
  // TODO: While adding a new tag there should be some suggestions for tag
  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && tagName.trim()) {
      API.tags.addNewTag({ name: tagName })
        .then((tag) => setPost({ tags: _.uniqWith(post.tags.concat(tag), _.isEqual) }))
        .then(() => setTagName(''))
    }
  }
  
  return <Accordion title={'Tags'}>
    <Box className={classes.tags}>
      {
        post.tags.map(({ name, tagId }) =>
          <Chip size={'small'} key={tagId} label={name} onDelete={handleDelete(tagId)} />)
      }
    </Box>
    <TextField
      value={tagName}
      disabled={post.tags.length >= 5}
      onChange={(e) => setTagName(e.target.value)}
      onKeyPress={handleKeyUp}
      label={'Add New Tag'}
      variant={'outlined'} size={'small'}
      helperText={'Press Enter to add new tag'}
      required
      fullWidth />
  </Accordion>
}

export default Tags
