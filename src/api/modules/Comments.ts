import { METHODS } from './constants'
import fetch from '../adapter'

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

  // getComments(postId) {
  //   return axios.fetch(`${host}/api/comments/${postId}`)
  // }

  toggleLike(commentId: string, visitorId: string): Promise<{ likes: string[] }> {
    const options = { method: METHODS.PUT }
    return fetch<{ likes: string[] }>(`${this.url}/${commentId}`, { visitorId }, options)
  }
}

export default Comments
