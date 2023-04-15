import type { OutputData } from '@editorjs/editorjs'

export type Visibility = 'PRIVATE' | 'PUBLIC'
export type PostStatus = 'DRAFT' | 'PUBLISH'

export interface AuthorPostType extends Record<string, unknown> {
  createdAt: Date
  visibility: Visibility
  likes: string[]
  content?: OutputData
  tags: string[]
  categories: string[]
  featuredImage?: string
  postId: string
  url: string
  postStatus: PostStatus
  title: string
  publishedOn: Date
  lastUpdateOn: Date
  commentsAllowed: boolean
}
