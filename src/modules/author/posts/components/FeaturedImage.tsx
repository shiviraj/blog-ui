import React, { useState } from 'react'
import Accordion from '../../../../common/components/Accordion'
import { Box, Dialog, DialogTitle, Grid, Stack, styled, Typography } from '@mui/material'
import { useAuthorPost } from '../../../../context'
import type { ImageBlock } from '../../../../api/dto'

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

const FeaturedImage = (): JSX.Element => {
  const { post, updatePost } = useAuthorPost()
  const [open, setOpen] = useState(false)
  const images: string[] =
    post.content?.blocks.filter(block => block.type === 'image').map(image => (image as ImageBlock).data.url) ?? []

  const handleSelect = (featuredImage: string) => () => {
    updatePost('featuredImage', featuredImage)
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Accordion title={'Featured Image'}>
      <Stack spacing={1} onClick={handleOpen}>
        {post.featuredImage ? (
          <Image src={post.featuredImage} />
        ) : (
          <ImageInput p={3}>
            <Typography>Set Featured Image</Typography>
          </ImageInput>
        )}
      </Stack>

      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Select Image</DialogTitle>
        <Grid container spacing={1} m={0.5}>
          {images.map(image => (
            <ImageContainer key={image} onClick={handleSelect(image)}>
              <Image src={image} />
            </ImageContainer>
          ))}
        </Grid>
      </Dialog>
    </Accordion>
  )
}

export default FeaturedImage
