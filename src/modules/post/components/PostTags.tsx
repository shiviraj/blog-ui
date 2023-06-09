import type { TypographyProps } from '@mui/material'
import { Stack, styled, Typography } from '@mui/material'
import type { TagType as TagType } from '../../../api/dto'
import { Link } from '../../../common/components'

const Tag = styled(Typography)<TypographyProps>(({ theme }) => ({
  padding: theme.spacing(0.25, 1),
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.divider}`
}))

const PostTags = ({ tags }: { tags: TagType[] }): JSX.Element => {
  if (tags.isEmpty()) {
    return <></>
  }

  return (
    <Stack direction={'row'} spacing={1} mt={1}>
      <Typography>Tags: </Typography>
      {tags.map(({ tagId, name, url }, index) => (
        <Link key={`${tagId}-${index}`} href={`/tags/${url}`}>
          <Tag variant={'body1'}>{name}</Tag>
        </Link>
      ))}
    </Stack>
  )
}

export default PostTags
