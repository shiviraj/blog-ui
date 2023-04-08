import { METHODS } from './constants'
import fetch from '../adapter'

type InputCommentType = { user: { name: string; email: string; userId?: string }; message: string }

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
  //
  // addLikeOrDislike(commentId, likeOrDislike) {
  //   const options = { method: METHODS.PUT, data: likeOrDislike }
  //   return axios.fetch(`${host}/api/comments/${commentId}`, options)
  // }
}

export default Comments
