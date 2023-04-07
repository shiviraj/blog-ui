import type { AuthorType } from './AuthorType'
import type { CategoryType } from './CategoryType'
import type { TagType } from './TagType'
import type { PostContentType } from './PostContentType'

export interface PostDetailsType extends Record<string, unknown> {
  content: PostContentType
  tags: TagType[]
  categories: CategoryType[]
  featuredImage?: string
  comments: unknown[]
  postId: string
  url: string
  title: string
  publishedOn: string
  lastUpdateOn: string
  commentsAllowed: boolean
  author: AuthorType
}
