export interface CommentType extends Record<string, unknown> {
  child?: CommentType[]
  message: string
  commentedOn: string
  user: {
    name: string
    profile?: string
    userId: string
  }
  commentId: string
  likes: string[]
  dislikes: string[]
}
