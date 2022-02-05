import React, { useState } from 'react'
import Accordion from '../../../../common/components/Accordion'
import { Box, Dialog, DialogTitle, Grid, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setEditPost } from '../action'
import { styled } from '@mui/styles'

const ImageInput = styled(Box)(({ theme }) => ({
  background: theme.palette.divider,
  textAlign: 'center',
  cursor: 'pointer'
}))

const ImageContainer = styled(Grid)(({ theme }) => ({
  height: theme.spacing(28),
  width: theme.spacing(28),
  margin: theme.spacing(1),
  cursor: 'pointer'
}))

const Image = styled('img')(({ theme }) => ({
  height: theme.spacing(28),
  width: theme.spacing(28),
  border: `1px solid ${theme.palette.divider}`,
  alignSelf: 'center'
}))

const FeaturedImage = () => {
  const dispatch = useDispatch()
  const { post } = useSelector((state) => state.editPost)
  const [open, setOpen] = useState(false)
  const images = post.content.blocks.filter((block) => block.type === 'image').map((image) => image.data.file.url)
  
  const handleSelect = (featuredImage) => () => {
    dispatch(setEditPost({ ...post, featuredImage }))
    setOpen(false)
  }
  
  return <Accordion title={'Featured Image'}>
    <Stack spacing={1} onClick={() => setOpen(true)}>
      {
        post.featuredImage ? <Image src={post.featuredImage} />
          : <ImageInput p={3}><Typography>Set Featured Image</Typography></ImageInput>
      }
    </Stack>
    
    <Dialog maxWidth open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Select Image</DialogTitle>
      <Grid container spacing={1} m={0.5}>
        {images.map((image) => <ImageContainer key={image} onClick={handleSelect(image)}>
          <Image src={image} />
        </ImageContainer>)}
      </Grid>
    </Dialog>
  
  </Accordion>
}


export default FeaturedImage
