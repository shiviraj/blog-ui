export interface CommentType extends Record<string, unknown> {
  postId: string
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
  parentId?: string
}

export interface AuthorCommentType extends CommentType {
  status: 'UNAPPROVED' | 'APPROVED'
}
