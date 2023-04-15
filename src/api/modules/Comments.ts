import { METHODS } from './constants'
import fetch from '../adapter'
import type { AuthorCommentType } from '../dto'

type InputCommentType = { user: { name: string; email: string; userId: string }; message: string; parentId?: string }

class Comments {
  private readonly url: string

  constructor(url: string) {
    this.url = url
  }

  addComment(postId: string, comment: InputCommentType): Promise<{ status: boolean }> {
    const options = { method: METHODS.POST, data: comment }
    return fetch<{ status: boolean }>(`${this.url}/${postId}`, comment, options)
  }

  toggleLike(commentId: string, visitorId: string): Promise<{ likes: string[] }> {
    const options = { method: METHODS.PUT }
    return fetch<{ likes: string[] }>(`${this.url}/${commentId}`, { visitorId }, options)
  }

  getAllAuthorPostsComments(): Promise<AuthorCommentType[]> {
    return fetch<AuthorCommentType[]>(this.url)
  }

  updateStatus(commentId: string, status: string): Promise<{ status: boolean }> {
    return fetch<{ status: boolean }>(`${this.url}/${commentId}/update-status`, { status }, { method: METHODS.PUT })
  }
}

export default Comments
