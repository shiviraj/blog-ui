import type { AuthorType } from './AuthorType'
import type { CategoryType } from './CategoryType'
import type { TagType } from './TagType'
import type { PostContentType } from './PostContentType'
import type { CommentType } from './CommentType'

export interface PostDetailsType extends Record<string, unknown> {
  dislikes: string[]
  likes: string[]
  content: PostContentType
  tags: TagType[]
  categories: CategoryType[]
  featuredImage?: string
  comments: CommentType[]
  postId: string
  url: string
  title: string
  publishedOn: string
  lastUpdateOn: string
  commentsAllowed: boolean
  author: AuthorType
}
