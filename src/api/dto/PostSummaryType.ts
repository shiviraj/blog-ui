import type { AuthorType } from './AuthorType'

export type PostCount = { pageCount: number; postCount: number }

export interface PostSummaryType extends Record<string, unknown> {
  summary: string
  featuredImage?: string
  comments: number
  postId: string
  url: string
  title: string
  publishedOn: string
  lastUpdateOn: Date
  commentsAllowed: boolean
  author: AuthorType
}
