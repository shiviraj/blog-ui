import { config } from '../config'
import type { AuthorCommentType } from './dto'
import WebClient from './webClient'

const commentConfig = config.comment

type InputCommentType = { user: { name: string; email: string; userId: string }; message: string; parentId?: string }

const CommentGateway = {
  addComment(postId: string, comment: InputCommentType): Promise<{ status: boolean }> {
    return WebClient.post<{ status: boolean }>({
      baseUrl: commentConfig.baseUrl,
      path: commentConfig.addCommentPath,
      body: comment,
      uriVariables: { postId }
    })
  },

  toggleLike(commentId: string, visitorId: string): Promise<{ likes: string[] }> {
    return WebClient.put<{ likes: string[] }>({
      baseUrl: commentConfig.baseUrl,
      path: commentConfig.toggleLikePath,
      body: { visitorId },
      uriVariables: { commentId }
    })
  },

  getAllAuthorPostsComments(): Promise<AuthorCommentType[]> {
    return WebClient.get<AuthorCommentType[]>({ baseUrl: commentConfig.baseUrl, path: '' })
  },

  updateStatus(commentId: string, status: string): Promise<{ status: boolean }> {
    return WebClient.put<{ status: boolean }>({
      baseUrl: commentConfig.baseUrl,
      path: commentConfig.updateStatusPath,
      body: { status },
      uriVariables: { commentId }
    })
  }
}

export default CommentGateway
